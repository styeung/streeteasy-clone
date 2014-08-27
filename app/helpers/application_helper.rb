module ApplicationHelper

  def auth_token
    <<-HTML.html_safe
      <input type= "hidden"
             name="authenticity_token"
             value="#{ form_authenticity_token }" >
    HTML
  end
  
  NON_DETAILED_ATTRIBUTES = ["id", "owner_id", "address", "neighborhood", "unit", "created_at", "updated_at"]

  def non_detailed_attributes
    NON_DETAILED_ATTRIBUTES
  end
  
  def action_modifier(action)
    <<-HTML.html_safe
      <input type="hidden" name="_method" value="#{action}">
    HTML
  end
end
