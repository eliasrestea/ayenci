import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WordAnimation() {
  useEffect(() => {
    // Wrap each word
    document.querySelectorAll(".text-line").forEach((el) => {
      const words = el.textContent.trim().split(/\s+/);
      el.innerHTML = words.map(w => `<span class="inline-block opacity-0 pr-2">${w}</span>`).join(" ");
    });

    // Animate each line separately
    gsap.utils.toArray(".text-line").forEach((line, i) => {
      const words = line.querySelectorAll("span");

      gsap.fromTo(words,
        { opacity: 0 },
        {
          opacity: 1,
          stagger: 0.15,
          duration: 0.2,
          ease: "power1.out",
          scrollTrigger: {
            trigger: "#word-section",
            start: `top+=${i * 20 + 30}% center`,
            end: `top+=${i * 20 + 40}% center`,
            scrub: true,
          },
        }
      );
    });
  }, []);

  return null;
}
