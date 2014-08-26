require 'spec_helper'

describe User do
  context "without email or password" do
    let (:new_user) { User.new }

    it "validates the presence of an email" do
      expect(new_user).not_to be_valid
    end

    it "validates the presence of a password" do
      expect(new_user).not_to be_valid
    end
  end

  it "does not allow email with no password" do
    new_user = User.new({ email: "user@email.com"})

    expect(new_user).not_to be_valid
  end

  it "does not allow password with no email" do
    new_user = User.new({ password: "password"})

    expect(new_user).not_to be_valid
  end

  it "validates uniqueness of name" do
    new_user_1 = User.create!({ email: "user@email.com", password: "password"})
    new_user_2 = User.new({ email: "user@email.com", password: "password"})

    expect(new_user_2).not_to be_valid
  end

  it "requires passwords to have a length of at least 6" do
    new_user = User.new({ email: "user@email.com", password: "short"})

    expect(new_user).not_to be_valid
  end

end
