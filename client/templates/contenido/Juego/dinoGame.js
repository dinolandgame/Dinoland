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
        //Partida.update({_id:user},{$push:{edificiosDes:{$each:[1001,401,501]}}});
        
        $('.prueba').hide();
        
    },
    

    /********************** EVENTOS TIENDA**********************************************/
        //Saber cuanto dinero tengo
        //obtener el valor que el usuario ha introducido en el input
        //comprobar si ese valor es infoerior al dinero que tengo en la partida
        //Mostrar un calculo de los suministros que le daria a cambio
        //Hacer un update de partida
        //1 moneda vale 2 suministros
    "click #camDinero" : function(event, template){
        event.preventDefault();
        var partida = Partida.findOne({_id:Meteor.userId()} );
        //Dinero
        var dinero = partida.dinero;
        var introducido = +$('#dinero').val();
        var dineroRestante = dinero - introducido;
        //Suministros
        var suministros=partida.suministros;
        var suministrosGanados= introducido*2;
        var suministrosTotales = suministros + suministrosGanados;

        if(introducido!="" && introducido<=dinero){
            rellenarDinero(introducido, dineroRestante, suministrosGanados, suministrosTotales);

            $('#conDinero').on('click', function(){
                vaciarDinero();
                Meteor.call('cambioTienda', dineroRestante, suministrosTotales);
            });
            $('#cancelDinero').on('click', function(){
                vaciarDinero();
            });
        }
    },    
    "click #camSuministros" : function(event, template){
        event.preventDefault();
        var partida = Partida.findOne({_id:Meteor.userId()} );
        //Dinero
        var dinero = partida.dinero;
        var introducido = +$('#suministros').val();
        console.log("dinero introducido: " + introducido);
        console.log("decimal :" + decimal); 
        var decimal=parseInt(introducido / 2);
        var dineroGanado=Math.trunc(decimal);
        //Suministros
        var suministros=partida.suministros;
        var suministrosPerdidos= introducido;
        var suministrosRestantes = suministros -introducido;
        var dineroTotal = dinero + dineroGanado;
        if(introducido!="" && introducido<=suministros){
            rellenarSuministros(introducido, suministrosRestantes, dineroGanado, dineroTotal);

            $('#conSuministros').on('click', function(){
                vaciarSuministros();
                Meteor.call('cambioTienda', dineroTotal, suministrosRestantes);
            });
            $('#cancelSuministros').on('click', function(){
                vaciarSuministros();
            });
        }
    },
    "click #btn-tienda": function(event, template){
        event.preventDefault();
        vaciarSuministros();
        vaciarDinero();
    },

    /****************** FIN EVENTOS TIENDA *********************************************/

    /****************** EVENTOS EXPEDICIONES *******************************************/

    "click div[data-tipo] button": function(event, template){
        event.preventDefault();
        //obtenemos datos de los datas
        efecto = $(event.target).data("efecto");
        nombre = $(event.target).closest("div").data("nombre");
        efectividad = $(event.target).closest("div").data("efectividad");
        salud = $(event.target).closest("div").data("salud");
        slots = $(event.target).closest("div").data("slots");
        costeDC = $(event.target).closest("div").data("costedc");
        costeSUM = $(event.target).closest("div").data("costesum");
        tipo = $(event.target).closest("div").data("tipo");


        //Si hemos cliqueado en un boton de sumar
        if(efecto == "sumar"){

            //los valores totales se suman
            totalEFEC += efectividad;
            totalSAL += salud;
            totalSLOTS += slots;
            totalDC += costeDC;

                /* Si tenemos el bono, nos ahorramos un 15% en dinocoins*/
                if(bono_logistica == true){
                    totalDC = Math.ceil(totalDC - ((totalDC / 100) * 15));
                }

                else{
                    totalDC = totalDC;
                }
            totalSUM += costeSUM;

                /* Si tenemos el bono, nos ahorramos un 15% en suministros */
                if(bono_logistica == true){
                    totalSUM = Math.ceil(totalSUM - ((totalSUM / 100) * 15));
                }

                else{
                    totalSUM = totalSUM;
                }

            //aumentamos en 1 la tropa seleccionada
            switch(tipo){
                case "lanzarredes": total_lanzarredes++; break;
                case "rifle": total_rifle++;             break;
                case "jeep": total_jeep++;               break;
                case "exotraje": total_exotraje++;       break;
                case "doctor": total_doctor++;           break;
            }
        }

        //si hemos cliqueado en restar
        else{

            //los valores se restan a no ser que sean zero (no admitimos negativos)
            totalEFEC -= efectividad;
            if(totalEFEC < 0) {totalEFEC = 0;}

            totalSAL -= salud;
            if(totalSAL < 0) {totalSAL = 0;}

            totalSLOTS -= slots;
            if(totalSLOTS < 0) {totalSLOTS = 0;}

            totalDC -= costeDC;
            if(totalDC < 0) {
                totalDC = 0;
            }

            else{
                if(bono_logistica == true){
                    totalDC = Math.ceil(totalDC - ((totalDC / 100) * 15));
                }

                else{
                    totalDC = totalDC;
                }
            }

            totalSUM -= costeSUM;
            if(totalSUM < 0) {
                totalSUM = 0;
            }

            else{
                if(bono_logistica == true){
                    totalSUM = Math.ceil(totalSUM - ((totalSUM / 100) * 15));
                }

                else{
                    totalSUM = totalSUM;
                }
            }

            ////restamos 1 a la tropa seleccionada a no ser que sea zero (no admitimos valores repetidos)
            switch(tipo){
                case "lanzarredes": 
                    if(total_lanzarredes > 0) {total_lanzarredes--;}    break;

                case "rifle":  
                    if(total_rifle > 0) {total_rifle--;}                break;

                case "jeep":  
                    if(total_jeep > 0) {total_jeep--;}                  break;

                case "exotraje": 
                    if(total_exotraje > 0) {total_exotraje--;}          break;

                case "doctor":  
                    if(total_doctor > 0) {total_doctor--;}              break;
            }
        }

        //Seteamos los textos de los totales
        $("#slots").text(totalSLOTS + "/" + capacidad);
        $("#efectividad").text(totalEFEC);
        $("#salud").text(totalSAL);
        $("#costeDC").text(totalDC);
        $("#costeSUM").text(totalSUM);

        //seteamos los contadores de cada tropa en la lista de resumen
        $("#total-rifle").text(total_rifle);
        $("#total-lanzaredes").text(total_lanzarredes);
        $("#total-jeep").text(total_jeep);
        $("#total-exotraje").text(total_exotraje);
        $("#total-doctor").text(total_doctor);

        //en cada clic de boton sumar y restar hay que comprobar los slots que quedan para saber si lo mostramos o no en cada tropa así que volvemos a llamar a la función.
        buttons_sum_res(); 

        //Si los slots estan llenos (en nuestro caso si hay 29 o 30), lo ponemos en rojo
        if(totalSLOTS > (capacidad -2)){
            $("#slots").css("color", "red");
        }

        else{
            $("#slots").css("color", "black");
        }

        showBtnEnviar();
    },

    //Cuando hacemos click en el lider lo seleccionamos y lo añadimos a la lista
    "click img[data-tipo = 'lider']": function(event,template){
        event.preventDefault();
         nombreLider = $(event.target).data("nombre");
        $("#liderEXP").text(nombreLider);
        $("img[data-tipo = 'lider']").removeClass("selected");
        $(event.target).addClass("selected");
        liderSelected = true;
        showBtnEnviar();
    },

    //Cuando hacemos click en la zona lo seleccionamos y lo añadimos a la lista
    "click img[data-tipo = 'zona']": function(event,template){    
        event.preventDefault();
        nombreZona = $(event.target).data("nombre");
        $("#lugarEXP").text(nombreZona);
        $("img[data-tipo = 'zona']").removeClass("selected");
        $(event.target).addClass("selected");
        mapSelected = true;
        showBtnEnviar();
    }

