// Variable declarations
let keyword = ""; // Represents the keyword being searched
var SpeechRec = new p5.SpeechRec(); // Creates a new instance of the p5.SpeechRec class
let pword = ""; // Represents the previous keyword spoken
SpeechRec.continuous = true; // Sets continuous speech recognition
SpeechRec.interimResults = true; // Enables interim results (partial speech recognition)
let myCanvas; // Represents the canvas for drawing

const words = []; // Array to store Word objects

function setup() {
  myCanvas = createCanvas(1920, 1080); // Creates a canvas with dimensions 1920x1080
  SpeechRec.start(); // Starts the speech recognition
  SpeechRec.onResult = setResult; // Sets the callback function for speech recognition results
  SpeechRec.onStart = onStart; // Sets the callback function for speech recognition start
  background(255); // Sets the background color to white
}

function draw() {
  background(255); // Sets the background color to white
   // Iterates through the words array in reverse order
  for (let i = words.length - 1; i >= 0; i--) {
    const word = words[i];
    word.display(); // Calls the display method of each Word object
    if (word.opacity <= 0) {
      words.splice(i, 1); // Removes the Word object from the array if its opacity is less than or equal to 0
    }
  }
}

function onStart() {
  // Callback function called when speech recognition starts
  pword = SpeechRec.resultString; // Stores the result string in the pword variable
}

function setResult() {
  // Callback function called when speech recognition result is available
  if (SpeechRec.resultConfidence < 0.005 || pword === SpeechRec.resultString) {
    return 0; // Exits the function if the confidence is low or the result is the same as the previous word
  }
  pword = SpeechRec.resultString; // Updates the previous word with the new result string
  let keyword = pword; // Sets the keyword variable to the new result string
  switch (SpeechRec.resultString) {
    case pword:
      displayText(keyword); // Calls the displayText function with the keyword
      break;
  }
}

function displayText(keyword, page) {
  // Function to display text on the canvas
  const textColor = color(random(255), random(255), random(255)); // Generates a random RGB color
  const fontSize = random(30, 80); // Generates a random font size between 30 and 80
  const fontFamily = getRandomFontFamily(); // Gets a random font family
  const textStyle = getRandomTextStyle(); // Gets a random text style
  const rotation = random(-PI / 4, PI / 4); // Generates a random rotation angle between -PI/4 and PI/4

  words.push(new Word(pword, random(width - 200), random(height - 100), textColor, fontSize, fontFamily, textStyle, rotation));
  // Creates a new Word object with the specified parameters and adds it to the words array
}

function getRandomFontFamily() {
  // Function to get a random font family from a predefined list
  const fontFamilies = ["Arial", "Helvetica", "Times New Roman", "Courier New", "Verdana", "Georgia"];
  const randomIndex = Math.floor(random(fontFamilies.length)); // Picks a random index from the fontFamilies array
  return fontFamilies[randomIndex]; // Returns the randomly selected font family
}

function getRandomTextStyle() {
  // Function to get a random text style (normal, bold, or italic)
  const styles = ["normal", "bold", "italic"];
  const randomIndex = Math.floor(random(styles.length)); // Picks a random index from the styles array
  return styles[randomIndex]; // Returns the randomly selected text style
}

class Word {
  // Word class to represent a word on the canvas
  constructor(text, x, y, textColor, fontSize, fontFamily, textStyle, rotation) {
    this.text = text; // The word text
    this.x = x; // X coordinate
    this.y = y; // Y coordinate
    this.textColor = textColor; // Color of the text
    this.fontSize = fontSize; // Font size
    this.fontFamily = fontFamily; // Font family
    this.textStyle = textStyle; // Text style
    this.rotation = rotation; // Rotation angle
    this.opacity = 255; // Opacity (initially fully opaque)
    this.fadeDuration = 3; // Duration in seconds for fading out
    this.fadeStartTime = millis(); // Starting time for fading out
  }

  display() {
    // Method to display the word on the canvas
    push(); // Saves the current drawing state
    fill(this.textColor, this.opacity); // Sets the fill color with the text color and opacity
    textSize(this.fontSize); // Sets the text size
    textFont(this.fontFamily); // Sets the font family
    textStyle(this.textStyle); // Sets the text style
    translate(this.x, this.y); // Translates the origin to the word's coordinates
    rotate(this.rotation); // Rotates the canvas by the specified angle
    text(this.text, 0, 0); // Displays the text at the translated and rotated origin
    pop(); // Restores the previous drawing state
    this.updateOpacity(); // Updates the opacity for fading out
  }

  updateOpacity() {
    const elapsedTime = (millis() - this.fadeStartTime) / 1000; // convert milliseconds to seconds
    this.opacity = map(elapsedTime, 0, this.fadeDuration, 255, 0);
    }
    
}
