var Engine=(function(global){
    var doc = global.document,
    win = global.window,
    canvas = doc.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    lastTime;
  canvas.width = 505;
  canvas.height = 606;
  doc.body.appendChild(canvas);

  function main(){
      //for smooth processing because computer processor speeds may vary to maintain at constant time
    var now = Date.now(),
    dt = (now - lastTime) / 1000.0;
  // Call our update/render functions,for smooth animations
  update(dt);
  render();
  lastTime = now;
  //to call this function again as soon as the browser is able to draw another frame.
  win.requestAnimationFrame(main);
  }
  //init() is used to occur the initial setup  only once 
  function init(){
    reset();
    lastTime = Date.now();
    main()
  }
  //whenever any updates occur this function calls in loop manner
  function update(dt) {
    updateEntities(dt);
    player.checkCollisions();
  }
  //thta particular entity which gets updated will update by calling this function
  function updateEntities(dt) {
    allEnemies.forEach(function(enemy) {
      enemy.update(dt);
    });
    player.update();
  }
  //responsible for game animation which renders
  function render(){
      //designing how particular the format should be
    var rowImages = [
        'images/water-block.png', // Top row is water
        'images/stone-block.png', // Row 1 of 3 of stone
        'images/stone-block.png', // Row 2 of 3 of stone
        'images/stone-block.png', // Row 3 of 3 of stone
        'images/grass-block.png', // Row 1 of 2 of grass
        'images/grass-block.png' // Row 2 of 2 of grass
      ],
      numRows = 6,
      numCols = 5,
      row, col;
//first need to clear the existing canvas 
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      //now we are drawing the image for that particular position
      for (row = 0; row < numRows; row++) {
        for (col = 0; col < numCols; col++) {
          ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
        }
      }
  
      renderEntities();
  }
  //Its purpose is to then call the render functions you have defined on your enemy and player entities within app.js
  function renderEntities() {
      //looping for every object and calling render object
    allEnemies.forEach(function(enemy) {
        enemy.render();
      });
      player.render();
  }
  //whenever game ends or resets it is called and called only once by init()
  function reset() {
    
  }
//loading all resources needed to draw using canvas
  Resources.load([
    'images/stone-block.png',
    'images/water-block.png',
    'images/grass-block.png',
    'images/enemy-bug.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png',
    
  ]);
  Resources.onReady(init);
  //when we assign canvas context object to global then users can access it from app.js
  global.ctx = ctx;
})(this);