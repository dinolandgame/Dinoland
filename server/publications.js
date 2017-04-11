Meteor.publish('partida', function(){
	return Partida.find({_id: this.userId});
	//return Partida.find();
});
Meteor.publish('edificio', function(){
	return Edificio.find();
});
Meteor.publish('terrenos', function(){
	return Terrenos.find();
});
Meteor.publish('tropas', function(){
	return Tropas.find();
});
Meteor.publish('dinosaurios', function(){
	return Dinosaurios.find();
});
Meteor.publish('expediciones', function(){
    return Expedicion.find({usuario: this.userId});
});