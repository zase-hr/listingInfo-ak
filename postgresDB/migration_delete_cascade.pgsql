alter table airbnb.listing_items
drop constraint listing_items_listing_id_fkey,
add constraint listing_items_listing_id_fkey
   FOREIGN KEY (listing_id) 
   REFERENCES airbnb.listings(listing_id)
   on delete cascade;

alter table airbnb.listing_sleepings
drop constraint listing_sleepings_listing_id_fkey,
add constraint listing_sleepings_listing_id_fkey
   FOREIGN KEY (listing_id) 
   REFERENCES airbnb.listings(listing_id)
   on delete cascade;