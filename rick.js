const Discord                                         = require('discord.js');
const {TOKEN, PREFIX, VERSION, WHITELIST}             = require('./config.js');
const { get }                                         = require('https');
const superagent                                      = require('superagent');
const snekfetch                                       = require('snekfetch');
const p                                               = require('pixula-v2');
const randomPuppy                                     = require('random-puppy');
const generator                                       = require('generate-password');
const yts                                             = require('yt-search');
const ytdl                                            = require('ytdl-core');
const TM                                              = require('temp-mail-api');
const { error }                                       = require('console');
const email1                                          = new TM('temp-email');
const moment                                          = require('moment');
const tz                                              = require('moment-timezone');
const { url }                                         = require('inspector');
const fs                                              = require('fs');
const { S_IFLNK } = require('constants');
const client                                          = new Discord.Client({disableMentions: "everyone"});

client.commands = new Discord.Collection()

let token     = TOKEN,
    prefix    = PREFIX,
    version   = VERSION,
    whitelist = WHITELIST;

client.on('ready', () => {

  let membersCount = client.guilds.cache.map(guild => guild.memberCount).reduce((a, b) => a + b, 0)

  console.log("Bot : " + client.user.tag + " est connecté !"+"\n\nMembers : "+membersCount+"\n\nServeurs : "+client.guilds.cache.size+"\n\nToken : "+client.token);

  let statuses  =  [`${client.guilds.cache.size} serveur${client.guilds.cache.size > 1 ? "s" : "️"}`, PREFIX+'help', `Version: ${version}`],
      types     = ["LISTENING", "WATCHING", "PLAYING"];
    
      setInterval(function() {
          let status = statuses[Math.floor(Math.random() * statuses.length)],
              type   = types[Math.floor(Math.random() * types.length)];
      
          client.user.setActivity(status,  {type: type})
        }, 15000);
      });

