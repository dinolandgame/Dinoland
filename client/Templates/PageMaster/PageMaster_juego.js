if(Meteor.isClient){
	/*var edificiSelec = "";
	Session.set("sesionKey",edificiSelec);

	Tracker.autorun(function () {
      var sessionData = Session.get('sesionKey');
      console.log(sessionData)
   });*/
	Template.game.events({
	"click a#logout":function(event,template){
			event.preventDefault();
			//propiedad package bootstraps-3-modal mostrar Template
			Modal.show('logout');

		},

	"click a#proyecto":function(event,template){
			event.preventDefault();

			Router.go('proyecto');
			},
			
	"click a#resend-verification-link":function ( event, template ) {
	    	Meteor.call( 'sendVerificationLink', ( error, response ) => {
	      	if ( error ) {
	      		let email = Meteor.user().emails[ 0 ].address;
	        	console.log( error.reason, 'no se ha enviado el mensaje a '+email );
	      	} 
	      	else {
	        	let email = Meteor.user().emails[ 0 ].address;
	        	console.log( 'Verification sent to '+ email, 'success' );
	     	}
	    });
	  },
	  
	"click .pujar_n": function(){
			console.log("subir nivel");
			//console.log(this);
			EdificiUp = Edificio.findOne({nom:this.nom,nivel:(this.nivel+1)});
			
			//EdificiUp = Edifici.find({});
			if(EdificiUp != null){
				//console.log(EdificiUp);

				/*Partida.update(
				   { _id:Meteor.user()._id, edificio: this.id },
				   { $set: { "edificio.$" : EdificiUp } }
				)*/
					Meteor.call('update_part', Edifici._id,EdificiUp._id);
					//console.log(this._id+" -- "+ EdificiUp._id);
				alert("se ha subido de nivel");
			
			}else{
				console.log("aquet edifici ja esta en el seu maxim nivell");
			}
		},

		"click .mejorar":function(event, template){
				console.log("se esta mejorando...");
				Edifici = Edificio.findOne({nom:this.nom,nivel:(this.nivel)});
				tiempo = Edifici.tiempoConstrucion;
				
				
						$('.mejorar1').css({'display':'none'});
						$('.pujar_n1').css({'display':'block'});
						console.log(" mejorado...");
					
					

			}/*,

		"click a.ejemplo":function(event, template){
			event.preventDefault();

			edificiSelec = $('.ejemplo').data('edificio');
			alert("hola" + edificiSelec);
			Session.set("sesionKey",edificiSelec);
			alert("hola" + edificiSelec);
			
		}*/



	});

}