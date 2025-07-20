
import React, { useEffect } from 'react';

declare global {
    interface Window {
        tsParticles: any;
    }
}

export const ParticleBackground: React.FC = () => {
    useEffect(() => {
        if (window.tsParticles) {
            window.tsParticles.load("particles-js", {
                particles: {
                    number: { value: 60, density: { enable: true, value_area: 800 } },
                    color: { value: "#3b82f6" },
                    shape: { type: "circle" },
                    opacity: { value: 0.3, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } },
                    size: { value: 3, random: true },
                    line_linked: { enable: true, distance: 150, color: "#3b82f6", opacity: 0.2, width: 1 },
                    move: { enable: true, speed: 1, direction: "none", random: false, straight: false, out_mode: "out", bounce: false }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" }, resize: true },
                    modes: { grab: { distance: 140, line_linked: { opacity: 0.5 } }, push: { particles_nb: 4 } }
                },
                retina_detect: true
            });
        }
    }, []);

    return null;
};
