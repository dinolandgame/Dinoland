Template.header.events({

"click a#logout":function(event,template){
		event.preventDefault();
		//propiedad package bootstraps-3-modal mostrar Template
		Modal.show('logout');

	},

"click a#home":function(event,template){
		event.preventDefault();
        
		Router.go('/');
        /*$('body').css({"overflow":"auto"});*/
		},

"click a#proyecto":function(event,template){
		event.preventDefault();

		Router.go('proyecto');
		},

"click a#juego":function(event,template){
		event.preventDefault();
        
        /*$('body').css({"overflow": "hidden"});*/
		Router.go('game');
    
    //location.reload();
		}

});
