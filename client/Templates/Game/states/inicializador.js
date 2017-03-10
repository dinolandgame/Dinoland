// El Inicializador es un estado en que se carga y configura el aspecto del cargador (preloader) y se inicializa. Adicionalmente se puede aprovechar para configurar otros parámetros del juego.

Inicializador = function(game){
  this.game = game;
};

Inicializador.prototype = {
    init: function() {
        // Se configura la escalabilidad del canvas
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
    },
   preload: function() {
       this.game.load.image('preloadbar', 'images/spinner.gif');
       this.game.load.image('fondo', 'images/island_gif.gif');
   },
  create: function(){
       this.game.stage.backgroundColor = '#00b0be';
       
  },
  update: function(){
      this.game.state.start('Preloader');
  }
};