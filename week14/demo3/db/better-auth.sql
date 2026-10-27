-- =====================================================================
-- Week 14, demo 3: the tables Better Auth needs
--
-- Run this in your  store  database, AFTER store.sql.
-- (Neon -> SQL Editor -> pick  store  in the dropdown -> paste -> Run.)
-- It doesn't need Tuesday's auth.sql or hash.sql, and it doesn't touch
-- them: Tuesday's  sessions  table stays, so demo1 and demo2 still work.
--
-- Safe to run again: it throws away every Better Auth login and puts the
-- two demo accounts back. store.sql then this file is the full reset.
--
-- Better Auth wants four tables: user, session, account, verification.
-- We already have a users table, so it uses ours (three new columns),
-- and the other three are new.
-- =====================================================================

-- 1. users: the three columns Better Auth needs that the store didn't have.
ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verified boolean NOT NULL DEFAULT false;
ALTER TABLE users ADD COLUMN IF NOT EXISTS image text;
ALTER TABLE users ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();

DROP TABLE IF EXISTS session, account, verification;

-- 2. session: one row per logged-in browser.
--    Tuesday's sessions table, done properly: the token is what goes in the
--    cookie, and every session has an end.
CREATE TABLE session (
  id          serial PRIMARY KEY,
  token       text NOT NULL UNIQUE,
  user_id     integer NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  expires_at  timestamptz NOT NULL,
  ip_address  text,
  user_agent  text,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

-- 3. account: one row per way a person can log in.
--    Email and password is provider_id 'credential', and the HASHED password
--    lives here, not on users. "Sign in with Google" would be a second row
--    for the same person, with provider_id 'google' and no password at all.
CREATE TABLE account (
  id                        serial PRIMARY KEY,
  user_id                   integer NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  account_id                text NOT NULL,
  provider_id               text NOT NULL,
  password                  text,
  access_token              text,
  refresh_token             text,
  id_token                  text,
  access_token_expires_at   timestamptz,
  refresh_token_expires_at  timestamptz,
  scope                     text,
  created_at                timestamptz NOT NULL DEFAULT now(),
  updated_at                timestamptz NOT NULL DEFAULT now()
);

-- 4. verification: short-lived codes, like "check your email" links and
--    password resets. Empty tonight; Better Auth fills it when it needs to.
CREATE TABLE verification (
  id          serial PRIMARY KEY,
  identifier  text NOT NULL,
  value       text NOT NULL,
  expires_at  timestamptz NOT NULL,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX session_user_id_idx ON session (user_id);
CREATE INDEX account_user_id_idx ON account (user_id);
CREATE INDEX verification_identifier_idx ON verification (identifier);

-- 5. Two accounts to log in as, same people and passwords as Tuesday.
--    Jennifer Rivera (user 42) is a customer: latte4ever.
--    Priya Raman (user 3) is a manager: manager123.
--    The passwords are fake. These hashes were made by Better Auth itself
--    (hashPassword from better-auth/crypto). Each one is  salt:hash .
INSERT INTO account (user_id, account_id, provider_id, password) VALUES
  (42, '42', 'credential', '27121190b593d02ca36ede7442a5e0cf:171b6c69b93ef0ce055c5b2f91a2679f0c062af0a5cb7a30537e2958d02fd8b3613a32a66463bb51551b25b15a3ce069518bc8b4043600df26b2f116745e8e61'),
  (3,  '3',  'credential', '39e9c5617dbcf9ae6de35afe55e09e17:17859b4730ba607eabd44b98ff849bbac81857bca696eeed7d8193e0e365ad50e8797a579f715382b811c39c430fba733c929279bbbbaf927fe4076fd1ba3671');

SELECT u.id, u.email, u.first_name, a.provider_id, left(a.password, 20) || '...' AS password
  FROM users u JOIN account a ON a.user_id = u.id
  ORDER BY u.id;