/********************* FIN EVENTOS EXPEDICIONES *************************************/
        
 }); 

/************************ FUNCIONES TIENDA ********************************************/

function rellenarDinero(introducido, dineroRestante, suministrosGanados, suministrosTotales){
            $('#pierdesDinero, #teQuedaDinero, #ganasSuministros, #teQuedaSuministros').css('display', 'block');
            $('#dinero, #tienesDinero').css('display', 'none');
            $('#conDinero, #cancelDinero').css('display', 'inline-block');
            $('#camDinero').css('display', 'none');
            //Dinero
            $('#pierdesDinero span').text("Pierdes: " + introducido);
            $('#teQuedaDinero span').text("Te Queda: " + dineroRestante);
            //Suministros
            $('#ganasSuministros span').text("Ganas: " + suministrosGanados);
            $('#teQuedaSuministros span').text("Te Queda: " + suministrosTotales);
};

function rellenarSuministros(introducido, suministroRestante, dineroGanado, dineroTotal){
            $('#pierdesSuministros, #QuedaSuministros, #ganasDinero, #QuedaDinero').css('display', 'block');
            $('#suministros, #tienesSuministros').css('display', 'none');
            $('#conSuministros, #cancelSuministros').css('display', 'inline-block');
            $('#camSuministros').css('display', 'none');
            //Dinero
            $('#pierdesSuministros span').text("Pierdes: " + introducido);
            $('#QuedaSuministros span').text("Te Queda: " + suministroRestante);
            //Suministros
            $('#ganasDinero span').text("Ganas: " + dineroGanado);
            $('#QuedaDinero span').text("Te Queda: " + dineroTotal);
};
function vaciarDinero(){
            $('#pierdesDinero, #teQuedaDinero, #ganasSuministros, #teQuedaSuministros').css('display', 'none');
            $('#dinero, #tienesDinero').css('display', 'block');
            $('#conDinero, #cancelDinero').css('display', 'none');
            $('#camDinero').css('display', 'inline-block');
            //Dinero
            $('#pierdesDinero span').text("Pierdes: ");
            $('#teQuedaDinero span').text("Te Queda: ");
            //Suministros
            $('#ganasSuministros span').text("Ganas: ");
            $('#teQuedaSuministros span').text("Te Queda: ");
            $('#dinero').val("");
};

