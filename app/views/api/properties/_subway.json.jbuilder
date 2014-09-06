json.station_name subway_station.last

json.lines subway_station do |line|
  json.partial! "line", line: line
end