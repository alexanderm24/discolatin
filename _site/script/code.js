document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded and script running!');
});



var cards = document.querySelectorAll('.card');
var cardbg = document.querySelectorAll('.card-bg');
var soundButton = document.querySelectorAll('.audio');
var sparkButton = document.querySelectorAll('.rep');

[...cards].forEach((card)=>{
  card.addEventListener( 'click', function() {
    card.classList.toggle('is-flipped');
  });
});

[...cardbg].forEach((cardbg)=>{
  cardbg.addEventListener( 'click', function() {
    cardbg.classList.toggle('is-flipped');
    console.log('audio clicked');
  });
});

 // Prevent card flip when clicking the sound button
 [...soundButton].forEach((soundButton)=>{
  soundButton.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent click event from propagating to the card
  });
});




  [...sparkButton].forEach((sparkButton)=>{
    sparkButton.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevent click event from propagating to the card
    });
  });

//const flipall = document.getElementById('flipall');
//var cards = document.querySelectorAll('.card');

//flipall.addEventListener('click', () => {
  //cards.forEach(card => {
    //card.classList.toggle('is-flipped');
  //});
//});

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

  element.dataset.originalHTML = element.innerHTML;
});

// Function to replace macrons
function replaceMacrons(text) {

  return text.replace(/[āēīōūĀĒĪŌŪ]/g, match => macronMap[match]);
}

// Handle radio button change
function handleRadioChange(event) {
  const action = event.target.value;
  const diToggle = document.getElementById("toggleAbbreviate"); // Get abbreviation toggle state
  const isAbbreviated = diToggle && diToggle.checked; // Check if abbreviations are active

  document.querySelectorAll('.la-text').forEach(element => {
    let currentHTML = isAbbreviated ? element.innerHTML : element.dataset.originalHTML; // Keep abbreviation if active

    if (action === 'essential') {
      element.innerHTML = currentHTML.replace(
        /(<span class="essm">.*?<\/span>)|[āēīōūĀĒĪŌŪ]/g,
        (match, group) => group || macronMap[match] || match
      );
    } else if (action === 'keep') {
      element.innerHTML = currentHTML; // Restore based on abbreviation state
    }
  });
}


// Add event listeners to all radio buttons
document.querySelectorAll('input[name="macronToggle"]').forEach(radio => {
  radio.addEventListener('change', handleRadioChange);
});



//document.addEventListener("DOMContentLoaded", function() {
  const diToggle = document.getElementById("toggleAbbreviate"); 
  const expDI = document.querySelectorAll(".expdi");

  if (diToggle && expDI.length > 0) { // Ensure elements exist
    const originalTexts = Array.from(expDI).map(el => el.innerHTML); // Store original text
    
    diToggle.addEventListener("change", function() {
      expDI.forEach((el, index) => {
        if (this.checked) {
          el.innerHTML = "-"; // Replace content with "-"
        } else {
          el.innerHTML = originalTexts[index]; // Restore original content
        }
      });
    });
  }
//});
