import { useEffect } from 'react';

export default function Menu() {
  useEffect(() => {
    const toggle  = document.getElementById('nav-toggle');
    const sheet   = document.getElementById('mobile-sheet');
    const icon    = document.getElementById('nav-icon');

    if (!toggle || !sheet || !icon) return;      // bail if not rendered yet

    const handleClick = () => {
      sheet.classList.toggle('translate-y-full');
      sheet.classList.toggle('opacity-0');
      sheet.classList.toggle('pointer-events-none');

      const open = !sheet.classList.contains('translate-y-full');
      toggle.setAttribute('aria-expanded', open);
      icon.setAttribute(
        'd',
        open ? 'M6 6l12 12M6 18L18 6' : 'M4 6h16M4 12h16M4 18h16'
      );
      toggle.classList.toggle('rotate-90', open);
    };

    toggle.addEventListener('click', handleClick);

    // —— cleanup ——
    return () => toggle.removeEventListener('click', handleClick);
  }, []);

  return null;
}
