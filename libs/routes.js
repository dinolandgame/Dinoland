Router.onBeforeAction(function(){

//si no esta log
	if(!Meteor.userId()){
		//va a la ruta homeLogin
		this.render('HomeLogin');

		//finalizar el proceso de la peticion
		this.next();
	}
// si esta log
	else{
		//si esta en la ruta homeLogin llevalo a la ruta
		if(Router.current().route.getName() === 'HomeLogin'){
			Router.go('game');
		}

		this.next();
	}
});

Router.configure({
  layoutTemplate: 'PageMaster',
  notFoundTemplate: 'notFoundTemplate',
  loadingTemplate: 'loading',
		/*
		waitOn: function() {
				return	Meteor.user().subscription;

			},
		action: function(){
				if (!this.ready()) {
				  this.render('loading');
				}
				else {
				   this.render('dinoGame', {to: 'dinoGame'});

				}
		}*/
});


Router.route('/', function () {

  this.render('HomeLogin');

});


Router.route('/HomeLogin', function () {
  this.render('HomeLogin');
});

Router.route('/proyecto', function(){
	this.render('proyecto')

});

Router.route('/Nolog', function(){
	this.render('Nolog')

});




//****************** yield + template*************/

Router.route('/game', function () {

		this.layout('game');

		if(Meteor.userId()){
			this.render('expediciones', {to: 'aside'});
		}else{
			this.render('dinoGame', {to: 'dinoGame'});
		}
			
			this.next();
		
   
});




Router.route('/expediciones', function () {
  this.layout('game');
		if(Meteor.userId()){
			this.render('expediciones', {to: 'aside'});
		}else{
			this.render('Nolog', {to: 'nolog'});
		}

this.next();

});

Router.route('/recursos', function () {
	this.layout('game');
		if(Meteor.userId()){
			this.render('recursos', {to: 'recur'});
		}else{
			this.render('Nolog', {to: 'nolog'});
		}
		this.next();

});




Router.route( '/verify-email/:token', {
  name: 'verify-email',
  action ( params) {
    Accounts.verifyEmail( params,token, (error)=> {
	      if ( error ) {
	        console.log( error.reason, 'Q NO COÑOO!!!!' );
	      }
	      else {
	      	console.log( 'Email verified! Thanks!', 'success' );
	        Router.go( '/' );

	      }
    });
    this.next();
  }

});
