-- =====================================================================
-- Week 14 lab: the Paws & Whiskers shelter database
--
-- How to use it (Step 2 of the instructions):
--   1. In the Neon console, open your NEW project for this lab.
--   2. Open the SQL Editor. Leave the database dropdown on  neondb .
--   3. Paste this whole file in and press Run.
--
-- This file makes the shelter's own tables: pets and vets.
-- It does NOT make the login tables. Better Auth makes those, and you'll
-- generate them yourself in Step 7, straight from Better Auth's own docs.
--
-- Safe to run again: it only creates what's missing and only adds rows
-- that aren't there yet, so a second run changes nothing.
-- Want the shelter back the way it started? Run this line first, then
-- the whole file again:
--   DROP TABLE IF EXISTS pets, vets;
--
-- Every person, email and microchip number in here is made up.
-- Emails use example.com, which is reserved for exactly this:
-- it can never belong to a real person.
-- =====================================================================


-- ---------------------------------------------------------------------
-- 1. THE TABLES
-- ---------------------------------------------------------------------

-- Every animal the shelter has ever had.
-- The first four columns are public: anyone can see them on the home page.
-- The rest is private: only the pet's owner should ever see it.
CREATE TABLE IF NOT EXISTS pets (
  id           serial PRIMARY KEY,
  name         text NOT NULL,
  species      text NOT NULL CHECK (species IN ('dog', 'cat', 'rabbit')),
  age          integer NOT NULL CHECK (age >= 0),
  about        text NOT NULL,

  -- Who adopted it. NULL means it's still at the shelter, waiting.
  -- This is the email the owner logs in with. (Why an email and not a
  -- user id? Better Auth makes up each person's id when they sign up,
  -- and these rows were written before anyone signed up. There's no id
  -- to write down yet. An email we can write down today.)
  owner_email  text,
  adopted_on   date,
  microchip    text,
  vet_notes    text
);

-- The shelter's vets. Only used in "Going further".
CREATE TABLE IF NOT EXISTS vets (
  email  text PRIMARY KEY,
  name   text NOT NULL
);


-- ---------------------------------------------------------------------
-- 2. THE ROWS
-- ---------------------------------------------------------------------

-- Four pets still waiting at the shelter (no owner), two adopted by Ana,
-- two adopted by Ben. You'll sign up as Ana and Ben in Step 11.
INSERT INTO pets (id, name, species, age, about, owner_email, adopted_on, microchip, vet_notes) VALUES
  (1, 'Biscuit',    'dog',    3, 'Loves tennis balls. Will bring you every single one.', NULL, NULL, NULL, NULL),
  (2, 'Miso',       'cat',    2, 'Quiet, curious, and very good at finding warm laundry.', NULL, NULL, NULL, NULL),
  (3, 'Pepper',     'rabbit', 1, 'Fast. Chews cables. Worth it.', NULL, NULL, NULL, NULL),
  (4, 'Duke',       'dog',    7, 'A gentle old gentleman who naps in sunbeams.',
      'ana@example.com', '2026-03-14', '985-000-000-000-104', 'Arthritis in back legs. Joint supplement every morning.'),
  (5, 'Clementine', 'cat',    5, 'Orange, opinionated, and loud at 6 AM.',
      'ana@example.com', '2026-06-02', '985-000-000-000-105', 'Allergic to chicken. Fish-based food only.'),
  (6, 'Waffles',    'dog',    1, 'All legs and enthusiasm. Still learning "sit".', NULL, NULL, NULL, NULL),
  (7, 'Juniper',    'cat',    4, 'Shy at first. Then never leaves your lap.',
      'ben@example.com', '2026-01-20', '985-000-000-000-107', 'Dental cleaning due in December.'),
  (8, 'Noodle',     'rabbit', 2, 'Does a little jump when happy. Happy a lot.',
      'ben@example.com', '2026-08-09', '985-000-000-000-108', 'Nail trim every 6 weeks. Bites if you skip the treat.')
ON CONFLICT (id) DO NOTHING;

-- We gave the ids by hand above, so tell the counter where to carry on
-- from. Otherwise the next new pet would try to be number 1 again.
SELECT setval('pets_id_seq', (SELECT max(id) FROM pets));

INSERT INTO vets (email, name) VALUES
  ('dr.lee@example.com', 'Dr. Sam Lee')
ON CONFLICT (email) DO NOTHING;


-- ---------------------------------------------------------------------
-- 3. CHECK IT
-- ---------------------------------------------------------------------
-- You should see 8 pets: 4 with no owner, 2 for Ana, 2 for Ben.
SELECT id, name, species, coalesce(owner_email, '(at the shelter)') AS owner
  FROM pets
  ORDER BY id;
