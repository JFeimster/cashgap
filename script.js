const form = document.getElementById("riskForm");
const scoreEl = document.getElementById("score");
const statusEl = document.getElementById("status");
const resultText = document.getElementById("resultText");
const reorderNeedEl = document.getElementById("reorderNeed");
const coverageEl = document.getElementById("coverage");
const gapEl = document.getElementById("gap");
const meterFill = document.getElementById("meterFill");
const copyBtn = document.getElementById("copyBtn");

let latestAssessment = "";

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

function classifyRisk(coverageRatio, holdDays, leadTime) {
  let ldrScore = Math.round(Math.min(100, Math.max(0, (1.25 - coverageRatio) * 80)));

  if (holdDays >= 21) ldrScore += 6;
  if (leadTime >= 10) ldrScore += 6;
  ldrScore = Math.min(100, Math.max(0, ldrScore));

  if (coverageRatio < 1) {
    return {
      label: "Critical Suspension Risk",
      className: "critical",
      score: Math.max(ldrScore, 76),
      text: "Your cash does not cover the supplier reorder bill. The viral curse is active: stockout and late dispatch risk are both flashing red."
    };
  }

  if (coverageRatio < 1.35) {
    return {
      label: "Elevated Risk",
      className: "elevated",
      score: Math.max(ldrScore, 48),
      text: "You can cover the current reorder, but the buffer is thin. One delayed payout, supplier hiccup, or second spike could turn momentum into penalties."
    };
  }

  return {
    label: "Healthy Buffer",
    className: "healthy",
    score: Math.min(ldrScore, 34),
    text: "Your current cash appears to cover the reorder need with room to breathe. Keep watching payout timing and supplier lead times."
  };
}

form.addEventListener("submit", event => {
  event.preventDefault();

  const cash = Number(document.getElementById("cash").value);
  const units = Number(document.getElementById("units").value);
  const cost = Number(document.getElementById("cost").value);
  const holdDays = Number(document.getElementById("holdDays").value || 0);
  const leadTime = Number(document.getElementById("leadTime").value || 0);

  if (!cash || !units || !cost) return;

  const reorderNeed = units * cost;
  const coverageRatio = cash / reorderNeed;
  const cashGap = Math.max(0, reorderNeed - cash);
  const risk = classifyRisk(coverageRatio, holdDays, leadTime);

  scoreEl.textContent = risk.score;
  statusEl.textContent = risk.label;
  statusEl.className = `status ${risk.className}`;
  resultText.textContent = risk.text;
  reorderNeedEl.textContent = money.format(reorderNeed);
  coverageEl.textContent = `${coverageRatio.toFixed(2)}x`;
  gapEl.textContent = money.format(cashGap);
  meterFill.style.width = `${risk.score}%`;
  meterFill.parentElement.style.color =
    risk.className === "critical" ? "var(--danger)" :
    risk.className === "elevated" ? "var(--warn)" :
    "var(--safe)";

  latestAssessment =
`TikTok Shop Viral Curse Predictor

LDR Risk Assessment Score: ${risk.score}/100
Status: ${risk.label}

Cash Available: ${money.format(cash)}
Reorder Need: ${money.format(reorderNeed)}
Cash Coverage: ${coverageRatio.toFixed(2)}x
Cash Gap: ${money.format(cashGap)}

Interpretation:
${risk.text}`;
});

copyBtn.addEventListener("click", async () => {
  if (!latestAssessment) {
    alert("Generate your score first.");
    return;
  }

  await navigator.clipboard.writeText(latestAssessment);
  copyBtn.textContent = "Copied";
  setTimeout(() => copyBtn.textContent = "Copy Shareable Assessment", 1400);
});
