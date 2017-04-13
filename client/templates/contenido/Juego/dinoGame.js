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
         console.log((mi_partida[0].energia > EdificiUp.consumoEnergia)+" ||| "+(mi_partida[0].suministros > EdificiUp.costeSuministros)+ "  ||| " +(mi_partida[0].dinero >EdificiUp.costeDinocoins));
            if(EdificiUp != null && Edifici.nivel<=cuartel && mi_partida[0].energia > EdificiUp.consumoEnergia  && mi_partida[0].suministros > EdificiUp.costeSuministros && mi_partida[0].dinero > EdificiUp.costeDinocoins ){
                
                var dinero = mi_partida[0].dinero - EdificiUp.costeDinocoins;
                var suministros = mi_partida[0].suministros - EdificiUp.costeSuministros;
                var energia = mi_partida[0].energia - EdificiUp.consumoEnergia;


                Partida.update({_id:user},{$set:{dinero:dinero, suministros:suministros, energia:energia }});


                Meteor.call('update_part',EdificiUp,Edifici); 
              //hay que probarlo y saber si hace este if para hacer unpdate tmabien del array de desbloqueados
                    
                alert("se ha subido de nivel");
            }
            else{
        
                console.log("aquet edifici ja esta en el seu maxim nivell o be no hi han recursos suficients");
                alert("no deja");
            }
            $('.modal').modal('hide');
                    
           
        },



    "click .crear":function(event,template){
       
       Partida.update({_id:user},{$push:{edificio:1001}});
        
        /********
        aqui podemos modificar la partida con los edifciios desbloqueados por el primer cuartel 
        pero faltaria controlar cuando se sube de nivel el cuartel (mencionado en la linea.229 
        ************/
        
        Partida.update({_id:user},{$push:{desbloqueados:{$each:[401,501,901,1001]}}});
        
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
        event.preventDefault();
        // Se crea un documento con los datos de la expedición y se guarda en la BD
        var mi_partida = Partida.findOne({_id:user});//obtengo la partidaq dle jugador
        console.log((mi_partida.dinero > costeDC) + "||||" + (mi_partida.suministros > costeSUM));
        if(mi_partida.dinero > costeDC && mi_partida.suministros > costeSUM){
        var dinero = mi_partida.dinero - costeDC;
        var suministros = mi_partida.suministros - costeSUM;
        Partida.update({_id:user},{$set:{dinero:dinero, suministros:suministros}})
        }else{
            alert("te faltan recursos");
        }
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
         
    },
    "click div[data-tipo] button": function(event, template){
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
    
/********************* EVENTOS SONIDOS *********************************************/

"click #btn-sound": function(){
    droplet.play();
    if(cont_sonido % 2 == 0){
         music.mute = true;
         tinny.mute = true;
         droplet.mute = true;
         snap.mute = true;
        $("#btn-sound img").attr("src","/images/ui/mute.png");
    }
    else{
        music.mute = false;
        tinny.mute = false;
         droplet.mute = false;
         snap.mute = false;
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
    "mouseenter .modal-img-edif":function(event,template){
        $(event.target).css({
            'box-shadow':'2px 2px 2px 1px rgba(180,97,0,0.88)',
            'border-color': 'black',
        });

   },

    "mouseleave .modal-img-edif":function(event,template){
        $(event.target).css({'box-shadow':'none','border-color': 'white',});
    },

    "click .div-cuartel": function(event, template){
        $('.btn-lvlup-cuartel').css('display', 'block');
        $('.crearEdificio').css('display', 'none');
        $('#img-cuartel').attr("src", this.avatar);
        $('#desc-cuartel').text(this.descripcion);
        $('#div-costes').css('display', 'none');
    },

      
    /*****************EVENTOS INVESTIGACIONES ****************************************/
    

    "click a#investiga": function(event, template){
        event.preventDefault();
        var $this = $(event.target);
        
        var investigacionId = $($this).data('investigar');
        
        Meteor.call('hacerinvestigacion',investigacionId);
        
        console.log("voy a acabar esta funcion con el crhon");
},

    "click a#expedicion": function(event, template){


        //id = $(this).data('id'); // obtengo el id del edifici
        console.log(this);
       // var investigacion = Investigacion.findOne({_id:this._id});   // obtengo el objecte del edifici que es vol crear         
       var mi_partida = Partida.findOne({_id:user});// obtengo el objecte de partida


        if(mi_partida.dinero > this.coste_DinoCoins && mi_partida.suministros > this.coste_Suministro){
            
            var dinero = mi_partida.dinero - this.coste_DinoCoins;
            var suministros = mi_partida.suministros - this.coste_Suministro;
            
            Partida.update({_id:user},{$set:{dinero:dinero,suministros:suministros}});

            event.preventDefault();
            var $this = $(event.target);
            
            var investigacionId = $($this).data('investigar');
            
            Meteor.call('hacerinvestigacion',investigacionId,bono_logistica);
            
            console.log("voy a acabar esta funcion con el crhon");
        }else{

            alert("faltan recursos");
        } 
    }
    
    /*****************FIN EVENTOS INVESTIGACIONES*****************************************/


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
    edificios: function(){
         var variable=Session.get('key');
       //console.log("Edificio:" + quinedifici);
       //console.log("variable:" + variable);
        return Edificio.find({key: variable});
    },

    edificioTodos: function(){
        return Edificio.find({nivel: 1});
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
    cuartel: function(num1, num2){
        /*var bol=false;
        if(num1==num2){
            bol=true;
        }
        return bol;*/

        if(num1==num2){
            return true;
        }else{
            return false;
        }
    },

    investigaciones: function(){
        return Investigacion.find({});

    }

});

/* ON RENDERES ES COMO EL DOCUMENT(READY) */
Template.dinoGame.onRendered(function(){


    cont_sonido = 0;//Variable para controlar el sonido y el mute

    /* VARIABLES GLOBALES PARA EXPEDICIONES */
    
     /* Aumenta en 10 la variable capacidad*/
    
    
    user = Meteor.userId();

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

         
        if( mi_partida.energia > edificiCrear.consumoEnergia  && mi_partida.suministros > edificiCrear.costeSuministros && mi_partida.dinero > edificiCrear.costeDinocoins ){
                
                var dinero = mi_partida.dinero - edificiCrear.costeDinocoins;
                var suministros = mi_partida.suministros - edificiCrear.costeSuministros;
                var energia = mi_partida.energia - edificiCrear.consumoEnergia;


                Partida.update({_id:user},{$set:{dinero:dinero, suministros:suministros, energia:energia }})

             alert("se esta contruyendo");
           
             console.log(this);
            //Partida.update({_id:user},{$push:{edificio:id}});

             Meteor.call('crear_edificio',id);
             $('[data-id='+ id + ']').addClass('no-seleccionable');
         
             $('.prueba2').hide();
        }else{

        alert("falten recursos");

        }
            
        
    });
        $('[data-toggle="popover"]').popover(); 

        /* EXPEDICIONES */
        //la primera carga comprobamos los botones de sumar y restar para cada tropa
        buttons_sum_res(); 

});

function comprobarPartida(){
    mi_partida = Partida.find({_id:user}).fetch();
}

function comprobarBonos(){
    Bonos = [];
    comprobarPartida();
    
    Bonos.push(mi_partida[0].bono_seguridad);
    Bonos.push(mi_partida[0].bono_habitats);
    Bonos.push(mi_partida[0].bono_rrpp);
    Bonos.push(mi_partida[0].bono_logistica);
    Bonos.push(mi_partida[0].bono_liderazgo);
    
    
    return Bonos;
}




