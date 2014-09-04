json.array! @properties do |property|
  json.partial! "property", properties: @properties, property: property
end