/* =========================
   LOADER
========================= */

window.addEventListener("load", function () {

    const loader = document.getElementById("loader");

    setTimeout(function () {
        loader.classList.add("hide");
    }, 700);

});


/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", function () {

        navLinks.classList.toggle("show");

        const icon = menuBtn.querySelector("i");

        if (navLinks.classList.contains("show")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });

}


/* Close menu after clicking link */

document.querySelectorAll(".nav-links a").forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("show");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* =========================
   ACTIVE NAVIGATION
========================= */

const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", function () {

    let currentSection = "";

    sections.forEach(function (section) {

        const sectionTop = section.offsetTop - 160;

        if (window.scrollY >= sectionTop) {
            currentSection = section.id;
        }

    });

    navItems.forEach(function (item) {

        item.classList.remove("active");

        if (
            item.getAttribute("href") ===
            "#" + currentSection
        ) {
            item.classList.add("active");
        }

    });

});


/* =========================
   SCROLL REVEAL
========================= */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(function (element) {

    revealObserver.observe(element);

});


/* =========================
   3D PROFILE EFFECT
========================= */

const profile =
    document.getElementById("profile3d");

const heroVisual =
    document.querySelector(".hero-visual");


if (profile && heroVisual) {

    heroVisual.addEventListener(
        "mousemove",
        function (event) {

            const rect =
                heroVisual.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateY =
                (x - centerX) / 25;

            const rotateX =
                (centerY - y) / 25;

            profile.style.transform =
                `rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateZ(20px)`;

        }
    );


    heroVisual.addEventListener(
        "mouseleave",
        function () {

            profile.style.transform =
                "rotateX(0deg) rotateY(0deg) translateZ(0)";

        }
    );

}


/* =========================
   COUNTERS
========================= */

const counters =
    document.querySelectorAll("[data-count]");

const statsSection =
    document.querySelector(".stats");

let counterStarted = false;


if (statsSection) {

    const counterObserver =
        new IntersectionObserver(
            function (entries) {

                if (
                    entries[0].isIntersecting &&
                    !counterStarted
                ) {

                    counterStarted = true;

                    counters.forEach(function (counter) {

                        const target =
                            Number(counter.dataset.count);

                        let current = 0;

                        const step =
                            Math.max(
                                1,
                                Math.ceil(target / 30)
                            );

                        const timer =
                            setInterval(function () {

                                current += step;

                                if (current >= target) {

                                    current = target;

                                    clearInterval(timer);

                                }

                                counter.textContent =
                                    current + "+";

                            }, 40);

                    });

                }

            },
            {
                threshold: 0.5
            }
        );

    counterObserver.observe(statsSection);

}


/* =========================
   BACKGROUND PARALLAX
========================= */

window.addEventListener(
    "mousemove",
    function (event) {

        const x =
            (event.clientX / window.innerWidth - 0.5) * 20;

        const y =
            (event.clientY / window.innerHeight - 0.5) * 20;

        document.querySelectorAll(".glow").forEach(
            function (glow) {

                glow.style.transform =
                    `translate(${x}px, ${y}px)`;

            }
        );

    }
);