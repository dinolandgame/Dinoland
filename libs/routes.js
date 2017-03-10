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
  waitOn: function(){
  	return Meteor.subscribe('partida');
  }
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

Router.route('/nolog', function(){
	this.render('nolog')

});




//****************** yield + template*************/

Router.route('/game', function () {

		this.layout('game');
		Meteor.subscribe('edificio');

		if(Meteor.userId()){
			this.render('dinoGame', {to: 'dinoGame'});
		}else{
			this.render('Nolog', {to: 'nolog'});
		}
});




Router.route( '/verify-email/:token', {
  name: 'verify-email',
  action ( params) {
    Accounts.verifyEmail( params,token, (error)=> {
	      if ( error ) {
	        console.log( error.reason, 'NO NO NO......' );
	      }
	      else {
	      	console.log( 'Email verified! Thanks!', 'success' );
	        Router.go( '/' );

	      }
    });
    this.next();
  }

});

Router.route('/game/:_id', function () {
  var params = this.params; // { _id: "5" }
  var id = params._id;
  if(Meteor.userId()){
			this.render('dinoGame', {to: 'dinoGame'},{
			    data: function () {
			      return Edificio.findOne({_id: this.params._id});
			    }
			 });
		}else{
			this.render('Nolog', {to: 'nolog'});
		}
   
   // "5"
});
