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

// Language switcher

function initLanguageSwitcher() {
    // Délégation sur le body (ou un parent commun comme document) pour capturer tous les clics sur .switch-lang
    document.addEventListener('click', function(event) {
        const target = event.target.closest('.switch-lang'); // Trouve l'élément .switch-lang le plus proche
        if (target && target.dataset.lang) {
            event.preventDefault(); // Empêche le lien par défaut si besoin
            switchLanguage(target.dataset.lang);
        }
    });
}

function switchLanguage(lang) {
    document.querySelectorAll('[data-fr], [data-en]').forEach(el => {
        el.textContent = el.getAttribute('data-' + lang); // Mise à jour du texte
    });
    localStorage.setItem('preferredLanguage', lang); // Sauvegarde
    // Optionnel : ferme le menu mobile si ouvert
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu && mobileMenu.classList.contains('open')) { // Suppose que tu ajoutes 'open' au burger
        // Code pour fermer le menu (ex: toggleClass ou similaire)
    }
}

// Initialise au chargement
document.addEventListener('DOMContentLoaded', initLanguageSwitcher);

// Chargement de la la langue préférée au démarrage
const preferredLang = localStorage.getItem('preferredLanguage') || 'fr'; // Par défaut FR
switchLanguage(preferredLang);


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
            emailjs.sendForm('service_9lahaau', 'template_uuesrgh', this)
                .then((response) => {
                    console.log('SUCCESS!', response.status, response.text);
                    const name = document.querySelector('input[name="name"]').value || 'Guest';
                    responseEl.innerHTML = `Thanks ${name}, I'll be in touch soon !`;
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