Juego = function(game){
    
};
 

Juego.prototype = {
    create: function(){ 
        //Lo ideal seria fer una funcio que comprovi el tamany de la pantalla, i aixi sapiga on situar el mapa i com de grans han de ser els bounds.
    this.world.setBounds(-75, -50, 1440, 898.2); //fem que el mon sigui mes gran que el canvas
    var ground = this.add.sprite(-75, -50, 'mapa'); //coloquem el mapa a la posicio indicada. El punt 0 ,0 és l'origen
    
        
        //Meteor.call('creando_casas');//marca error des de server error [500]
        user = Meteor.userId();     
        
        var mi_partida = Partida.find({_id:user}).fetch();//obtengo un array de las partida del usuario siempre sera 1 por user
        var edificios = Edificio.find().fetch(); //obtengo un array con todos los edificios
        
        // El edificio habitat para un mismo nivel puede tener diferentes sprites según lo lleno que esté
        // se recorre el array para calcular el total de dinosaurios
                    var keyHabitat;
                    var cantidadActualdinos = 0;
                    var dinos =  mi_partida.dinos;           
        
                    dinos.forEach(function(dino){
                        cantidadActualdinos +=dino.cantidad;
                    }); 
                    // y se compara con el atributo max_dinosaurios, que marca el límite de
                    // cada uno de los tres habitats del edificio
                    // según el valor se asigna un sprite diferente al edificio de habitats nivel 1
                    if (cantidadActualdinos==0){
                        // habitat vacio
                        keyHabitat = 'habitats1';
                        
                    }else if(cantidadActualdinos>=1){          
                        // habitat medio lleno
                        keyHabitat = 'habitatsemiple';
                    }else if(cantidadActualdinos>(partida_jugador.max_dinosaurios)){
                        // habitat muy lleno
                        keyHabitat = 'habitatple';    
                    }
                    
                    
        
        edificios.forEach(function(edif){//recorremos la coleccion Edifcios 
            
            //console.log("Title of post " + edif._id); 
            mi_partida.forEach(function (partida) {//recorremos la coleccion Partida buscada por id del usuari
                
            misedificiosEnPartida = partida.edificio;//se crea un array con los id de edificios
                
                for(var i= 0; i<=misedificiosEnPartida.length; i++){//bucle para los edificios en array de partida
                    if(edif._id==misedificiosEnPartida[i]){//si coincide con los edificios del array de partida
                        //console.log("Title of post " + edif.key);
                    
                    //añadimos el objeto de phaser  con su posicion y su scala tambien sus propiedades  
                                        
                    if(edif._id==1101){
                        // si se trata del habitat nivel 1 su sprite no tiene porque coincidir con su key
                        edif.key = game.add.sprite(edif.posicionX,edif.posicionY,keyHabitat); 
                    }else{
                        edif.key = game.add.sprite(edif.posicionX,edif.posicionY,edif.key); 
                    }    
                    
                    edif.key.scale.setTo(edif.escalaX,edif.escalaY);
                    afegirPropietatsSprite(edif.key);
                        
                    }   
                }  
                
                
            });            
        });

        
        /* EFECTOS SONIDO */
        tinny = game.add.audio('tinny');
        droplet = game.add.audio('droplet');
        snap = game.add.audio('snap');
        bell = game.add.audio('bell');
        
        
        $('#content-juego').show();
        
        //controlamos si no hay edificios en el array de edificios en la coleccion partida
        if(mi_partida[0].edificio.length===0){
                    console.log("no tengo edificios");
                    mensajeTutorial(1);
                    
                }
        
        const cursor = Partida.find({_id:user});
        const cambiar_nivel = cursor.observeChanges({
            changed(id,fields){
                console.log(fields);
                console.log(fields.edificio);
                if(fields.hasOwnProperty('edificio')){
                    game.state.restart();
                    bell.play();
                    comprobarNotificaciones();
                    $(".side-collapse").addClass('open'); 

                   
                    if(fields.edificio.includes(201)){
                        mensajeTutorial(5);
                    }
                    if(fields.edificio.includes(701)){
                        mensajeTutorial(6);
                    }
                    if(fields.edificio.includes(1101)){
                        mensajeTutorial(4);
                    }
                    if(fields.edificio.length>=2){
                        mensajeTutorial(3);
                    }
                    
                    
                }

                if(fields.hasOwnProperty('expediciones')){
                    bell.play();
                    comprobarNotificaciones();
                    $(".side-collapse").addClass('open');
                }

                if(fields.hasOwnProperty('bonos_desbloqueados')){
                    bell.play();
                    comprobarNotificaciones();
                    $(".side-collapse").addClass('open');
                }

                               
                // cualquier cambio en el array dinos dispara este código
                // ya que los cambios no son solo a causa de una expedición sino también por
                // disminución de dinosaurios al escaparse
                if(fields.hasOwnProperty('dinos')){
                    
                    // y se reinicia el juego
                    // ya que todos los cálculos para determinar el sprite apropiado se efec
                    game.state.restart();
                    
                }

                
            }
        });



        ground.scale.setTo(0.90,0.90);

        /*cuartel1 = this.add.sprite(405,128,'cuartel1');
        cuartel1.scale.setTo(0.60,0.60);

        hotel1 = game.add.image(660,90,'hotel1');
        hotel1.scale.setTo(0.80,0.80);

        magatzem1 = game.add.image(630,240,'magatzem1');
        magatzem1.scale.setTo(0.65,0.65);

        seguretat1 = game.add.image(825,375,'seguretat1');
        seguretat1.scale.setTo(0.65,0.65);

        energia1 = game.add.image(270,160,'energia1');
        energia1.scale.setTo(0.80,0.80);

        habitats1 = game.add.image(390,330,'habitats1');
        habitats1.scale.setTo(0.60,0.60);

        sintetizador1 = game.add.image(880,150,'sintetizador1');
        sintetizador1.scale.setTo(0.60,0.60);

        laboratori1 = game.add.image(840,150,'laboratori1');
        laboratori1.scale.setTo(0.60,0.60);

        trade1 = game.add.image(1040,425,'trade1');
        trade1.scale.setTo(0.70,0.70);

        port1 = game.add.image(730,480,'port1');
        port1.scale.setTo(0.55,0.55);*/

        /*cuartel2 = this.add.sprite(405,102,'cuartel2');
        cuartel2.scale.setTo(0.60,0.60);*/

        /*cuartel3 = this.add.sprite(415,125,'cuartel3');
        cuartel3.scale.setTo(0.60,0.60);

        /*hotel2 = game.add.image(630,60,'hotel2');
        hotel2.scale.setTo(0.50,0.50);*/

        /*hotel3 = game.add.image(630,20,'hotel3');
        hotel3.scale.setTo(0.50,0.50);*/

        /*magatzem2 = game.add.image(650,270,'magatzem2');
        magatzem2.scale.setTo(0.90,0.90);*/

        /*magatzem3 = game.add.image(650,270,'magatzem3');
        magatzem3.scale.setTo(0.90,0.90);*/

        /*seguretat2 = game.add.image(820,340,'seguretat2');
        seguretat2.scale.setTo(0.70,0.70);*/

        /*seguretat3 = game.add.image(820,350,'seguretat3');
        seguretat3.scale.setTo(0.70,0.70);*/

        /*energia2 = game.add.image(270,240,'energia2');
        energia2.scale.setTo(0.90,0.90);*/

        /*energia3 = game.add.image(270,240,'energia3');
        energia3.scale.setTo(0.90,0.90);*/

        /*habitats2 = game.add.image(370,325,'habitats2');
        habitats2.scale.setTo(0.80,0.80);*/

        /*habitats3 = game.add.image(370,325,'habitats3');
        habitats3.scale.setTo(0.80,0.80);*/

        /*sintetizador2 = game.add.image(950,160,'sintetizador2');
        sintetizador2.scale.setTo(0.40,0.40);*/

        /*sintetizador3 = game.add.image(950,160,'sintetizador3');
        sintetizador3.scale.setTo(0.40,0.40);*/

        /*trade2 = game.add.image(1030,455,'trade2');
        trade2.scale.setTo(0.70,0.70);*/

        /*trade3 = game.add.image(1030,455,'trade3');
        trade3.scale.setTo(0.70,0.70);*/

        /*laboratori2 = game.add.image(800,150,'laboratori2');
        laboratori2.scale.setTo(0.70,0.70);*/

        /*laboratori3 = game.add.image(800,150,'laboratori3');
        laboratori3.scale.setTo(0.70,0.70);*/

        /*port2 = game.add.image(700,460,'port2');
        port2.scale.setTo(0.60,0.60);*/

        /*port3 = game.add.image(690,460,'port3');
        port3.scale.setTo(0.60,0.60);*/

        /*clan1 = game.add.image(230,365,'clan1');
        clan1.scale.setTo(0.60,0.60);*/

        /*clan2 = game.add.image(230,365,'clan2');
        clan2.scale.setTo(0.60,0.60);*/

        /*clan3 = game.add.image(230,365,'clan3');
        clan3.scale.setTo(0.60,0.60);*/

        /*bar1 = game.add.image(320,480,'bar1');
        bar1.scale.setTo(0.60,0.60);*/

        /*bar2 = game.add.image(320,470,'bar2');
        bar2.scale.setTo(0.60,0.60);*/

        /*bar3 = game.add.image(300,470,'bar3');
        bar3.scale.setTo(0.60,0.60);*/


        
        

    },
    

    update:function(){
        move_camera_by_pointer(this.input.mousePointer);
        move_camera_by_pointer(this.input.pointer1);

    }
}

