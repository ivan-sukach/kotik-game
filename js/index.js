let gameField = document.getElementById('gameField'),
    ctx = gameField.getContext('2d'),
    gameFieldWidth = gameField.width = 600,
    gameFieldHeight = gameField.height = 400,
    x = 0, // вісь Х
    y = 0, // вісь У
    speed = 20, // швидкість
    recordWork, // true/false запис подій
    arrRecords = []; //масив записаних подій

let cat = document.getElementById('cat'), // Котик
    khhh = document.getElementById('khhh'), // аудіо сичання кота
    meow = document.getElementById('meow');
    catWidth = 100; // ширина котика
    catHeight = 100; // висота котика
    

// кнопки
let controlPanel = document.getElementsByClassName('control-panel'),
    btnUp = document.getElementById('btn-up'),
    btnDown = document.getElementById('btn-down'),
    btnLeft = document.getElementById('btn-left'),
    btnRight = document.getElementById('btn-right'),
    btnInstruction = document.getElementById('btn-instruction'),
    btnRecord = document.getElementById('btn-record'),
    btnStop = document.getElementById('btn-stop');

// інструкція
let instructionBlock = document.getElementsByClassName('instruction')[0];

// аудіо ефекти
let clickAudio = document.getElementById('audio-click');

// запуск функцій клавіатурою
document.addEventListener('keydown', function(event) {
  
  switch (event.key) {
    case 'ArrowUp':
      functions.up()
      clickAudioPlay();
      break;
    case 'ArrowDown':
      functions.down()
      clickAudioPlay();
      break;
    case 'ArrowLeft':
      functions.left()
      clickAudioPlay();
      break;
    case 'ArrowRight':
      functions.right()
      clickAudioPlay();
      break;
    
    case 'i':
      functions.showInstruction()
      clickAudioPlay();
      break;
    case 'r':
      functions.record()
      clickAudioPlay();
      break;
    case 's':
      functions.stop()
      clickAudioPlay();
      break;
  }
});

// запуск функцій кліком по кнопкам
document.addEventListener('click', function(event) {
  switch (event.target.id || event.target.parentElement.id) { // якщо id кнопки або батьків id співпадають
    case 'btn-up':
      functions.up();
      clickAudioPlay();
      break;
    case 'btn-down':
      functions.down();
      clickAudioPlay();
      break;
    case 'btn-left':
      functions.left();
      clickAudioPlay();
      break;
    case 'btn-right':
      functions.right();
      clickAudioPlay();
      break;
    case 'btn-instruction':
      functions.showInstruction();
      clickAudioPlay();
      break;
    case 'btn-record':
      functions.record();
      clickAudioPlay();
      break;
    case 'btn-stop':
      functions.stop();
      clickAudioPlay();
      break;
  }
});


// звук кліка
function clickAudioPlay() {
  clickAudio.play();
  setTimeout(function(){
    clickAudio.pause();
    clickAudio.currentTime = 0.0;
  }, 100);
}
// коли кіт врізається в стіну він сичить
function khhhAudioPlay() {
  khhh.play();
  setTimeout(function(){
    khhh.pause();
    khhh.currentTime = 0.0;
  }, 50);
}
// коли стартують записані кроки
function meowAudioPlay() {
  meow.play();
  setTimeout(function(){
    meow.pause();
    meow.currentTime = 0.0;
  }, 900);
}


