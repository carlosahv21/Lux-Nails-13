import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Animations
    const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } });
    if (document.querySelector('.hero-content')) {
        heroTl.from(".hero-content span", { opacity: 0, y: 20, duration: 1 })
            .from(".hero-content h1", { opacity: 0, y: 30, duration: 1.2, stagger: 0.2 }, "-=0.8")
            .from(".hero-content p", { opacity: 0, y: 20, duration: 1 }, "-=1")
            .from(".hero-content div", { opacity: 0, y: 20, duration: 1 }, "-=0.8")
            .from(".hero-image-container", { clipPath: "inset(100% 0 0 0)", duration: 1.5, ease: "power4.inOut" }, "-=1.5")
            .from(".hero-img", { scale: 1.3, duration: 2 }, "-=1.5");
    }

    // Gallery Grid-Lane Parallax Animations
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('.parallax-img');
        const speed = 0.5 + (index % 3) * 0.2; // Varied speeds (0.5, 0.7, 0.9)

        gsap.to(img, {
            y: `${-15 * speed}%`,
            ease: "none",
            scrollTrigger: {
                trigger: item,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });

    if (document.querySelector('.gallery-header')) {
        gsap.from(".gallery-header", {
            scrollTrigger: {
                trigger: ".gallery-header",
                start: "top 80%",
            },
            opacity: 0,
            y: 50,
            duration: 1
        });
    }

    // Services Animations
    if (document.querySelector('.service-header')) {
        gsap.from(".service-header", {
            scrollTrigger: {
                trigger: ".service-header",
                start: "top 80%",
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power2.out"
        });

        gsap.from(".service-item", {
            scrollTrigger: {
                trigger: ".service-item",
                start: "top 85%",
            },
            opacity: 0,
            y: 30,
            stagger: 0.1,
            duration: 0.8,
            ease: "power2.out"
        });
    }

    // Contact Animations
    if (document.querySelector('#contacto')) {
        gsap.from(".contact-info", {
            scrollTrigger: {
                trigger: "#contacto",
                start: "top 70%",
            },
            opacity: 0,
            x: -50,
            duration: 1.2
        });

        gsap.from(".contact-form-container", {
            scrollTrigger: {
                trigger: "#contacto",
                start: "top 70%",
            },
            opacity: 0,
            x: 50,
            duration: 1.2
        });
    }

    // Whatsapp Button Animations
    if (document.querySelector('.whatsapp-btn')) {
        gsap.to(".whatsapp-pulse", {
            scale: 2,
            opacity: 0,
            duration: 1.5,
            repeat: -1,
            ease: "power2.out"
        });

        gsap.from(".whatsapp-btn", {
            scale: 0.5,
            opacity: 0,
            duration: 0.8,
            delay: 1,
            ease: "back.out(1.7)"
        });
    }
}
