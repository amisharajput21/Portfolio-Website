
// ==========================================
// AMISHA RAJPUT — PORTFOLIO JAVASCRIPT
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("main section[id]");
    const backToTop = document.getElementById("back-to-top");
    const currentYear = document.getElementById("current-year");

    // ==========================================
    // 1. AUTOMATIC FOOTER YEAR
    // ==========================================

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // ==========================================
    // 2. MOBILE NAVIGATION
    // ==========================================

    function closeMenu() {
        if (!menuToggle || !navMenu) return;

        menuToggle.classList.remove("is-open");
        navMenu.classList.remove("is-open");
        document.body.classList.remove("menu-open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    }

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navMenu.classList.toggle("is-open");

            menuToggle.classList.toggle("is-open", isOpen);
            document.body.classList.toggle("menu-open", isOpen);

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );
        });

        navLinks.forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        // Close the menu when clicking outside it.
        document.addEventListener("click", (event) => {
            const clickedInsideMenu = navMenu.contains(event.target);
            const clickedToggle = menuToggle.contains(event.target);

            if (!clickedInsideMenu && !clickedToggle) {
                closeMenu();
            }
        });

        // Close the menu using Escape.
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMenu();
            }
        });

        // Close the mobile menu when switching to desktop width.
        window.addEventListener("resize", () => {
            if (window.innerWidth > 780) {
                closeMenu();
            }
        });
    }

    // ==========================================
    // 3. ACTIVE NAVIGATION LINK
    // ==========================================

    function updateActiveLink() {
        let currentSection = "home";
        const scrollPosition = window.scrollY + 150;

        sections.forEach((section) => {
            if (scrollPosition >= section.offsetTop) {
                currentSection = section.id;
            }
        });

        navLinks.forEach((link) => {
            const targetId = link.getAttribute("href");

            link.classList.toggle(
                "active",
                targetId === `#${currentSection}`
            );
        });
    }

    // ==========================================
    // 4. SCROLL REVEAL ANIMATIONS
    // ==========================================

    const revealElements = document.querySelectorAll(".reveal");

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if ("IntersectionObserver" in window && !prefersReducedMotion) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -35px 0px"
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    } else {
        // Show content if animations are unsupported or disabled.
        revealElements.forEach((element) => {
            element.classList.add("is-visible");
        });
    }

    // ==========================================
    // 5. BACK TO TOP BUTTON
    // ==========================================

    function updateBackToTop() {
        if (!backToTop) return;

        backToTop.classList.toggle("visible", window.scrollY > 400);
    }

    if (backToTop) {
        backToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: prefersReducedMotion ? "auto" : "smooth"
            });
        });
    }

    // ==========================================
    // 6. SCROLL EVENTS
    // ==========================================

    let ticking = false;

    window.addEventListener(
        "scroll",
        () => {
            if (ticking) return;

            ticking = true;

            window.requestAnimationFrame(() => {
                updateActiveLink();
                updateBackToTop();
                ticking = false;
            });
        },
        { passive: true }
    );

    // Set the correct state on initial page load.
    updateActiveLink();
    updateBackToTop();
});
