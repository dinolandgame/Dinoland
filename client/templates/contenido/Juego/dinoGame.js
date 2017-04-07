//Eventos

Template.dinoGame.events({

    "click #btn_desplegar":function(event,template){
		event.preventDefault();
		$('#btn_desplegar').hide();
        $('#user').fadeOut(500);
        //$.ionSound.play("snap");
        $('#sidebar').addClass("sombra_sidebar");
        $('#sidebar').animate({"left": "16.66666667%"}, "slow"); 
        $('#btn_plegar').show();
	},

    "click #btn_plegar":function(event,template){
		event.preventDefault();
		//$.ionSound.play("snap");
        $('#btn_plegar').hide();
        $('#sidebar').animate({"left": "0%"}, "slow");
        $('#sidebar').removeClass("sombra_sidebar");
        $('#user').fadeIn(500);
        $('#btn_desplegar').show();
	},

    "click a#home":function(event,template){
			event.preventDefault();
           
			Router.go('/');
            /*$('canvas').remove();
            $('body').css("overflow","auto");*/
        location.reload();
	},

    "click #user":function(event,template){
        event.preventDefault();
        $('#btn_desplegar').hide();
        $('#user').fadeOut(500);
       // $.ionSound.play("snap");
        $('#sidebar').addClass("sombra_sidebar");
        $('#sidebar').animate({"left": "16.66666667%"}, "slow"); 
        $('#btn_plegar').show();
    },
    "onload window":function(event,template){
        //game = new Phaser.Game(1400, 800, Phaser.CANVAS, 'dinosaur');
        Router.go('game');
    },

    "click #subirlvl": function(event,template){
            event.preventDefault();
        
            //console.log("subir nivel");
            //console.log(quinedifici);
            
            Edifici = Edificio.findOne({key:quinedifici});//busco los edicios; el edificio seleccionado es quinedifici
            EdificiUp = Edificio.findOne({nom:Edifici.nom,nivel:(Edifici.nivel+1)});
            
            if(EdificiUp != null){
                Meteor.call('update_part',EdificiUp,Edifici); 
              
                alert("se ha subido de nivel");
            }
            else{
        
                console.log("aquet edifici ja esta en el seu maxim nivell");
            
            }
            $('.modal').modal('hide');
                    
           
        },
     "click #mejorar": function(event,template){
         
            phaserEdifici.destroy();
            game.state.restart();
          }
        
 }); 

//Helpers
Template.dinoGame.helpers({
    partida:function(){
        return Partida.find({});
        
    },
    edificios: function(){
         var variable=Session.get('key');
       //console.log("Edificio:" + quinedifici);
       console.log("variable:" + variable);
        return Edificio.find({key: variable});
    },

    confi_dinero : function(dinero){

        return Math.round(dinero);
    }

});






