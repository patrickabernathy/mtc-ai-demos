-- =====================================================================
-- Week 14: after the passwords are hashed
--
-- Run this in your  store  database once the code checks password_hash
-- instead of password (states/04-hashed). It stores a hash for the two
-- demo accounts and throws the plain-text passwords away.
--
-- The hashes were made with the same hashPassword() the code uses:
--   Jennifer's is 'latte4ever', Priya's is 'manager123'.
-- Each one is  salt:hash . The salt is random, so if you hash the same
-- password yourself you'll get a different line. That's the point.
--
-- Safe to run again: it sets the same values every time.
-- =====================================================================

UPDATE users SET password = NULL,
  password_hash = 'fb4e7605e8fcf271989f634c9d4a80ec:ee9ee6ad815391e087e5ae5d8582a8f6d9e49258c6ebbc11b04d40b293cd03b7a3b0ff6a225df26cf73e1c189d37a71b82e0000ca26b14646666da2f4651ce50'
  WHERE id = 42;

UPDATE users SET password = NULL,
  password_hash = 'fe10b806775f255d5829fab2f3905629:3639b75d5fbb57f0796e9b039655c902767c77244226ea36067c780b7adaf8203770d85624b30dc4086805a2a3ef92d6089d49ae45c3f0389526ab91d8a44ed0'
  WHERE id = 3;

-- Anyone who signed up while passwords were stored plainly: their
-- password is now useless (it was never hashed), so they sign up again.
UPDATE users SET password = NULL WHERE password IS NOT NULL;

SELECT id, email, password, password_hash
  FROM users WHERE password_hash IS NOT NULL ORDER BY id;