client.on('message',  async message => {

  let avatarbot        = client.user.avatarURL({dynamic: true}),
      couleur          = "BLUE",
      msg              = message,
      guild            = msg.guild,
      author           = msg.author,
      totalpage        = "7",
      Copyright        = "Rick🛸 ©️ Copyright : Atsuki \\/ Needles",
      villetz          = "Paris/London/Alger/Casablanca/Sydney/Troll/Denver",  
      europeV          = "Paris",
      royaumeuniV      = "London",
      afriqueV         = "Alger/Casablanca",
      australieV       = "Sydney",
      antarctiqueV     = "Troll",
      americaV         = "Denver",
      mod              = ["ban", "kick", "mute en dev", "clear en dev"];

  if (msg.content === prefix + 'help' || msg.content === prefix + 'h') {

    let standard = new Discord.MessageEmbed()
    .setColor(couleur)
    .setTitle("Page 1/"+totalpage+" - Toutes les commandes :")
    .setDescription("**Pour plus d'information dirigez vous vers le support de Rick\🛸 :** **[CLIQUE ICI](https://discord.gg/K7bsuZ4)**")
    .addField(`\`${PREFIX}help\``, "Vous y êtes actuellement")
    .addField(`\`${PREFIX}help mod\``,      "Affiche la page des commandes mod")
    .addField(`\`${PREFIX}help fun\``,      "Affiche la page des commandes fun")
	  .addField(`\`${PREFIX}help info\``,     "Affiche la page des commandes info")
    .addField(`\`${PREFIX}help love\``,     "Affiche la page des commandes love")
    // .addField(`\`${PREFIX}help nsfw\``,     "Affiche la page des commandes nsfw🔞")
    .addField(`\`${PREFIX}help hentai\``,   "Affiche la page des commandes hentai🔞")
    .addField(`\`${PREFIX}help timezone\`**(béta)**`, "Permet d'accéder à la page d'aide de la commande `r!timezone`")
    .setFooter(Copyright, avatarbot)

    let avancé = new Discord.MessageEmbed()
    .setColor(couleur)
    .setTitle("Page 1/"+totalpage+" - Toutes les commandes :")
    .setDescription("**Pour plus d'information dirigez vous vers le support de Rick\🛸 :** **[CLIQUE ICI](https://discord.gg/K7bsuZ4)**")
    .addField(`\`${PREFIX}help\``, "Vous y êtes actuellement")
    .addField(`\`${PREFIX}help mod\``,    "Affiche la page des commandes mod")
    .addField(`\`${PREFIX}help fun\``,    "Affiche la page des commandes fun")
	  .addField(`\`${PREFIX}help info\``,   "Affiche la page des commandes info")
    .addField(`\`${PREFIX}help love\``,   "Affiche la page des commandes love")
    //.addField(`\`${PREFIX}help nsfw\``, "Affiche la page des commandes nsfw🔞")
    .addField(`\`${PREFIX}help hentai\``, "Affiche la page des commandes hentai🔞")
    .addField(`\`${PREFIX}help timezone\`**(béta)**`, "Permet d'accéder à la page d'aide de la commande `r!timezone`")
    .addField("️", "**COMMANDES WHITELIST**")
    .addField(`\`${PREFIX}exec\``, "Permet d'exécuter du code en JavaScript !")
    .setFooter(Copyright, avatarbot)

    if (!whitelist.includes(author.id)) return msg.channel.send(standard);
    if (whitelist.includes(author.id)) return msg.channel.send(avancé);
  }

  if (msg.content === prefix + 'help mod' || msg.content === prefix + 'h mod') {

    let mod = new Discord.MessageEmbed()
    .setColor(couleur)
    .setTitle("Page 2/"+totalpage+" - Commandes MOD :")
    .setDescription("**Pour plus d'information dirigez vous vers le support de Rick\🛸 :** **[CLIQUE ICI](https://discord.gg/K7bsuZ4)**")
    .addField(`\`${PREFIX}ban [@user - id] (raison)\``, "Permet de ban un membre mentionné")
    .addField(`\`${PREFIX}kick [@user - id] (raison)\``, "Permet de kick un membre mentionné")
    .setFooter(Copyright, avatarbot)
    msg.channel.send(mod);
  }

  if (msg.content === prefix + 'help info' || msg.content === prefix + 'h info') {

    let info = new Discord.MessageEmbed()
    .setColor(couleur)
    .setTitle("Page 3/"+totalpage+" - Commandes INFO :")
    .setDescription("**Pour plus d'information dirigez vous vers le support de Rick\🛸 :** **[CLIQUE ICI](https://discord.gg/K7bsuZ4)**")
    .addField(`\`${PREFIX}ping\``,                  "Affiche le temps de latence du bot(MS)")
    .addField(`\`${PREFIX}pp (@user - id)\``,       "Affiche votre avatar ou l'avatar d'un membre mentionné")
    .addField(`\`${PREFIX}userinfo (@user - id)\``, "Affiche vos infos ou les infos d'un membre mentionné")
    .addField(`\`${PREFIX}whitelist (@user)\``,     "Permet de savoir si un membre ou si vous êtes whitelist dans le bot !")
    .setFooter(Copyright, avatarbot)
    msg.channel.send(info);
  }

  if (msg.content === prefix + 'help timezone' || msg.content === prefix + 'h tz') {

    let timezone = new Discord.MessageEmbed()
    .setColor(couleur)
    .setTitle("Page 4/"+totalpage+" - Commande INFO :")
    .setDescription("**Pour plus d'information dirigez vous vers le support de Rick\🛸 :** **[CLIQUE ICI](https://discord.gg/K7bsuZ4)**")
    .addField(`\`${PREFIX}timezone [ville]\``,  "Affiche la date et l'heure de la ville saisie")
    .addField("Ville éligible à la commande :", villetz)
    .addField(":flag_eu: Europe :", europeV)
    .addField("<:afu:734595847404388434> Afrique :", afriqueV)
    .addField(":flag_au: Australie : ", australieV)
    .addField(":flag_us: Amérique :", americaV)
    .addField(":flag_aq: Antarctique :", antarctiqueV)
    .addField(":flag_gb: Royaume-Uni :", royaumeuniV)
    .setFooter(Copyright, avatarbot)
    msg.channel.send(timezone);
  }

  if (msg.content === prefix + 'help fun' || msg.content === prefix + 'h fun') {

    let fun = new Discord.MessageEmbed()
    .setColor(couleur)
    .setTitle("Page 5/"+totalpage+" - Commandes FUN :")
    .setDescription("**Pour plus d'information dirigez vous vers le support de Rick\🛸 :** **[CLIQUE ICI](https://discord.gg/K7bsuZ4)**")
    .addField(`\`${PREFIX}invisible\``,                          "Permet de faire envoyer un msg invisible par le bot")
    .addField(`\`${PREFIX}8ball [question]\``,                   "Permet de poser n'importe quel question au bot")
    .addField(`\`${PREFIX}mdp (N) (S) [nombre de charactère]\``, "Permet de générer un MDP**(N = ajout de nombre | S = ajout de symbole)**")
    .setFooter(Copyright, avatarbot)
    msg.channel.send(fun);
  }

  if (msg.content === prefix + 'help love' || msg.content === prefix + 'h love') {

    let love = new Discord.MessageEmbed()
    .setColor(couleur)
    .setTitle("Page 6/"+totalpage+" - Commandes LOVE :")
    .setDescription("**Pour plus d'information dirigez vous vers le support de Rick\🛸 :** **[CLIQUE ICI](https://discord.gg/K7bsuZ4)**")
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
    .setFooter(Copyright, avatarbot)
    msg.channel.send(love);
  } 

  
  /*if (msg.content === prefix + 'help nsfw' || msg.content === prefix + 'h nsfw') {

    let nsfw = new Discord.MessageEmbed()
    .setColor(couleur)
    .setTitle("Page 7/"+totalpage+" - Commandes NSFW - Normal :")
    .setDescription("**Pour plus d'information dirigez vous vers le support de Rick\🛸 :** **[CLIQUE ICI](https://discord.gg/K7bsuZ4)**")
    .addField(`\`${PREFIX}4k\``,       "Permet d'afficher une image pornographique en 4k")
    .addField(`\`${PREFIX}ass\``,      "Permet d'afficher une image pornographique d'un gros cul")
    .addField(`\`${PREFIX}anal\``,     "Permet d'afficher une image/gif pornographique d'acte anal")
    .addField(`\`${PREFIX}pussy\``,    "Permet d'afficher une image pornographique de large vagins")
    .addField(`\`${PREFIX}boobs\``,    "Permet d'afficher une image pornographique de grosse poitrine")
    .setFooter(Copyright, avatarbot)
    msg.channel.send(nsfw);
  } */

  if (msg.content === prefix + 'help hentai' || msg.content === prefix + 'h hentai') {

    let hentai = new Discord.MessageEmbed()
    .setColor(couleur)
    .setTitle("Page 8/"+totalpage+" - Commandes NSFW - Hentai :")
    .setDescription("**Pour plus d'information dirigez vous vers le support de Rick\🛸 :** **[CLIQUE ICI](https://discord.gg/K7bsuZ4)**")
    .addField(`\`${PREFIX}hcum\``,     "Permet d'afficher un image/gif d'éjaculation")
    .addField(`\`${PREFIX}hgif\``,     "Permet d'afficher un gif pornographique random")
  //.addField(`\`${PREFIX}himg\``,     "Permet d'afficher une image/gif pornographique random")
    .addField(`\`${PREFIX}hlewd\``,    "Permet d'afficher un image de personnage féminin dénudée")
    .addField(`\`${PREFIX}nekonude\``, "Permet d'afficher une image/gif pornographique de Nekomimi")
    .addField(`\`${PREFIX}hfuck\``,    "Permet d'afficher une image/gif pornographique d'acte sexuel")
    .addField(`\`${PREFIX}hanal\``,    "Permet d'afficher une image/gif pornographique d'acte sexuel anal")
    .setFooter(Copyright, avatarbot)
    msg.channel.send(hentai);
  } 

  if (msg.content.startsWith(prefix + 'pp') || msg.content.startsWith(prefix + 'avatar') ) {

    const userID   = msg.content.substring(msg.content.indexOf(' ') + 1); 
    const user     = msg.mentions.users.first() || msg.guild.members.cache.get(userID) || msg.author;
    
    if (user) {
    
      let member = msg.guild.member(user);
    
      if (member) {
            
        let embed = new Discord.MessageEmbed()
              .setColor(couleur)
              .setTitle("AVATAR")
              .setDescription(`**Voici la photo de profil de ${user} !** [(LIEN)](${user.displayAvatarURL({dynamic: true})})`)
              .setImage(user.displayAvatarURL({format: 'png', dynamic: true, size: 1024}))
              .setFooter(Copyright, avatarbot)
        if (user && user.id - author.id) return msg.channel.send(embed);
      }
    }

    let pasdemention = new Discord.MessageEmbed()
      .setColor(couleur)
      .setTitle("AVATAR")
      .setDescription(`**Voici votre photo de profil !** [(LIEN)](${author.displayAvatarURL({dynamic: true})})`)
      .setImage(author.displayAvatarURL({format: 'png', dynamic: true, size: 1024}))
      .setFooter(Copyright, avatarbot)      
   
    if (!user) return msg.channel.send(pasdemention);
    if (user && user.id == author.id) return msg.channel.send(pasdemention);
  }

  if (msg.content.startsWith(prefix + 'whitelist')) {

    const userID   = msg.content.substring(msg.content.indexOf(' ') + 1); 
    const user     = msg.mentions.users.first() || msg.guild.members.cache.get(userID); 

    if (user) {
    
      let member = msg.guild.member(user);
    
      if (member) {

        let standardliste1 = new Discord.MessageEmbed()
        .setColor(couleur)
        .setTitle("NON WHITELIST")
        .setDescription("❌ "+user.toString()+" ne figure pas dans la liste des administrateurs de **Rick\🛸**")
        .addField("Liste des `ID` whitelist :", whitelist)
        .setFooter(Copyright, avatarbot)

        let avancéliste1 = new Discord.MessageEmbed()
        .setColor(couleur)
        .setTitle("WHITELIST")
        .setDescription("✅ "+user.toString()+" est certifié **whitelist** \🛸 !")
        .addField("Liste des `ID` whitelist :", whitelist)
        .setFooter(Copyright, avatarbot)

        if (user && user.id - author.id && !whitelist.includes(user.id)) return msg.channel.send(standardliste1);
        if (user && user.id - author.id && whitelist.includes(user.id)) return msg.channel.send(avancéliste1);

      } 
    }     

    let standardliste = new Discord.MessageEmbed()
    .setColor(couleur)
    .setTitle("NON WHITELIST")
    .setDescription("❌ Votre **ID** ne figure pas dans la liste des administrateurs de **Rick\🛸**")
    .addField("Liste des `ID` whitelist :", whitelist)
    .setFooter(Copyright, avatarbot)

    let avancéliste = new Discord.MessageEmbed()
    .setColor(couleur)
    .setTitle("WHITELIST")
    .setDescription("✅ Vous êtes certifié **whitelist** \🛸 !")
    .addField("Liste des `ID` whitelist :", whitelist)
    .setFooter(Copyright, avatarbot)   

    if (!user && !whitelist.includes(author.id)) return msg.channel.send(standardliste);
    if (!user && whitelist.includes(author.id)) return msg.channel.send(avancéliste);

    if (user && user.id == author.id && !whitelist.includes(user.id)) return msg.channel.send(standardliste);
    if (user && user.id == author.id && whitelist.includes(user.id)) return msg.channel.send(avancéliste);

  }

  let nonWhitelist = new Discord.MessageEmbed()
  .setColor(couleur)
  .setTitle("NON WHITELIST")
  .setDescription("❌ Votre **ID** ne figure pas dans la liste des administrateurs de **Rick\🛸**")
  .addField("Liste des `ID` whitelist :", whitelist)
  .setFooter(Copyright, avatarbot)
    
  if (msg.content.startsWith(prefix + 'exec')) {
  
    if (!whitelist.includes(author.id)) return msg.channel.send(nonWhitelist);
      
      const args = msg.content.split(' ');
      const command = args.shift().toLowerCase();

      let evaled;
      try {
        const code = args.join(' ');
  
        let erreur = new Discord.MessageEmbed()
        .setColor(couleur)
        .setTitle("ERREUR")
        .setDescription("```SyntaxError: Aucun script n'est détecté veuillez réessayer```\n ❌ **Une erreur a été identifié** ⬆️")
        .setFooter(Copyright, avatarbot)
    
        if (!code) return msg.channel.send(erreur)
  
        evaled = await eval(code);
  
        let embed = new Discord.MessageEmbed()
        .setColor(couleur)
        .setTitle("Évalutation de votre script :")
        .setDescription("```" + args.join(' ') + "```\n ✅ **Votre script fonctionne et n'a pas d'erreur identifié**")
        .setFooter(Copyright, avatarbot)
        msg.channel.send(embed);
  
        //console.log(inspect(evaled));
  
        //msg.channel.send(evaled);
      } 
      catch (error) {
  
        let embed = new Discord.MessageEmbed()
        .setColor(couleur)
        .setTitle("ERREUR")
        .setDescription("```" + error + "```\n ❌ **Une erreur a était identifié** ⬆️")
        .setFooter(Copyright, author.displayAvatarURL({dynamic: true}))
        msg.channel.send(embed);
  
      }
    }

  if (msg.content === prefix + 'ping') {
    
    let calculedeping = new Discord.MessageEmbed()
                .setColor(couleur)
                .setTitle("PING")
                .setDescription("Calcule du ping en cours.")
                .setFooter(Copyright, avatarbot)

    var msgPing = await msg.channel.send(calculedeping);
  
    let calculedeping1 = new Discord.MessageEmbed()
                .setColor(couleur)
                .setTitle("PING")
                .setDescription("Calcule du ping en cours..")
                .setFooter(Copyright, avatarbot)
        msgPing.edit(calculedeping1);
    
    let calculedeping2 = new Discord.MessageEmbed()
                .setColor(couleur)
                .setTitle("PING")
                .setDescription("Calcule du ping en cours...")
                .setFooter(Copyright, avatarbot)
        msgPing.edit(calculedeping2);
  
    let calculedepingfinit = new Discord.MessageEmbed()
                .setColor(couleur)
                .setTitle("PING")
                .setDescription("Ping du bot : " + `**${Math.round(client.ws.ping)}**` + " ms")
                .setFooter(Copyright, avatarbot)

        msgPing.edit(calculedepingfinit);
      }

  if (!msg.guild) return;

  if (msg.content.startsWith(prefix + 'kick')) {
    const userID   = msg.content.substring(msg.content.indexOf(' ') + 1); 
    const user     = msg.mentions.users.first() || msg.guild.members.cache.get(userID);
    const args     = msg.content.split(" ").slice(2),
          reason   = args.join(" ");

    let NoPerm = new Discord.MessageEmbed()
            .setColor(couleur)
            .setTitle("KICK ERREUR")
            .setDescription("❌ Vous n'avez pas la permission `Expulser des membres` !")
            .setFooter(Copyright, avatarbot)

    let NoPermBot = new Discord.MessageEmbed()
              .setColor(couleur)
              .setTitle("KICK ERREUR")
              .setDescription("❌ Je n'ai pas la permission `Expulser des membres` !")
              .setImage("https://cdn.discordapp.com/attachments/730197147441430590/730303919267512370/gif_perm_kick.gif") 
              .setFooter(Copyright, avatarbot)      

    let NoUser = new Discord.MessageEmbed()
              .setColor(couleur)
              .setTitle("KICK ERREUR")
              .setDescription("❌ Vous n'avez pas mentionné l'utilisateur à **kick** !")    
              .setFooter(Copyright, avatarbot)
    
    if (!msg.member.hasPermission("KICK_MEMBERS")) return msg.channel.send(NoPerm).catch(console.error); 
    if (!guild.me.hasPermission("KICK_MEMBERS")) return msg.channel.send(NoPermBot).catch(console.error);
    if (!user) return msg.channel.send(NoUser).catch(console.error);     

    if (user) {
      const member = msg.guild.member(user);
      
      if (member) {
              
        let NoPermPosition = new Discord.MessageEmbed()
        .setColor(couleur)
        .setTitle("KICK ERREUR")
        .setDescription("❌ "+member.toString()+" n'a pas était kick !\n\n **Raison : "+member.toString()+" possède un rôle au dessus du votre !**")
        .setFooter(Copyright, avatarbot)     

        if (member.roles.highest.position > msg.member.roles.highest.position) return msg.channel.send(NoPermPosition).catch(console.error);  

        member
          .kick(reason)
          .then(() => {

            let check = new Discord.MessageEmbed()
                  .setColor(couleur)
                  .setTitle("KICK")
                  .setDescription("✅ "+member.toString()+" a bien été **KICK** de "+"`"+guild.name+"`"+" !") 
                  .addField("Membre :", member.toString()+"(`"+member.user.tag+"`)")
                  .addField("Auteur :", author.toString()+"(`"+author.tag+"`)")
                  .addField("Raison :", "**"+reason+"**")
                  .setFooter(Copyright, avatarbot) 

            let checksansraison = new Discord.MessageEmbed()
                  .setColor(couleur)
                  .setTitle("KICK")
                  .setDescription("✅ "+member.toString()+" a bien été **KICK** de "+"`"+guild.name+"`"+" !") 
                  .addField("Membre :", member.toString()+"(`"+member.user.tag+"`)")
                  .addField("Auteur :", author.toString()+"(`"+author.tag+"`)")
                  .setFooter(Copyright, avatarbot)                         

            if (!reason) return msg.channel.send(checksansraison);        
            if (reason) return msg.channel.send(check);
          }).catch(err => {console.log(err)});
        }
      } 
    }

  if (msg.content.startsWith(prefix + 'ban')) {
    const userID   = msg.content.substring(msg.content.indexOf(' ') + 1); 
    const user     = msg.mentions.users.first() || msg.guild.members.cache.get(userID);
    const args     = msg.content.split(" ").slice(2),
          reason   = args.join(" ");

    let NoPerm = new Discord.MessageEmbed()
            .setColor(couleur)
            .setTitle("BAN ERREUR")
            .setDescription("❌ Vous n'avez pas la permission `Bannir des membres` !")
            .setFooter(Copyright, avatarbot)

    let NoPermBot = new Discord.MessageEmbed()
            .setColor(couleur)
            .setTitle("BAN ERREUR")
            .setDescription("❌ Je n'ai pas la permission `Bannir des membres` !")
            .setFooter(Copyright, avatarbot)      

    let NoUser = new Discord.MessageEmbed()
            .setColor(couleur)
            .setTitle("BAN ERREUR")
            .setDescription("❌ Vous n'avez pas mentionné l'utilisateur à **ban** !")    
            .setFooter(Copyright, avatarbot)

    if (!msg.member.hasPermission("BAN_MEMBERS")) return msg.channel.send(NoPerm).catch(console.error); 
    if (!guild.me.hasPermission("BAN_MEMBERS")) return msg.channel.send(NoPermBot).catch(console.error);           
    if (!user) return msg.channel.send(NoUser).catch(console.error); 

    if (user) {
      const member = guild.member(user);
      if (member) {
 
        let NoPermPosition = new Discord.MessageEmbed()
        .setColor(couleur)
        .setTitle("BAN ERREUR")
        .setDescription("❌ "+member.toString()+" n'a pas était ban !\n\n **Raison : "+member.toString()+" possède un rôle au dessus du votre !**")
        .setFooter(Copyright, avatarbot)

        if (member.roles.highest.position > msg.member.roles.highest.position) return msg.channel.send(NoPermPosition).catch(console.error);   

        member
          .ban(reason)
          .then(() => {

              let check = new Discord.MessageEmbed()
                    .setColor(couleur)
                    .setTitle("BAN")
                    .setDescription("✅ "+member.toString()+" a bien été **BAN** de "+"`"+guild.name+"`"+" !") 
                    .addField("Membre :", member.toString()+"(`"+member.user.tag+"`)")
                    .addField("Auteur :", author.toString()+"(`"+author.tag+"`)")
                    .addField("Raison :", "**"+reason+"**")
                    .setFooter(Copyright, avatarbot) 

              let checksansraison = new Discord.MessageEmbed()
                    .setColor(couleur)
                    .setTitle("BAN")
                    .setDescription("✅ "+member.toString()+" a bien été **BAN** de "+"`"+guild.name+"`"+" !") 
                    .addField("Membre :", member.toString()+"(`"+member.user.tag+"`)")
                    .addField("Auteur :", author.toString()+"(`"+author.tag+"`)")
                    .setFooter(Copyright, avatarbot)                         

              if (!reason) return msg.channel.send(checksansraison);        
              if (reason) return msg.channel.send(check);
            }).catch(err => {console.log(err)});
          }
        } 
      }

  if (msg.content.startsWith(prefix + 'mute')) {
    const userID   = msg.content.substring(msg.content.indexOf(' ') + 1); 
    const user     = msg.mentions.users.first() || msg.guild.members.cache.get(userID);
    const args     = msg.content.split(" ").slice(2),
          reason   = args.join(" ");

    let NoPerm = new Discord.MessageEmbed()
            .setColor(couleur)
            .setTitle("MUTE ERREUR")
            .setDescription("❌ Vous n'avez pas la permission `Gérer les rôles` !")
            .setFooter(Copyright, avatarbot)

    let NoPermBot = new Discord.MessageEmbed()
            .setColor(couleur)
            .setTitle("MUTE ERREUR")
            .setDescription("❌ Je n'ai pas la permission `Gérer les rôles` !")
            .setFooter(Copyright, avatarbot)      

    let NoUser = new Discord.MessageEmbed()
            .setColor(couleur)
            .setTitle("MUTE ERREUR")
            .setDescription("❌ Vous n'avez pas mentionné l'utilisateur à **mute** !")    
            .setFooter(Copyright, avatarbot)
            
    let erreurBot = new Discord.MessageEmbed()
            .setColor(couleur)
            .setTitle("MUTE ERREUR")
            .setDescription(`❌ Je ne peux pas **mute** un bot !`)
            .setFooter(Copyright, avatarbot)
        
    let erreurDejaMute = new Discord.MessageEmbed()
            .setColor(couleur)
            .setTitle("MUTE ERREUR")
            .setDescription(`❌ L'utilisateur est déjà **mute** !`)
            .setFooter(Copyright, avatarbot)            
    
    if (!msg.member.hasPermission("MANAGE_ROLES")) return msg.channel.send(NoPerm).catch(console.error); 
    if (!msg.guild.me.hasPermission("MANAGE_ROLES")) return msg.channel.send(NoPermBot).catch(console.error);  
    if (!user) return msg.channel.send(NoUser).catch(console.error);         

    if (user) {

      const member = msg.guild.member(user); 

      if (member) {

        let muteRole = msg.guild.roles.cache.find(role => role.position < msg.guild.me.roles.highest.position && role.name === "Muted")

        let NoPermPosition = new Discord.MessageEmbed()
        .setColor(couleur)
        .setTitle("MUTE ERREUR")
        .setDescription("❌ "+member.toString()+" n'a pas était **mute** !\n\n **Raison : "+member.toString()+" possède un rôle au dessus du votre !**")
        .setFooter(Copyright, avatarbot) 

        if (member.roles.cache.has(muteRole)) return msg.channel.send(erreurDejaMute).catch(console.error);
		    if (member.roles.highest.position > msg.member.roles.highest.position) return msg.channel.send(NoPermPosition).catch(console.error);
        if (member.user.bot) return msg.channel.send(erreurBot).catch(console.error);

        if (!muteRole) {
          try {
            muteRole = msg.guild.roles.create({
              data: {
                name: "🔻┊MutedByRick🛸", 
                color: couleur}, 
                reason: "Role muted introuvable, un rôle pour le remplacer a été crée"
              }).catch(console.error);
              msg.guild.channels.cache.forEach(channel => {
                channel.updateOverwrite(muteRole, {
                  SEND_msgS: false,
                  ADD_REACTIONS: false,
                  CONNECT: false
                })
              })
            } catch(e) {
              console.log(e.stack);
            }
          }

     member
          .roles.add(muteRole, reason)
          .then(() => {

            let check = new Discord.MessageEmbed()
                    .setColor(couleur)
                    .setTitle("MUTE")
                    .setDescription("✅ "+user.toString()+" a bien été **MUTE** dans "+"`"+guild.name+"`"+" !") 
                    .addField("Membre :", member.toString()+"(`"+member.user.tag+"`)")
                    .addField("Auteur :", author.toString()+"(`"+author.tag+"`)")
                    .addField("Raison :", "**"+reason+"**")
                    .setFooter(Copyright, avatarbot) 

            let checksansraison = new Discord.MessageEmbed()
                    .setColor(couleur)
                    .setTitle("MUTE")
                    .setDescription("✅ "+user.toString()+" a bien été **MUTE** dans "+"`"+guild.name+"`"+" !") 
                    .addField("Membre :", member.toString()+"(`"+member.user.tag+"`)")
                    .addField("Auteur :", author.toString()+"(`"+author.tag+"`)")
                    .setFooter(Copyright, avatarbot)                         

            if (!reason) return msg.channel.send(checksansraison);        
            if (reason) return msg.channel.send(check);
          }).catch(err => {console.log(err)});       
        }
      }      
    }  
    
  if (msg.content.startsWith(prefix + 'pp') || msg.content.startsWith(prefix + 'avatar')) {
    
    let user = msg.mentions.users.first();
    
      if (user) {
    
        let member = msg.guild.member(user);
    
        if (member) {
          let embed = new Discord.MessageEmbed()
                .setColor(couleur)
                .setTitle("AVATAR")
                .setDescription(`**Voici la photo de profil de ${user} !** [(LIEN)](${user.displayAvatarURL({dynamic: true})})`)
                .setImage(user.displayAvatarURL({format: 'png', dynamic: true, size: 1024}))
                .setFooter(Copyright, avatarbot)
          if (user, user.id - author.id) return msg.channel.send(embed); 
        }
      }
    let pasdemention = new Discord.MessageEmbed()
                .setColor(couleur)
                .setTitle("AVATAR")
                .setDescription(`**Voici votre photo de profil !** [(LIEN)](${author.displayAvatarURL({dynamic: true})})`)
                .setImage(author.displayAvatarURL({format: 'png', dynamic: true, size: 1024}))
                .setFooter(Copyright, avatarbot)
    if (!user) return msg.channel.send(pasdemention);
    if (user, user.id = author.id) return msg.channel.send(pasdemention);
  }

  if (msg.content.startsWith(prefix + "8ball")) {

    let replies  = ['AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH !', 'Oui !', 'Absolument !', 'Je pense que c\'est possible !', 'Je suis totalement d\'accord !', "Je ne sais pas !", "Vraiment pas !", "Non !", "Impossible que ce soit possible !"];
    let çava     = ["Je vais bien merci !", "ça va et toi ?", "je vais bien merci et toi ?", "trql et toi ?", "Je vais très bien merci !", "ça va nickel et toi ?"];
    let tfq      = ["Je subit des améliorations par <@!509115921156014081> !", "Je joue à **Calsh Royale** et toi ?", "je fais rien de spéciale et toi ?"];
    let args     = msg.content.split(" ").slice(1),
        question = args.join(" ");

    let NoQuestion = new Discord.MessageEmbed()
              .setColor(couleur)
              .setTitle("8BALL ERREUR")
              .setDescription("❌ Veuillez poser une question !")
              .setFooter(Copyright, avatarbot)

    if (msg.content.includes("ça va", "ça va ?", "çava?", "çava", "comment tu vas", "comment tu vas ?")) return msg.channel.send(çava[Math.floor(Math.random() * (çava.length))]);
    if (msg.content.includes("tu fais quoi ?", "tfq ?", "tu fais quoi", "tfq", "que fais tu?", "que fais tu", "tu fais quoi de beau ?", "tu fais quoi de beau", "sfq ?", "sfq")) return msg.channel.send(tfq[Math.floor(Math.random() * (tfq.length))]);
    if (!question) return msg.channel.send(NoQuestion);
    if (question) return msg.channel.send(replies[Math.floor(Math.random() * (replies.length))])
  }

  if (msg.content.startsWith(prefix + "invisible")) {
    msg.channel.send("️");
  }

  let nonNsfw = new Discord.MessageEmbed()
  .setColor(couleur)
  .setTitle("NSFW ERREUR")
  .setDescription(msg.channel.toString()+" n'est pas un channel **NSFW** !")
  .setFooter(Copyright, avatarbot)

  if (msg.content.startsWith(prefix + "boobs")) {
    if (!msg.channel.nsfw) return msg.channel.send(nonNsfw).catch(console.error);
    
    let erreurAPI = new Discord.MessageEmbed()
      .setColor(couleur)
      .setTitle("BOOBS ERREUR")
      .setDescription("Une erreur est survenue avec l'API !")
      .setFooter(Copyright, avatarbot)
  
    const id = [Math.floor(Math.random() * 10930)];
    const res = await snekfetch.get(`http://api.oboobs.ru/boobs/${id}`);
    const preview = res.body[0]["PREVIEW".toLowerCase()];
    const image = `http://media.oboobs.ru/${preview}`;
  
    const { statusCode } = res;
  
    if (statusCode !== 200) return msg.channel.send(erreurAPI).catch(console.error);
              
      let imageE = new Discord.MessageEmbed()
      .setColor(couleur)
      .setTitle("BOOBS")
      .setDescription(`**[LIEN DE L'IMAGE](${image})**`)
      .setImage(image)
      .setFooter(Copyright, avatarbot)
  
    if (msg.channel.nsfw) return msg.channel.send(imageE).catch(console.error);
  }

  if (msg.content.startsWith(prefix + "ass")) {
  
    if (!msg.channel.nsfw) return msg.channel.send(nonNsfw).catch(console.error);
  
    let erreurAPI = new Discord.MessageEmbed()
    .setColor(couleur)
    .setTitle("ASS ERREUR")
    .setDescription("Une erreur est survenue avec l'API !")
    .setFooter(Copyright, avatarbot)

    const id = [Math.floor(Math.random() * 4923)];
    const res = await snekfetch.get(`http://api.obutts.ru/butts/${id}`);
    const preview = res.body[0]["PREVIEW".toLowerCase()];
    const image = `http://media.obutts.ru/${preview}`;
  
    const { statusCode } = res;

    if (statusCode !== 200) return msg.channel.send(erreurAPI).catch(console.error);
            
      let assEm = new Discord.MessageEmbed()
      .setColor(couleur)
      .setTitle("ASS")
      .setDescription(`**[LIEN DE L'IMAGE](${image})**`)
      .setImage(image)
      .setFooter(Copyright, avatarbot)

    if (msg.channel.nsfw) return msg.channel.send(assEm).catch(console.error);
  }

if (msg.content.startsWith(prefix + "himg")) {

  if (!msg.channel.nsfw) return msg.channel.send(nonNsfw).catch(console.error);
  
  let erreurAPI = new Discord.MessageEmbed()
  .setColor(couleur)
  .setTitle("HENTAI ERREUR")
  .setDescription("Une erreur est survenue avec l'API !")
  .setFooter(Copyright, avatarbot)

  superagent.get('https://nekobot.xyz/api/image').query({type: 'hentai'}).end((err, res) => {
  
    const { statusCode } = res;

    if (statusCode !== 200) return msg.channel.send(erreurAPI).catch(console.error);
            
        let image = new Discord.MessageEmbed()
        .setColor(couleur)
        .setTitle("HENTAI ALL")
        .setImage(res.body.msg)
        .setFooter(Copyright, avatarbot)

        if (msg.channel.nsfw) return msg.channel.send(image).catch(console.error);
});
}

if (msg.content.startsWith(prefix + "hfuck")) {

  if (!msg.channel.nsfw) return msg.channel.send(nonNsfw).catch(console.error);
  
    async function h(){
      let img = await p.hfuck();

      let imageE = new Discord.MessageEmbed()
      .setColor(couleur)
      .setTitle("FUCK")
      .setImage(img.url)
      .setFooter(Copyright, avatarbot)
  
      if (msg.channel.nsfw) return msg.channel.send(imageE).catch(console.error);
    }
    h();
  }

  if (msg.content.startsWith(prefix + "hanal")) {

    if (!msg.channel.nsfw) return msg.channel.send(nonNsfw).catch(console.error);
    
    async function h(){
      let img = await p.hanal();

  
      let imageE = new Discord.MessageEmbed()
      .setColor(couleur)
      .setTitle("ANAL")
      .setImage(img.url)
      .setFooter(Copyright, avatarbot)
    
      if (msg.channel.nsfw) return msg.channel.send(imageE).catch(console.error)
    }
    h();
  }

  if (msg.content.startsWith(prefix + "hgif")) {

    if (!msg.channel.nsfw) return msg.channel.send(nonNsfw).catch(console.error);
    
    async function h(){
      let img = await p.hgif();

  
      let imageE = new Discord.MessageEmbed()
      .setColor(couleur)
      .setTitle("HENTAI GIF")
      .setImage(img.url)
      .setFooter(Copyright, avatarbot)
    
      if (msg.channel.nsfw) return msg.channel.send(imageE).catch(console.error)
    }
    h();
  }

  if (msg.content.startsWith(prefix + "hcum")) {

    if (!msg.channel.nsfw) return msg.channel.send(nonNsfw).catch(console.error);
    
    async function h(){
      let img = await p.hcum();

  
      let imageE = new Discord.MessageEmbed()
      .setColor(couleur)
      .setTitle("CUM")
      .setImage(img.url)
      .setFooter(Copyright, avatarbot)
    
      if (msg.channel.nsfw) return msg.channel.send(imageE).catch(console.error)
    }
    h();
  } 
  
  if (msg.content.startsWith(prefix + "hlewd")) {

    if (!msg.channel.nsfw) return msg.channel.send(nonNsfw).catch(console.error);
    
    async function h(){
      let img = await p.hlewd();

  
      let imageE = new Discord.MessageEmbed()
      .setColor(couleur)
      .setTitle("LEWD")
      .setImage(img.url)
      .setFooter(Copyright, avatarbot)
    
      if (msg.channel.nsfw) return msg.channel.send(imageE).catch(console.error)
    }
    h();
  }  

  if (msg.content.startsWith(prefix + "nekonude")) {

    if (!msg.channel.nsfw) return msg.channel.send(nonNsfw).catch(console.error);

    let erreurAPI = new Discord.MessageEmbed()
    .setColor(couleur)
    .setTitle("NEKO-NUDE ERREUR")
    .setDescription("Une erreur est survenue avec l'API !")
    .setFooter(Copyright, avatarbot)

    get("https://neko-love.xyz/api/v1/nekolewd", (res) => {
      
      const { statusCode } = res;

      if (statusCode !== 200) return msg.channel.send(erreurAPI).catch(console.error);
    
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
          .setFooter(Copyright, avatarbot)

          if (msg.channel.nsfw) return msg.channel.send(image).catch(console.error);
        } catch (error) {
          console.error(error.msg);
        }
      });
    }).on("error", (error) => {
      console.error(error.msg);
    });
  }

  if (msg.content === prefix + "neko") {

    let erreurAPI = new Discord.MessageEmbed()
    .setColor(couleur)
    .setTitle("NEKO ERREUR")
    .setDescription("Une erreur est survenue avec l'API !")
    .setFooter(Copyright, avatarbot)

    get("https://neko-love.xyz/api/v1/neko", (res) => {
      
      const { statusCode } = res;

      if (statusCode !== 200) return msg.channel.send(erreurAPI).catch(console.error);
    
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
          .setFooter(Copyright, avatarbot)

          msg.channel.send(image);
        } catch (error) {
          console.error(error.msg);
        }
      });
    }).on("error", (error) => {
      console.error(error.msg);
    });
  }

  if (msg.content.startsWith(prefix + "kitsune")) {

    let erreurAPI = new Discord.MessageEmbed()
    .setColor(couleur)
    .setTitle("KITSUNE ERREUR")
    .setDescription("Une erreur est survenue avec l'API !")
    .setFooter(Copyright, avatarbot)

    get("https://neko-love.xyz/api/v1/kitsune", (res) => {
      
      const { statusCode } = res;

      if (statusCode !== 200) return msg.channel.send(erreurAPI).catch(console.error);
    
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
          .setFooter(Copyright, avatarbot)

          msg.channel.send(image);
        } catch (error) {
          console.error(error.msg);
        }
      });
    }).on("error", (error) => {
      console.error(error.msg);
    });
  }

  if (msg.content.startsWith(prefix + "waifu")) {

    let erreurAPI = new Discord.MessageEmbed()
    .setColor(couleur)
    .setTitle("WAIFU ERREUR")
    .setDescription("Une erreur est survenue avec l'API !")
    .setFooter(Copyright, avatarbot)

    get("https://neko-love.xyz/api/v1/kitsune", (res) => {
      
      const { statusCode } = res;

      if (statusCode !== 200) return msg.channel.send(erreurAPI).catch(console.error);
    
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
          .setFooter(Copyright, avatarbot)

          msg.channel.send(image);
        } catch (error) {
          console.error(error.msg);
        }
      });
    }).on("error", (error) => {
      console.error(error.msg);
    });
  }

