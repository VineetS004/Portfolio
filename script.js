/* =========================================
   PRELOADER
========================================= */

window.addEventListener("load", () => {

    const preloader =
        document.getElementById("preloader");

    setTimeout(() => {

        preloader.classList.add("hide");

    }, 700);

});


/* =========================================
   NAVBAR
========================================= */

const navbar =
    document.getElementById("navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});


/* =========================================
   TYPING EFFECT
========================================= */

const typingText =
    document.getElementById("typing-text");

const roles = [

    "Frontend Developer",
    "Web Developer",
    "UI Enthusiast",
    "Problem Solver"

];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;


function typeEffect() {

    const currentRole =
        roles[roleIndex];


    if (!deleting) {

        typingText.textContent =
            currentRole.substring(
                0,
                charIndex + 1
            );

        charIndex++;


        if (
            charIndex ===
            currentRole.length
        ) {

            deleting = true;

            setTimeout(
                typeEffect,
                1500
            );

            return;
        }

    } else {

        typingText.textContent =
            currentRole.substring(
                0,
                charIndex - 1
            );

        charIndex--;


        if (charIndex === 0) {

            deleting = false;

            roleIndex =
                (roleIndex + 1)
                % roles.length;

        }

    }


    setTimeout(
        typeEffect,
        deleting ? 50 : 100
    );

}


typeEffect();


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target
                        .classList
                        .add("active");

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================
   COUNTER ANIMATION
========================================= */

const counters =
    document.querySelectorAll(".counter");


let countersStarted = false;


function startCounters() {

    if (countersStarted)
        return;

    countersStarted = true;


    counters.forEach(counter => {

        const target =
            Number(
                counter.dataset.target
            );

        let current = 0;

        const increment =
            target / 80;


        function updateCounter() {

            current += increment;


            if (current < target) {

                counter.textContent =
                    Math.ceil(current);

                requestAnimationFrame(
                    updateCounter
                );

            } else {

                counter.textContent =
                    target;

            }

        }


        updateCounter();

    });

}


const statsSection =
    document.querySelector(".stats-row");


const statsObserver =
    new IntersectionObserver(

        entries => {

            if (
                entries[0].isIntersecting
            ) {

                startCounters();

            }

        },

        {
            threshold: .5
        }

    );


if (statsSection) {

    statsObserver.observe(
        statsSection
    );

}


/* =========================================
   SKILL PROGRESS ANIMATION
========================================= */

const progressBars =
    document.querySelectorAll(
        ".progress-bar"
    );


const progressObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    const bar =
                        entry.target;

                    bar.style.width =
                        bar.dataset.width;

                }

            });

        },

        {
            threshold: .5
        }

    );


progressBars.forEach(bar => {

    progressObserver.observe(bar);

});


/* =========================================
   PARTICLES
========================================= */

const particles =
    document.getElementById("particles");


for (let i = 0; i < 45; i++) {

    const particle =
        document.createElement("span");

    particle.classList.add(
        "particle"
    );


    particle.style.left =
        Math.random() * 100 + "%";


    particle.style.animationDuration =
        (8 + Math.random() * 15) + "s";


    particle.style.animationDelay =
        Math.random() * 10 + "s";


    particle.style.opacity =
        Math.random();


    const size =
        1 + Math.random() * 3;

    particle.style.width =
        size + "px";

    particle.style.height =
        size + "px";


    particles.appendChild(
        particle
    );

}


/* =========================================
   BACK TO TOP
========================================= */

const backToTop =
    document.getElementById(
        "backToTop"
    );


window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backToTop.classList.add(
            "show"
        );

    } else {

        backToTop.classList.remove(
            "show"
        );

    }

});


backToTop.addEventListener(
    "click",
    () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }
);


/* =========================================
   CONTACT FORM
========================================= */

const contactForm =
    document.getElementById(
        "contactForm"
    );


contactForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const button =
            contactForm.querySelector(
                "button"
            );


        const originalText =
            button.innerHTML;


        button.innerHTML =
            `
                <i class="bi bi-check-circle"></i>
                Message Ready!
            `;


        button.style.background =
            "linear-gradient(135deg,#22c55e,#06b6d4)";


        setTimeout(() => {

            button.innerHTML =
                originalText;

            button.style.background =
                "";

            contactForm.reset();

        }, 2500);

    }
);


/* =========================================
   CLOSE MOBILE NAVBAR
   AFTER CLICK
========================================= */

const navLinks =
    document.querySelectorAll(
        ".navbar-nav .nav-link"
    );


const navbarCollapse =
    document.querySelector(
        ".navbar-collapse"
    );


navLinks.forEach(link => {

    link.addEventListener(
        "click",
        () => {

            if (
                navbarCollapse.classList
                    .contains("show")
            ) {

                const bsCollapse =
                    bootstrap.Collapse
                        .getInstance(
                            navbarCollapse
                        );

                if (bsCollapse) {

                    bsCollapse.hide();

                }

            }

        }
    );

});


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );


window.addEventListener("scroll", () => {

    let current = "";


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;


        if (
            window.scrollY >=
            sectionTop
        ) {

            current =
                section.getAttribute(
                    "id"
                );

        }

    });


    navLinks.forEach(link => {

        link.classList.remove(
            "active"
        );


        if (
            link.getAttribute("href")
            === "#" + current
        ) {

            link.classList.add(
                "active"
            );

        }

    });

});


/* =========================================
   CURRENT YEAR
========================================= */

document.getElementById("year")
    .textContent =
    new Date().getFullYear();