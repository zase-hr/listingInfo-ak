# Airbnb 

## Related Projects
https://github.com/zase-hr/hackerhome_booking
https://github.com/zase-hr/more-listings
https://github.com/zase-hr/listingInfo-ak
https://github.com/zase-hr/SDC-Airbnb-Photos

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage
```
 npm install
 nodemon server/index.js
 brew services list                    # check if mongoDB is on
 brew services start mongodb-community # turn it on
 npm run seed                          # you should see the "seeding success" message
 ```
 After these steps, try hiting `localhost:3002/:id` in a browser where `:id` is an optional number less than 100


## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0

## Development
Bundle the client source:

```
npm run react-dev # Start the server
npm run start 
```


### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```
### Deployment
- Docker

## API Spec

* [Write (Create)](#write-(create))
* [Read One (Read)](#read-one-(read))
* [Read All (Read)](#read-all-(read))
* [Update (Update)](#update-(update))
* [Delete (Delete)](#delete-(delete))



## Write (Create)
Add a new listing to the listings information 

 &nbsp; | Description
---|---
**HTTP Method** | `POST`
 **URL** | `/listing`
 **Input** | JSON Object of the listing to be added
 **Output**| boolean (successfully added or not)

##### Sample input structure:
```
{
    "_id": integer, 
    "city": string, 
    "title": string, 
    "hostImage": "URL", 
    "roomInfo": string, 
    "numberOfGuests": integer, 
    "numberOfBedrooms": integer,
    "numberOfBeds": integer,
    "numberOfBaths": integer, 
    "isSuperhost": boolean,
    "isGreatLocation": boolean, 
    "isSparklingClean": boolean, 
    "isGreatCheckIn": boolean, 
    "isSelfCheckIn": boolean, 
    "description": string, 
    "amenities": object,
    "dining": object, 
    "bedAndBath": object, 
    "sleepingArrangements": object
}
```

### Read One (Read)
Get the information for a single listing

 &nbsp; | Description
---|---
**HTTP Method** | `GET`
 **URL** | `/listings/:id`
 **Input** | ID of the desired listing
 **Output**| information for a listing (JSON object)

##### Sample output structure:
```
{
  "listing_id": 4,
  "city": "Rosinaville",
  "title": "Handmade Steel Pizza",
  "hostimage": "https://s3.amazonaws.com/uifaces/faces/twitter/SlaapMe/128.jpg",
  "roominfo": "Multi-layered context-sensitive matrix",
  "numberofguests": 11,
  "numberofbedrooms": 2,
  "numberofbeds": 4,
  "numberofbaths": 5,
  "issuperhost": false,
  "isgreatlocation": true,
  "issparklingclean": false,
  "isgreatcheckin": false,
  "isselfcheckin": false,
  "description": "omnis est enim ab mollitia",
  "items": {
    "listing_id": 4,
    "item_name": "Pillow",
    "itemgroup_name": "Bed And Bath"
  },
  "sleepingArrangements": {
    "listing_id": 4,
    "room_type": "Space 4",
    "room_beds": "Twin bed"
  }
}
```


## Update (Update)
Update the properties of a listing.

*NOTE: we are supporting partial update on a listing, meaning that only select properties can be passed.*

 &nbsp; | Description
---|---
**HTTP Method** | `PUT`
 **URL** | `/listing/:id`
 **Input** | JSON Object of the properties of the listing to be updated
 **Output**| JSON Object of the listing info (all properties)

##### Sample input structure:
As an example, here we can only update 3 properties of the existing listing:
```
 {
  "command": "UPDATE",
  "rowCount": 1,
  "oid": null,
  "rows": [],
  "fields": [],
  "_parsers": [],
  "_types": {
    "_types": {
      "arrayParser": {}
    },
    "text": {},
    "binary": {}
  },
  "RowCtor": null,
  "rowAsArray": false
}
```



## Delete (Delete)
Delete a room from the listing information

 &nbsp; | Description
---|---
**HTTP Method** | `PUT`
 **URL** | `/listing/:id`
 **Input** | ID of the listing to be deleted
 **Output**| boolean (successfully deleted)
  ```
{
  "command": "DELETE",
  "rowCount": 1,
  "oid": null,
  "rows": [],
  "fields": [],
  "_parsers": [],
  "_types": {
    "_types": {
      "arrayParser": {}
    },
    "text": {},
    "binary": {}
  },
  "RowCtor": null,
  "rowAsArray": false
}

```