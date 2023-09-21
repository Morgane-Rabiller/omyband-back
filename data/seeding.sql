INSERT INTO instruments (name) VALUES
('Guitare'),
('Guitare acoustique'),
('Guitare électrique'),
('Batterie'),
('Piano'),
('Voix'),
('Violon'),
('Saxophone'),
('Flûte'),
('Trompette'),
('Basse'),
('Harpe'),
('Accordéon'),
('Clarinette'),
('Trombone'),
('Synthétiseur'),
('Triangle'),
('Harmonica'),
('Contrebasse'),
('Orgue'),
('Cymbales'),
('Maracas'),
('Tambourin'),
('Banjo'),
('Ukulélé');

INSERT INTO styles (name, image) VALUES
('Rock', 'image_path'),
('Jazz', 'image_path'),
('Blues', 'image_path'),
('Reggae', 'image_path'),
('Country', 'image_path'),
('Classique', 'image_path'),
('Hip-Hop', 'image_path'),
('Electronique', 'image_path'),
('Pop', 'image_path'),
('R&B', 'image_path'),
('Soul', 'image_path'),
('Metal', 'image_path'),
('Punk', 'image_path'),
('Folk', 'image_path'),
('Disco', 'image_path'),
('Funk', 'image_path'),
('Techno', 'image_path'),
('House', 'image_path'),
('Rap', 'image_path'),
('Gospel', 'image_path');

INSERT INTO role (name) VALUES
('admin'),
('user');

-- Données pour la table User
INSERT INTO "user" (role_id, pseudo, password, email, location, avatar, description) VALUES
(2, 'Alice', 'password123', 'alice@email.com', 'Paris', 'alice_avatar_path', 'Je suis une chanteuse et pianiste classique.'),
(2, 'Bob', 'password456', 'bob@email.com', 'Lyon', 'bob_avatar_path', 'Bassiste dans un groupe de rock depuis 5 ans.'),
(2, 'Charlie', 'password789', 'charlie@email.com', 'Marseille', 'charlie_avatar_path', 'Producteur et DJ électronique.'),
(2, 'Daisy', 'password101', 'daisy@email.com', 'Lille', 'daisy_avatar_path', 'Violoniste passionnée par le jazz et le blues.'),
(2, 'Eve', 'password112', 'eve@email.com', 'Strasbourg', 'eve_avatar_path', 'Chanteuse de jazz professionnel.'),
(2, 'Frank', 'password113', 'frank@email.com', 'Toulouse', 'frank_avatar_path', 'Guitariste dans un groupe de blues.'),
(2, 'Grace', 'password114', 'grace@email.com', 'Nantes', 'grace_avatar_path', 'Violoncelliste classique.'),
(2, 'Hank', 'password115', 'hank@email.com', 'Bordeaux', 'hank_avatar_path', 'Batteur dans un groupe de punk.'),
(2, 'Ivy', 'password116', 'ivy@email.com', 'Nice', 'ivy_avatar_path', 'Flûtiste avec une inclinaison pour le folk.'),
(2, 'Jack', 'password117', 'jack@email.com', 'Montpellier', 'jack_avatar_path', 'Saxophoniste recherchant des sessions jazz.');

-- Données pour la type
INSERT INTO "type" (type_id, name) VALUES
(1, 'Musicien(ne)/Chanteur(se)'),
(2, 'Groupe'),
(3, 'Producteur');

-- Données pour la table Announcement
INSERT INTO "announcement" (user_id, user_type, research_type, title, description) VALUES
(1, 1, 2, 'Cherche groupe de musique classique', 'Je suis une pianiste et chanteuse cherchant un groupe de musique classique pour des concerts et événements.'),
(2, 2, 1, 'Recherche chanteur pour groupe de rock', 'Notre groupe de rock cherche un nouveau chanteur pour compléter notre ensemble. Répétitions chaque samedi.'),
(3, 3, 1, 'Offre de production pour artiste émergent', 'Je suis un producteur de musique électronique et je cherche des artistes émergents à produire. Contactez-moi pour en savoir plus.'),
(4, 1, 1, 'Recherche musiciens pour jam sessions', 'Violoniste passionnée par le jazz et le blues cherche des musiciens pour des sessions improvisées.'),
(5, 1, 2, 'Recherche groupe de jazz', 'Chanteuse de jazz professionnelle recherche un groupe pour des performances régulières.'),
(6, 2, 1, 'Cherche chanteur pour blues band', 'Nous avons besoin d''un chanteur pour compléter notre groupe de blues. Expérience requise.'),
(7, 1, 2, 'Violoncelliste cherche orchestre', 'Je cherche un orchestre ou un petit ensemble pour jouer régulièrement.'),
(8, 2, 1, 'Recherche guitariste pour punk band', 'Notre groupe punk a besoin d''un guitariste. Pratique hebdomadaire.'),
(9, 1, 2, 'Flûtiste cherche groupe folk', 'Je suis une flûtiste cherchant un groupe folk pour des concerts et des événements.'),
(10, 1, 2, 'Saxophoniste cherche musiciens jazz', 'Je cherche des musiciens pour former un petit groupe de jazz.');


-- Données pour la table users_instruments
INSERT INTO "users_instruments" (user_id, instrument_id) VALUES
(1, 5),  -- Alice: Piano
(1, 6),  -- Alice: Voix
(2, 11), -- Bob: Basse
(3, 16), -- Charlie: Synthétiseur
(4, 7),  -- Daisy: Violon
(5, 6),  -- Eve: Voix
(6, 1),  -- Frank: Guitare
(7, 7),  -- Grace: Violon
(8, 4),  -- Hank: Batterie
(9, 9),  -- Ivy: Flûte
(10, 8); -- Jack: Saxophone

-- Données pour la table styles_announcements
INSERT INTO "styles_announcements" (style_id, announcement_id) VALUES
(6, 1),  -- Alice: Classique
(2, 2),  -- Bob: Jazz
(8, 3),  -- Charlie: Electronique
(14, 4), -- Daisy: Folk
(2, 5),  -- Eve: Jazz
(3, 6),  -- Frank: Blues
(6, 7),  -- Grace: Classique
(13, 8), -- Hank: Punk
(14, 9), -- Ivy: Folk
(2, 10); -- Jack: Jazz

-- Données pour la table instruments_announcements
INSERT INTO "instruments_announcements" (instrument_id, announcement_id) VALUES
(5, 1),  -- Alice: Piano
(6, 1),  -- Alice: Voix
(1, 2),  -- Bob: Guitare
(16, 3), -- Charlie: Synthétiseur
(7, 4),  -- Daisy: Violon
(6, 5),  -- Eve: Voix
(1, 6),  -- Frank: Guitare
(7, 7),  -- Grace: Violon
(1, 8),  -- Hank: Guitare
(9, 9),  -- Ivy: Flûte
(8, 10); -- Jack: Saxophone
