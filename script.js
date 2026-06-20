// ==========================================================================
// Poem data -- add a new poem by adding another object to this array
// ==========================================================================
const poems = [
  {
    date: "20/06/26",
    text:
      "You came in quiet, like first light,\n" +
      "and made the whole world soft and bright.\n" +
      "A little hand around my own,\n" +
      "A little hand around my own,\n" +
      "A little hand around my own,\n" +
      "A little hand around my own,\n" +
      "A little hand around my own,\n" +
      "A little hand around my own,\n" +
      "A little hand around my own,\n" +
      "A little hand around my own,\n" +
      "A little hand around my own,\n" +
      "A little hand around my own,\n" +
      "A little hand around my own,\n" +
      "A little hand around my own,\n" +
      "A little hand around my own,\n" +
      "A little hand around my own,\n" +
      "A little hand around my own,\n" +
      "A little hand around my own,\n" +
      "A little hand around my own,\n" +
      "A little hand around my own,\n" +
      "A little hand around my own,\n" +
      "A little hand around my own,\n" +
      "A little hand around my own,\n" +
      "A little hand around my own,\n" +
      "A little hand around my own,\n" +
      "A little hand around my own,\n" +
      "A little hand around my own,\n" +
      "A little hand around my own,\n" +
      "A little hand around my own"
  }
];

// ==========================================================================
// Create poem cards
// ==========================================================================
function createPoemCard(poem, index) {
  const card = document.createElement("article");
  card.className = "poem-card scroll-hidden";
  card.setAttribute("data-index", index);

  const badge = document.createElement("span");
  badge.className = "date-badge";
  badge.textContent = poem.date;

  const bodyWrap = document.createElement("div");
  bodyWrap.className = "poem-body-wrap";

  const text = document.createElement("p");
  text.className = "poem-text";
  text.textContent = poem.text;

  bodyWrap.appendChild(text);

  const button = document.createElement("button");
  button.className = "expand-btn";
  button.type = "button";
  button.setAttribute("aria-expanded", "false");
  button.textContent = "Expand ↓";

  button.addEventListener("click", () => toggleCard(card, button));
  button.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleCard(card, button);
    }
  });

  card.appendChild(badge);
  card.appendChild(bodyWrap);
  card.appendChild(button);

  return card;
}

function renderPoems() {
  const container = document.getElementById("poemsContainer");
  poems.forEach((poem, index) => {
    const card = createPoemCard(poem, index);
    container.appendChild(card);
  });
}

// ==========================================================================
// Expand card
// ==========================================================================
function toggleCard(card, button) {
  const isExpanded = card.classList.contains("expanded");

  if (isExpanded) {
    collapseCard(card, button);
  } else {
    card.classList.add("expanded");
    card.classList.remove("card-floating");
    button.textContent = "Retract ↑";
    button.setAttribute("aria-expanded", "true");
  }
}

// ==========================================================================
// Collapse card
// ==========================================================================
function collapseCard(card, button) {
  card.classList.remove("expanded");
  button.textContent = "Expand ↓";
  button.setAttribute("aria-expanded", "false");

  // resume gentle floating once settled back down
  window.setTimeout(() => {
    if (!card.classList.contains("expanded")) {
      card.classList.add("card-floating");
    }
  }, 650);
}

// ==========================================================================
// Initial load animation
// ==========================================================================
function revealCardsInSequence() {
  const cards = document.querySelectorAll(".poem-card");
  cards.forEach((card, i) => {
    window.setTimeout(() => {
      card.classList.remove("scroll-hidden");
      card.classList.add("card-revealed");

      // start the subtle floating loop after the reveal animation finishes
      window.setTimeout(() => {
        card.classList.add("card-floating");
      }, 650);
    }, 250 + i * 160);
  });
}

// Fade-in animation for cards as they scroll into view (for longer lists)
function setupScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("scroll-hidden");
          entry.target.classList.add("scroll-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".poem-card").forEach((card) => {
    // Cards already revealed by the initial sequence are skipped naturally
    // since scroll-hidden gets removed before the observer would fire late.
    observer.observe(card);
  });
}

// ==========================================================================
// Init
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  renderPoems();
  revealCardsInSequence();
  setupScrollReveal();
});