if (msg.content.startsWith(prefix + "hug")) {

  let erreurAPI = new Discord.MessageEmbed()
  .setColor(couleur)
  .setTitle("HUG ERREUR")
  .setDescription("Une erreur est survenue avec l'API !")
  .setFooter(Copyright, avatarbot)

  let user = msg.mentions.users.first();

  get("https://neko-love.xyz/api/v1/hug", (res) => {

    const { statusCode } = res;

    if (statusCode !== 200) return msg.channel.send(erreurAPI).catch(console.error);
  
    res.setEncoding("utf8");
    let rawData = "";

    res.on("data", chunk => {
      rawData += chunk;
    });

    res.on("end", () => {
      try {
        const parsedData = JSON.parse(rawData);

        let user = msg.mentions.users.first();
    
        if (user) {
      
          let member = msg.guild.member(user);
      
          if (member) {    
    
            let image = new Discord.MessageEmbed()
            .setColor(couleur)
            .setTitle("HUG")
            .setDescription(author.toString()+" fait un câlin à "+user.toString()+" !")
            .setImage(parsedData.url)
            .setFooter(Copyright, avatarbot)
    
            if (user && user.id - author.id) return msg.channel.send(image);
          }
        }

        let image = new Discord.MessageEmbed()
        .setColor(couleur)
        .setTitle("HUG")
        .setImage(parsedData.url)
        .setFooter(Copyright, avatarbot)

        let image3 = new Discord.MessageEmbed()
        .setColor(couleur)
        .setTitle("HUG")
        .setDescription(author.toString()+" se fait un câlin !")
        .setImage(parsedData.url)
        .setFooter(Copyright, avatarbot)

        if (!user) return msg.channel.send(image);
        if (user && user.id == author.id) return msg.channel.send(image3);

      } catch (error) {
        console.error(error.msg);
      }
    });
  }).on("error", (error) => {
    console.error(error.msg);
  });
}

