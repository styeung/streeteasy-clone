module ApplicationHelper

  def auth_token
    <<-HTML.html_safe
      <input type= "hidden"
             name="authenticity_token"
             value="#{ form_authenticity_token }" >
    HTML
  end
  
  def action_modifier(action)
    <<-HTML.html_safe
      <input type="hidden" name="_method" value="#{action}">
    HTML
  end
  
  DETAILED_ATTRIBUTES = ["zip", "price", "beds", "baths", "sq_ft", "apt_type", "borough"]
  
  def detailed_attributes
    DETAILED_ATTRIBUTES
  end
  
  BOROUGH_CHOICES = {
    manhattan: "Manhattan",
    brooklyn: "Brooklyn",
    queens: "Queens",
    bronx: "The Bronx",
    staten_island: "Staten Island"
  }
  
  def borough_choices
    BOROUGH_CHOICES
  end
  
  
end
