const Discord                                         = require('discord.js');
const {TOKEN, PREFIX, VERSION, WHITELIST}             = require('./config.js');
const { get }                                         = require('https');
const superagent                                      = require('superagent');
const snekfetch                                       = require('snekfetch');
const p                                               = require('pixula-v2');
const generator                                       = require('generate-password');
const TM                                              = require('temp-mail-api');
const { error, timeLog }                              = require('console');
const moment                                          = require('moment');
const tz                                              = require('moment-timezone');
const fs                                              = require('fs');
const Pornsearch                                      = require('pornsearch');
const akaneko                                         = require('akaneko');
const tnai                                            = require("tnai");
const { url }                                         = require('inspector');
const ytdl                                            = require('ytdl-core');
const { serialize }                                   = require('v8');
const { title }                                       = require('process');
const yts                                             = require('yt-search');
const { search } = require('snekfetch');
const client                                          = new Discord.Client({disableMentions: "everyone"});

client.commands = new Discord.Collection()

let token     = TOKEN,
    prefix    = PREFIX,
    version   = VERSION,
    whitelist = WHITELIST;

client.on('ready', () => {

  let membersCount = client.users.cache.size;
  let test = client.guilds.cache.map(guild => guild.memberCount).reduce((a, b) => a + b, 0);

  console.log("Bot : " + client.user.tag + " est connecté !"+"\n\nUtilisateurs : "+test+`\n\nServeur${client.guilds.cache.size > 1 ? "s" : "️"} : ${client.guilds.cache.size}`+"\n\nToken : "+token+"\n\nVersion : "+version);

  let statuses  =  [PREFIX+'help'],
      types     = ["LISTENING", "WATCHING", "PLAYING"];
    
      setInterval(function() {
          let status = statuses[Math.floor(Math.random() * statuses.length)],
              type   = types[Math.floor(Math.random() * types.length)];
      
          client.user.setActivity(status,  {type: type})
        }, 15000);
      });

const queue = new Map();

