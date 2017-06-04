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
       //this.load.audio('jungle', ['/sounds/jungle_music.mp3', '/sounds/jungle_music.ogg']);
        this.load.audio('tinny', ['/sounds/button_tiny.mp3', '/sounds/button_tiny.ogg']);
        this.load.audio('droplet', ['/sounds/water_droplet.mp3', '/sounds/water_droplet.ogg']);
        this.load.audio('snap', ['/sounds/snap.mp3', '/sounds/snap.ogg']);
        this.load.audio('bell', ['/sounds/bell_ring.mp3', '/sounds/bell_ring.ogg']);


        this.load.image('mapa', '../images/mapa_isometric.png');
    
        this.load.spritesheet('bar1', '../images/sprites/bar1.png', 182.4, 160.5, 10);
        this.load.spritesheet('bar2', '../images/sprites/bar2.png', 180, 178.5, 10);
        this.load.spritesheet('bar3', '../images/sprites/bar3.png', 217.5, 169.2, 10);
        this.load.spritesheet('clan1', '../images/sprites/clan1.png', 195.9, 181.5, 14);
        this.load.spritesheet('clan2', '../images/sprites/clan2.png', 216.5, 178.5, 14);
        this.load.spritesheet('clan3', '../images/sprites/clan3.png', 220.5, 180.6, 14);
        this.load.spritesheet('hotel1', '../images/sprites/hotel1.png', 266.666666, 181, 6);
        this.load.image('hotel2', '../images/sprites/hotel2.png');
        this.load.image('hotel3', '../images/sprites/hotel3.png');
        this.load.spritesheet('laboratori1', '../images/sprites/laboratori1.png', 204.9, 228, 23);
        this.load.image('laboratori2', '../images/sprites/laboratori2.png');
        this.load.image('laboratori3', '../images/sprites/laboratori3.png');
        this.load.image('magatzem1', '../images/sprites/magatzem1.png');
        this.load.image('magatzem2', '../images/sprites/magatzem2.png');
        this.load.image('magatzem3', '../images/sprites/magatzem3.png');
        this.load.spritesheet('cuartel1', '../images/sprites/cuartel1.png', 458.4, 354, 21);
        this.load.image('cuartel2', '../images/sprites/cuartel2.png');
        this.load.image('cuartel3', '../images/sprites/cuartel3.png');
        this.load.image('habitats1', '../images/sprites/habitats1.png');
        this.load.image('habitats2', '../images/sprites/habitats2.png');
        this.load.image('habitats3', '../images/sprites/habitats3.png');
        this.load.spritesheet('energia1', '../images/sprites/energia1.png', 180.25, 259.333333, 11);
        this.load.image('energia2', '../images/sprites/energia2.png');
        this.load.image('energia3', '../images/sprites/energia3.png');
        this.load.spritesheet('port1', '../images/sprites/port1.png', 478.5, 438.3, 13);
        this.load.image('port2', '../images/sprites/port2.png');
        this.load.image('port3', '../images/sprites/port3.png');
        this.load.spritesheet('trade1', '../images/sprites/trade1.png', 357, 215.1, 82);
        this.load.image('trade2', '../images/sprites/trade2.png');
        this.load.image('trade3', '../images/sprites/trade3.png');
        this.load.spritesheet('seguretat1', '../images/sprites/seguretat1.png', 301.3333, 217.6666, 8);
        this.load.image('seguretat2', '../images/sprites/seguretat2.png');
        this.load.image('seguretat3', '../images/sprites/seguretat3.png');
        this.load.spritesheet('sintetizador1', '../images/sprites/sintetizador1.png', 379.5, 415.5, 12);
        this.load.image('sintetizador2', '../images/sprites/sintetizador2.png');
        this.load.image('sintetizador3', '../images/sprites/sintetizador3.png');
        
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
    
    $("#tip").hide();
        
        music = game.add.audio('jungle');
        if(music.isPlaying == false){
           music.play(); 
           music.loopFull();
        }
        
    this.state.start('Juego'); 
    
}
