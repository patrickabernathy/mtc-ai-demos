-- =====================================================================
-- The Corner Store database
--
-- How to use it:
--   1. In the Neon console, open your project and go to Databases.
--      Create a new database called  store  .
--   2. Open the SQL Editor, pick  store  in the database dropdown.
--   3. Paste this whole file in and press Run. It takes about a minute.
--
-- Safe to run again: it deletes the Corner Store tables first and
-- rebuilds them exactly the same way. It does NOT touch any other table.
-- Everyone who runs it gets the same rows, so answers can be compared.
--
-- Every person, email and phone number in here is made up.
-- Emails use example.com and phones use 555-01xx, which are reserved
-- for exactly this: they can never belong to a real person.
-- =====================================================================

DROP TABLE IF EXISTS reviews, receipt_items, receipts, user_roles, users,
  roles, items, categories, locations, spreadsheet_sales CASCADE;
DROP FUNCTION IF EXISTS pick(text, integer);


-- ---------------------------------------------------------------------
-- 1. THE TABLES
-- ---------------------------------------------------------------------

CREATE TABLE locations (
  id          serial PRIMARY KEY,
  name        text NOT NULL UNIQUE,
  street      text NOT NULL,
  opened_on   date NOT NULL,
  phone       text                          -- NULL = no phone line yet
);

CREATE TABLE categories (
  id    serial PRIMARY KEY,
  name  text NOT NULL UNIQUE
);

CREATE TABLE items (
  id            serial PRIMARY KEY,
  category_id   integer NOT NULL REFERENCES categories (id),
  name          text NOT NULL UNIQUE,
  description   text,                       -- NULL = nobody wrote one
  price         numeric(6,2) NOT NULL CHECK (price >= 0),
  is_available  boolean NOT NULL DEFAULT true,
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE roles (
  id    serial PRIMARY KEY,
  name  text NOT NULL UNIQUE
);

CREATE TABLE users (
  id          serial PRIMARY KEY,
  email       text NOT NULL UNIQUE,
  first_name  text NOT NULL,
  last_name   text NOT NULL,
  phone       text,                         -- NULL = didn't give one
  birthday    date,                         -- NULL = didn't give one
  is_active   boolean NOT NULL DEFAULT true,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- The link table. One row = "this user has this role".
-- A user can have many roles; a role belongs to many users.
CREATE TABLE user_roles (
  user_id      integer NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  role_id      integer NOT NULL REFERENCES roles (id),
  assigned_at  timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, role_id)
);

CREATE TABLE receipts (
  id              serial PRIMARY KEY,
  location_id     integer NOT NULL REFERENCES locations (id),
  cashier_id      integer NOT NULL REFERENCES users (id),
  customer_id     integer REFERENCES users (id),   -- NULL = guest, no account
  payment_method  text NOT NULL DEFAULT 'card'
                  CHECK (payment_method IN ('cash', 'card', 'app')),
  tip             numeric(6,2) NOT NULL DEFAULT 0 CHECK (tip >= 0),
  created_at      timestamptz NOT NULL DEFAULT now(),
  -- paying in the app means you have an account
  CHECK (payment_method <> 'app' OR customer_id IS NOT NULL)
);

-- Also a link table: which items were on which receipt, how many,
-- and what each one cost ON THAT DAY.
CREATE TABLE receipt_items (
  receipt_id  integer NOT NULL REFERENCES receipts (id) ON DELETE CASCADE,
  item_id     integer NOT NULL REFERENCES items (id),
  quantity    integer NOT NULL DEFAULT 1 CHECK (quantity > 0),
  unit_price  numeric(6,2) NOT NULL CHECK (unit_price >= 0),
  PRIMARY KEY (receipt_id, item_id)
);

CREATE TABLE reviews (
  id          serial PRIMARY KEY,
  user_id     integer NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  item_id     integer NOT NULL REFERENCES items (id),
  rating      integer NOT NULL CHECK (rating BETWEEN 1 AND 5),
  body        text,                         -- NULL = stars only, no words
  created_at  timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, item_id)                 -- one review per person per item
);

