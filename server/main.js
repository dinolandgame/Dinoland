import { Meteor } from 'meteor/meteor';

Meteor.methods({
  sendVerificationLink() {
    let userId = Meteor.userId();    	

    if ( userId ) {
      return Accounts.sendVerificationEmail( userId );
    }
  },
  //methodo creacion partida
  crear_partida(){
    
     user= Meteor.userId();
     Partida.insert({_id:user,
                      dinero:100,
                      energia:20,
                      suministros:50,
                      visitantes:10,
                      edificio:[1,101]}); 
       
       /*{
    _id:1,
    nom:"Edificio Administración",
    nivel:1,
    costeEnergia:0,
    costeConstrución:200,
    descripcion:"descripcion edificio",
    avatar:"images/logo.png"
  
}*/
  },
  sumardinero(){
    user= Meteor.userId();
    

    Partida.update({_id:user},{ $inc:{dinero:1}});
  },
 update_part(tiempo,EdificiUp,edificiid){
     // user= Meteor.userId();
      //Partida.update({ _id:user, edificio: obj1 } , { $set: { "edificio.$" : obj2 } } );

      var result = false;
      user = Meteor.userId();
      var data = new Date();
      data.setSeconds(data.getSeconds()+tiempo);
      //console.log(data.toString());
      //EdificiUp = Edificio.findOne({nom:edifici.nom,nivel:(edifici.nivel+1)});
      //console.log("id_usuari: "+ user +", edifici: "+ edifici._id);
      //console.log("eldifi que obtindra el objecte partida: NOm: "+ EdificiUp.nom + ",nivel: "+ EdificiUp.nivel);

      //console.log("user: " + user + ", edifici ac: "+ edifici.id + ", "+  EdificiUp.id);


      SyncedCron.start();

      SyncedCron.add({
      name: user +"_"+EdificiUp.nom+"_"+EdificiUp.nivel,
      schedule: function(parser) {
        
        console.log("ha entrat a la data");
        console.log(parser.recur().on(data).fullDate());
        return parser.recur().on(data).fullDate();
      },
      job: function() {
        console.log("ha entrat en el job");
        if(EdificiUp != null){
        Partida.update(
           { _id:user, edificio: edificiid },
           { $set: { "edificio.$" : EdificiUp._id } }
        );

        console.log("edifici modificat");
        //Meteor.call('update_part', this._id,EdificiUp._id);
        //console.log(this._id+" -- "+ EdificiUp._id);
        }else{
          console.log("auet edifici ja esta en el seu maxim nivell");
        }
        //SyncedCron.remove(user+"_"+EdificiUp.nom+"_"+EdificiUp.nivel);
        //return user+"_"+EdificiUp.nom+"_"+EdificiUp.nivel;
      // result = true; 

        //phaserEdifici.destroy();
        //game.state.restart();
      }
      });
   
    //return result;

  }/*,
    update(){
    console.log("subir nivel");
            //console.log(this);
            Edifici = Edificio.find({nom:this.nom,}).fetch();//busco los edicios; falta saber que edificio es el seleccionado
            
            EdificiUp = Edificio.find({nom:Edifici.nom,nivel:(Edifici.nivel+1)}).fetch();
            console.log(Edifici.key);
            //EdificiUp = Edifici.find({});
            if(EdificiUp != null){
                
            Meteor.call('update_part', Edifici._id,EdificiUp._id);
                    
            Edifici.key.destroy();
            EdificiUp.key = game.add.sprite(EdificiUp.posicionX,EdificiUp.posicionY,EdificiUp.key);
            EdificiUp.key.scale.setTo(EdificiUp.escalaX,EdificiUp.escalaY);
                
                alert("se ha subido de nivel");
            
            }else{
                console.log("aquet edifici ja esta en el seu maxim nivell");
            }
    }/*,
    creando_casas(){
        user= Meteor.userId();     

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
    }*/
  

});

Meteor.startup(() => {
  // code to run on server at startup

  process.env.MAIL_URL = "smtp://postmaster%40sandbox8368add522ff48f499f2947ee132de90.mailgun.org:a580db119fe98417965ca8c0dcacd1f2@smtp.mailgun.org:587";
//process.env.MAIL_URL="smtp://dinolandgame%40gmail.com:huevo2016@smtp.gmail.com:587/"; 

 
Accounts.emailTemplates.siteName = "Dinoland";
Accounts.emailTemplates.from     = "Dinoland <dinolandgame@gmail.com>";

Accounts.emailTemplates.verifyEmail = {
  subject() {
    return "[Dinoland] Verificación de correo electrónico";
  },
  text( user, url ) {
    let emailAddress   = user.emails[0].address,
     urlWithoutHash = url.replace( 'game', '' ),
     supportEmail   = "dinolandgame@gmail.com",
     emailBody      = 'Para verificar tu cuenta de correo '+emailAddress+' visita el seguiente link\n\n'+ urlWithoutHash +' \n\n Si usted no ha solicitado esta verificación, ignore este correo electrónico. Si cree que algo está mal, comuníquese con nuestro equipo de soporte técnico: '+ supportEmail;
     
    return emailBody;
  }
};



});

/*Email.send({
	to: "xvicente2000@gmail.com",
  from: "dinolandgame@gmail.com",
  subject: "Example Email",
  text: "The contents of our email in plain text.",
});*/

  