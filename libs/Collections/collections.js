
Partida = new Mongo.Collection("partida");
Edificio = new Mongo.Collection("edificio");

if(Meteor.isClient){
	Template.game.helpers({
		money: function(){

			return Partida.find({});
		},


		edifi: function(id){
			return Edificio.find({_id:id});
		},
		filtro: function(id){
			if(2==id||1==id){
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


/*.forEach(function(item){
				item.edificio.forEach(function(a){
					a[0]=Edificio.find({_id:0});
				})*/