COMMENT ON TABLE locations     IS 'The three Corner Store shops.';
COMMENT ON TABLE categories    IS 'Groups of items on the menu.';
COMMENT ON TABLE items         IS 'Everything the store sells. price is today''s price.';
COMMENT ON TABLE roles         IS 'Jobs a user can have: customer, cashier, barista, manager, owner.';
COMMENT ON TABLE users         IS 'Everyone with an account: staff and customers.';
COMMENT ON TABLE user_roles    IS 'Link table: which users have which roles.';
COMMENT ON TABLE receipts      IS 'One row per sale. customer_id is NULL for a guest.';
COMMENT ON TABLE receipt_items IS 'Link table: the lines on each receipt, with the price paid that day.';
COMMENT ON TABLE reviews       IS 'Star ratings customers left on items.';


-- ---------------------------------------------------------------------
-- 2. THE HAND-WRITTEN DATA
-- ---------------------------------------------------------------------

INSERT INTO locations (name, street, opened_on, phone) VALUES
  ('Main Street', '1520 Main St, Columbia SC',     '2019-03-04', '(803) 555-0100'),
  ('Five Points', '712 Harden St, Columbia SC',    '2022-08-15', '(803) 555-0101'),
  ('The Vista',   '901 Gervais St, Columbia SC',   '2025-06-02', NULL);

INSERT INTO categories (name) VALUES
  ('Coffee'), ('Tea'), ('Cold Drinks'), ('Bakery'), ('Sandwiches'), ('Merch'),
  ('Smoothies');   -- on the way, nothing in it yet

INSERT INTO items (category_id, name, description, price, is_available, created_at) VALUES
  (1, 'Espresso',   'A single shot.',                             2.50, true,  '2019-03-01'),
  (1, 'Americano',  'Espresso and hot water.',                    3.00, true,  '2019-03-01'),
  (1, 'Latte',      'Espresso and steamed milk.',                 4.00, true,  '2019-03-01'),
  (1, 'Cappuccino', NULL,                                         4.00, true,  '2019-03-01'),
  (1, 'Mocha',      'Latte with chocolate.',                      4.50, true,  '2019-03-01'),
  (1, 'Flat White', NULL,                                         4.25, true,  '2023-02-01'),
  (1, 'Seasonal oat-milk pumpkin spice', 'September to November only.', 5.25, true, '2024-09-01'),
  (1, 'Gingerbread Latte', 'Holiday 2025 only.',                  4.75, false, '2025-11-01'),
  (2, 'Chai Latte',  NULL,                                        4.25, true,  '2019-03-01'),
  (2, 'Green Tea',   NULL,                                        2.75, true,  '2019-03-01'),
  (2, 'Earl Grey',   NULL,                                        2.75, true,  '2019-03-01'),
  (2, 'Matcha Latte','Ceremonial matcha and milk.',               4.75, true,  '2023-02-01'),
  (3, 'Cold Brew',  'Steeped 18 hours.',                          3.75, true,  '2019-03-01'),
  (3, 'Iced Latte',  NULL,                                        4.25, true,  '2019-03-01'),
  (3, 'Lemonade',   'Fresh squeezed.',                            3.00, true,  '2019-03-01'),
  (3, 'Sweet Tea',  'It''s South Carolina.',                      2.50, true,  '2019-03-01'),
  (4, 'Blueberry Muffin', NULL,                                   3.25, true,  '2019-03-01'),
  (4, 'Croissant',  'Butter. Lots of it.',                        3.50, true,  '2019-03-01'),
  (4, 'Cinnamon Roll', NULL,                                      3.95, true,  '2019-03-01'),
  (4, 'Chocolate Chip Cookie', NULL,                              2.25, true,  '2019-03-01'),
  (4, 'Banana Bread', NULL,                                       3.00, true,  '2021-01-15'),
  (4, 'Biscuit',    'Buttermilk.',                                2.50, true,  '2019-03-01'),
  (5, 'Bacon Egg & Cheese', 'On a biscuit or a bagel.',           5.95, true,  '2019-03-01'),
  (5, 'Turkey Club', NULL,                                        8.50, true,  '2019-03-01'),
  (5, 'Grilled Cheese', NULL,                                     6.25, true,  '2019-03-01'),
  (5, 'Pimento Cheese', 'On white, the right way.',               6.75, true,  '2020-05-01'),
  (5, 'Veggie Wrap', NULL,                                        7.95, true,  '2022-08-15'),
  (6, 'Corner Store Mug', '12 oz, dishwasher safe.',             14.00, true,  '2021-11-01'),
  (6, 'Tote Bag',   NULL,                                        18.00, true,  '2026-10-01'),
  (6, 'Bag of Beans', 'House blend, 12 oz.',                     16.00, true,  '2020-01-01');

