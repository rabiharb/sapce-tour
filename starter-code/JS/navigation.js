const navBtn = document.querySelector(".mobile-nav-toggle");
const navCont = document.querySelector("#primary-navigation");

navBtn.addEventListener("click", () => {
  let visibilty = navCont.getAttribute("data-visible");
  visibilty = visibilty == "false" ? "true" : "false";
  navCont.setAttribute("data-visible", visibilty);
  navBtn.setAttribute("aria-expanded", visibilty);
});
