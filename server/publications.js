Meteor.publish('partida', function(){
	return Partida.find({_id: this.userId});
	//return Partida.find();
});
Meteor.publish('edificio', function(){
	return Edificio.find();
});

