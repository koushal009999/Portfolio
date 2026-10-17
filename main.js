
/* ==========================================
   KOUSHAL S — PERSONAL DEVELOPER PORTFOLIO
   ========================================== */

// Typing Animation
const typedElement = document.querySelector(".text");

if (typedElement && typeof Typed !== "undefined") {
    const typed = new Typed(".text", {
        strings: [
            "CSE Student at Sambhram Institute of Technology 🎓",
            "Aspiring Software Engineer 💻",
            "Learning C++ & DSA ⚡",
            "Exploring AI & Machine Learning 🤖",
            "Building Ideas into Projects 🚀"
        ],
        typeSpeed: 60,
        backSpeed: 30,
        backDelay: 1200,
        loop: true
    });
}


// Notification Function
function showNotification(message, type = "success") {
    const notification = document.createElement("div");

    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        max-width: calc(100vw - 40px);
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        transform: translateX(120%);
        transition: transform 0.3s ease;
    `;

    notification.style.background =
        type === "success"
            ? "linear-gradient(45deg, #4ecdc4, #6c63ff)"
            : "linear-gradient(45deg, #ff6584, #ffb800)";

    notification.textContent = message;
    document.body.appendChild(notification);

    requestAnimationFrame(() => {
        notification.style.transform = "translateX(0)";
    });

    setTimeout(() => {
        notification.style.transform = "translateX(120%)";

        setTimeout(() => notification.remove(), 300);
    }, 5000);
}


// Input Focus Effects
const inputs = document.querySelectorAll(".form-control");

inputs.forEach(input => {
    input.addEventListener("focus", function () {
        this.style.borderColor = "#6c63ff";
        this.style.boxShadow =
            "0 0 0 2px rgba(108, 99, 255, 0.2)";
    });

    input.addEventListener("blur", function () {
        this.style.borderColor = "";
        this.style.boxShadow = "";
    });
});


// Social Links Hover Effect
const socialLinks = document.querySelectorAll(".social-link");

socialLinks.forEach(link => {
    link.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-3px)";
    });

    link.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0)";
    });
});


// Contact Cards Hover Effect
const contactCards = document.querySelectorAll(".contact-card");

contactCards.forEach(card => {
    card.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-5px)";
    });

    card.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0)";
    });
});


// Section Animation Function
function triggerSectionAnimations(section) {
    const animatedElements = section.querySelectorAll(`
        .project-card,
        .contact-card,
        .skill-category,
        .section-title,
        .contact-subtitle,
        .form-group,
        .social-links,
        .contact-info,
        .contact-container
    `);

    animatedElements.forEach(element => {
        element.classList.remove(
            "animate__animated",
            "animate__fadeIn",
            "animate__fadeInUp",
            "animate__fadeInDown",
            "animate__fadeInLeft",
            "animate__fadeInRight",
            "animate__zoomIn",
            "animate__slideInUp",
            "animate__slideInLeft"
        );

        // Restart the animation
        void element.offsetWidth;

        element.classList.add("animate__animated");

        if (element.classList.contains("project-card")) {
            element.classList.add("animate__fadeInUp");
        } else if (element.classList.contains("contact-card")) {
            element.classList.add("animate__zoomIn");
        } else if (element.classList.contains("section-title")) {
            element.classList.add("animate__fadeInDown");
        } else if (element.classList.contains("form-group")) {
            element.classList.add("animate__fadeInRight");
        } else {
            element.classList.add("animate__fadeIn");
        }
    });
}


// Smooth Scrolling
document.querySelectorAll(".navbar a").forEach(link => {
    link.addEventListener("click", function (event) {
        const targetId = this.getAttribute("href");

        // Only handle links pointing to sections on this page
        if (!targetId || !targetId.startsWith("#")) return;

        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            event.preventDefault();

            targetSection.scrollIntoView({
                behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches ? "auto" : "smooth",
                block: "start"
            });

            setTimeout(() => {
                triggerSectionAnimations(targetSection);
            }, 800);
        }
    });
});


// Animate Sections When They Enter the Viewport
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                triggerSectionAnimations(entry.target);
            }
        });
    },
    {
        threshold: 0.2,
        rootMargin: "-50px 0px -100px 0px"
    }
);

document.querySelectorAll("section").forEach(section => {
    observer.observe(section);
});


// Active Navigation Link
function updateActiveLink() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".navbar a");

    let currentSection = "";

    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 120) {
            currentSection = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (
            currentSection &&
            link.getAttribute("href") === `#${currentSection}`
        ) {
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", updateActiveLink);
updateActiveLink();


// Custom Cursor
const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");

const supportsFinePointer = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
).matches;

if (cursorDot && cursorOutline && supportsFinePointer) {
    window.addEventListener("mousemove", function (event) {
        const posX = event.clientX;
        const posY = event.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate(
            {
                left: `${posX}px`,
                top: `${posY}px`
            },
            {
                duration: 150,
                fill: "forwards"
            }
        );
    });

    // Cursor Hover Effects
    const interactables = document.querySelectorAll(
        "a, button, .project-card, .contact-card, .social-link"
    );

    interactables.forEach(element => {
        element.addEventListener("mouseenter", () => {
            cursorOutline.style.transform =
                "translate(-50%, -50%) scale(1.5)";

            cursorOutline.style.backgroundColor =
                "rgba(52, 203, 245, 0.1)";

            cursorOutline.style.borderColor =
                "rgba(52, 203, 245, 0.5)";
        });

        element.addEventListener("mouseleave", () => {
            cursorOutline.style.transform =
                "translate(-50%, -50%) scale(1)";

            cursorOutline.style.backgroundColor = "transparent";

            cursorOutline.style.borderColor =
                "rgba(52, 203, 245, 0.8)";
        });
    });
}
