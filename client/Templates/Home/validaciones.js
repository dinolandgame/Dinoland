Modal.allowMultiple=true;

//se recoge la variable validator en en validador
var validador = $.validator;

validador.setDefaults({
	//reglas a aplicar a cada campo
	rules:{
		//por propiedad name="..." del input del formulario
		//REGISTER
		regnombre:{
			//required por la propiedad que le hemos dado en el .html
			required:true,
			minlength:4,
			maxlength:24
		},
		regmail:{
			required:true,
			email:true
		},
		regclave1:{
			required:true,
			minlength:6
		},
		regclave2:{
			required:true,
			minlength:4,
			equalTo:"#regpass1"
		},
		terminos:{
			required:true
		},

		//LOGIN
		lognombre:{
			required:true,
			minlength:4,
			maxlength:24
		},
		logclave:{
			required:true,
			minlength:6
		}

	},
	messages:{
		//REGISTER
		regnombre:{
			required:"Debes introducir un nombre",
			minlength:"como minimo {0} carácteres",
			maxlength:"como minimo {0} carácteres"
		},
		regmail:{
			required:"Debes introducir un email",
			email:"Has introducido un mail no valido"
		},
		regclave1:{
			required:"Debes introducir una contraseña",
			minlength:"como mínimo {0} carácteres"
		},
		regclave2:{
			required:"Debes introducir una contraseña",
			minlength:"como mínimo {0} carácteres",
			equalTo:"Ambas claves deben ser iguales"
		},
		terminos:{
			required:"Debes aceptar los terminos y condiciones"
		},

		//LOGIN
		lognombre:{
			required:"Debes introducir un nombre",
			minlength:"como minimo {0} carácteres",
			maxlength:"como minimo {0} carácteres"
		},
		logclave:{
			required:"Debes introducir una contraseña",
			minlength:"como mínimo {0} carácteres",
		}


	}
});


//activar las validaciones de jquery-validator
Template.register.onRendered(function(){
	//formulario register-form
	validator=$('#register-form').validate();
});

Template.HomeLogin.onRendered(function(){
	//formulario login-form
	validator=$('#login-form').validate();
});

