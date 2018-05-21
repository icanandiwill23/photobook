import $ from "jquery";
import waypoints from "../../../../node_modules//waypoints/lib/noframework.waypoints"

class SlideUpOnScroll{
  constructor(els, offSet){
    this.selElement = els;
    this.offsetPercentage = offSet;
    this.hideInitially();
    this.slideUpWaypoint();
    this.lazyImages = $(".lazyload");
    this.lazyImagesRefresh();
  }

  lazyImagesRefresh(){
    this.lazyImages.on("load", function(){
      return Waypoint.refreshAll();
    });
  }

  hideInitially(){
    this.selElement.addClass("reveal-item--up")
  }

  slideUpWaypoint(){
    var that = this;
    this.selElement.each(function(){
      var currentItem = this;
      new Waypoint({
        element: currentItem,
        handler: function(){
          $(currentItem).addClass("reveal-item--up--is-revealed")
        },
        offset: that.offsetPercentage
      });
    });
  }
}

export default SlideUpOnScroll;
