json.partial! "property", properties: nil, property: @property

json.album_photos(@property.album_photos) do |album_photo|
  json.id album_photo.id
  json.property_id album_photo.property_id
  json.photo_url asset_path(album_photo.photo.url(:big))
end

json.comments(@property.comments) do |comment|
  json.partial! "api/comments/comment", comment: comment
end

json.subway_stations @subway_stations
