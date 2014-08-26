require 'spec_helper'

describe Property do
  context "without address or price" do
    let (:new_property) { Property.new }

    it "validates the presence of an address" do
      expect(new_property).not_to be_valid
    end

    it "validates the presence of a password" do
      expect(new_property).not_to be_valid
    end
  end

  it "does not allow adddress with no price" do
    new_property = Property.new({ address: "100 Madison Ave."})

    expect(new_property).not_to be_valid
  end

  it "does not allow price with no address" do
    new_property = Property.new({ price: 2000000})

    expect(new_property).not_to be_valid
  end
end