INSERT INTO roles (name) VALUES
  ('customer'), ('cashier'), ('barista'), ('manager'), ('owner');

-- Staff: users 1-12
INSERT INTO users (email, first_name, last_name, phone, birthday, created_at) VALUES
  ('dana.whitfield@example.com', 'Dana',   'Whitfield', '(803) 555-0110', '1978-04-12', '2019-01-02'),
  ('marcus.bell@example.com',    'Marcus', 'Bell',      '(803) 555-0111', '1990-09-30', '2019-02-11'),
  ('priya.raman@example.com',    'Priya',  'Raman',     '(803) 555-0112', NULL,         '2022-07-01'),
  ('luis.ortega@example.com',    'Luis',   'Ortega',    '(803) 555-0113', '1999-01-08', '2021-05-17'),
  ('keisha.grant@example.com',   'Keisha', 'Grant',     NULL,             '2001-06-21', '2023-03-06'),
  ('tom.hadley@example.com',     'Tom',    'Hadley',    '(803) 555-0115', NULL,         '2022-08-01'),
  ('ana.souza@example.com',      'Ana',    'Souza',     '(803) 555-0116', '2003-11-02', '2024-01-08'),
  ('jordan.pike@example.com',    'Jordan', 'Pike',      NULL,             NULL,         '2025-05-19'),
  ('mei.lin@example.com',        'Mei',    'Lin',       '(803) 555-0118', '1997-02-14', '2025-05-19'),
  ('sam.okafor@example.com',     'Sam',    'Okafor',    '(803) 555-0119', '2000-07-04', '2025-05-26'),
  ('riley.chen@example.com',     'Riley',  'Chen',      NULL,             '2004-03-29', '2024-06-10'),
  ('ellie.brooks@example.com',   'Ellie',  'Brooks',    '(803) 555-0121', '1995-12-01', '2022-09-12');

-- 1 customer, 2 cashier, 3 barista, 4 manager, 5 owner
INSERT INTO user_roles (user_id, role_id, assigned_at) VALUES
  (1, 5, '2019-01-02'), (1, 4, '2019-01-02'),
  (2, 4, '2021-03-01'), (2, 3, '2019-02-11'),
  (3, 4, '2022-07-01'),
  (4, 2, '2021-05-17'), (4, 3, '2022-01-10'),
  (5, 2, '2023-03-06'),
  (6, 2, '2022-08-01'), (6, 3, '2022-08-01'),
  (7, 2, '2024-01-08'),
  (8, 2, '2025-05-19'),
  (9, 2, '2025-05-19'), (9, 3, '2025-05-19'),
  (10, 3, '2025-05-26'),
  (11, 3, '2024-06-10'),
  (12, 3, '2022-09-12'), (12, 1, '2023-01-04');


-- ---------------------------------------------------------------------
-- 3. THE GENERATED DATA
--
-- pick(seed, n) turns any text into a whole number from 0 to n-1.
-- The same text always gives the same number, which is why everyone
-- who runs this file gets exactly the same rows. It's deleted at the end.
-- ---------------------------------------------------------------------

CREATE FUNCTION pick(seed text, n integer) RETURNS integer
LANGUAGE sql IMMUTABLE AS $$
  SELECT (('x' || substr(md5(seed), 1, 8))::bit(32)::bigint % n)::integer
$$;

