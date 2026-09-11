/* =========================================================
   LOADER
========================================================= */

window.addEventListener("load", function () {

    const loader =
        document.getElementById("loader");

    if (!loader) return;

    setTimeout(function () {

        loader.classList.add("hidden");

    }, 700);

});


/* =========================================================
   MOBILE MENU
========================================================= */

const menuBtn =
    document.getElementById("menuBtn");

const navLinks =
    document.getElementById("navLinks");


if (menuBtn && navLinks) {

    menuBtn.addEventListener(
        "click",
        function () {

            navLinks.classList.toggle("show");

            const icon =
                menuBtn.querySelector("i");

            if (!icon) return;


            if (
                navLinks.classList.contains("show")
            ) {

                icon.classList.remove(
                    "fa-bars"
                );

                icon.classList.add(
                    "fa-xmark"
                );

            } else {

                icon.classList.remove(
                    "fa-xmark"
                );

                icon.classList.add(
                    "fa-bars"
                );

            }

        }
    );

}


/* =========================================================
   CLOSE MOBILE MENU
========================================================= */

document
    .querySelectorAll(".nav-links a")
    .forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                if (!navLinks) return;

                navLinks.classList.remove(
                    "show"
                );


                if (!menuBtn) return;

                const icon =
                    menuBtn.querySelector("i");

                if (!icon) return;


                icon.classList.remove(
                    "fa-xmark"
                );

                icon.classList.add(
                    "fa-bars"
                );

            }
        );

    });


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );


const navItems =
    document.querySelectorAll(
        ".nav-links a"
    );


function updateActiveNav() {

    let currentSection = "";


    sections.forEach(function (section) {

        const sectionTop =
            section.offsetTop - 180;

        const sectionBottom =
            sectionTop +
            section.offsetHeight;


        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionBottom
        ) {

            currentSection =
                section.id;

        }

    });


    navItems.forEach(function (item) {

        item.classList.remove(
            "active"
        );


        if (
            item.getAttribute("href") ===
            "#" + currentSection
        ) {

            item.classList.add(
                "active"
            );

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNav
);


updateActiveNav();


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


if (
    "IntersectionObserver"
    in window
) {

    const revealObserver =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(
        function (element) {

            revealObserver.observe(
                element
            );

        }
    );

} else {

    revealElements.forEach(
        function (element) {

            element.classList.add(
                "visible"
            );

        }
    );

}


/* =========================================================
   3D PROFILE EFFECT
========================================================= */

const profile =
    document.getElementById(
        "profile3d"
    );


const heroVisual =
    document.querySelector(
        ".hero-visual"
    );


const finePointer =
    window.matchMedia(
        "(pointer:fine)"
    );


if (
    profile &&
    heroVisual &&
    finePointer.matches
) {

    heroVisual.addEventListener(
        "mousemove",
        function (event) {

            const rect =
                heroVisual.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            const centerX =
                rect.width / 2;


            const centerY =
                rect.height / 2;


            const rotateY =
                (x - centerX) / 28;


            const rotateX =
                (centerY - y) / 28;


            profile.style.transform =
                `rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateZ(15px)`;

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


/* =========================================================
   COUNTERS
========================================================= */

const counters =
    document.querySelectorAll(
        "[data-count]"
    );


const statsSection =
    document.querySelector(
        ".stats-section"
    );


let counterStarted =
    false;


function startCounters() {

    if (counterStarted) return;

    counterStarted = true;


    counters.forEach(
        function (counter) {

            const target =
                Number(
                    counter.dataset.count
                );


            let current = 0;


            const duration =
                1000;


            const startTime =
                performance.now();


            function updateCounter(
                currentTime
            ) {

                const progress =
                    Math.min(
                        (
                            currentTime -
                            startTime
                        ) / duration,
                        1
                    );


                current =
                    Math.floor(
                        progress * target
                    );


                counter.textContent =
                    current + "+";


                if (progress < 1) {

                    requestAnimationFrame(
                        updateCounter
                    );

                } else {

                    counter.textContent =
                        target + "+";

                }

            }


            requestAnimationFrame(
                updateCounter
            );

        }
    );

}


if (
    statsSection &&
    "IntersectionObserver" in window
) {

    const counterObserver =
        new IntersectionObserver(
            function (entries) {

                if (
                    entries[0].isIntersecting
                ) {

                    startCounters();

                    counterObserver.disconnect();

                }

            },
            {
                threshold: 0.3
            }
        );


    counterObserver.observe(
        statsSection
    );

} else {

    startCounters();

}


/* =========================================================
   BACKGROUND PARALLAX
========================================================= */

const glows =
    document.querySelectorAll(
        ".glow"
    );


if (
    finePointer.matches &&
    glows.length
) {

    window.addEventListener(
        "mousemove",
        function (event) {

            const x =
                (
                    event.clientX /
                    window.innerWidth -
                    0.5
                ) * 25;


            const y =
                (
                    event.clientY /
                    window.innerHeight -
                    0.5
                ) * 25;


            glows.forEach(
                function (glow, index) {

                    const multiplier =
                        1 + index * 0.25;


                    glow.style.transform =
                        `translate(
                            ${x * multiplier}px,
                            ${y * multiplier}px
                        )`;

                }
            );

        }
    );

}


/* =========================================================
   RESIZE SAFETY
========================================================= */

window.addEventListener(
    "resize",
    function () {

        if (
            window.innerWidth > 780 &&
            navLinks
        ) {

            navLinks.classList.remove(
                "show"
            );


            if (menuBtn) {

                const icon =
                    menuBtn.querySelector("i");


                if (icon) {

                    icon.classList.remove(
                        "fa-xmark"
                    );

                    icon.classList.add(
                        "fa-bars"
                    );

                }

            }

        }

    }
);


/* =========================================================
   CONSOLE
========================================================= */

console.log(
    "🚀 Azhar Shaikh Portfolio Loaded Successfully"
);