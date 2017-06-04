Meteor.publish('chat', function(){
	return Chat.find({},{sort: {timestamp: -1}, limit:14});
});

Meteor.publish('noticies', function(){
	return Noticias.find({},{sort: {timestamp: -1}, limit:5});
});

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
});

Meteor.publish('notificaciones',function(){
	return Notificacion.find({usuario: this.userId});
});

Meteor.publish("users", function () {
  return Meteor.users.find({});
});
Meteor.publish('muro', function(){
	return Muro.find({},{sort: {timestamp: 1}, limit:15});
});

Meteor.publish('historialExpediciones', function(){
	return Expedicion.find({usuario:this.userId},{sort: {_id: 1}, limit:15});
});