const Discord                                         = require('discord.js');
const {TOKEN, PREFIX, VERSION, WHITELIST}             = require('./config.js');
const client                                          = new Discord.Client({disableMentions: "everyone"});
const { get } = require('https');
const { measureMemory } = require('vm');
const { parse } = require('path');

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
    .addField(`\`${PREFIX}help nsfw\``, "Vous permet d'accéder à la page d'aide des commandes nsfw**🔞**")
    .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

    let avancé = new Discord.MessageEmbed()
    .setColor(couleur)
    .setTitle("Page 1/"+totalpage+" - Toutes les commandes :")
    .setDescription("**Pour tout problème avec le bot, voici le support :** **[CLIQUE ICI](https://discord.gg/4fZhCWr)**")
    .addField(`\`${PREFIX}help\``, "Vous y êtes actuellement")
    .addField(`\`${PREFIX}help info\``, "Vous permet d'accéder à la page d'aide commandes info")
    .addField(`\`${PREFIX}help mod\``, "Vous permet d'accéder à la page d'aide commandes mod")
    .addField(`\`${PREFIX}help fun\``, "Vous permet d'accéder à la page d'aide des commandes fun")
    .addField(`\`${PREFIX}help nsfw\``, "Vous permet d'accéder à la page d'aide des commandes nsfw**🔞**")
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

  if (message.content === prefix + 'help nsfw' || message.content === prefix + 'h nsfw') {

    let mod = new Discord.MessageEmbed()
    .setColor(couleur)
    .setTitle("Page 5/"+totalpage+" - Commandes NSFW :")
    .setDescription("**Pour tout problème avec le bot, voici le support :** **[CLIQUE ICI](https://discord.gg/4fZhCWr)**")
    .addField(`\`${PREFIX}pussy\``, "Vous permet d'afficher des vagins")
    .addField(`\`${PREFIX}ass\``, "Vous permet d'afficher des culs de femme")
    .addField(`\`${PREFIX}anal\``, "Vous permet d'afficher des actes sexuels anal")
    .addField(`\`${PREFIX}fuck\``, "Vous permet d'afficher des actes sexuels hard")
    .addField(`\`${PREFIX}neko\``, "Vous permet d'afficher des images de Nekomimi")
    .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)
    message.channel.send(mod);
  } 

  if (message.content.startsWith(prefix + 'pp') || message.content.startsWith(prefix + 'avatar') ) {
    
    let user = message.mentions.users.first();
    
      if (user) {
    
        let member = message.guild.member(user);
    
        if (member) {
            
          let embed = new Discord.MessageEmbed()
                .setColor(couleur)
                .setTitle("AVATAR")
                .setDescription(`**Voici la photo de profil de ${user} !** [(LIEN)](${user.displayAvatarURL({dynamic: true})})`)
                .setImage(user.displayAvatarURL({format: 'png', dynamic: true, size: 1024}))
                .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)
          if (user, user.id - message.author.id) return message.channel.send(embed); 
        }
      }
    
    let pasdemention = new Discord.MessageEmbed()
                .setColor(couleur)
                .setTitle("AVATAR")
                .setDescription(`**Voici votre photo de profil !** [(LIEN)](${message.author.displayAvatarURL({dynamic: true})})`)
                .setImage(message.author.displayAvatarURL({format: 'png', dynamic: true, size: 1024}))
                .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)
    if (!user) return message.channel.send(pasdemention);
    if (user, user.id = message.author.id) return message.channel.send(pasdemention);
  }

  if (message.content.startsWith(prefix + 'whitelist')) {

    let user = message.mentions.users.first();
    
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

    if (user) {
    
      let member = message.guild.member(user);
    
      if (member) {
              
        if (user, user.id = message.author.id && !whitelist.includes(user.id)) return message.channel.send(standardliste);
        if (user, user.id = message.author.id && whitelist.includes(user.id)) return message.channel.send(avancéliste);   

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

        if (user, user.id - message.author.id && !whitelist.includes(user.id)) return message.channel.send(standardliste1);
        if (user, user.id - message.author.id && whitelist.includes(user.id)) return message.channel.send(avancéliste1);

      }
    }

    if (!user && !whitelist.includes(message.author.id)) return message.channel.send(standardliste);
    if (!user && whitelist.includes(message.author.id)) return message.channel.send(avancéliste);

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
              .setTitle("KICK ERREUR")
              .setDescription("❌ Je n'ai pas la permission `Expulser des membres` !")
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
                .setDescription(`**Voici la photo de profil de ${user} !** [(LIEN)](${user.displayAvatarURL({dynamic: true})})`)
                .setImage(user.displayAvatarURL({format: 'png', dynamic: true, size: 1024}))
                .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)
          if (user, user.id - message.author.id) return message.channel.send(embed); 
        }
      }
    
    let pasdemention = new Discord.MessageEmbed()
                .setColor(couleur)
                .setTitle("AVATAR")
                .setDescription(`**Voici votre photo de profil !** [(LIEN)](${message.author.displayAvatarURL({dynamic: true})})`)
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

    let asslink =["https://cdn.discordapp.com/attachments/731551525691850792/731974158614921306/fessC3A9es-9.png", "https://cdn.discordapp.com/attachments/731551525691850792/731973741348782090/XJ5pKHQvFrGQW4jp0n15E6yvzybGJE96kn44lSiaZqsdiVdj9Af0egFSmetZu2bwJFjZUR9RjP8uRUygaICb8CrO1Q.png", "https://cdn.discordapp.com/attachments/731551525691850792/731973650487443626/q2XoasQw8gsLxVwd3_xYZL-TKH6pgju72H3uG5uVqvvq4pk5IHZDfFVjBaR-1c33E2jXcaK9eafiMXj3EG1QQOPR6Q.png", "https://cdn.discordapp.com/attachments/731551525691850792/731973573282889868/ru8SxiX33v8KCVqd7N7QBFesex9zztw38Yyy1j2k0QswWCXVkdbh6Rcnn8ko2aYI5prAjKdDBFB4GgXG5DRMQx3UxlGRsnk.png", "https://cdn.discordapp.com/attachments/731551525691850792/731973412531994685/835_Turn.png", "https://cdn.discordapp.com/attachments/731551525691850792/731973267757334638/2j3j9zOYlGAwk5u4-oCVNVI54kiMK8eCt_nTCGyj2zHbbGVg3rLzwiRWJVd0uUmoN9HbsO8vbmixy_3EtZvWHithGsvG5p38iw.png", "https://cdn.discordapp.com/attachments/731551525691850792/731973205144764466/1cd0fb9f4998ee1b8f006ab6b4565d4e.png", "https://cdn.discordapp.com/attachments/731551525691850792/731973154230108200/87560327.png", "https://cdn.discordapp.com/attachments/731551525691850792/731973073959649290/superbig.png", "https://cdn.discordapp.com/attachments/731551525691850792/731972907420614796/meafTGgaaaamhCZyIb_tfBkjZqy1C16.png", "https://cdn.discordapp.com/attachments/731551525691850792/731972738217934929/big-ass-porn-8meaAaaEPbaaaa.png", "https://cdn.discordapp.com/attachments/731551525691850792/731972658849382420/aHR0cHM6Ly90c2UyLmV4cGxpY2l0LmJpbmcubmV0L3RoP2lkPU9JUC5EUXV2SkR6bUxfUHJySnF2WTBVUU5nSGFFOCZycz0xJnBp.png", "https://cdn.discordapp.com/attachments/731551525691850792/731972485507055697/images.png", "https://cdn.discordapp.com/attachments/731551525691850792/731972470273212466/692476.png", "https://cdn.discordapp.com/attachments/731551525691850792/731972168954413186/meafTGgaaaamh-Vm37_aXw_2MFO5B3.png", "https://cdn.discordapp.com/attachments/731551525691850792/731970243538321422/bd86f3eebab1f8ee6cbd96927e810b64.png", "https://cdn.discordapp.com/attachments/731551525691850792/731970074562396210/5baea25469651cc5bce4887402354d3b.png", "https://cdn.discordapp.com/attachments/731551525691850792/731969928437039104/images.png", "https://cdn.discordapp.com/attachments/731551525691850792/731930181790597180/01.png", "https://cdn.discordapp.com/attachments/731551525691850792/731682105309790278/422921.png", "https://cdn.discordapp.com/attachments/731551525691850792/731680029565648906/e0dce9f3c549ef7b421b217145d7367c.png", "https://cdn.discordapp.com/attachments/731551525691850792/731679873889992764/gros-cul-femme-ronde-en-string.png", "https://cdn.discordapp.com/attachments/731551525691850792/731679754834411540/Screenshot_4-1.png", "https://cdn.discordapp.com/attachments/731551525691850792/731679678636752896/GWree3r5XiuAeDpC9_0Lwp4dFMPqsgvMyKVBUVo47o01ynMZtaVjB2cl4EG1x-537BEECMjAoioOwM79nnCzydW8LrUJk5tPCJSP.png", "https://cdn.discordapp.com/attachments/731551525691850792/731679521756938281/culs-nus-8-768x1024.png", "https://cdn.discordapp.com/attachments/731551525691850792/731679464299298846/selfie-gros-cul-karima-algerienne.png", "https://cdn.discordapp.com/attachments/731551525691850792/731679402043113534/beau-cul-37.png", "https://cdn.discordapp.com/attachments/731551525691850792/731679324851404880/gros-cul-amateur29.png", "https://cdn.discordapp.com/attachments/731551525691850792/731679197478518864/gros-cul-sommeil.png", "https://cdn.discordapp.com/attachments/731551525691850792/731679110035800084/th.png", "https://cdn.discordapp.com/attachments/731551525691850792/731678921883385936/snapbaise-salope18.png", "https://cdn.discordapp.com/attachments/731551525691850792/731678827792695397/b8vjro3o2j8f-crop-u575-220x300.png", "https://cdn.discordapp.com/attachments/731551525691850792/731678706795544646/d021966e-531a-45b9-afa8-cbfd13cfec82.png", "https://cdn.discordapp.com/attachments/731551525691850792/731678387092848700/BVATHfP3XElnUFmz50-DpT9llPt28POsIH1c7rcxGeeUSVqwVg9O00B_qgtVE76tQJso1BXW_XfSWyOdg0wAOyg4PD6mgDBZG93d.png", "https://cdn.discordapp.com/attachments/731551525691850792/731678246223216710/1519149467_b0ae273761f3a1-0983-4253-8607-d9f2cbd00c50.png", "https://cdn.discordapp.com/attachments/731551525691850792/731678191923625984/IMG_0442.png", "https://cdn.discordapp.com/attachments/731551525691850792/731678111598641243/Uh7_ip-CRl3Cz4vZjHSioNqfHbuuHFvzlPctxmG8xQflrwJ-Xvh9Um10hCjdgN-G2kTV1I_G5W5lMx83hQvT_evcuaocg9IT_dSo.png", "https://cdn.discordapp.com/attachments/731551525691850792/731678013670031390/0754cb6d760f4a0b10b68797adccd98a.png", "https://cdn.discordapp.com/attachments/731551525691850792/731677924679352350/9k.png", "https://cdn.discordapp.com/attachments/731551525691850792/731677811559104513/snapchat-145144865525-422x750.png", "https://cdn.discordapp.com/attachments/731551525691850792/731677721301614622/image0-29.png", "https://cdn.discordapp.com/attachments/731551525691850792/731677642683842580/ed75a42eba6a1b511003e316f9c1ce20.png", "https://cdn.discordapp.com/attachments/731551525691850792/731677422361247764/5_1437094l.png", "https://cdn.discordapp.com/attachments/731551525691850792/731677336541462648/Gabriella-Paltrova-Opens-Her-Ass-For-A-Creampie-pics.png", "https://cdn.discordapp.com/attachments/731551525691850792/731677262407008276/butt-free-pic-xxx-7.png", "https://cdn.discordapp.com/attachments/731551525691850792/731677157499207740/3TH8zAFf_400x400.png", "https://cdn.discordapp.com/attachments/731551525691850792/731676624130670713/images.png", "https://cdn.discordapp.com/attachments/731551525691850792/731676575543853117/mq_KIPOVbeafTGgaaaamhhpJN-apDMej7fRRr0.png", "https://cdn.discordapp.com/attachments/731551525691850792/731676483290005504/72f74babf7bb2ef0927fb7076abe89bd.png", "https://cdn.discordapp.com/attachments/731551525691850792/731676316729999484/7R27EKndUDS54ShwftR9HD265SpFQBzRadfbOREiZD4Uvs0GxsuaWTcQDohnK7pABK8LhFUpOcxGAcs9PepPowKCfR31h10B.png", "https://cdn.discordapp.com/attachments/731551525691850792/731676133723996160/663702.png", "https://cdn.discordapp.com/attachments/731551525691850792/731676021484683294/240x135.png", "https://cdn.discordapp.com/attachments/731551525691850792/731675883366121603/dJ_QH5kZzUK_P9NU9rOdKQMMyru1R-yOchhKAEQjQfHEeXn_8d-8WM0cwiT_-CDgTjlfHI_yoVMfURWX6cVOuU6RIGmwpVzSBw.png", "https://cdn.discordapp.com/attachments/731551525691850792/731674402072297493/bab82e00570d17a1fe3dcad7dabff3eb.png", "https://ear-group.net/upload/0d7c223830a9f064a922d1fda31317ed.jpg", "https://cdn.discordapp.com/attachments/731551525691850792/731672773562466375/images.png", "https://cdn.discordapp.com/attachments/731551525691850792/731674067299467274/240x135.png", "https://cdn.discordapp.com/attachments/731551525691850792/731672716725452830/images.png", "https://cdn.discordapp.com/attachments/731551525691850792/731672636140290168/71d6ad5734e5c284c26fe011b6225ac5.png", "https://cdn.discordapp.com/attachments/731551525691850792/731673868674269234/KE93kwRwWnDVl3Ocp7_wqdbqRfm_gwH28Pts5jDVXqR8HyH3s5hgi0-g7lKdlaDyOCh40fM_4RYCElEYvkW2V0UjlCIOAucFoior.png", "https://static-eu-cdn.eporner.com/photos/237811.jpg", "https://static-eu-cdn.eporner.com/photos/520401.jpg", "https://p8.porn.biz/pics/SiA/87560327.jpg", "https://static-eu-cdn.eporner.com/photos/538354.jpg", "https://static-eu-cdn.eporner.com/photos/708328.jpg", "https://pornopics.co/photos/images/pic-1-f-my-tight-red-g-string-swallowed-up-by-my-big-ass-1026079.jpg", "https://pornopics.co/photos/images/string-almost-breaking-1604391.jpg", "https://cdn.discordapp.com/attachments/731551525691850792/731673247023759440/da8dbxy-e2a51dda-3a2a-42f2-a808-3e9a3305647d.png", "https://ci.phncdn.com/videos/201912/06/266696012/original/(m=eafTGgaaaa)(mh=CZyIb_tfBkjZqy1C)16.jpg", "https://bs1.woxcdn.com/enhanced-2/49c/c7a/49cc7a3d854498173ae6ac31bcdacca1.jpg", "https://i.pinimg.com/236x/06/29/36/062936722974ef64ef186227d84edab3.jpg", "https://i.pinimg.com/originals/f8/90/b5/f890b54e0c6a121e5717ba52998b7a33.jpg", "https://img.over-blog-kiwi.com/2/24/58/87/obpicFms1f8.jpeg", "https://i.pinimg.com/736x/a0/49/8e/a0498e4ec6ba09192bf4e67df8f46cac.jpg", "https://pbs.twimg.com/media/CzvAiOZXAAAgrB3.jpg", "https://cdn.discordapp.com/attachments/731551525691850792/731673144116510751/preview.png", "https://66.media.tumblr.com/tumblr_lwney7LJRk1qfix9jo1_1280.jpg", "https://cdn.discordapp.com/attachments/731551525691850792/731672905657745578/add16062cf48888f392a5917bc40cb0d.png"];

    let ass = new Discord.MessageEmbed()
    .setColor(couleur)
    .setTitle("ASS")
    .setImage(asslink[Math.floor(Math.random() * (asslink.length))])
    .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)
    
    if (message.channel.nsfw) return message.channel.send(ass).catch(console.error);
    if (!message.channel.nsfw) return message.channel.send(nonsfw).catch(console.error);
  }

  if (message.content.startsWith(prefix + "anal")) {

    let anallink = ["https://cdn.discordapp.com/attachments/731551525691850792/731975228401385564/tumblr_m209lbSlvo1robtkso1_500.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731974984037302412/unnamed_1.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731974598484164718/unnamed.gif", "https://cl.phncdn.com/gif/15237272.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731974426228424745/162387.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731967321165529218/unnamed_2.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731967319688871967/Anal-Fuck-Gif-3.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731966683685847111/unnamed.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731966684839149668/unnamed_1.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731930732406243328/unnamed_2.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731930534866845696/unnamed_1.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731930422606561300/rachael-madori-mick-blue-big-wet-butts.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731930422044262445/unnamed.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731930289789468722/Dollie-Darko-Anal-Porn-Gifs.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731930079281545246/59368225.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731929912612618250/ezgif-4-a7329bb447d8.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731929767183515678/unnamed_2.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731929767078527096/unnamed_1.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731929514095149178/unnamed.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731680917583691776/blonde-sodomie.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731680914819776522/unnamed.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731680913213358130/842051397593520.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731680913200513144/a38.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731680631720771676/731_450.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731680629976072213/tumblr_mons5fV4vQ1rslzdao1_400.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731680628579368960/1491316688-motard-levrette-anal-sodomie.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731680420579508234/unnamed.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731680352543834275/belle-fille-anale-francaise-du-16.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731680222910349372/unnamed.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731675705150275627/unnamed.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731675540242563102/unnamed_1.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731675447540187176/unnamed.gif", "https://thumb-p4.xhcdn.com/a/lexeNWz3ZAnVuCeNeT4hvw/000/226/093/294_160.gif", "https://cl.phncdn.com/gif/15237272.gif", "https://i.imgur.com/DVrhbro.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731578319233089618/unnamed.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731578472517861406/unnamed.gif", "https://secureservercdn.net/72.167.241.134/jz3.de7.myftpupload.com/wp-content/uploads/2019/07/ezgif-4-cca09b249c06.gif"];

    let anal = new Discord.MessageEmbed()
    .setColor(couleur)
    .setTitle("ANAL")
    .setImage(anallink[Math.floor(Math.random() * (anallink.length))])
    .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

   if (message.channel.nsfw) return message.channel.send(anal).catch(console.error);
   if (!message.channel.nsfw) return message.channel.send(nonsfw).catch(console.error);
  }

  if (message.content.startsWith(prefix + "pussy")) {

    let pussylink = ["https://cdn.discordapp.com/attachments/731551525691850792/731931118991048764/unnamed_1.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731930963948339210/unnamed.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731682565706088558/559489.png", "https://cdn.discordapp.com/attachments/731551525691850792/731682453013659698/karen-k-nude-studio-apartment-metart-17.png", "https://cdn.discordapp.com/attachments/731551525691850792/731682393068666930/tCfDlp8Vu6UMXFezDwRRPSL8oEyKZhPGUSODCiQ8tsVEoatOsZdjsKlsHVWP-pXS1k2HfLq9lRzN5nU16UXdvmkvrzvAXbvGkbsc.png", "https://cdn.discordapp.com/attachments/731551525691850792/731682342787350528/677499_296x1000.png", "https://cdn.discordapp.com/attachments/731551525691850792/731682284075483196/558676.png", "https://cdn.discordapp.com/attachments/731551525691850792/731681994592747560/images.png", "https://cdn.discordapp.com/attachments/731551525691850792/731682105309790278/422921.png"];

    let pussy = new Discord.MessageEmbed()
    .setColor(couleur)
    .setTitle("PUSSY")
    .setImage(pussylink[Math.floor(Math.random() * (pussylink.length))])
    .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

   if (message.channel.nsfw) return message.channel.send(pussy).catch(console.error);
   if (!message.channel.nsfw) return message.channel.send(nonsfw).catch(console.error);
  }

  if (message.content.startsWith(prefix + "fuck")) {

    let fucklink = ["https://cdn.discordapp.com/attachments/731551525691850792/731963154808176750/43526.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731931449623838780/porn-pussy-fuck-gif-4.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731931381365735484/533_1000.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731922974906515568/closeup-pussy-fuck.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731922786683191387/doggy-style-porn-gifs-sex-gif.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731922784397033472/776_450.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731922382691893339/DD9E74A.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731922138034077716/Jada_Stevens1.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731922136792432690/unnamed.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731922133910814850/tumblr_ngyuozCwCK1tc5zi3o1_500.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731922134338895913/3.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731921880151490620/189902.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731921618661802095/dani-daniels-enjoys-hardcore-pussy-fucking.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731921460506918932/hardcore-long-dick-pussy-fucking-1762709.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731921293326418020/15071212.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731921290495000596/unnamed.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731921072852566108/nCkPm0V.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731683193513574460/Ariana-Marie-Perfect-Girlfriend.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731683195816378428/Hot-teen-Ariana-Marie-hard-fucked-gif.gif"];

    let fuck = new Discord.MessageEmbed()
    .setColor(couleur)
    .setTitle("FUCK")
    .setImage(fucklink[Math.floor(Math.random() * (fucklink.length))])
    .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

   if (message.channel.nsfw) return message.channel.send(fuck).catch(console.error);
   if (!message.channel.nsfw) return message.channel.send(nonsfw).catch(console.error);
  }

  if (message.content.startsWith(prefix + "boobs")) {

    let boobslink = ["https://cdn.discordapp.com/attachments/731551525691850792/731929267327205508/1548190350_lqfvss9c3edlwkduqpmekjzcvfwnafqwv8plxoofvsy.png", "https://cdn.discordapp.com/attachments/731551525691850792/731929022518263808/DnMChjUXcAAjkWt.png", "https://cdn.discordapp.com/attachments/731551525691850792/731929055066062888/snapchat-boobs-sexting-fuck-08779b3.png", "https://cdn.discordapp.com/attachments/731551525691850792/731928891597258772/53944.png", "https://cdn.discordapp.com/attachments/731551525691850792/731928826304659587/1.png", "https://cdn.discordapp.com/attachments/731551525691850792/731928710529417367/big_boobs_-4409.png", "https://cdn.discordapp.com/attachments/731551525691850792/731928645190549514/10-amateur-snapgirl-nude-big-boobs-pic.png", "https://cdn.discordapp.com/attachments/731551525691850792/731928537174638643/0a145b3992798b1ad9897a6f3bc46297.png", "https://cdn.discordapp.com/attachments/731551525691850792/731928456283291728/de6efa38-2766-432a-aff2-093706311f54.png", "https://cdn.discordapp.com/attachments/731551525691850792/731928181992325200/pornhub-big-boobs-4.png", "https://cdn.discordapp.com/attachments/731551525691850792/731928224157925437/3a23a13382674eca500916b07915fd33.png", "https://media.tits-guru.com/images/d32d7158-70ca-44a9-9e78-acf124d2b86a.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731927972696817674/1-76.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731927785555099789/meafTGgaaaamhGNJYmrytOujaa7cE8.png", "https://cdn.discordapp.com/attachments/731551525691850792/731927803779481641/533048_296x1000.png", "https://cdn.discordapp.com/attachments/731551525691850792/731927627912183868/unnamed.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731927556990828645/boobs-sucking-gif-porn-2.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731927349192294410/tumblr_pb1zw86Lbz1ueqk0ho1_500.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731927206711918632/images.png", "https://cdn.discordapp.com/attachments/731551525691850792/731927043414949920/205_450.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731925077058256997/025_1000.gif"];

    let boobs = new Discord.MessageEmbed()
    .setColor(couleur)
    .setTitle("BOOBS")
    .setImage(boobslink[Math.floor(Math.random() * (boobslink.length))])
    .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

   if (message.channel.nsfw) return message.channel.send(boobs).catch(console.error);
   if (!message.channel.nsfw) return message.channel.send(nonsfw).catch(console.error);
  }

  if (message.content.startsWith(prefix + "biffle")) {

    let biflettelink = ["https://cdn.discordapp.com/attachments/731551525691850792/731966336665649302/19485641.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731966329313034260/361_1000.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731965988379033700/29.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731962477197393970/552611507860699.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731962185667838032/biflette_grosse_bite_jeune_rousse.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731962118030491755/48.gif", "http://www.la-biffle.com/la-biffle.com/image/la_biffle.gif",  "https://cdn.discordapp.com/attachments/731551525691850792/731961158612811847/bifle_biflette_hard_porno_violente_visage_brune.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731932546153185350/biflette_pov_jeune_pornstar_bite_sur_le_visage.gif"];

    let biflette = new Discord.MessageEmbed()
    .setColor(couleur)
    .setTitle("BIFLETTE")
    .setImage(biflettelink[Math.floor(Math.random() * (biflettelink.length))])
    .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

   if (message.channel.nsfw) return message.channel.send(biflette).catch(console.error);
   if (!message.channel.nsfw) return message.channel.send(nonsfw).catch(console.error);
  }

  if (message.content.startsWith(prefix + "suce")) {

    let sucelink = ["https://cdn.discordapp.com/attachments/731551525691850792/731969491067731984/gif-fellations-violentes-2.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731969489591074876/trio_porno_Alina_Li_suce_deux_hommes_chacun_leurs_tours.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731969486684684328/fellation_grosse_bite_suce_boule.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731969485556285510/38745.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731969484210044969/Position-69-12.gif", "https://cdn.discordapp.com/attachments/731551525691850792/731962819918168105/gifs-porno-29.gif"];

    let suce = new Discord.MessageEmbed()
    .setColor(couleur)
    .setTitle("SUCE")
    .setImage(sucelink[Math.floor(Math.random() * (sucelink.length))])
    .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

   if (message.channel.nsfw) return message.channel.send(suce).catch(console.error);
   if (!message.channel.nsfw) return message.channel.send(nonsfw).catch(console.error);
  }  

  if (message.content.startsWith(prefix + "invisible")) {
    message.channel.send("️");
  }

  if (message.content.startsWith(prefix + "neko")) {

    let avatarbot = client.user.avatarURL({dynamic: true});

    let erreurAPI = new Discord.MessageEmbed()
    .setColor(couleur)
    .setTitle("NSFW ERREUR")
    .setDescription("Une erreur est survenue avec l'API !")
    .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

    if (!message.channel.nsfw) return message.channel.send(nonsfw).catch(console.error);

    get("https://neko-love.xyz/api/v1/neko", (res) => {
        const { statusCode } = res;
        if (statusCode !== 200) {
            return message.channel.send(erreurAPI)
        }

        res.setEncoding("utf8");
        let rawData = "";

        res.on("data", chunk => { 
          rawData += chunk;
        });

        res.on("end", () => {
          try {
            const parsedData = JSON.parse(rawData);
              
            let image = new Discord.MessageEmbed()
            .setColor(couleur)
            .setTitle("NSFW")
            .setImage(parsedData.url)
            .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

            message.channel.send(image);
          } catch (error) {
            console.error(error.message);
          }
      });
  }).on("error", (error) => {
    console.error(error.message);
  });
};

});

client.login(token);