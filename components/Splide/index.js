const getSlides = () => {
  //Image Sliders
  var splide = document.getElementsByClassName("splide");
  if (splide.length) {
    var singleSlider = document.querySelectorAll(".single-slider");
    if (singleSlider.length) {
      singleSlider.forEach(function (e) {
        var single = new Splide("#" + e.id, {
          type: "loop",
          autoplay: true,
          interval: 4000,
          perPage: 1,
        }).mount();
        var sliderNext = document.querySelectorAll(".slider-next");
        var sliderPrev = document.querySelectorAll(".slider-prev");
        sliderNext.forEach((el) =>
          el.addEventListener("click", (el) => {
            single.go(">");
          })
        );
        sliderPrev.forEach((el) =>
          el.addEventListener("click", (el) => {
            single.go("<");
          })
        );
      });
    }

    var doubleSlider = document.querySelectorAll(".double-slider");
    if (doubleSlider.length) {
      doubleSlider.forEach(function (e) {
        var double = new Splide("#" + e.id, {
          type: "loop",
          autoplay: true,
          interval: 4000,
          arrows: false,
          perPage: 2,
        }).mount();
      });
    }

    var tripleSlider = document.querySelectorAll(".triple-slider");
    if (tripleSlider.length) {
      tripleSlider.forEach(function (e) {
        var triple = new Splide("#" + e.id, {
          type: "loop",
          autoplay: true,
          interval: 4000,
          arrows: false,
          perPage: 3,
          perMove: 1,
        }).mount();
      });
    }

    var quadSlider = document.querySelectorAll(".quad-slider");
    if (quadSlider.length) {
      quadSlider.forEach(function (e) {
        var quad = new Splide("#" + e.id, {
          type: "loop",
          autoplay: true,
          interval: 4000,
          arrows: false,
          perPage: 4,
          perMove: 1,
        }).mount();
      });
    }
  }
};

export default getSlides;
