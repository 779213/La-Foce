document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       PAGE LOADER
    ========================================= */

    const loader = document.querySelector(".page-loader");

    function hideLoader() {
        if (loader) {
            loader.classList.add("hidden");
        }
    }

    window.addEventListener("load", function () {
        setTimeout(hideLoader, 400);
    });


    /* =========================================
       HEADER - CAMBIO STILE ALLO SCROLL
    ========================================= */

    const header = document.querySelector(".site-header");

    function updateHeader() {
        if (!header) return;

        if (window.scrollY > 45) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    updateHeader();

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });


    /* =========================================
       MENU MOBILE
    ========================================= */

    const menuToggle = document.querySelector(".menu-toggle");
    const mobileNav = document.querySelector(".mobile-nav");
    const mobileLinks = document.querySelectorAll(".mobile-nav a");


    function openMobileMenu() {

        if (!menuToggle || !mobileNav) return;

        menuToggle.classList.add("open");
        mobileNav.classList.add("open");

        menuToggle.setAttribute("aria-expanded", "true");
        mobileNav.setAttribute("aria-hidden", "false");

        document.body.classList.add("menu-open");
    }


    function closeMobileMenu() {

        if (!menuToggle || !mobileNav) return;

        menuToggle.classList.remove("open");
        mobileNav.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");
        mobileNav.setAttribute("aria-hidden", "true");

        document.body.classList.remove("menu-open");
    }


    if (menuToggle) {

        menuToggle.addEventListener("click", function () {

            if (mobileNav.classList.contains("open")) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }

        });

    }


    /* Chiude il menu cliccando sui link */

    mobileLinks.forEach(function (link) {

        link.addEventListener("click", function () {
            closeMobileMenu();
        });

    });


    /* Chiude il menu con ESC */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closeMobileMenu();
        }

    });


    /* =========================================
       ANIMAZIONI REVEAL ALLO SCROLL
    ========================================= */

    const revealElements = document.querySelectorAll(".reveal");


    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            function (entries, observerInstance) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observerInstance.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


        revealElements.forEach(function (element) {
            observer.observe(element);
        });


    } else {

        /* Fallback per browser vecchi */

        revealElements.forEach(function (element) {
            element.classList.add("visible");
        });

    }


    /* =========================================
       MENU DEL RISTORANTE
    ========================================= */

    const menuTabs = document.querySelectorAll(".menu-tab");
    const menuCategories = document.querySelectorAll(".menu-cat");


    menuTabs.forEach(function (tab) {

        tab.addEventListener("click", function () {

            const targetId = tab.getAttribute("data-target");

            const targetCategory =
                document.getElementById(targetId);


            if (!targetCategory) {
                console.warn(
                    'Categoria menu non trovata: "' +
                    targetId +
                    '"'
                );

                return;
            }


            /* Rimuove active dai pulsanti */

            menuTabs.forEach(function (item) {
                item.classList.remove("active");
                item.setAttribute("aria-selected", "false");
            });


            /* Nasconde tutte le categorie */

            menuCategories.forEach(function (category) {
                category.classList.remove("active");
            });


            /* Attiva il pulsante */

            tab.classList.add("active");
            tab.setAttribute("aria-selected", "true");


            /* Mostra la categoria */

            targetCategory.classList.add("active");

        });

    });


    /* =========================================
       SMOOTH SCROLL
    ========================================= */

    const anchorLinks =
        document.querySelectorAll('a[href^="#"]');


    anchorLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const href =
                link.getAttribute("href");


            if (!href || href === "#") {
                return;
            }


            const target =
                document.querySelector(href);


            if (!target) {
                return;
            }


            event.preventDefault();


            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =========================================
       CHIUSURA MENU MOBILE SE SI TORNA A DESKTOP
    ========================================= */

    window.addEventListener("resize", function () {

        if (window.innerWidth > 900) {
            closeMobileMenu();
        }

    });


    /* =========================================
       IMMAGINI - GESTIONE ERRORE
    ========================================= */

    const images = document.querySelectorAll("img");


    images.forEach(function (image) {

        image.addEventListener("error", function () {

            console.warn(
                "Immagine non trovata:",
                image.getAttribute("src")
            );

        });

    });


    console.log("La Foce Premium - JavaScript caricato correttamente.");

});