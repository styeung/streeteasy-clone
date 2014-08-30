# json.array! @properties, :owner_id, :address, :unit, :zip, :neighborhood, :price, :beds, :baths, :sq_ft, :apt_type, :created_at, :updated_at, :property_photo, :latitude, :longitude

json.array! @properties do |property|
  json.owner_id property.owner_id
  json.address property.address
  json.unit property.unit
  json.zip property.zip
  json.neighborhood property.neighborhood
  json.price property.price
  json.beds property.beds
  json.baths property.baths
  json.sq_ft property.sq_ft
  json.apt_type property.apt_type
  json.created_at property.created_at
  json.updated_at property.updated_at
  json.property_photo_url asset_path(property.property_photo.url(:small))
  json.latitude property.latitude
  json.longitude property.longitude
end