/*
 * Title:
 * Description:
 * Author: Samin Yasar
 * Date: 27/January/2021
 * Variable name type: variableName
 */

// // basic setup

// document.addEventListener("contextmenu", function (e) {
//     e.preventDefault();
//     // alert("This website's all content is protected. Can not copy anything.");
// });

// select all necessary elements

const hamburgerIcon = document.getElementById("hamburgerIcon");
const mobileMenu = document.getElementById("mobileMenu");

// hamburger menu functionality
hamburgerIcon.addEventListener("click", () => {
  if (hamburgerIcon.classList.contains("fa-bars")) {
    hamburgerIcon.classList.remove("fa-bars");
    hamburgerIcon.classList.add("fa-times");
    mobileMenu.classList.add("showmobileMenu");
  } else {
    hamburgerIcon.classList.remove("fa-times");
    hamburgerIcon.classList.add("fa-bars");
    mobileMenu.classList.remove("showmobileMenu");
  }
});