-- Customers: users 13-2512
INSERT INTO users (email, first_name, last_name, phone, birthday, is_active, created_at)
SELECT
  lower(f) || '.' || lower(l) || g || '@example.com',
  f,
  l,
  CASE WHEN pick('phone' || g, 100) < 55
       THEN '(803) 555-01' || lpad(pick('ph#' || g, 100)::text, 2, '0') END,
  CASE WHEN pick('bday' || g, 100) < 45
       THEN date '1960-01-01' + pick('bd#' || g, 16000) END,
  pick('active' || g, 100) >= 3,
  timestamptz '2023-06-01 09:00 America/New_York'
    + pick('joined' || g, 580) * interval '1 day'
    + pick('jmin' || g, 600) * interval '1 minute'
FROM (
  SELECT g,
    (ARRAY['James','Mary','Robert','Patricia','John','Jennifer','Michael','Linda',
           'David','Elizabeth','William','Barbara','Richard','Susan','Joseph','Jessica',
           'Thomas','Sarah','Chris','Karen','Daniel','Lisa','Matthew','Nancy','Anthony',
           'Betty','Mark','Sandra','Steven','Ashley','Andrew','Kimberly','Joshua','Emily',
           'Kevin','Donna','Brian','Michelle','Tyler','Carol','Aaliyah','Amanda','Deshawn',
           'Melissa','Jamal','Deborah','Carlos','Stephanie','Maria','Rebecca','Jose',
           'Laura','Hannah','Imani','Omar','Grace','Noah','Chloe','Ethan','Zoe'])
      [1 + pick('first' || g, 60)] AS f,
    (ARRAY['Smith','Johnson','Williams','Brown','Jones','Garcia','Miller','Davis',
           'Rodriguez','Martinez','Hernandez','Lopez','Gonzalez','Wilson','Anderson',
           'Thomas','Taylor','Moore','Jackson','Martin','Lee','Perez','Thompson','White',
           'Harris','Sanchez','Clark','Ramirez','Lewis','Robinson','Walker','Young',
           'Allen','King','Wright','Scott','Torres','Nguyen','Hill','Flores','Green',
           'Adams','Nelson','Baker','Hall','Rivera','Campbell','Mitchell','Carter',
           'Roberts','Washington','Simmons','Pinckney','Rutledge','Moultrie','Middleton',
           'Gadsden','Huger','Manigault','Legare'])
      [1 + pick('last' || g, 60)] AS l
  FROM generate_series(13, 2512) AS g
) AS names;

INSERT INTO user_roles (user_id, role_id, assigned_at)
SELECT id, 1, created_at FROM users WHERE id >= 13;

-- 100,000 receipts, 1 Jan 2025 to 12 Oct 2026, 6:30 AM to 7 PM.
-- Regulars (low customer ids) come in far more often than everyone else.
-- About a third of sales are guests with no account.
INSERT INTO receipts (location_id, cashier_id, customer_id, payment_method, tip, created_at)
SELECT location_id,
  CASE location_id WHEN 1 THEN 4 WHEN 2 THEN 6 ELSE 8 END + pick('cashier' || g, 2),
  customer_id,
  payment_method,
  CASE WHEN payment_method <> 'cash' AND pick('tip' || g, 100) < 45
       THEN (ARRAY[0.50, 1.00, 1.00, 2.00])[1 + pick('tip$' || g, 4)]
       ELSE 0 END,
  created_at
