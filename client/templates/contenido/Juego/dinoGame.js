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

    "click #subirlvl": function(){
            console.log("subir nivel");
            //console.log(this);
            EdificiUp = Edificio.findOne({nom:this.nom,nivel:(this.nivel+1)});
            
            //EdificiUp = Edifici.find({});
            if(EdificiUp != null){
                //console.log(EdificiUp);

                /*Partida.update(
                   { _id:Meteor.user()._id, edificio: this.id },
                   { $set: { "edificio.$" : EdificiUp } }
                )*/
                    Meteor.call('update_part', Edifici._id,EdificiUp._id);
                    //console.log(this._id+" -- "+ EdificiUp._id);
                alert("se ha subido de nivel");
            
            }else{
                console.log("aquet edifici ja esta en el seu maxim nivell");
            }

            $('.modal').modal('hide');
            clan1.destroy();
            clan2 = game.add.sprite(550,400,'clan2');
            clan2.scale.setTo(0.3,0.3);

        },
    
    /*,
    "click #medals_despl":function(event,template){
   
        $('#sidebar_medals').css({"margin-left": "80%"});
    }*/
	
        
 }); 

/*
$(document).ready(function(){
    
    ion.sound({
    sounds: [
        {name: "beer_can_opening"},
        {name: "bell_ring"},
        {name: "snap"},
        {name: "button_tiny"}
    ],

    // main config
    path: "/sounds/",
    preload: true,
    multiplay: true,
    volume: 0.6
});
    
   $('#btn_desplegar').click(function(){
        $('#btn_desplegar').hide();
        $('#user').fadeOut(500);
        $.ionSound.play("snap");
        $('#sidebar').addClass("sombra_sidebar");
        $('#sidebar').animate({"left": "16.66666667%"}, "slow"); 
        $('#btn_plegar').show();
   });
    
   $('#btn_plegar').click(function(){
        $.ionSound.play("snap");
        $('#btn_plegar').hide();
        $('#sidebar').animate({"left": "0%"}, "slow");
        $('#sidebar').removeClass("sombra_sidebar");
        $('#user').fadeIn(500);
        $('#btn_desplegar').show();
   });
    
    $('#user').click(function(){
        $('#btn_desplegar').hide();
        $('#user').fadeOut(500);
        $.ionSound.play("snap");
        $('#sidebar').addClass("sombra_sidebar");
        $('#sidebar').animate({"left": "16.66666667%"}, "slow"); 
        $('#btn_plegar').show();
    });
    
    $('#medals_despl').click(function(){
        $('#sidebar_medals').css({"margin-left": "80%"});
    });
    
    $('#btn_expediciones').click(function(){
        $.ionSound.play("button_tiny"); 
    });
    
    $('#btn_tienda').click(function(){
        $.ionSound.play("button_tiny"); 
    });
    
    $('#btn_social').click(function(){
        $.ionSound.play("button_tiny"); 
    });
    
    $('.recursos').click(function(){
        $.ionSound.play("button_tiny"); 
    });
    
    
});
*/

