-- =====================================================================
-- Week 14: logging in to the Corner Store
--
-- Run this in your  store  database, AFTER store.sql.
-- (Neon -> SQL Editor -> pick  store  in the dropdown -> paste -> Run.)
--
-- Safe to run again: it throws away every login and puts the two
-- demo accounts back the way the night starts. store.sql then this
-- file is the full reset button.
--
-- The passwords below are fake and only ever used in this demo.
-- =====================================================================

-- 1. Where logins live.
--    One row per logged-in browser. The id is the long random value
--    that goes in the cookie. expires_at NULL means "never expires".
DROP TABLE IF EXISTS sessions;
CREATE TABLE sessions (
  id          text PRIMARY KEY,
  user_id     integer NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  created_at  timestamptz NOT NULL DEFAULT now(),
  expires_at  timestamptz
);

-- 2. Where passwords live.
--    password       the way the demo starts: the password itself. Wrong, on purpose.
--    password_hash  where it should go. Empty until hash.sql.
ALTER TABLE users ADD COLUMN IF NOT EXISTS password text;
ALTER TABLE users ADD COLUMN IF NOT EXISTS password_hash text;
UPDATE users SET password = NULL, password_hash = NULL
  WHERE password IS NOT NULL OR password_hash IS NOT NULL;

-- 3. Two accounts to log in as.
--    Jennifer Rivera (user 42) is a customer with 65 receipts.
--    Priya Raman (user 3) is a manager.
UPDATE users SET password = 'latte4ever' WHERE id = 42;
UPDATE users SET password = 'manager123' WHERE id = 3;

SELECT id, email, first_name, password, password_hash
  FROM users WHERE id IN (3, 42) ORDER BY id;