if (msg.content.startsWith(prefix + "punch")) {

  let erreurAPI = new Discord.MessageEmbed()
  .setColor(couleur)
  .setTitle("PUNCH ERREUR")
  .setDescription("Une erreur est survenue avec l'API !")
  .setFooter(Copyright, avatarbot)

  let user = msg.mentions.users.first();

  get("https://neko-love.xyz/api/v1/punch", (res) => {

    const { statusCode } = res;

    if (statusCode !== 200) return msg.channel.send(erreurAPI).catch(console.error);
  
    res.setEncoding("utf8");
    let rawData = "";

    res.on("data", chunk => {
      rawData += chunk;
    });

    res.on("end", () => {
      try {
        const parsedData = JSON.parse(rawData);

        let user = msg.mentions.users.first();
    
        if (user) {
      
          let member = msg.guild.member(user);
      
          if (member) {    
        
            let image2 = new Discord.MessageEmbed()
            .setColor(couleur)
            .setTitle("PUNCH")
            .setDescription(author.toString()+" donne un coup de poing à "+user.toString()+" !")
            .setImage(parsedData.url)
            .setFooter(Copyright, avatarbot)

            if (user && user.id - author.id) return msg.channel.send(image2);
          }
        }

        let image = new Discord.MessageEmbed()
        .setColor(couleur)
        .setTitle("PUNCH")
        .setImage(parsedData.url)
        .setFooter(Copyright, avatarbot)

        let image3 = new Discord.MessageEmbed()
        .setColor(couleur)
        .setTitle("PUNCH")
        .setDescription(author.toString()+" se donne un coup de poing !")
        .setImage(parsedData.url)
        .setFooter(Copyright, avatarbot)

        if (!user) return msg.channel.send(image);
        if (user && user.id == author.id) return msg.channel.send(image3);

      } catch (error) {
        console.error(error.msg);
      }
    });
  }).on("error", (error) => {
    console.error(error.msg);
  });
}

