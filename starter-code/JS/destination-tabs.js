const tabList = document.querySelector("[role='tablist']");
const tabs = tabList.querySelectorAll("[role='tab']");

const articles = document.querySelectorAll("article");
const images = document.querySelectorAll("picture");

let tabFocus = 0;

tabList.addEventListener("keydown", setFocus);
tabs.forEach((tab) => {
  tab.addEventListener("click", selectPage);
});

function setFocus(e) {
  const leftKey = 37;
  const rightKey = 39;
  if (e.keyCode === rightKey || e.keyCode === leftKey) {
    const tabsLength = tabs.length;
    tabs[tabFocus].setAttribute("tabindex", -1);

    if (e.keyCode === rightKey) {
      tabFocus++;
    } else {
      tabFocus--;
    }
    if (tabFocus < 0) {
      tabFocus = tabsLength - 1;
    }
    tabFocus %= tabsLength;
    tabs[tabFocus].setAttribute("tabindex", 0);
    tabs[tabFocus].focus();
  }
}

function selectPage(e) {
  //   const targetTab = e.target;
  //   const targetPanel = targetTab.getAttribute("aria-controls");
  //   console.log(targetPanel);
  for (let i = 0; i < tabs.length; i++) {
    if (e.target === tabs[i]) {
      articles[i].removeAttribute("hidden");
      images[i].removeAttribute("hidden");
      tabs[i].setAttribute("aria-selected", "true");
      localStorage.selectedDestinationPage = i;
    } else {
      articles[i].setAttribute("hidden", "");
      images[i].setAttribute("hidden", "");
      tabs[i].setAttribute("aria-selected", "false");
    }
  }
}

window.addEventListener("load", () => {
  if (localStorage.selectedDestinationPage) {
    for (let i = 0; i < articles.length; i++) {
      if (localStorage.selectedDestinationPage == i) {
        articles[i].removeAttribute("hidden");
        images[i].removeAttribute("hidden");
        tabs[i].setAttribute("aria-selected", "true");
        tabs[i].setAttribute("tabindex", 0);
      } else {
        articles[i].setAttribute("hidden", "");
        images[i].setAttribute("hidden", "");
        tabs[i].setAttribute("aria-selected", "false");
        tabs[i].setAttribute("tabindex", -1);
      }
    }
    tabFocus = localStorage.selectedDestinationPage;
  }
});
