const app = {

  // Position player
  player: {
    x: 0,
    y: 0,
    direction: 'right',
  },

  counter: {
    move: 0,
  },

  // Position Chest
  targetCell: {
    x: 5,
    y: 3,
  },

  // End game
  gameOver: false,

  // funtion player Win !
  isGame: function(){
    if(app.player.x === 5 && app.player.y === 3){
      const winner = document.querySelector('.chest');
      winner.classList.add('winner');
      const player = document.querySelector('.player');
      winner.appendChild(player)
      app.gameOver = true;
    }
  },

  // Init
  init: function () {
    app.redrawBoard();
    app.listenKeyboardEvents();
    app.restartGame();
  },

  // Generate drawboard
  drawboard: function(){
    const rowBoard = document.querySelector('#board');
      for(let i = 0; i < 4; i++ ){
        const row = document.createElement('div');
        row.classList.add('row');
        rowBoard.appendChild(row);
        
        for(let j = 0; j < 6; j++){
          const cell = document.createElement('div');
          cell.classList.add('cell');
          row.appendChild(cell);
          if(j === app.targetCell.x && i === app.targetCell.y){
            const chest = document.createElement('div')
            chest.classList.add('chest')
            cell.appendChild(chest);
          };
          if(app.player.x === j && app.player.y === i){
            const player = document.createElement('div')
            player.classList.add('player', app.player.direction);
            cell.appendChild(player)
          };
          
        }
      };
    app.isGame();
  },

  // Refresh board
  clearBoard: function(){
    const clearBoard = document.querySelector('#board');
    clearBoard.innerHTML = ""
  },

  // Reload 
  redrawBoard: function(){
    app.clearBoard();
    app.drawboard();
  },

  // Function turn left
  turnLeft: function(){
    if(app.gameOver){
      return
    }
    switch (app.player.direction) {
      case "right":
        app.player.direction = "up"
        break;
      case "up":
          app.player.direction = "left"
        break;
      case "left":
        app.player.direction = "down"
        break;
      case "down":
        app.player.direction = "right"
        break;
    };
    app.redrawBoard();
  },

  // Function turn right
  turnRight: function(){
    if(app.gameOver) {
      return
    }

    switch (app.player.direction) {
      case "right":
        app.player.direction = "down"
        break;
      case "down":
          app.player.direction = "left"
        break;
      case "left":
        app.player.direction = "up"
        break;
      case "up":
        app.player.direction = "right"
        break;
    };

    app.redrawBoard();
  },

  // Function move forward
  moveForward: function(){

    if(app.gameOver){
      return
    }

    switch (app.player.direction) {
      case 'right':
        if (app.player.x === 5) {
          return          
        } else {
          app.player.x += 1
          app.counter.move += 1
        }
        break;
      case 'left':
        if (app.player.x === 0) {
          return          
        } else {
          app.player.x -= 1
          app.counter.move += 1
        }
        break;
      case 'up':
        if (app.player.y === 0) {
          return          
        } else {
          app.player.y -= 1
          app.counter.move += 1
        }
        break;
      case 'down':
        if (app.player.y === 3) {
          return          
        } else {
          app.player.y += 1
          app.counter.move += 1
        }
        break;
    
    };
    app.redrawBoard();
  },

  // Listen key Keyboard
  listenKeyboardEvents: function() {
    const listen = document.querySelector('body');
    listen.addEventListener('keyup', (e) => {
      if(e.key === 'ArrowUp'){
        app.moveForward()
      }
      if(e.key === 'ArrowRight'){
        app.turnRight();
      }
      if(e.key === 'ArrowLeft'){
        app.turnLeft();
      }
    });
  },

  // Restart Game
  restartGame: () => {
    const resetGame = document.querySelector('#button-restart');
    resetGame.addEventListener('click', () => {
      app.player.x = 0;
      app.player.y = 0;
      app.player.direction = 'right'
      app.player.move = 0
      app.gameOver = false
      app.redrawBoard()
    })
  }
};

document.addEventListener('DOMContentLoaded', app.init);