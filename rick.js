const Discord                                         = require('discord.js');
const {TOKEN, PREFIX, VERSION, WHITELIST}             = require('./config.js');
const { get }                                         = require('https');
const superagent                                      = require("superagent");
const snekfetch                                       = require('snekfetch');
const p                                               = require('pixula-v2');
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
      totalpage = "7";

  if (message.content === prefix + 'help' || message.content === prefix + 'h') {

    let standard = new Discord.MessageEmbed()
    .setColor(couleur)
    .setTitle("Page 1/"+totalpage+" - Toutes les commandes :")
    .setDescription("**Pour tout problème avec le bot, voici le support** : **[CLIQUE ICI](https://discord.gg/4fZhCWr)**")
    .addField(`\`${PREFIX}help\``, "Vous y êtes actuellement")
    .addField(`\`${PREFIX}help info\``, "Vous permet d'accéder à la page d'aide commandes info")
    .addField(`\`${PREFIX}help mod\``, "Vous permet d'accéder à la page d'aide commandes mod")
    .addField(`\`${PREFIX}help fun\``, "Vous permet d'accéder à la page d'aide des commandes fun")
    .addField(`\`${PREFIX}help love\``, "Vous permet d'accéder à la page d'aide des commandes love")
    .addField(`\`${PREFIX}help nsfw\``, "Vous permet d'accéder à la page d'aide des commandes nsfw🔞")
    .addField(`\`${PREFIX}help hentai\``, "Vous permet d'accéder à la page d'aide des commandes hentai")
    .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

    let avancé = new Discord.MessageEmbed()
    .setColor(couleur)
    .setTitle("Page 1/"+totalpage+" - Toutes les commandes :")
    .setDescription("**Pour tout problème avec le bot, voici le support :** **[CLIQUE ICI](https://discord.gg/4fZhCWr)**")
    .addField(`\`${PREFIX}help\``, "Vous y êtes actuellement")
    .addField(`\`${PREFIX}help info\``, "Vous permet d'accéder à la page d'aide commandes info")
    .addField(`\`${PREFIX}help mod\``, "Vous permet d'accéder à la page d'aide commandes mod")
    .addField(`\`${PREFIX}help fun\``, "Vous permet d'accéder à la page d'aide des commandes fun")
    .addField(`\`${PREFIX}help love\``, "Vous permet d'accéder à la page d'aide des commandes love")
    .addField(`\`${PREFIX}help nsfw\``, "Vous permet d'accéder à la page d'aide des commandes nsfw🔞")
    .addField(`\`${PREFIX}help hentai\``, "Vous permet d'accéder à la page d'aide des commandes hentai")
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

  if (message.content === prefix + 'help love' || message.content === prefix + 'h love') {

    let mod = new Discord.MessageEmbed()
    .setColor(couleur)
    .setTitle("Page 5/"+totalpage+" - Commandes LOVE :")
    .setDescription("**Pour tout problème avec le bot, voici le support :** **[CLIQUE ICI](https://discord.gg/4fZhCWr)**")
    .addField(`\`${PREFIX}waifu\``, "Permet d'afficher des images de Waifu")
    .addField(`\`${PREFIX}kitsune\``, "Permet d'afficher des images de Kitsune")
    .addField(`\`${PREFIX}neko\``, "Permet d'afficher des images de Nekomimi")
    .addField(`\`${PREFIX}pat\``, "Permet de vous tapotez ou de tapoter un membre")
    .addField(`\`${PREFIX}smug\``, "Permet de vous satisfaire ou de satisfaire un membre")
    .addField(`\`${PREFIX}cry\``, "Permet de vous faire pleurer ou de faire pleurer un membre")
    .addField(`\`${PREFIX}hug\``, "Permet de vous faire un câlin ou de faire un câlin à un membre")
    .addField(`\`${PREFIX}kiss\``, "Permet de vous faire bisous ou de faire un bisous à un membre")
    .addField(`\`${PREFIX}slap\``, "Permet de vous mettre une gifle ou de mettre une gifle à un membre")
    .addField(`\`${PREFIX}punch\``, "Permet de vous mettre un coup de poing ou de le mettre à un membre")
    .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)
    message.channel.send(mod);
  } 

  if (message.content === prefix + 'help nsfw' || message.content === prefix + 'h nsfw') {

    let mod = new Discord.MessageEmbed()
    .setColor(couleur)
    .setTitle("Page 6/"+totalpage+" - Commandes NSFW NORMAL :")
    .setDescription("**Pour tout problème avec le bot, voici le support :** **[CLIQUE ICI](https://discord.gg/4fZhCWr)**")
    .addField(`\`${PREFIX}4k\``,       "Vous permet d'afficher une image pornographique en 4k")
    .addField(`\`${PREFIX}ass\``,      "Vous permet d'afficher une image pornographique d'un gros cul")
    .addField(`\`${PREFIX}anal\``,     "Vous permet d'afficher une image/gif pornographique d'acte anal")
    .addField(`\`${PREFIX}boobs\``,    "Vous permet d'afficher une image/gif pornographique de gros seins")
    .addField(`\`${PREFIX}pussy\``,    "Vous permet d'afficher une image/gif pornographique de large vagins")
    .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)
    message.channel.send(mod);
  } 

  if (message.content === prefix + 'help hentai' || message.content === prefix + 'h hentai') {

    let mod = new Discord.MessageEmbed()
    .setColor(couleur)
    .setTitle("Page 7/"+totalpage+" - Commandes NSFW HENTAI :")
    .setDescription("**Pour tout problème avec le bot, voici le support :** **[CLIQUE ICI](https://discord.gg/4fZhCWr)**")
    .addField(`\`${PREFIX}hcum\``,     "Vous permet d'afficher un image/gif d'éjaculation")
    .addField(`\`${PREFIX}hgif\``,     "Vous permet d'afficher un gif pornographique random")
    .addField(`\`${PREFIX}hlewd\``,    "Vous permet d'afficher un image nude de personnage féminin")
    .addField(`\`${PREFIX}hentai\``,   "Vous permet d'afficher une image/gif pornographique random")
    .addField(`\`${PREFIX}nekonude\``, "Vous permet d'afficher une image/gif pornographique de Nekomimi")
    .addField(`\`${PREFIX}hfuck\``,    "Vous permet d'afficher une image/gif pornographique d'acte sexuel")
    .addField(`\`${PREFIX}hanal\``,    "Vous permet d'afficher une image/gif pornographique d'acte sexuel anal")
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
          if (user && user.id - message.author.id) return message.channel.send(embed);
        }
      }

      let pasdemention = new Discord.MessageEmbed()
      .setColor(couleur)
      .setTitle("AVATAR")
      .setDescription(`**Voici votre photo de profil !** [(LIEN)](${message.author.displayAvatarURL({dynamic: true})})`)
      .setImage(message.author.displayAvatarURL({format: 'png', dynamic: true, size: 1024}))
      .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)      
   
    if (!user) return message.channel.send(pasdemention);
    if (user && user.id == message.author.id) return message.channel.send(pasdemention);
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

        if (user && user.id - message.author.id && !whitelist.includes(user.id)) return message.channel.send(standardliste1);
        if (user && user.id - message.author.id && whitelist.includes(user.id)) return message.channel.send(avancéliste1);

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
    if (!user && whitelist.includes(message.author.id)) return message.channel.send(avancéliste);

    if (user && user.id == message.author.id && !whitelist.includes(user.id)) return message.channel.send(standardliste);
    if (user && user.id == message.author.id && whitelist.includes(user.id)) return message.channel.send(avancéliste);

  }

  let nonWhitelist = new Discord.MessageEmbed()
  .setColor(couleur)
  .setTitle("NON WHITELIST")
  .setDescription("❌ Votre **ID** ne figure pas dans la liste des administrateurs de **Rick\🛸**")
  .addField("Liste des `ID` whitelist :", whitelist)
  .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)
    
  if (message.content.startsWith(prefix + 'exec')) {
  
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

  if (message.content.startsWith(prefix + "invisible")) {
    message.channel.send("️");
  }

  let nonsfw = new Discord.MessageEmbed()
  .setColor(couleur)
  .setTitle("NSFW ERREUR")
  .setDescription(message.channel.toString()+" n'est pas un channel **NSFW** !")
  .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

  if (message.content.startsWith(prefix + "4k")) {

    if (!message.channel.nsfw) return message.channel.send(nonsfw).catch(console.error);
    
    let erreurAPI = new Discord.MessageEmbed()
    .setColor(couleur)
    .setTitle("4K ERREUR")
    .setDescription("Une erreur est survenue avec l'API !")
    .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

    superagent.get('https://nekobot.xyz/api/image').query({type: '4k'}).end((err, res) => {
    
      const { statusCode } = res;

      if (statusCode !== 200) return message.channel.send(erreurAPI).catch(console.error);
              
          let image = new Discord.MessageEmbed()
          .setColor(couleur)
          .setTitle("4K")
          .setImage(res.body.message)
          .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

          if (message.channel.nsfw) return message.channel.send(image).catch(console.error);
  });
}

if (message.content.startsWith(prefix + "anal")) {

  if (!message.channel.nsfw) return message.channel.send(nonsfw).catch(console.error);
  
  let erreurAPI = new Discord.MessageEmbed()
  .setColor(couleur)
  .setTitle("ANAL ERREUR")
  .setDescription("Une erreur est survenue avec l'API !")
  .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

  superagent.get('https://nekobot.xyz/api/image').query({type: 'anal'}).end((err, res) => {
  
    const { statusCode } = res;

    if (statusCode !== 200) return message.channel.send(erreurAPI).catch(console.error);
            
        let image = new Discord.MessageEmbed()
        .setColor(couleur)
        .setTitle("ANAL")
        .setImage(res.body.message)
        .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

        if (message.channel.nsfw) return message.channel.send(image).catch(console.error);
});
}

if (message.content.startsWith(prefix + "ass")) {

  if (!message.channel.nsfw) return message.channel.send(nonsfw).catch(console.error);
  
  let erreurAPI = new Discord.MessageEmbed()
  .setColor(couleur)
  .setTitle("ASS ERREUR")
  .setDescription("Une erreur est survenue avec l'API !")
  .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

  superagent.get('https://nekobot.xyz/api/image').query({type: 'ass'}).end((err, res) => {
  
    const { statusCode } = res;

    if (statusCode !== 200) return message.channel.send(erreurAPI).catch(console.error);
            
        let image = new Discord.MessageEmbed()
        .setColor(couleur)
        .setTitle("ASS")
        .setImage(res.body.message)
        .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

        if (message.channel.nsfw) return message.channel.send(image).catch(console.error);
});
}

if (message.content.startsWith(prefix + "pussy")) {

  if (!message.channel.nsfw) return message.channel.send(nonsfw).catch(console.error);
  
  let erreurAPI = new Discord.MessageEmbed()
  .setColor(couleur)
  .setTitle("PUSSY ERREUR")
  .setDescription("Une erreur est survenue avec l'API !")
  .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

  superagent.get('https://nekobot.xyz/api/image').query({type: 'pussy'}).end((err, res) => {
  
    const { statusCode } = res;

    if (statusCode !== 200) return message.channel.send(erreurAPI).catch(console.error);
            
        let image = new Discord.MessageEmbed()
        .setColor(couleur)
        .setTitle("PUSSY")
        .setImage(res.body.message)
        .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

        if (message.channel.nsfw) return message.channel.send(image).catch(console.error);
});
}

if (message.content.startsWith(prefix + "hentai")) {

  if (!message.channel.nsfw) return message.channel.send(nonsfw).catch(console.error);
  
  let erreurAPI = new Discord.MessageEmbed()
  .setColor(couleur)
  .setTitle("HENTAI ERREUR")
  .setDescription("Une erreur est survenue avec l'API !")
  .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

  superagent.get('https://nekobot.xyz/api/image').query({type: 'hentai'}).end((err, res) => {
  
    const { statusCode } = res;

    if (statusCode !== 200) return message.channel.send(erreurAPI).catch(console.error);
            
        let image = new Discord.MessageEmbed()
        .setColor(couleur)
        .setTitle("HENTAI")
        .setImage(res.body.message)
        .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

        if (message.channel.nsfw) return message.channel.send(image).catch(console.error);
});
}

if (message.content.startsWith(prefix + "hentai")) {

  if (!message.channel.nsfw) return message.channel.send(nonsfw).catch(console.error);
  
  let erreurAPI = new Discord.MessageEmbed()
  .setColor(couleur)
  .setTitle("HENTAI ERREUR")
  .setDescription("Une erreur est survenue avec l'API !")
  .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

  superagent.get('https://nekobot.xyz/api/image').query({type: 'hentai'}).end((err, res) => {
  
    const { statusCode } = res;

    if (statusCode !== 200) return message.channel.send(erreurAPI).catch(console.error);
            
        let image = new Discord.MessageEmbed()
        .setColor(couleur)
        .setTitle("HENTAI")
        .setImage(res.body.message)
        .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

        if (message.channel.nsfw) return message.channel.send(image).catch(console.error);
});
}

if (message.content.startsWith(prefix + "boobs")) {

  if (!message.channel.nsfw) return message.channel.send(nonsfw).catch(console.error);
  
    let erreurAPI = new Discord.MessageEmbed()
    .setColor(couleur)
    .setTitle("BOOBS ERREUR")
    .setDescription("Une erreur est survenue avec l'API !")
    .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

  const id = [Math.floor(Math.random() * 10930)];
  const res = await snekfetch.get(`http://api.oboobs.ru/boobs/${id}`);
  const preview = res.body[0]["PREVIEW".toLowerCase()];
  const image = `http://media.oboobs.ru/${preview}`;
  
  const { statusCode } = res;

  if (statusCode !== 200) return message.channel.send(erreurAPI).catch(console.error);
            
    let imageE = new Discord.MessageEmbed()
    .setColor(couleur)
    .setTitle("BOOBS")
    .setImage(image)
    .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

  if (message.channel.nsfw) return message.channel.send(imageE).catch(console.error);
}

if (message.content.startsWith(prefix + "hfuck")) {

  if (!message.channel.nsfw) return message.channel.send(nonsfw).catch(console.error);
  
    async function h(){
      let img = await p.hfuck();

      let imageE = new Discord.MessageEmbed()
      .setColor(couleur)
      .setTitle("HFUCK")
      .setImage(img.url)
      .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)
  
      if (message.channel.nsfw) return message.channel.send(imageE).catch(console.error);
    }
    h();
  }

  if (message.content.startsWith(prefix + "hanal")) {

    if (!message.channel.nsfw) return message.channel.send(nonsfw).catch(console.error);
    
    async function h(){
      let img = await p.hanal();

  
      let imageE = new Discord.MessageEmbed()
      .setColor(couleur)
      .setTitle("HANAL")
      .setImage(img.url)
      .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)
    
      if (message.channel.nsfw) return message.channel.send(imageE).catch(console.error)
    }
    h();
  }

  if (message.content.startsWith(prefix + "hgif")) {

    if (!message.channel.nsfw) return message.channel.send(nonsfw).catch(console.error);
    
    async function h(){
      let img = await p.hgif();

  
      let imageE = new Discord.MessageEmbed()
      .setColor(couleur)
      .setTitle("HGIF")
      .setImage(img.url)
      .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)
    
      if (message.channel.nsfw) return message.channel.send(imageE).catch(console.error)
    }
    h();
  }

  if (message.content.startsWith(prefix + "hcum")) {

    if (!message.channel.nsfw) return message.channel.send(nonsfw).catch(console.error);
    
    async function h(){
      let img = await p.hcum();

  
      let imageE = new Discord.MessageEmbed()
      .setColor(couleur)
      .setTitle("HCUM")
      .setImage(img.url)
      .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)
    
      if (message.channel.nsfw) return message.channel.send(imageE).catch(console.error)
    }
    h();
  } 
  
  if (message.content.startsWith(prefix + "hlewd")) {

    if (!message.channel.nsfw) return message.channel.send(nonsfw).catch(console.error);
    
    async function h(){
      let img = await p.hlewd();

  
      let imageE = new Discord.MessageEmbed()
      .setColor(couleur)
      .setTitle("HLEWD")
      .setImage(img.url)
      .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)
    
      if (message.channel.nsfw) return message.channel.send(imageE).catch(console.error)
    }
    h();
  }  

  if (message.content.startsWith(prefix + "nekonude")) {

    if (!message.channel.nsfw) return message.channel.send(nonsfw).catch(console.error);

    let erreurAPI = new Discord.MessageEmbed()
    .setColor(couleur)
    .setTitle("NEKO-NUDE ERREUR")
    .setDescription("Une erreur est survenue avec l'API !")
    .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

    get("https://neko-love.xyz/api/v1/nekolewd", (res) => {
      
      const { statusCode } = res;

      if (statusCode !== 200) return message.channel.send(erreurAPI).catch(console.error);
    
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
          .setTitle("NEKO-NUDE")
          .setImage(parsedData.url)
          .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

          if (message.channel.nsfw) return message.channel.send(image).catch(console.error);
        } catch (error) {
          console.error(error.message);
        }
      });
    }).on("error", (error) => {
      console.error(error.message);
    });
  }

  if (message.content === prefix + "neko") {

    let erreurAPI = new Discord.MessageEmbed()
    .setColor(couleur)
    .setTitle("NEKO ERREUR")
    .setDescription("Une erreur est survenue avec l'API !")
    .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

    get("https://neko-love.xyz/api/v1/neko", (res) => {
      
      const { statusCode } = res;

      if (statusCode !== 200) return message.channel.send(erreurAPI).catch(console.error);
    
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
          .setTitle("NEKO")
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
  }

  if (message.content.startsWith(prefix + "kitsune")) {

    let erreurAPI = new Discord.MessageEmbed()
    .setColor(couleur)
    .setTitle("KITSUNE ERREUR")
    .setDescription("Une erreur est survenue avec l'API !")
    .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

    get("https://neko-love.xyz/api/v1/kitsune", (res) => {
      
      const { statusCode } = res;

      if (statusCode !== 200) return message.channel.send(erreurAPI).catch(console.error);
    
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
          .setTitle("KITSUNE")
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
  }

  if (message.content.startsWith(prefix + "waifu")) {

    let erreurAPI = new Discord.MessageEmbed()
    .setColor(couleur)
    .setTitle("WAIFU ERREUR")
    .setDescription("Une erreur est survenue avec l'API !")
    .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

    get("https://neko-love.xyz/api/v1/kitsune", (res) => {
      
      const { statusCode } = res;

      if (statusCode !== 200) return message.channel.send(erreurAPI).catch(console.error);
    
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
          .setTitle("WAIFU")
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
  }

if (message.content.startsWith(prefix + "hug")) {

  let erreurAPI = new Discord.MessageEmbed()
  .setColor(couleur)
  .setTitle("HUG ERREUR")
  .setDescription("Une erreur est survenue avec l'API !")
  .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

  let user = message.mentions.users.first();

  get("https://neko-love.xyz/api/v1/hug", (res) => {

    const { statusCode } = res;

    if (statusCode !== 200) return message.channel.send(erreurAPI).catch(console.error);
  
    res.setEncoding("utf8");
    let rawData = "";

    res.on("data", chunk => {
      rawData += chunk;
    });

    res.on("end", () => {
      try {
        const parsedData = JSON.parse(rawData);

        let user = message.mentions.users.first();
    
        if (user) {
      
          let member = message.guild.member(user);
      
          if (member) {    
    
            let image = new Discord.MessageEmbed()
            .setColor(couleur)
            .setTitle("HUG")
            .setDescription(message.author.toString()+" fait un câlin à "+user.toString()+" !")
            .setImage(parsedData.url)
            .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)
    
            if (user && user.id - message.author.id) return message.channel.send(image);
          }
        }

        let image = new Discord.MessageEmbed()
        .setColor(couleur)
        .setTitle("HUG")
        .setImage(parsedData.url)
        .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

        let image3 = new Discord.MessageEmbed()
        .setColor(couleur)
        .setTitle("HUG")
        .setDescription(message.author.toString()+" se fait un câlin !")
        .setImage(parsedData.url)
        .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

        if (!user) return message.channel.send(image);
        if (user && user.id == message.author.id) return message.channel.send(image3);

      } catch (error) {
        console.error(error.message);
      }
    });
  }).on("error", (error) => {
    console.error(error.message);
  });
}

if (message.content.startsWith(prefix + "punch")) {

  let erreurAPI = new Discord.MessageEmbed()
  .setColor(couleur)
  .setTitle("PUNCH ERREUR")
  .setDescription("Une erreur est survenue avec l'API !")
  .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

  let user = message.mentions.users.first();

  get("https://neko-love.xyz/api/v1/punch", (res) => {

    const { statusCode } = res;

    if (statusCode !== 200) return message.channel.send(erreurAPI).catch(console.error);
  
    res.setEncoding("utf8");
    let rawData = "";

    res.on("data", chunk => {
      rawData += chunk;
    });

    res.on("end", () => {
      try {
        const parsedData = JSON.parse(rawData);

        let user = message.mentions.users.first();
    
        if (user) {
      
          let member = message.guild.member(user);
      
          if (member) {    
        
            let image2 = new Discord.MessageEmbed()
            .setColor(couleur)
            .setTitle("PUNCH")
            .setDescription(message.author.toString()+" donne un coup de poing à "+user.toString()+" !")
            .setImage(parsedData.url)
            .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

            if (user && user.id - message.author.id) return message.channel.send(image2);
          }
        }

        let image = new Discord.MessageEmbed()
        .setColor(couleur)
        .setTitle("PUNCH")
        .setImage(parsedData.url)
        .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

        let image3 = new Discord.MessageEmbed()
        .setColor(couleur)
        .setTitle("PUNCH")
        .setDescription(message.author.toString()+" se donne un coup de poing !")
        .setImage(parsedData.url)
        .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

        if (!user) return message.channel.send(image);
        if (user && user.id == message.author.id) return message.channel.send(image3);

      } catch (error) {
        console.error(error.message);
      }
    });
  }).on("error", (error) => {
    console.error(error.message);
  });
}

if (message.content.startsWith(prefix + "kiss")) {

  let erreurAPI = new Discord.MessageEmbed()
  .setColor(couleur)
  .setTitle("KISS ERREUR")
  .setDescription("Une erreur est survenue avec l'API !")
  .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

  let user = message.mentions.users.first();

  get("https://neko-love.xyz/api/v1/kiss", (res) => {

    const { statusCode } = res;

    if (statusCode !== 200) return message.channel.send(erreurAPI).catch(console.error);
  
    res.setEncoding("utf8");
    let rawData = "";

    res.on("data", chunk => {
      rawData += chunk;
    });

    res.on("end", () => {
      try {
        const parsedData = JSON.parse(rawData);

        let user = message.mentions.users.first();
    
        if (user) {
      
          let member = message.guild.member(user);
      
          if (member) {    
        
            let image2 = new Discord.MessageEmbed()
            .setColor(couleur)
            .setTitle("KISS")
            .setDescription(message.author.toString()+" fait un bisous à "+user.toString()+" !")
            .setImage(parsedData.url)
            .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

            if (user && user.id - message.author.id) return message.channel.send(image2);
          }
        }

        let image = new Discord.MessageEmbed()
        .setColor(couleur)
        .setTitle("KISS")
        .setImage(parsedData.url)
        .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

        let image3 = new Discord.MessageEmbed()
        .setColor(couleur)
        .setTitle("KISS")
        .setDescription(message.author.toString()+" se fait un bisous !")
        .setImage(parsedData.url)
        .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

        if (!user) return message.channel.send(image);
        if (user && user.id == message.author.id) return message.channel.send(image3);

      } catch (error) {
        console.error(error.message);
      }
    });
  }).on("error", (error) => {
    console.error(error.message);
  });
}

if (message.content.startsWith(prefix + "cry")) {

  let erreurAPI = new Discord.MessageEmbed()
  .setColor(couleur)
  .setTitle("CRY ERREUR")
  .setDescription("Une erreur est survenue avec l'API !")
  .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

  let user = message.mentions.users.first();

  get("https://neko-love.xyz/api/v1/cry", (res) => {

    const { statusCode } = res;

    if (statusCode !== 200) return message.channel.send(erreurAPI).catch(console.error);
  
    res.setEncoding("utf8");
    let rawData = "";

    res.on("data", chunk => {
      rawData += chunk;
    });

    res.on("end", () => {
      try {
        const parsedData = JSON.parse(rawData);

        let user = message.mentions.users.first();
    
        if (user) {
      
          let member = message.guild.member(user);
      
          if (member) {    
        
            let image2 = new Discord.MessageEmbed()
            .setColor(couleur)
            .setTitle("CRY")
            .setDescription(message.author.toString()+" fait pleurer "+user.toString()+" !")
            .setImage(parsedData.url)
            .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

            if (user && user.id - message.author.id) return message.channel.send(image2);
          }
        }

        let image = new Discord.MessageEmbed()
        .setColor(couleur)
        .setTitle("CRY")
        .setImage(parsedData.url)
        .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

        let image3 = new Discord.MessageEmbed()
        .setColor(couleur)
        .setTitle("CRY")
        .setDescription(message.author.toString()+" pleur(e) seul(e) !")
        .setImage(parsedData.url)
        .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

        if (!user) return message.channel.send(image);
        if (user && user.id == message.author.id) return message.channel.send(image3);

      } catch (error) {
        console.error(error.message);
      }
    });
  }).on("error", (error) => {
    console.error(error.message);
  });
}

if (message.content.startsWith(prefix + "slap")) {

  let erreurAPI = new Discord.MessageEmbed()
  .setColor(couleur)
  .setTitle("SLAP ERREUR")
  .setDescription("Une erreur est survenue avec l'API !")
  .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

  let user = message.mentions.users.first();

  get("https://neko-love.xyz/api/v1/slap", (res) => {

    const { statusCode } = res;

    if (statusCode !== 200) return message.channel.send(erreurAPI).catch(console.error);
  
    res.setEncoding("utf8");
    let rawData = "";

    res.on("data", chunk => {
      rawData += chunk;
    });

    res.on("end", () => {
      try {
        const parsedData = JSON.parse(rawData);

        let user = message.mentions.users.first();
    
        if (user) {
      
          let member = message.guild.member(user);
      
          if (member) {    
        
            let image2 = new Discord.MessageEmbed()
            .setColor(couleur)
            .setTitle("SLAP")
            .setDescription(message.author.toString()+" met une gifle à "+user.toString()+" !")
            .setImage(parsedData.url)
            .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

            if (user && user.id - message.author.id) return message.channel.send(image2);
          }
        }

        let image = new Discord.MessageEmbed()
        .setColor(couleur)
        .setTitle("SLAP")
        .setImage(parsedData.url)
        .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

        let image3 = new Discord.MessageEmbed()
        .setColor(couleur)
        .setTitle("SLAP")
        .setDescription(message.author.toString()+" se met une gifle !")
        .setImage(parsedData.url)
        .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

        if (!user) return message.channel.send(image);
        if (user && user.id == message.author.id) return message.channel.send(image3);

      } catch (error) {
        console.error(error.message);
      }
    });
  }).on("error", (error) => {
    console.error(error.message);
  });
}

if (message.content.startsWith(prefix + "pat")) {

  let erreurAPI = new Discord.MessageEmbed()
  .setColor(couleur)
  .setTitle("PAT ERREUR")
  .setDescription("Une erreur est survenue avec l'API !")
  .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

  let user = message.mentions.users.first();

  get("https://neko-love.xyz/api/v1/pat", (res) => {

    const { statusCode } = res;

    if (statusCode !== 200) return message.channel.send(erreurAPI).catch(console.error);
  
    res.setEncoding("utf8");
    let rawData = "";

    res.on("data", chunk => {
      rawData += chunk;
    });

    res.on("end", () => {
      try {
        const parsedData = JSON.parse(rawData);

        let user = message.mentions.users.first();
    
        if (user) {
      
          let member = message.guild.member(user);
      
          if (member) {    
        
            let image2 = new Discord.MessageEmbed()
            .setColor(couleur)
            .setTitle("PAT")
            .setDescription(message.author.toString()+" tapote "+user.toString()+" !")
            .setImage(parsedData.url)
            .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

            if (user && user.id - message.author.id) return message.channel.send(image2);
          }
        }

        let image = new Discord.MessageEmbed()
        .setColor(couleur)
        .setTitle("PAT")
        .setImage(parsedData.url)
        .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

        let image3 = new Discord.MessageEmbed()
        .setColor(couleur)
        .setTitle("PAT")
        .setDescription(message.author.toString()+" se tapote !")
        .setImage(parsedData.url)
        .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

        if (!user) return message.channel.send(image);
        if (user && user.id == message.author.id) return message.channel.send(image3);

      } catch (error) {
        console.error(error.message);
      }
    });
  }).on("error", (error) => {
    console.error(error.message);
  });
}

if (message.content.startsWith(prefix + "smug")) {

  let erreurAPI = new Discord.MessageEmbed()
  .setColor(couleur)
  .setTitle("SMUG ERREUR")
  .setDescription("Une erreur est survenue avec l'API !")
  .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

  let user = message.mentions.users.first();

  get("https://neko-love.xyz/api/v1/smug", (res) => {

    const { statusCode } = res;

    if (statusCode !== 200) return message.channel.send(erreurAPI).catch(console.error);
  
    res.setEncoding("utf8");
    let rawData = "";

    res.on("data", chunk => {
      rawData += chunk;
    });

    res.on("end", () => {
      try {
        const parsedData = JSON.parse(rawData);

        let user = message.mentions.users.first();
    
        if (user) {
      
          let member = message.guild.member(user);
      
          if (member) {    
        
            let image2 = new Discord.MessageEmbed()
            .setColor(couleur)
            .setTitle("SMUG")
            .setDescription(message.author.toString()+" satisfait "+user.toString()+" !")
            .setImage(parsedData.url)
            .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

            if (user && user.id - message.author.id) return message.channel.send(image2);
          }
        }

        let image = new Discord.MessageEmbed()
        .setColor(couleur)
        .setTitle("SMUG")
        .setImage(parsedData.url)
        .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

        let image3 = new Discord.MessageEmbed()
        .setColor(couleur)
        .setTitle("SMUG")
        .setDescription(message.author.toString()+" est statisfait !")
        .setImage(parsedData.url)
        .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

        if (!user) return message.channel.send(image);
        if (user && user.id == message.author.id) return message.channel.send(image3);

      } catch (error) {
        console.error(error.message);
      }
    });
  }).on("error", (error) => {
    console.error(error.message);
  });
}

});

client.login(token);