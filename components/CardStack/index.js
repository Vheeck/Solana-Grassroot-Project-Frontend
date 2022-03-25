const setCardStack = () => {
  var cardStack = document.querySelectorAll(".card-stack .card");
  if (cardStack[0]) {
    var cardHeight = document
      .querySelectorAll(".card-stack")[0]
      .getAttribute("data-stack-height");
    for (let i = 0; i < cardStack.length; i++) {
      cardStack[i].style.height = +cardHeight + 20 + "px";
      cardStack[i].style.marginBottom = -1 * +cardHeight + "px";
      cardStack[i].style.zIndex = 70 - i;
      cardStack[i].style.transform = "scale(0." + (99 - i * 10) + ")";
    }

    var btnExpandCards = document.querySelectorAll(".btn-stack-click")[0];
    var cardStackClick = document.querySelectorAll(".card-stack-click")[0];
    var cardStacked = document.querySelectorAll(".card-stack")[0];
    var cardStackInfo = document.querySelectorAll(".btn-stack-info")[0];

    function stackEffect() {
      if (cardStacked.classList.contains("card-stack-active")) {
        cardStackInfo.classList.remove("disabled");
        btnExpandCards.classList.add("disabled");
        cardStackClick.classList.remove("no-click");
        cardStacked.classList.remove("card-stack-active");
      } else {
        cardStackInfo.classList.add("disabled");
        btnExpandCards.classList.remove("disabled");
        cardStackClick.classList.add("no-click");
        cardStacked.classList.add("card-stack-active");
      }
    }
    cardStackClick.addEventListener("click", function (e) {
      stackEffect();
    });
    btnExpandCards.addEventListener("click", function (e) {
      stackEffect();
    });
  }
};

export default setCardStack;