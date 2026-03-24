// ── Year in footer ──────────────────────────────────────────────
document.getElementById("year").textContent = new Date().getFullYear();

// ── Mobile nav toggle ────────────────────────────────────────────
const hamburger  = document.getElementById("hamburger");
const mobileNav  = document.getElementById("mobile-nav");

hamburger.addEventListener("click", () => {
  mobileNav.classList.toggle("open");
});

// Close mobile nav when a link is clicked
mobileNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => mobileNav.classList.remove("open"));
});

// ── Active nav link on scroll ─────────────────────────────────────
const sections = document.querySelectorAll("section[id]");
const navLinks  = document.querySelectorAll(".nav-links a, .mobile-nav a");

function setActiveLink() {
  const scrollY = window.scrollY + 80;
  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute("id");
    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(link => link.classList.remove("active"));
      navLinks.forEach(link => {
        if (link.getAttribute("href") === `#${id}`) link.classList.add("active");
      });
    }
  });
}

window.addEventListener("scroll", setActiveLink, { passive: true });

// ── Navbar shadow on scroll ────────────────────────────────────────
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.style.boxShadow = window.scrollY > 10
    ? "0 2px 16px rgba(0,0,0,0.06)"
    : "none";
}, { passive: true });

// ── Contact form (static / mailto fallback) ──────────────────────
function handleSubmit(e) {
  e.preventDefault();
  const name    = document.getElementById("name").value.trim();
  const email   = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const status  = document.getElementById("form-status");

  // Fallback: open mailto link (works without a backend)
  const subject = encodeURIComponent(`Portfolio contact from ${name}`);
  const body    = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:your@email.com?subject=${subject}&body=${body}`;

  status.textContent = "Opening your mail client...";
  e.target.reset();
}

// ── Fade-in on scroll ─────────────────────────────────────────────
const observer = new IntersectionObserver(
  entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  }),
  { threshold: 0.1 }
);

document.querySelectorAll(".project-card, .skill-category, .resume-item, .about-grid").forEach(el => {
  el.classList.add("fade-in");
  observer.observe(el);
});

// Inject fade-in styles dynamically so they don't need to be in the CSS
const style = document.createElement("style");
style.textContent = `
  .fade-in { opacity: 0; transform: translateY(16px); transition: opacity 0.5s ease, transform 0.5s ease; }
  .fade-in.visible { opacity: 1; transform: none; }
  .nav-links a.active { color: var(--accent); }
`;
document.head.appendChild(style);
