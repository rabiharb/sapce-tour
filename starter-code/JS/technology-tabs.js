const technoImgs = document.querySelectorAll(".img-cont");
const numberList = document.querySelector("[role='numberlist']");
const numbers = numberList.querySelectorAll("[role='number']");
const articles = document.querySelectorAll("article");

let numberFocus = 0;
let articlesLength = articles.length;

numberList.addEventListener("keydown", setFocus);

function setFocus(e) {
  const leftKey = 37;
  const rightKey = 39;
  if (e.keyCode === rightKey || e.keyCode === leftKey) {
    if (e.keyCode === leftKey) {
      numberFocus--;
      if (numberFocus < 0) {
        numberFocus = articlesLength - 1;
      }
    } else {
      numberFocus++;
    }

    numbers.forEach((number) => {
      number.setAttribute("tabindex", -1);
    });

    numberFocus %= articlesLength;
    numbers[numberFocus].setAttribute("tabindex", 0);
    numbers[numberFocus].focus();
  }
}

numbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    for (let i = 0; i < articles.length; i++) {
      if (e.target === numbers[i]) {
        articles[i].removeAttribute("hidden");
        technoImgs[i].removeAttribute("hidden");
        numbers[i].setAttribute("aria-selected", "true");
        localStorage.selectedTechPage = i;
      } else {
        articles[i].setAttribute("hidden", "");
        technoImgs[i].setAttribute("hidden", "");
        numbers[i].setAttribute("aria-selected", "false");
      }
    }
  });
});

window.addEventListener("load", () => {
  if (localStorage.selectedTechPage) {
    for (let i = 0; i < articles.length; i++) {
      if (localStorage.selectedTechPage == i) {
        articles[i].removeAttribute("hidden");
        technoImgs[i].removeAttribute("hidden");
        numbers[i].setAttribute("aria-selected", "true");
      } else {
        articles[i].setAttribute("hidden", "");
        technoImgs[i].setAttribute("hidden", "");
        numbers[i].setAttribute("aria-selected", "false");
      }
    }
    numberFocus = localStorage.selectedTechPage;

    numbers.forEach((number) => {
      number.setAttribute("tabindex", -1);
    });
    numbers[numberFocus].setAttribute("tabindex", 0);
  }
});
