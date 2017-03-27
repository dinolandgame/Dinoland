Juego = function(game){
    
};
 

Juego.prototype = {
    create: function(){ 
        //Lo ideal seria fer una funcio que comprovi el tamany de la pantalla, i aixi sapiga on situar el mapa i com de grans han de ser els bounds.
    this.world.setBounds(-150, -100, 1600, 998); //fem que el mon sigui mes gran que el canvas
    var ground = this.add.sprite(-150, -100, 'mapa'); //coloquem el mapa a la posicio indicada. El punt 0 ,0 és l'origen

    clan1 = this.add.sprite(200,430,'clan1');
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
    afegirPropietatsSprite(laboratori1);

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

function afegirPropietatsImatge(edifici){
    edifici.inputEnabled = true;
    edifici.input.pixelPerfectOver = true;
    edifici.input.pixelPerfectClick = true;
    edifici.input.useHandCursor = true;
    edifici.events.onInputOver.add(hover,this);
    edifici.events.onInputOut.add(hoverOff,this);
    edifici.events.onInputDown.add(clicar,this);
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