function vaciarSuministros(){
            $('#pierdesSuministros, #QuedaSuministros, #ganasDinero, #QuedaDinero').css('display', 'none');
            $('#suministros, #tienesSuministros').css('display', 'block');
            $('#conSuministros, #cancelSuministros').css('display', 'none');
            $('#camSuministros').css('display', 'inline-block');
            //Dinero
            $('#pierdesSuministros span').text("Pierdes: ");
            $('#QuedaSuministros span').text("Te Queda: ");
            //Suministros
            $('#ganasDinero span').text("Ganas: ");
            $('#QuedaDinero span').text("Te Queda: ");
            $('#suministros').val("");
};

/**************************** FIN FUNCIONES TIENDA *****************************************/

/**************************** FUNCIONES EXPEDICIONES ***************************************/

/* FUNCIONES QUE OCULTAN O MUESTRAN LOS BOTONES SUMAR Y RESTAR DE LA TROPA TRATADA*/
function showSumar(){
    $("div[data-tipo="+tipusTropa + "] button[data-efecto='sumar']").show();
};

function showRestar(){
    $("div[data-tipo="+tipusTropa + "] button[data-efecto='restar']").show();
};

function hideSumar(){
    $("div[data-tipo="+tipusTropa + "] button[data-efecto='sumar']").hide();
};

function hideRestar(){
    $("div[data-tipo="+tipusTropa + "] button[data-efecto='restar']").hide();
};

//funcion que comprueba si se ha seleccionado todo lo necesario para enviar la expedición
function showBtnEnviar(){
    if(totalSLOTS > 0 && liderSelected == true && mapSelected == true){
        $("#enviarEXP").show();
    }
    
    else if(totalSLOTS == 0 || liderSelected == false || mapSelected == false){
        $("#enviarEXP").hide();
    }
};

//Algoritmo que tiene en cuenta lo que ocupa cada tropa con los slots restantes, para saber si hay que mostrar el botón de + y -. También tiene en cuenta si ya se han seleccionado tropas del mismo tipo, por lo que son varios factores a tener en cuenta. Esta función se ejecuta en cada click a cualquier boton de sumar o restar ya que los valores cambian
function buttons_sum_res(){

    $("#resumen p").each(function(){
        quantitat = $(this).children("span").text();
        quantitatInt = parseInt(quantitat);
        tipusTropa = $(this).data("tipo");
        if(quantitatInt == 0){
            hideRestar();

            if((capacidad - totalSLOTS) >= $("div[data-tipo="+tipusTropa+"]").data("slots")){
                showSumar();
            }
            else{
                hideSumar();
            }
        }

        else if(quantitatInt > 0){
            showRestar();

            if((capacidad - totalSLOTS) < $("div[data-tipo="+tipusTropa+"]").data("slots")){
                hideSumar();
            }
            else{
                showSumar();
            }
        }
    });


    if(totalSLOTS == 0){
        $("button[data-efecto='restar']").hide();
    }

    if(totalSLOTS > (capacidad - 2)){
        $("button[data-efecto='sumar']").hide();
    }    

};

/**************************** FIN FUNCIONES EXPEDICIONES ***************************************/

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

    /* VARIABLES GLOBALES PARA EXPEDICIONES */
    
    bono_liderazgo = true; /* Aumenta en 10 la variable capacidad*/

    if(bono_liderazgo == false){
        capacidad = 30;
    }

    else{
        capacidad = 40;
    }

    $("#slots").text("0/" + capacidad);

    bono_logistica = false; /* Ahorra un 15% en dinocoins y suministros */
    totalDC = 0;            /* Total coste Dinocoins */
    totalSUM = 0;           /* Total coste Suministros */
    totalEFEC = 0;          /* Total efectividad */
    totalSAL = 0;           /* Total salud */
    totalSLOTS = 0;         /* Total slots gastados*/
    total_lanzarredes = 0;  /* Total tropas lanzarredes */
    total_rifle = 0;        /* Total tropas rifle */
    total_jeep = 0;         /* Total tropas jeep */
    total_doctor = 0;       /* Total tropas doctor */
    total_exotraje = 0;     /* Total tropas exotraje */
    liderSelected = false;  /* Boolean para saber si has seleccionado líder*/
    mapSelected = false;    /* Boolean para saber si has seleccionado el mapa */
    
    /* FIN VARIABLES GLOBALES PARA EXPEDICIONES */

    /* ESTO PODRIA IR EN EVENTOS NORMALES, USANDO EL event.target en vez del this*/
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

        /* EXPEDICIONES */
        //la primera carga comprobamos los botones de sumar y restar para cada tropa
        buttons_sum_res(); 
});



