
DROP SCHEMA airbnb CASCADE;
CREATE SCHEMA airbnb;
USE airbnb

/* ~~~~~~~~~~~~~~~~~~~ review_author ~~~~~~~~~~~~~~~~~~~~ */

CREATE TABLE listing (
    listing_id INT NOT NULL,
    numberOfBedrooms INT NOT NULL,
    picture_url VARCHAR(255) NOT NULL,
    city TEXT NOT NULL,
    title TEXT NOT NULL,
    hostImage TEXT NOT NULL,
    roomInfo TEXT NOT NULL,
    numberOfGuests INT NOT NULL,
    numberOfBeds INT NOT NULL,
    numberOfBaths INT NOT NULL,
    description TEXT NOT NULL,
    PRIMARY KEY (house_id)
);

CREATE TABLE amenities_basic (
    house_id INT NOT NULL REFERENCES listing(listing_id),
    item_name VARCHAR(50)
);

CREATE TABLE amenities_dining (
    house_id INT NOT NULL REFERENCES listing(listing_id),
    item_name VARCHAR(50)
);

CREATE TABLE amenities_bedandbath (
    house_id INT NOT NULL REFERENCES listing(listing_id),
    item_name VARCHAR(50)
);

CREATE TABLE sleeping_arrangements (
    house_id INT NOT NULL REFERENCES listing(listing_id),
    room_type VARCHAR(50),
    room_beds VARCHAR(50)
);