import $ from "jquery";

class MenuIcon{
  constructor(){
    this.menuIcon = $(".header__nav-menu-icon");
    this.menuContent = $(".header__menu-content");
    this.primaryNav = $(".primary-nav")
    this.events();
  }

  events(){
    this.menuIcon.click(this.toggleMenu.bind(this));
  }

  toggleMenu(){
    this.menuContent.toggleClass("header__menu-content--is-visible");
    this.primaryNav.toggleClass("primary-nav--is-visible");
  }

}

export default MenuIcon;
