// --------------------
// Card flip handlers
// --------------------
document.querySelectorAll('.card, .card-bg').forEach(card => {
  card.addEventListener('click', function(event) {
    if (event.target.closest('.audio') || event.target.closest('.rep')) {
      return; // don't flip if clicking buttons
    }
    card.classList.toggle('is-flipped');
  });
});

// Stop propagation on audio / sparkle buttons
document.querySelectorAll('.audio, .rep').forEach(button => {
  button.addEventListener('click', event => {
    event.stopPropagation();
  });
});


// --------------------
// Sorting toggle
// --------------------
const sortAlph = document.getElementById("sortalph");
const sortPos  = document.getElementById("sortpos");
const alph     = document.getElementById("alph");
const pos      = document.getElementById("pos");

if (sortAlph && sortPos && alph && pos) {
  sortAlph.addEventListener("change", function() {
    if (this.checked) {
      alph.style.display = 'inline';
      pos.style.display = 'none';
    }
  });

  sortPos.addEventListener("change", function() {
    if (this.checked) {
      alph.style.display = 'none';
      pos.style.display = 'inline';
    }
  });
}


// --------------------
// Color toggle
// --------------------
const colorToggle = document.getElementById("toggleSwitchColor");
if (colorToggle) {
  colorToggle.addEventListener("change", function() {
    document.querySelectorAll(".la-text").forEach(element => {
      element.style.background = this.checked ? null : 'white';
    });
  });
}


// --------------------
// Card type select
// --------------------
const select = document.getElementById("cardTypeSelect");
if (select) {
  select.addEventListener("change", updateCards);
  updateCards();
}

function updateCards() {
  const selectedType = select ? select.value : null;
  document.querySelectorAll(".scene--card, .scene--card-bg").forEach(card => {
    const full = card.querySelector(".card-full-entry");
    const head = card.querySelector(".card-headword");
    const eng  = card.querySelector(".card-english");
    if (full) full.style.display = selectedType === 'full-entry' ? "" : "none";
    if (head) head.style.display = selectedType === 'headword' ? "" : "none";
    if (eng)  eng.style.display = selectedType === 'english' ? "" : "none";
  });
}


// --------------------
// Macron + abbreviation system
// --------------------
const macronMap = {
  'ā': 'a', 'ē': 'e', 'ī': 'i', 'ō': 'o', 'ū': 'u',
  'Ā': 'A', 'Ē': 'E', 'Ī': 'I', 'Ō': 'O', 'Ū': 'U'
};

// Prepare original content storage for standalone expdi
const expDI = document.querySelectorAll(".expdi");
const originalExpDI = Array.from(expDI).map(el => el.innerHTML);

function updateContent() {
  const macronRadio = document.querySelector('input[name="macronToggle"]:checked');
  const macronAction = macronRadio ? macronRadio.value : 'essential';

  const diToggle = document.getElementById("toggleAbbreviate");
  const isAbbreviated = diToggle && diToggle.checked;

  // Handle la-text abbreviation + macron
  document.querySelectorAll('.la-text').forEach(element => {
    // Store original only if not already set
    if (!element.dataset.originalHTML) {
      element.dataset.originalHTML = element.innerHTML;
    }

    let currentHTML = element.dataset.originalHTML;

    // Apply abbreviation
    if (isAbbreviated) {
      currentHTML = currentHTML.replace(/<span class="expdi">.*?<\/span>/g, '-');
    }

    // Apply macron
    if (macronAction === 'essential') {
      element.innerHTML = currentHTML.replace(
        /(<span class="essm">.*?<\/span>)|[āēīōūĀĒĪŌŪ]/g,
        (match, group) => group || macronMap[match] || match
      );
    } else if (macronAction === 'keep') {
      element.innerHTML = currentHTML;
    }
  });

  // Handle standalone expdi
  expDI.forEach((el, index) => {
    el.innerHTML = isAbbreviated ? "-" : originalExpDI[index];
  });
}

// Attach listeners for macron + abbreviation
document.querySelectorAll('input[name="macronToggle"]').forEach(radio => {
  radio.addEventListener("change", updateContent);
});

const diToggle = document.getElementById("toggleAbbreviate");
if (diToggle) {
  diToggle.addEventListener("change", updateContent);
}

// Run once at start
updateContent();
