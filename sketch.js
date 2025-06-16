let bgColor, milk, pink, blue, black, dkYel, ltYel;

let mainFont, uiFont, templateFont;

let letterSounds = [];

let currentScreen = "main";

let selectedLetter;

let lastSuccess;

let btnLetters = [];
let btnBack, btnPlay, btnDraw, btnAgain, btnNext, btnCheck;
let objectImages = [];
let objectWords = [];

let templateCanvas, drawCanvas;



function preload() {
  mainFont = loadFont('data/TheLedDisplaySt.ttf');
  uiFont = loadFont('data/GameOver.ttf');
  templateFont = loadFont('data/Arial.ttf');

  for (let i = 0; i < 26; i++) {
    let c = String.fromCharCode('A'.charCodeAt(0) + i);
    
    btnLetters[i] = loadImage(`data/btn_${c}.png`);
    
    let objectImageFilename = c.toLowerCase() + ".png";
    objectImages[i] = loadImage(`data/${objectImageFilename}`);
    
    letterSounds[i] = loadSound(`data/${c}.mp3`); 
  }

  btnBack  = loadImage("data/btnBack.png");
  btnPlay  = loadImage("data/btnPlay.png");
  btnDraw  = loadImage("data/btnDraw.png");
  btnAgain = loadImage("data/btnAgain.png");
  btnNext  = loadImage("data/btnNext.png");
  btnCheck = loadImage("data/btnOK.png");
}


function setup() {
  createCanvas(960, 540);
  
  bgColor = color('#2E2E2E');
  milk    = color('#FFFBDB');
  pink    = color('#EE3976');
  blue    = color('#5BC4BD');
  black   = color(0);
  dkYel   = color('#FAD00A');
  ltYel   = color('#FEE56F');

  textAlign(CENTER, CENTER);
  imageMode(CENTER);

  objectWords[0] = "APPLE";
  objectWords[1] = "BALL";
  objectWords[2] = "CAR";
  objectWords[3] = "DICE";
  objectWords[4] = "EGG";
  objectWords[5] = "FISH";
  objectWords[6] = "GIFT";
  objectWords[7] = "HAT";
  objectWords[8] = "ICE CREAM";
  objectWords[9] = "JUICE";
  objectWords[10] = "KITE";
  objectWords[11] = "LAMP";
  objectWords[12] = "MOON";
  objectWords[13] = "NECKLACE";
  objectWords[14] = "OWL";
  objectWords[15] = "PENCIL";
  objectWords[16] = "QUEEN";
  objectWords[17] = "ROBOT";
  objectWords[18] = "SUN";
  objectWords[19] = "TREE";
  objectWords[20] = "UMBRELLA";
  objectWords[21] = "VIOLIN";
  objectWords[22] = "WATCH";
  objectWords[23] = "X-RAY";
  objectWords[24] = "YARN";
  objectWords[25] = "ZEBRA";
  
  templateCanvas = createGraphics(350, 350);
  drawCanvas = createGraphics(350, 350);
  clearUserDrawing();
}

function draw() {
  background(bgColor);
  
  noStroke();
  fill(pink);
  ellipse(width, 0, 215, 215);
  fill(blue);
  ellipse(0, height, 210, 210);

  if (currentScreen === "main") {
    drawMainScreen();
  } else if (currentScreen === "letters") {
    drawLetterScreen();
  } else if (currentScreen === "learning") {
    drawLearningScreen();
  } else if (currentScreen === "drawing") {
    drawDrawingScreen();
  } else if (currentScreen === "feedback") {
    drawFeedbackScreen();
  }
}
function drawMainScreen() {
  stroke(black); strokeWeight(5); fill(blue);
  rect(306, 41, 325, 300, 30);
  noStroke(); fill(milk);
  rect(333, 73, 275, 223, 30);
  fill(black); textFont(mainFont); textSize(48);
  text("LEARN\nYOUR\nABC", 333 + 275 / 2, 73 + 223 / 2);
  fill(blue); rect(374, 336, 205, 20);
  fill(ltYel);
  beginShape();
    vertex(327, 357); vertex(608, 357);
    vertex(707, 444); vertex(250, 444);
  endShape(CLOSE);
  fill(dkYel); rect(251, 444, 457, 45);
  stroke(black); strokeWeight(5); fill(pink);
  rect(368, 376, 225, 47, 30);
  noStroke(); fill(milk);
  textFont(uiFont); textSize(24);
  text("START", 368 + 225 / 2, 376 + 47 / 2);
  noStroke(); fill(bgColor);
  ellipse(461, 313, 7, 7); ellipse(473, 313, 7, 7);
  stroke(black); strokeWeight(5); fill(pink);
  ellipse(494, 313, 15, 15);
}

