json.array! @album_photos do |album_photo|
  json.id album_photo.id
  json.property_id album_photo.property_id
  json.photo_url asset_path(album_photo.photo.url(:big))
end