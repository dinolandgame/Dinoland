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
 
  update_part(quinedifici){
    Edifici = Edificio.findOne({key:quinedifici});//busco los edicios; falta saber que edificio es el seleccionado
            
    EdificiUp = Edificio.findOne({nom:Edifici.nom,nivel:(Edifici.nivel+1)});
   
    user = Meteor.userId();
    var data = new Date();
    data.setSeconds(data.getSeconds()+Edifici.tiempoConstruccion);
      
      //console.log("id_usuari: "+ user +", edifici: "+ edifici._id);
      //console.log("eldifi que obtindra el objecte partida: NOm: "+ EdificiUp.nom + ",nivel: "+ EdificiUp.nivel);

      //console.log("user: " + user + ", edifici ac: "+ edifici.id + ", "+  EdificiUp.id);

    if(EdificiUp != null){
        //console.log(EdificiUp);
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
        

            Partida.update(
               { _id:user, edificio: Edifici._id },
               { $set: { "edificio.$" : EdificiUp._id } }
            );
            
            /*Partida.update(
               { _id:"zC27EwRQnrHgcuZz8", edificio: 1 },
               { $set: { "edificio.$" : 2} }
            );*/

            console.log("edifici modificat");
           
            
        }  
          
    });
    }
    else{
        
        console.log("aquet edifici ja esta en el seu maxim nivell");
            
    }
        //SyncedCron.remove(user+"_"+EdificiUp.nom+"_"+EdificiUp.nivel);
        //return user+"_"+EdificiUp.nom+"_"+EdificiUp.nivel;
      // result = true; 

        //phaserEdifici.destroy();
        //game.state.restart();
     

  }

  

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

SyncedCron.start();

    /*SyncedCron.add({
        name: 'Run in 20 seconds only once',
        schedule: function(parser) {
            // parser is a later.parse object
            return parser.text('every 1 seconds');
        },
        job: function() {
            // do something important here
            console.log("aixo es un missatge de mostra");
            //SyncedCron.remove('Run in 20 seconds only once');
        }
    });*/

});

/*Email.send({
	to: "xvicente2000@gmail.com",
  from: "dinolandgame@gmail.com",
  subject: "Example Email",
  text: "The contents of our email in plain text.",
});*/

  