FROM (
  SELECT g, created_at, customer_id,
    CASE WHEN loc = 3 AND created_at < date '2025-06-02' THEN 1 ELSE loc END AS location_id,
    CASE WHEN customer_id IS NULL
         THEN CASE WHEN pick('pay' || g, 100) < 65 THEN 'card' ELSE 'cash' END
         ELSE CASE WHEN pick('pay' || g, 100) < 30 THEN 'app'
                   WHEN pick('pay' || g, 100) < 80 THEN 'card'
                   ELSE 'cash' END
    END AS payment_method
  FROM (
    SELECT g,
      CASE WHEN pick('loc' || g, 100) < 45 THEN 1
           WHEN pick('loc' || g, 100) < 80 THEN 2
           ELSE 3 END AS loc,
      CASE WHEN pick('guest' || g, 100) < 35 THEN NULL
           ELSE 13 + floor(2500 * power(pick('cust' || g, 1000000) / 1000000.0, 1.5))::integer
      END AS customer_id,
      timestamp '2025-01-01 06:30'
        + pick('day' || g, 650) * interval '1 day'
        + least(pick('m1' || g, 750), pick('m2' || g, 750)) * interval '1 minute'
        + pick('sec' || g, 60) * interval '1 second' AS local_time
    FROM generate_series(1, 100000) AS g
  ) AS raw
  CROSS JOIN LATERAL (SELECT raw.local_time AT TIME ZONE 'America/New_York' AS created_at) AS t
) AS shaped
ORDER BY created_at, g;

-- The lines on every receipt. Lattes and cold brew sell most; the tote bag
-- has never sold. Pumpkin spice only sells Sep-Nov, gingerbread only in
-- Nov-Dec 2025. Coffee and tea went up 25 cents on 1 Jan 2026, so older
-- lines were rung up at the old price.
INSERT INTO receipt_items (receipt_id, item_id, quantity, unit_price)
WITH weights (name, w) AS (
  VALUES ('Latte', 40), ('Cold Brew', 25), ('Americano', 20), ('Cappuccino', 15),
         ('Iced Latte', 15), ('Seasonal oat-milk pumpkin spice', 15), ('Blueberry Muffin', 14),
         ('Espresso', 12), ('Mocha', 12), ('Chai Latte', 12), ('Croissant', 12),
         ('Bacon Egg & Cheese', 12), ('Sweet Tea', 10), ('Chocolate Chip Cookie', 10),
         ('Biscuit', 10), ('Cinnamon Roll', 9), ('Flat White', 8), ('Matcha Latte', 8),
         ('Gingerbread Latte', 6), ('Lemonade', 6), ('Banana Bread', 6), ('Turkey Club', 6),
         ('Pimento Cheese', 6), ('Green Tea', 5), ('Grilled Cheese', 5), ('Earl Grey', 4),
         ('Veggie Wrap', 4), ('Bag of Beans', 2), ('Corner Store Mug', 1)
),
ranges AS (
  SELECT i.id, i.name, i.price, c.name AS category,
         sum(w.w) OVER (ORDER BY i.id) - w.w AS lo,
         sum(w.w) OVER (ORDER BY i.id)       AS hi,
         sum(w.w) OVER ()                    AS total
  FROM items i
  JOIN weights w ON w.name = i.name
  JOIN categories c ON c.id = i.category_id
),
lines AS (
  SELECT r.id AS receipt_id, r.created_at, n,
         pick('item' || r.id || '-' || n, 1000000) AS roll,
         CASE WHEN pick('qty' || r.id || '-' || n, 100) < 85 THEN 1
              WHEN pick('qty' || r.id || '-' || n, 100) < 97 THEN 2
              ELSE 3 END AS quantity
  FROM receipts r
  CROSS JOIN LATERAL generate_series(1,
    CASE WHEN pick('lines' || r.id, 100) < 50 THEN 1
         WHEN pick('lines' || r.id, 100) < 80 THEN 2
         WHEN pick('lines' || r.id, 100) < 95 THEN 3
         ELSE 4 END) AS n
),
chosen AS (
  SELECT l.receipt_id, l.created_at, l.quantity, rg.name
  FROM lines l
  JOIN ranges rg ON (l.roll % rg.total) >= rg.lo AND (l.roll % rg.total) < rg.hi
),
in_season AS (
  SELECT receipt_id, created_at, quantity,
    CASE
      WHEN name = 'Seasonal oat-milk pumpkin spice'
           AND extract(month FROM created_at AT TIME ZONE 'America/New_York') NOT IN (9, 10, 11)
        THEN 'Latte'
      WHEN name = 'Gingerbread Latte'
           AND NOT (created_at >= timestamptz '2025-11-01 00:00 America/New_York'
                AND created_at <  timestamptz '2026-01-01 00:00 America/New_York')
        THEN 'Mocha'
      ELSE name
    END AS name
  FROM chosen
)
SELECT s.receipt_id, i.id, sum(s.quantity),
  CASE WHEN c.name IN ('Coffee', 'Tea')
            AND i.name <> 'Gingerbread Latte'
            AND min(s.created_at) < timestamptz '2026-01-01 00:00 America/New_York'
       THEN i.price - 0.25
       ELSE i.price END
