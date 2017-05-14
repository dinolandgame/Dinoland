Template.noticias.helpers({

	noticia:function(){
		return Noticias.find({});
	},
	admin:function(){
		var resul= false;
		Meteor.call('mostrarentradanoticia', function(error, result){
            if(error){
                
            }else{
                 return Session.set('entrada', result);
            }
        });
        
        resul = Session.get('entrada');
        return resul;
	}
});

Template.noticias.events({
	//evento click cambio de modal
	
	"submit #entradaNoticia":function(event,template){
			var comentario = template.find('#comentario').value;
			var version = template.find('#version').value;
			var rol = template.find('#rol').value;
			Meteor.call('entrarnoticia',version,comentario,rol);

		
	return false;
		}
});