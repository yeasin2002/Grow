const journal = {
  entries: [
    {
      idx: 1,
      tag: 'm0001_initial',
      when: Date.now(),
      breakpoints: false,
    },
  ],
};

const migrations: Record<string, string> = {
  // key should be 'm' + idx padded to 4 digits
  m0001: `CREATE TABLE IF NOT EXISTS notes (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
  );`,
};

export default { journal, migrations };
