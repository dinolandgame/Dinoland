import { Meteor } from 'meteor/meteor';

Meteor.methods({
  sendVerificationLink() {
    let userId = Meteor.userId();    	

    if ( userId ) {
      return Accounts.sendVerificationEmail( userId );
    }
  },
  
  //metodo para guardar los menaje del chat en bd
  guardar_mensaje(mensaje){
    user= Meteor.userId();
    data = new Date();
    ara = data.getDate()+":"+data.getMinutes()+":"+data.getSeconds();
    nom_user = "";
    usuaris  = Meteor.users.find({}).fetch();
    usuaris.forEach(function(us){
        if(user==us._id){
            nom_user=us.username;
        }
    });
    
    var dateFormat = require('dateformat');
    var now = new Date();
    var int=now.getTime();
    var hora = dateFormat(now,"H:MM:ss");
    Chat.insert({_id:Chat.find().count()+1+"",id_user:user,nom_user:nom_user,text:mensaje,timestamp:int,fechaString:hora});
  },

  partidas(){
    var partidas=Partida.find({},{sort:{expediciones:-1}}).fetch();
        
        var partExp=[];
        var topUserExped=[];
        var experesul=[];
        for (var i=0; i<3; i++){
            
            partExp.push(partidas[i]);
            var a= Meteor.users.findOne({_id:partExp[i]._id});

            topUserExped.push(a);
                      
           //console.log("user " + topUserExped);
            var info={
                expe:partExp[i].expediciones,
                name:topUserExped[i].username,
                avatar:topUserExped[i].profile.avatar
            }

            experesul.push(info);
        }

        return result = experesul;
  },
    rankingVisitantes(){
    var partidas=Partida.find({},{sort:{visitantes:-1}}).fetch();
        
        var partExp=[];
        var topUserExped=[];
        var experesul=[];
        for (var i=0; i<3; i++){
            
            partExp.push(partidas[i]);
            var a= Meteor.users.findOne({_id:partExp[i]._id});

            topUserExped.push(a);
                      
           //console.log("user " + topUserExped);
            var info={
                visitantes:partExp[i].visitantes,
                name:topUserExped[i].username,
                avatar:topUserExped[i].profile.avatar
            }

            experesul.push(info);
        }

        return result = experesul;
  },
  rankingAmbar(){
    var partidas=Partida.find({},{sort:{ambar:-1}}).fetch();
        
        var partExp=[];
        var topUserExped=[];
        var experesul=[];

        if(partidas.length>=7){
                for (var i=0; i<7; i++){
                
                partExp.push(partidas[i]);
                var a= Meteor.users.findOne({_id:partExp[i]._id});

                topUserExped.push(a);
                          
               //console.log("user " + topUserExped);
                var info={
                    ambar:partExp[i].ambar,
                    name:topUserExped[i].username,
                    avatar:topUserExped[i].profile.avatar
                }

                experesul.push(info);
            }
        }else{
            for(var i=0; i<partidas.length; i++){
                partExp.push(partidas[i]);
                var a= Meteor.users.findOne({_id:partExp[i]._id});

                topUserExped.push(a);
                          
               //console.log("user " + topUserExped);
                var info={
                    ambar:partExp[i].ambar,
                    name:topUserExped[i].username,
                    avatar:topUserExped[i].profile.avatar
                }

                experesul.push(info);
            }
        }

        return result = experesul;
  },

  //methodo creacion partida
  crear_partida(){
    
     user= Meteor.userId();
     Partida.insert({_id:user,
                      dinero:100000000,
                      energia:200000,
                      suministros:20000000000,
                      visitantes:0,
                      ambar:0,
                      expediciones:0,
                     bono_seguridad:false,
                     bono_logistica:false,
                     bono_liderazgo:30,
                     bono_habitats:false,
                     bono_rrpp:false,
                     max_suministros:240,
                     max_dinero:1800,
                     max_visitantes:10,
                     max_dinosaurios:0,
                     seguridad:0,
                     edificio:[],
                    desbloqueados:[],
                    bonos_desbloqueados:[],
                    dinos:[
                        {id:1,cantidad:0},
                        {id:2,cantidad:0},
                        {id:3,cantidad:0},
                        {id:4,cantidad:0},
                        {id:5,cantidad:0},
                        {id:6,cantidad:0},
                        {id:7,cantidad:0}
                    ],
                   desbloqueando:[]}); 

      
       
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
  
  cambioTienda(dineroRestante, suministrosTotales){
    console.log(suministrosTotales);
    Partida.update({_id:Meteor.userId()},{$set: {dinero: dineroRestante, suministros: suministrosTotales}});
    console.log("Ha entrado");
  },
 
    // INICIO TAREA DE MEJORA DE UN EDIFICIO (SUBIR NIVEL)
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
            
             //quitamos del array de desbloqueando 
 +          Partida.update({_id:user},{$pull:{desbloqueando:{_id:EdificiUp._id}}});
            
            if(EdificiUp.key=="cuartel2"){

                Partida.update({_id:user},{$push:{desbloqueados:{$each:EdificiUp.desbloquea}}});
            }
            else if(EdificiUp.key=="cuartel3"){
                Partida.update({_id:user},{$push:{desbloqueados:{$each:EdificiUp.desbloquea}}});
            }
            else if(EdificiUp._id==1102||EdificiUp._id==1103){//incremento de max dinos en la partida
                Partida.update({_id:user}, {$inc:{max_dinosaurios:EdificiUp.capacidadDino}});
            }
            else if(EdificiUp._id==302||EdificiUp._id==303){//incremento max visitantes por partida
                Partida.update({_id:user}, {$set:{max_visitantes:EdificiUp.max_visitantes}});
            }

            Partida.update({_id:user}, {$inc:{ambar:EdificiUp.ambar}});

            // Se genera una notificación
            Notificacion.insert({usuario: user,
                                 nombre: "mejora edificio",
                                 descripcion: "Ha finalizado la mejora del " + Edifici.nom + " a nivel " + EdificiUp.nivel,
                                 leido: "false"
            });
            console.log("edifici modificat");            
        }  
          
    });
    },
    // FIN MEJORA DE UN EDIFICIO
    
    //TAREA DE CONSTRUCCIÓN DE UN EDIFICIO
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
        
            //añadimos al array de edificio de partida 
            Partida.update({_id:user},{$push:{edificio:id}});
            
            //quitamos del array de desbloqueando 
 +          Partida.update({_id:user},{$pull:{desbloqueando:{_id:id}}});
            
             // Se genera una notificación
            Notificacion.insert({usuario: user,
                                 nombre: "construccion edificio",
                                 descripcion: "Ha finalizado la construcción: " + Edifici.nom,
                                 leido: "false"
            });
          
            if(Edifici._id==401 || Edifici._id==402 || Edifici._id==403){
                    Partida.update({_id:user},{$set:{max_suministros:Edifici.max_sum , max_dinero:Edifici.max_dinocoins}});
            }else if(Edifici._id==301){
                Partida.update({_id:user}, {$set:{max_visitantes:Edifici.max_visitantes}});
            }else if(Edifici._id==801){
                Partida.update({_id:user}, {$set:{seguridad:Edifici.aumento_seguridad}});
            }
            else if(Edifici._id==1101){
                Partida.update({_id:user}, {$inc:{max_dinosaurios:Edifici.capacidadDino}});
                    }
            
            Partida.update({_id:user},{$inc:{ambar:Edifici.ambar}});
            /*Partida.update(
               { _id:"zC27EwRQnrHgcuZz8", edificio: 1 },
               { $set: { "edificio.$" : 2} }
            );*/

            console.log("edifici modificat");   

            

                
                     
        }  
          
    });
    },
    // FIN CONSTRUCCIÓN EDIFICIO NUEVO
    
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
            // Se genera una notificación
            // está incluye un campo con la id_expedicion para poder recuperarla de la BD si interesa por algún motivo (ej: colocar un link a la expedición en la misma label de notificación)
            Notificacion.insert({usuario: user,
                                 nombre: "expedición finalizada",
                                 descripcion: "Ha finalizado la expedición. ¡Buen trabajo!",
                                 leido: "false",
                                 doc_expedicion: id_expedicion
            });
            var partida_jugador = Partida.findOne({_id:user});
            var dinocoins = partida_jugador.dinero;
            var suministros = partida_jugador.suministros;
            dinocoins += Math.ceil(dinocoins_extra);
            suministros += Math.ceil(suministros_extra);

            var sum_maxim = 240;
            var coins_maxim = 1800;
            var almacen = 0;

            partida_jugador.edificio.forEach(function(num){    
                //var edificio  = Edificio.findOne({"_id":num});
                if(num==401 || num==402 || num==403){
                      almacen = num;
                }

            });
                       
              if(almacen > 400){
                var edif_almacen  = Edificio.findOne({"_id":almacen});
                sum_maxim = edif_almacen.max_sum;
                coins_maxim = edif_almacen.max_dinocoins;
              }

              if(suministros > sum_maxim){
                suministros = sum_maxim;
              }


              if(dinocoins > coins_maxim){
                dinocoins = coins_maxim;
              }
            console.log("dino: "+ dinosaurio_rastreado.nombre + "; cantidad: "+ capturas_final );
            Partida.update({_id:user},{$set: {dinero: dinocoins, suministros: suministros}});
            Partida.update({_id:user},{$inc:{expediciones:1}});
            /* limitar los dinosaurio con referencia al maxio de dinos permitidos*/
            if(capturas_final > 0){
                var max_dinosaur =0;
                
                
                //Controlamos cuantos dinosaurios pueden haber en la partida
                max_dinosaur = partida_jugador.max_dinosaurios;
               
                
                var cantidadActualdinos = 0;
                partida_jugador.dinos.forEach(function(dino){
                    cantidadActualdinos +=dino.cantidad;
                    
                });
                var maximo = 0;
                partida_jugador.dinos.forEach(function(dino){
  
                //console.log("ids: " + dino._id + " !!!!!!" +dinosaurio_rastreado._id)
                    if(dino.id==dinosaurio_rastreado._id){
                       var dinos_totales = cantidadActualdinos + capturas_final;
                        
                            if(dinos_totales>max_dinosaur){
                                var provisional = dinos_totales - max_dinosaur;
                                capturas_final -=provisional;
                                dino.cantidad +=capturas_final;
                                console.log("solo los justos... maximo dinosaurios permitidos ");
                            }
                            else{
                                dino.cantidad +=capturas_final;
                                //dino_act = dino.cantidad;
                                console.log("todo correcto ");
                            }
                        }
                                     
                });  
                                              
            }
            
            console.log(partida_jugador.dinos);
             var dino_act= partida_jugador.dinos;
 
            Partida.update({_id:user},{$set: {dinos: dino_act }});            
            //Partida.update({ _id:user, edificio: Edifici._id },{ $set: { "edificio.$" : EdificiUp._id}});
        }     
    });

    },
    // FIN EXPEDICIONES
    
    /**************************************CHRON INVESTIGACIONES ****************************************/
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
                Partida.update({_id:user},{$set:{bono_seguridad:true}});
                Partida.update({_id:user},{$push:{bonos_desbloqueados:1}});
                console.log("investigacio acabada!!");
            }
            else if(Investigacio._id==2){
                Partida.update({_id:user},{$set:{bono_habitats:true}});
                Partida.update({_id:user},{$push:{bonos_desbloqueados:2}});
                Partida.update({_id:user},{$inc:{max_dinosaurios:5}});
                console.log("investigacio acabada!!");
            }
            else if(Investigacio._id==3){
                Partida.update({_id:user},{$set:{bono_rrpp:true}});
                Partida.update({_id:user},{$push:{bonos_desbloqueados:3}});
                
            }
            else if(Investigacio._id==4){
                    Partida.update({_id:user},{$set:{bono_logistica:true}});
                     Partida.update({_id:user},{$push:{bonos_desbloqueados:4}});
                    console.log("investigacio acabada!!");
                
            }else if(Investigacio._id==5){
                    Partida.update({_id:user},{$inc:{bono_liderazgo:10}});
                     Partida.update({_id:user},{$push:{bonos_desbloqueados:5}});
                    console.log("investigacio acabada!!");
                }
           Partida.update({_id:user}, {$inc:{ambar:Investigacio.ambar}});
            // Se genera una notificación
            Notificacion.insert({usuario: user,
                                 nombre: "investigacion finalizada",
                                 descripcion: "Ha finalizado investigación de " + Investigacio.nom,
                                 leido: "false"
            }); 
            console.log("investigacion acabada!!");
        }  
          
    });
    }

});
// FIN INVESTIGACIÓN




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


