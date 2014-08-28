class User < ActiveRecord::Base
  validates :email, :password_digest, presence: true
  validates :email, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  has_many(
    :properties,
    class_name: "Property",
    foreign_key: :owner_id,
    primary_key: :id,
    inverse_of: :owner
  )
  
  has_many(
    :property_saves,
    class_name: "PropertySave",
    foreign_key: :user_id,
    primary_key: :id,
    inverse_of: :user
  )
  
  has_many(
    :authored_comments,
    class_name: "Comment",
    foreign_key: :author_id,
    primary_key: :id,
    inverse_of: :author
  )
  
  has_many :saved_properties, through: :property_saves, source: :property

  attr_reader :password

  after_initialize :ensure_session_token

  def self.find_by_credentials(email, password)
    user = User.find_by_email(email)

    if user
      if user.is_password?(password)
        return user
      end
    end

    return nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def self.generate_session_token
    SecureRandom.urlsafe_base64(16)
  end

  def reset_session_token
    self.session_token = self.class.generate_session_token
    self.save!
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end


end
