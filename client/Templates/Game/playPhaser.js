Template.dinoGame.onRendered(function(){
	//var game = new Phaser.Game(1400, 800, Phaser.AUTO, 'canvas');
});

var game = new Phaser.Game(1400, 800, Phaser.AUTO, 'canvas');

Template.dinoGame.helpers({
    'dino':function(){
    	
    	console.log("ha entrado");
        game.state.add('Inicializador', Inicializador);
        game.state.add('Preloader', Preloader);
        game.state.add('Juego', Juego);
            // Y se empieza uno
        game.state.start('Inicializador');
    }
   

});




