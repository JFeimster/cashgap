const cursorGlow = document.getElementById("cursorGlow");
const year = document.getElementById("year");
const riskTicker = document.getElementById("riskTicker");
const toolCount = document.getElementById("toolCount");
const ideaForm = document.getElementById("ideaForm");
const toolGrid = document.getElementById("toolGrid");

year.textContent = new Date().getFullYear();

document.addEventListener("pointermove", event => {
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});

let tickerValue = 87;
setInterval(() => {
  const drift = Math.floor(Math.random() * 9) - 4;
  tickerValue = Math.max(41, Math.min(99, tickerValue + drift));
  riskTicker.textContent = String(tickerValue).padStart(2, "0");
}, 1100);

toolCount.textContent = String(document.querySelectorAll(".tool-card").length).padStart(2, "0");

ideaForm.addEventListener("submit", async event => {
  event.preventDefault();

  const data = new FormData(ideaForm);
  const toolName = data.get("toolName");
  const persona = data.get("persona");
  const problem = data.get("problem");
  const logic = data.get("logic");

  const slug = String(toolName)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const brief = `Tool Name:
${toolName}

Target Persona:
${persona}

The Bleeding Neck Problem:
${problem}

Core Logic / Function:
${logic}

Suggested Folder:
products/${slug}/

Output:
Generate index.html, styles.css, script.js, README.md`;

  await navigator.clipboard.writeText(brief);

  const button = ideaForm.querySelector("button");
  const original = button.textContent;
  button.textContent = "Copied Brief";
  setTimeout(() => {
    button.textContent = original;
  }, 1400);
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.animate(
        [
          { transform: "translateY(26px)", opacity: 0 },
          { transform: "translateY(0)", opacity: 1 }
        ],
        {
          duration: 520,
          easing: "cubic-bezier(.2,.8,.2,1)",
          fill: "both"
        }
      );
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.18 });

document.querySelectorAll(".tool-card, .system-strip, .submit-panel").forEach(el => observer.observe(el));
