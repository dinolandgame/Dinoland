Preloader = function(game){
    this.ready = false;
    var text;
    var fondo;
};
 
Preloader.prototype = {
    preload: function(){
        // Nuestro sprite de fondo se llama fondo y como lo hemos cargado
        // anteriormente y le hemos dado una key 'fondo', ya podemos llamarlo
        // como parte de nuestro objeto Phaser.Game
        // Se hace esto antes de que se empiece a cargar ningún asset del juego
        // puesto que interesa mostralo en la pantalla junto con la barra de carga
        //this.fondo = this.add.sprite(this.game.world.centerX, this.game.world.centerY);
        //this.fondo.anchor.setTo(0.5);
        fondo = this.add.image(0,0,'fondo');
        
        text = this.add.text(15, 10, 'Insertando en la isla', {fill: '#fff'});
        
        //Se añade el sprite que se cargó en el inicializador
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
        
        this.preloadBar.anchor.setTo(0.5);
        // Mediante está función del loader de Phaser (objeto load), el sprite que se use como barra
        //de carga irá apareciendo a medida que se van cargando los archivos.
        this.load.setPreloadSprite(this.preloadBar);
        
        // ***********  ASSETS DEL JUEGO A CARGAR *******************//
        //this.load.audio('myMusic', ['path/1.mp3', 'path/1.ogg']);
        //this.load.audio('myMusic', 'path/1.wav');
        //this.load.audio('m1', '/audio/1.mp3');
       this.load.image('mapa', '../images/mapa_buit.png');
        this.load.image('hotel', '../images/hotel.png');
        this.load.spritesheet('bar1', '../images/bar1.png', 150, 148, 10);
        
        // La siguiente función se ejecuta una vez se dispara el evento del loader de Phaser de que
        // se ha finalizado la carga de todos los assets
        this.load.onLoadComplete.add(this.loadComplete, this);
    },
    loadComplete: function(){
        // Se acabaron de cargar todos los recursos/ assets del juego
       this.ready = true;
    },
    update: function(){
        // Si en algún momento el loader acabó su trabajo, ya puede empezar el juego
        if(this.ready === true) 
        {
            text.text= "Loading finished";
            this.time.events.add(Phaser.Timer.SECOND * 2, empezar, this);              
        } 
    },
    
};

function empezar(){
    
    this.state.start('Juego'); 
    
}