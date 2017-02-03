

Template.logout.events({
	"submit #logout-form":function(event,template){
		Meteor.logout(function(err){
 			console.log(err.reason);
		});
	},
"submit #logout-account":function(event,template){
		event.preventDefault();
		//propiedad package bootstraps-3-modal mostrar Template
		
		Router.go('HomeLogin');
	}
});