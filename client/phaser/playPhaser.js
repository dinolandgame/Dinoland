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

