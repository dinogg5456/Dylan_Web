const menuIcon = document.querySelector('.menu-icon');
const menu = document.querySelector('.menu');

menuIcon.addEventListener('click', () => {
    menu.classList.toggle('active');
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const targetOffsetTop = targetElement.offsetTop;
            const scrollDuration = 1000;
            const startingY = window.pageYOffset;
            const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

            function scroll() {
                const currentTime = 'now' in window.performance ? performance.now() : new Date().getTime();
                const elapsed = currentTime - startTime;
                window.scrollTo(0, easeInOutQuad(elapsed, startingY, targetOffsetTop - startingY, scrollDuration));
                if (elapsed < scrollDuration) {
                    requestAnimationFrame(scroll);
                }
            }

            function easeInOutQuad(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }

            scroll();
        }
    });
});