/**
 * Title: Basic JavaScript File
 * Description: This is the main js file to interact with DOM element of this portfolio
 * Author: Samin Yasar
 * Date: 11/August/2021
 */

// DOM Select
const allNavLinnksContainer = document.querySelectorAll(".navigation-pages");
const hamburgerIcon = document.getElementById("hamburgerIcon");
const mobileNavigationLinksContainer = document.querySelector(
    ".mobile-navigation-items-container .navigation-pages"
);
const skillItems = document.querySelectorAll(".skill-item");
const allMixerButtons = document.querySelectorAll(".btn-mixer");

// Navigation Menu
[...allNavLinnksContainer].forEach((navLinksContainer) => {
    [...navLinksContainer.querySelectorAll("ul li a")].forEach((link) => {
        link.addEventListener("click", () => {
            [...navLinksContainer.querySelectorAll("ul li a")]
                .filter((el) => el.classList.contains("active-navigation"))
                .forEach((el) => el.classList.remove("active-navigation"));
            link.classList.add("active-navigation");
        });
    });
});

window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    let currentSectionId = "home";
    const allSections = [
        document.getElementById("home"),
        document.getElementById("about"),
        document.getElementById("services"),
        document.getElementById("skills"),
        document.getElementById("projects"),
        document.getElementById("testimonials"),
        document.getElementById("contact"),
    ];
    allSections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrolled >= sectionTop - sectionHeight / 5) {
            currentSectionId = section.getAttribute("id");
        } else if (scrolled === 0) {
            currentSectionId = "home";
        }
    });
    [...allNavLinnksContainer].forEach((navLinksContainer) => {
        [...navLinksContainer.querySelectorAll("ul li a")].forEach((link) => {
            link.classList.remove("active-navigation");
            if (link.classList.contains(currentSectionId)) {
                link.classList.add("active-navigation");
            }
        });
    });
});

// Navigation Hamburger Menu
hamburgerIcon.addEventListener("click", function () {
    if (this.classList.contains("fa-bars")) {
        this.className = "fa fa-times";
        mobileNavigationLinksContainer.classList.add("expand-navigation-pages");
        [...mobileNavigationLinksContainer.querySelectorAll("ul li")].forEach(
            (list) => {
                list.addEventListener("click", () => {
                    this.className = "fa fa-bars";
                    mobileNavigationLinksContainer.classList.remove(
                        "expand-navigation-pages"
                    );
                });
            }
        );
    } else if (this.classList.contains("fa-times")) {
        this.className = "fa fa-bars";
        mobileNavigationLinksContainer.classList.remove(
            "expand-navigation-pages"
        );
    }
});

// Skill Section Loading
document.addEventListener("scroll", () => {
    const skillItemsContainer = document.querySelector(
        ".skill-items-container"
    );
    const loaderEl = document.querySelectorAll(".loader");
    if (window.scrollY + window.innerHeight >= skillItemsContainer.offsetTop) {
        [...loaderEl].forEach((el) => {
            el.style.width = `${el.dataset.width}%`;
        });
    } else {
        [...loaderEl].forEach((el) => {
            el.style.width = "0%";
        });
    }
});

// Skill Mixer
let currentSkill = "frontend";

[...allMixerButtons].forEach((button) => {
    button.addEventListener("click", () => {
        currentSkill = button.dataset.filter;
        [...allMixerButtons]
            .filter((el) => el.classList.contains("active-skills"))
            .forEach((el) => {
                el.classList.remove("active-skills");
            });
        button.classList.add("active-skills");
        [...document.querySelectorAll(".skill-item")].forEach((item) => {
            item.style.display = "";
        });
        [...document.querySelectorAll(".skill-item")]
            .filter((item) => item.dataset.item !== currentSkill)
            .forEach((item) => {
                item.style.display = "none";
            });
    });
});

window.addEventListener("load", () => {
    [...document.querySelectorAll(".skill-item")]
        .filter((item) => item.dataset.item !== currentSkill)
        .forEach((item) => {
            item.style.display = "none";
        });
});
