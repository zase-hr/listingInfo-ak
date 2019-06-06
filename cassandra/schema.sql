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
  isGreatLocation INT,
  isSparklingClean BOOLEAN,
  isGreatCheckIn BOOLEAN,
  isSelfCheckIn BOOLEAN,
  description TEXT,
  amenities_basic LIST<TEXT>,
  amenities_dining LIST<TEXT>,
  amenities_bedAndBath LIST<TEXT>,
  sleepingArrangements MAP<TEXT, TEXT>
);


{
    hasWiFi: BOOLEAN,
    hasEssentials: BOOLEAN,
    hasCable: BOOLEAN,
    hasLaptopSpace: BOOLEAN,
    hasHeating: BOOLEAN
    hasKitchen: BOOLEAN
    hasPillowsBlankets: BOOLEAN,
  }