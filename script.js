const header = document.querySelector("[data-header]");
const yearTarget = document.querySelector("[data-year]");
const copyButtons = document.querySelectorAll("[data-copy]");
const revealItems = document.querySelectorAll(".reveal");

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

const updateHeader = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 24);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

copyButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const text = button.getAttribute("data-copy");
    const originalText = button.textContent;

    try {
      await navigator.clipboard.writeText(text);
      button.textContent = "Copied";
    } catch {
      const input = document.createElement("input");
      input.value = text;
      document.body.append(input);
      input.select();
      document.execCommand("copy");
      input.remove();
      button.textContent = "Copied";
    }

    window.setTimeout(() => {
      button.textContent = originalText;
    }, 1400);
  });
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
