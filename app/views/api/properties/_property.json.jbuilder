json.id property.id
json.owner_id property.owner_id
json.address property.address
json.unit property.unit
json.zip property.zip
json.borough property.borough
json.neighborhood property.neighborhood
json.price property.price
json.price_text number_to_currency(property.price, precision: 0)
json.beds property.beds
json.baths property.baths
json.sq_ft property.sq_ft
json.apt_type property.apt_type
json.created_at property.created_at
json.updated_at property.updated_at



json.latitude property.latitude
json.longitude property.longitude
json.following_users property.following_users.pluck(:id)

if properties
  json.property_photo_url asset_path(property.property_photo.url(:small))
  
  begin
    json.total_count properties.total_count
  rescue NoMethodError
    json.total_count properties.length
  end
else
  json.property_photo_url asset_path(property.property_photo.url(:big))
  json.description property.description
end

json.current_user current_user.nil? ? false : current_user.id