client.on('message',  async message => {

  let avatarbot        = client.user.avatarURL({dynamic: true}),
      description      = "**Pour plus d'information dirigez vous vers le support de Rick\\🛸 :** [CLIQUE ICI](https://discord.gg/5Zbr2Hc)",
      Copyright        = "Rick🛸 ©️ Copyright : Atsuki \\/ Needles",
      couleur          = "BLUE",
      msg              = message,
      guild            = msg.guild,
      author           = msg.author,
      totalpage        = "8",
      villetz          = "Paris/London/Alger/Casablanca/Sydney/Troll/Denver/Puerto_Rico",  
      europeV          = "Paris/London",
      afriqueV         = "Alger/Casablanca",
      australieV       = "Sydney",
      antarctiqueV     = "Troll",
      americaV         = "Denver/Puerto_Rico",
      mod              = ["ban", "kick", "mute en dev", "clear en dev"];

    let embed = new Discord.MessageEmbed()
    .setColor(couleur)
    .setFooter(Copyright, avatarbot)

  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  if (msg.content === prefix + 'help') {

    let standard = new Discord.MessageEmbed()
    .setColor(couleur)
    .setTitle("Page 1/"+totalpage+" - Toutes les commandes :")
    .setDescription(description)
    .addField(`\`${PREFIX}help\``, "Vous y êtes actuellement")
    .addField(`\`${PREFIX}help fun\``,      "Affiche la page des commandes fun")
    .addField(`\`${PREFIX}help mod\``,      "Affiche la page des commandes de modérations")
    .addField(`\`${PREFIX}help info\``,     "Affiche la page des commandes d'information")
    .addField(`\`${PREFIX}help love\``,     "Affiche la page des commandes love")
    .addField(`\`${PREFIX}help utile\``,    "Affiche la page des commandes utiles")
    .addField(`\`${PREFIX}help nsfw\``,     "Affiche la page des commandes nsfw🔞")
    .addField(`\`${PREFIX}help musique\``,  "Affiche la page des commandes musicale🎵")
    .setFooter(Copyright, avatarbot)

    if (!whitelist.includes(author.id)) return msg.channel.send(standard);
    if (whitelist.includes(author.id)) return msg.channel.send(standard.addField("️", "**COMMANDES WHITELIST**").addField(`\`${PREFIX}exec\``, "Permet d'exécuter du code en JavaScript !")).catch(console.error);
  }

  /*\ -------------------------- *\*/

  if (msg.content === prefix + 'help mod' || msg.content === prefix + 'h mod') {
    msg.channel.send(embed.setTitle("Page 2/"+totalpage+" - Commandes modérations :").setDescription(description)
    .addField(`\`${PREFIX}ban [@user - id] (raison)\``, "Permet de ban une mention ou l'id d'un membre")
    .addField(`\`${PREFIX}kick [@user - id] (raison)\``, "Permet de kick une mention ou l'id d'un membre")
    ).catch(console.error);
  }

  /*\ -------------------------- *\*/

  if (msg.content === prefix + 'help info' || msg.content === prefix + 'h info') {
    msg.channel.send(embed.setTitle("Page 3/"+totalpage+" - Commandes informations :").setDescription(description)
    .addField(`\`${PREFIX}ping\``, "Affiche le temps de latence du bot(MS)")
    .addField(`\`${PREFIX}pp (@user/id)\``, "Affiche votre avatar ou l'avatar d'un membre mentionné")
    .addField(`\`${PREFIX}userinfo (@user/id)\``, "Affiche vos infos ou les infos d'un membre mentionné")
    .addField(`\`${PREFIX}whitelist (@user/id)\``, "Permet de savoir si un membre ou si vous êtes whitelist dans le bot")).catch(console.error);
  }

  if (msg.content === prefix + 'help utile' || msg.content === prefix + 'h util') {
    msg.channel.send(embed.setTitle("Page 4/"+totalpage+" - Commandes utiles :").setDescription(description)
    .addField(`\`${PREFIX}invisible\``, "Permet de faire envoyer un msg invisible par le bot")
    .addField(`\`${PREFIX}mdp (N) (S) [nombre de charactère]\``, "Permet de générer un Mot-de-Passe aléatoire\n(**N = ajout de nombre** | **S = ajout de symbole** | **Sans = que des lettres**)")).catch(console.error);
  }

  /*\ -------------------------- *\*/

  /*if (msg.content === prefix + 'help timezone' || msg.content === prefix + 'h tz') {
    msg.channel.send(embed.setTitle("Page 4/"+totalpage+" - Commande INFO :").setDescription(description).addField(`\`${PREFIX}timezone [ville]\``,  "Affiche la date et l'heure de la ville saisie").addField("Ville éligible à la commande :", villetz).addField(":flag_eu: Europe :", europeV).addField("<:afu:734595847404388434> Afrique :", afriqueV).addField(":flag_au: Australie : ", australieV).addField(":flag_us: Amérique :", americaV).addField(":flag_aq: Antarctique :", antarctiqueV)).catch(console.error);
  }*/

  /*\ -------------------------- *\*/

  if (msg.content === prefix + 'help fun' || msg.content === prefix + 'h fun') {
    msg.channel.send(embed.setTitle("Page 5/"+totalpage+" - Commandes FUN :").setDescription(description)
    .addField(`\`${PREFIX}8ball [question]\``, "Permet de poser n'importe quel question au bot**(IA amélioré)**")).catch(console.error);
  }

  /*\ -------------------------- *\*/

  if (msg.content === prefix + 'help love' || msg.content === prefix + 'h love') {
    msg.channel.send(embed.setTitle("Page 6/"+totalpage+" - Commandes love :").setDescription(description).addField(`\`${PREFIX}waifu\``, "Permet d'afficher des images de Waifu").addField(`\`${PREFIX}kitsune\``, "Permet d'afficher des images de Kitsune").addField(`\`${PREFIX}neko\``, "Permet d'afficher des images de Nekomimi").addField(`\`${PREFIX}pat\``, "Permet de vous tapotez ou de tapoter un membre").addField(`\`${PREFIX}smug\``, "Permet de vous satisfaire ou de satisfaire un membre").addField(`\`${PREFIX}cry\``, "Permet de vous faire pleurer ou de faire pleurer un membre").addField(`\`${PREFIX}hug\``, "Permet de vous faire un câlin ou de faire un câlin à un membre").addField(`\`${PREFIX}kiss\``, "Permet de vous faire bisous ou de faire un bisous à un membre").addField(`\`${PREFIX}slap\``, "Permet de vous mettre une gifle ou de mettre une gifle à un membre").addField(`\`${PREFIX}punch\``, "Permet de vous mettre un coup de poing ou de le mettre à un membre")).catch(console.error);
  } 

  /*\ -------------------------- *\*/

  if (msg.content === prefix + 'help nsfw' || msg.content === prefix + 'h nsfw') {
    msg.channel.send(embed.setTitle("Page 7/"+totalpage+" - Commandes NSFW :").setDescription(description)
    .addField(`\`${PREFIX}4k\``, "Permet d'afficher des gifs pornographique en 4k(pornhub)")
    .addField(`\`${PREFIX}ass\``, "Permet d'afficher des images pornographique de culs(random)")
    .addField(`\`${PREFIX}anal\``, "Permet d'afficher des gifs pornographique d'acte anal(pornhub)")
    .addField(`\`${PREFIX}suck\``,     "Permet d'afficher des gifs pornographique d'acte de suçage(pornhub)")
    .addField(`\`${PREFIX}pussy\``, "Permet d'afficher des images pornographique avec des vagins(pornhub)")
    .addField(`\`${PREFIX}boobs\``, "Permet d'afficher des images pornographique de grosse poitrine(random)")
    .addField(`\`${PREFIX}gifsearch [recherche]\``, "Permet de rechercher du contenu pornographique(pornhub)")
    .addField("️", "**COMMANDES NSFW - HENTAI**")
    .addField(`\`${PREFIX}hgif\``, "Permet d'afficher des gifs d'hentai random")
    .addField(`\`${PREFIX}hcum\``, "Permet d'afficher des images/gifs avec les tags : cum/hentai")
    .addField(`\`${PREFIX}nekonude\``, "Permet d'afficher des images pornographique de Nekomimi")
    .addField(`\`${PREFIX}hlewd\``, "Permet d'afficher des images de personnage féminin dénudée")
    .addField(`\`${PREFIX}hmaid\``, "Permet d'afficher des images pornographique avec le tag : maid/hentai")
    .addField(`\`${PREFIX}horgy\``, "Permet d'afficher des images pornographique avec le tag : orgy/hentai")
    .addField(`\`${PREFIX}hbdsm\``, "Permet d'afficher des images pornographique avec le tag : bdsm/hentai")
    .addField(`\`${PREFIX}hfuck\``, "Permet d'afficher des images/gifs pornographique d'acte sexuel")
    .addField(`\`${PREFIX}hanal\``, "Permet d'afficher des images/gifs pornographique d'acte sexuel anal")
    .addField(`\`${PREFIX}hfemdom\``, "Permet d'afficher des images pornographique où la femme domine l'homme")
    .addField(`\`${PREFIX}hpanties\``, "Permet d'afficher des images pornographique où la femme est en sous vêtement")).catch(console.error);
  } 

  /*\ -------------------------- *\*/

  if (msg.content === prefix + 'help musique' || msg.content === prefix + 'h music') {
    msg.channel.send(embed.setTitle("Page 8/"+totalpage+" - Commandes musicales :").setDescription(description)
    .addField(`\`${PREFIX}play [lien]\``, "Permet d'exécuter une musique YouTube")
    .addField(`\`${PREFIX}stop\``,   "Permet de stopper une musique en cours de lecture")
    .addField(`\`${PREFIX}skip\``,   "Permet de skipper une musique en cours de lecture")
    .addField(`\`${PREFIX}pause\``,  "Permet de mettre en pause une musique en cours de lecture")
    .addField(`\`${PREFIX}resume\``, "Permet de mettre en lecture une musique mise en pause")).catch(console.error);
  }    

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

  if (msg.content.startsWith(prefix + 'pp') || msg.content.startsWith(prefix + 'avatar')) {

    const userID   = msg.content.substring(msg.content.indexOf(' ') + 1); 
    const user     = msg.mentions.users.first() || client.users.cache.get(userID) || msg.author;
    
    if (user) {
      if (user && user.id - author.id) return msg.channel.send(embed.setTitle("AVATAR").setDescription(`**Voici la photo de profil de ${user} !** [(LIEN)](${user.displayAvatarURL({dynamic: true})})`).setImage(user.displayAvatarURL({dynamic: true, size: 1024}))).setFooter(Copyright, avatarbot).catch(console.error);
    }    
    
    if (!user) return msg.channel.send(embed.setTitle("AVATAR").setDescription(`**Voici votre photo de profil !** [(LIEN)](${user.displayAvatarURL({dynamic: true})})`).setImage(user.displayAvatarURL({dynamic: true, size: 1024}))).catch(console.error);
    if (user && user.id == author.id) return msg.channel.send(embed.setTitle("AVATAR").setDescription(`**Voici votre photo de profil !** [(LIEN)](${user.displayAvatarURL({dynamic: true})})`).setImage(user.displayAvatarURL({format: 'png', dynamic: true, size: 1024}))).catch(console.error);
  }

  if (msg.content.startsWith(prefix + 'whitelist')) {

    const userID   = msg.content.substring(msg.content.indexOf(' ') + 1); 
    const user     = msg.mentions.users.first() || client.users.cache.get(userID);

    if (user) {

      if (user && user.id - author.id && !whitelist.includes(user.id)) return msg.channel.send(embed.setTitle("NON WHITELIST").setDescription("❌ "+user.toString()+" ne figure pas dans la liste des administrateurs de **Rick\🛸**").addField("Liste des `ID` whitelist :", whitelist)).catch(console.error);
      if (user && user.id - author.id && whitelist.includes(user.id)) return msg.channel.send(embed.setTitle("WHITELIST").setDescription("✅ "+user.toString()+" est certifié **whitelist** \🛸 !").addField("Liste des `ID` whitelist :", whitelist)).catch(console.error);
    }     

    if (!user && !whitelist.includes(author.id)) return msg.channel.send(embed.setTitle("NON WHITELIST").setDescription("❌ Votre **ID** ne figure pas dans la liste des administrateurs de **Rick\🛸**").addField("Liste des `ID` whitelist :", whitelist)).catch(console.error);
    if (!user && whitelist.includes(author.id)) return msg.channel.send(embed.setTitle("WHITELIST").setDescription("✅ Vous êtes certifié **whitelist** \🛸 !").addField("Liste des `ID` whitelist :", whitelist)  ).catch(console.error);

    if (user && user.id == author.id && !whitelist.includes(user.id)) return msg.channel.send(embed.setTitle("NON WHITELIST").setDescription("❌ Votre **ID** ne figure pas dans la liste des administrateurs de **Rick\🛸**").addField("Liste des `ID` whitelist :", whitelist)).catch(console.error);
    if (user && user.id == author.id && whitelist.includes(user.id)) return msg.channel.send(embed.setTitle("WHITELIST").setDescription("✅ Vous êtes certifié **whitelist** \🛸 !").addField("Liste des `ID` whitelist :", whitelist)  ).catch(console.error);

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
    
    if (!msg.member.hasPermission("KICK_MEMBERS")) return msg.channel.send(embed.setTitle("KICK ERREUR").setDescription("❌ Vous n'avez pas la permission `Expulser des membres` !")).catch(console.error); 
    if (!guild.me.hasPermission("KICK_MEMBERS")) return msg.channel.send(embed.setTitle("KICK ERREUR").setDescription("❌ Je n'ai pas la permission `Expulser des membres` !")).catch(console.error); 
    if (!user) return msg.channel.send(embed.setTitle("KICK ERREUR").setDescription("❌ Vous n'avez pas mentionné l'utilisateur à **kick** !")).catch(console.error);  

    if (user) {

      const member = msg.guild.member(user);
      
      if (member) {  

        if (member.roles.highest.position > msg.member.roles.highest.position) return msg.channel.send(embed.setTitle("KICK ERREUR").setDescription("❌ "+member.toString()+" n'a pas était kick !\n\n **Raison : "+member.toString()+" possède un rôle au dessus du votre !**")).catch(console.error);  

        member
          .kick(reason)
          .then(() => {            
            if (!reason) return msg.channel.send(embed.setTitle("KICK").setDescription("✅ "+member.toString()+" a bien été **KICK** de "+"`"+guild.name+"`"+" !") .addField("Membre :", member.toString()+"(`"+member.user.tag+"`)").addField("Auteur :", author.toString()+"(`"+author.tag+"`)")).catch(console.error);        
            if (reason) return msg.channel.send(embed.setTitle("KICK").setDescription("✅ "+member.toString()+" a bien été **KICK** de "+"`"+guild.name+"`"+" !") .addField("Membre :", member.toString()+"(`"+member.user.tag+"`)").addField("Auteur :", author.toString()+"(`"+author.tag+"`)").addField("Raison :", "**"+reason+"**")).catch(console.error);
          }).catch(err => {console.log(err)});
        }
      } 
    }

  if (msg.content.startsWith(prefix + 'ban')) {
    const userID   = msg.content.substring(msg.content.indexOf(' ') + 1); 
    const user     = msg.mentions.users.first() || msg.guild.members.cache.get(userID);
    const args     = msg.content.split(" ").slice(2),
          reason   = args.join(" ");

    if (!msg.member.hasPermission("KICK_MEMBERS")) return msg.channel.send(embed.setTitle("BAN ERREUR").setDescription("❌ Vous n'avez pas la permission `Bannir des membres` !")).catch(console.error); 
    if (!guild.me.hasPermission("KICK_MEMBERS")) return msg.channel.send(embed.setTitle("BAN ERREUR").setDescription("❌ Je n'ai pas la permission `Bannir des membres` !")).catch(console.error); 
    if (!user) return msg.channel.send(embed.setTitle("BAN ERREUR").setDescription("❌ Vous n'avez pas mentionné l'utilisateur à **ban** !")).catch(console.error); 

    if (user) {
      const member = guild.member(user);
      if (member) {

        if (member.roles.highest.position > msg.member.roles.highest.position) return msg.channel.send(embed.setTitle("BAN ERREUR").setDescription("❌ "+member.toString()+" n'a pas était ban !\n\n **Raison : "+member.toString()+" possède un rôle au dessus du votre !**")).catch(console.error);   

        member
          .ban(reason)
          .then(() => {
            if (!reason) return msg.channel.send(embed.setTitle("BAN").setDescription("✅ "+member.toString()+" a bien été **BAN** de "+"`"+guild.name+"`"+" !") .addField("Membre :", member.toString()+"(`"+member.user.tag+"`)").addField("Auteur :", author.toString()+"(`"+author.tag+"`)")).catch(console.error);        
            if (reason) return msg.channel.send(embed.setTitle("BAN").setDescription("✅ "+member.toString()+" a bien été **BAN** de "+"`"+guild.name+"`"+" !") .addField("Membre :", member.toString()+"(`"+member.user.tag+"`)").addField("Auteur :", author.toString()+"(`"+author.tag+"`)").addField("Raison :", "**"+reason+"**")).catch(console.error);
          }).catch(err => {console.log(err)});
        }
      } 
    }

  if (msg.content.startsWith(prefix + "8ball")) {

    cv =  ["çava", "cv", "ça va", "wsh bien"];
    tfq = ["sfk", "tfk", "tfq", "sfq", "tu fais quoi", "tu fou quoi"];

    decv  = msg.content.toLowerCase().includes("çava") || msg.content.toLowerCase().includes("cv") || msg.content.toLowerCase().includes("ça va") || msg.content.toLowerCase().includes("wsh bien");
    detfq = msg.content.toLowerCase().includes("tfq") || msg.content.toLowerCase().includes("sfq") || msg.content.toLowerCase().includes("tfk") || msg.content.toLowerCase().includes("sfk") || msg.content.toLowerCase().includes("tu fais quoi") || msg.content.toLowerCase().includes("tu fou quoi");

    let replies  = ['Oui !', 'Absolument !', 'Je suis totalement d\'accord !', "Je ne sais pas !", "Je ne sais pas quoi répondre !", "Non !"];
    let çava     = ["Je vais bien merci !", "ça va et toi ?", "je vais bien merci et toi ?", "trql et toi ?", "Je vais très bien merci !", "ça va nickel et toi ?"];
    let tufq     = ["Je me fais dev par mon créateur <@509115921156014081> !", "Je fais rien de spéciale et toi ?", "Je m'apprêté à lancer Minecraft<:minecraft:740957759339626567> !", "Alors la je fais trop de chose en même temps j'pourrais pas tout dire mais sinon toi tfq ?"];
    let args     = msg.content.split(" ").slice(1),
        question = args.join(" ");

    let NoQuestion = new Discord.MessageEmbed()
              .setColor(couleur)
              .setTitle("8BALL ERREUR")
              .setDescription("❌ Veuillez poser une question !")
              .setFooter(Copyright, avatarbot)

    if (!question) return msg.channel.send(NoQuestion);
    //if (!msg.content.includes("?")) return msg.channel.send(NoQuestion);
    if (decv) return msg.channel.send(çava[Math.floor(Math.random() * (çava.length))]);
    if (detfq) return msg.channel.send(tufq[Math.floor(Math.random() * (tufq.length))]);
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
  
  let pornsearchEm = new Discord.MessageEmbed()
  .setFooter(Copyright, avatarbot)

  let page = [1, 2, 3, 4, 5, 6];

  let pagesearch = [1, 2];

  if (msg.content.startsWith(prefix + "gifsearch") || msg.content.startsWith(prefix + "gs")) {
    if (!msg.channel.nsfw) return msg.channel.send(nonNsfw).catch(console.error);
    let args      = msg.content.split(" ").slice(1),
        recherche = args.join(" ");

    if (!recherche) return message.channel.send(pornsearchEm.setColor(couleur).setTitle("GIF-SEARCH-ERREUR").setDescription("❌ Veuillez spécifier une recherche à effectuer !\n\nCorrection : `r!gifsearch hard`"));
    if (recherche) return Pornsearch.search(recherche).gifs(pagesearch[Math.floor(Math.random() * (pagesearch.length))])
    .then(
      gifs => 
      msg.channel.send(gifs.map(gif =>

        pornsearchEm.setColor(couleur).setTitle("GIF-SEARCH").setDescription(`**Lien du gif : [CLIQUE ICI](${gif.url})**`) .setImage(gif.url)

        ))
      )
    } 

  if (msg.content.startsWith(prefix + "hbdsm")) {
    if (!msg.channel.nsfw) return msg.channel.send(nonNsfw).catch(console.error); 

    let url = akaneko.nsfw.bdsm();

    msg.channel.send(pornsearchEm.setColor(couleur).setTitle("BDSM").setDescription(`**Lien de l'image : [CLIQUE ICI](${url})**`).setImage(url));
  }

  if (msg.content.startsWith(prefix + "hfemdom")) {
    if (!msg.channel.nsfw) return msg.channel.send(nonNsfw).catch(console.error); 

    let url = akaneko.nsfw.femdom();

    msg.channel.send(pornsearchEm.setColor(couleur).setTitle("FEMDOM").setDescription(`**Lien de l'image : [CLIQUE ICI](${url})**`).setImage(url));
  }  
      
  if (msg.content.startsWith(prefix + "horgy")) {
    if (!msg.channel.nsfw) return msg.channel.send(nonNsfw).catch(console.error); 

    let url = akaneko.nsfw.orgy();

    msg.channel.send(pornsearchEm.setColor(couleur).setTitle("ORGY").setDescription(`**Lien de l'image : [CLIQUE ICI](${url})**`).setImage(url));
  }

  if (msg.content.startsWith(prefix + "hmaid")) {
    if (!msg.channel.nsfw) return msg.channel.send(nonNsfw).catch(console.error); 

    let url = akaneko.nsfw.maid();

    msg.channel.send(pornsearchEm.setColor(couleur).setTitle("MAID").setDescription(`**Lien de l'image : [CLIQUE ICI](${url})**`).setImage(url));
  }

  if (msg.content.startsWith(prefix + "hpanties")) {
    if (!msg.channel.nsfw) return msg.channel.send(nonNsfw).catch(console.error); 

    let url = akaneko.nsfw.panties();

    msg.channel.send(pornsearchEm.setColor(couleur).setTitle("PANTIES").setDescription(`**Lien de l'image : [CLIQUE ICI](${url})**`).setImage(url));
  }

  if (msg.content.startsWith(prefix + "pussy")) {
    if (!msg.channel.nsfw) return msg.channel.send(nonNsfw).catch(console.error);
    
    let Pussysearch  = ['pussy', 'fuck pussy', 'hard pussy', 'pussy sexe', 'hard fuck pussy']

    Pornsearch.search(Pussysearch[Math.floor(Math.random() * (Pussysearch.length))]).gifs(page[Math.floor(Math.random() * (page.length))])
    .then(
      gifs => 
      msg.channel.send(gifs.map(gif =>
        pornsearchEm.setColor(couleur).setTitle("PUSSY").setDescription(`**Lien du gif : [CLIQUE ICI](${gif.url})**`).setImage(gif.url)
        ))
        )
      }   
    
  if (msg.content.startsWith(prefix + "4k")) {
    if (!msg.channel.nsfw) return msg.channel.send(nonNsfw).catch(console.error);
      
    let Ktreksearch  = ['4k', 'hard 4k']

    Pornsearch.search(Ktreksearch[Math.floor(Math.random() * (Ktreksearch.length))]).gifs(page[Math.floor(Math.random() * (page.length))])
    .then(
      gifs => 
      msg.channel.send(gifs.map(gif =>
        pornsearchEm.setColor(couleur).setTitle("4K").setDescription(`**Lien du gif : [CLIQUE ICI](${gif.url})**`) .setImage(gif.url)
        ))
        )
      }        
      
  if (msg.content.startsWith(prefix + "suck")) {
    if (!msg.channel.nsfw) return msg.channel.send(nonNsfw).catch(console.error);
        
    let suckSearch = ['suck', 'hard suck', 'suck sexe', 'suck suck']

    Pornsearch.search(suckSearch[Math.floor(Math.random() * (suckSearch.length))]).gifs(page[Math.floor(Math.random() * (page.length))])
    .then(
      gifs => 
      msg.channel.send(gifs.map(gif =>
        pornsearchEm.setColor(couleur).setTitle("SUCK").setDescription(`**Lien du gif : [CLIQUE ICI](${gif.url})**`) .setImage(gif.url)    
        )) 
        )
      }        

  if (msg.content.startsWith(prefix + "anal")) {
    if (!msg.channel.nsfw) return msg.channel.send(nonNsfw).catch(console.error);

    let analSearch = ['anal', 'anus', 'hard anal', 'anal sexe', 'anal anus', 'hard fuck anal', 'fuck anal']
  
    Pornsearch.search(analSearch[Math.floor(Math.random() * (analSearch.length))]).gifs(page[Math.floor(Math.random() * (page.length))])
    .then(
      gifs => 
      msg.channel.send(gifs.map(gif =>
  
        pornsearchEm.setColor(couleur).setTitle("ANAL").setDescription(`**Lien du gif : [CLIQUE ICI](${gif.url})**`) .setImage(gif.url)
  
        ))
        )
      }    

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

if (msg.content.startsWith(prefix + "hfuck")) {

  if (!msg.channel.nsfw) return msg.channel.send(nonNsfw).catch(console.error);
  
    async function h(){
      let img = await p.hfuck();

      let imageE = new Discord.MessageEmbed()
      .setColor(couleur)
      .setTitle("FUCK")
      .setDescription(`**Lien de l'image : [CLIQUE ICI](${img.url})**`)
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
      .setDescription(`**Lien de l'image : [CLIQUE ICI](${img.url})**`)
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
      .setTitle("GIF")
      .setDescription(`**Lien de l'image : [CLIQUE ICI](${img.url})**`)
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
      .setDescription(`**Lien de l'image : [CLIQUE ICI](${img.url})**`)
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
      .setDescription(`**Lien de l'image : [CLIQUE ICI](${img.url})**`)
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
          .setDescription(`**Lien de l'image : [CLIQUE ICI](${parsedData.url})**`)
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
          .setDescription(`**Lien de l'image : [CLIQUE ICI](${parsedData.url})**`)
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
          .setDescription(`**Lien de l'image : [CLIQUE ICI](${parsedData.url})**`)
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
          .setDescription(`**Lien de l'image : [CLIQUE ICI](${parsedData.url})**`)
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

        if (!user) return msg.channel.send(image).catch(console.error);
        if (user && user.id == author.id) return msg.channel.send(image.setDescription(author.toString()+" se fait un câlin !")).catch(console.error);

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

        if (!user) return msg.channel.send(image);
        if (user && user.id == author.id) return msg.channel.send(image.setDescription(author.toString()+" se donne un coup de poing !"));

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

        if (!user) return msg.channel.send(image).catch(console.error);
        if (user && user.id == author.id) return msg.channel.send(image.setDescription(author.toString()+" se fait un bisous !")).catch(console.error);

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

            if (user && user.id - author.id) return msg.channel.send(image2).catch(console.error);
          }
        }

        let image = new Discord.MessageEmbed()
        .setColor(couleur)
        .setTitle("CRY")
        .setImage(parsedData.url)
        .setFooter(Copyright, avatarbot)

        if (!user) return msg.channel.send(image).catch(console.error);
        if (user && user.id == author.id) return msg.channel.send(image.setDescription(author.toString()+" pleur(e) seul(e) !")).catch(console.error);

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

            if (user && user.id - author.id) return msg.channel.send(image2).catch(console.error);
          }
        }

        let image = new Discord.MessageEmbed()
        .setColor(couleur)
        .setTitle("SLAP")
        .setImage(parsedData.url)
        .setFooter(Copyright, avatarbot)

        if (!user) return msg.channel.send(image).catch(console.error);
        if (user && user.id == author.id) return msg.channel.send(image.setDescription(author.toString()+" se met une gifle !")).catch(console.error);

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

            if (user && user.id - author.id) return msg.channel.send(image2).catch(console.error);
          }
        }

        let image = new Discord.MessageEmbed()
        .setColor(couleur)
        .setTitle("PAT")
        .setImage(parsedData.url)
        .setFooter(Copyright, avatarbot)

        if (!user) return msg.channel.send(image).catch(console.error);
        if (user && user.id == author.id) return msg.channel.send(image.setDescription(author.toString()+" se tapote !")).catch(console.error);

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

            if (user && user.id - author.id) return msg.channel.send(image2).catch(console.error);
          }
        }

        let image = new Discord.MessageEmbed()
        .setColor(couleur)
        .setTitle("SMUG")
        .setImage(parsedData.url)
        .setFooter(Copyright, avatarbot)

        if (!user) return msg.channel.send(image).catch(console.error);
        if (user && user.id == author.id) return msg.channel.send(image.setDescription(author.toString()+" est statisfait !")).catch(console.error);

      } catch (error) {
        console.error(error.msg);
      }
    });
  }).on("error", (error) => {
    console.error(error.msg);
  });
}