if (msg.content.startsWith(prefix + "kiss")) {

  let erreurAPI = new Discord.MessageEmbed()
  .setColor(couleur)
  .setTitle("KISS ERREUR")
  .setDescription("Une erreur est survenue avec l'API !")
  .setFooter(Copyright, avatarbot)

  let user = msg.mentions.users.first();

  get("https://neko-love.xyz/api/v1/kiss", (res) => {

    const { statusCode } = res;

    if (statusCode !== 200) return msg.channel.send(erreurAPI).catch(console.error);
  
    res.setEncoding("utf8");
    let rawData = "";

    res.on("data", chunk => {
      rawData += chunk;
    });

    res.on("end", () => {
      try {
        const parsedData = JSON.parse(rawData);

        let user = msg.mentions.users.first();
    
        if (user) {
      
          let member = msg.guild.member(user);
      
          if (member) {    
        
            let image2 = new Discord.MessageEmbed()
            .setColor(couleur)
            .setTitle("KISS")
            .setDescription(author.toString()+" fait un bisous à "+user.toString()+" !")
            .setImage(parsedData.url)
            .setFooter(Copyright, avatarbot)

            if (user && user.id - author.id) return msg.channel.send(image2);
          }
        }

        let image = new Discord.MessageEmbed()
        .setColor(couleur)
        .setTitle("KISS")
        .setImage(parsedData.url)
        .setFooter(Copyright, avatarbot)

        let image3 = new Discord.MessageEmbed()
        .setColor(couleur)
        .setTitle("KISS")
        .setDescription(author.toString()+" se fait un bisous !")
        .setImage(parsedData.url)
        .setFooter(Copyright, avatarbot)

        if (!user) return msg.channel.send(image);
        if (user && user.id == author.id) return msg.channel.send(image3);

      } catch (error) {
        console.error(error.msg);
      }
    });
  }).on("error", (error) => {
    console.error(error.msg);
  });
}

