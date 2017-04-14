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
                     bono_seguridad:false,
                     bono_logistica:false,
                     bono_liderazgo:30,
                     bono_habitats:false,
                     bono_rrpp:false,
                     edificio:[],
                    desbloqueados:[],
                    bonos_desbloqueados:[]}); 
      
       
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
         if(EdificiUp.key=="cuartel3"){
            Partida.update({_id:user},{$push:{desbloqueados:{$each:EdificiUp.desbloquea}}});
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
    },
    
     //LÓGICA PARA LA RESOLUCIÓN DE UNA EXPEDICIÓN
    enviar_expedicion(id_expedicion, terreno){
    
    // primera versión sólo recibe terreno como parámetro
    // futura versión recibirá la id a una expedición pendiente de resolución en la tabla expediciones
    console.log("Zona: " + terreno);
    var zona = Terreno.findOne({tipo_terreno:terreno});
    
    // debug func
    console.log("Terreno " + zona.tipo_terreno + ", tarda " + zona.tiempoexpedicion);    
    
    user = Meteor.userId();
    var data = new Date();
    data.setSeconds(data.getSeconds()+zona.tiempoexpedicion);
      
      
    SyncedCron.start();

    SyncedCron.add({
        // el name se cambiará incluyendo la id de la expedición
        // por ahora se incluye el numero de segundos desde Enero 1 1970 como identificación
        name: user +"_"+zona.nombre + "_" + data.getTime().toString(),
        schedule: function(parser) {
        
            console.log("ha entrado en la expedicion");
            //console.log(parser.recur().on(data).fullDate());
            return parser.recur().on(data).fullDate();
        },
        
        job: function(id) {
           
            var expedicion_en_curso = Expedicion.findOne({_id: id_expedicion});
            console.log("id expedición: " + expedicion_en_curso._id);
            console.log("resolucion de la expedicion");
            var report = "";
            
            // FASE PREPARACIÓN
            
            // líder
            var bono_comandante = false;
            var bono_cientifica = false;
            var bono_jefeexplorador = false;
            // elección lider
            var lider = expedicion_en_curso.lider;
            console.log("lider: " + lider);
            switch(lider) {
                case "cientifica":
                    bono_cientifica = true;
                    break;
                case "comandante":
                    bono_comandante = true;
                    break;
                default:
                    bono_jefeexplorador = true;
            }
            // logística
            var bono_jeep = expedicion_en_curso.jeep;
            var bono_lanzarredes = expedicion_en_curso.lanzaredes;
            var cantidad_miembros = expedicion_en_curso.miembros;
            // FASE DE EXPLORACIÓN
                       
            // Se realiza una tirada de exploración
            var tirada = getRndInteger(1, 100);
            console.log("Exploracion. Tirada: " + tirada);
            
            // Se obtiene todos los tipos de dinosaurios que se pueden encontrar en ese habitat
            dinosaurios_disponibles = Dinosaurio.find({habitat: zona.tipo_terreno}).fetch();
            dinosaurio_especial = Dinosaurio.findOne({habitat: "especial"});
            
            // debug
            for (xyz=0; xyz < dinosaurios_disponibles.length; xyz++){
                
                console.log("Dino : " + dinosaurios_disponibles[xyz].nombre);
            }
            var longitud = dinosaurios_disponibles.push(dinosaurio_especial);
            console.log("longitud: " + longitud);
            var encuentro = getRndInteger(0, longitud-1);
            console.log("rnd encuentro: " + encuentro);
            var dinosaurio_rastreado = dinosaurios_disponibles[encuentro];
            console.log("dino rastreado: " + dinosaurio_rastreado.nombre);
            report += "La expedición rastreó marcas de " + dinosaurio_rastreado.nombre;
             // BONOS EXPLORACION
            if (bono_jeep=="true"){
                tirada += 30;
                console.log("jeep : " + tirada);
            }
            
            if (dinosaurio_rastreado.habitat=="especial" && bono_cientifica==true){ 
                tirada += 30;
                console.log("cientifica : " + tirada);
            }
            
            tirada += cantidad_miembros*2;
            console.log("bono_cantidad : " + tirada);
            
            // Resolución de la fase exploración
           
            console.log("tirada modificada: " + tirada);
            var dificultad = 100 - dinosaurio_rastreado.encuentro;
            if (tirada >= dificultad){
                // Se ha encontrado dinosaurios
                var cantidad = Math.ceil((tirada - dificultad)/10);
                console.log("Se ha encontrado " + cantidad + " "  + dinosaurio_rastreado.nombre);
                report+=" Se encontró una manada de " + cantidad + " "  + dinosaurio_rastreado.nombre;
                
                // FASE DE CAPTURA
            
            var efectividad = expedicion_en_curso.efectividad;
            var salud = expedicion_en_curso.salud;
            console.log("efectividad: " + efectividad + " salud " + salud);
            console.log("ferocidad dino " + dinosaurio_rastreado.ferocidad);
            var peligrosidad = dinosaurio_rastreado.ferocidad * cantidad;
            console.log("Peligrosidad = " + peligrosidad);
            
            // tirada de captura
            tirada = getRndInteger(1, 100);
            console.log("Tirada de captura = " + tirada);
            if (dinosaurio_rastreado.habitat=="aereo" && bono_lanzarredes=="true"){ 
                tirada += 30;
                console.log("lanzarredes : " + tirada);
            }
            var margen = salud - peligrosidad;
            if (margen < 0){
                // la expedición no está capacitada para ese encuentro y recibe malus
                tirada += margen;
            }else{
                // la expedición está bien equipada para la cacería
                tirada*=1.5;
            }
            capturas = tirada / dinosaurio_rastreado.ferocidad;
            if (capturas > cantidad){
                capturas = cantidad;
            }
            console.log("capturas = " + capturas);
            // si el lider es un jefe explorador se mejora la cantidad de capturas
            if(bono_jefeexplorador==true){
                // que nunca puede exceder la cantidad de la manada localizada
                if(capturas < 0){
                    capturas += 1.5;
                }else{
                   var capturas_bonus = capturas + capturas*1.5;
                    if (capturas_bonus > cantidad){
                        capturas = cantidad;
                    }else{
                        capturas += capturas*1.5;
                    } 
                }
                console.log("capturas con jefe = " + capturas);
            }
            capturas_final = Math.floor(capturas);
            if (capturas_final <= 0){
                console.log(" Las presas escaparon. No se ha podido capturar ningun ejemplar.");
                report+=" Desafortunadamente las presas escaparon. No se ha podido capturar ningun ejemplar.";
            }else{
                console.log(" Se ha capturado " + capturas_final + " " + dinosaurio_rastreado.nombre);
                report+="La expedición consiguió capturar " + capturas_final + " " + dinosaurio_rastreado.nombre;
            }
        }else{
            capturas_final = 0;
             report+= " Pero no se logró encontrar una manada.";
        }
            
            
            
            // FASE DE RESOLUCIÖN 
            
            
            // Busqueda de recursos
            // Los recursos encontrados serán proporcionales a los costes de expedición 
            var coste_dinocoins = expedicion_en_curso.coste_dinocoins;
            var coste_suministros= expedicion_en_curso.coste_suministros;
            
            var dinocoins_extra = 0;
            var suministros_extra =0;
            var ambar_extra = 0;
            
            tirada = getRndInteger(1, 100);
            var aleatorio = getRndInteger(1, 100);
            if (bono_comandante==true){
                tirada += 20;
            }
            
            if (tirada <= 20){
                //nada
                console.log("La expedición no reporta ningún beneficio");
                report+=" Adicionalmente no se encontró ningún recurso útil.";
            }else if(tirada <= 40){
                // dinocoins
                dinocoins_extra += (coste_dinocoins/100) * aleatorio;
                console.log("La expedición reporta beneficios por valor de " + dinocoins_extra + " dinocoins");
                report+=" Adicionalmente la expedición reporta beneficios por valor de " + dinocoins_extra + " dinocoins";
            }else if(tirada <= 60){
                // suministros
                suministros_extra += (coste_suministros/100) * aleatorio;
                console.log("La expedición ha encontrado recursos equivalentes a  " + suministros_extra + " suministros");
                report+=" Adicionalmente la expedición ha encontrado recursos equivalentes a  " + suministros_extra + " suministros";
            }else if(tirada <=90){
                // dinocoins y suministros
                dinocoins_extra += (coste_dinocoins/100) * aleatorio;
                aleatorio = getRndInteger(1, 100);
                suministros_extra += (coste_suministros/100) * aleatorio;
                console.log("La expedición encuentra recursos variados que reportan " + dinocoins_extra + " dinocoins y " + suministros_extra + " suministros" );
                report+=" Adicionalmente la expedición encontró recursos variados que reportan " + dinocoins_extra + " dinocoins y " + suministros_extra + " suministros";
            }else{
                // AMBAR!!!
                aleatorio = getRndInteger(1, 3);
                ambar_extra += (coste_dinocoins/100) * aleatorio;
                console.log("La expedición está de suerte y ha encontrado un yacimiento de ambar. Obtienes " + ambar_extra + " ambar!");
                report+=" Adicionalmente la expedición está de suerte y ha encontrado un yacimiento de ambar. Obtienes " + ambar_extra + " ambar!";
            }
            
            
            //Update de la expedición en la BD
            data = new Date();
            var fecha_fin = data.toString();
            Expedicion.update({_id: id_expedicion},{$set:{finalizada:"true", 
                                                          fecha_finalizacion:fecha_fin,
                                                          resultados:[
                                                              {report: report},
                                                              {dinocoins_extra: dinocoins_extra},
                                                              {suministros_extra: suministros_extra},
                                                              {ambar_extra: ambar_extra},
                                                              {dinosaurio: dinosaurio_rastreado.nombre},
                                                              {ejemplares: capturas_final}
                                                          ]}});
            var partida_jugador = Partida.findOne({_id:user});
            var dinocoins = partida_jugador.dinero;
            var suministros = partida_jugador.suministros;
            dinocoins += dinocoins_extra;
            suministros += suministros_extra;
            Partida.update({_id:user},{$set: {dinero: dinocoins, suministros: suministros}});
        }  
          
    });
    },
    
    
    /**************************************CHRON INVESTIGACIONES ****************************************/
    //creacion edificios 1er nivel
    hacerinvestigacion(id){
    Investigacio = Investigacion.findOne({_id:id});
    
    user = Meteor.userId();
    var data = new Date();
    data.setSeconds(data.getSeconds()+Investigacio.tiempo_Min);
      
      //console.log("id_usuari: "+ user +", edifici: "+ edifici._id);
      //console.log("eldifi que obtindra el objecte partida: NOm: "+ EdificiUp.nom + ",nivel: "+ EdificiUp.nivel);

      //console.log("user: " + user + ", edifici ac: "+ edifici.id + ", "+  EdificiUp.id);

    
        //console.log(EdificiUp);
    SyncedCron.start();

    SyncedCron.add({
        name: user +"_"+Investigacio.nom,
        schedule: function(parser) {
        
            console.log("ha entrat a la data");
             
            //console.log(parser.recur().on(data).fullDate());
            return parser.recur().on(data).fullDate();
        },
        
        job: function() {
           
            console.log("ha entrat en el job");
            if(Investigacio._id==1){
                Partida.update({_id:user},{$push:{bonos_desbloqueados:[1]}});
            }
            else if(Investigacio._id==2){
                Partida.update({_id:user},{$push:{bonos_desbloqueados:[2]}});
            }
            else if(Investigacio._id==3){
                Partida.update({_id:user},{$push:{bonos_desbloqueados:[3]}});
            }
            else if(Investigacio._id==4){
                    Partida.update({_id:user},{$set:{bono_logistica:true}});
                     Partida.update({_id:user},{$push:{bonos_desbloqueados:[4]}});
                    
                    console.log("investigacio acabada!!");
                }else if(Investigacio._id==5){
                    Partida.update({_id:user},{$inc:{bono_liderazgo:10}});
                     Partida.update({_id:user},{$push:{bonos_desbloqueados:[5]}});
                    console.log("investigacio acabada!!");
                }
           
            
            console.log("investigacio acabada!!");
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
     /* SyncedCron.add({
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

SyncedCron.start();*/
});


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
} 


    
            

/*Email.send({
	to: "xvicente2000@gmail.com",
  from: "dinolandgame@gmail.com",
  subject: "Example Email",
  text: "The contents of our email in plain text.",
});*/

  