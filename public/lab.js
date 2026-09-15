(function () {
  'use strict';
  const statuses = {
    development: 'In development',
    testing: 'Testing',
    published: 'Published',
    closed: 'Closed',
  };
  const keys = ['usage', 'purchases', 'revenue'];
  const escape = (text) =>
    String(text).replace(
      /[&<>"']/g,
      (char) =>
        ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;',
        })[char],
    );
  const date = (value) =>
    new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    }).format(new Date(value + 'T12:00:00Z'));
  const validDate = (value) =>
    typeof value === 'string' &&
    /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    !Number.isNaN(Date.parse(value)) &&
    new Date(value).toISOString().slice(0, 10) === value;
  const safeUrl = (value) => {
    try {
      return new URL(value).protocol === 'https:';
    } catch {
      return false;
    }
  };

  function validate(data) {
    if (
      !data ||
      !validDate(data.reviewedAt) ||
      !validDate(data.period?.start) ||
      !validDate(data.period?.end) ||
      data.period.start > data.period.end ||
      data.period.end > data.reviewedAt ||
      data.period.start.slice(0, 7) !== data.period.end.slice(0, 7) ||
      data.period.timezone !== 'Europe/Madrid'
    )
      throw new Error('Invalid review or monthly reporting period.');
    if (!Array.isArray(data.projects) || data.projects.length === 0)
      throw new Error('A project catalogue is required.');
    const ids = new Set();
    for (const p of data.projects) {
      if (!/^[a-z][a-z0-9-]+$/.test(p.id) || ids.has(p.id))
        throw new Error('Invalid or duplicate project ID.');
      ids.add(p.id);
      if (
        !Object.hasOwn(statuses, p.status) ||
        !validDate(p.checkedAt) ||
        p.checkedAt > data.reviewedAt
      )
        throw new Error('Invalid project status or verification date.');
      if (p.url !== null && !safeUrl(p.url))
        throw new Error('Product URLs must use HTTPS.');
      if (p.status === 'published' && !p.url)
        throw new Error('Published products need a verified public URL.');
      for (const field of [
        'name',
        'label',
        'description',
        'note',
        'next',
        'usageDefinition',
      ])
        if (typeof p[field] !== 'string' || !p[field].trim())
          throw new Error('Missing project content: ' + field);
      if (
        !Array.isArray(p.features) ||
        p.features.some((f) => typeof f !== 'string')
      )
        throw new Error('Invalid product features.');
      for (const key of keys) {
        const m = p.metrics?.[key];
        if (
          !m ||
          !['missing', 'not_applicable', 'verified'].includes(m.state) ||
          !m.source?.trim() ||
          !m.coverage?.trim() ||
          !m.unit?.trim()
        )
          throw new Error(
            'Metric needs an explicit state, source and coverage.',
          );
        if (key === 'revenue' && m.unit !== 'EUR cents')
          throw new Error('Revenue uses integer EUR cents.');
        if (m.state === 'verified') {
          if (
            !Number.isSafeInteger(m.value) ||
            (key !== 'revenue' && m.value < 0) ||
            !validDate(m.updatedAt) ||
            m.updatedAt < data.period.end ||
            m.updatedAt > data.reviewedAt
          )
            throw new Error(
              'Verified numbers need a value, source and valid verification date.',
            );
          if (/^(not measured|not verified)$/i.test(m.coverage))
            throw new Error('Verified metric needs actual coverage.');
        } else if (m.value !== null || m.updatedAt !== null)
          throw new Error(
            'Unknown or inapplicable metrics must use null, not zero.',
          );
      }
    }
    return data;
  }

  function aggregate(projects, key) {
    const metrics = projects.map((p) => p.metrics[key]);
    // A sample cannot become a lab-wide total. Only full-period totals can be summed.
    if (
      metrics.some(
        (m) =>
          m.state === 'missing' ||
          (m.state === 'verified' &&
            m.coverage !== 'All activity in the stated period'),
      )
    )
      return { state: 'missing', value: null };
    const known = metrics.filter((m) => m.state === 'verified');
    if (!known.length) return { state: 'not_applicable', value: null };
    const value = known.reduce((total, m) => total + m.value, 0);
    if (!Number.isSafeInteger(value))
      throw new Error('Aggregate exceeds the supported range.');
    return { state: 'verified', value };
  }

  function displayMetric(metric, key) {
    if (metric.state === 'missing') return 'Data not yet available';
    if (metric.state === 'not_applicable') return 'Not applicable';
    return key === 'revenue'
      ? new Intl.NumberFormat('en-IE', {
          style: 'currency',
          currency: 'EUR',
        }).format(metric.value / 100)
      : new Intl.NumberFormat('en-GB').format(metric.value);
  }
  const badge = (p) =>
    `<span class="status" data-status="${p.status}">${statuses[p.status]}</span>`;
  function render(data) {
    document.getElementById('product-list').innerHTML = data.projects
      .map(
        (p, index) => `
<article class="product" data-product="${escape(p.id)}" id="project-${escape(p.id)}" aria-labelledby="title-${escape(p.id)}">
<span class="product-index" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>
<div class="product-heading"><p class="eyebrow">${escape(p.label)}</p><h3 id="title-${escape(p.id)}">${escape(p.name)}</h3>${badge(p)}<div>${p.url ? `<a class="text-link" href="${escape(p.url)}">Open ${escape(p.name)} <span aria-hidden="true">↗</span></a>` : '<span class="unavailable-link">Public link not available yet</span>'}</div></div>
<div class="product-body"><p class="product-description">${escape(p.description)}</p><ul class="product-features">${p.features.map((f) => `<li>${escape(f)}</li>`).join('')}</ul><p class="product-note">${escape(p.note)}</p><p class="eyebrow">${escape(p.next)}</p><div class="product-bottom"><a class="text-link" href="#metrics-${escape(p.id)}">Project numbers <span aria-hidden="true">↓</span></a><span class="review-date">Status checked <time datetime="${p.checkedAt}">${date(p.checkedAt)}</time></span></div></div></article>`,
      )
      .join('');
    document.getElementById('reporting-period').textContent =
      `${date(data.period.start)} – ${date(data.period.end)} · ${data.period.timezone}`;
    const live = data.projects.filter((p) => p.status === 'published').length;
    const otherStates = Object.entries(statuses)
      .filter(([key]) => key !== 'published')
      .map(([key, label]) => [
        data.projects.filter((p) => p.status === key).length,
        label.toLowerCase(),
      ])
      .filter(([n]) => n)
      .map(([n, label]) => `${n} ${label}`)
      .join(' · ');
    const summary = (label, value, detail, missing = false) =>
      `<div class="summary-item"><span class="eyebrow">${label}</span><strong class="summary-value${missing ? ' summary-missing' : ''}">${escape(value)}</strong><span class="summary-detail">${escape(detail)}</span></div>`;
    document.getElementById('lab-summary').innerHTML =
      summary(
        'IN THIS COLLECTION',
        data.projects.length.toString().padStart(2, '0'),
        'Documented experiments',
      ) +
      summary(
        'PUBLISHED',
        live.toString().padStart(2, '0'),
        otherStates || 'No other project states',
      ) +
      ['purchases', 'revenue']
        .map((key) => {
          const total = aggregate(data.projects, key);
          return summary(
            key === 'purchases' ? 'PURCHASES / PERIOD' : 'REVENUE / PERIOD',
            displayMetric(total, key),
            key === 'purchases'
              ? 'Paid orders, not customers'
              : 'EUR · before fees and costs',
            total.state !== 'verified',
          );
        })
        .join('');
    document.getElementById('ledger-review').textContent =
      `Catalogue reviewed ${date(data.reviewedAt)}. Numbers cover only the dates above; metric verification dates are shown separately.`;
    const labels = {
      usage: 'Use',
      purchases: 'Purchases',
      revenue: 'Revenue · EUR',
    };
    document.getElementById('metric-rows').innerHTML = data.projects
      .map(
        (p) =>
          `<tr id="metrics-${escape(p.id)}"><td><a href="#project-${escape(p.id)}" class="metric-project">${escape(p.name)}</a>${badge(p)}</td>${keys
            .map((key) => {
              const m = p.metrics[key];
              const detail =
                m.state === 'verified'
                  ? `${m.unit === 'EUR cents' ? 'EUR' : m.unit} · verified ${date(m.updatedAt)} · ${m.coverage}`
                  : m.state === 'not_applicable'
                    ? 'No paid offer in this version'
                    : `${m.unit === 'EUR cents' ? 'Revenue report pending' : m.unit} · unverified`;
              return `<td data-label="${labels[key]}"><span class="metric-value${m.state === 'verified' ? ' metric-number' : ''}">${escape(displayMetric(m, key))}</span><span class="metric-detail">${escape(detail)}</span></td>`;
            })
            .join('')}</tr>`,
      )
      .join('');
    document.getElementById('source-notes').innerHTML = data.projects
      .map(
        (p) =>
          `<section aria-labelledby="source-${escape(p.id)}"><h4 id="source-${escape(p.id)}">${escape(p.name)}</h4><p>${escape(p.usageDefinition)}</p><ul>${keys.map((key) => `<li><strong>${labels[key]}:</strong> ${escape(p.metrics[key].source)}${p.metrics[key].state === 'verified' ? ` Verified ${date(p.metrics[key].updatedAt)}. Coverage: ${escape(p.metrics[key].coverage)}.` : ' No numeric update published.'}</li>`).join('')}</ul></section>`,
      )
      .join('');
  }
  globalThis.LabLedger = { validate, aggregate, displayMetric };
  if (typeof document !== 'undefined') {
    try {
      render(validate(globalThis.LAB_DATA));
    } catch (error) {
      console.error('The lab catalogue could not be loaded.', error);
      document.getElementById('product-list').innerHTML =
        '<p>The detailed product notes are temporarily unavailable. <a href="https://opentests.vercel.app/">Open OpenTests</a>, or <a href="mailto:marcohenalu@gmail.com">email Henalu</a>. No verified metrics are available here.</p>';
      document.getElementById('reporting-period').textContent =
        'Report unavailable';
      document.getElementById('lab-summary').textContent =
        'Data not yet available';
    }
  }
})();
