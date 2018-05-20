import $ from "jquery";
import waypoints from "../../../../node_modules/waypoints/lib/noframework.waypoints";

class StickyHeader{
  constructor(){
    this.siteHeader = $(".header");
    this.siteHeaderTrigger = $(".large-hero__subtitle");
    this.headerWaypoints();
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
}

export default StickyHeader;