function drawLetterScreen() {
  let sutunSayisi = 7;
  let ikonBoyutu = 80;
  let bosluk = 100;
  let izgaraGenisligi = sutunSayisi * bosluk;
  let izgaraYuksekligi = 4 * bosluk;
  let baslangicX = (width - izgaraGenisligi) / 2 + bosluk / 2;
  let baslangicY = (height - izgaraYuksekligi) / 2 + bosluk / 2;

  for (let i = 0; i < 26; i++) {
    let sutun = i % sutunSayisi;
    let satir = floor(i / sutunSayisi);
    let x = baslangicX + sutun * bosluk;
    let y = baslangicY + satir * bosluk;
    image(btnLetters[i], x, y, ikonBoyutu, ikonBoyutu);
  }
  
  let geriButonIndexi = 27;
  let geriButonSutun = geriButonIndexi % sutunSayisi;
  let geriButonSatir = floor(geriButonIndexi / sutunSayisi);
  let geriX = baslangicX + geriButonSutun * bosluk;
  let geriY = baslangicY + geriButonSatir * bosluk;
  image(btnBack, geriX, geriY, 120, 60);
}

function drawLearningScreen() {
  let harfIndexi = selectedLetter.charCodeAt(0) - 'A'.charCodeAt(0);
  
  fill(milk); noStroke(); rect(160, 100, 300, 300, 15);
  fill(black); textFont(templateFont); textSize(200);
  text(selectedLetter, 160 + 150, 100 + 150);

  fill(milk); noStroke(); rect(500, 100, 300, 300, 15);
  let nesneResmi = objectImages[harfIndexi];
  if (nesneResmi) {
    image(nesneResmi, 500 + 150, 100 + 140, 200, 200);
  }
  let nesneKelimesi = objectWords[harfIndexi];
  if (nesneKelimesi) {
    fill(black); textFont(uiFont); textSize(32);
    text(nesneKelimesi, 500 + 150, 100 + 260);
  }
  
  let ikonBoyutu = 80;
  image(btnPlay, width/2 - 60, 450, ikonBoyutu, ikonBoyutu);
  image(btnDraw, width/2 + 60, 450, ikonBoyutu, ikonBoyutu);
  image(btnBack, width - 100, height - 70, 120, 60);
}

function drawDrawingScreen() {
  fill(milk); noStroke();
  rectMode(CENTER);
  rect(width/2, height/2, 350, 350, 15);
  rectMode(CORNER);
  
  image(templateCanvas, width/2, height/2);
  image(drawCanvas, width/2, height/2);
  
  let butonY = 495;
  let ikonBoyutu = 80;
  image(btnAgain, width/2 - 80, butonY, ikonBoyutu, ikonBoyutu);
  image(btnCheck, width/2 + 80, butonY, ikonBoyutu, ikonBoyutu);
  image(btnBack, width - 100, height - 70, 120, 60);
}

function drawFeedbackScreen() {
  fill(milk); noStroke();
  rect(150, 100, 660, 340, 20);
  
  if (lastSuccess) {
    fill(black); textFont(uiFont); textSize(48);
    text("CONGRATULATIONS!", width/2, 180);
    fill(blue); textFont(templateFont); textSize(36);
    text("You did\na great job!", width/2, 270);
    image(btnNext, width/2, 400, 180, 60);
  } else {
    fill(black); textFont(uiFont); textSize(48);
    text("NICE TRY...", width/2, 180);
    fill(blue); textFont(templateFont); textSize(36);
    text("But I am sure\nyou can do better.", width/2, 270);
    image(btnAgain, width/2, 400, 80, 80);
  }
}

function prepareDrawingAssets() {
  templateCanvas.clear();
  templateCanvas.fill(0, 40);
  templateCanvas.textFont(templateFont);
  templateCanvas.textAlign(CENTER, CENTER);
  templateCanvas.textSize(300);
  templateCanvas.text(selectedLetter, templateCanvas.width / 2, templateCanvas.height / 2 + 10);
  
  clearUserDrawing();
}

function clearUserDrawing() {
  drawCanvas.clear();
}

function calculateAccuracy() {
  drawCanvas.loadPixels();
  templateCanvas.loadPixels();
  
  let totalTemplatePixels = 0;
  let matchingPixels = 0;
  
  for (let i = 0; i < templateCanvas.pixels.length; i += 4) {
    let alphaTemplate = templateCanvas.pixels[i + 3];
    if (alphaTemplate > 0) {
      totalTemplatePixels++;
      let alphaDraw = drawCanvas.pixels[i + 3];
      if (alphaDraw > 0) {
        matchingPixels++;
      }
    }
  }
  
  if (totalTemplatePixels === 0) return 0;
  return (matchingPixels / totalTemplatePixels) * 100.0;
}

