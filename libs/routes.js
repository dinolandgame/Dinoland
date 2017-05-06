Router.onBeforeAction(function(){

//si no esta log
	if(!Meteor.userId()){
		//va a la ruta homeLogin
		this.render('principal');

		//finalizar el proceso de la peticion
		this.next();
	}
// si esta log
	else{
		//si esta en la ruta homeLogin llevalo a la ruta
		/*if(Router.current().route.getName() === 'principal'){
			Router.go('game');
		}*/
        
        if(Router.current().route.getName() === 'game'){
            $('body').css("overflow","hidden");            
        }
        
        else{
            $('body').css("overflow","auto");   
            $('canvas').remove();
        }
            
        
		this.next();
	}
});

Router.configure({
  layoutTemplate: 'PageMaster',
  notFoundTemplate: 'notFoundTemplate',
  loadingTemplate: 'loading',
  waitOn: function(){
  	
      return [Meteor.subscribe('partida'),
               Meteor.subscribe('edificio'),
               Meteor.subscribe('tropas'),
               Meteor.subscribe('lideres'),
               Meteor.subscribe('terrenos'),
               Meteor.subscribe('dinosaurios'),
               Meteor.subscribe('expedicion'),
               Meteor.subscribe('investigacion'),
               Meteor.subscribe('notificaciones'),
               Meteor.subscribe('chat'),
               Meteor.subscribe('users'),
               Meteor.subscribe('muro')];
  }
		
});


Router.route('/', function () {

  this.render('principal');

});


Router.route('/principal', function () {
  this.render('principal');
});

Router.route('/proyecto', function(){
	this.render('proyecto')

});

Router.route('/nolog', function(){
	this.render('nolog')

});




//****************** yield + template*************/

Router.route('/game', function () {
this.render('game')
		
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

