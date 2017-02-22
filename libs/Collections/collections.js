
Partida = new Mongo.Collection("partida");


if(Meteor.isClient){
	Template.game.helpers({
		money: function(){
			return Partida.find();
		},


	});
	

   var myInterval = Meteor.setInterval(function(){
      Meteor.call('sumardinero');
   }, 1000);
   
	
}
