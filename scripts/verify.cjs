'use strict';
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const publicRoot = path.join(root, 'public');
const read = (file) => fs.readFileSync(path.join(publicRoot, file), 'utf8');
const context = vm.createContext({ URL, Intl, console });
for (const file of ['lab-data.js', 'lab.js'])
  new vm.Script(read(file), { filename: file }).runInContext(context);
const { validate, aggregate, displayMetric } = context.LabLedger;
const data = context.LAB_DATA;
validate(data);
const copy = () => JSON.parse(JSON.stringify(data));
const expectRejected = (change) => {
  const d = copy();
  change(d);
  assert.throws(() => validate(d));
};
const metric = (
  state,
  value,
  coverage = 'All activity in the stated period',
) => ({ state, value, coverage });
assert.equal(
  displayMetric(metric('missing', null), 'revenue'),
  'Data not yet available',
);
assert.equal(displayMetric(metric('verified', 0), 'purchases'), '0');
assert.match(displayMetric(metric('verified', 399), 'revenue'), /3\.99/);
assert.match(displayMetric(metric('verified', -399), 'revenue'), /-.*3\.99/);
assert.equal(
  aggregate(
    [
      { metrics: { revenue: metric('verified', 399) } },
      { metrics: { revenue: metric('missing', null) } },
    ],
    'revenue',
  ).state,
  'missing',
);
assert.equal(
  aggregate(
    [
      {
        metrics: {
          purchases: metric(
            'verified',
            3,
            'Observed sample of 5 invited sessions',
          ),
        },
      },
    ],
    'purchases',
  ).state,
  'missing',
);
assert.equal(
  aggregate(
    [
      { metrics: { revenue: metric('verified', 399) } },
      { metrics: { revenue: metric('verified', -100) } },
      { metrics: { revenue: metric('not_applicable', null) } },
    ],
    'revenue',
  ).value,
  299,
);
assert.equal(
  aggregate(
    [{ metrics: { revenue: metric('not_applicable', null) } }],
    'revenue',
  ).state,
  'not_applicable',
);
expectRejected((d) => {
  d.projects[0].metrics.usage.value = 0;
});
expectRejected((d) => {
  d.projects[0].metrics.usage.state = 'verified';
});
expectRejected((d) => {
  d.projects[0].url = 'javascript:alert(1)';
});
expectRejected((d) => {
  d.projects[0].url = null;
});
expectRejected((d) => {
  d.projects[1].id = d.projects[0].id;
});
expectRejected((d) => {
  d.period.end = '2026-09-31';
});
expectRejected((d) => {
  d.period.start = '2026-08-01';
});
expectRejected((d) => {
  d.projects[0].metrics.revenue.unit = 'USD cents';
});
const verified = copy();
Object.assign(verified.projects[0].metrics.revenue, {
  state: 'verified',
  value: 0,
  source: 'Verified aggregate, excluding tax and refunds',
  updatedAt: verified.period.end,
  coverage: 'All activity in the stated period',
});
validate(verified);
expectRejected((d) => {
  Object.assign(
    d.projects[0].metrics.revenue,
    verified.projects[0].metrics.revenue,
    { updatedAt: '2026-09-01' },
  );
});
console.log(
  '[OK] Ledger: unknown vs zero, missing/sample totals, refunds, period, dates, units, URLs and duplicate IDs.',
);

const files = fs
  .readdirSync(publicRoot, { recursive: true })
  .filter((file) => fs.statSync(path.join(publicRoot, file)).isFile());
for (const file of files) {
  assert(
    !/(^|[/\\])(?:\.git|\.env|node_modules|temp|artifacts)(?:[/\\]|$)/i.test(
      file,
    ),
    'Private directory in output',
  );
  assert(
    !/\.(?:pdf|md|csv)$/i.test(file),
    'Unexpected document in output: ' + file,
  );
}
for (const file of ['index.html', 'privacy.html']) {
  const html = read(file);
  assert.match(html, /<html lang="en">/);
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.match(html, /<main\b[^>]*id="main"/);
  assert.match(html, /href="#main"/);
  assert.match(html, /mailto:marcohenalu@gmail\.com/);
  assert.match(html, /https:\/\/debarroslabs\.com/);
  assert(
    !/Riptide|WavePass|ShiftSwap|Gij[oó]n Throwdown|gsap|data-t=/.test(html),
  );
  const ids = Array.from(html.matchAll(/\bid="([^"]+)"/g), (m) => m[1]);
  assert.equal(new Set(ids).size, ids.length, 'Duplicate HTML IDs');
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const ref = match[1];
    if (ref.startsWith('#'))
      assert(ids.includes(ref.slice(1)), 'Broken anchor: ' + ref);
    else if (!/^(https:|mailto:)/.test(ref)) {
      const target = path.resolve(publicRoot, ref.split('?')[0]);
      assert(target === publicRoot || target.startsWith(publicRoot + path.sep));
      assert(fs.existsSync(target), 'Missing local file: ' + ref);
    }
  }
}
for (const match of read('styles.css').matchAll(
  /url\(['"]?([^)'"\s]+)['"]?\)/g,
))
  assert(fs.existsSync(path.join(publicRoot, match[1])), 'Missing CSS asset');
for (const file of ['social.png', 'icons/apple-touch-icon.png']) {
  const image = fs.readFileSync(path.join(publicRoot, file));
  assert.equal(image.subarray(1, 4).toString(), 'PNG');
  const expected = file === 'social.png' ? [1200, 630] : [180, 180];
  assert.equal(image.readUInt32BE(16), expected[0]);
  assert.equal(image.readUInt32BE(20), expected[1]);
}
const config = JSON.parse(
  fs.readFileSync(path.join(root, 'vercel.json'), 'utf8'),
);
assert.equal(config.outputDirectory, 'public');
assert.equal(config.framework, null);
assert.equal(config.buildCommand, null);
assert.equal(config.installCommand, null);
console.log(
  `[OK] Static release: ${files.length} public files, valid assets/links/metadata, public-only deployment, no install/build dependencies.`,
);