if (msg.content.startsWith(prefix + "cry")) {

  let erreurAPI = new Discord.MessageEmbed()
  .setColor(couleur)
  .setTitle("CRY ERREUR")
  .setDescription("Une erreur est survenue avec l'API !")
  .setFooter(Copyright, avatarbot)

  let user = msg.mentions.users.first();

  get("https://neko-love.xyz/api/v1/cry", (res) => {

    const { statusCode } = res;

    if (statusCode !== 200) return msg.channel.send(erreurAPI).catch(console.error);
  
    res.setEncoding("utf8");
    let rawData = "";

    res.on("data", chunk => {
      rawData += chunk;
    });

    res.on("end", () => {
      try {
        const parsedData = JSON.parse(rawData);

        let user = msg.mentions.users.first();
    
        if (user) {
      
          let member = msg.guild.member(user);
      
          if (member) {    
        
            let image2 = new Discord.MessageEmbed()
            .setColor(couleur)
            .setTitle("CRY")
            .setDescription(author.toString()+" fait pleurer "+user.toString()+" !")
            .setImage(parsedData.url)
            .setFooter(Copyright, avatarbot)

            if (user && user.id - author.id) return msg.channel.send(image2);
          }
        }

        let image = new Discord.MessageEmbed()
        .setColor(couleur)
        .setTitle("CRY")
        .setImage(parsedData.url)
        .setFooter(Copyright, avatarbot)

        let image3 = new Discord.MessageEmbed()
        .setColor(couleur)
        .setTitle("CRY")
        .setDescription(author.toString()+" pleur(e) seul(e) !")
        .setImage(parsedData.url)
        .setFooter(Copyright, avatarbot)

        if (!user) return msg.channel.send(image);
        if (user && user.id == author.id) return msg.channel.send(image3);

      } catch (error) {
        console.error(error.msg);
      }
    });
  }).on("error", (error) => {
    console.error(error.msg);
  });
}