let functions = {
  start: function () {
    // початкове поле
    ctx.fillStyle="rgba(97, 218, 255, 0.356)";
    ctx.fillRect(0, 0, gameFieldWidth, gameFieldHeight);
    // вставляєм котика
    ctx.drawImage(cat, x, y, catWidth, catHeight);
    // сітка
    this.grid();
  },

// сітка // зараз вимкнена бо перегружає
  grid: function () { 
    ctx.strokeStyle = 'white';
    ctx.lineWidth = '1';
    
    // let stepX = gameFieldWidth/5;
    // let stepY = gameFieldHeight/5;
  
    // for(let i = 0; i <= gameFieldWidth; i++){
    //   ctx.moveTo(i*stepX, 0);
    //   ctx.lineTo(i*stepX, gameFieldHeight);
      
    //   ctx.stroke();
    // }
  
    // for(let i = 0; i <= gameFieldHeight; i++){
    //   ctx.moveTo(0, i*stepY);
    //   ctx.lineTo(gameFieldWidth, i*stepY);
      
    //   ctx.stroke();
    // }
  },

// очистка canvas
  clear: function () {
    ctx.clearRect(0, 0, gameFieldWidth, gameFieldHeight);
    ctx.fillRect(0, 0, gameFieldWidth, gameFieldHeight);
    this.grid();
  },

// показати інструкцію
  showInstruction: function () {
    functions.btnActive(btnInstruction);
    instructionBlock.classList.toggle('instruction-show');
  },

// анімашки для кнопок при натисканні клавіатури
  btnActive: function(id) {
    let nowClass;
    
    switch (id.id) {
      case 'btn-up':
        nowClass = 'up-active'
        break;
      case 'btn-down':
        nowClass = 'down-active'
        break;
      case 'btn-left':
        nowClass = 'left-active'
        break;
      case 'btn-right':
        nowClass = 'right-active'
        break;
  
    // інструкція, запис, стоп
      case 'btn-instruction':
        nowClass = 'active-btn'
        break;
      case 'btn-record':
        nowClass = 'active-btn'
        break;
      case 'btn-stop':
        nowClass = 'active-btn'
        break;
    }
  
      
    id.classList.add(nowClass);
    setTimeout(() => id.classList.remove(nowClass), 90);
  },

// вверх
  up: function () {
    functions.btnActive(btnUp);
    if(recordWork){
      arrRecords.push(functions.up)
    }

    if(y > 0){
      y = y - speed;
      functions.clear();
      ctx.drawImage(cat, x, y, catWidth, catHeight);
  
    }else {
      khhhAudioPlay()
  
      alert(' Не виходьте за межі !');
  
    }
  },

// вниз
  down: function () {
    functions.btnActive(btnDown);
  
    if(recordWork){
      arrRecords.push(functions.down)
    }

    if(y < gameFieldHeight - catHeight){
      y = y + speed;
  
      functions.clear();
      ctx.drawImage(cat, x, y, catWidth, catHeight); 
  
    }else {
      khhhAudioPlay();
      alert(' Не виходьте за межі !');
    }
  },

// вліво
  left: function () {
    functions.btnActive(btnLeft);

    if(recordWork){
      arrRecords.push(functions.left)
    }

    if(x > 0){
      x = x - speed;
  
      functions.clear();
      ctx.drawImage(cat, x, y, catWidth, catHeight);
  
    }else {
      khhhAudioPlay();
      alert(' Не виходьте за межі !');
    }
  },

// вправо
  right: function () {
    functions.btnActive(btnRight);
    
    if(recordWork){
      arrRecords.push(functions.right)
    }

    if(x < gameFieldWidth - catWidth){
      
      x = x + speed;
  
      functions.clear();
      ctx.drawImage(cat, x, y, catWidth, catHeight); 
  
    }else {
      khhhAudioPlay();
      alert(' Не виходьте за межі !');
    }
  },

// запис
  record: function () {
    recordWork = !recordWork; // true -> false, false -> true перемикач
    btnRecord.classList.toggle('animate-record'); // анімація кнопки запису
    let answer;

    if(!recordWork && arrRecords.length > 1){
      answer = confirm('Відтворити записані кроки ?');
    }

    if(answer && arrRecords.length > 0){
      arrRecords.forEach(function(element, i){
        setTimeout(function(){
           element()
           ctx.font = "20px monospace";
           ctx.strokeStyle = "white";
           ctx.strokeText(i, x, y);

           if(i >= arrRecords.length) {
            meowAudioPlay();
          }

        }, 100 * ++i);


     });
     arrRecords = [];
    }
  },

// скидування до початкового стану
  stop: function () {
    functions.btnActive(btnStop);
    x = 0;
    y = 0;
    this.clear();
    ctx.drawImage(cat, 0, 0, catWidth, catHeight);
    arrRecords = [];
  }
}

// перша функція, яка промальовує канвас і котика
functions.start();