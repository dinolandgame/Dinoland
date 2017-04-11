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
                      dinero:1000,
                      energia:200,
                      suministros:200,
                      visitantes:0,
                      edificio:[],
                        desbloqueados:[]}); 
       
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

  cambioTienda(dineroRestante, suministrosTotales){
    console.log(suministrosTotales);
    Partida.update({_id:Meteor.userId()},{$set: {dinero: dineroRestante, suministros: suministrosTotales}});
    console.log("Ha entrado");
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
        

            Partida.update({ _id:user, edificio: Edifici._id },{ $set: { "edificio.$" : EdificiUp._id}});
            
            
            if(EdificiUp.key=="cuartel2"){
                        Partida.update({_id:user},{$push:{desbloqueados:{$each:EdificiUp.desbloquea}}});
                    }
                    else if(EdificiUp.key=="cuartel3"){
                        Partida.update({_id:user},{$push:{desbloqueados:{$each:[EdificiUp.desbloquea]}}});
                    }

            console.log("edifici modificat");            
        }  
          
    });
    },
    //creacion edificios 1er nivel
    crear_edificio(id){
    Edifici = Edificio.findOne({_id:id});
   
    user = Meteor.userId();
    var data = new Date();
    data.setSeconds(data.getSeconds()+Edifici.tiempoConstruccion);
      
      //console.log("id_usuari: "+ user +", edifici: "+ edifici._id);
      //console.log("eldifi que obtindra el objecte partida: NOm: "+ EdificiUp.nom + ",nivel: "+ EdificiUp.nivel);

      //console.log("user: " + user + ", edifici ac: "+ edifici.id + ", "+  EdificiUp.id);

    
        //console.log(EdificiUp);
    SyncedCron.start();

    SyncedCron.add({
        name: user +"_"+Edifici.nom,
        schedule: function(parser) {
        
            console.log("ha entrat a la data");
            //console.log(parser.recur().on(data).fullDate());
            return parser.recur().on(data).fullDate();
        },
        
        job: function() {
           
            console.log("ha entrat en el job");
        

            Partida.update({_id:user},{$push:{edificio:id}});
                
            
            
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
            return parser.text('every 50 seconds');
        },
        job: function() {
                     // do something important here
            //console.log("aixo es un missatge de mostra (1)");
            //SyncedCron.remove('Run in 20 seconds only once');
            try{
             // if(Meteor.userId() != null){
                //user= Meteor.userId();
                Partida.find().forEach(function(part){  
                  var sum_maxim = 240;
                  var coins_maxim = 1800;

                  var dinero = part.dinero;
                  var suministros = part.suministros;
                  var almacen = 0;
                  part.edificio.forEach(function(num){
                    
                    var edificio  = Edificio.findOne({"_id":num});

                    if(num==401 || num==402 || num==403){
                      almacen = num;
                    }

                    dinero += Math.ceil(edificio.dinoCoins/60);
                    suministros += Math.ceil(edificio.Suministros/60);

                  });
                  


                  if(almacen > 400){
                    var edif_almacen  = Edificio.findOne({"_id":almacen});
                    sum_maxim = edif_almacen.max_sum;
                    coins_maxim = edif_almacen.max_dinocoins;
                  }

                  if(suministros > sum_maxim){
                    suministros = sum_maxim;
                  }


                  if(dinero > coins_maxim){
                    dinero = coins_maxim;
                  }

                  Partida.update({_id:part._id},{$set:{dinero:dinero, suministros:suministros}})


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

  