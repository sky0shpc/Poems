// ==========================================================================
// Poem data -- add a new poem by adding another object to this array
// ==========================================================================
const poems = [
  {
    date: "20/06/26",
    text:
      "I was not looking for you\n" +
      "when you met me\n" +
      "but somehow you found your way into my heart\n" +
      "and stayed there without ever leaving\n" +
      "\n" +
      "now it feels like a part of me\n" +
      "always wanted you to be by my side\n" +
      "as if my soul knew yours\n" +
      "long before we ever met\n" +
      "\n" +
      "living with you feels like my oxygen\n" +
      "my reason to smile\n" +
      "my favorite part of every day\n" +
      "\n" +
      "I got so used to your presence\n" +
      "that I cannot imagine my days without it\n" +
      "it feels like you have always been there\n" +
      "like we have shared a lifetime already\n" +
      "\n" +
      "and it's true\n" +
      "our talks were not always romantic\n" +
      "they were not always happy and cheerful\n" +
      "we had our good days\n" +
      "and our difficult ones too\n" +
      "\n" +
      "but through everything\n" +
      "we stayed together\n" +
      "through every up and every down\n" +
      "through every smile and every tear\n" +
      "\n" +
      "no matter what happened between us\n" +
      "we always found our way back to each other\n" +
      "and that is one of my favorite things about us\n" +
      "\n" +
      "even the ordinary days\n" +
      "where we barely talked\n" +
      "felt gentler because of you\n" +
      "because somewhere in those days\n" +
      "you still existed beside me\n" +
      "\n" +
      "and now that I have you Ranoumti\n" +
      "life no longer feels like a road\n" +
      "I have to walk all alone\n" +
      "\n" +
      "because I have my little girl with me\n" +
      "my favorite person\n" +
      "my comfort\n" +
      "my home\n" +
      "\n" +
      "I may not always express it perfectly\n" +
      "I may mess up sometimes\n" +
      "I may annoy you\n" +
      "and make mistakes\n" +
      "\n" +
      "but believe me when I say\n" +
      "my love for you has never changed\n" +
      "not for a second\n" +
      "\n" +
      "I love you to the moon and back babe\n" +
      "you became the person\n" +
      "I truly cannot imagine my life without\n" +
       "long ago...\n" +
      "\n" +
      "yet somehow until now\n" +
      "it still feels like I am falling for you\n" +
      "more and more every day\n" +
      "as if my heart keeps discovering\n" +
      "new reasons to love you\n" +
      "\n" +
      "I love your smile\n" +
      "I love your laugh\n" +
      "I love the way you joke with me\n" +
      "I love the way you make even ordinary moments special\n" +
      "\n" +
      "I love how your voice can calm me down\n" +
      "without even trying\n" +
      "and how seeing your name\n" +
      "still makes me smile like an idiot\n" +
      "\n" +
      "your beauty is something else entirely\n" +
      "not just the way you look\n" +
      "but the way you care\n" +
      "the way you love\n" +
      "the way you exist\n" +
      "\n" +
      "there is something about you\n" +
      "that no words can fully describe\n" +
      "something that makes you uniquely you\n" +
      "and completely unforgettable\n" +
      "\n" +
      "babe I cannot get enough of you\n" +
      "not your smile\n" +
      "not your laugh\n" +
      "not your voice\n" +
      "not your stories\n" +
      "not even your little habits\n" +
      "\n" +
      "if I had to choose again\n" +
      "I would still choose you\n" +
      "every single time\n" +
      "even after all our struggles\n" +
      "after all of our problems\n" +
      "\n" +
      "because meeting you\n" +
      "was one of the most beautiful things\n" +
      "that ever happened to me\n" +
      "\n" +
      "and every day that passes\n" +
      "I find myself loving you\n" +
      "a little more than the day before\n"
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
