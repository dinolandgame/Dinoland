Template.register.events({
	//evento en cliclk cambio modal
	"click a#reglogin":function(event,template){
		event.preventDefault();
		Modal.hide(template);//cerramos template actual
		Router.go('/HomeLogin');//vamos a home
	},
	"submit #register-form":function(event,template){
		//busqueda de un valor en el .html por su "id" i registrado en una variable
		var user = template.find('#regnombre').value;
		var email = template.find('#regmail').value;
		var pass1 = template.find('#regpass1').value;
		var pass2 = template.find('#regpass2').value;
		
	
	var userObject = {
		username:user,
		email:email,
		password:pass1
		
	};

	Accounts.createUser(userObject, function(err){
		if(err){
			console.log(err.reason);

			//username already exist
			if(err.reason == "Username already exists."){
				validator.showErrors({
					regnombre:"Ya existe un usuario con ese nombre."
				});
			}

			if(err.reason == "Email already exists."){
				validator.showErrors({
					regmail:"El email ya pertenece a un usuario registrado."
				});
			}
		}
		else{
			
			console.log(Meteor.user());
			
			Modal.hide(template);
		}
	});
	console.log('submit form' + user + email + pass1 + pass2);
	Meteor.call('crear_partida');
	return false;
	}

});