json.array! @comments do |comment|
  json.id comment.id
  json.author_id comment.author_id
  json.author_email User.find(comment.author_id).email
  json.property_id comment.property_id
  json.title comment.title
  json.body comment.body
  json.created_at comment.created_at
  json.updated_at comment.updated_at
end