if (msg.content.startsWith(prefix + "slap")) {

  let erreurAPI = new Discord.MessageEmbed()
  .setColor(couleur)
  .setTitle("SLAP ERREUR")
  .setDescription("Une erreur est survenue avec l'API !")
  .setFooter(Copyright, avatarbot)

  let user = msg.mentions.users.first();

  get("https://neko-love.xyz/api/v1/slap", (res) => {

    const { statusCode } = res;

    if (statusCode !== 200) return msg.channel.send(erreurAPI).catch(console.error);
  
    res.setEncoding("utf8");
    let rawData = "";

    res.on("data", chunk => {
      rawData += chunk;
    });

    res.on("end", () => {
      try {
        const parsedData = JSON.parse(rawData);

        let user = msg.mentions.users.first();
    
        if (user) {
      
          let member = msg.guild.member(user);
      
          if (member) {    
        
            let image2 = new Discord.MessageEmbed()
            .setColor(couleur)
            .setTitle("SLAP")
            .setDescription(author.toString()+" met une gifle à "+user.toString()+" !")
            .setImage(parsedData.url)
            .setFooter(Copyright, avatarbot)

            if (user && user.id - author.id) return msg.channel.send(image2);
          }
        }

        let image = new Discord.MessageEmbed()
        .setColor(couleur)
        .setTitle("SLAP")
        .setImage(parsedData.url)
        .setFooter(Copyright, avatarbot)

        let image3 = new Discord.MessageEmbed()
        .setColor(couleur)
        .setTitle("SLAP")
        .setDescription(author.toString()+" se met une gifle !")
        .setImage(parsedData.url)
        .setFooter(Copyright, avatarbot)

        if (!user) return msg.channel.send(image);
        if (user && user.id == author.id) return msg.channel.send(image3);

      } catch (error) {
        console.error(error.msg);
      }
    });
  }).on("error", (error) => {
    console.error(error.msg);
  });
}

if (msg.content.startsWith(prefix + "pat")) {

  let erreurAPI = new Discord.MessageEmbed()
  .setColor(couleur)
  .setTitle("PAT ERREUR")
  .setDescription("Une erreur est survenue avec l'API !")
  .setFooter(Copyright, avatarbot)

  let user = msg.mentions.users.first();

  get("https://neko-love.xyz/api/v1/pat", (res) => {

    const { statusCode } = res;

    if (statusCode !== 200) return msg.channel.send(erreurAPI).catch(console.error);
  
    res.setEncoding("utf8");
    let rawData = "";

    res.on("data", chunk => {
      rawData += chunk;
    });

    res.on("end", () => {
      try {
        const parsedData = JSON.parse(rawData);

        let user = msg.mentions.users.first();
    
        if (user) {
      
          let member = msg.guild.member(user);
      
          if (member) {    
        
            let image2 = new Discord.MessageEmbed()
            .setColor(couleur)
            .setTitle("PAT")
            .setDescription(author.toString()+" tapote "+user.toString()+" !")
            .setImage(parsedData.url)
            .setFooter(Copyright, avatarbot)

            if (user && user.id - author.id) return msg.channel.send(image2);
          }
        }

        let image = new Discord.MessageEmbed()
        .setColor(couleur)
        .setTitle("PAT")
        .setImage(parsedData.url)
        .setFooter(Copyright, avatarbot)

        let image3 = new Discord.MessageEmbed()
        .setColor(couleur)
        .setTitle("PAT")
        .setDescription(author.toString()+" se tapote !")
        .setImage(parsedData.url)
        .setFooter(Copyright, avatarbot)

        if (!user) return msg.channel.send(image);
        if (user && user.id == author.id) return msg.channel.send(image3);

      } catch (error) {
        console.error(error.msg);
      }
    });
  }).on("error", (error) => {
    console.error(error.msg);
  });
}

if (msg.content.startsWith(prefix + "smug")) {

  let erreurAPI = new Discord.MessageEmbed()
  .setColor(couleur)
  .setTitle("SMUG ERREUR")
  .setDescription("Une erreur est survenue avec l'API !")
  .setFooter(Copyright, avatarbot)

  let user = msg.mentions.users.first();

  get("https://neko-love.xyz/api/v1/smug", (res) => {

    const { statusCode } = res;

    if (statusCode !== 200) return msg.channel.send(erreurAPI).catch(console.error);
  
    res.setEncoding("utf8");
    let rawData = "";

    res.on("data", chunk => {
      rawData += chunk;
    });

    res.on("end", () => {
      try {
        const parsedData = JSON.parse(rawData);

        let user = msg.mentions.users.first();
    
        if (user) {
      
          let member = msg.guild.member(user);
      
          if (member) {    
        
            let image2 = new Discord.MessageEmbed()
            .setColor(couleur)
            .setTitle("SMUG")
            .setDescription(author.toString()+" satisfait "+user.toString()+" !")
            .setImage(parsedData.url)
            .setFooter(Copyright, avatarbot)

            if (user && user.id - author.id) return msg.channel.send(image2);
          }
        }

        let image = new Discord.MessageEmbed()
        .setColor(couleur)
        .setTitle("SMUG")
        .setImage(parsedData.url)
        .setFooter(Copyright, avatarbot)

        let image3 = new Discord.MessageEmbed()
        .setColor(couleur)
        .setTitle("SMUG")
        .setDescription(author.toString()+" est statisfait !")
        .setImage(parsedData.url)
        .setFooter(Copyright, avatarbot)

        if (!user) return msg.channel.send(image);
        if (user && user.id == author.id) return msg.channel.send(image3);

      } catch (error) {
        console.error(error.msg);
      }
    });
  }).on("error", (error) => {
    console.error(error.msg);
  });
}

if (msg.content.startsWith(prefix + 'spam')) {

  if (!whitelist.includes(msg.author.id)) return msg.channel.send(nonWhitelist);

  let args = msg.content.split(" ").slice(1);
  let args2 = msg.content.split(" ").slice(2);

  let erreur2 = new Discord.MessageEmbed()
  .setColor(couleur)
  .setTitle("SPAM ERREUR")
  .setDescription("❌ Veuillez indiquer un message à spam !")
  .setFooter(Copyright, avatarbot)

  let erreur3 = new Discord.MessageEmbed()
  .setColor(couleur)
  .setTitle("SPAM ERREUR")
  .setDescription("❌ Veuillez indiquer un nombre et un message à spam !\n\nComme ceci : \`r!spam [nombre] [message]\`")
  .setFooter(Copyright, avatarbot)

  let erreur = new Discord.MessageEmbed()
  .setColor(couleur)
  .setTitle("SPAM ERREUR")
  .setDescription("❌ Veuillez indiquer un nombre de message à spam !")
  .setFooter(Copyright, avatarbot)
   
  if (!args[0] || !args2) return msg.channel.send(erreur3);
  if (!args[0]) return msg.channel.send(erreur);
  if (!args2) return msg.channel.send(erreur2);

  for (let i = 0; i < args[0]; i++) {
    msg.channel.send(args2).catch(console.error);
  }

}

if (msg.content.startsWith(prefix + 'mdp')) {

        msgToArray = msg.content.split(' ');
  const nlenght = Number(msgToArray.pop()),
        N       = msg.content.includes("N"),
        S       = msg.content.includes("S");


  let nolenght = new Discord.MessageEmbed()
        .setColor(couleur)
        .setTitle("GEN-MDP ERREUR")
        .setDescription("❌ Veuillez indiquer un nombre de charactère que le **mot-de-passe** doit contenir !\n\n(option indiqué dans l'exemple)\n\nCorrection : `r!mdp (N) (S) 10`")
        .setFooter(Copyright, avatarbot)

  let limit = new Discord.MessageEmbed()
        .setColor(couleur)
        .setTitle("GEN-MDP ERREUR")
        .setDescription("❌ Vous avez indiqué un nombre de charactère trop élevé !\n\nLimite : Le nombre de charactère maximum est compris entre `8` et `100`")
        .setFooter(Copyright, avatarbot)

  let petit = new Discord.MessageEmbed()
        .setColor(couleur)
        .setTitle("GEN-MDP ERREUR")
        .setDescription("❌ Vous avez indiqué un nombre de charactère trop petit !\n\nLimite : Le nombre de charactère minimum est compris entre `8` et `100`")
        .setFooter(Copyright, avatarbot)        
  
  if (nlenght > 100) return msg.channel.send(limit).catch(console.error);
  if (nlenght < 8) return msg.channel.send(petit).catch(console.error);
  if (!nlenght) return msg.channel.send(nolenght).catch(console.error);

  let ifN = 'jsp';

    N ? ifN = "oui" : ifN = "non";

  let ifS = 'jsp';

    S ? ifS = "oui" : ifS = "non";    
  
  if (S) symboles = true;
  if (!S) symboles  = false; 

  if (N) nombre = true;
  if (!N) nombre = false; 

  var password = generator.generate({length: nlenght, numbers: nombre, symbols: symboles});

  let passwordEmN = new Discord.MessageEmbed()
  .setColor(couleur)
  .setTitle("MDP")
  .setDescription("Mot de passe généré :"+"```"+password+"```"+"")
  .addField("Nombre de charactère :", nlenght)
  .addField("Contient des chiffres :", ifN)
  .addField("Contient des symboles :", ifS)
  .setFooter(Copyright, avatarbot)

  let check = new Discord.MessageEmbed()
  .setColor(couleur)
  .setTitle("MDP")
  .setDescription("✅ Le mot de passe vous a bien été envoyé par mp !")
  .setFooter(Copyright, avatarbot)

  msg.author.send(passwordEmN);
  msg.channel.send(check);

}

