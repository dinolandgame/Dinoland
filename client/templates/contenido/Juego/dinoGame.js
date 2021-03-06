//Eventos


Template.dinoGame.events({

    "click #btn_desplegar":function(event,template){
        snap.play();
		event.preventDefault();
		$('#btn_desplegar').hide();
        $('#user').fadeOut(500);
        $('#sidebar').addClass("sombra_sidebar");
        $('#sidebar').animate({"left": "16.66666667%"}, "slow"); 
        $('#btn_plegar').show();
	},


    "click #btn_plegar":function(event,template){
        snap.play();
		event.preventDefault();
        $('#btn_plegar').hide();
        $('#sidebar').animate({"left": "0%"}, "slow");
        $('#sidebar').removeClass("sombra_sidebar");
        $('#user').fadeIn(500);
        $('#btn_desplegar').show();
	},

    "click a#home":function(event,template){
        snap.play();
			event.preventDefault();
           
			Router.go('/');
            /*$('canvas').remove();
            $('body').css("overflow","auto");*/
        location.reload();
	},

    "click #user":function(event,template){
        snap.play();
        event.preventDefault();
        $('#btn_desplegar').hide();
        $('#user').fadeOut(500);
        $('#sidebar').addClass("sombra_sidebar");
        $('#sidebar').animate({"left": "16.66666667%"}, "slow"); 
        $('#btn_plegar').show();
    },
    "onload window":function(event,template){
        //game = new Phaser.Game(1400, 800, Phaser.CANVAS, 'dinosaur');
        Router.go('game');
    },

    "click #subirlvl": function(event,template){
        snap.play();
            event.preventDefault();
        
            //console.log("subir nivel");
            //console.log(quinedifici);
            
            Edifici = Edificio.findOne({key:quinedifici});//busco los edicios; el edificio seleccionado es quinedifici
            EdificiUp = Edificio.findOne({nom:Edifici.nom,nivel:(Edifici.nivel+1)});
            
            var edifCuartel ="";
            var mi_partida = Partida.find({_id:user}).fetch();//obtengo un objeto partida en forma de array
        
        var cuartel = mi_partida[0].edificio[0].toString().substring(3,4);//controlamos que edicifios hay en la partida)
        
         console.log(cuartel);


         //console.log(EdificiUp);    
         //console.log(mi_partida); 
         //console.log((mi_partida[0].energia > EdificiUp.consumoEnergia)+" ||| "+(mi_partida[0].suministros > EdificiUp.costeSuministros)+ "  ||| " +(mi_partida[0].dinero >EdificiUp.costeDinocoins));
            if(EdificiUp != null && Edifici.nivel<=cuartel && mi_partida[0].energia >= EdificiUp.consumoEnergia  && mi_partida[0].suministros >= EdificiUp.costeSuministros && mi_partida[0].dinero >= EdificiUp.costeDinocoins ){
                
                var dinero = mi_partida[0].dinero - EdificiUp.costeDinocoins;
                var suministros = mi_partida[0].suministros - EdificiUp.costeSuministros;
                var energia = mi_partida[0].energia - EdificiUp.consumoEnergia;
                
                var now = new Date().getTime(); 
                now = now +(EdificiUp.tiempoConstruccion*1000);
                tarea = {"_id":EdificiUp._id,"final":now}


                Partida.update({_id:user},{$set:{dinero:dinero, suministros:suministros, energia:energia }});
                Partida.update({_id:user},{$push:{desbloqueando:tarea}});
                //llamamos a la funcion contador para hacer aparecer el contador cuando se sube nivel
                contador();

                Meteor.call('update_part',EdificiUp,Edifici); 
                //hay que probarlo y saber si hace este if para hacer unpdate tmabien del array de desbloqueados
                $(".text-alert").text("Los obreros ya han empezado a trabajar en las mejoras del edificio.");
                $(".img-alert").attr("src","images/eines.gif");
                $(".alert-general").fadeIn();
                
            }
            else{
        
                $(".text-alert").text("El edifico ya se encuentra a su máximo nivel.");
                $(".img-alert").attr("src","images/speaker.jpg");
                $(".alert-general").fadeIn();
            }
            $('.modal').modal('hide');
                    
           
        },
    
    "click .close-alert":function(event,template){
        snap.play();
        $(".alert-general").fadeOut();
        $('.alert-tutorial').fadeOut();

    },



    "click .crear":function(event,template){
       
       Partida.update({_id:user},{$push:{edificio:1001}});
        
        /********
        aqui podemos modificar la partida con los edifciios desbloqueados por el primer cuartel 
       
        ************/
   
        Partida.update({_id:user},{$push:{desbloqueados:{$each:[401,501,901,1001]}}});

        
        
        $('.text-tutorial').empty();
        
        $('.botones').empty();
        $('.botones').remove();
        $('.botones').detach();

        $('.tutorial').hide();

         mensajeTutorial(2);
        
    },
    

    /********************** EVENTOS TIENDA**********************************************/
        //Saber cuanto dinero tengo
        //obtener el valor que el usuario ha introducido en el input
        //comprobar si ese valor es infoerior al dinero que tengo en la partida
        //Mostrar un calculo de los suministros que le daria a cambio
        //Hacer un update de partida
        //1 moneda vale 2 suministros
    "click #camDinero" : function(event, template){
        snap.play();
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
                snap.play();
                vaciarDinero();
                Meteor.call('cambioTienda', dineroRestante, suministrosTotales);
            });
            $('#cancelDinero').on('click', function(){
                snap.play();
                vaciarDinero();
            });
        }
    },    
    "click #camSuministros" : function(event, template){
        snap.play();
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
        tinny.play();
        event.preventDefault();
        vaciarSuministros();
        vaciarDinero();
    },

    /****************** FIN EVENTOS TIENDA *********************************************/

    /****************** EVENTOS EXPEDICIONES *******************************************/
 // Acción de mandar una expedición
    "click #enviarEXP":function(event,template){
        snap.play();
         event.preventDefault();
         var mi_partida = Partida.findOne({_id:user});//obtengo la partidaq dle jugador
         console.log("dinero jugador: " + mi_partida.dinero +"dinero costedC"+ totalDC );
         console.log("sum jugador: " + mi_partida.suministros +"sum costesum"+ totalSUM );
         if(mi_partida.dinero > totalDC && mi_partida.suministros > totalSUM){
            var dinero = mi_partida.dinero - totalDC;
            var suministros = mi_partida.suministros - totalSUM;
            Partida.update({_id:user},{$set:{dinero:dinero, suministros:suministros}})
            // Se crea un documento con los datos de la expedición y se guarda en la BD 
            user = Meteor.userId();
            var data = new Date();
            var stringData = data.toString();
            var idexp = user + data.getTime().toString();
            var miembros_total = total_rifle + total_lanzarredes + total_jeep + total_exotraje + total_doctor;
            var bono_lanzarredes = "false";
            var bono_jeep = "false";
            if (total_lanzarredes > 0){
                bono_lanzarredes = "true";
            }
            if (total_jeep > 0){
                bono_jeep = "true";
            }
            Expedicion.insert({_id:idexp,
                                usuario: user,
                                area: nombreZona,
                                terreno: tipoZona,
                                lider: nombreLider,
                                jeep: bono_jeep,
                                lanzaredes: bono_lanzarredes,
                                efectividad: totalEFEC,
                                salud: totalSAL,
                                miembros: miembros_total,
                                coste_dinocoins: totalDC,
                                coste_suministros: totalSUM,
                                finalizada: "false",
                                fecha_creacion: stringData,
                                fecha_finalizacion: "",
                                resultados:[]
                                });
            Meteor.call('enviar_expedicion', idexp, tipoZona);

            resetExpedicion();
             
             $('.modal').modal('hide');
             $(".text-alert").text("Tu expedición se dirije al punto de captura. Mucha suerte.");
                $(".img-alert").attr("src","images/mapreport.png");
                $(".alert-general").fadeIn();


         }else{
            $(".text-alert").text("Te faltan recursos para enviar la expedición.");
                $(".img-alert").attr("src","images/recursos/suministros.png");
                $('.modal').modal('hide');
                $(".alert-general").fadeIn();

         }
    },

    "click #resetEXP": function(event, template){
        snap.play();
        resetExpedicion();
    },

    "click div[data-tipo] button": function(event, template){
        $("#resetEXP").fadeIn();
        droplet.play();
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
        
        misBonos = []; 
        /******** mis bonos tienen controlados los bonos 
        de la partida del jugador con la funcion de comprobar Bonos
            misBonos[0] = seguridad;
            misBonos[1] = habitats;
            misBonos[2] = rrpp;
            misBonos[3] =logistica;
            misBonos[4] = liderazgo;
        
        ********/
        misBonos = comprobarBonos();

        //Si hemos cliqueado en un boton de sumar
        if(efecto == "sumar"){

            //los valores totales se suman
            totalEFEC += efectividad;
            totalSAL += salud;
            totalSLOTS += slots;
            
            /* Si tenemos el bono, nos ahorramos un 15% en dinocoins*/
            
            
            if(misBonos[3] == true){
                costeDC = Math.ceil(costeDC - ((costeDC / 100) * 15));
            }
            
            totalDC += costeDC;

            
            /* Si tenemos el bono, nos ahorramos un 15% en suministros */
            if(misBonos[3] == true){
                costeSUM = Math.ceil(costeSUM - ((costeSUM / 100) * 15));
            }
            totalSUM += costeSUM;

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

            if(misBonos[3] == true){
                costeDC = Math.ceil(costeDC - ((costeDC / 100) * 15));
            }
            
            totalDC -= costeDC;
            if(totalDC < 0) {
                totalDC = 0;
            }
            
            if(misBonos[3] == true){
                costeSUM = Math.ceil(costeSUM - ((costeSUM / 100) * 15));
            }

            totalSUM -= costeSUM;
            if(totalSUM < 0) {
                totalSUM = 0;
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
        
        $("#slots").text(totalSLOTS + "/" + misBonos[4]);
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
        if(totalSLOTS > (misBonos[4] -2)){
            $("#slots").css("color", "red");
        }

        else{
            $("#slots").css("color", "rgba(245,237,170,1)");
        }

        showBtnEnviar();
    },


    //Cuando hacemos click en el lider lo seleccionamos y lo añadimos a la lista
    "click img[data-tipo = 'lider']": function(event,template){
        snap.play();
        $("#resetEXP").fadeIn();
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
        snap.play(); 
        $("#resetEXP").fadeIn();
        event.preventDefault();
        nombreZona = $(event.target).data("nombre");
        tipoZona = $(event.target).data("terreno");
        $("#lugarEXP").text(nombreZona);
        $("img[data-tipo = 'zona']").removeClass("selected");
        $(event.target).addClass("selected");
        mapSelected = true;
        showBtnEnviar();
    },

    "click #btn-expediciones": function(){
        snap.play();
        misBonos = []; 
        /******** mis bonos tienen controlados los bonos 
        de la partida del jugador con la funcion de comprobar Bonos
            misBonos[0] = seguridad;
            misBonos[1] = habitats;
            misBonos[2] = rrpp;
            misBonos[3] =logistica;
            misBonos[4] = liderazgo;
        
        ********/
        misBonos = comprobarBonos();

    $("#slots").text("0/" + misBonos[4]);
    },

    "mouseenter .mouse-efect": function(event, template){
        $(event.target).animate({
            'box-shadow': '2px 2px 2px 1px rgba(253,168,26,0.88)',
            'width': '100px',
            'height': '100px',
            'border-color':'black'
        }, 'slow');
        $(event.target).css('cursor', 'pointer');
    },
    "mouseleave .mouse-efect":function(event, template){
        $(event.target).animate({
            'box-shadow': '2px 2px 2px 1px rgba(253,168,26,0.88)',
            'width': '80px',
            'height': '80px',
            'border-color':'white'

            
            }, 'slow');
    },



/********************* FIN EVENTOS EXPEDICIONES *************************************/
    
/**********************EVENTOS HABITATS**********************************************/
"click #pasar-pagina":function(event, template){
    snap.play();
    pasarPagina();
},

"click #volver-pagina":function(event, template){
    snap.play();
     volverPagina();
},




/***********************FIN EVENTOS HABITATS*****************************************/

/********************* EVENTOS SONIDOS *********************************************/

"click #btn-sound": function(){
    droplet.play();
    if(cont_sonido % 2 == 0){
        game.sound.mute = true;
        $("#btn-sound img").attr("src","/images/ui/mute.png");
    }
    else{
        game.sound.mute = false;
        $("#btn-sound img").attr("src","/images/ui/sound.png");
    }
    
    cont_sonido++;
},    


/********************* FIN EVENTOS EXPEDICIONES *************************************/


/**********************EVENTOS CUARTEL GENERAL***************************************/
    "click .div-edificio":function(event, template){
        console.log(this.avatar);
        console.log(this.descripcion);
        $('#img-cuartel').attr("src", this.avatar);
        $('#desc-cuartel').text(this.descripcion);
        $('.btn-lvlup-cuartel').css('display', 'none');
        $('#div-costes').css('display', 'block');
        $('#span-energia').text(this.consumoEnergia);
        $('#span-suministros').text(this.costeSuministros);
        $('#span-dinocoins').text(this.costeDinocoins);
        $('.crearEdificio').data('id', this._id);
        $('.crearEdificio').css('display', 'block');
    },
    "click .div-laboratorio":function(event, template){
        $('#img-laboratorio').attr("src", this.avatar);
        $('#desc-laboratorio').text(this.descripcion);
        $('.btn-lvlup-laboratorio').css('display', 'none');
        $('#div-bono').css('display', 'block');
        $('#span-bono').text(this.bonus);
        console.log("this id: " + this._id);
        $('.investiga').data('id', this._id);
        $('#btn-investiga').css('display', 'block');


    },

    "mouseenter .modal-img-edif-cuartel":function(event,template){
        $(event.target).css({
            'box-shadow':'2px 2px 2px 1px rgba(180,97,0,0.88)',
            'border-color': 'black',
        });

   },

    "mouseleave .modal-img-edif-cuartel":function(event,template){
        $(event.target).css({'box-shadow':'none','border-color': 'white',});
    },

    "click .div-cuartel": function(event, template){
        $('.btn-lvlup-cuartel').css('display', 'block');
        $('.crearEdificio').css('display', 'none');
        $('#img-cuartel').attr("src", this.avatar);
        $('#desc-cuartel').text(this.descripcion);
        //$('#div-costes').css('display', 'none');
    },
   


    "click button[data-toggle='collapse-side']": function(event,template){
        $('.side-collapse').toggleClass('open');
    },
    
    "click button[data-toggle='collapse-side2']": function(event,template){
        $('.side-collapse2').toggleClass('open');
        
    },

    "click img.close-noti": function(event,template){
        //Se modifica el registro en la BD cambiando su campo leido a true. Ésto permite 
        // conservar las notificaciones para que las puedan usar otras funcionalidades (como el muro en la parte social)
        var notificacion = $(event.target).parent().data("id");
        Notificacion.update({_id:notificacion},{ $set:{leido:"true"}});
        var notificaciones = Notificacion.find({usuario:user, leido:"false"}).fetch();
        var cont_notificiaciones = notificaciones.length;
        $(event.target).parent().fadeOut();
        $("#text-contador-notis").text(cont_notificiaciones);       
        
    },
    /////////// funciones Chat /////////
    "click #mensaje_text":function(event,template){

        text = $("#mensaje").val();
        $("#mensaje").val("");
        Meteor.call("guardar_mensaje",text);
    },

    /************************************EVENTOS MURO*******************************************/

"click button[data-publicacion]": function(event, template){
        event.preventDefault();
        var idPublicacion = $(event.target).data('publicacion');
        var texto = $(event.target).prev().val();
        if(!texto==""){
            Meteor.call('comentarioPublicacion', idPublicacion, texto, Meteor.user());
        }

        $(event.target).prev().val("");
},

"click [data-like]":function(event,template){
    event.preventDefault();
    var idPublicacion =$(event.target).data('like');
    Meteor.call('likePublicacion',Meteor.userId(), idPublicacion);
},

/****************************************EVENTOS IMG PERFIL************************************/
"click .img-perfil":function(event, template){
    snap.play();
    var rutaImagen = $(event.target).attr("src");
    console.log(rutaImagen);
    Meteor.call("cambiarFotoPerfil", Meteor.userId(), rutaImagen);

},

"click button[data-idExpe]": function(event, template){
        var idExpe = $(event.target).data('idexpe');
        var expedicion = Expedicion.findOne({_id:idExpe});
        $("#reportExpe").text(expedicion.resultados[0].report);
},

"click #prepararExp" : function(evenet,template){
    $("#pop_historialExpediciones").modal("hide");
    $("#pop_expediciones").modal("show");

}
    
    


 }); 
