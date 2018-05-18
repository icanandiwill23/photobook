import $ from "jquery";
import slick from "slick-carousel";

class Slick{
  constructor(){
    $(document).ready(function(){
      $('.testimonials').slick({

      });
    });

    this.clickNext();
  }

  clickNext(){
    $(".testimonials__next").on("click", function(){
      // this supposed to run the functionality of slick's next arrow but I cannot transfer that functionality once p tag is click.
    });
  }
}

export default Slick;