FROM in_season s
JOIN items i ON i.name = s.name
JOIN categories c ON c.id = i.category_id
GROUP BY s.receipt_id, i.id, i.name, i.price, c.name
ORDER BY s.receipt_id, i.id;

-- About 4,000 reviews. Some are stars only (body is NULL).
INSERT INTO reviews (user_id, item_id, rating, body, created_at)
SELECT DISTINCT ON (user_id, item_id) user_id, item_id, rating,
  CASE WHEN pick('said' || g, 100) < 45 THEN NULL
       WHEN rating >= 4 THEN (ARRAY['Perfect every time.', 'My daily order.',
              'Best in Columbia.', 'Worth the line.', 'Staff are great.'])[1 + pick('txt' || g, 5)]
       WHEN rating = 3  THEN (ARRAY['Fine. Nothing special.', 'Good but pricey.',
              'Depends who makes it.'])[1 + pick('txt' || g, 3)]
       ELSE (ARRAY['Way too sweet.', 'Cold when I got it.', 'Not what it used to be.',
              'Waited 20 minutes.'])[1 + pick('txt' || g, 4)]
  END,
  timestamptz '2025-02-01 08:00 America/New_York'
    + pick('rday' || g, 615) * interval '1 day'
    + pick('rmin' || g, 700) * interval '1 minute'
FROM (
  SELECT g,
    13 + floor(2500 * power(pick('ruser' || g, 1000000) / 1000000.0, 1.5))::integer AS user_id,
    (SELECT id FROM items
      WHERE name <> 'Tote Bag'
      ORDER BY id OFFSET pick('ritem' || g, 29) LIMIT 1) AS item_id,
    CASE WHEN pick('stars' || g, 100) < 40 THEN 5
         WHEN pick('stars' || g, 100) < 70 THEN 4
         WHEN pick('stars' || g, 100) < 85 THEN 3
         WHEN pick('stars' || g, 100) < 93 THEN 2
         ELSE 1 END AS rating
  FROM generate_series(1, 4500) AS g
) AS candidates
ORDER BY user_id, item_id, g;


-- ---------------------------------------------------------------------
-- 4. THE SPREADSHEET — how the store kept track before it had a database.
-- Every column is text, nothing is checked, and it shows.
-- ---------------------------------------------------------------------

CREATE TABLE spreadsheet_sales (
  sale_date  text,
  customer   text,
  email      text,
  item       text,
  total      text,
  cashier    text,
  location   text
);

