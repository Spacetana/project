const Discord                                         = require('discord.js');
const {TOKEN, PREFIX, VERSION, WHITELIST}             = require('./config.js');
const client                                          = new Discord.Client({disableMentions: "everyone"});

client.commands = new Discord.Collection()

let token     = TOKEN,
    prefix    = PREFIX,
    version   = VERSION,
    whitelist = WHITELIST;

client.on('ready', () => {

    console.log("Bot: " + client.user.tag + " est connecté");

    let statuses  =  [`${client.guilds.cache.size} serveur${client.guilds.cache.size > 1 ? "s" : "️"}`, PREFIX+'help', `Version: ${version}`],
        types     = ["LISTENING", "WATCHING", "PLAYING"];
    
        setInterval(function() {
            let status = statuses[Math.floor(Math.random() * statuses.length)],
                type   = types[Math.floor(Math.random() * types.length)];
      
            client.user.setActivity(status,  {type: type})
        }, 15000);
    });

client.on('message', async message => {

  let avatarbot = client.user.avatarURL({dynamic: true}),
      couleur   = "BLUE",
      guild     = message.guild,
      author    = message.author;
      totalpage = "5";

  if (message.content === prefix + 'help' || message.content === prefix + 'h') {

    let standard = new Discord.MessageEmbed()
    .setColor(couleur)
    .setTitle("Page 1/"+totalpage+" - Toutes les commandes :")
    .setDescription("**Pour tout problème avec le bot, voici le support** : **[CLIQUE ICI](https://discord.gg/4fZhCWr)**")
    .addField(`\`${PREFIX}help\``, "Vous y êtes actuellement")
    .addField(`\`${PREFIX}help info\``, "Vous permet d'accéder à la page d'aide commandes info")
    .addField(`\`${PREFIX}help mod\``, "Vous permet d'accéder à la page d'aide commandes mod")
    .addField(`\`${PREFIX}help fun\``, "Vous permet d'accéder à la page d'aide des commandes fun")
    .addField(`\`${PREFIX}help nsfw\``, "Vous permet d'accéder à la page d'aide des commandes nsfw**(+18)**")
    .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

    let avancé = new Discord.MessageEmbed()
    .setColor(couleur)
    .setTitle("Page 1/"+totalpage+" - Toutes les commandes :")
    .setDescription("**Pour tout problème avec le bot, voici le support :** **[CLIQUE ICI](https://discord.gg/4fZhCWr)**")
    .addField(`\`${PREFIX}help\``, "Vous y êtes actuellement")
    .addField(`\`${PREFIX}help info\``, "Vous permet d'accéder à la page d'aide commandes info")
    .addField(`\`${PREFIX}help mod\``, "Vous permet d'accéder à la page d'aide commandes mod")
    .addField(`\`${PREFIX}help fun\``, "Vous permet d'accéder à la page d'aide des commandes fun")
    .addField(`\`${PREFIX}help nsfw\``, "Vous permet d'accéder à la page d'aide des commandes nsfw**(+18)**")
    .addField("️", "**COMMANDES WHITELIST**")
    .addField(`\`${PREFIX}exec\``, "Vous permet d'exécuter du code en JavaScript !")
    .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

    if (!whitelist.includes(message.author.id)) return message.channel.send(standard);
    if (whitelist.includes(message.author.id)) return message.channel.send(avancé);
  }

  if (message.content === prefix + 'help mod' || message.content === prefix + 'h mod') {

    let mod = new Discord.MessageEmbed()
    .setColor(couleur)
    .setTitle("Page 2/"+totalpage+" - Commandes MOD :")
    .setDescription("**Pour tout problème avec le bot, voici le support :** **[CLIQUE ICI](https://discord.gg/4fZhCWr)**")
    .addField(`\`${PREFIX}ban [@user] (raison)\``, "Vous permet de ban un membre mentionné")
    .addField(`\`${PREFIX}kick [@user] (raison)\``, "Vous permet de kick un membre mentionné")
    .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)
    message.channel.send(mod);
  }

  if (message.content === prefix + 'help nsfw' || message.content === prefix + 'h nsfw') {

    let mod = new Discord.MessageEmbed()
    .setColor(couleur)
    .setTitle("Page 5/"+totalpage+" - Commandes NSFW :")
    .setDescription("**Pour tout problème avec le bot, voici le support :** **[CLIQUE ICI](https://discord.gg/4fZhCWr)**")
    .addField(`\`${PREFIX}ass\``, "Vous permet d'afficher des culs de femme")
    .addField(`\`${PREFIX}anal\``, "Vous permet d'afficher des actes sexuels anal")
    .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)
    message.channel.send(mod);
  }

  if (message.content === prefix + 'help info' || message.content === prefix + 'h info') {

    let mod = new Discord.MessageEmbed()
    .setColor(couleur)
    .setTitle("Page 3/"+totalpage+" - Commandes INFO :")
    .setDescription("**Pour tout problème avec le bot, voici le support :** **[CLIQUE ICI](https://discord.gg/4fZhCWr)**")
    .addField(`\`${PREFIX}ping\``, "Vous permet d'afficher le temps de latence du bot(MS)")
    .addField(`\`${PREFIX}pp (@user)\``, "Affiche votre pp ou celle d'un membre mentionné")
    .addField(`\`${PREFIX}whitelist (@user)\``, "Vous permet de savoir si un membre ou si vous êtes whitelist dans le bot !")
    .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)
    message.channel.send(mod);
  } 

  if (message.content === prefix + 'help fun' || message.content === prefix + 'h fun') {

    let mod = new Discord.MessageEmbed()
    .setColor(couleur)
    .setTitle("Page 4/"+totalpage+" - Commandes FUN :")
    .setDescription("**Pour tout problème avec le bot, voici le support :** **[CLIQUE ICI](https://discord.gg/4fZhCWr)**")
    .addField(`\`${PREFIX}8ball [question]\``, "Vous permet de poser une question lambda au bot")
    .addField(`\`${PREFIX}invisible\``, "Vous permet de faire envoyer un message totalement invisible par le bot")
    .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)
    message.channel.send(mod);
  } 

  if (message.content.startsWith(prefix + 'whitelist')) {

    let user = message.mentions.users.first();
    
    if (user) {
    
      let member = message.guild.member(user);
    
      if (member) {
              
        let standardliste1 = new Discord.MessageEmbed()
        .setColor(couleur)
        .setTitle("NON WHITELIST")
        .setDescription("❌ **ID** à "+user.toString()+" non figurante dans la liste des administrateurs de **Rick\🛸**")
        .addField("Liste des `ID` whitelist :", whitelist)
        .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

        let avancéliste1 = new Discord.MessageEmbed()
        .setColor(couleur)
        .setTitle("WHITELIST")
        .setDescription("✅ "+user.toString()+" est certifié **whitelist** \🛸 !")
        .addField("Liste des `ID` whitelist :", whitelist)
        .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

        if (!whitelist.includes(user.id)) return message.channel.send(standardliste1);
        if (whitelist.includes(user.id)) return message.channel.send(avancéliste1);
      }
    }

    let standardliste = new Discord.MessageEmbed()
    .setColor(couleur)
    .setTitle("NON WHITELIST")
    .setDescription("❌ Votre **ID** ne figure pas dans la liste des administrateurs de **Rick\🛸**")
    .addField("Liste des `ID` whitelist :", whitelist)
    .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

    let avancéliste = new Discord.MessageEmbed()
    .setColor(couleur)
    .setTitle("WHITELIST")
    .setDescription("✅ Vous êtes certifié **whitelist** \🛸 !")
    .addField("Liste des `ID` whitelist :", whitelist)
    .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)  
        
    if (!user && !whitelist.includes(message.author.id)) return message.channel.send(standardliste);
    if (!user &&  whitelist.includes(message.author.id)) return message.channel.send(avancéliste);
  }
    
  if (message.content.startsWith(prefix + 'exec')) {
  
    let nonWhitelist = new Discord.MessageEmbed()
    .setColor(couleur)
    .setTitle("NON WHITELIST")
    .setDescription("❌ Votre **ID** ne figure pas dans la liste des administrateurs de **Rick\🛸**")
    .addField("Liste des `ID` whitelist :", whitelist)
    .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)
  
    if (!whitelist.includes(message.author.id)) return message.channel.send(nonWhitelist);
      
      const args = message.content.split(' ');
      const command = args.shift().toLowerCase();

      let evaled;
      try {
        const code = args.join(' ');
  
        let erreur = new Discord.MessageEmbed()
        .setColor(couleur)
        .setTitle("ERREUR")
        .setDescription("```SyntaxError: Aucun script n'est détecté veuillez réessayer```\n ❌ **Une erreur a été identifié** ⬆️")
        .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))
    
        if (!code) return message.channel.send(erreur)
  
        evaled = await eval(code);
  
        let embed = new Discord.MessageEmbed()
        .setColor(couleur)
        .setTitle("Évalutation de votre script :")
        .setDescription("```" + args.join(' ') + "```\n ✅ **Votre script fonctionne et n'a pas d'erreur identifié**")
        .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))
        message.channel.send(embed);
  
        //console.log(inspect(evaled));
  
        //message.channel.send(evaled);
      } 
      catch (error) {
  
        let embed = new Discord.MessageEmbed()
        .setColor(couleur)
        .setTitle("ERREUR")
        .setDescription("```" + error + "```\n ❌ **Une erreur a était identifié** ⬆️")
        .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))
        message.channel.send(embed);
  
      }
    }

  if (message.content === prefix + 'ping') {
    let calculedeping = new Discord.MessageEmbed()
                .setColor(couleur)
                .setTitle("PING")
                .setDescription("Calcule du ping en cours.")
                .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

    var message = await message.channel.send(calculedeping);
  
    let calculedeping1 = new Discord.MessageEmbed()
                .setColor(couleur)
                .setTitle("PING")
                .setDescription("Calcule du ping en cours..")
                .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)
        message.edit(calculedeping1);
    
    let calculedeping2 = new Discord.MessageEmbed()
                .setColor(couleur)
                .setTitle("PING")
                .setDescription("Calcule du ping en cours...")
                .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)
        message.edit(calculedeping2);
  
    let calculedepingfinit = new Discord.MessageEmbed()
                .setColor(couleur)
                .setTitle("PING")
                .setDescription("Ping du bot : " + `**${Math.round(client.ws.ping)}**` + " ms")
                .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

        message.edit(calculedepingfinit);
      }

  if (!message.guild) return;

  if (message.content.startsWith(prefix + 'kick')) {
    const user     = message.mentions.users.first();
    const args     = message.content.split(" ").slice(2),
          reason   = args.join(" ");

    let NoPerm = new Discord.MessageEmbed()
            .setColor(couleur)
            .setTitle("KICK ERREUR")
            .setDescription("❌ Vous n'avez pas la permission `Expulser des membres` !")
            .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

    let NoPermBot = new Discord.MessageEmbed()
              .setColor(couleur)
              .setTitle("❌ KICK ERREUR")
              .setDescription("Je n'ai pas la permission `Expulser des membres` !")
              .setImage("https://cdn.discordapp.com/attachments/730197147441430590/730303919267512370/gif_perm_kick.gif") 
              .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)      

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(NoPerm).catch(console.error); 
    if (!guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send(NoPermBot).catch(console.error);

    if (user) {
      const member = message.guild.member(user);
      
      if (member) {
    
        let NoPermPosition = new Discord.MessageEmbed()
                        .setColor(couleur)
                        .setTitle("KICK ERREUR")
                        .setDescription("❌ `"+user.tag+"`"+" n'a pas était kick !\n\n **Raison : "+user.toString()+" possède un rôle au dessus du votre !**")
                        .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

        let SameRolePosition = new Discord.MessageEmbed()
                        .setColor(couleur)
                        .setTitle("KICK ERREUR")
                        .setDescription("❌ `"+user.tag+"`"+" n'a pas était kick !\n\n **Raison : "+user.toString()+" possède un rôle au même niveau que le votre !**")
                        .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)                                         
  
        if (member.roles.highest.position > message.member.roles.highest.position) return message.channel.send(NoPermPosition).catch(console.error);  

        member
          .kick(reason)
          .then(() => {

            let check = new Discord.MessageEmbed()
                  .setColor(couleur)
                  .setTitle("KICK")
                  .setDescription("✅ "+user.toString()+" a bien été **KICK** de "+"`"+guild.name+"`"+" !") 
                  .addField("Membre :", "`"+user.tag+"`")
                  .addField("Auteur :", "`"+author.tag+"`")
                  .addField("Raison :", "**"+reason+"**")
                  .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot) 

            let checksansraison = new Discord.MessageEmbed()
                            .setColor(couleur)
                            .setTitle("KICK")
                            .setDescription("✅ "+user.toString()+" a bien été **KICK** de "+"`"+guild.name+"`"+" !") 
                            .addField("Membre :", "`"+user.tag+"`")
                            .addField("Auteur :", "`"+author.tag+"`")
                            .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)                         

              if (!reason) return message.channel.send(checksansraison);        
              if (reason) return message.channel.send(check);
            }).catch(err => {console.log(err)});
          }
        } 

      let NoUser = new Discord.MessageEmbed()
              .setColor(couleur)
              .setTitle("KICK ERREUR")
              .setDescription("❌ Vous n'avez pas mentionné l'utilisateur à **kick** !")    
              .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)
                
      if (!user) return message.channel.send(NoUser).catch(console.error);     
    }

  if (message.content.startsWith(prefix + 'ban')) {
    
    const user     = message.mentions.users.first();
    const args     = message.content.split(" ").slice(2),
          reason   = args.join(" ");

    let NoPerm = new Discord.MessageEmbed()
            .setColor(couleur)
            .setTitle("BAN ERREUR")
            .setDescription("❌ Vous n'avez pas la permission `Bannir des membres` !")
            .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

    let NoPermBot = new Discord.MessageEmbed()
            .setColor(couleur)
            .setTitle("BAN ERREUR")
            .setDescription("❌ Je n'ai pas la permission `Bannir des membres` !")
            .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)      

    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(NoPerm).catch(console.error); 
    if (!guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send(NoPermBot).catch(console.error);

    if (user) {
      const member = message.guild.member(user);
      if (member) {

        let NoPermPosition = new Discord.MessageEmbed()
                        .setColor(couleur)
                        .setTitle("BAN ERREUR")
                        .setDescription("❌ `"+user.tag+"`"+" n'a pas était ban !\n\n **Raison : "+user.toString()+" possède un rôle au dessus du votre !**")
                        .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

        let SameRolePosition = new Discord.MessageEmbed()
                        .setColor(couleur)
                        .setTitle("BAN ERREUR")
                        .setDescription("❌ `"+user.tag+"`"+" n'a pas était ban !\n\n **Raison : "+user.toString()+" possède un rôle au même niveau que le votre !**")
                        .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)       

        if (member.roles.highest.position > message.member.roles.highest.position) return message.channel.send(NoPermPosition).catch(console.error);   

        member
          .ban(reason)
          .then(() => {

              let check = new Discord.MessageEmbed()
                    .setColor(couleur)
                    .setTitle("BAN")
                    .setDescription("✅ "+user.toString()+" a bien été **BAN** de "+"`"+guild.name+"`"+" !") 
                    .addField("Membre :", "`"+user.tag+"`")
                    .addField("Auteur :", "`"+author.tag+"`")
                    .addField("Raison :", "**"+reason+"**")
                    .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot) 

              let checksansraison = new Discord.MessageEmbed()
                    .setColor(couleur)
                    .setTitle("BAN")
                    .setDescription("✅ "+user.toString()+" a bien été **BAN** de "+"`"+guild.name+"`"+" !") 
                    .addField("Membre :", "`"+user.tag+"`")
                    .addField("Auteur :", "`"+author.tag+"`")
                    .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)                         

              if (!reason) return message.channel.send(checksansraison);        
              if (reason) return message.channel.send(check);
            }).catch(err => {console.log(err)});
          }
        } 

      let NoUser = new Discord.MessageEmbed()
              .setColor(couleur)
              .setTitle("BAN ERREUR")
              .setDescription("❌ Vous n'avez pas mentionné l'utilisateur à **ban** !")    
              .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)
                
      if (!user) return message.channel.send(NoUser).catch(console.error);     
    }
    
  if (message.content.startsWith(prefix + 'pp') || message.content.startsWith(prefix + 'avatar') ) {
    
    let user = message.mentions.users.first();
    
      if (user) {
    
        let member = message.guild.member(user);
    
        if (member) {
            
          let embed = new Discord.MessageEmbed()
                .setColor(couleur)
                .setTitle("AVATAR")
                .setDescription(`**Voici la photo de profil de ${user} !** [**(LIEN)**](${user.displayAvatarURL({dynamic: true})})`)
                .setImage(user.displayAvatarURL({format: 'png', dynamic: true, size: 1024}))
                .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)
          if (user, user.id - message.author.id) return message.channel.send(embed); 
        }
      }
    
    let pasdemention = new Discord.MessageEmbed()
                .setColor(couleur)
                .setTitle("AVATAR")
                .setDescription(`**Voici votre photo de profil !** [**(LIEN)**](${message.author.displayAvatarURL({dynamic: true})})`)
                .setImage(message.author.displayAvatarURL({format: 'png', dynamic: true, size: 1024}))
                .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)
    if (!user) return message.channel.send(pasdemention);
    if (user, user.id = message.author.id) return message.channel.send(pasdemention);
  }

  if (message.content.startsWith(prefix + "8ball")) {

    let replies  = ['Oui !', 'Absolument !',"Non !",'Vraiment pas !',"Je pense !", "Arrête de me poser des questions !", "Je suis totalement d'accord", "Hum je vais réfléchir à la question !", "AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH !"];
    let args     = message.content.split(" ").slice(1),
        question = args.join(" ");

    let NoQuestion = new Discord.MessageEmbed()
              .setColor(couleur)
              .setTitle("8BALL ERREUR")
              .setDescription("❌ Veuillez poser une question !")
              .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

    if (!question) return message.channel.send(NoQuestion);
    if (question) return message.channel.send(replies[Math.floor(Math.random() * (replies.length) -1)])
  }

  let nonsfw = new Discord.MessageEmbed()
  .setColor(couleur)
  .setTitle("NSFW ERREUR")
  .setDescription(message.channel.toString()+" n'est pas un channel **NSFW** !")
  .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

  if (message.content.startsWith(prefix + "ass")) {

    let asslink = ["https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQZA9k76Q1eWFC_PLcZVKWfIkAXsGjdMUEJ8g&usqp=CAU", "https://steamuserimages-a.akamaihd.net/ugc/251465670546432105/8332E9B4C2A92E9FC166253E6E5F998B002A9FE4/", "https://img.over-blog-kiwi.com/2/24/58/87/obpicFms1f8.jpeg", "https://i.pinimg.com/736x/a0/49/8e/a0498e4ec6ba09192bf4e67df8f46cac.jpg", "https://pbs.twimg.com/media/CzvAiOZXAAAgrB3.jpg"];

    let ass = new Discord.MessageEmbed()
    .setColor(couleur)
    .setTitle("ASS")
    .setImage(asslink[Math.floor(Math.random() * (asslink.length))])
    .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)
    
    if (message.channel.nsfw) return message.channel.send(ass).catch(console.error);
    if (!message.channel.nsfw) return message.channel.send(nonsfw).catch(console.error);
  }

  if (message.content.startsWith(prefix + "anal")) {

    let anallink = ["https://thumb-p4.xhcdn.com/a/lexeNWz3ZAnVuCeNeT4hvw/000/226/093/294_160.gif", "https://cl.phncdn.com/gif/15237272.gif", "https://i.imgur.com/DVrhbro.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731578319233089618/unnamed.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731578472517861406/unnamed.gif", "https://secureservercdn.net/72.167.241.134/jz3.de7.myftpupload.com/wp-content/uploads/2019/07/ezgif-4-cca09b249c06.gif"];

    let anal = new Discord.MessageEmbed()
    .setColor(couleur)
    .setTitle("ANAL")
    .setImage(anallink[Math.floor(Math.random() * (anallink.length))])
    .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

   if (message.channel.nsfw) return message.channel.send(anal).catch(console.error);
   if (!message.channel.nsfw) return message.channel.send(nonsfw).catch(console.error);
  }

  if (message.content.startsWith(prefix + "invisible")) {
   message.channel.send("️");
  }

});

client.login(token);