SyncedCron.start();
      SyncedCron.add({
        name: 'Run in 2 seconds dinocoins',
        schedule: function(parser) {
            // parser is a later.parse obje
            return parser.text('every 2 seconds');
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
                    
                    //VISITANTES X dinosaurio
                    var totalvisitantes=0;
                    var totalDinos = [];
                    var visitantesXdino = [];
                    var bonoVisitante = part.bono_rrpp;
                //buscaremos cuantos dinosaurios por id hay en la partida
                    part.dinos.forEach(function(dino,i){
                         
                        totalDinos[i]={"id":dino.id,"num":dino.cantidad};  
                    });
                    
                    
                    Dinosaurio.find().forEach(function(dino,i){
                        visitantesXdino[i]={"id":dino._id,"genera":dino.visitantes};              
                            
                         if(visitantesXdino[i].id==totalDinos[i].id){
                            totalvisitantes += visitantesXdino[i].genera * totalDinos[i].num;
                            
                        }    
                    });
                    
                    if(bonoVisitante){//20% mas de visitantes con el bono
                        totalvisitantes = Math.ceil(totalvisitantes + (totalvisitantes*0.2)); 
                        console.log(totalvisitantes);            
                        console.log("*********X2********");
                    }else{
                        console.log(totalvisitantes);            
                        console.log("*****************");
                    }
                    
                    //si es superior
                    if(totalvisitantes>part.max_visitantes){
                        totalvisitantes=part.max_visitantes;
                    }
                    //FIN VISITANTES
                    
                    
                    
                  part.edificio.forEach(function(num){
                    
                    var edificio  = Edificio.findOne({"_id":num});

                    if(num==401 || num==402 || num==403){
                      almacen = num;
                    }

                    dinero += Math.ceil(edificio.dinoCoins/60) + (totalvisitantes*2);
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

                  Partida.update({_id:part._id},{$set:{dinero:dinero, suministros:suministros, visitantes:totalvisitantes}})


                });
                
             // }
            }catch(e){

              console.log("error: "+e.message);
            }
        }
    });
