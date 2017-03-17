/*
/*	

function preload() {

    game.load.image('mapa', '/images/mapa_buit.png');
    game.load.spritesheet('sinte1', '/images/sinte1.png', 125, 132, 12);
    
}

function create() {

    var mapa = game.add.sprite(0,0,'mapa');
    var sinte1 = game.add.sprite(0,300,'sinte1');
    var sinte2 = game.add.sprite(50,350,'sinte1');

    sinte1.animations.add('run');
    sinte1.animations.play('run', 12, true);
    
    sinte1.inputEnabled = true;
    sinte2.inputEnabled = true;
    sinte1.events.onInputDown.add(clicar,this);
    sinte2.events.onInputDown.add(clicar2,this);
    sinte1.events.onInputOver.add(hover1,this);
    

}

function clicar(sinte1){  
    
    sinte1.tint = 0xff0000; 

    //alert("sinte1");
}

function clicar2(sinte2){
    
    sinte2.tint = 0xff0000;
    //alert("sinte2");
}

function hover1(sinte1){
    alert("hover");
}
    
    
*/

/*
Template.dinoGame.rendered(function(){
   

});*/

Template.dinoGame.helpers({
	'dino':function(){
        game = new Phaser.Game(1400, 800, Phaser.CANVAS, 'dinosaur');
		game.state.add('Inicializador', Inicializador);
		game.state.add('Preloader', Preloader);
		game.state.add('Juego', Juego);
		    // Y se empieza uno
		game.state.start('Inicializador');
	}
});

