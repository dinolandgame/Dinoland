Juego = function(game){
    
};
 

Juego.prototype = {
    create: function(){ 
        //Lo ideal seria fer una funcio que comprovi el tamany de la pantalla, i aixi sapiga on situar el mapa i com de grans han de ser els bounds.
    this.world.setBounds(-150, -100, 1600, 998); //fem que el mon sigui mes gran que el canvas
    var ground = this.add.sprite(-150, -100, 'mapa'); //coloquem el mapa a la posicio indicada. El punt 0 ,0 és l'origen
    var hotel = this.add.sprite(110,100,'hotel'); //coloquem el hotel a la posicio indicada
    
    var bar1 = this.add.sprite(350,400,'bar1');
    
    bar1.animations.add('run');
    bar1.animations.play('run', 10, true);
    bar1.inputEnabled = true;
    bar1.input.pixelPerfectOver = true;
    bar1.input.pixelPerfectClick = true;
    bar1.input.useHandCursor = true;
    bar1.events.onInputOver.add(hover,this);
    bar1.events.onInputOut.add(hoverOff,this);
    bar1.events.onInputDown.add(clicar,this);
    
    
    hotel.inputEnabled = true;
    hotel.events.onInputOver.add(hover,this);
    hotel.events.onInputOut.add(hoverOff,this);
    hotel.events.onInputDown.add(clicar,this);
    
    //Només agafa el píxel quan es passa per sobre o es clica, la transparencia no
    hotel.input.pixelPerfectOver = true;
    hotel.input.pixelPerfectClick = true;

    //Cursor pointer
    hotel.input.useHandCursor = true;
    
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

