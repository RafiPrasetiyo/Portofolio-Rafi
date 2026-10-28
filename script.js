const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

// Buka/tutup menu navigasi pada layar kecil.
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Tutup menu navigasi" : "Buka menu navigasi");
});

// Setelah memilih menu, tutup kembali navigasi mobile.
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Buka menu navigasi");
  });
});

// Tahun footer mengikuti tahun saat website dibuka.
document.getElementById("year").textContent = new Date().getFullYear();

// Partikel bergantian: kelopak sakura dan serpihan salju.
(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;
  const symbols = ["✿", "❀", "✧", "❄", "✦"];
  const colors = ["#e9a0bd", "#f4c7d9", "#ffffff", "#c6e8ff", "#a8d7f5"];
  let lastSpawn = 0;
  function spawnParticle() {
    const particle = document.createElement("span");
    particle.className = "floating-particle";
    const snow = Math.random() > 0.48;
    particle.textContent = snow ? "❄" : symbols[Math.floor(Math.random() * 2)];
    particle.style.setProperty("--x", `${Math.random() * 100}vw`);
    particle.style.setProperty("--size", `${snow ? 8 + Math.random() * 10 : 9 + Math.random() * 9}px`);
    particle.style.setProperty("--particle-color", snow ? colors[2 + Math.floor(Math.random() * 3)] : colors[Math.floor(Math.random() * 2)]);
    particle.style.setProperty("--opacity", `${0.38 + Math.random() * 0.48}`);
    particle.style.setProperty("--duration", `${8 + Math.random() * 10}s`);
    particle.style.setProperty("--delay", `${Math.random() * 1.5}s`);
    particle.style.setProperty("--drift", `${-90 + Math.random() * 180}px`);
    particle.style.setProperty("--spin", `${-360 + Math.random() * 720}deg`);
    document.body.appendChild(particle);
    window.setTimeout(() => particle.remove(), 21000);
  }
  function particleLoop(now) {
    if (now - lastSpawn > 520) {
      spawnParticle();
      lastSpawn = now;
    }
    window.requestAnimationFrame(particleLoop);
  }
  window.requestAnimationFrame(particleLoop);
})();

// Munculkan elemen secara lembut ketika masuk ke layar.
(() => {
  const targets = document.querySelectorAll(".section-heading, .about-card, .skill-card, .achievement-card, .contact-panel");
  targets.forEach((element) => element.classList.add("js-reveal"));
  if (!("IntersectionObserver" in window)) {
    targets.forEach((element) => element.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  targets.forEach((element) => observer.observe(element));
})();
