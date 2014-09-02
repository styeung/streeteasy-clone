# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140902140021) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "album_photos", force: true do |t|
    t.integer  "property_id",        null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "photo_file_name"
    t.string   "photo_content_type"
    t.integer  "photo_file_size"
    t.datetime "photo_updated_at"
  end

  add_index "album_photos", ["property_id"], name: "index_album_photos_on_property_id", using: :btree

  create_table "comments", force: true do |t|
    t.integer  "author_id",   null: false
    t.integer  "property_id", null: false
    t.string   "title",       null: false
    t.string   "body",        null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "comments", ["author_id"], name: "index_comments_on_author_id", using: :btree
  add_index "comments", ["property_id"], name: "index_comments_on_property_id", using: :btree

  create_table "properties", force: true do |t|
    t.integer  "owner_id",                    null: false
    t.string   "address",                     null: false
    t.string   "unit"
    t.string   "zip",                         null: false
    t.string   "neighborhood"
    t.integer  "price",                       null: false
    t.integer  "beds"
    t.decimal  "baths"
    t.integer  "sq_ft"
    t.string   "apt_type",                    null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "borough"
    t.string   "property_photo_file_name"
    t.string   "property_photo_content_type"
    t.integer  "property_photo_file_size"
    t.datetime "property_photo_updated_at"
    t.float    "latitude"
    t.float    "longitude"
  end

  add_index "properties", ["address", "unit"], name: "index_properties_on_address_and_unit", unique: true, using: :btree
  add_index "properties", ["apt_type"], name: "index_properties_on_apt_type", using: :btree
  add_index "properties", ["baths"], name: "index_properties_on_baths", using: :btree
  add_index "properties", ["beds"], name: "index_properties_on_beds", using: :btree
  add_index "properties", ["borough"], name: "index_properties_on_borough", using: :btree
  add_index "properties", ["neighborhood"], name: "index_properties_on_neighborhood", using: :btree
  add_index "properties", ["owner_id"], name: "index_properties_on_owner_id", using: :btree
  add_index "properties", ["price"], name: "index_properties_on_price", using: :btree
  add_index "properties", ["sq_ft"], name: "index_properties_on_sq_ft", using: :btree
  add_index "properties", ["zip"], name: "index_properties_on_zip", using: :btree

  create_table "property_saves", force: true do |t|
    t.integer  "property_id", null: false
    t.integer  "user_id",     null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "property_saves", ["property_id", "user_id"], name: "index_property_saves_on_property_id_and_user_id", unique: true, using: :btree

  create_table "users", force: true do |t|
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.string   "session_token"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", using: :btree

end
