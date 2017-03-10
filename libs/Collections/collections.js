
// nuestras colecciones en mongoDB
Partida = new Mongo.Collection("partida");
Edificio = new Mongo.Collection("edificio");


if(Meteor.isClient){
	Template.game.helpers({
		partida: function(){

			return Partida.find({});
		},


		edifi: function(id){
			return Edificio.find({_id:id});
		},
		filtro1: function(id){
			if(id==1||id==101||id==201){
				return true;
			}
			else{
				return false;
			}
		},
		filtro2: function(id){
			if(id==2||id==102||id==202){
				return true;
			}
			else{
				return false;
			}
		},
		filtro3: function(id){
			if(id==3||id==103||id==203){
				return true;
			}
			else{
				return false;
			}
		},
		filtro: function(key){
			nomClau = Session.get('sesionKey');
			if(key===nomClau){
				return true;
			}
			else{
				return false;
			}
		}
	});	

   var myInterval = Meteor.setInterval(function(){
      Meteor.call('sumardinero');
   }, 1000);	
}
