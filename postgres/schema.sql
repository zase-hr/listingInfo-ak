
DROP SCHEMA airbnb_listing CASCADE;
CREATE SCHEMA airbnb_listing;
USE airbnb_listing

/* ~~~~~~~~~~~~~~~~~~~ review_author ~~~~~~~~~~~~~~~~~~~~ */

CREATE TABLE airbnb_house (
    house_id INT NOT NULL,
    numberOfBedrooms INT NOT NULL,
    picture_url VARCHAR(255) NOT NULL,
    PRIMARY KEY (house_id),
    city TEXT NOT NULL,
    title TEXT NOT NULL,
    hostImage TEXT NOT NULL,
    roomInfo TEXT NOT NULL,
    numberOfGuests INT NOT NULL,
    numberOfBeds INT NOT NULL,
    numberOfBaths INT NOT NULL,
    description TEXT NOT NULL
);

-- CREATE TABLE amenities (
--     isSuperhost BOOLEAN NOT NULL,
--     isGreatLocation NOT NULL,
--     isSparklingClean NOT NULL,
--     isGreatCheckIn NOT NULL,
--     isSelfCheckIn NOT NULL,
-- );

-- CREATE TABLE ... (
--     amenities_basic LIST<TEXT>,
--     amenities_dining LIST<TEXT>,
--     amenities_bedAndBath LIST<TEXT>,
--     sleepingArrangements MAP<TEXT, TEXT>
-- );