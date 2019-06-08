
DROP SCHEMA airbnb CASCADE;

CREATE SCHEMA airbnb;

/* ~~~~~~~~~~~~~~~~~~~ review_author ~~~~~~~~~~~~~~~~~~~~ */

CREATE TABLE airbnb.listings (
    listing_id INT NOT NULL,
    city       VARCHAR(50) NOT NULL,
    title      VARCHAR(255) NOT NULL,
    hostImage  VARCHAR(255),
    roomInfo   VARCHAR(255) NOT NULL,
    numberOfGuests      INT NOT NULL,
    numberOfBedrooms    INT NOT NULL,
    numberOfBeds        INT NOT NULL,
    numberOfBaths       INT NOT NULL,
    isSuperhost         BOOLEAN NOT NULL DEFAULT FALSE,
    isGreatLocation     BOOLEAN NOT NULL DEFAULT FALSE,
    isSparklingClean    BOOLEAN NOT NULL DEFAULT FALSE,
    isGreatCheckIn      BOOLEAN NOT NULL DEFAULT FALSE,
    isSelfCheckIn       BOOLEAN NOT NULL DEFAULT FALSE,
    description         TEXT NOT NULL,
    PRIMARY KEY (listing_id)
);

CREATE TABLE airbnb.listing_sleepings (
    listing_id INT NOT NULL REFERENCES airbnb.listings(listing_id),
    room_type VARCHAR(50),
    room_beds VARCHAR(50)
);

-- order matters here as we have foreign keys --

CREATE TABLE airbnb.itemgroups ( -- manually inserted in schema file
    itemgroup_id INT NOT NULL,
    itemgroup_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (itemgroup_id)
);

CREATE TABLE airbnb.items ( -- manually inserted in schema file
    item_id SERIAL NOT NULL,
    item_name VARCHAR(255) NOT NULL,
    itemgroup_id INT NOT NULL REFERENCES airbnb.itemgroups(itemgroup_id),
    PRIMARY KEY (item_id)
);

CREATE TABLE airbnb.listing_items (
    listing_id INT NOT NULL REFERENCES airbnb.listings(listing_id),
    item_id INT NOT NULL REFERENCES airbnb.items(item_id)
);

/* ~~~~~~~~~~~~~~~~~~~~~ CONSTANT VALUES ~~~~~~~~~~~~~~~~~~~~~~~~ */
INSERT INTO airbnb.itemgroups 
    (itemgroup_id, itemgroup_name) 
VALUES 
    (1, 'Basic'), 
    (2, 'Dining'), 
    (3, 'Guest_access'), 
    (4, 'Logistics'), 
    (5, 'Bed And Bath'), 
    (6, 'Safety Features'), 
    (7, 'Not Included')
;

INSERT INTO airbnb.items
    (item_name, itemgroup_id)
VALUES
    ('Wifi', 1), ('Laptop area', 1), ('Iron', 1), ('Toilet papers', 1), ('Charging station', 1), ('TV', 1), ('Radio', 1),
    ('Kithcen', 2), ('Utensil', 2), ('Pans', 2), ('Pots', 2), ('Skillets', 2), ('Coffee maker', 2), ('Tea maker', 2),
    ('Private entrance', 3), ('Fab Key', 3), ('Digital Lock', 4),
    ('Luggage dropoff allowed', 4), ('Long term stays allowed', 4), ('Overnight guests', 4),
    ('Shampoo', 5), ('Hair dryer', 5), ('Hanger', 5), ('Body wash', 5), ('Towel', 5), ('Pillow', 5), ('Sheets', 5),
    ('Safe box', 6), ('First aid kit', 6), ('Smoke Detector', 6), ('Security Camera', 6),
    ('Washer', 7), ('Dryer', 7), ('Air Conditioning', 7), ('Fridge', 7), ('Oven', 7), ('Microwave', 7)
;
    
-- select item_name, itemgroup_name from airbnb.items join airbnb.itemgroups on airbnb.items.itemgroup_id = airbnb.itemgroups.itemgroup_id;

\COPY airbnb.listings(listing_id,city,title,hostImage,roomInfo,numberOfGuests,numberOfBedrooms,numberOfBeds,numberOfBaths,isSuperhost,isGreatLocation,isSparklingClean,isGreatCheckIn,isSelfCheckIn,description) FROM 'listings.csv' CSV HEADER;
\COPY airbnb.listing_items(listing_id,item_id) FROM 'listingitems.csv' CSV HEADER;
\COPY airbnb.listing_sleepings(listing_id,room_type,room_beds) FROM 'sleeping.csv' CSV HEADER;