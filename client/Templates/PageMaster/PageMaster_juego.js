Template.game.events({
"click a#logout":function(event,template){
		event.preventDefault();
		//propiedad package bootstraps-3-modal mostrar Template
		Modal.show('logout');

	},

"click a#home":function(event,template){
		event.preventDefault();

		Router.go('/');
		},
"click a#logreg":function(event,template){
		event.preventDefault();
		Modal.show('register'); // abrimos template register
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
  }

});

