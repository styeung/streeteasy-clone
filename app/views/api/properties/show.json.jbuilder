json.id @property.id
json.owner_id @property.owner_id
json.address @property.address
json.unit @property.unit
json.zip @property.zip
json.borough @property.borough
json.neighborhood @property.neighborhood
json.price @property.price
json.beds @property.beds
json.baths @property.baths
json.sq_ft @property.sq_ft
json.apt_type @property.apt_type
json.created_at @property.created_at
json.updated_at @property.updated_at
json.property_photo_url asset_path(@property.property_photo.url(:big))
json.latitude @property.latitude
json.longitude @property.longitude
json.following_users @property.following_users.pluck(:id)
json.current_user current_user.nil? ? false : current_user.id
json.album_photos(@property.album_photos) do |album_photo|
  json.id album_photo.id
  json.property_id album_photo.property_id
  json.photo_url asset_path(album_photo.photo.url(:big))
end

json.comments(@property.comments) do |comment|
  json.id comment.id
  json.author_id comment.author_id
  json.property_id comment.property_id
  json.title comment.title
  json.body comment.body
  json.created_at comment.created_at
  json.updated_at comment.created_at
end
  