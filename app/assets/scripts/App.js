import $ from "jquery";
import MenuIcon from "./modules/MenuIcon";
import SlideUpOnScroll from "./modules/SlideUpOnScroll";
import FadeInOnScroll from "./modules/FadeInOnScroll";
import Slick from "./modules/Slick";

const menuIcon = new MenuIcon(),
      slideUpOnScroll = new SlideUpOnScroll($(".advantage-item"), "80%"),
      readyScroll = new FadeInOnScroll($(".ready-solutions"), "70%"),
      detailsScroll = new FadeInOnScroll($(".details-item"), "70%"),
      slick = new Slick();
