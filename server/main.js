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
                      edificio:[1,2]}); 
       
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
    

    Partida.update({_id:user},{ $inc:{dinero:100}});
  },
  suberNivel(id){
    user = Meteor.userId();
    

    Partida.update({_id:user},{ $set:{edificio:[]}});
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



});

/*Email.send({
	to: "xvicente2000@gmail.com",
  from: "dinolandgame@gmail.com",
  subject: "Example Email",
  text: "The contents of our email in plain text.",
});*/

  


