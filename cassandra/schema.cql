CREATE KEYSPACE "airbnb"
WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 3};

USE airbnb;

CREATE TABLE listing (
  id INT PRIMARY KEY,
  city TEXT,
  title TEXT,
  hostImage TEXT,
  roomInfo TEXT,
  numberOfGuests INT,
  numberOfBedrooms INT,
  numberOfBeds INT,
  numberOfBaths INT,
  isSuperhost BOOLEAN,
  isGreatLocation BOOLEAN,
  isSparklingClean BOOLEAN,
  isGreatCheckIn BOOLEAN,
  isSelfCheckIn BOOLEAN,
  description TEXT,
  amenities_basic LIST<TEXT>,
  amenities_dining LIST<TEXT>,
  amenities_bedAndBath LIST<TEXT>,
  sleepingArrangements MAP<TEXT, TEXT>
);

COPY listing(id,city,title,hostImage,roomInfo,numberOfGuests,numberOfBedrooms,numberOfBeds,numberOfBaths,isSuperhost,isGreatLocation,isSparklingClean,isGreatCheckIn,isSelfCheckIn,description,amenities_basic,amenities_dining,amenities_bedAndBath,sleepingArrangements) FROM './listing.csv' with delimiter = ';';
