// El Inicializador es un estado en que se carga y configura el aspecto del cargador (preloader) y se inicializa. Adicionalmente se puede aprovechar para configurar otros parámetros del juego.
var DinoLand = {};
 
Inicializador = function(game){
};
 
Inicializador.prototype = {
    init: function() {
        // Se configura la escalabilidad del canvas
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    },
   preload: function() {
       this.load.image('preloadbar', '../images/spinner.gif');
       this.load.image('fondo', '../images/island_gif.gif');
   },
  create: function(){
       this.stage.backgroundColor = '#00b0be';
       
  },
  update: function(){
      this.state.start('Preloader');
  }
};