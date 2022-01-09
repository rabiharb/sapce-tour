const crewImages = document.querySelectorAll(".picture-cont");
const dotList = document.querySelector("[role='dotlist']");
const dots = dotList.querySelectorAll("[role='dot']");
const articles = document.querySelectorAll("article");

let dotFocus = 0;
let articlesLength = articles.length;

dots.forEach((dot) => {
  dot.addEventListener("click", changeCrewMember);
});
dotList.addEventListener("keydown", setFocus);

function setFocus(e) {
  const leftKey = 37;
  const rightKey = 39;
  if (e.keyCode === rightKey || e.keyCode === leftKey) {
    if (e.keyCode === leftKey) {
      dotFocus--;
      if (dotFocus < 0) {
        dotFocus = articlesLength - 1;
      }
    } else {
      dotFocus++;
    }

    dots.forEach((dot) => {
      dot.setAttribute("tabindex", -1);
    });

    dotFocus %= articlesLength;
    dots[dotFocus].setAttribute("tabindex", 0);
    dots[dotFocus].focus();
  }
}

function changeCrewMember(e) {
  for (let i = 0; i < dots.length; i++) {
    if (e.target === dots[i]) {
      articles[i].removeAttribute("hidden");
      crewImages[i].removeAttribute("hidden");
      dots[i].setAttribute("aria-selected", "true");
      localStorage.selectedCrewPage = i;
    } else {
      articles[i].setAttribute("hidden", "");
      crewImages[i].setAttribute("hidden", "");
      dots[i].setAttribute("aria-selected", "false");
    }
  }
}
window.addEventListener("load", () => {
  if (localStorage.selectedCrewPage) {
    for (let i = 0; i < articles.length; i++) {
      if (localStorage.selectedCrewPage == i) {
        articles[i].removeAttribute("hidden");
        crewImages[i].removeAttribute("hidden");
        dots[i].setAttribute("aria-selected", "true");
      } else {
        articles[i].setAttribute("hidden", "");
        crewImages[i].setAttribute("hidden", "");
        dots[i].setAttribute("aria-selected", "false");
      }
    }
    dots.forEach((dot) => {
      dot.setAttribute("tabindex", -1);
    });
    dotFocus = localStorage.selectedCrewPage;
    dots[dotFocus].setAttribute("tabindex", 0);
  }
});
