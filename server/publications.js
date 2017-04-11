Meteor.publish('partida', function(){
	return Partida.find({_id: this.userId});
	//return Partida.find();
});
Meteor.publish('edificio', function(){
	return Edificio.find();
});

Meteor.publish('tropas', function(){
	return Tropa.find();
});

Meteor.publish('lideres', function(){
	return Lider.find();
});

Meteor.publish('terrenos', function(){
	return Zona.find();
});

