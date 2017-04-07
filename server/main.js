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
    //user= Meteor.userId();
    

    //Partida.update({_id:user},{ $inc:{dinero:1}});
  },
 
  update_part(EdificiUp,Edifici){
    
   
    user = Meteor.userId();
    var data = new Date();
    data.setSeconds(data.getSeconds()+EdificiUp.tiempoConstruccion);
      
      //console.log("id_usuari: "+ user +", edifici: "+ edifici._id);
      //console.log("eldifi que obtindra el objecte partida: NOm: "+ EdificiUp.nom + ",nivel: "+ EdificiUp.nivel);

      //console.log("user: " + user + ", edifici ac: "+ edifici.id + ", "+  EdificiUp.id);

    
        //console.log(EdificiUp);
    SyncedCron.start();

    SyncedCron.add({
        name: user +"_"+EdificiUp.nom+"_"+EdificiUp.nivel,
        schedule: function(parser) {
        
            console.log("ha entrat a la data");
            //console.log(parser.recur().on(data).fullDate());
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




  
//SyncedCron.start();
/*    SyncedCron.add({
        name: 'Run in 20 seconds ',
        schedule: function(parser) {
            // parser is a later.parse obje
            return parser.text('every 20 seconds');
        },
        job: function() {
            // do something important here
            console.log("aixo es un missatge de mostra (20)");
            //SyncedCron.remove('Run in 20 seconds only once');
        }
    });*/


//SyncedCron.start();
      SyncedCron.add({
        name: 'Run in 1 seconds dinocoins',
        schedule: function(parser) {
            // parser is a later.parse obje
            return parser.text('every 1 seconds');
        },
        job: function() {
            // do something important here
            //console.log("aixo es un missatge de mostra (1)");
            //SyncedCron.remove('Run in 20 seconds only once');
            try{
             // if(Meteor.userId() != null){
                //user= Meteor.userId();
                Partida.find().forEach(function(part){
                  var dinocoins = 0;
                  //var comida = 0;
                  var suministros = 0;
                  //console.log(part.edificio[0],part.edificio[1]);
                  part.edificio.forEach(function(num){
                    //console.log(num);
                    //if(num=="1001" || num=="1002" !! num=="1003"){
                     edificio = Edificio.findOne({"_id":num});
                     console.log ("dinocoins: " + edificio.dinoCoins/60 );
                     dinocoins = edificio.dinoCoins/60;
                     //comida = edificio.comidaDino/60;
                     suministros = edificio.Suministros/60;
                    //}
                  })


                  Partida.update({_id:part._id},{ $inc:{dinero:dinocoins, suministros:suministros}})
                });
                
             // }
            }catch(e){

              console.log("error: "+e.message);
            }
        }
    });

//SyncedCron.start();
      SyncedCron.add({
        name: 'Run in 1 minute',
        schedule: function(parser) {
            // parser is a later.parse obje
            return parser.text('every 1 minute');
        },
        job: function() {
            // do something important here
            console.log("aixo es un missatge de mostra 1 minute");
            //SyncedCron.remove('Run in 20 seconds only once');
        }
    });

SyncedCron.start();
});

/*Email.send({
	to: "xvicente2000@gmail.com",
  from: "dinolandgame@gmail.com",
  subject: "Example Email",
  text: "The contents of our email in plain text.",
});*/

  