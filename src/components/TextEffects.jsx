// src/components/TextEffects.jsx
import { useEffect } from 'react';

export default function TextEffects() {

    useEffect(() => {
        const heroLogo = document.getElementById('hero-logo');
        const navLogo = document.getElementById('nav-logo');
        const subline = document.getElementById('subline-text');
        const arrow = document.getElementById('scroll-arrow');

        function handleScroll() {
            const scrollY = window.scrollY;
            const max = window.innerHeight;
            const progress = Math.min(scrollY / max, 1);

            // HERO: move up & shrink & fade out
            if (heroLogo) {
                const opacity = 1 - progress * 1.2;

                heroLogo.style.transform = `translateY(-${progress * 41}vh) scale(${1 - progress * 0.7})`;
                heroLogo.style.opacity = opacity < 0 ? '0' : `${opacity}`;
            }

            // NAV: fade in
            if (navLogo) {
                const navOpacity = progress * 1.5;
                navLogo.style.opacity = navOpacity > 1 ? '1' : `${navOpacity}`;
            }

            // Fade out subline
            if (subline) {
                subline.style.opacity = `${1 - progress * 2}`;
                subline.style.transform = `translateY(-${progress * 10}px)`;
            }

            // Fade out scroll arrow
            if (arrow) {
                arrow.style.opacity = `${1 - progress * 3}`;
                arrow.style.transform = `scale(${1 - progress * 0.5})`;
                arrow.style.pointerEvents = progress > 0.1 ? 'none' : 'auto';
            }
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return null;
}
