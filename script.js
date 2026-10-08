








document.addEventListener("DOMContentLoaded", function () {

    const loader = document.querySelector(".page-loader");
    const header = document.querySelector(".site-header");
    const menuToggle = document.querySelector(".menu-toggle");
    const mainNav = document.querySelector(".main-nav");
    const navLinks = document.querySelectorAll(".main-nav a");

    /* LOADER + comparsa header */
    window.addEventListener("load", function () {
        setTimeout(function () {
            if (loader) loader.classList.add("hidden");
            if (header) header.classList.add("ready");
        }, 400);
    });

    /* HEADER: stile allo scroll */
    function updateHeader() {
        if (!header) return;
        header.classList.toggle("scrolled", window.scrollY > 45);
    }
    updateHeader();
    window.addEventListener("scroll", updateHeader, {passive: true});

    /* MENU UNICO RESPONSIVE (overlay solo su mobile) */
    function setMenu(open) {
        if (!menuToggle || !mainNav) return;
        menuToggle.classList.toggle("open", open);
        mainNav.classList.toggle("open", open);
        menuToggle.setAttribute("aria-expanded", String(open));
        document.body.classList.toggle("menu-open", open);
    }

    if (menuToggle) {
        menuToggle.addEventListener("click", function () {
            setMenu(!mainNav.classList.contains("open"));
        });
    }
    navLinks.forEach(function (link) {
        link.addEventListener("click", function () { setMenu(false); });
    });
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") setMenu(false);
    });
    window.addEventListener("resize", function () {
        if (window.innerWidth > 900) setMenu(false);
    });

    /* REVEAL ALLO SCROLL */
    const revealElements = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    obs.unobserve(entry.target);
                }
            });
        }, {threshold: 0.12});
        revealElements.forEach(function (el) { observer.observe(el); });
    } else {
        revealElements.forEach(function (el) { el.classList.add("visible"); });
    }

    /* TAB DEL MENU DEL RISTORANTE */
    const menuTabs = document.querySelectorAll(".menu-tab");
    const menuCategories = document.querySelectorAll(".menu-cat");
    menuTabs.forEach(function (tab) {
        tab.addEventListener("click", function () {
            const target = document.getElementById(tab.getAttribute("data-target"));
            if (!target) return;
            menuTabs.forEach(function (t) {
                t.classList.remove("active");
                t.setAttribute("aria-selected", "false");
            });
            menuCategories.forEach(function (c) { c.classList.remove("active"); });
            tab.classList.add("active");
            tab.setAttribute("aria-selected", "true");
            target.classList.add("active");
        });
    });

    /* SMOOTH SCROLL */
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (event) {
            const href = link.getAttribute("href");
            if (!href || href === "#") return;
            const target = document.querySelector(href);
            if (!target) return;
            event.preventDefault();
            target.scrollIntoView({behavior: "smooth", block: "start"});
        });
    });
});


