
Template.HomeLogin.events({
	//evento click cambio de modal
	"click a#logreg":function(event,template){
		event.preventDefault();
		Modal.show('register'); // abrimos template register
	},
	"submit #login-form":function(event,template){
			var user = template.find('#lognombre').value;
			var pass = template.find('#logpass1').value;
		
		Meteor.loginWithPassword(user,pass,function(err){
			if(err){
				if(err.reason == "User not found"){
					validator.showErrors({
						lognombre:"Ese usuario no existe."
					});
				}
				if(err.reason == "Incorrect password"){
					validator.showErrors({
						logclave:"Has entrado una contraseña incorrecta."
					});
				}
			}else{
				//Router
				console.log(Meteor.user());
			}
		});
		return false;
		}
});

	