if (msg.content.startsWith(prefix + 'mdp')) {

        msgToArray = msg.content.split(' ');
  const nlenght = Number(msgToArray.pop()),
        N       = msg.content.includes("N"),
        S       = msg.content.includes("S");


  let erreur = new Discord.MessageEmbed()
        .setColor(couleur)
        .setTitle("MDP ERREUR")
        .setDescription("❌ Veuillez indiquer un nombre de charactère que le **mot-de-passe** doit contenir !\n\n(option indiqué dans l'exemple)\n\nCorrection : `r!mdp (N) (S) 10`")
        .setFooter(Copyright, avatarbot)    

  if (!nlenght) return msg.channel.send(erreur).catch(console.error);
  if (nlenght > 100) return msg.channel.send(erreur.setDescription("❌ Vous avez indiqué un nombre de charactère trop élevé !\n\nLimite : Le nombre de charactère maximum est compris entre `8` et `100`")).catch(console.error);
  if (nlenght < 8) return msg.channel.send(erreur.setDescription("❌ Vous avez indiqué un nombre de charactère trop petit !\n\nLimite : Le nombre de charactère minimum est compris entre `8` et `100`")).catch(console.error);

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
  .setTitle("MOT-DE-PASSE")
  .setDescription("Mot de passe généré :"+"```"+password+"```"+"")
  .addField("Nombre de charactère :", nlenght)
  .addField("Contient des chiffres :", ifN)
  .addField("Contient des symboles :", ifS)
  .setFooter(Copyright, avatarbot)

  let check = new Discord.MessageEmbed()
  .setColor(couleur)
  .setTitle("MOT-DE-PASSE")
  .setDescription("✅ Le mot de passe vous a bien été envoyé par mp !")
  .setFooter(Copyright, avatarbot)

  msg.author.send(passwordEmN);
  msg.channel.send(check);

}

