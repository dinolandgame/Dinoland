// El Inicializador es un estado en que se carga y configura el aspecto del cargador (preloader) y se inicializa. Adicionalmente se puede aprovechar para configurar otros parámetros del juego.
var DinoLand = {};
 
Inicializador = function(game){
};
 
Inicializador.prototype = {
    init: function() {
        // Se configura la escalabilidad del canvas
        this.scale.scaleMode = Phaser.ScaleManager.SCALE_USER;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    },
   preload: function() {
       this.load.spritesheet('island_preloader', '../images/island_preloader.png', 500, 500, 121);
   },
  create: function(){
       this.stage.backgroundColor = '#00b0be';    
  },
  update: function(){
      this.state.start('Preloader');
  }
};