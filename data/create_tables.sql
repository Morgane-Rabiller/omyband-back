BEGIN;

-- Suppression des tables si elles existent déjà
DROP TABLE IF EXISTS "users_instruments";
DROP TABLE IF EXISTS "instruments_announcements";
DROP TABLE IF EXISTS "styles_announcements";
DROP TABLE IF EXISTS "favorites_styles";
DROP TABLE IF EXISTS "favorites_announcement";
DROP TABLE IF EXISTS "instruments";
DROP TABLE IF EXISTS "styles";
DROP TABLE IF EXISTS "announcement";
DROP TABLE IF EXISTS "user";
DROP TABLE IF EXISTS "type";
DROP TABLE IF EXISTS "role";

-- Table role
CREATE TABLE "role" (
    role_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Table User
CREATE TABLE "user" (
    user_id SERIAL PRIMARY KEY,
    role_id INT NOT NULL,
    pseudo VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    location VARCHAR(255) NOT NULL,
    avatar VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,
    description VARCHAR(1000),
    FOREIGN KEY (role_id) REFERENCES "role"(role_id) ON UPDATE CASCADE
);

CREATE TABLE "type" (
    type_id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

-- Table Announcement
CREATE TABLE "announcement" (
    announcement_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    user_type INT,
    research_type INT,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(1000) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES "user"(user_id) ON DELETE CASCADE,
    FOREIGN KEY (user_type) REFERENCES "type"(type_id) ON DELETE SET NULL,
    FOREIGN KEY (research_type) REFERENCES "type"(type_id) ON DELETE SET NULL
);


-- Table Instruments
CREATE TABLE "instruments" (
    instrument_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Table Styles
CREATE TABLE "styles" (
    style_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL
);

-- Table Pivot : styles_announcements
CREATE TABLE "styles_announcements" (
    style_id INT NOT NULL,
    announcement_id INT NOT NULL,
    PRIMARY KEY (style_id, announcement_id),
    FOREIGN KEY (style_id) REFERENCES "styles"(style_id) ON DELETE CASCADE,
    FOREIGN KEY (announcement_id) REFERENCES "announcement"(announcement_id) ON DELETE CASCADE
);

-- Table Pivot : instruments_announcements
CREATE TABLE "instruments_announcements" (
    instrument_id INT NOT NULL,
    announcement_id INT NOT NULL,
    PRIMARY KEY (instrument_id, announcement_id),
    FOREIGN KEY (instrument_id) REFERENCES "instruments"(instrument_id) ON DELETE CASCADE,
    FOREIGN KEY (announcement_id) REFERENCES "announcement"(announcement_id) ON DELETE CASCADE
);

-- Table Pivot : users_instruments
CREATE TABLE "users_instruments" (
    user_id INT NOT NULL,
    instrument_id INT NOT NULL,
    PRIMARY KEY (user_id, instrument_id),
    FOREIGN KEY (user_id) REFERENCES "user"(user_id) ON DELETE CASCADE,
    FOREIGN KEY (instrument_id) REFERENCES "instruments"(instrument_id) ON DELETE CASCADE
);

COMMIT;

-- -- Table Pivot : favorites_announcement
-- CREATE TABLE favorites_announcement (
--     user_id INT NOT NULL,
--     announcement_id INT NOT NULL,
--     PRIMARY KEY (user_id, announcement_id),
--     FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE,
--     FOREIGN KEY (announcement_id) REFERENCES Announcement(announcement_id) ON DELETE CASCADE
-- );

-- -- Table Pivot : favorites_styles
-- CREATE TABLE favorites_styles (
--     user_id INT NOT NULL,
--     style_id INT NOT NULL,
--     PRIMARY KEY (user_id, style_id),
--     FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE,
--     FOREIGN KEY (style_id) REFERENCES Styles(style_id) ON DELETE CASCADE
-- );