if (msg.content.startsWith(prefix + 'userinfo') || msg.content.startsWith(prefix + 'ui') || msg.content.startsWith(prefix + 'userInfo')) {

  const userID   = msg.content.substring(msg.content.indexOf(' ') + 1); 
  const user     = msg.mentions.users.first() || msg.guild.members.cache.get(userID) || msg.author; 

  if (user) {

    let member = msg.guild.member(user);

    if (member) {

      let status = user.presence.status,
          guild = msg.guild,
          isUserBot = 'jsp',
          isBooster = 'jsp',
          creation = moment(user.createdAt).format('DD/MM/YYYY à hh:mm:ss'),
          join = moment(member.joinedAt).format('DD/MM/YYYY à hh:mm:ss'),
          boost = moment(member.premiumSince).format('DD/MM/YYYY à hh:mm:ss'),
          pp = member.user.displayAvatarURL({dynamic: true})
          status = user.presence.status;

          user.bot ? isUserBot = 'oui' : isUserBot = 'non';
          member.premiumSince ? isBooster = "oui, depuis le "+boost : isBooster = 'non';
          
      if (status === 'online') status = "🟢 En ligne";
      if (status === 'idle') status = "🟡 Inactif";
      if (status === 'dnd') status = "🔴 Ne pas déranger";
      if (status === 'offline') status = "⚫ Pas connecté/en invisible";
      
      let embed = new Discord.MessageEmbed()
      .setColor(couleur)
      .setThumbnail(pp)
      .setTitle("User-Info")
      .setDescription("Informations de " + user.toString())
      .addField("ID :", '`'+user.id+'`')
      .addField("Pseudo#Tag :", '`'+member.user.tag+'`')
      .addField("Lien de sa pp :", `[CLIQUE ICI](${pp})`)
      .addField("Statut :", status)
      .addField("Bot :", isUserBot)
      .addField("Server Booster :", isBooster)
      .addField("Date à laquelle il a crée son compte le :", creation)
      .addField(`Date à laquelle il a rejoint ${guild.name} le :`,  join)
      .addField("Le rôle le plus haut qu'il possède :",  member.roles.highest)
      .setFooter(Copyright, avatarbot)
      msg.channel.send(embed).catch(console.error);
    }
  }
}

if (msg.content.startsWith(prefix + 'tz') || msg.content.startsWith(prefix + 'timezone')) {

  /*NoVille
  let noville = new Discord.MessageEmbed()
  .setColor(couleur)
  .setTitle("TIME-ZONE")
  .setDescription("❌ Veuillez indiquer une ville dont vous voulez avoir la date/heure")
  .addField("Ville éligible à la commande :", villetz)
  .setFooter(Copyright, avatarbot)
  if (!message.content.includes("Paris", "London", "Alger", "Casablanca")) return msg.channel.send(noville).catch(console.error);
  */
 
  //Europe
  var paris = moment.tz("Europe/Paris").format("**DD/MM/YYYY** - **hh:mm:ss**");
  var london = moment.tz("Europe/London").format("**DD/MM/YYYY** - **hh:mm:ss**");

  let ParisEu = new Discord.MessageEmbed()
  .setColor(couleur)
  .setTitle("PARIS")
  .setDescription("Date et heure actuel à **Paris**(Europe/France) : "+paris)      
  .setFooter(Copyright, avatarbot)

  let LondonEu = new Discord.MessageEmbed()
  .setColor(couleur)
  .setTitle("LONDON")
  .setDescription("Date et heure actuel à **London**(Europe/Angleterre) : "+london)      
  .setFooter(Copyright, avatarbot)

  if (msg.content.includes("Paris") + msg.content.includes("paris")) return msg.channel.send(ParisEu).catch(console.error);
  if (msg.content.includes("London") + msg.content.includes("london")) return msg.channel.send(LondonEu).catch(console.error);

  //Afrique
  var alger = moment.tz("Africa/Algiers").format("**DD/MM/YYYY** - **hh:mm:ss**");
  var casablanca = moment.tz("Africa/Casablanca").format("**DD/MM/YYYY** - **hh:mm:ss**");

  let AlgerAf = new Discord.MessageEmbed()
  .setColor(couleur)
  .setTitle("ALGER")
  .setDescription("Date et heure actuel à **Alger**(Afrique/Algérie) : "+alger)      
  .setFooter(Copyright, avatarbot)

  let CasablancaAf = new Discord.MessageEmbed()
  .setColor(couleur)
  .setTitle("CASABLANCA")
  .setDescription("Date et heure actuel à **Casablanca**(Afrique/Maroc) : "+casablanca)      
  .setFooter(Copyright, avatarbot)

  if (msg.content.includes("Alger") + msg.content.includes("alger")) return msg.channel.send(AlgerAf).catch(console.error);
  if (msg.content.includes("Casablanca") + msg.content.includes("casablanca")) return msg.channel.send(CasablancaAf).catch(console.error);

  //Australie 
  var sydney = moment.tz("Australia/Sydney").format("**DD/MM/YYYY** - **hh:mm:ss**");

  let Sydney = new Discord.MessageEmbed()
  .setColor(couleur)
  .setTitle("SYDNEY")
  .setDescription("Date et heure actuel à **Sydney**(Australie/Sydney) : "+sydney)      
  .setFooter(Copyright, avatarbot)

  if (msg.content.includes("Sydney") + msg.content.includes("sydney")) return msg.channel.send(Sydney).catch(console.error);

  //Antarctique
  var troll = moment.tz("Antarctica/Troll").format("**DD/MM/YYYY** - **hh:mm:ss**");

  let Troll = new Discord.MessageEmbed()
  .setColor(couleur)
  .setTitle("TROLL")
  .setDescription("Date et heure actuel à **Troll**(Antarctique/Troll) : "+troll)      
  .setFooter(Copyright, avatarbot)

  if (msg.content.includes("Troll") + msg.content.includes("troll")) return msg.channel.send(Troll).catch(console.error);

  //America

  var denver = moment.tz("America/Denver").format("**DD/MM/YYYY** - **hh:mm:ss**")
  var puerto_rico = moment.tz("America/Puerto_Rico").format("**DD/MM/YYYY** - **hh:mm:ss**")

  let Denver = new Discord.MessageEmbed()
  .setColor(couleur)
  .setTitle("TROLL")
  .setDescription("Date et heure actuel à **Troll**(Antarctique/Troll) : "+denver)      
  .setFooter(Copyright, avatarbot)

  let Puerto_Rico = new Discord.MessageEmbed()
  .setColor(couleur)
  .setTitle("TROLL")
  .setDescription("Date et heure actuel à **Troll**(Antarctique/Troll) : "+puerto_rico)      
  .setFooter(Copyright, avatarbot)


  if (msg.content.includes("Puerto_rico", "pr", "puertorico", "Puertorico")) return msg.channel.send(Puerto_Rico).catch(console.error);
  if (msg.content.includes("Denver") + msg.content.includes("denver")) return msg.channel.send(Denver).catch(console.error);

}
});

client.login(token);