/*************************FUNCIONES HABITATS**********************************************/

//Variables globales de referencia de la posición;
    
    posicionFinal=0
    posicionTerrestre=2000;
    posicionAereo=4000;
    posicionAcuatico=6000;
//Funcion que cambia la posición de las paginas de habitats hacia delante
    function pasarPagina(){
    
    if(posicionFinal<6000){
        //Variables cambio de pagina
        posicionFinal=posicionFinal+2000;
        posicionTerrestre=posicionTerrestre-2000;
        posicionAereo=posicionAereo-2000;
        posicionAcuatico=posicionAcuatico-2000;

    
    //Menu de habitat
    $('#resumen-habitat, #botonera-habitat, #tipos-habitat').css("position", "relative").animate({"position": "relative","right":posicionFinal + 'px'}, 800);
    //Habitat terrestre
    $('#tipoTerrestre').css("display", "block").animate({"left":posicionTerrestre+"px"}, 800);
    //Habitat aereo
    $('#tipoAereo').css("display", "block").animate({"left":posicionAereo+"px"}, 800);
    //Habitat acuatico
    $('#tipoAcuatico').css("display", "block").animate({"left":posicionAcuatico+"px"}, 800);
    //Boton pagina anterior
    $('#volver-pagina').css('display', 'block');

    //Si la posición es 6000 desaparece el boton de pagina siguiente
    }if(posicionFinal==6000){

        $('#pasar-pagina').css('display', 'none'); //none
    }
    
    }
