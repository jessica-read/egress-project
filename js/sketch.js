// VARIABLES
var characterInfo;
var blankText = "";
let i = 400;
let j = 550;
let x = 25;
let y = 50;

let arraySlot = 0;
// URL VARIABLES
const key = "$2a$10$iamfoI8gPCB8HSB77l.YV.o/.0OF9qDVr2hg/ZrYSxxZllxEJd4gq";
let searchType = "characters";
var characterSearched;
characterSearched = "Harry Potter";
let url = "https://www.potterapi.com/v1/" + searchType + "?key=" + key + "&name=" + characterSearched;


function preload() {
  loadJSON(url, gotData);

}

function gotData(data) {
  console.log(data);
  characterInfo = data[arraySlot]; //specifiy which array slot
  console.log(characterInfo.name)
}

function setup() {
  var canvas = createCanvas(i, j);
  canvas.parent('sketch-holder');

  var button1 = select('#submit');
  button1.mousePressed(nameSearch);

  var button2 = select('#randomID');
  button2.mousePressed(randomName);

  input = select('#character')

}

function nameSearch(characterInfo) {
  url = "https://www.potterapi.com/v1/" + searchType + "?key=" + key + "&name=" + input.value();
  arraySlot = 0;
  loadJSON(url, gotData); // should all be working
}

function randomName(characterInfo) {
  let randomNum = Math.floor(Math.random() * 195); //num 0-194
  url = "https://www.potterapi.com/v1/" + searchType + "?key=" + key;
  arraySlot = randomNum;
  loadJSON(url, gotData); // should all be working
}


//Auto capitalises each word as names in lower case do not work
document.getElementById("character").addEventListener("input", forceLower);

function forceLower(evt) {
  var words = evt.target.value.toLowerCase().split(/\s+/g);
  var newWords = words.map(function(element) {
    return element !== "" ? element[0].toUpperCase() + element.substr(1, element.length) : "";
  });
  evt.target.value = newWords.join(" ");
}

//contents of canvas
function draw() {
  if (characterInfo) {

    // changes canvas bg colour depending on hogwarts house
    if (characterInfo.house == "Gryffindor") {
      background(178, 0, 0);
    } else if (characterInfo.house == "Slytherin") {
      background(0, 150, 12);
    } else if (characterInfo.house == "Ravenclaw") {
      background(17, 101, 224);
    } else if (characterInfo.house == "Hufflepuff") {
      background(247, 232, 0);
    } else {
      background(175);
    }

    // text
    let x = 25;
    let y = 50;
    let z = i - x;
    let w = j - y;

    textFont('Grenze');

    textSize(40);
    textAlign(CENTER);
    text(characterInfo.name, i / 2, 50);
    textAlign(LEFT);
    textSize(20);
    textFont('Bad Script');
    text('Role: ' + characterInfo.role, x, (2 * y) - 20, z);
    text('Hogwarts House: ' + characterInfo.house, x, 3 * y);
    text('Blood Status: ' + characterInfo.bloodStatus, x, 4 * y);
    text('Species: ' + characterInfo.species, x, 5 * y);
    text('Wand: ' + characterInfo.wand, x, 6 * y);

    // Bottom 4 bools
    text('Ministry: ' + characterInfo.ministryOfMagic, x, w);
    text('Death Eater: ' + characterInfo.deathEater, x, w - y);
    textAlign(RIGHT);
    text('Order: ' + characterInfo.orderOfThePhoenix, z, w);
    text('DA: ' + characterInfo.dumbledoresArmy, z, w - y);
  }
}