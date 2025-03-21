document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded and script running!');
});



var cards = document.querySelectorAll('.card');

[...cards].forEach((card)=>{
  card.addEventListener( 'click', function() {
    card.classList.toggle('is-flipped');
  });
});

const flipall = document.getElementById('flipall');
var cards = document.querySelectorAll('.card');

flipall.addEventListener('click', () => {
  cards.forEach(card => {
    card.classList.toggle('is-flipped');
  });
});

const sortAlph = document.getElementById("sortalph");
const sortPos = document.getElementById("sortpos");
const alph = document.getElementById("alph");
const pos = document.getElementById("pos");

sortAlph.addEventListener("change", function() {
  if (this.checked) {
    alph.style.display = 'inline'
    pos.style.display = 'none' }
});

sortPos.addEventListener("change", function() {
  if (this.checked) {
    alph.style.display = 'none'
    pos.style.display = 'inline'
   }
});

//Constants
const colorToggle = document.getElementById("toggleSwitchColor");
const laText = document.querySelectorAll(".la-text");
const full = document.querySelectorAll(".full");
const abb = document.querySelectorAll(".abb");

// Listen for the toggle switch change event
colorToggle.addEventListener("change", function() {
  if (this.checked) {
    laText.forEach(element => {
      element.style.background = null;
  })
  } else {
    laText.forEach(element => {
      element.style.background = 'white';
  })}
});

// Map of macrons to regular vowels
const macronMap = {
  'ā': 'a', 'ē': 'e', 'ī': 'i', 'ō': 'o', 'ū': 'u',
  'Ā': 'A', 'Ē': 'E', 'Ī': 'I', 'Ō': 'O', 'Ū': 'U'
};

// Store original text for restoration
document.querySelectorAll('.la-text').forEach(element => {
  element.dataset.originalText = element.textContent;
  element.dataset.originalHTML = element.innerHTML;
});

// Function to replace macrons
function replaceMacrons(text) {
  return text.replace(/[āēīōūĀĒĪŌŪ]/g, match => macronMap[match]);
}

// Handle radio button change
function handleRadioChange(event) {
  const action = event.target.value;

console.log('Selected Action:', action);


  document.querySelectorAll('.la-text').forEach(element => {
    const originalText = element.dataset.originalText;
    const originalHTML = element.dataset.originalHTML
    console.log('Original Text:', originalText);

    if (action === 'remove') {
      element.textContent = replaceMacrons(originalText);
    } else if (action === 'keep') {
      element.textContent = originalText;
    } else if (action === 'essential') {
      // Preserve essential macrons using HTML and replace others
      element.innerHTML = originalHTML.replace(
      /(<span class="essm">.*?<\/span>)|[āēīōūĀĒĪŌŪ]/g,
        (match, group) => group || macronMap[match] || match
      );
    }
  });
}

// Add event listeners to all radio buttons
document.querySelectorAll('input[name="macronToggle"]').forEach(radio => {
  radio.addEventListener('change', handleRadioChange);
});

