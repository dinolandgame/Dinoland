Juego = function(game){
    
};
 

Juego.prototype = {
    create: function(){ 
        //Lo ideal seria fer una funcio que comprovi el tamany de la pantalla, i aixi sapiga on situar el mapa i com de grans han de ser els bounds.
    this.world.setBounds(-150, -100, 1600, 998); //fem que el mon sigui mes gran que el canvas
    var ground = this.add.sprite(-150, -100, 'mapa'); //coloquem el mapa a la posicio indicada. El punt 0 ,0 és l'origen

    clan1 = this.add.sprite(550,400,'clan1');
    bar1 = this.add.sprite(350,400,'bar1');
        bar1.scale.setTo(0.3,0.3);
        clan1.scale.setTo(0.3,0.3);

    
    bar1.animations.add('run');
    bar1.animations.play('run', 10, true);
    bar1.inputEnabled = true;
    bar1.input.pixelPerfectOver = true;
    bar1.input.pixelPerfectClick = true;
    bar1.input.useHandCursor = true;
    bar1.events.onInputOver.add(hover,this);
    bar1.events.onInputOut.add(hoverOff,this);
    bar1.events.onInputDown.add(clicar,this);

    clan1.animations.add('run');
    clan1.animations.play('run', 10, true);
    clan1.inputEnabled = true;
    clan1.input.pixelPerfectOver = true;
    clan1.input.pixelPerfectClick = true;
    clan1.input.useHandCursor = true;
    clan1.events.onInputOver.add(hover,this);
    clan1.events.onInputOut.add(hoverOff,this);
    clan1.events.onInputDown.add(clicar,this);

    
    
    },
    

    update:function(){
        move_camera_by_pointer(this.input.mousePointer);
        move_camera_by_pointer(this.input.pointer1);

    }
}

function hover(edifici){
    edifici.tint = 0xffff00;
}

function hoverOff(edifici){
    edifici.tint = 0xffffff;
}

function clicar(edifici){
   // $.ionSound.play("button_tiny"); 
    $('#pop_sintetizador').modal('show');
    quinedifici = edifici.key;
    $('#nom_edifici').text(quinedifici); 
    obtenerDatos(quinedifici);
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