INSERT INTO spreadsheet_sales VALUES
  ('3/2/2026',   'Jane Doe',     'jane.doe@example.com',  'Latte',                        '4.00',         'Luis',   'Main Street'),
  ('3/2/2026',   'Bob Ruiz',     'bob.ruiz@example.com',  'Cold Brew',                    '3.75',         'Luis',   'Main Street'),
  ('2026-03-02', 'jane doe',     'jane.doe@example.com',  'latte, blueberry muffin',      '$7.25',        'luis',   'Main St'),
  ('March 3',    'J. Doe',       '',                      'Late',                         '4',            'Keisha', 'main st.'),
  ('3/3/26',     'Bob Ruiz',     'bob.ruiz@example.com',  'Latte x2',                     '8.00',         'Tom',    'Five Points'),
  ('3/3/26',     'Bob Ruiz',     'bobruiz@example.com',   'Cold brew',                    '3.75',         'Tom',    '5 Points'),
  ('3/4/2026',   '',             '',                      'Latte',                        'four dollars', 'Ana',    'Five Points'),
  ('3/4/2026',   'Maria Lopez',  'maria.lopez@example.com','Mocha',                       '4.50',         'Ana',    'Five Points'),
  ('3/4/2026',   'Maria Lopez',  'maria.lopez@example.com','Croissant',                   '3.50',         'Ana',    'Five Pts'),
  ('3/5/2026',   'Sam',          'sam@example',           'Latte (oat)',                  '4.00',         'Jordan', 'The Vista'),
  ('3/5/2026',   'Chris Young',  'chris.young@example.com','Americano, Croissant, Latte',  '10.50',        'Jordan', 'Vista'),
  ('3/5/2026',   'Chris Young',  'chris.young@example.com','Sweet Tea',                   '2.50',         'Mei',    'vista'),
  ('3/6/2026',   'Jane Doe',     'jane.doe@gmail.com',    'Latte',                        '4.00',         'Luis',   'Main Street'),
  ('3/6/2026',   'Jane Doe',     'jane.doe@example.com',  'Latte',                        '3.75',         'Keisha', 'Main Street'),
  ('3/6/2026',   'Grace Kim',    'grace.kim@example.com', 'Pimento cheese',               '6.75',         'Keisha', 'Main Street'),
  ('3/6/2026',   'Grace Kim',    'grace.kim@example.com', 'Pimento Cheese Sandwich',      '6.75',         'Luis',   'Main Street'),
  ('6 Mar',      'Omar Hassan',  'omar.hassan@example.com','Bacon egg cheese',            '5.95',         'Tom',    'Five Points'),
  ('3/7/2026',   'Omar Hassan',  'omar.hassan@example.com','Matcha',                      '4.75',         'Tommy',  'Five Points'),
  ('3/7/2026',   'Bob Ruiz',     'bob.ruiz@example.com',  'Latte',                        '4.00',         'Ana',    'Five Points'),
  ('3/7/2026',   'Chris Young',  'chris.young@example.com','Lattes',                      '8',            'Mei',    'The Vista'),
  ('3/8/2026',   'maria lopez',  'Maria.Lopez@example.com','Latte',                       '4.00',         'Ana',    'Five Points'),
  ('3/8/2026',   'Jane Doe',     'jane.doe@example.com',  'Mug',                          '14',           'Luis',   'Main Street'),
  ('3/8/2026',   'Grace Kim',    'grace.kim@example.com', 'latte',                        '4.00',         'Keisha', 'Main'),
  ('3/9/2026',   'Bob Ruiz',     'bob.ruiz@example.com',  'Cold Brew',                    '3.75',         'Tom',    'Five Points'),
  ('3/9/2026',   'Jane Doe',     'jane.doe@example.com',  'Latte, Biscuit',               '6.50',         'Luis',   'Main Street'),
  ('3/9/2026',   'J Doe',        'jane.doe@example.com',  'Latte',                        '4.00',         'Luis',   'Main Street'),
  ('3/10/2026',  'Sam Okafor',   'sam.okafor@example.com','Cappuccino',                   '4.00',         'Mei',    'The Vista'),
  ('3/10/2026',  'Sam Okafor',   'sam.okafor@example.com','Cappuccino',                   '4.00',         'Mei',    'The Vista'),
  ('3/10/2026',  'Grace Kim',    'grace.kim@example.com', 'Chai',                         '4.25',         'Keisha', 'Main Street'),
  ('3/10/2026',  'Bob Ruiz',     'bob.ruiz@example.com',  'Latte',                        '4,00',         'Ana',    'Five Points');


-- ---------------------------------------------------------------------
-- 5. TIDY UP
-- ---------------------------------------------------------------------

DROP FUNCTION pick(text, integer);
ANALYZE;

-- Quick check. You should see one row:
--   users 2512 · items 30 · receipts 100000 · receipt_items 168369
--   reviews 4331 · spreadsheet_sales 30
SELECT
  (SELECT count(*) FROM users)             AS users,
  (SELECT count(*) FROM items)             AS items,
  (SELECT count(*) FROM receipts)          AS receipts,
  (SELECT count(*) FROM receipt_items)     AS receipt_items,
  (SELECT count(*) FROM reviews)           AS reviews,
  (SELECT count(*) FROM spreadsheet_sales) AS spreadsheet_sales;
