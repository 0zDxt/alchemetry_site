// Year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Fade In Intro
document.addEventListener('DOMContentLoaded', function () {
    var introLogo = document.querySelector('.intro-logo');
    var decouvrir = document.querySelector('.decouvrir');

    fadeIn(introLogo, 1000, function () {
        fadeIn(decouvrir, 1200);
    });
});
/*
function fadeIn(element, duration, callback) {
    var opacity = 0;
    var interval = 20;
    var delta = interval / duration;

    function increaseOpacity() {
        opacity += delta;
        element.style.opacity = opacity;

        if (opacity >= 1) {
            clearInterval(timer);
            if (callback) callback();
        }
    }

    var timer = setInterval(increaseOpacity, interval);
}
*/
// Marquee for services
const trackServices = document.getElementById('marquee-services');
if (trackServices) {
    let ms = 0;
    const loopServices = () => {
        ms = (ms + 0.4) % trackServices.scrollWidth;
        trackServices.style.transform = `translateX(${-ms}px)`;
        requestAnimationFrame(loopServices);
    };
    loopServices();
}

/*
// Parallax for boxes (creative mix)
const boxes = document.querySelectorAll('.box');
window.addEventListener('mousemove', (e) => {
    const { innerWidth: w, innerHeight: h } = window;
    const x = (e.clientX - w / 2) / (w / 2);
    const y = (e.clientY - h / 2) / (h / 2);
    boxes.forEach((box, i) => {
        const s = (i % 2 === 0 ? 0.5 : 1);
        box.style.transform += ` translate(${x * 5 * s}px, ${y * 5 * s}px)`;
    });
});

// Card shine follow
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
    });
});
*/
// GSAP reveals
if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.reveal').forEach((el, i) => {
        gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: i < 3 ? i * 0.05 : 0,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 80%' }
        });
    });
}

// Navigation anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        if (!href || href === "#") return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();

        const nav = document.querySelector('.nav');
        const offset = nav ? nav.offsetHeight + 12 : 0;

        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});

// Burger menu
const burger = document.getElementById("burger");
const mobileMenu = document.getElementById("mobileMenu");

if (burger && mobileMenu) {
    burger.addEventListener("click", () => {
        burger.classList.toggle("active");
        mobileMenu.classList.toggle("active");
    });

    mobileMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            burger.classList.remove("active");
            mobileMenu.classList.remove("active");
        });
    });
}

// Animated Title
let animationInterval;

function animateTitle(elementId, speed, language) {
    clearInterval(animationInterval);
    const titleElement = document.getElementById(elementId);
    const text = titleElement.getAttribute(`data-${language}`) || titleElement.textContent;
    let index = 0;
    let forward = true;

    function updateText() {
        if (forward) {
            titleElement.textContent = text.slice(0, index++);
            if (index > text.length) {
                forward = false;
            }
        } else {
            titleElement.textContent = text.slice(0, index--);
            if (index <= 0) {
                forward = true;
            }
        }
    }

    animationInterval = setInterval(updateText, speed);
}

// Mouse Follower
document.addEventListener('DOMContentLoaded', () => {
    const mouseFollower = document.getElementById('mouseFollower');

    const mouseMoveHandler = (e) => {
        if (mouseFollower && window.innerWidth > 1020) {
            mouseFollower.style.top = `${e.pageY}px`;
            mouseFollower.style.left = `${e.pageX}px`;
        }
    };

    document.addEventListener('mousemove', mouseMoveHandler);

    window.onunload = () => {
        document.removeEventListener('mousemove', mouseMoveHandler);
    };
});

// Mobile Parallax for boxes
if (window.innerWidth <= 768) {
    const boxes = document.querySelectorAll('.box');
    let lastScrollY = window.scrollY;

    const updateParallax = () => {
        const scrollY = window.scrollY;
        boxes.forEach((box, i) => {
            const speed = i % 2 === 0 ? 0.25 : 0.35;
            const translateY = scrollY * speed * 0.35;
            box.style.transform = `translateY(${translateY}px)`;
        });
        lastScrollY = scrollY;
        requestAnimationFrame(updateParallax);
    };

    requestAnimationFrame(updateParallax);
}

// EmailJS Initialization
(function() {
    // https://dashboard.emailjs.com/admin/account
    emailjs.init({
        publicKey: "A9kOabmelq6K7ozg7",
    });
})();

// Form submission avec EmailJS (fusionné et unique)
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const responseEl = document.querySelector('.response');

    if (form && responseEl) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Un seul preventDefault

            // IDs du service et template (à adapter si besoin)
            emailjs.sendForm('contact_service', 'contact_form', this)
                .then((response) => {
                    console.log('SUCCESS!', response.status, response.text);
                    const name = document.querySelector('input[name="name"]').value;
                    responseEl.innerHTML = `Merci ${name}, je vous recontacte bientôt !`;
                    responseEl.className = 'response success'; // Classe pour style
                    form.reset(); // Réinitialise le formulaire
                    form.style.display = 'none'; // Optionnel : Cache le formulaire après envoi
                }, (error) => {
                    console.log('FAILED...', error);
                    responseEl.innerHTML = 'Erreur lors de l\'envoi. Réessayez ou contactez-moi directement.';
                    responseEl.className = 'response error'; // Classe pour style
                });
        });
    }
});