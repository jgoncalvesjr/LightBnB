INSERT INTO users (name, email, password)
VALUES ('Saw Guerrera', 'blastersaw@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Frank Castle', 'notthettcstation@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Sheev Palpatine', 'unlimitedpower@yahoo.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Peter Parker', 'supaidaman@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Hiryuu Tsurugi', 'changedragon@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Leeroy Jenkins', 'rtsdinwow@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Dimitri Petrenko', 'rushbgogogo@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Antonio Nunes', 'drunkslaponleg@yahoo.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Zeratul Nerazim', 'poweroverwhelming@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Jean-Luc Picard', 'notaborg@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, 
  number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (1, 'Rebel base', 'Welcome to your doom', 'https://images.pexels.com/photos/3150918/pexels-photo-3150918.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/3150918/pexels-photo-3150918.jpeg', 150, 2, 1, 2, 'Canada', '115 Dead End Rd', 'Etobicoke', 'Ontario', 'M5V1C1', TRUE),
(3, 'Junk place', 'My aunt lives with me', 'https://images.pexels.com/photos/3150918/pexels-photo-3150918.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/3150918/pexels-photo-3150918.jpeg', 89, 0, 1, 1, 'Canada', '437-308 Spider Bl', 'Toronto', 'Ontario', 'M5V1C1', TRUE),
(10, 'The nexus', 'En Taro Tassadar', 'https://images.pexels.com/photos/3150918/pexels-photo-3150918.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/3150918/pexels-photo-3150918.jpeg', 299, 5, 2, 4, 'Canada', '36 Pylon St', 'Sherbrooke', 'Quebec', 'M5V1C1', TRUE);

INSERT INTO reservations (guest_id, property_id, start_date, end_date) 
VALUES (1, 4, '2018-09-11', '2018-09-26'),
(2, 5, '2019-01-04', '2019-02-01'),
(3, 6, '2021-10-01', '2021-10-14'),
(4, 4, '2019-06-22', '2019-07-03'),
(5, 6, '2020-03-16', '2020-05-31');

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (1, 4, 11, 3, 'Eww'),
(2, 5, 12, 5, 'Yay'),
(3, 6, 13, 4, 'GOOD'),
(4, 4, 14, 3, 'Meh'),
(5, 6, 15, 1, 'Nope.');