CREATE TABLE accounts (
  member_id TEXT PRIMARY KEY NOT NULL REFERENCES profiles(id),
  email TEXT UNIQUE COLLATE NOCASE,
  password_hash TEXT,
  salt TEXT,
  invite_hash TEXT UNIQUE,
  invite_until INTEGER,
  application_id TEXT UNIQUE REFERENCES membership_applications(id)
);
CREATE TABLE sessions (
  token_hash TEXT PRIMARY KEY NOT NULL,
  member_id TEXT NOT NULL REFERENCES accounts(member_id),
  expires_at INTEGER NOT NULL
);
CREATE INDEX sessions_expiry ON sessions(expires_at);
