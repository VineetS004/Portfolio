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
   SKILLS COVERFLOW CAROUSEL
========================================= */

(function () {

    const track =
        document.getElementById("skillsTrack");

    if (!track) return;

    const slides =
        Array.from(
            track.querySelectorAll(".skill-slide")
        );

    const dotsWrap =
        document.getElementById("skillsDots");

    const prevBtn =
        document.getElementById("skillPrev");

    const nextBtn =
        document.getElementById("skillNext");

    const total = slides.length;

    let active = 0;

    let autoplayId = null;


    /* Build dots */

    slides.forEach((slide, i) => {

        const dot =
            document.createElement("button");

        dot.classList.add("dot");

        dot.type = "button";

        dot.setAttribute(
            "aria-label",
            "Go to skill " + (i + 1)
        );

        dot.addEventListener("click", () => {

            goTo(i);

            restartAutoplay();

        });

        dotsWrap.appendChild(dot);

    });

    const dots =
        Array.from(
            dotsWrap.querySelectorAll(".dot")
        );


    function render() {

        slides.forEach((slide, i) => {

            let offset = i - active;

            if (offset > total / 2) {
                offset -= total;
            }

            if (offset < -total / 2) {
                offset += total;
            }

            const abs =
                Math.abs(offset);

            let translateX = offset * 235;

            let scale =
                1 - abs * 0.18;

            if (scale < 0.55) scale = 0.55;

            let opacity;

            if (abs === 0) {
                opacity = 1;
            } else if (abs === 1) {
                opacity = 0.55;
            } else if (abs === 2) {
                opacity = 0.22;
            } else {
                opacity = 0;
            }

            const rotateY =
                offset * -12;

            const zIndex =
                10 - abs;

            slide.style.transform =
                `translate(-50%, -50%) translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`;

            slide.style.opacity =
                opacity;

            slide.style.zIndex =
                zIndex;

            slide.style.pointerEvents =
                abs > 2 ? "none" : "auto";

            slide.classList.toggle(
                "is-active",
                offset === 0
            );

        });


        dots.forEach((dot, i) => {

            dot.classList.toggle(
                "active",
                i === active
            );

        });

    }


    function goTo(index) {

        active = ((index % total) + total) % total;

        render();

    }


    function next() {
        goTo(active + 1);
    }

    function prevSlide() {
        goTo(active - 1);
    }


    slides.forEach((slide, i) => {

        slide.addEventListener("click", () => {

            if (i !== active) {

                goTo(i);

                restartAutoplay();

            }

        });

    });


    if (nextBtn) {

        nextBtn.addEventListener("click", () => {

            next();

            restartAutoplay();

        });

    }


    if (prevBtn) {

        prevBtn.addEventListener("click", () => {

            prevSlide();

            restartAutoplay();

        });

    }


    /* Touch swipe */

    let touchStartX = 0;

    track.addEventListener(
        "touchstart",
        (e) => {

            touchStartX =
                e.changedTouches[0].screenX;

        },
        { passive: true }
    );

    track.addEventListener(
        "touchend",
        (e) => {

            const touchEndX =
                e.changedTouches[0].screenX;

            const delta =
                touchEndX - touchStartX;

            if (delta > 40) {

                prevSlide();

                restartAutoplay();

            } else if (delta < -40) {

                next();

                restartAutoplay();

            }

        },
        { passive: true }
    );


    /* Autoplay */

    function startAutoplay() {

        autoplayId =
            setInterval(next, 3500);

    }

    function stopAutoplay() {

        clearInterval(autoplayId);

    }

    function restartAutoplay() {

        stopAutoplay();

        startAutoplay();

    }


    track.addEventListener(
        "mouseenter",
        stopAutoplay
    );

    track.addEventListener(
        "mouseleave",
        startAutoplay
    );


    render();

    startAutoplay();

})();


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