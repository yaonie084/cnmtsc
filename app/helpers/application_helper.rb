module ApplicationHelper
  def menu_nav(name, options = {}, &block)
    if @menu_nav == name
      if options[:class]
        options[:class] += " hover"
      else
        options[:class] = "hover"
      end
    end
    content = capture(&block)
    content_tag(:li, content, options)
  end

  def sec_nav(name, options = {}, &block)
    if @sec_nav == name
      if options[:class]
        options[:class] += " active"
      else
        options[:class] = "active"
      end
    end
    content = capture(&block)
    content_tag(:li, content, options)
  end

  def main_nav(name, options = {}, &block)
    if @main_nav == name
      if options[:class]
        options[:class] += " active"
      else
        options[:class] = "active"
      end
    end
    content = capture(&block)
    content_tag(:li, content, options)
  end
  
end
