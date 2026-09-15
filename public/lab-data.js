// Public aggregates only. Maintenance guide: ../MANUAL-EDITING-GUIDE.md.
// Dates are explicit: opening the page never updates a reporting date.
globalThis.LAB_DATA = {
  reviewedAt: '2026-09-15',
  period: { start: '2026-09-01', end: '2026-09-15', timezone: 'Europe/Madrid' },
  projects: [
    {
      id: 'opentests',
      name: 'OpenTests',
      label: 'A DEBARROSLABS EXPERIMENT',
      status: 'published',
      checkedAt: '2026-09-15',
      url: 'https://opentests.vercel.app/',
      art: 'notebook',
      artLabel: 'Your study notebook.',
      description:
        'Turn your own questions into a study routine. Create or import a test, practise at your pace, and review the corrections.',
      features: [
        'Write questions or import Excel',
        'Practice and exam modes',
        'Saved in your browser',
      ],
      note: 'The study tool is free and needs no account. Optional PDF generation is being prepared as a one-off purchase per generation, with no subscription. It is not available on the public site yet.',
      next: 'Next: verify and release optional paid PDF generation.',
      usageDefinition:
        'Completed practice or exam sessions. Exclude bundled examples and internal tests. Counts actions, not people; repeated sessions can count separately.',
      metrics: {
        usage: {
          state: 'missing',
          value: null,
          unit: 'Study sessions',
          source:
            'No central usage reporting is connected. Browser-local results are not a global usage total.',
          updatedAt: null,
          coverage: 'Not measured',
        },
        purchases: {
          state: 'missing',
          value: null,
          unit: 'Paid orders',
          source:
            'No verified aggregate payment report has been supplied. A deployed study tool is not evidence of paid orders.',
          updatedAt: null,
          coverage: 'Not verified',
        },
        revenue: {
          state: 'missing',
          value: null,
          unit: 'EUR cents',
          source: 'No verified revenue and refund report has been supplied.',
          updatedAt: null,
          coverage: 'Not verified',
        },
      },
    },
    {
      id: 'stepbudget',
      name: 'StepBudget',
      label: 'DEBARROSLABS // EXP.001',
      status: 'development',
      checkedAt: '2026-09-15',
      url: null,
      art: 'steps',
      artLabel: 'Find what needs a look.',
      description:
        'Make sense of your Jira Automation rules. A local version reads an export and highlights structures worth reviewing, with the reasons attached.',
      features: [
        'Jira Automation JSON exports',
        'Rule-by-rule review',
        'Processed in your browser',
      ],
      note: 'A working local version, not publicly available yet. It reviews structure; it does not measure real Jira usage, calculate your bill or change your rules. Testing with administrators has not started.',
      next: 'Next: publish the validation version and test it with Jira administrators.',
      usageDefinition:
        'Completed reports from users’ own compatible Jira exports. Exclude the example, internal tests and technical corpus checks. A report is an action, not a unique administrator.',
      metrics: {
        usage: {
          state: 'missing',
          value: null,
          unit: 'Export reports',
          source:
            'No public usage measurement. The planned validation test has not started; technical test files are not users.',
          updatedAt: null,
          coverage: 'Not measured',
        },
        purchases: {
          state: 'not_applicable',
          value: null,
          unit: 'Paid orders',
          source: 'This version has no paid offer or checkout.',
          updatedAt: null,
          coverage: 'No paid offer',
        },
        revenue: {
          state: 'not_applicable',
          value: null,
          unit: 'EUR cents',
          source:
            'This version has no paid offer. It is not a revenue-generating release.',
          updatedAt: null,
          coverage: 'No paid offer',
        },
      },
    },
  ],
};
