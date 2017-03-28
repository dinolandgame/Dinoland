Juego = function(game){
    
};
 

Juego.prototype = {
    create: function(){ 
        //Lo ideal seria fer una funcio que comprovi el tamany de la pantalla, i aixi sapiga on situar el mapa i com de grans han de ser els bounds.
    this.world.setBounds(-150, -100, 1600, 998); //fem que el mon sigui mes gran que el canvas
    var ground = this.add.sprite(-150, -100, 'mapa'); //coloquem el mapa a la posicio indicada. El punt 0 ,0 és l'origen
        
        //Meteor.call('creando_casas');//marca error des de server error [500]
        user = Meteor.userId();     
        
        var mi_partida = Partida.find({_id:user}).fetch();//obtengo un array de las partida del usuario siempre sera 1 por user
        var edificios = Edificio.find().fetch(); //obtengo un array con todos los edificios
        

        edificios.forEach(function(edif){//recorremos la coleccion Edifcios 
            
            //console.log("Title of post " + edif._id); 
            mi_partida.forEach(function (partida) {//recorremos la coleccion Partida buscada por id del usuari
                
            misedificiosEnPartida = partida.edificio;//se crea un array con los id de edificios
                
                for(var i= 0; i<=misedificiosEnPartida.length; i++){//bucle para los edificios en array de partida
                    if(edif._id==misedificiosEnPartida[i]){//si coincide con los edificios del array de partida
                        console.log("Title of post " + edif.key);
                    
                    //añadimos el objeto de phaser  con su posicion y su scala tambien sus propiedades  
                    edif.key = game.add.sprite(edif.posicionX,edif.posicionY,edif.key); 
                    edif.key.scale.setTo(edif.escalaX,edif.escalaY);
                    afegirPropietatsSprite(edif.key);
                    }   
                }                                    
            });            
        });
        
        
    /*clan1 = this.add.sprite(200,430,'clan1');
    bar1 = this.add.sprite(330,490,'bar1');
    magatzem1 = this.add.image(670,270,'magatzem1');
    hotel1 = this.add.image(170,270,'hotel1');
    laboratori1 = this.add.image(1000,270,'laboratori1');
    
    bar1.scale.setTo(0.20,0.20);
    clan1.scale.setTo(0.20,0.20);
    magatzem1.scale.setTo(0.15,0.15);
    hotel1.scale.setTo(0.15,0.15);
    laboratori1.scale.setTo(0.15,0.15); 
    
    afegirPropietatsSprite(bar1);
    afegirPropietatsSprite(clan1);
    afegirPropietatsImatge(magatzem1);
    afegirPropietatsSprite(hotel1);
    afegirPropietatsSprite(laboratori1);*/ 

    },
    

    update:function(){
        move_camera_by_pointer(this.input.mousePointer);
        move_camera_by_pointer(this.input.pointer1);

    }
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
   // $.ionSound.play("button_tiny"); 
    $('#pop_sintetizador').modal('show');
    phaserEdifici= edifici;
    quinedifici = edifici.key;
    $('#nom_edifici').text(quinedifici); 
    //obtenerDatos(quinedifici);  
    
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