function mousePressed() {
  if (currentScreen === "main") {
    if (mouseX > 368 && mouseX < 593 && mouseY > 376 && mouseY < 423) {
      currentScreen = "letters";
    }
  } else if (currentScreen === "letters") {
    let sutunSayisi = 7, bosluk = 100;
    let izgaraGenisligi = sutunSayisi * bosluk;
    let izgaraYuksekligi = 4 * bosluk;
    let baslangicX = (width - izgaraGenisligi) / 2 + bosluk / 2;
    let baslangicY = (height - izgaraYuksekligi) / 2 + bosluk / 2;
    
    for (let i = 0; i < 26; i++) {
      let sutun = i % sutunSayisi; let satir = floor(i / sutunSayisi);
      let x = baslangicX + sutun * bosluk;
      let y = baslangicY + satir * bosluk;
      if (dist(mouseX, mouseY, x, y) < 40) {
        selectedLetter = String.fromCharCode('A'.charCodeAt(0) + i);
        prepareDrawingAssets();
        currentScreen = "learning";
        return;
      }
    }
    
    let geriButonIndexi = 27;
    let geriButonSutun = geriButonIndexi % sutunSayisi; let geriButonSatir = floor(geriButonIndexi / sutunSayisi);
    let geriX = baslangicX + geriButonSutun * bosluk; let geriY = baslangicY + geriButonSatir * bosluk;
    let geriGenislik = 120, geriYukseklik = 60;
    if (mouseX > geriX - geriGenislik/2 && mouseX < geriX + geriGenislik/2 && mouseY > geriY - geriYukseklik/2 && mouseY < geriY + geriYukseklik/2) {
      currentScreen = "main";
    }
  } else if (currentScreen === "learning") {
    if (dist(mouseX, mouseY, width/2 - 60, 450) < 40) {
      let harfIndexi = selectedLetter.charCodeAt(0) - 'A'.charCodeAt(0);
      if (letterSounds[harfIndexi]) {
        letterSounds[harfIndexi].play();
      }
    }
    if (dist(mouseX, mouseY, width/2 + 60, 450) < 40) { currentScreen = "drawing"; }
    
    let geriX = width - 100, geriY = height - 70, geriW = 120, geriH = 60;
    if (mouseX > geriX - geriW/2 && mouseX < geriX + geriW/2 && mouseY > geriY - geriH/2 && mouseY < geriY + geriH/2) {
      currentScreen = "letters";
    }
  } else if (currentScreen === "drawing") {
    let butonY = 495; let butonYariCap = 40;
    
    if (dist(mouseX, mouseY, width/2 - 80, butonY) < butonYariCap) { 
      clearUserDrawing(); 
    } 
    
    if (dist(mouseX, mouseY, width/2 + 80, butonY) < butonYariCap) {
        let dogruluk = calculateAccuracy();
        console.log("Doğruluk Oranı: " + dogruluk + "%");
        lastSuccess = (dogruluk >= 70);
        currentScreen = "feedback";
    }
    
    let geriX = width - 100, geriY = height - 70, geriW = 120, geriH = 60;
    if (mouseX > geriX - geriW/2 && mouseX < geriX + geriW/2 && mouseY > geriY - geriH/2 && mouseY < geriY + geriH/2) {
      currentScreen = "learning";
    }
  } else if (currentScreen === "feedback") {
      if (lastSuccess) {
        let btnX = width/2, btnY = 400, btnW = 180, btnH = 60;
        if (mouseX > btnX - btnW/2 && mouseX < btnX + btnW/2 && mouseY > btnY - btnH/2 && mouseY < btnY + btnH/2) {
          currentScreen = "letters";
        }
      } else {
        let btnX = width/2, btnY = 400, btnYariCap = 40;
        if(dist(mouseX, mouseY, btnX, btnY) < btnYariCap) {
          clearUserDrawing();
          currentScreen = "drawing";
        }
      }
  }
}

function mouseDragged() {
  if (currentScreen === "drawing") {
    drawCanvas.stroke(pink);
    drawCanvas.strokeWeight(32);
    drawCanvas.strokeCap(ROUND);
    drawCanvas.line(pmouseX - (width/2 - drawCanvas.width/2), 
                    pmouseY - (height/2 - drawCanvas.height/2), 
                    mouseX - (width/2 - drawCanvas.width/2), 
                    mouseY - (height/2 - drawCanvas.height/2));
  }
}