function comprobarNotificaciones(){
    /*NOTIFICACIONES */

        var notificaciones = Notificacion.find({usuario:user, leido:"false"}).fetch();
        var cont_notificiaciones = notificaciones.length;
        $("#text-contador-notis").text(cont_notificiaciones);
        $("#divnotificaciones").empty();
        notificaciones.forEach(function(noti){
            $("#divnotificaciones").append('<li data-id="' + noti._id + '" class="notificacion"><img class="close-noti" src="/images/close.png" alt="close">'+ noti.descripcion +'</li>');
        });
}

function afegirPropietatsSprite(edifici){
    edifici.animations.add('run');
    edifici.animations.play('run', 10, true);
    edifici.inputEnabled = true;
    edifici.input.pixelPerfectOver = true;
    edifici.input.pixelPerfectClick = true;
    edifici.input.useHandCursor = true;
    edifici.events.onInputOver.add(hover,this);
    edifici.events.onInputOut.add(hoverOff,this);
    edifici.events.onInputDown.add(clicar,this);
}

/*function afegirPropietatsImatge(edifici){
    edifici.inputEnabled = true;
    edifici.input.pixelPerfectOver = true;
    edifici.input.pixelPerfectClick = true;
    edifici.input.useHandCursor = true;
    edifici.events.onInputOver.add(hover,this);
    edifici.events.onInputOut.add(hoverOff,this);
    edifici.events.onInputDown.add(clicar,this);
}*/