/*
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
    
    //***********LOS DINOS ESCAPAN
    //************ CRON DE 12 o 24 Horas, por el momento cada 20s
    //************
    /*SyncedCron.start();
        SyncedCron.add({
        name: 'Run in 20 seconds ',
        schedule: function(parser) {
            // parser is a later.parse obje
            return parser.text('every 20 seconds');
        },
        job: function() {
            
            
            console.log("aixo es un missatge de mostra (666-555-666)CALL ME <3");
            
            
            mi_partida = Partida.find().fetch();//obtenemos una array con todas las partidas
            console.log("numero de partidas = " + mi_partida.length);
            console.log("---------1---------");
           for(var proba = 0; proba<mi_partida.length; proba++){//por cada partida
                
                console.log(mi_partida[proba]);
                console.log("----------2--------");
                console.log(dino_perdidoId);
                var array =[]; //array para almacenar los objetos dinosaurios
               
               //miramos que edificio hay de garita seguridad por cada partida
               var edificioSeguridad = 0;
               
               mi_partida[proba].edificio.forEach(function(edif,i){
                   if(edif==801||edif==802||edif==803){
                       edificioSeguridad = edif;
                   }
                   
               });
               if(edificioSeguridad==801){
                    var dinos_perdidos = getRndInteger(1,15);
                    var dino_perdidoId =  getRndInteger(1,7);
                }
                else if(edificioSeguridad==802){
                    var dinos_perdidos = getRndInteger(1,10);
                    var dino_perdidoId =  getRndInteger(1,7);
                }
                else if(edificioSeguridad==803){
                    var dinos_perdidos = getRndInteger(1,5);
                    var dino_perdidoId =  getRndInteger(1,7);
                }else{
                    var dinos_perdidos = getRndInteger(1,20);
                    var dino_perdidoId =  getRndInteger(1,7);
                }
               
                 
                mi_partida[proba].dinos.forEach(function(dino,i){ //por cada partida
                    console.log("partida: " + proba + " dino " + dino.id);
                    
                    if(dino.id==dino_perdidoId){//tipo de dinosaurio escapado escoogido aleatoriamente
                        var activo=false; //booleano para el bono de seguridad
                        activo = mi_partida[proba].bono_seguridad; 
                        if(!activo){//si el bono no esta activado
                            var restantes = dino.cantidad-dinos_perdidos; //se han escapado los dinosaurios sin bono
                        
                            console.log("dinosaurio en la partida " + dino.cantidad);
                            console.log("dinosaurios perdidos "+dinos_perdidos);  
                            
                            //se escapan y ademas evitamos que tengamos dinosaurios negativos
                            if(restantes<0){
                                dino.cantidad = 0;
                            }
                            else{
                                dino.cantidad = restantes;//hacemos que los dinosaurios restantes sean los dinosaurios de la partida
                            }
                            
                            console.log("dinosaurios restantes: "+ dino.cantidad);
                            console.log("---------3---------");
                        }
                        
                        else{//si tenemos bono
                            
                            
                            
                                var restantes = dino.cantidad-(Math.floor(dinos_perdidos/2));//se escapan dinosaurios -50% la mitad
                           
             
                            console.log("dinosaurio en la partida " + dino.cantidad);
                            console.log("dinosaurios perdidios sin bono "+dinos_perdidos); 
                            console.log("dinosaurios perdidios con bono "+(dino.cantidad-restantes));
                            console.log("bonus bonus");

                             //se escapan y ademas evitamos que tengamos dinosaurios negativos
                            if(restantes<0){
                                dino.cantidad = 0;
                            }
                            else{
                                dino.cantidad = restantes;//hacemos que los dinosaurios restantes sean los dinosaurios de la partida
                            }
                            console.log("dinosaurios restantes: "+ dino.cantidad);
                            console.log("---------3---------");
                        }
                   
                    } 
                    console.log("<<<<<<< top top top >>>>>>>>");
                    console.log("dinosaurio en la partida " + dino.cantidad);
                    console.log("<<<<<<< top top top >>>>>>>");
                    array.push(dino);//por cada dinosaurio lo guardamos en un array
                    
                    
                });
               
               //actualizamos el array en la partida; para todas las partidas sera lo mismoS
                Partida.update({_id:mi_partida[proba]._id},{$set: {dinos: array}});
            //SyncedCron.remove('Run in 20 seconds only once');
            }
    
        }
    });*/

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

  