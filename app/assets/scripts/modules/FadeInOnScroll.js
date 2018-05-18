import $ from "jquery";
import waypoints from "../../../../node_modules//waypoints/lib/noframework.waypoints"

class FadeInOnScroll{
  constructor(els, offSet){
    this.selElement = els;
    this.offsetPercentage = offSet;
    this.hideInitially();
    this.fadeInWaypoint();
  }

  hideInitially(){
    this.selElement.addClass("reveal-item--fade-in")
  }

  fadeInWaypoint(){
    var that = this;
    this.selElement.each(function(){
      var currentItem = this;
      new Waypoint({
        element: currentItem,
        handler: function(){
          $(currentItem).addClass("reveal-item--fade-in--is-revealed")
        },
        offset: that.offsetPercentage
      });
    });
  }
}

export default FadeInOnScroll;