if (msg.content.startsWith(prefix + 'userinfo') || msg.content.startsWith(prefix + 'ui') || msg.content.startsWith(prefix + 'userInfo')) {

  const userID   = msg.content.substring(msg.content.indexOf(' ') + 1); 
  const user     = msg.mentions.users.first() || client.users.cache.get(userID) || msg.author;

  if (user) {

    let member = msg.guild.member(user);

    if (member) {

      let status    = user.presence.status,
          guild     = msg.guild,
          isUserBot = 'jsp',
          isBooster = 'jsp',
          creation  = moment(user.createdAt).format('DD/MM/YYYY à hh:mm:ss'),
          join      = moment(member.joinedAt).format('DD/MM/YYYY à hh:mm:ss'),
          boost     = moment(member.premiumSince).format('DD/MM/YYYY à hh:mm:ss'),
          pp        = member.user.displayAvatarURL({dynamic: true});

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
  var paris = moment.tz("Europe/Paris").format("DD/MM/YYYY - hh:mm:ss");
  var parisd = moment.tz("Europe/Paris").format("DD/MM/YYYY")
  var parish = moment.tz("Europe/Paris").format("hh:mm:ss")
  var london = moment.tz("Europe/London").format("DD/MM/YYYY - hh:mm:ss");
  var londond = moment.tz("Europe/London").format("DD/MM/YYYY")
  var londonh = moment.tz("Europe/London").format("hh:mm:ss")

  let ParisEu = new Discord.MessageEmbed()
  .setColor(couleur)
  .setTitle("PARIS")
  .setDescription("Date et heure actuel à **Paris** : "+paris)  
  .addField("Date :", parisd)
  .addField("Heure :", parish)    
  .addField("Continent :", ":flag_eu: Europe")
  .setFooter(Copyright, avatarbot)

  let LondonEu = new Discord.MessageEmbed()
  .setColor(couleur)
  .setTitle("LONDON")
  .setDescription("Date et heure actuel à **London** : "+london)
  .addField("Date :", londond)
  .addField("Heure :", londonh)
  .addField("Continent :", ":flag_eu: Europe")     
  .setFooter(Copyright, avatarbot)

  if (msg.content.toLowerCase().includes("paris")) return msg.channel.send(ParisEu).catch(console.error);
  if (msg.content.toLowerCase().includes("london")) return msg.channel.send(LondonEu).catch(console.error);

  //Afrique
  var alger = moment.tz("Africa/Algiers").format("DD/MM/YYYY - hh:mm:ss");
  var algerd = moment.tz("Africa/Algiers").format("DD/MM/YYYY")
  var algerh = moment.tz("Africa/Algiers").format("hh:mm:ss")

  var casablanca = moment.tz("Africa/Casablanca").format("DD/MM/YYYY - hh:mm:ss");
  var casablancad = moment.tz("Africa/Casablanca").format("DD/MM/YYYY")
  var casablancah = moment.tz("Africa/Casablanca").format("hh:mm:ss")

  let AlgerAf = new Discord.MessageEmbed()
  .setColor(couleur)
  .setTitle("ALGER")
  .setDescription("Date et heure actuel à **Alger** : "+alger)
  .addField("Date :", algerd)
  .addField("Heure :", algerh)
  .addField("Continent :", "<:afu:734595847404388434> Afrique")       
  .setFooter(Copyright, avatarbot)

  let CasablancaAf = new Discord.MessageEmbed()
  .setColor(couleur)
  .setTitle("CASABLANCA")
  .setDescription("Date et heure actuel à **Casablanca** : "+casablanca)
  .addField("Date :", casablancad)
  .addField("Heure :", casablancah)
  .addField("Continent :", "<:afu:734595847404388434> Afrique")     
  .setFooter(Copyright, avatarbot)

  if (msg.content.toLowerCase().includes("alger")) return msg.channel.send(AlgerAf).catch(console.error);
  if (msg.content.toLowerCase().includes("casablanca")) return msg.channel.send(CasablancaAf).catch(console.error);

  //Australie 
  var sydney = moment.tz("Australia/Sydney").format("DD/MM/YYYY - hh:mm:ss");
  var sydneyd = moment.tz("Australia/Sydney").format("DD/MM/YYYY")
  var sydneyh = moment.tz("Australia/Sydney").format("hh:mm:ss")

  let Sydney = new Discord.MessageEmbed()
  .setColor(couleur)
  .setTitle("SYDNEY")
  .setDescription("Date et heure actuel à **Sydney** : "+sydney)
  .addField("Date :", sydneyd)
  .addField("Heure :", sydneyh)
  .addField("Continent :", ":flag_au: Australie") 
  .setFooter(Copyright, avatarbot)

  if (msg.content.toLowerCase().includes("sydney")) return msg.channel.send(Sydney).catch(console.error);

  //Antarctique
  var troll = moment.tz("Antarctica/Troll").format("DD/MM/YYYY - hh:mm:ss");
  var trolld = moment.tz("Antarctica/Troll").format("DD/MM/YYYY")
  var trollh = moment.tz("Antarctica/Troll").format("hh:mm:ss")


  let Troll = new Discord.MessageEmbed()
  .setColor(couleur)
  .setTitle("TROLL")
  .setDescription("Date et heure actuel à **Troll** : "+troll)
  .addField("Date :", trolld)
  .addField("Heure :", trollh)
  .addField("Continent :", ":flag_aq: Antarctique") 
  .setFooter(Copyright, avatarbot)

  if (msg.content.toLowerCase().includes("troll")) return msg.channel.send(Troll).catch(console.error);

  //America
  var denver = moment.tz("America/Denver").format("DD/MM/YYYY - hh:mm:ss")
  var denverd = moment.tz("America/Denver").format("DD/MM/YYYY")
  var denverh = moment.tz("America/Denver").format("hh:mm:ss")
  //
  var puerto_rico = moment.tz("America/Puerto_Rico").format("DD/MM/YYYY - hh:mm:ss")
  var puerto_ricod = moment.tz("America/Puerto_Rico").format("DD/MM/YYYY")
  var puerto_ricoh = moment.tz("America/Puerto_Rico").format("hh:mm:ss")
  
  let Denver = new Discord.MessageEmbed()
  .setColor(couleur)
  .setTitle("DENVER")
  .setDescription("Date et heure actuel à **Denver** : "+denver)    
  .addField("Date :", denverd)
  .addField("Heure :", denverh)
  .addField("Continent :", ":flag_us: Amérique")
  .setFooter(Copyright, avatarbot)

  let Puerto_Rico = new Discord.MessageEmbed()
  .setColor(couleur)
  .setTitle("PORTO-RICO")
  .setDescription("Date et heure actuel à **Porto Rico** : "+puerto_rico)    
  .addField("Date :", puerto_ricod)
  .addField("Heure :", puerto_ricoh)
  .addField("Continent :", ":flag_us: Amérique du Nord")
  .setFooter(Copyright, avatarbot)

  if (msg.content.toLowerCase().includes("portorico") + msg.content.toLowerCase().includes("puerto_rico") + msg.content.toLowerCase().includes("pr") + msg.content.toLowerCase().includes("puertorico")) return msg.channel.send(Puerto_Rico).catch(console.error);
  if (msg.content.toLowerCase().includes("denver")) return msg.channel.send(Denver).catch(console.error);
}

  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.split(" ");
  const recherche = args.join(" ");
  const serverQueue = queue.get(message.guild.id);

  const r = await yts(recherche)
  const videos = r.videos;

  let link = msg.content.toLowerCase().includes("https://www.youtube.com/") || 
  msg.content.toLowerCase().includes("https://www.youtu.be/")    || 
  msg.content.toLowerCase().includes("https://youtube.com/")     || 
  msg.content.toLowerCase().includes("https://youtu.be/")        || 
  msg.content.toLowerCase().includes("http://www.youtube.com/")  || 
  msg.content.toLowerCase().includes("http://www.youtu.be/")     || 
  msg.content.toLowerCase().includes("http://youtube.com/")      || 
  msg.content.toLowerCase().includes("http://youtu.be/")         || 
  msg.content.toLowerCase().includes("www.youtube.com/")         || 
  msg.content.toLowerCase().includes("www.youtu.be/")            || 
  msg.content.toLowerCase().includes("youtube.com/")             || 
  msg.content.toLowerCase().includes("youtu.be/");

  if (message.content.startsWith(prefix+'play')) {
    if (link) return execute(message, serverQueue);
    if (!link) return execute(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}skip`)) {
    skip(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}stop`)) {
    stop(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}volume`) || (message.content.startsWith(`${prefix}vol`))) {
    volume(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}pause`)) {
    pause(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}resume`)) {
    resume(message, serverQueue);
    return;
  }

  async function execute(message, serverQueue) {

    const voiceChannel = message.member.voice.channel;
    const permissions = voiceChannel.permissionsFor(message.client.user);

    //if (!url.match(/(youtube.com|youtu.be)\/(watch)?(\?v=)?(\S+)?/)) return message.channel.send("❌ Veuillez stipulez un lien valide !");
    if (!voiceChannel) return (embed.setTitle("ERREUR").setDescription("❌ Vous devez rejoindre un salon vocal pour jouer de la musique !")).catch(console.error);
    if (!permissions.has("CONNECT")) return msg.channel.send(embed.setTitle("ERREUR").setDescription("❌ Je n'ai pas la permission `Se connecter` dans ce channel !")).catch(console.error); 
    if (!permissions.has("SPEAK")) return msg.channel.send(embed.setTitle("ERREUR").setDescription("❌ Je n'ai pas la permission `Parler` dans ce channel !")).catch(console.error);

    if (link) {
      const songInfo = await ytdl.getInfo(args[1]);
      const song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url
      };
    
      if (!serverQueue) {
        const queueContruct = {
          textChannel: message.channel,
          voiceChannel: voiceChannel,
          connection: null,
          songs: [],
          volume: 1,
          playing: true
        };
    
        queue.set(message.guild.id, queueContruct);
    
        queueContruct.songs.push(song);
    
        try {
          var connection = await voiceChannel.join();
          queueContruct.connection = connection;
          play(message.guild, queueContruct.songs[0]);
        } catch (err) {
          console.log(err);
          queue.delete(message.guild.id);
          return message.channel.send(err);
        }
      } else {

        serverQueue.songs.push(song);
        return msg.channel.send(embed.setTitle("MUSIQUE").setDescription('**'+`[${song.title}](${song.url})`+'**'+" a bien été ajouté à la queue !")).catch(console.error);    
      }
    }

    if (!link) {
      if (!serverQueue) {
        const queueContruct = {
          textChannel: message.channel,
          voiceChannel: voiceChannel,
          connection: null,
          songs: [],
          volume: 1,
          playing: true
        };
    
        queue.set(message.guild.id, queueContruct);
    
        queueContruct.songs.push(videos[0]);
    
        try {
          var connection = await voiceChannel.join();
          queueContruct.connection = connection;
          play(message.guild, queueContruct.songs[0]);
        } catch (err) {
          console.log(err);
          queue.delete(message.guild.id);
          return message.channel.send(err);
        }
      } else {

        serverQueue.songs.push(videos[0]);
        return msg.channel.send(embed.setTitle("MUSIQUE").setDescription('**'+`[${videos[0].title}](${videos[0].url})`+'**'+" a bien été ajouté à la queue !")).catch(console.error);    
      }
    }
  }

  
  function skip(message, serverQueue) {
    if (!message.member.voice.channel) return msg.channel.send(embed.setTitle("ERREUR").setDescription("❌ Vous devez rejoindre un salon vocal pour jouer de la musique !")).catch(console.error);
    if (!serverQueue) return msg.channel.send(embed.setTitle("ERREUR").setDescription("❌ Il n'y a pas de musique dans la queue !")).catch(console.error);
    serverQueue.connection.dispatcher.end();
    msg.channel.send(embed.setTitle("MUSIQUE").setDescription("✅ La musique vient d'être skippé !\n\n(si il n'y a pas de musique dans la queue le bot se déconnectera)"))
  }
  
  function stop(message, serverQueue) {
    if (!message.member.voice.channel) return msg.channel.send(embed.setTitle("ERREUR").setDescription("❌ Vous devez rejoindre un salon vocal pour stopper de la musique !")).catch(console.error);
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
    msg.channel.send(embed.setTitle("MUSIQUE").setDescription("✅ La musique vient d'être stoppé !\n\n(déconnexion du bot)"))
  }

  function play(guild, song) {
    if (!message.member.voice.channel) return msg.channel.send(embed.setTitle("ERREUR").setDescription("❌ Vous devez rejoindre un salon vocal pour jouer de la musique !")).catch(console.error);
    const serverQueue = queue.get(guild.id);
    if (!song) {
      serverQueue.voiceChannel.leave();
      queue.delete(guild.id);
      return;
    }
    dispatcher = serverQueue.connection.play(ytdl(song.url)).on("finish", () => {serverQueue.songs.shift();play(guild, serverQueue.songs[0]);}).on("error", error => console.error(error)); dispatcher.setVolumeLogarithmic(serverQueue.volume / 1);serverQueue.textChannel.send(embed.setTitle("MUSIQUE").setDescription('**'+`[${song.title}](${song.url})`+'**'+" vient d'être mise en lecture !"));
  }
 
  function search(guild, song, videos) {
    if (!message.member.voice.channel) return msg.channel.send(embed.setTitle("ERREUR").setDescription("❌ Vous devez rejoindre un salon vocal pour jouer de la musique !")).catch(console.error);
    const serverQueue = queue.get(guild.id);
    if (!song) {
      serverQueue.voiceChannel.leave();
      queue.delete(guild.id);
      return;
    }
    dispatcher = serverQueue.connection.play(ytdl(videos[0].url)).on("finish", () => {serverQueue.songs.shift();search(guild, serverQueue.songs[0]);}).on("error", error => console.error(error)); dispatcher.setVolumeLogarithmic(serverQueue.volume / 1);serverQueue.textChannel.send(embed.setTitle("MUSIQUE").setDescription('**'+`[${videos[0].title}](${videos[0].url})`+'**'+" vient d'être mise en lecture !"));
  }

  function volume(song) {
    if (connection.channel) return msg.channel.send(embed.setTitle("ERREUR").setDescription("❌ Vous devez rejoindre le salon vocal "+"`"+connection.channel.name+"`"+" !\n\nPour pouvoir changer le volume de la musique en cours de lecture !")).catch(console.error);
    msgToArray = message.content.split(' ');

    let vol = Number(msgToArray.pop());

    if (!song) return msg.channel.send(embed.setTitle("ERREUR").setDescription("❌ Il n'y aucune musique en cours de lecture !")).catch(console.error);
    if (!vol) return msg.channel.send(embed.setTitle("ERREUR").setDescription("❌ Veuillez saisir un volume valide !"))

    vol2 = dispatcher.setVolume(vol / 100)
    msg.channel.send(embed.setTitle("MUSIQUE").setDescription("✅ Le volume vient d'être changer pour : "+"**"+vol+"%**"))
  }

  function pause(song) {
    if (connection.channel) return msg.channel.send(embed.setTitle("ERREUR").setDescription("❌ Vous devez rejoindre le salon vocal "+"`"+connection.channel.name+"`"+" !\n\nPour pouvoir changer le volume de la musique en cours de lecture !")).catch(console.error);
    if (!message.member.voice.channel) return msg.channel.send(embed.setTitle("ERREUR").setDescription("❌ Vous devez rejoindre un salon vocal pour jouer de la musique !")).catch(console.error);
    if (!song) return msg.channel.send(embed.setTitle("ERREUR").setDescription("❌ Il n'y aucune musique en cours de lecture !")).catch(console.error);

    dispatcher.pause()
    msg.channel.send(embed.setTitle("MUSIQUE").setDescription("✅ La musique à bien été mise en pause !"))
  }

  function resume(song) {
    if (connection.channel) return msg.channel.send(embed.setTitle("ERREUR").setDescription("❌ Vous devez rejoindre le salon vocal "+"`"+connection.channel.name+"`"+" !\n\nPour pouvoir changer le volume de la musique en cours de lecture !")).catch(console.error);
    if (!song) return msg.channel.send(embed.setTitle("ERREUR").setDescription("❌ Il n'y aucune musique en cours de lecture !")).catch(console.error);

    dispatcher.resume()
    msg.channel.send(embed.setTitle("MUSIQUE").setDescription("✅ La musique à bien été mise en lecture !"))
  }  

});

client.login(token);