export const handleSidebarSmall = () => {
  if (window.innerWidth >= 992) {
    const titles = document.querySelectorAll("li a .title");
    const arrows = document.querySelectorAll("li a .arrow");
    const sideBar = document.querySelector(".side-bar");
    const dashboardContainer = document.querySelector(".dashboard-container");

    for (let i = 0; i < titles.length; i++) {
      titles[i].classList.toggle("hide-element");
    }
    for (let i = 0; i < arrows.length; i++) {
      arrows[i].classList.toggle("hide-element");
    }
    dashboardContainer.classList.toggle("ps-80");
    sideBar.classList.toggle("small-sidebar");
  }
};