//Funcion que cambia la posición de las paginas de habitats hacia atras
    function volverPagina(){
        
        if(posicionFinal>0){

            posicionFinal=posicionFinal-2000;
            posicionTerrestre=posicionTerrestre+2000;
            posicionAereo=posicionAereo+2000;
            posicionAcuatico=posicionAcuatico+2000;

    //Menu de habitat
    $('#resumen-habitat, #botonera-habitat, #tipos-habitat').css("display", "block").animate({"position": "relative","right":posicionFinal +'px'}, 800);
    //Habitat terrestre

     $('#tipoTerrestre').css("display", "block").animate({"left":posicionTerrestre+"px"}, 800);
    
    //Habitat aereo
    $('#tipoAereo').css("display", "block").animate({ "left":posicionAereo+"px"}, 800);
    //Habitat acuatico
    $('#tipoAcuatico').css("display", "block").animate({"left":posicionAcuatico+"px"}, 800);
    //Boton pasar pagina
     $('#pasar-pagina').css('display', 'block');

     //Si esta en la primera pagina se esconde el boton de volver pagina
     }if(posicionFinal==0){
        $('#volver-pagina').css('display', 'none');
     }
     
    }

/***********************FIN FUNCIONES HABITATS******************************************/

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
            $('.resumenDinero').css('display', 'block');
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
            $('.resumenSuministros').css('display', 'block');
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
            $('.resumenDinero').css('display', 'none');
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
            $('.resumenSuministros').css('display', 'none');

};

