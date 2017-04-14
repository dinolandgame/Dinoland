Preloader = function(game){
    this.ready = false;

    var text;
    var fondo;
};
 
Preloader.prototype = {
    preload: function(){
        
        //Sprite preloader, que saldrá antes que se carguen todos los assets
        island = this.add.sprite(400, 80,'island_preloader');
        island.animations.add('run');
        island.animations.play('run', 10, true);
        
        // ***********  ASSETS DEL JUEGO A CARGAR *******************//
        this.load.audio('jungle', ['/sounds/jungle_music.mp3', '/sounds/jungle_music.ogg']);
        this.load.audio('tinny', ['/sounds/button_tiny.mp3', '/sounds/button_tiny.ogg']);
        this.load.audio('droplet', ['/sounds/water_droplet.mp3', '/sounds/water_droplet.ogg']);
        this.load.audio('snap', ['/sounds/snap.mp3', '/sounds/snap.ogg']);
        this.load.audio('bell', ['/sounds/bell_ring.mp3', '/sounds/bell_ring.ogg']);


        this.load.image('mapa', '../images/mapa_buit.png');
    
        this.load.spritesheet('bar1', '../images/bar1.png', 182.4, 160.5, 10);
        this.load.spritesheet('bar2', '../images/bar2.png', 180, 178.5, 10);
        this.load.spritesheet('bar3', '../images/bar3.png', 217.5, 169.2, 10);
        this.load.spritesheet('clan1', '../images/clan1.png', 195.9, 181.5, 14);
        this.load.spritesheet('clan2', '../images/clan2.png', 216.6, 178.5, 14);
        this.load.spritesheet('clan3', '../images/clan3.png', 220.5, 180.6, 14);
        this.load.spritesheet('hotel1', '../images/hotel1.png', 535.666666, 296.5, 6);
        this.load.spritesheet('laboratori1', '../images/laboratori1.png', 204.9, 228, 23);
        this.load.image('magatzem1', '../images/magatzem1.png');
        this.load.spritesheet('cuartel1', '../images/cuartel1.png', 458.4, 354, 21);
        this.load.spritesheet('cuartel2', '../images/cuartel1.png', 460, 354, 21);
        this.load.spritesheet('cuartel3', '../images/laboratori1.png', 204.9, 228, 23);
        this.load.image('habitats1', '../images/habitats1.png');
        this.load.spritesheet('energia1', '../images/energia1.png', 180.25, 259.333333, 11);
        this.load.spritesheet('port1', '../images/port1.png', 478.5, 438.3, 13);
        this.load.spritesheet('trade1', '../images/trade1.png', 357, 215.1, 83);
        this.load.spritesheet('seguretat1', '../images/seguretat1.png', 301.2, 214.2, 8);
        this.load.spritesheet('sintetizador1', '../images/sintetizador1.png', 379.5, 415.5, 12);
        
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
            this.time.events.add(Phaser.Timer.SECOND * 3, empezar, this);              
        } 
    },
    
};

function empezar(){
    /* MUSICA EN EL JUEGO*/
        
        music = game.add.audio('jungle');
        if(music.isPlaying == false){
           music.play(); 
           music.loopFull();
        }
        
    this.state.start('Juego'); 
    
}
