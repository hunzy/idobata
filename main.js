$(function(){

  var milkcocoa = new MilkCocoa("https://io-bi3094j05.mlkcca.com/");
  var dataStore = milkcocoa.dataStore("data");
  var $textinput = $("#textinput");
  var $attenderNum = $("#attender__num");
  var $window = $(window);

  // コメント入力を監視し、sendイベントを送る
  $textinput.on("keydown", sendComment);
  function sendComment(event){
    if( $textinput.val() == "" ){}  // 入力が無い場合は何もしない
    else if( event.keyCode == 13 ){ // Enterが押された時
      dataStore.send({message: $textinput.val()}, function(data){
        $textinput.val("");
      })
    }
  }

  // sendイベントを受け取り次第、円形のコメントを描画
  dataStore.on("send", function(data){
    r = 200;
    x = Random(0, $window.width() - r);
    y = Random(0, $window.height() - r - 100);
    drawCircleText(data.value.message, x, y, r);
  })

  // コメントの描画処理
  function drawCircleText(_txt, _x, _y, _r){
    // 色をランダムに選択
    var red   = Random(0, 255);
    var green = Random(0, 255);
    var blue  = Random(0, 255);
    // 円形の生成
    var $circle = $("<div>")
    $circle.addClass("circle");
    $circle.css({
      backgroundColor: "rgb("+ red + "," + green + "," + blue +")",
      width:   _r+'px',
      height:  _r+'px',
      left:    _x+'px',
      top:     _y+'px'
    });
    // テキストの生成
    var $text = $("<p>");
    $text.text(_txt);
    $text.addClass("circleText");
    $circle.append($text);
    // 画面に描画
    $("body").append($circle);
  }

  function Random(_min, _max){
    return Math.floor( Math.random() * (_max - _min) + _min );
  }

});
