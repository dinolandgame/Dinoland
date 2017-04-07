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
          },
    "click .crear":function(event,template){
       // Partida.update({_id:user},{$set:{edificio:[1001],dinero:100,energia:50,suministros:50,visitantes:0}});
       Partida.update({_id:user},{$push:{edificio:1001}});
        Partida.update({_id:user},{$push:{edificiosDes:{$each:[1001,401,501]}}});
        
        $('.prueba').hide();
        
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
       //console.log("variable:" + variable);
        return Edificio.find({key: variable});
    },
    edificioTodos: function(){
        return Edificio.find({nivel: 1});
    },
    yaConstruido:function(id){
        user = Meteor.userId();
        var cuartel1 = 1001;
        var cuartel2 = 1002;
        var cuartel3 = 1003;
           
        var edifCuartel = "";
        var edificiosDesbloqueadosCuartel = "";
        
        var mi_partida = Partida.find({_id:user}).fetch();//obtengo un array de las partida del usuario siempre sera 1 por user
        var misedificiosEnPartida = mi_partida[0].edificio;
        
         for(var i = 0; i<misedificiosEnPartida.length; i++){
             if(cuartel1===misedificiosEnPartida[i]){
                  edifCuartel = Edificio.findOne({_id:cuartel1});
                 //console.log("ha entrado en el if 1");
             }
             else if(cuartel2===misedificiosEnPartida[i]){
                  edifCuartel = Edificio.findOne({_id:cuartel2});
                 //console.log("ha entrado en el if 2");
             }
             else if(cuartel3===misedificiosEnPartida[i]){
                  edifCuartel = Edificio.findOne({_id:cuartel3});
             }
         }
        
       edificiosDesbloqueadosCuartel =  edifCuartel.desbloquea;
   
        
                /*for(var i = 0; i<edificiosDesbloqueadosCuartel.length; i++){                
                    //if(id==misedificiosEnPartida[x]){
                        if(id==edificiosDesbloqueadosCuartel[i]){ 
                            return true;                    
                        }                  
                    }*/
                    for(var x = 0; x<misedificiosEnPartida.length; x++){
                            if(id==misedificiosEnPartida[x]){  
                                return true;
                            }
                    }
            /* for( var x=0; x<misedificiosEnPartida.lenght;x++ ){         
        
        for(var i = 0; i<edificiosDesbloqueadosCuartel.length; i++){                
                if(id==edificiosDesbloqueadosCuartel[i] && id!=misedificiosEnPartida[x]){
                    
                    return true;
                    }
            else
                {
                    for( var x=0; x<misedificiosEnPartida.lenght;x++ ){
                        
                        if(id!= misedificiosEnPartida[x]){
                            return false;
                        }else{
                            return true;
                        }
                }
           
        }
             }
    }*/
    }

    
});


Template.dinoGame.onRendered(function(){
    var id=0;
     $('.crearEdificio').on('dblclick',function(){
             
            id = $(this).data('id');
             console.log(this);
            //Partida.update({_id:user},{$push:{edificio:id}});
             Meteor.call('crear_edificio',id);
             $(this).css({'opacity':'0.95','cursor':'not-allowed'});
             $('.prueba2').hide();
            
        
     });
        $('[data-toggle="popover"]').popover(); 
});



