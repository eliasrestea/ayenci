// src/components/WelcomeClient.jsx
import { useEffect } from 'react';

export default function WelcomeClient() {
    useEffect(() => {

        const container = document.getElementById('comet-container');
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            document.body.style.setProperty('--mouse-x', `${e.clientX}px`);
            document.body.style.setProperty('--mouse-y', `${e.clientY}px`);
        });


        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let gravityBoost = false;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            document.getElementById('grid-cursor').classList.add('active');
            updateGridMask(false); // 👈 ensures mask is tight from first appearance
        });

        window.addEventListener('mousedown', () => {
            gravityBoost = true;
            document.body.classList.add('gravity-mode');
            updateGridMask(true);
        });

        window.addEventListener('mouseup', () => {
            gravityBoost = false;
            document.body.classList.remove('gravity-mode');
            updateGridMask(false);
        });
        function updateGridMask(pressed) {
            const radius = pressed ? '150px' : '100px';
            const mask = `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,1) 0%, transparent ${radius})`;
            document.getElementById('grid-cursor').style.maskImage = mask;
            document.getElementById('grid-cursor').style.webkitMaskImage = mask;
        }
        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        function spawnComet() {
            const comet = document.createElement('div');
            comet.className = 'comet';
            container.appendChild(comet);

            const w = window.innerWidth;
            const h = window.innerHeight;
            const side = Math.random() < 0.5 ? 'left' : 'right';

            let x = side === 'left' ? -10 : w + 10;
            let y = randomInRange(100, h - 100);

            let vx = side === 'left' ? randomInRange(2, 4) : randomInRange(-4, -2);
            let vy = randomInRange(-0.8, 0.8);

            comet.style.left = `0px`;
            comet.style.top = `0px`;

            let life = 0;
            const maxLife = 3000;

            function animate() {
                life++;
                if (life > maxLife) {
                    comet.remove();
                    return;
                }

                const dx = mouseX - x;
                const dy = mouseY - y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                const pullRadius = gravityBoost ? 400 : 200;
                const gravityStrength = gravityBoost ? 0.2 : 0.05;

                if (dist < pullRadius && dist > 10) {
                    vx += (dx / dist) * gravityStrength;
                    vy += (dy / dist) * gravityStrength;
                }

                x += vx;
                y += vy;

                comet.style.transform = `translate(${x}px, ${y}px) rotate(${vx * 10}deg)`;

                requestAnimationFrame(animate);
            }

            requestAnimationFrame(animate);
        }

        setInterval(() => {
            const howMany = Math.floor(Math.random() * 2) + 2;
            for (let i = 0; i < howMany; i++) spawnComet();
        }, 2500);
    }, []);

    return null;
}
