import $ from "jquery";
import waypoints from "../../../../node_modules/waypoints/lib/noframework.waypoints";
import smoothScroll from "jquery-smooth-scroll";

class StickyHeader{
  constructor(){
    this.siteHeader        = $(".header");
    this.siteHeaderTrigger = $(".large-hero__subtitle");
    this.headerWaypoints();
    this.pageSection       = $(".page-section");
    this.pageSectionWaypoints();
    this.navTags           = $(".primary-nav a");
    this.clearNavWaypoint();
    this.smoothScrolling();
  }

  smoothScrolling(){
    this.navTags.smoothScroll();
  }

  headerWaypoints(){
    var that = this;
    new Waypoint({
      element: this.siteHeaderTrigger[0],
      handler: function(){
        that.siteHeader.toggleClass("header--is-lighter");
      }
    });
  }

  pageSectionWaypoints(){
    var that = this;
    this.pageSection.each(function(){
      var currentPage = this;
      new Waypoint({
        element: currentPage,
        handler: function(direction){
          if(direction = "down"){
            var matchinglink = currentPage.getAttribute("data-matching-link");
            that.navTags.removeClass("is-current-link");
            $(matchinglink).addClass("is-current-link");
          }
        },
        offset: "65%"
      });

      new Waypoint({
        element: currentPage,
        handler: function(direction){
          if(direction = "up"){
            var matchinglink = currentPage.getAttribute("data-matching-link");
            that.navTags.removeClass("is-current-link");
            $(matchinglink).addClass("is-current-link");
          }
        },
        offset: "-20%"
      });
    });
  }

  clearNavWaypoint(){
    let that = this;
    new Waypoint({
      element: this.siteHeaderTrigger[0],
      handler: function(){
        that.navTags.removeClass("is-current-link");
      }
    });
  }
}

export default StickyHeader;