function hover(edifici){
    edifici.tint = 0xffff00;
}

function hoverOff(edifici){
    edifici.tint = 0xffffff;
}


function clicar(edifici){
    tinny.play();
   
    phaserEdifici= edifici;
    quinedifici = edifici.key;
  
    Session.set('key', quinedifici);
    switch (quinedifici) {
        //Popup normal
        case 'clan1': case 'clan2': case 'clan3':
        case 'bar1': case 'bar2': case 'bar3':
        case 'energia1': case 'energia2' : case 'energia3':
        case 'sintetizador1': case 'sintetizador2': case 'sintetizador3' :
        case 'port1': case 'port1': case'port2': case 'port3':
        case 'seguretat1': case 'seguretat2': case 'seguretat3':
        case 'hotel1': case 'hotel2': case 'hotel3':
        case 'magatzem1': case 'magatzem2': case 'magatzem3':
        $('#pop_edifici').modal('show');
        break;
        //Popup tienda
        case 'trade1': case 'trade2': case 'trade3':
        $('#pop_tienda').modal('show');
        
        vaciarSuministros();
        vaciarDinero();
        break;
        //Popup habitats
        case 'habitats1': case 'habitats2': case 'habitats3':
        $('#pop_habitats').modal('show');
        
        break;
        //Popup laboratorio
        case 'laboratori1': case 'laboratori2': case 'laboratori3':
        
        $('#pop_laboratorio').modal('show');
        var laboratorio = Edificio.findOne({_id:201});
        console.log(laboratorio);
        $('#img-laboratorio').attr("src", laboratorio.avatar);
        $('#desc-laboratorio').text(laboratorio.descripcion);
        $('.btn-lvlup-laboratorio').css('display', 'block');
        $('#btn-investiga').css('display', 'none');
        $('#div-bono').css('display', 'none');

        break;
        //Popup cuartel
        case 'cuartel1': case 'cuartel2': case 'cuartel3':
        $('#pop_cuartel').modal('show');
            var mi_partida = Partida.find({_id:user}).fetch();
            if(mi_partida[0].edificio.length===1){
                console.log("tengo  1 edificio");
                
                    
            }    
        break;
        default:
        break;
    }
}

var o_mcamera;

function update() {
    move_camera_by_pointer(this.input.mousePointer);
    move_camera_by_pointer(this.input.pointer1);  
}

function move_camera_by_pointer(o_pointer) {
    if (!o_pointer.timeDown) { 
        return; 
    }
    
    if (o_pointer.isDown && !o_pointer.targetObject) {
        if (o_mcamera) {
            game.camera.x += o_mcamera.x - o_pointer.position.x;
            game.camera.y += o_mcamera.y - o_pointer.position.y;
        }
        o_mcamera = o_pointer.position.clone();
    }
    if (o_pointer.isUp) { o_mcamera = null; }
}

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

            $('.text-tutorial').empty();
            
            $('.tutorial').show();
             if(id==1){
                 $('.botonelli').append('<button type="button" class="btn pmd-ripple-effect btn-default btn_modal crear botones">Crear Oficina Central</button>');
            }
            
            
            
        }
        renovacionTutoriales.push(tuto);
   });

   //se hace update de los tutoriales para ver cual se ha visto y evitar entrar en el if anterior 

   Partida.update({_id:user},{$set:{tutorial:renovacionTutoriales}});
    
   $('.text-tutorial').append(tutorialActual.descripcion);
           


}


