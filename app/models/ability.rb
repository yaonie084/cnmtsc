class Ability
  include CanCan::Ability

  def initialize(current_user)
    if current_user.nil?
    elsif current_user.superadmin?
      can :manage, :all
    end
  end
  
end