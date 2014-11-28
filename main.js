var milkcocoa = new MilkCocoa("https://io-bi3094j05.mlkcca.com/");
var dataStore = milkcocoa.dataStore("data");
var textinput, attenderNum;

window.onload = function(){
  textinput   = document.getElementById("textinput");
  attenderNum = document.getElementById("attender__num");

  textinput.addEventListener("keydown", sendComment, false);
}

function setup() {
  colorMode(HSB, 255);
  createCanvas(windowWidth, windowHeight);
  background(0, 0, 180);
}

function draw() {
}

function sendComment(event){
  if(textinput.value == ""){} // 入力が無い場合は何もしない
  else if(event.keyCode == 13){
    dataStore.send({message: textinput.value}, function(data){
      textinput.value = "";
    })
  }
}

dataStore.on("send", function(data){
  r = 200;
  x = random(windowWidth - r);
  y = random(windowHeight - r - 100);
  drawCircleText(data.value.message, x, y, r);
})

function drawCircleText(_txt, _x, _y, _r){
  // DOMを生成する
  var red = Random(255);
  var green = Random(255);
  var blue = Random(255);
  var circle = createDiv("");
  var text = createP(_txt);
  circle.addClass("circle");
  text.addClass("circleText");
  circle.style("backgroundColor", "rgba("+ red + "," + green + "," + blue +", 0.5)");
  circle.style("width", _r+"px");
  circle.style("height", _r+"px");
  circle.child(text);
  circle.position(_x, _y);
}

function Random(_n){
  console.log(Math.floor( Math.random() * _n ));
  return Math.floor( Math.random() * _n );
}
