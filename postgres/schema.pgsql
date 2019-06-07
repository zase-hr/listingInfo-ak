
DROP SCHEMA airbnb CASCADE;

CREATE SCHEMA airbnb;

/* ~~~~~~~~~~~~~~~~~~~ review_author ~~~~~~~~~~~~~~~~~~~~ */

CREATE TABLE airbnb.listing (
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
    PRIMARY KEY (listing_id)
);

CREATE TABLE airbnb.amenities_basic (
    listing_id INT NOT NULL REFERENCES airbnb.listing(listing_id),
    item_name VARCHAR(50)
);

CREATE TABLE airbnb.amenities_dining (
    listing_id INT NOT NULL REFERENCES airbnb.listing(listing_id),
    item_name VARCHAR(50)
);

CREATE TABLE airbnb.amenities_bedandbath (
    listing_id INT NOT NULL REFERENCES airbnb.listing(listing_id),
    item_name VARCHAR(50)
);

CREATE TABLE airbnb.sleeping_arrangements (
    listing_id INT NOT NULL REFERENCES airbnb.listing(listing_id),
    room_type VARCHAR(50),
    room_beds VARCHAR(50)
);