/**************************** FIN FUNCIONES TIENDA *****************************************/

/**************************** FUNCIONES EXPEDICIONES ***************************************/

function resetExpedicion(){
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

    buttons_sum_res()
    $("#slots").text("0/" + misBonos[4]);
    $("#slots").css({"color": "rgba(245,237,170,1)"})
    $("#efectividad").text(totalEFEC);
    $("#salud").text(totalSAL);
    $("#costeDC").text(totalDC);
    $("#costeSUM").text(totalSUM);
    $("#liderEXP").text("Ninguno");
    $("#lugarEXP").text("Ninguno");
    $("#resumen p[data-tipo]").each(function(){
        $(this).children().text("0");
    });
    $(".img_tropa").removeClass("selected");
    $("#resetEXP").fadeOut();
    $("#enviarEXP").fadeOut();
}

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
        $("#enviarEXP").fadeIn();
    }
    
    else if(totalSLOTS == 0 || liderSelected == false || mapSelected == false){
        $("#enviarEXP").fadeOut();
    }
};

//Algoritmo que tiene en cuenta lo que ocupa cada tropa con los slots restantes, para saber si hay que mostrar el botón de + y -. También tiene en cuenta si ya se han seleccionado tropas del mismo tipo, por lo que son varios factores a tener en cuenta. Esta función se ejecuta en cada click a cualquier boton de sumar o restar ya que los valores cambian
function buttons_sum_res(){
    misBonos = []; 
        /******** mis bonos tienen controlados los bonos 
        de la partida del jugador con la funcion de comprobar Bonos
            misBonos[0] = seguridad;
            misBonos[1] = habitats;
            misBonos[2] = rrpp;
            misBonos[3] =logistica;
            misBonos[4] = liderazgo;
        
        ********/
        misBonos = comprobarBonos();

    $("#resumen p").each(function(){
        quantitat = $(this).children("span").text();
        quantitatInt = parseInt(quantitat);
        tipusTropa = $(this).data("tipo");
        if(quantitatInt == 0){
            hideRestar();

            if((misBonos[4] - totalSLOTS) >= $("div[data-tipo="+tipusTropa+"]").data("slots")){
                showSumar();
            }
            else{
                hideSumar();
            }
        }

        else if(quantitatInt > 0){
            showRestar();

            if((misBonos[4] - totalSLOTS) < $("div[data-tipo="+tipusTropa+"]").data("slots")){
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

    if(totalSLOTS > (misBonos[4] - 2)){
        $("button[data-efecto='sumar']").hide();
    }    

};

/**************************** FIN FUNCIONES EXPEDICIONES ***************************************/

//Helpers
Template.dinoGame.helpers({
    partida:function(){
        return Partida.find({});
    }, 
    mostrar_boton:function(idcercar){

        mi_partida = Partida.findOne({_id:Meteor.userId()});
        tiene_edif = false;


        var nom_edif_cercar = Edificio.findOne({_id:idcercar}).nom;
        //var edificios = Edificio.find({nom:nom_edif.nom}).fetch();
        //var edif_cercar = Edificio.find({nom:nom_edif}).fetch();
        


        mi_partida.edificio.forEach(function(edif){
            
            //console.log(id);
            //console.log(edif);

           //console.log(id);
            
            var edif_act = Edificio.findOne({_id:edif}).nom;
            
            if(edif_act == nom_edif_cercar){
                tiene_edif = true;
                
            }
            
        });

        return tiene_edif;
    },
    mostrar_boton_subir_edif:function(idcercar){

        mi_partida = Partida.findOne({_id:Meteor.userId()});
        tiene_edif = false;     


        mi_partida.edificio.forEach(function(edif){
            
            
            if(idcercar == edif){
                tiene_edif = true;
                
            }
            
        });

        return tiene_edif;
    },
    chats:function(){
        limit_dades=20;
        var convers = Chat.find({}, {sort: {timestamp: 1}});
        return convers;
    },
    //buscamos la quantidad de dinosaurios que hay por areaa
    mostrar_num_dinoss:function(nom_area){
        //obtenemos la partida de jugador
        mi_partida = Partida.findOne({_id:Meteor.userId()});
        var num_dino=0;
        //recorremos el array de dinos de partida
        mi_partida.dinos.forEach(function(dino){
            //obtenemos el dinosssssss
            var dino_act = Dinosaurio.findOne({_id:dino.id});
            //miramos si el dino es de la area que le pasamos 
            if(dino_act.habitat == nom_area ){
                //si es le sumamos la cantidad
                num_dino += dino.cantidad;
            }

           
            
        });
        console.log(num_dino);
        return num_dino;
    },
    max_dinosaurios:function(){
        var max_cap = 0 
        //obtenemos la partida
        var mi_partida = Partida.findOne({_id:Meteor.userId()});
        //recorremos el array de edificios i comprovamos nivel de habitat 
        var bonohabitats = mi_partida.bono_habitats;
        mi_partida.edificio.forEach(function(edif){
            
            switch(edif)
            {   //guardamos la capacidad de dinos que puede tener el habitat segun su nivel
                case 1101: max_cap = Edificio.findOne({_id:edif}).capacidadDino; break;
                case 1102: max_cap = Edificio.findOne({_id:edif}).capacidadDino*2; break;
                case 1103: max_cap = Edificio.findOne({_id:edif}).capacidadDino*3; break;
            }
        });
        
        if(bonohabitats){
            max_cap += 5;
        }
        
        return max_cap;
    },

    estrellas:function( id, encuentro){
        var dino = Dinosaurio.findOne({_id:id});
        console.log("dinosaurio" + dino);
        if(dino.encuentro<10){
            var x = [1,2,3,4,5];  
        }else if(dino.encuentro<35 && dino.encuentro>10){
            var x =[1,2,3,4];
        }else if(dino.encuentro>=35 && dino.encuentro<50){
            var x = [1,2,3];
        }else if(dino.encuentro>=50 && dino.encuentro<=60){
            var x = [1,2];
        }else if(dino.encuentro>60){
            var x =[1];
        }

        return x;
    },

    estrellasPublic:function(id){
        var publicacion = Muro.findOne({_id:id});
        var x = [];
        if(publicacion.valoracion <= 1)
        {
            x = [1];
        }
        if(publicacion.valoracion == 2)
        {
            x = [1,2];
        }
        if(publicacion.valoracion == 3)
        {
            x = [1,2,3];
        }
        if(publicacion.valoracion >=4)
        {
            x = [1,2,3,4];
        }

        return x;
    },

    diferenciaFecha: function(id){
        var publicacion = Muro.findOne({_id:id});
        var fechaPublic = publicacion.timestamp;
        var fechaActual = Date.now();
        var diferencia  = fechaActual - fechaPublic;
        diferencia = diferencia/1000;
        var result ="";

        if(diferencia <60)
        {
            var segundos = Math.round(diferencia%60);
            result = "Hace " + segundos + " segundos."
        }
        else
        {
            var segundos = Math.round(diferencia%60);
            diferencia  = Math.floor(diferencia/60);

            var minutos = Math.round(diferencia % 60);
            diferencia  = Math.floor(diferencia/60);

            var horas   = Math.round(diferencia%24);
            diferencia  = Math.floor(diferencia/24);

            var dias = diferencia;

            if(dias > 0)
            {
                if(dias == 1)
                {
                    result = "Hace " + dias + " dia."
                }
                else
                {
                    result = "Hace " + dias + " dias.";
                }
            } 
            else if (horas > 0)
            {
                if(horas == 1)
                {
                    if(minutos ==1)
                    {
                        result = "Hace " + horas + " hora y " + minutos + " minuto.";
                    }
                    else
                    {
                        result = "Hace " + horas + " hora y " + minutos + " minutos.";
                    }
                }
                else
                {
                    if(minutos ==1)
                    {
                        result = "Hace " + horas + " horas y " + minutos + " minuto.";
                    }
                    else
                    {
                        result = "Hace " + horas + " horas y " + minutos + " minutos.";
                    }
                }
            }
            else
            {
                if(minutos ==1)
                {
                    result = "Hace " + minutos + " minuto.";
                }
                else
                {
                    result = "Hace " + minutos + " minutos.";
                }
            }
        }

        return result;
    },

    difFechaComent: function(timestamp){
        var fechaPublic = timestamp;
        var fechaActual = Date.now();
        var diferencia  = fechaActual - fechaPublic;
        diferencia = diferencia/1000;
        var result ="";

        if(diferencia <60)
        {
            var segundos = Math.round(diferencia%60);
            result = "Hace " + segundos + " segundos."
        }
        else
        {
            var segundos = Math.round(diferencia%60);
            diferencia  = Math.floor(diferencia/60);

            var minutos = Math.round(diferencia % 60);
            diferencia  = Math.floor(diferencia/60);

            var horas   = Math.round(diferencia%24);
            diferencia  = Math.floor(diferencia/24);

            var dias = diferencia;

            if(dias > 0)
            {
                if(dias == 1)
                {
                    result = "Hace " + dias + " dia."
                }
                else
                {
                    result = "Hace " + dias + " dias.";
                }
            } 
            else if (horas > 0)
            {
                if(horas == 1)
                {
                    if(minutos ==1)
                    {
                        result = "Hace " + horas + " hora y " + minutos + " minuto.";
                    }
                    else
                    {
                        result = "Hace " + horas + " hora y " + minutos + " minutos.";
                    }
                }
                else
                {
                    if(minutos ==1)
                    {
                        result = "Hace " + horas + " horas y " + minutos + " minuto.";
                    }
                    else
                    {
                        result = "Hace " + horas + " horas y " + minutos + " minutos.";
                    }
                }
            }
            else
            {
                if(minutos ==1)
                {
                    result = "Hace " + minutos + " minuto.";
                }
                else
                {
                    result = "Hace " + minutos + " minutos.";
                }
            }
        }

        return result;
    },

    hadadolike:function(idPublic){
        var id = Meteor.userId();
        var publicacion = Muro.findOne({_id:idPublic});
        var result = true;
        for(var i =0; i< publicacion.likes.length; i++)
        {
            if(publicacion.likes[i] === id){
                result = false;
            }
        }

        return result;
    },

    existeCarta:function(idDino){
        var partida = Partida.findOne({_id:Meteor.userId()});
        var result = false;
        for(var i=0; i<partida.dinos.length; i++)
        {
            if(partida.dinos[i].id==idDino)
            {
                if(partida.dinos[i].cantidad>0)
                {
                    result = true;
                }
            }
        }

        return result;
    },

    edificios: function(){
         var variable=Session.get('key');
       //console.log("Edificio:" + quinedifici);
       //console.log("variable:" + variable);
        return Edificio.find({key: variable});
    },
    habitats: function(){
        return Terreno.find({});
    },
    habitatTipo: function(nombre1, nombre2){
        /*var bol=false;
        if(num1==num2){
            bol=true;
        }
        return bol;*/

        if(nombre1===nombre2){
            return true;
        }else{
            return false;
        }
    },
    dinosaurios: function(){
        return Dinosaurio.find({});
    },
    dinosauriosTipo: function(nombreHabitat){
        return Dinosaurio.find({habitat:nombreHabitat});
    },
    mostrar_dino:function(dino){
        var quantitat = 0;
        var mi_partida = Partida.findOne({_id:Meteor.userId()});
        mi_partida.dinos.forEach(function(di){
            if(dino == di.id){
                quantitat = di.cantidad;
            }
        });
        return quantitat;

    },
    imagen_terreno:function(dino){
        var imagterreno = "";
        var terreno = Terreno.findOne({tipo_terreno:dino.habitat});
        if(terreno!=null){
            imagterreno = terreno.avatar;
        }
        return imagterreno;
    },
    edificioslvl1: function(){
        return Edificio.find({nivel: 1});
    },
    edificiosTodos:function(){
        return Edificio.find();
    },
    
    //funcion de desbloqueo de edificios
    //falta controlar cuando sube de nivel el cuartel general como hacer un update en la coleccion
    // Partida para modificar el array de desbloqueados segun los edificios que desbloquea el edificio cuartel en ese momento
    // Esta funcion controla tanto los desbloqueados y los que aun no se pueden desbloquear.
    yaConstruido:function(id){ 
        user = Meteor.userId();
        //definimos los id de cada cuartel nosotros los sabemos
        var cuartel1 = 1001;
        var cuartel2 = 1002;
        var cuartel3 = 1003;
        
        
        //varaible para el actual cuartel   
        var edifCuartel = "";
        //array para los edificios desbloqueados que proporcionoa dicho cuartel
        var edificiosDesbloqueadosCuartel = "";
        
        var mi_partida = Partida.find({_id:user}).fetch();//obtengo un objeto partida en forma de array
        
        var misedificiosEnPartida = mi_partida[0].edificio;//controlamos que edicifios hay en la partida
        
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
        
        
        //array de edificios desbloqueados por el cuartel actual
       edificiosDesbloqueadosCuartel =  edifCuartel.desbloquea;
        
        //recorremos dicho array de los edificios en nuestra partida
        for(var x = 0; x<misedificiosEnPartida.length; x++){  
                //si coincide con el id del edificio lo quitaremos del array de desbloqueados 
                //porque ya ha sido desbloqueado del todo
                if(id==misedificiosEnPartida[x]){
                        Partida.update({_id:user},{$pull:{desbloqueados:id}});   
                              
                }  
        }
        
        //volvemos a controlar el objeto Partida en un array
        partidilla = Partida.find({_id:user}).fetch();
        
        //controlamos los edifcios que quedan por desbloquear
        edificiosQueFaltanDesbloquear =  partidilla[0].desbloqueados;
             
        
        //recorremos el array
            for(var i = 0; i<edificiosQueFaltanDesbloquear.length; i++){                
                 
                //si el id coincide devolvemos true
                if(id==edificiosQueFaltanDesbloquear[i]){                   
                        return true;            
                } 
                    
            }   
    },

    tropas: function(){
       return Tropa.find({});
    },

    lideres: function(){
        return Lider.find({});
    },

    terrenos: function(){
        return Terreno.find({});
    },
    idEdificio: function(num1, num2){
        /*var bol=false;
        if(num1==num2){
            bol=true;
        }
        return bol;*/

        if(num1===num2){
            return true;
        }else{
            return false;
        }
    },

    investigaciones: function(){
        return Investigacion.find({});

    },
    investdesbloc: function(id){
        var mi_partida = Partida.find({_id:user}).fetch();
        var misBonosEnPartida = mi_partida[0].bonos_desbloqueados;

        for( var i= 0 ; i<misBonosEnPartida.length; i++){

            if(id==misBonosEnPartida[i]){
                return true;
            }
        }

    },
    rankingExpediciones:function(){
        
        
        Meteor.call('partidas', function(error, result){
            if(error){
                
            }else{
                 return Session.set('ranking', result);
            }
        });
        
        var resul =Session.get('ranking');
        return resul;

        
    },
     rankingVisitantes:function(){
        
        
        Meteor.call('rankingVisitantes', function(error, result){
            if(error){
                
            }else{
                 return Session.set('visitantes', result);
            }
        });
        
        var resul =Session.get('visitantes');
        return resul;

        
    },
    rankingAmbar:function(){
        
        
        Meteor.call('rankingAmbar', function(error, result){
            if(error){
                
            }else{
                 return Session.set('ambar', result);
            }
        });
        
        var resul =Session.get('ambar');
        return resul;

        
    }, 

    publicaciones:function(){
        return Muro.find({});
    },

    expediciones: function(){
        return Expedicion.find({},{sort: {_id: 1}, limit:15});
    },

    terrenoExpedicion: function(nombreTerreno){
        return Terreno.find({nombre: nombreTerreno});
    }


});

/* ON RENDERES ES COMO EL DOCUMENT(READY) */
Template.dinoGame.onRendered(function(){
    user = Meteor.userId();
    /* NOTIFICACIONES */
    comprobarNotificaciones();
    partida = Partida.findOne({_id:user});
    if(partida.edificio.includes(201)){
        mensajeTutorial(5);
    }
    if(partida.edificio.includes(701)){
        mensajeTutorial(6);
    }
    if(partida.edificio.includes(1101)){
        mensajeTutorial(4);
    }
    if(partida.edificio.length>=2){
        mensajeTutorial(3);
    }
    
    //iniciamos los contadores, tantos como haya en el array de desbloqueando cada vez que regarguemos la pagina
    contador();

    cont_sonido = 0;//Variable para controlar el sonido y el mute

    /* VARIABLES GLOBALES PARA EXPEDICIONES */   

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

   
    $('.crearEdificio').on('click',function(event){
        var id=0;
        event.preventDefault();
        id = $(this).data('id');
        $(this).data('id', "0");
         // obtengo el id del edifici
        var edificiCrear = Edificio.findOne({_id:id});   // obtengo el objecte del edifici que es vol crear         
        var mi_partida = Partida.findOne({_id:user});// obtengo el objecte de partida

         
        if( mi_partida.energia >= edificiCrear.consumoEnergia  && mi_partida.suministros >= edificiCrear.costeSuministros && mi_partida.dinero >= edificiCrear.costeDinocoins ){
                
                var dinero = mi_partida.dinero - edificiCrear.costeDinocoins;
                var suministros = mi_partida.suministros - edificiCrear.costeSuministros;
                var energia = mi_partida.energia - edificiCrear.consumoEnergia;

                
                var now = new Date().getTime(); 
                now = now +(edificiCrear.tiempoConstruccion*1000);
                tarea = {"_id":edificiCrear._id,"final":now}

                Partida.update({_id:user},{$set:{dinero:dinero, suministros:suministros, energia:energia }});
                
                //se añade al aray desbloqueando el edificio q se esta desbloqueando
                Partida.update({_id:user},{$push:{desbloqueando:tarea}});
                //llamamos a la funcion para hacer aparecer el contador
                contador();

            $('.modal').modal('hide');
            $(".text-alert").text("Los obreros han empezado a trabajar. Pronto terminaran la construcción.");
            $(".img-alert").attr("src","images/eines.gif");
            $(".alert-general").fadeIn();
           
             console.log(this);
            //Partida.update({_id:user},{$push:{edificio:id}});

             Meteor.call('crear_edificio',id);
             $('[data-id='+ id + ']').addClass('no-seleccionable');
         
             //$('.prueba2').hide();
        }else{

            $('.modal').modal('hide');
            $(".text-alert").text("No tienes suficientes recursos para construir este edificio.");
            $(".img-alert").attr("src","images/recursos/suministros.png");
            $(".alert-general").fadeIn();

        }
    });
    
    

      
    /*****************EVENTOS INVESTIGACIONES ************
    ********************************************
    *******************************************
    ****************************/


    $('.investiga').on('click' , function(event){
        
        var id=0;
        event.preventDefault();
        id = $(this).data('id');
        $(this).data('id', "0");
    
        
        var investigacion = Investigacion.findOne({_id:id});
       // var investigacion = Investigacion.findOne({_id:this._id});   // obtengo el objecte del edifici que es vol crear         
       var mi_partida = Partida.findOne({_id:user});// obtengo el objecte de partida


        if(mi_partida.dinero > investigacion.coste_DinoCoins && mi_partida.suministros > investigacion.coste_Suministro){
            
            var dinero = mi_partida.dinero - investigacion.coste_DinoCoins;
            var suministros = mi_partida.suministros - investigacion.coste_Suministro;
            
            Partida.update({_id:user},{$set:{dinero:dinero,suministros:suministros}});

            
            
            
            
            Meteor.call('hacerinvestigacion',investigacion._id);
            
            $('.modal').modal('hide');
            $(".text-alert").text("El equipo de científicos de la isla ya está en marcha.");
                $(".img-alert").attr("src","images/flask.png");
                $(".alert-general").fadeIn();
        }else{

            $(".text-alert").text("Te faltan recursos para realizar la investigación.");
                $(".img-alert").attr("src","images/recursos/suministros.png");
                $(".alert-general").fadeIn();
        } 
    });


    



     /*****************FIN EVENTOS INVESTIGACIONES*****************************************/
    
        $('[data-toggle="popover"]').popover(); 

        /* EXPEDICIONES */
        //la primera carga comprobamos los botones de sumar y restar para cada tropa
        buttons_sum_res(); 





});

function comprobarNotificaciones(){
    /*NOTIFICACIONES */

        // Las únicas notificaciones que recuperamos de la BD son aquellas que pertenecen al usuario y
        // todavía no ha marcado como leidas
        var notificaciones = Notificacion.find({usuario:user, leido:"false"}).fetch();
        var cont_notificiaciones = notificaciones.length;
        $("#text-contador-notis").text(cont_notificiaciones);
        $("#divnotificaciones").empty();
        notificaciones.forEach(function(noti){
            
            $("#divnotificaciones").append('<li data-id="' + noti._id + '" class="notificacion"><img class="close-noti" src="/images/close.png" alt="close">'+ noti.descripcion +'</li>');
        });
}

function comprobarPartida(){
    mi_partida = Partida.find({_id:user}).fetch();
}

function comprobarBonos(){
    Bonos = [];
    comprobarPartida();
    
    Bonos.push(mi_partida[0].bono_seguridad);
    Bonos.push(mi_partida[0].bono_habitats);//falta por hacer
    Bonos.push(mi_partida[0].bono_rrpp);//falta por hacer
    Bonos.push(mi_partida[0].bono_logistica);
    Bonos.push(mi_partida[0].bono_liderazgo);
    
    
    return Bonos;
}



function contador(){
     
     ahora = new Date().getTime();
     //controlo la partida antes de mostrar el contador
      part = Partida.findOne({_id:Meteor.userId()});
        
     for(z=0;z<part.desbloqueando.length;z++){
          var final =  part.desbloqueando[z].final;
          

          
            $("#cronometres").append("<div class='divCrono' id='temporitzador" + z + "' style='display:none;'><img id='reloj"+z+"' class='clock' src='/images/clock.gif'><p class='dinobuton-text text-clock' id='crono" + z + "'></p></div>");
             var countDownDate = final;
             
             crearContador('#crono'+z,'#temporitzador'+z,countDownDate);
             
         //$("#cronometres").append("<p class='dinobuton-text dinobuton-text-size' id='crono" + z + "'></p>");
         
     }
}

function crearContador(crono,divCrono,countDownDate){
    var cont=0;
    var x=[];
    x[cont] = setInterval(function() {
         
        var now = new Date().getTime();  
        var distance = countDownDate - now;

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

         
         $(crono).text(days + "d " + hours + "h "
         + minutes + "m " + seconds + "s ");
        
         $(divCrono).fadeIn();
        
        if (distance < 0) {
            //borra elementos del DOM que posteriormente se volveran a insertar
            $(crono).detach();
            $(divCrono).fadeOut();
            $(divCrono).remove();
            $(crono).remove();
            $(crono).empty();
            clearInterval(x[cont]);
            cont=0;
        }
    }, 1000);

    cont++;
}


function mensajeTutorial(id){
   // Session.set('numTutorial', id);
   partida = Partida.findOne({});
   var tutorialActual = {"id":0,"descripcion":""};

    var renovacionTutoriales = [];
   partida.tutorial.forEach(function(tuto,i){
        if(id==tuto.id&&tuto.visto==false){
            tuto.visto=true;
            tutorialActual = {"id":tuto.id,
                            "descripcion":tuto.descripcion,
                            "visto":tuto.visto};
            
            $('.tutorial').show();
            $('.text-tutorial').empty();

            $('.text-tutorial').append(tutorialActual.descripcion);
            if(id==1){
                 $('.botonelli').append('<button type="button" class="btn pmd-ripple-effect btn-default btn_modal crear botones">Crear Oficina Central</button>');
            }
            
            
        }
        renovacionTutoriales.push(tuto);
   });

   Partida.update({_id:user},{$set:{tutorial:renovacionTutoriales}});

}




   
   
     