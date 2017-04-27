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
	  

		"click .mejorar":function(event, template){
				console.log("se esta mejorando...");
				Edifici = Edificio.findOne({nom:this.nom,nivel:(this.nivel)});
				tiempo = Edifici.tiempoConstrucion;
				
				
						$('.mejorar1').css({'display':'none'});
						$('.pujar_n1').css({'display':'block'});
						console.log(" mejorado...");
					
					

			}


	});

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
}