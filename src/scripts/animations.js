import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Hero Animations - Corregido para evitar saltos de layout
    const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } });

    if (document.querySelector('.hero-content')) {
        // Usamos set para asegurar el estado inicial sin flashes de contenido
        gsap.set(".hero-image-container", { clipPath: "inset(0 0 100% 0)" });

        heroTl
            .from(".hero-content span", { opacity: 0, y: 20, duration: 1 })
            .from(".hero-content h1", {
                opacity: 0,
                y: 40, // Reducido un poco para estabilidad
                duration: 1.2,
                stagger: 0.15,
                skewY: 4
            }, "-=0.8")
            .from(".hero-content p", { opacity: 0, y: 15, duration: 1 }, "-=1")
            .to(".hero-image-container", {
                clipPath: "inset(0 0 0% 0)",
                duration: 2,
                ease: "expo.inOut"
            }, "-=1.5")
            .from(".hero-img", {
                scale: 1.2,
                duration: 2.5,
                ease: "expo.out"
            }, "-=1.8");
    }

    // 2. Gallery Parallax
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item) => {
        const img = item.querySelector('.parallax-img');
        if (img) {
            gsap.fromTo(img,
                { yPercent: -10 }, // Reducido para evitar que la imagen "baile" al cargar
                {
                    yPercent: 10,
                    ease: "none",
                    scrollTrigger: {
                        trigger: item,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                }
            );
        }
    });

    // 3. SECCIÓN SERVICIOS (Nueva Lógica Integrada)
    if (document.querySelector('#servicios')) {
        const servicesTl = gsap.timeline({
            scrollTrigger: {
                trigger: "#servicios",
                start: "top 75%",
            }
        });

        servicesTl
            .from(".service-header > *", {
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power4.out"
            })
            .from(".service-item", {
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "expo.out"
            }, "-=0.5")
            // Animación de la línea que se dibuja
            .from(".service-item-line", {
                scaleX: 0,
                duration: 1.5,
                stagger: 0.1,
                ease: "expo.inOut"
            }, "-=1")
            .from(".service-footer", {
                opacity: 0,
                y: 20,
                duration: 1
            }, "-=0.5");
    }

    // 4. Contacto
    if (document.querySelector('#contacto')) {
        gsap.from(".contact-info", {
            scrollTrigger: { trigger: "#contacto", start: "top 80%" },
            opacity: 0,
            x: -30,
            duration: 1.2
        });
        gsap.from(".contact-form-container", {
            scrollTrigger: { trigger: "#contacto", start: "top 80%" },
            opacity: 0,
            x: 30,
            duration: 1.2
        });
    }

    // 5. Whatsapp Button
    if (document.querySelector('.whatsapp-btn')) {
        gsap.to(".whatsapp-pulse", {
            scale: 1.8,
            opacity: 0,
            duration: 1.5,
            repeat: -1,
            ease: "sine.out"
        });

        gsap.from(".whatsapp-btn", {
            scale: 0,
            opacity: 0,
            duration: 0.8,
            delay: 1.2,
            ease: "back.out(1.7)"
        });
    }
}
