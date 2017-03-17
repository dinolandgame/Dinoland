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
		if(Router.current().route.getName() === 'principal'){
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

});


Router.route('/', function () {

  this.render('principal');

},{
 layoutTemplate:"PageMaster" 
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

Router.route('/game',function(){
    this.render('game');
            
    /*onRun:function(){
            
        game = new Phaser.Game(1400, 800, Phaser.CANVAS, 'dinosaur');
           
        
        }
*/
});


//****************** yield + template*************/





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


