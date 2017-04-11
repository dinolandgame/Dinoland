Meteor.publish('partida', function(){
	return Partida.find({_id: this.userId});
	//return Partida.find();
});
Meteor.publish('edificio', function(){
	return Edificio.find();
});
Meteor.publish('terrenos', function(){
	return Terreno.find();
});
Meteor.publish('tropas', function(){
	return Tropa.find();
});
Meteor.publish('dinosaurios', function(){
	return Dinosaurio.find();
});
Meteor.publish('expedicion', function(){
    return Expedicion.find({usuario: this.userId});
});
Meteor.publish('lideres', function(){
	return Lider.find();
});
Meteor.publish('investigacion',function(){
	return Investigacion.find();
})
