psql -d postgres -c "SELECT * FROM airbnb.listings WHERE listing_id=${1};"
psql -d postgres -c "SELECT listing_id, item_name, itemgroup_name FROM (airbnb.listing_items JOIN airbnb.items ON listing_items.item_id = items.item_id) JOIN airbnb.itemgroups ON itemgroups.itemgroup_id = items.itemgroup_id  WHERE listing_items.listing_id = ${1};";
psql -d postgres -c "SELECT * FROM airbnb.listing_sleepings WHERE listing_id=${1};"



#SELECT string_agg('["' || room_type || '": "' || room_beds || '"]', ', ') FROM listing_sleepings WHERE listing_id=5

# CREATE

 time cqlsh -e "INSERT INTO listing (id,city,title,roomInfo,numberOfGuests,numberOfBedrooms,numberOfBeds,numberOfBaths,isSuperhost,isGreatLocation,
 isSparklingClean,reatCheckIn,isSelfCheckIn) VALUES ('Milan','Spacious traditional house,3,3,2,true,true,true,false);"
 
 # UPDATE

time cqlsh -e "UPDATE airbnb.listing SET city = 'Madrid', numberOfGuests = 4 WHERE id = 9500000;"

time cqlsh -e "DELETE FROM airbnb.listing WHERE id = 9500000 AND id = 9600000;"
 
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

time psql -d postgres -c "DELETE FROM airbnb.listings WHERE listing_id=9500000;"
#DELETE FROM films WHERE producer_id IN (SELECT id FROM producers WHERE name = 'foo');
time psql -d postgres -c "DELETE FROM airbnb.listings IN (SELECT FROM airbnb.listing_sleepings WHERE listing_id=9500000;"

time psql -d postgres -c "DELETE FROM airbnb.listings USING airbnb.listing_sleepings WHERE airbnb.listings.listing_id = airbnb.listing_sleepings.listing_id;"
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

time psql -d postgres -c "INSERT INTO airbnb.listings 
(
	city,
	title,
	
	numberOfGuests,
	numberOfBedrooms,
	numberOfBeds,numberOfBaths,
	isSuperhost,
	isGreatLocation,
    isSparklingClean,
    isGreatCheckIn) VALUES 
('Milan',
	'Spacious traditional house'
	,3,3,2,true,true,true,false);"

# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~










