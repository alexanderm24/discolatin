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
const abbToggle = document.getElementById("toggleAbbreviate");
const full = document.querySelectorAll(".full");
const abb = document.querySelectorAll(".abb");
const emToggle = document.getElementById("essentialMacrons");
const reg = document.querySelectorAll(".reg");
const essMac = document.querySelectorAll(".essmac");

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

abbToggle.addEventListener("change", function() {
  if (this.checked) {
    abb.forEach(element => {
      element.style.display = 'block'});
    full.forEach(element => {
      element.style.display = 'none'});
    }
  else {
    abb.forEach(element => {
      element.style.display = 'none'});
    full.forEach(element => {
      element.style.display = 'block'});
    }
});

var audio = $(".audio")[0];
audio.play();

var audio = $(".audio")[0];
$("nav a").mouseenter(function() {
  audio.play();
});