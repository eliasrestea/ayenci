// src/components/TextEffects.jsx
import { useEffect } from 'react';

export default function TextEffects() {

    useEffect(() => {
        const text = document.getElementById('rst-text');
        const subline = document.getElementById('subline-text');
        const arrow = document.getElementById('scroll-arrow');

        function handleScroll() {
            const scrollY = window.scrollY;
            const max = window.innerHeight;
            const progress = Math.min(scrollY / max, 1);

            // Move and scale RST text
            if (text) {
                text.style.transform = `translateY(-${progress * 41}vh) scale(${1 - progress * 0.7})`;
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
