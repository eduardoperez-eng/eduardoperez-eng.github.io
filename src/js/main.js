const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');
const navLinks = [...document.querySelectorAll('#main-nav a[href^="#"]')];
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const progressBar = document.querySelector('.scroll-progress span');

const closeMenu = () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Abrir menú de navegación');
    navigation?.classList.remove('open');
};

menuButton?.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
    navigation?.classList.toggle('open', isOpen);
});
navLinks.forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        menuButton.focus();
    }
});
document.addEventListener('pointerdown', event => {
    if (!navigation?.contains(event.target) && !menuButton?.contains(event.target)) closeMenu();
});
window.matchMedia('(min-width: 641px)').addEventListener('change', closeMenu);

let scrollFrame;
const updateScrollUI = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    if (progressBar) progressBar.style.width = (scrollable > 0 ? Math.min(window.scrollY / scrollable * 100, 100) : 0) + '%';
    header?.classList.toggle('scrolled', window.scrollY > 20);
    scrollFrame = null;
};
updateScrollUI();
window.addEventListener('scroll', () => {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScrollUI);
}, { passive: true });
window.addEventListener('resize', updateScrollUI);

if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(entries => {
        const visibleEntry = entries.find(entry => entry.isIntersecting);
        if (!visibleEntry) return;
        navLinks.forEach(link => {
            const isActive = link.getAttribute('href') === '#' + visibleEntry.target.id;
            link.classList.toggle('active', isActive);
            if (isActive) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
        });
    }, { rootMargin: '-15% 0px -65%', threshold: 0 });
    document.querySelectorAll('main section[id]').forEach(section => sectionObserver.observe(section));

    if (!motionPreference.matches) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.08 });
        document.documentElement.classList.add('js-ready');
        document.querySelectorAll('.reveal').forEach(item => revealObserver.observe(item));
    }
}

const currentYear = document.querySelector('#current-year');
if (currentYear) currentYear.textContent = new Date().getFullYear();

const carousel = document.querySelector('.tech-carousel');
if (carousel) {
    const track = carousel.querySelector('.tech-track');
    const cards = [...track.querySelectorAll('.tech-card')];
    const playButton = carousel.querySelector('.carousel-play');
    const dotsContainer = carousel.querySelector('.carousel-dots');
    const status = carousel.querySelector('.carousel-status');
    let current = 0;
    let playing = !motionPreference.matches;
    let hovered = false;
    let inView = false;
    let timer;
    let scrollEndTimer;
    let programmaticScroll = false;

    carousel.querySelector('.carousel-toolbar').hidden = false;
    dotsContainer.hidden = false;
    const dots = cards.map((card, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.setAttribute('aria-label', 'Mostrar ' + card.dataset.tech + ', ' + (index + 1) + ' de ' + cards.length);
        button.setAttribute('aria-controls', 'tech-track');
        button.addEventListener('click', () => { pause(); goTo(index); });
        dotsContainer.append(button);
        return button;
    });

    const updateSelection = () => {
        cards.forEach((card, index) => card.classList.toggle('is-current', index === current));
        dots.forEach((dot, index) => {
            if (index === current) dot.setAttribute('aria-current', 'true');
            else dot.removeAttribute('aria-current');
        });
        carousel.querySelector('.carousel-index').textContent = String(current + 1).padStart(2, '0');
        carousel.querySelector('.carousel-current').textContent = cards[current].dataset.tech;
        status.textContent = cards[current].dataset.tech + ', tecnología ' + (current + 1) + ' de ' + cards.length;
    };
    const goTo = index => {
        current = (index + cards.length) % cards.length;
        programmaticScroll = true;
        const left = cards[current].offsetLeft - cards[0].offsetLeft;
        track.scrollTo({ left: Math.min(left, track.scrollWidth - track.clientWidth), behavior: motionPreference.matches ? 'auto' : 'smooth' });
        updateSelection();
        clearTimeout(scrollEndTimer);
        scrollEndTimer = setTimeout(() => { programmaticScroll = false; }, 800);
    };
    const updatePlayback = () => {
        clearInterval(timer);
        playButton.setAttribute('aria-label', playing ? 'Pausar carrusel' : 'Reproducir carrusel');
        playButton.querySelector('.play-label').textContent = playing ? 'Pausar' : 'Reproducir';
        playButton.querySelector('.play-icon').textContent = playing ? 'Ⅱ' : '▷';
        status.setAttribute('aria-live', playing ? 'off' : 'polite');
        if (playing && !hovered && inView && !document.hidden) timer = setInterval(() => goTo(current + 1), 3600);
    };
    const pause = () => { playing = false; updatePlayback(); };
    playButton.addEventListener('click', () => { playing = !playing; updatePlayback(); });
    carousel.querySelector('.carousel-prev').addEventListener('click', () => { pause(); goTo(current - 1); });
    carousel.querySelector('.carousel-next').addEventListener('click', () => { pause(); goTo(current + 1); });
    track.addEventListener('keydown', event => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        pause();
        const target = event.key === 'Home' ? 0 : event.key === 'End' ? cards.length - 1 : current + (event.key === 'ArrowRight' ? 1 : -1);
        goTo(target);
    });
    carousel.addEventListener('pointerenter', () => { hovered = true; updatePlayback(); });
    carousel.addEventListener('pointerleave', () => { hovered = false; updatePlayback(); });
    carousel.addEventListener('focusin', event => { if (event.target !== playButton) pause(); });
    track.addEventListener('pointerdown', () => { pause(); programmaticScroll = false; });
    track.addEventListener('wheel', () => { pause(); programmaticScroll = false; }, { passive: true });
    track.addEventListener('scroll', () => {
        if (programmaticScroll) return;
        const start = cards[0].offsetLeft;
        current = cards.reduce((nearest, card, index) => Math.abs(card.offsetLeft - start - track.scrollLeft) < Math.abs(cards[nearest].offsetLeft - start - track.scrollLeft) ? index : nearest, 0);
        updateSelection();
    }, { passive: true });
    document.addEventListener('visibilitychange', updatePlayback);
    motionPreference.addEventListener('change', () => {
        if (motionPreference.matches) pause();
        document.querySelectorAll('.reveal').forEach(item => item.classList.add('visible'));
    });
    if ('IntersectionObserver' in window) {
        new IntersectionObserver(entries => {
            inView = entries[0].isIntersecting;
            updatePlayback();
        }, { threshold: 0.2 }).observe(carousel);
    } else inView = true;
    window.addEventListener('resize', () => goTo(current));
    updateSelection();
    updatePlayback();
}
