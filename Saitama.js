const Discord = require('discord.js');
const google = require('google');
const { TOKEN, PREFIX, VERSION } = require('./trucimportant');
const client = new Discord.Client({disableMentions: "everyone"});
const fs = require('fs');
const si = require('systeminformation');
const moment = require('moment');
 
const prefix = PREFIX;

client.commands = new Discord.Collection();

client.on('message', message => {

  if (!message.guild) return;

  if (message.content.startsWith(prefix + 'permissions') || message.content.startsWith(prefix + 'perm')) {

let permissions = [

  "**CREATE_INSTANT_INVITE** : **Créer une invitation**",
  "**KICK_MEMBERS** : **Expulser des membres**",
  "**BAN_MEMBERS** : **Bannir des membres**",
  "**ADMINISTRATOR** : **Administrateur**",
  "**MANAGE_CHANNELS** : **Gérer les salons**",
  "**MANAGE_GUILD** : **Gérer le serveur**",
  "**ADD_REACTIONS** : **Ajouter des réactions**",
  "**VIEW_AUDIT_LOG** : **Voir les logs du serveur**",
  "**PRIORITY_SPEAKER** : **Voix prioritaire**",
  "**STREAM** : **Vidéo**",
  "**VIEW_CHANNEL** : **Lire les salons textuels & voir les salons vocaux**",
  "**SEND_MESSAGES** : **Envoyer des messages**",
  "**SEND_TTS_MESSAGES** : **Envoyer des messages TTS**",
  "**MANAGE_MESSAGES** : **Gérer les messages**",
  "**EMBED_LINKS** : **Intégrer des liens**",
  "**ATTACH_FILES** : **Joindre des fichiers**",
  "**READ_MESSAGE_HISTORY** : **Voir les anciens messages**",
  "**MENTION_EVERYONE** : **Mentionner @everyone, @here et tous les rôles**",
  "**USE_EXTERNAL_EMOJIS** : **Utiliser des émojis externes**",
  "**VIEW_GUILD_INSIGHTS** : **flemme de traduire va sur google saoule pas**",
  "**CONNECT** : **Se connecter**",
  "**SPEAK** : **Parler**",
  "**MUTE_MEMBERS** : **Couper le micro de membres**",
  "**DEAFEN_MEMBERS** : **Mettre en sourdine des membres**",
  "**MOVE_MEMBERS** : **Déplacer des membres**",
  "**USE_VAD** : **Utiliser la Détection de la voix**",
  "**CHANGE_NICKNAME** : **Changer le pseudo**",
  "**MANAGE_NICKNAMES** : **Gérer les pseudos**",
  "**MANAGE_ROLES** : **Gérer les rôles**",
  "**MANAGE_WEBHOOKS** : **Gérer les webhooks**",
  "**MANAGE_EMOJIS** : **Gérer les émojis**"
];

    let permEm = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("PERMISSIONS")
    .setDescription(permissions)
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))
    message.channel.send(permEm).catch(console.error);

  }
});

let version = VERSION;
let discordversion = '12.2.0';
let ppbot = "https://cdn.discordapp.com/avatars/713499527872774154/4a35f84398ff75a10d2d16cba83097a7.webp";
let createur = ['<@509115921156014081>'];
let createurTag = ['`509115921156014081`'];
let whitelist = ['509115921156014081', '328615373333331970'];
let contributeur = ["<@553543583710445568> (`molo#0001` `553543583710445568`)"];
let admin = ["<@509115921156014081> (`509115921156014081`)" + "\n<@328615373333331970> (`Atsuki#4689` `328615373333331970`)"];

client.on('message', async message => {
  if (message.content.startsWith(prefix + 'help whit')) {

    let nonWhitelist = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("ERREUR")
    .setDescription("**Commande réservé au `WHITELIST` bolosse !**")
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

    if (!whitelist.includes(message.author.id)) return message.channel.send(nonWhitelist);
    
    let embed = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("Page d'aide des commandes whitlisted :")
    .addField(`\`${PREFIX}exec [script]\``, "Permet d'exécuter du code (js)")
    .addField(`\`${PREFIX}restart\``, "Permet de redémarrer le bot")
    .addField(`\`${PREFIX}shutdown\``, "Permet d'arrêter le bot")
    .addField(`\`${PREFIX}shutdownEX\``, "Permet d'arrêter le bot niveau **ALT + F4**")
    .addField(`\`${PREFIX}code\``, "En vois le code du bot")
    .addField(`\`${PREFIX}say [message]\``, "Fait envoyer un message au bot")
    .addField(`\`${PREFIX}spam [nombre] [message]\``, "Permet de spam un nombre de message")
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))
    if (whitelist.includes(message.author.id)) return message.channel.send(embed);
  }
});

client.on('message', async message => {
  const args = message.content.split(' ');
  const command = args.shift().toLowerCase();
  
  if (message.content.startsWith(prefix + 'exec')) {

    let nonWhitelist = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("ERREUR")
    .setDescription("**Commande réservé au `WHITELIST` bolosse !**")
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

    if (!whitelist.includes(message.author.id)) return message.channel.send(nonWhitelist);
    
    let evaled;
    try {

      const code = args.join(' ');

      let erreur = new Discord.MessageEmbed()
      .setColor("YELLOW")
      .setTitle("ERREUR")
      .setDescription("```SyntaxError: Aucun script n'est détecté veuillez réessayer```\n ❎ **Une erreur a était identifié**⬆️")
      .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))
  
      if (!code) return message.channel.send(erreur)

      evaled = await eval(code);

      let embed = new Discord.MessageEmbed()
      .setColor("YELLOW")
      .setTitle("Évalutation de votre script:")
      .setDescription("```" + args.join(' ') + "```\n ✅ **Votre script fonctionne et n'a pas d'erreur identifié**")
      .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))
      message.channel.send(embed);

      //console.log(inspect(evaled));

      //message.channel.send(evaled);
    } 
    catch (error) {

      let embed = new Discord.MessageEmbed()
      .setColor("YELLOW")
      .setTitle("ERREUR")
      .setDescription("```" + error + "```\n ❎ **Une erreur a était identifié** ⬆️")
      .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))
      message.channel.send(embed);

    }
  }
});

client.on('message', async message => {

  if (message.content === prefix + 'shutdown') {

    let nonWhitelist = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("ERREUR")
    .setDescription("**Commande réservé au `WHITELIST` bolosse !**")
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

    if (!whitelist.includes(message.author.id)) return message.channel.send(nonWhitelist);

    var avatar = message.author.avatarURL({dynamic: true})
            
    let stop = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("STOP")
    .setDescription("**Bot éteint sans échec**")
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', avatar)
    message.channel.send(stop)
    
    client.destroy()
  }
});

client.on('message', async message => {

  if (message.content.startsWith(prefix + 'code')) {

    let nonWhitelist = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("ERREUR")
    .setDescription("**Commande réservé au `WHITELIST` bolosse !**")
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

    if (!whitelist.includes(message.author.id)) return message.channel.send(nonWhitelist);

    var avatar = message.author.avatarURL({dynamic: true})

    let embed = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("CODE DE MALADE MENTALE")
    .setDescription("**Fichier envoyé avec succès à tes mp fdp**")
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', avatar)
    message.channel.send(embed)

    message.author.send({
      files: ['./trucimportant.js', './Saitama.js']
  });
  }
});

client.on('message', async message => {

  if (message.content === prefix + 'shutdownEX') {

    let nonWhitelist = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("ERREUR")
    .setDescription("**Commande réservé au `WHITELIST` bolosse !**")
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

    if (!whitelist.includes(message.author.id)) return message.channel.send(nonWhitelist);

    var avatar = message.author.avatarURL({dynamic: true})
      
    let stop = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("STOP NIVEAU ALT + F4")
    .setDescription("**Bot éteint sans échec**")
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', avatar)
    message.channel.send(stop)

    process.exit()
  }
});
  
client.on('message', async message => {

  if (message.content.startsWith(prefix + 'restart')) {

    let nonWhitelist = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("ERREUR")
    .setDescription("**Commande réservé au `WHITELIST` bolosse !**")
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

    if (!whitelist.includes(message.author.id)) return message.channel.send(nonWhitelist);

    var avatar = message.author.avatarURL({dynamic: true})

    let embed = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("RESTART")
    .setDescription("**Restart en cours.**")
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', avatar)
    var message = await message.channel.send(embed)

    let embed1 = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("RESTART")
    .setDescription("**Restart en cours..**")
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', avatar)
    message.edit(embed1)
  
    let embed2 = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("RESTART")
    .setDescription("**Restart en cours...**")
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', avatar)
    message.edit(embed2)
    
    function resetBot(channel) { 
      process.exit()
      client.login(TOKEN)
    }

    let restart = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("RESTART")
    .setDescription("✅ **Le bot c'est correctement redémarré**")
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', avatar)
    message.edit(restart)
  }
});

client.on('message', message => {

  if (message.content.startsWith(prefix + 'glitch')) {

    let nonWhitelist = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("ERREUR")
    .setDescription("**Commande réservé au `WHITELIST` bolosse !**")
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

    if (!whitelist.includes(message.author.id)) return message.channel.send(nonWhitelist);

    message.reply("**GLITCH REUSSI FDP**")

  }
});

  //client.on('ready', () => {
   // const guild = bot.guilds.get("706832516975427585");
    //let Role = guild.roles.find(x => x.name === "BOT NO HOMO");
   // let Member = guild.members.get("509115921156014081", '553543583710445568')
   // johnMember.addRole(Role);
  //  })

// spam = 
//for (let i = 0; i < 10; i++) {
// message.channel.send("https://cdn.discordapp.com/attachments/487696136052670487/712712688102539294/gay.png").catch(console.error);
// }

//s!exec for (let i = 0; i < 1000; i++) {
//  message.channel.send("FIRST @molo#0001 j'te b*ise et @" C ¹² ⚜#0213  t gay https://cdn.discordapp.com/attachments/487696136052670487/712712688102539294/gay.png").catch(console.error);
//  }

client.on('message', message => {

  if (message.content.startsWith(prefix + 'spam')) {

    let nonWhitelist = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("ERREUR")
    .setDescription("**Commande réservé au `WHITELIST` bolosse !**")
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

    if (!whitelist.includes(message.author.id)) return message.channel.send(nonWhitelist);

    let args = message.content.split(" ").slice(1);
    let args2 = message.content.split(" ").slice(2);

    let erreur2 = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("ERREUR")
    .setDescription(`**Indiquez un message à spam !**`)
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

    let erreur3 = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("ERREUR")
    .setDescription(`**Indiquez un nombre et un message à spam !**\n Comme ceci \`s!spam [nombre] [message]\``)
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))
  
    let erreur = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("ERREUR")
    .setDescription(`**Indiquez un nombre de message à spam !**`)
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))
     
    if (!args[0] || !args2) return message.channel.send(erreur3);
    if (!args[0]) return message.channel.send(erreur);
    if (!args2) return message.channel.send(erreur2);

    for (let i = 0; i < args[0]; i++) {
      message.channel.send(args2).catch(console.error);
    }

  };
});

client.on('ready', () => {

  console.log("Bot: " + client.user.tag + " est connecté");

  let statuses = [`${client.guilds.cache.size} serveur${client.guilds.cache.size > 1 ? "s" : "️"}`, PREFIX+'help', `Version: ${version}`, 'BETA']

  let types = ["LISTENING", "WATCHING", "PLAYING"]

  setInterval(function() {
    let status = statuses[Math.floor(Math.random() * statuses.length)];

    let type = types[Math.floor(Math.random() * types.length)];

    client.user.setActivity(status, {type: type})
  }, 15000);
});

client.on('message', async message => {

  if (message.content.startsWith(prefix + 'infos')) {

    //serveurs = client.guilds.cache.size

    infosE = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("INFOS")
    .setDescription("**Page contenant les informations du bot :**")
    .setThumbnail(ppbot)
    .addField(`Prefix :`, "`s!`")
    .addField(`Version :`, `\`Private - Beta - ${version}\``)
    .addField(`Version de discord.js:`, "`"+ discordversion +"`")
    .addField(`Créateur :`, `${createur} (${createurTag})`)
    //.addField(`Nombre de serveurs :`, `\`${serveurs}\``)
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

    message.channel.send(infosE)
  }
});

client.on('message', async message => {

  if (message.content.startsWith(prefix + 'credits') || message.content.startsWith(prefix + 'crédits')) {

    credits = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("CREDITS")
    .setDescription("**Voici la liste des Anti-HomoSexuel qui m'ont aidé à faire ce bot :**")
    .setThumbnail(ppbot)
    .addField(`AHS Créateur :`, `${createur} **(${createurTag})**`)
    .addField(`Développeur No-Homo :`, `${createur} **(${createurTag})**`)
    .addField(`Contributeur :`, contributeur)
    .addField(`Admin :`, admin)
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

    message.channel.send(credits)
  }
});

client.on('message', async message => {

  if (message.content === prefix + 'help' || message.content === prefix + 'h' ) {
    var avatar = message.author.avatarURL({dynamic: true})

    let nonWhitelist = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("Page 1/7 | Aides et documentations :")
    .addField(`\`${PREFIX}help\``, "Vous y êtes actuellement")
    .addField(`\`${PREFIX}help fun\``, "Affiche la des commandes utiles")
    .addField(`\`${PREFIX}help util\``, "Affiche la des commandes utiles")
    .addField(`\`${PREFIX}help info\``, "Affiche la page d'aide des commandes informatif")
    .addField(`\`${PREFIX}help role\``, "Affiche la page d'aide des commandes pour gérer les rôles")
    .addField(`\`${PREFIX}help mod\``, "Affiche la page d'aide des commandes admin/modération")
    .addField(`\`${PREFIX}help raccourcis\``, "Page d'aide sur tout les raccourcis des commandes du bot")
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', avatar)

    let whitelistEm = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("Page 1/7 | Aides et documentations :")
    .addField(`\`${PREFIX}help\``, "Vous y êtes actuellement")
    .addField(`\`${PREFIX}help fun\``, "Affiche la des commandes utiles")
    .addField(`\`${PREFIX}help util\``, "Affiche la des commandes utiles")
    .addField(`\`${PREFIX}help info\``, "Affiche la page d'aide des commandes informatif")
    .addField(`\`${PREFIX}help role\``, "Affiche la page d'aide des commandes pour gérer les rôles")
    .addField(`\`${PREFIX}help mod\``, "Affiche la page d'aide des commandes admin/modération")
    .addField(`\`${PREFIX}help raccourcis\``, "Page d'aide sur tout les raccourcis des commandes du bot")
    .addField(`\`${PREFIX}help whit\``, "Affiche la page d'aide des commandes admin du bot")
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', avatar)

    if (!whitelist.includes(message.author.id)) return message.channel.send(nonWhitelist);
    if (whitelist.includes(message.author.id)) return message.channel.send(whitelistEm);

  }
});

client.on('message', async message => {

  if (message.content === prefix + 'help util' || message.content === prefix + 'h util') {
    var avatar = message.author.avatarURL({dynamic: true})
    
    let embed = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("Page 2/7 | Aide des commandes utiles :")
    .addField(`\`${PREFIX}setnickname [@user] [name du surnom]\``, "Permet d'avoir un surnom dans le serveur actuel")
    .addField(`\`${PREFIX}ping\``, "Calcule le ping du bot")
    .addField(`\`${PREFIX}avatar (mention)\``, "Affiche votre pp ou celle d'un membre mentionné")
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', avatar)
    message.channel.send(embed);
  }
});

client.on('message', async message => {

  if (message.content === prefix + 'help fun' || message.content === prefix + 'h fun') {
    var avatar = message.author.avatarURL({dynamic: true})
    
    let embed = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("Page 3/7 | Aide des commandes fun :")
    .addField(`\`${PREFIX}invisible\``, "Envoie un message totalement invisible")
    .addField(`\`${PREFIX}emsay\``, "Fait envoyer un message dans un embed au bot")
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', avatar)
    message.channel.send(embed);
  }
});

client.on('message', async message => {

  if (message.content === prefix + 'help info' || message.content === prefix + 'h info') {
    var avatar = message.author.avatarURL({dynamic: true})

    let embed = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("Page 4/7 | Aide des commandes info :")
    .addField(`\`${PREFIX}infos\``, "Donne des informations sur le bot")
    .addField(`\`${PREFIX}serverinfo\``, "Affiche les informations du serveur")
    .addField(`\`${PREFIX}userinfo (mention)\``, "Affiche vos informations ou celle d'un membre")
    .addField(`\`${PREFIX}permissions\``, "Permet de voir toutes les permissions existante sur discord")
    .addField(`\`${PREFIX}credits\``, "Permet de voir qui à contribué à la création de ce bot")
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', avatar)
    message.channel.send(embed);
  }
});

client.on('message', async message => {

  if (message.content === prefix + 'help mod' || message.content === prefix + 'h mod') {
    var avatar = message.author.avatarURL({dynamic: true})
    
    let embed = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("Page 5/7 | Aide en administration/modération :")
    .addField(`\`${PREFIX}mute [@user] (reason)\``, "Permet de mute un membre")
    .addField(`\`${PREFIX}kick [@user] (reason)\``, "Permet d'unmute un membre")
    .addField(`\`${PREFIX}ban  [@user] (reason)\``, "Permet de ban un membre souhaiter")
    .addField(`\`${PREFIX}clear [nombre]\``, "Permet de clear un certain nombre de messages compris entre `1` et `100`")
    .addField(`\`${PREFIX}createText [nom du channel]\``, "Permet de créer un channel textuel")
    .addField(`\`${PREFIX}deleteText [nom du channel]\``, "Permet de supprimer un channel textuel")
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', avatar)
    message.channel.send(embed);
  }
});

client.on('message', async message => {

  if (message.content === prefix + 'help raccourcis' || message.content === prefix + 'h raccourcis') {
    var avatar = message.author.avatarURL({dynamic: true})

    let embed = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("Page 6/7 | Aide des commandes fun :")
    .addField(`\`${PREFIX}h\``, "Page d'aide sur toute les commandes")
    .addField(`\`${PREFIX}h fun\``, "Page d'aide sur toute les commandes pour le plaisir")   
    .addField(`\`${PREFIX}h util\``, "Page d'aide sur toute les commandes utiles")
    .addField(`\`${PREFIX}h info\``, "Page d'aide sur toute les commandes d'inforamtion")
    .addField(`\`${PREFIX}h role\``, "Affiche la page d'aide des commandes pour gérer les rôles")
    .addField(`\`${PREFIX}h mod\``, "Page d'aide sur toute les commandes de modération")
    .addField(`\`${PREFIX}h raccourcis\``, "Page d'aide sur tout les raccourcis des commandes du bot")
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', avatar)
    message.channel.send(embed);
  }
});

client.on('message', async message => {

  if (message.content === prefix + 'help role' || message.content === prefix + 'h role') {
    var avatar = message.author.avatarURL({dynamic: true})

    let embed = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("Page 7/7 | Aide des commandes fun :")
    .addField(`\`${PREFIX}rolecreate [NomDuRole]\``, "Permet de crée un rôle")
    .addField(`\`${PREFIX}roledelete [NomDuRole]\``, "Permet de supprimé")   
    .addField(`\`${PREFIX}roleadd [@user] [NomDuRole]\``, "Permet d'ajouter un role à un membre ou à vous même")
    .addField(`\`${PREFIX}roleremove [@user] [NomDuRole]\``, "Permet de retirer un rôle à un membre ou à vous même")
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', avatar)
    message.channel.send(embed);
  }
});

client.on('message', message => {
  if (message.content.startsWith(prefix + 'invisible')) {
    message.channel.send("️")
  }
});

client.on('message', message => {

  if (message.content.startsWith(prefix+'setnickname')) {

    if (!message.guild.me.hasPermission('MANAGE_NICKNAMES')) return message.channel.send('Il me faut la permission `Gérer les pseudos` !');

    var args = message.content.split(" ").slice(2);
    var nickName = args.join(" ");

    var user = message.mentions.users.first();

    if (user) {

      let member = message.guild.member(user);

      if (member) {

        let nickname = new Discord.MessageEmbed()
        .setColor("YELLOW")
        .setTitle("NICKNAME")
        .setDescription("✅ **"+ user.toString() +" à maintenant le surnom :** "+ "`"+nickName+"`")
        .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))
        if (user) member.setNickname(nickName), message.channel.send(nickname).catch(console.error);
      }
    }
  };
});

client.on('message', message => {

  if (message.content.startsWith(prefix + 'say')) {

    let nonWhitelist = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("ERREUR")
    .setDescription("**Commande réservé au `WHITELIST` bolosse !**")
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

    if (!whitelist.includes(message.author.id)) return message.channel.send(nonWhitelist);

    message.delete();

    var args = message.content.split(" ").slice(1);
    var say = args.join(" ")

    let everyoneE = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("ERREUR")
    .setDescription("**Interdit au everyone bolosse !**")
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

    let hereE = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("ERREUR")
    .setDescription("**Interdit au here bolosse !**")
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

    let noMsg = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("ERREUR")
    .setDescription(`**Indiquez un message à envoyer !**\n Comme ceci \`s!say [message]\``)
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

    let inviteEm = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("ERREUR")
    .setDescription("**La pub via cette commande est interdite !**")
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

    if (message.content.includes('discord.gg/', 'https://discord.gg/', 'https://discord.com/invite/', 'discord.com/invite/')) return message.channel.send(inviteEm);
    if (message.content.includes("@everyone")) return message.channel.send(everyoneE).then(message => {message.delete({timeout: 2000}).catch(console.error);});
    if (message.content.includes("@here")) return message.channel.send(hereE).then(message => {message.delete({timeout: 2000}).catch(console.error);});
    if (!say) return message.channel.send(noMsg).then(message => {message.delete({timeout: 3000}).catch(console.error);});

    message.channel.send(say)
  }
});

client.on('message', message => {

  if (message.content.startsWith(prefix + 'emsay')) {

    message.delete();

    let everyoneE = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("ERREUR")
    .setDescription("**Interdit au everyone bolosse !**")
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

    let hereE = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("ERREUR")
    .setDescription("**Interdit au here bolosse !**")
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

    let noMsg = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("ERREUR")
    .setDescription(`**Indiquez un message à envoyer !**\n Comme ceci \`s!emsay [message]\``)
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

    let inviteEm = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("ERREUR")
    .setDescription("**La pub via cette commande est interdite !**")
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

    //var title = message.content.split(" ").slice(1);
    var desc = message.content.split(" ").slice(1);

    let sayDesc = desc.join(" ");
    //let sayTitle = title.join(" ");

    if (message.content.includes('discord.gg/', 'https://discord.gg/', 'https://discord.com/invite/', 'discord.com/invite/')) return message.channel.send(inviteEm);
    if (message.content.includes("@everyone")) return message.channel.send(everyoneE).then(message => {message.delete({timeout: 2000}).catch(console.error);});
    if (message.content.includes("@here")) return message.channel.send(hereE).then(message => {message.delete({timeout: 2000}).catch(console.error);});
    if (!sayDesc) return message.channel.send(noMsg).then(message => {message.delete({timeout: 3000}).catch(console.error);});

    //let sayToutEm = new Discord.MessageEmbed()
    //.setColor("YELLOW")
    //.setTitle(sayTitle)
    //.setDescription(sayDesc)
    //.setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

    let sayDescEm = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setDescription(sayDesc)
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

    //let sayTitleEm = new Discord.MessageEmbed()
    //.setColor("YELLOW")
    //.setTitle(sayTitle)
    //.setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

    //if (sayTitle || sayDesc) return message.channel.send(sayToutEm).catch(console.error);
    if (sayDesc) return message.channel.send(sayDescEm).catch(console.error);
    //if (sayTitle) return message.channel.send(sayTitleEm).catch(console.error);

  }
});

client.on('message', message => {

  if (!message.guild) return;

  if (message.content.startsWith(prefix + 'warn')) {

    let erreurPerm = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("ERREUR")
    .setDescription(`❌ **Vous n'avez pas la permission \`Gérer les rôles\`**`)
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

    let erreurPerm1 = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("ERREUR")
    .setDescription(`❌ **Il me faut la permission \`Gérer les rôles\`**`)
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

    let erreurBot = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("ERREUR")
    .setDescription(`❌ **Je ne peux pas warn un bot**`)
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

    let erreurPosition = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("ERREUR")
    .setDescription(`❌ **Vous ne pouvez pas warn un utilisateur au dessus de vous**`)
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

    let num = 1;

    let erreurDejaMute = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("WARN")
    .setDescription(`✅ **L'utilisateur à bien était warn il a un total de ${num} warn${num > 1 ? "s" : "️"}**`)
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

    if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(erreurPerm).catch(console.error); 
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send(erreurPerm1).catch(console.error);

    var args = message.content.split(" ").slice(1);
    var args = message.content.split(" ").slice(2);
    var reason = args.join(" ");

    let user = message.mentions.users.first();

    if (user) {

      let member = message.guild.member(user);

      if (member) {

         let warnRole = message.guild.roles.cache.find(role => role.position < message.guild.me.roles.highest.position && role.name === 'WARN')

        if (!warnRole) warnRole = message.guild.roles.create({data: {name: "🔻┊WarnBySaitama", color: "000001"}, reason: "Role warn introuvable, un rôle pour le remplacer a été crée"}).catch(console.error);
		    if (member.roles.highest.position > message.member.roles.highest.position) return message.channel.send(erreurPosition).catch(console.error);
        if (member.user.bot) return message.channel.send(erreurBot).catch(console.error);

        member
          .roles.add(warnRole, reason)
          .then(() => {

            let userNoSend = new Discord.MessageEmbed()
            .setColor("YELLOW")
            .setTitle("MUTE")
            .setDescription(`✅ **L'utilisateur ${user} a bien été mute !**\n \n ❌ **Je n'ai pas pu prévenir ${user} !** \n \n **${user} n'autorise pas les messages en provenance des membres du serveur.**`)
            .addField("**Membre:**", `\`${user.tag}\``)
            .addField("**Auteur:**", `**\`${message.author.tag}\`**`)
            .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

            let raison = new Discord.MessageEmbed()
            .setColor("YELLOW")
            .setTitle("WARN")
            .setDescription(`✅ **L'utilisateur ${user} a bien été warn !**`)
            .addField("**Membre:**", `\`${user.tag}\``)
            .addField("**Auteur:**", `**\`${message.author.tag}\`**`)
            .addField("**Raison:**", `${reason}`)
            .addField("**Total warn:**", `${num}`)
            .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

            let pasderaison = new Discord.MessageEmbed()
            .setColor("YELLOW")
            .setTitle("WARN")
            .setDescription(`✅ **L'utilisateur ${user} a bien été warn !**`)
            .addField("**Membre:**", `\`${user.tag}\``)
            .addField("**Auteur:**", `**\`${message.author.tag}\`**`)
            .addField("**Raison:**", `Aucune **raison** n'est stipulé`)
            .addField("**Total warn:**", `${num}`)
            .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))
    //\     _____________________________________________________________________________________________________

            //if (reason)  return user.send(userSendRaison).catch(error => {message.channel.send(userNoSend)});
            //if (!reason) return user.send(userSendSansRaison).catch(error => {message.channel.send(userNoSend)})
    //\     _____________________________________________________________________________________________________

            if (reason)  return  message.channel.send(raison);
            if (!reason) return message.channel.send(pasderaison);

          }).catch(console.error);
        }
      }

      let pasdemention = new Discord.MessageEmbed()
      .setColor("YELLOW")
      .setTitle("ERREUR")
      .setDescription(`❌**Veuillez mentionner un membre à warn !**`)
      .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))
      if (!user) return message.channel.send(pasdemention);

    };
  });

client.on('message', message => {

  if (!message.guild) return;

  if (message.content.startsWith(prefix + 'mute')) {

    let erreurPerm = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("ERREUR")
    .setDescription(`❌ **Vous n'avez pas la permission \`Gérer les rôles\`**`)
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

    let erreurPerm1 = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("ERREUR")
    .setDescription(`❌ **Il me faut la permission \`Gérer les rôles\`**`)
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

    let erreurBot = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("ERREUR")
    .setDescription(`❌ **Je ne peux pas mute un bot**`)
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

    let erreurPosition = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("ERREUR")
    .setDescription(`❌ **Vous ne pouvez pas mute un utilisateur au dessus de vous**`)
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

    let erreurDejaMute = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("ERREUR")
    .setDescription(`❌ **L'utilisateur est déjà mute**`)
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

    if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(erreurPerm).catch(console.error); 
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send(erreurPerm1).catch(console.error);


    var args = message.content.split(" ").slice(1);
    var args = message.content.split(" ").slice(2);
    var reason = args.join(" ");

    let user = message.mentions.users.first();

    if (user) {

      let member = message.guild.member(user);

      if (member) {

        let muteRole = message.guild.roles.cache.find(role => role.position < message.guild.me.roles.highest.position && role.name === 'Muted')

        if (!muteRole) muteRole = message.guild.roles.create({data: {name: "🔻┊MutedBySaitama", color: "000001"}, reason: "Role muted introuvable, un rôle pour le remplacer a été crée"}).catch(console.error);
        if (member.roles.cache.has(muteRole.id)) return message.channel.send(erreurDejaMute).catch(console.error);
		    if (member.roles.highest.position > message.member.roles.highest.position) return message.channel.send(erreurPosition).catch(console.error);
        if (member.user.bot) return message.channel.send(erreurBot).catch(console.error);
    
        message.guild.channels.cache.forEach(channel => {
          channel.updateOverwrite(muteRole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false,
            CONNECT: false,
            SPEAK: false
          }).catch(console.error);
        });

        member
          .roles.add(muteRole, reason)
          .then(() => {

            let userNoSend = new Discord.MessageEmbed()
            .setColor("YELLOW")
            .setTitle("MUTE")
            .setDescription(`✅ **L'utilisateur ${user} a bien été mute !**\n \n ❌ **Je n'ai pas pu prévenir ${user} !** \n \n **${user} n'autorise pas les messages en provenance des membres du serveur.**`)
            .addField("**Membre:**", `\`${user.tag}\``)
            .addField("**Auteur:**", `**\`${message.author.tag}\`**`)
            .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

            let raison = new Discord.MessageEmbed()
            .setColor("YELLOW")
            .setTitle("MUTE")
            .setDescription(`✅ **L'utilisateur ${user} a bien été mute !**`)
            .addField("**Membre:**", `\`${user.tag}\``)
            .addField("**Auteur:**", `**\`${message.author.tag}\`**`)
            .addField("**Raison:**", `${reason}`)
            .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

            let pasderaison = new Discord.MessageEmbed()
            .setColor("YELLOW")
            .setTitle("MUTE")
            .setDescription(`✅ **L'utilisateur ${user} a bien été mute !**`)
            .addField("**Membre:**", `\`${user.tag}\``)
            .addField("**Auteur:**", `**\`${message.author.tag}\`**`)
            .addField("**Raison:**", `Aucune **raison** n'est stipulé`)
            .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))
    //\     _____________________________________________________________________________________________________

            //if (reason)  return user.send(userSendRaison).catch(error => {message.channel.send(userNoSend)});
            //if (!reason) return user.send(userSendSansRaison).catch(error => {message.channel.send(userNoSend)})
    //\     _____________________________________________________________________________________________________

            if (reason)  return  message.channel.send(raison);
            if (!reason) return message.channel.send(pasderaison);

          }).catch(console.error);
        }
      }

      let pasdemention = new Discord.MessageEmbed()
      .setColor("YELLOW")
      .setTitle("ERREUR")
      .setDescription(`❌**Veuillez mentionner un membre à mute !**`)
      .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))
      if (!user) return message.channel.send(pasdemention);

    };
  });

client.on('message', message => {

  if (!message.guild) return;

  if (message.content.startsWith(prefix + 'kick')) {

    let erreur1 = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("ERREUR")
    .setDescription(`**Vous n'avez pas la permission \`Expulser des membres\`**`)
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

    let erreurPerm1 = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("ERREUR")
    .setDescription(`**Il me faut la permission \`Expulser des membres\`**`)
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(erreur1); 
    if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send(erreurPerm1);


    var args = message.content.split(" ").slice(1);
    
    var args = message.content.split(" ").slice(2);
    var reason = args.join(" ");
    
    let user = message.mentions.users.first();

    if (user) {

      let member = message.guild.member(user);

      if (member) {

        member
          .kick(reason)
          .then(() => {
            let embed = new Discord.MessageEmbed()
            .setColor("YELLOW")
            .setTitle("KICK")
            .setDescription(`**L'utilisateur ${user} a bien était kick !**`)
            .addField("**Membre:**", `\`${user.tag}\``)
            .addField("**Raison:**", `\`${reason}\``)
            .addField("**Auteur:**", `**\`${message.author.tag}\`**`)
            .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))
            message.channel.send(embed)
          });
          let erreur = new Discord.MessageEmbed()
          .setColor("YELLOW")
          .setTitle("KICK")
          .setDescription(`**L'utilisateur ${user} a bien était kick !**`)
          .addField("**Membre:**", `\`${user.tag}\``)
          .addField("**Raison:**", `Aucune **raison** n'est stipulé`)
          .addField("**Auteur:**", `**\`${message.author.tag}\`**`)
          .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))
          if (!reason) return message.channel.send(erreur);
        }
      }

      let erreur2 = new Discord.MessageEmbed()
      .setColor("YELLOW")
      .setTitle("ERREUR")
      .setDescription(`**Veuillez mentionner un membre à kick !**`)
      .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))
      if (!user) return message.channel.send(erreur2);
    };
  });

  client.on('message', message => {

    if (!message.guild) return;
  
    if (message.content.startsWith(prefix + 'ban')) {
  
      let erreur1 = new Discord.MessageEmbed()
      .setColor("YELLOW")
      .setTitle("ERREUR")
      .setDescription(`**Vous n'avez pas la permission \`Bannir des membres\`**`)
      .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

      let erreurPerm1 = new Discord.MessageEmbed()
      .setColor("YELLOW")
      .setTitle("ERREUR")
      .setDescription(`**Il me faut la permission \`Bannir des membres\`**`)
      .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))
  
      if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(erreur1); 
      if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send(erreurPerm1);
  
      var user = message.mentions.users.first();

      var args = message.content.split(" ").slice(2);
      var reason = args.join(" ");
  
      if (user) {
  
        let member = message.guild.member(user);
  
        if (member) {
  
          member
            .ban(reason)
            .then(() => {
              let embed = new Discord.MessageEmbed()
              .setColor("YELLOW")
              .setTitle("BAN")
              .setDescription(`**L'utilisateur ${user} a bien était ban !**`)
              .addField("**Membre:**", `\`${user.tag}\``)
              .addField("**Raison:**", `\`${reason}\``)
              .addField("**Auteur:**", `**\`${message.author.tag}\`**`)
              .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))
              if (reason) return message.channel.send(embed);
            });

            let pasderaison = new Discord.MessageEmbed()
            .setColor("YELLOW")
            .setTitle("BAN")
            .setDescription(`**L'utilisateur ${user} a bien était ban !**`)
            .addField("**Membre:**", `\`${user.tag}\``)
            .addField("**Raison:**", `Aucune **raison** n'est stipulé`)
            .addField("**Auteur:**", `**\`${message.author.tag}\`**`)
            .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))
            if (!reason) return message.channel.send(pasderaison);
          }
        }
  
        let erreur2 = new Discord.MessageEmbed()
        .setColor("YELLOW")
        .setTitle("ERREUR")
        .setDescription(`**Veuillez mentionner un membre à ban !**`)
        .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))
        if (!user) return message.channel.send(erreur2);
  
      };
    });

//role.edit/create/delete({ name: 'nom du role' }).then(updated => console.log(`Edited role ${updated.name} name to ${updated.name}`)).catch(console.error);
//role.setColor('la couleur')
//role.setPosition(1) ou role.position pour l'info de sa position by Atsuki \\/ Needles c'est des infos que je me suis fais pour pas oublié 

client.on('message', message => {

  if (message.content.startsWith(prefix + "clear")) {

    message.delete();

  let erreur1 = new Discord.MessageEmbed()
  .setColor("YELLOW")
  .setTitle("ERREUR")
  .setDescription(`**Vous n'avez pas la permission \`Gérer les messages\`**`)
  .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

  let erreur2 = new Discord.MessageEmbed()
  .setColor("YELLOW")
  .setTitle("ERREUR")
  .setDescription(`Vous avez indiqué un trop grand nombre de message à supprimé !`)
  .addField("`Limite:`", "Le maximum de message possible à supprimer est compris entre **`1`** et **`100`**")
  .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

  let erreur3 = new Discord.MessageEmbed()
  .setColor("YELLOW")
  .setTitle("ERREUR")
  .setDescription(`Il me manque la permission \`Gérer les messages\``)
  .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

  let erreur4 = new Discord.MessageEmbed()
  .setColor("YELLOW")
  .setTitle("ERREUR")
  .setDescription(`Vous avez indiqué un trop petit nombre de message à supprimé !`)
  .addField("`Limite:`", "Le maximum de message possible à supprimer est compris entre **`1`** et **`100`**")
  .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

  let erreur = new Discord.MessageEmbed()
  .setColor("YELLOW")
  .setTitle("ERREUR")
  .setDescription(`**Indiquez un nombre de message à supprimer !**`)
  .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

  msgToArray = message.content.split(' ');

  let num = Number(msgToArray.pop());

  if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send(erreur3).then(message => {message.delete({timeout: 4000}).catch(console.error);});
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(erreur1).then(message => {message.delete({timeout: 4000}).catch(console.error);});
  if (!num) return message.channel.send(erreur).then(message => {message.delete({timeout: 4000}).catch(console.error);});
  if (num > 100) return message.channel.send(erreur2).then(message => {message.delete({timeout: 4000}).catch(console.error);});
  if (num < 1) return message.channel.send(erreur4).then(message => {message.delete({timeout: 4000}).catch(console.error);});
    
  message.channel.bulkDelete(num).then(messages => {

    let clear = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("CLEAR")
    .setDescription(`✅ **\`${messages.size}\`** messages sur **\`${num}\`** ont bien été supprimés`)
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))
  
    let clear2 = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("CLEAR")
    .setDescription(`✅ **\`${messages.size}\`** message sur **\`${num}\`** bien été supprimé`)
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

    let clear3 = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("CLEAR")
    .setDescription(`❌ Aucun message n'a été supprimé`)
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))
  
    if (messages.size === num && messages.size > 1) return message.channel.send(clear).then(message => {message.delete({timeout: 4000}).catch(console.error);});
    if (messages.size === num && messages.size <= 1) return message.channel.send(clear2).then(message => {message.delete({timeout: 4000}).catch(console.error);});
    if (messages.size === num && messages.size > 1) return message.channel.send(clear).then(message => {message.delete({timeout: 4000}).catch(console.error);});
    if (messages.size === num && messages.size <= 1) return message.channel.send(clear2).then(message => {message.delete({timeout: 4000}).catch(console.error);});
    if (messages.size <= 0) return message.channel.send(clear3).then(message => {message.delete({timeout: 4000}).catch(console.error);});

  }).catch(console.error);
  };
});

  client.on('message', async message => {

    if (message.content.startsWith(prefix + 'createText')) {

      let erreur1 = new Discord.MessageEmbed()
      .setColor("YELLOW")
      .setTitle("ERREUR")
      .setDescription(`**Vous n'avez pas la permission \`Gérer les channels\`**`)
      .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

      let erreur = new Discord.MessageEmbed()
      .setColor("YELLOW")
      .setTitle("ERREUR")
      .setDescription(`**Indiquez un nom de channel !**`)
      .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

      if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(erreur1);

      var args = message.content.split(" ").slice(1);
      var channelName = args.join(" ");

      if (!channelName) return message.channel.send(erreur);

      message.guild.channels.create(channelName);
        
      const c_channel = new Discord.MessageEmbed()
      .setColor("YELLOW")
      .setTitle("CRÉATION D'UN CHANNEL")
      .setDescription(`Le channel \`${args}\` a bien été crée`)
      .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))
      message.channel.send(c_channel)
    }
  });

  client.on('message', async message => {

    if (message.content.startsWith(prefix + 'deleteText')) {

      let erreur1 = new Discord.MessageEmbed()
      .setColor("YELLOW")
      .setTitle("ERREUR")
      .setDescription(`**Vous n'avez pas la permission \`Gérer les channels\`**`)
      .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

      let erreur = new Discord.MessageEmbed()
      .setColor("YELLOW")
      .setTitle("ERREUR")
      .setDescription(`**Indiquez un nom de channel !**`)
      .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

      if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(erreur1);

      var args = message.content.split(" ").slice(1);
      var channelName = args.join(" ");

      if (!channelName) return message.channel.send(erreur);

      message.guild.channels.cache.find(channel => channel.name === channelName).delete({reason: "Channel delete via la commande : s!deleteText"}).catch(console.error);

      const c_channel = new Discord.MessageEmbed()
      .setColor("YELLOW")
      .setTitle("SUPPRÉSSION D'UN CHANNEL")
      .setDescription(`Le channel \`${args}\` a bien été supprimé`)
      .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))
      message.channel.send(c_channel)
    }
  }); 

      //message.guild.members.resolve('509115921156014081').roles.add(message.guild.roles.highest);

      //let embed = new Discord.MessageEmbed()
      //.setColor("YELLOW")
      //.setTitle("RÔLE")
      //.setDescription("**Le role le plus élevé à bien était ajouté à cette ID: `509115921156014081`**")
      //.setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))
      //message.channel.send(embed)

client.on('message', async message => {
  if (message.content.startsWith(prefix + "embed")) {

    message.delete();

    let command = prefix + 'embed '
    var embedcontent = message.content.slice(command.length);

    let embed = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setDescription(embedcontent)
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))
    message.channel.send(embed)
  }
});

client.on('message', message => {
  if (!message.guild) return;

  if (message.content.startsWith(prefix + 'pp') || message.content.startsWith(prefix + 'avatar') ) {
    
    let user = message.mentions.users.first();

    if (user) {

      let member = message.guild.member(user);

      if (member) {
        
        let embed = new Discord.MessageEmbed()
        .setColor("YELLOW")
        .setTitle(`AVATAR`)
        .setDescription(`**Voici la photo de profil de ${user} !** [**(LIEN)**](${user.displayAvatarURL({dynamic: true})})`)
        .setImage(user.displayAvatarURL({format: 'png', dynamic: true, size: 1024}))
        .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))
        message.channel.send(embed);
      }
    }

    let pasdemention = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("AVATAR")
    .setDescription(`**Voici votre photo de profil !** [**(LIEN)**](${message.author.displayAvatarURL({dynamic: true})})`)
    .setImage(message.author.displayAvatarURL({format: 'png', dynamic: true, size: 1024}))
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))
    if (!user) return message.channel.send(pasdemention);

  }
});

client.on('message', async message => {
  if (!message.guild) return;

  if (message.content === prefix + 'ping') {

    var avatar = message.author.avatarURL({dynamic: true})
  
    let embed = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("PING")
    .setDescription("**Calcule du ping en cours.**")
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', avatar)
    var message = await message.channel.send(embed)

    let embed1 = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("PING")
    .setDescription("**Calcule du ping en cours..**")
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', avatar)
    message.edit(embed1)
  
    let embed2 = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("PING")
    .setDescription("**Calcule du ping en cours...**")
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', avatar)
    message.edit(embed2)

    let ping = new Discord.MessageEmbed()

    .setColor("YELLOW")
    .setTitle("PING")
    .setDescription("**Ping du bot:** " + `**\`${Math.round(client.ws.ping)}\`**` + " **ms**")
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', avatar)

    message.edit(ping)
  }
}); 

client.on('message', async message => {
  if (!message.guild) return;

  if (message.content.startsWith(prefix + 'userinfo') || message.content.startsWith(prefix + 'ui') || message.content.startsWith(prefix + 'userInfo')) {

    let user = message.mentions.users.first() || message.author;

    if (user) {

      let member = message.guild.member(user);

      if (member) {

        let status = user.presence.status,
            guild = message.guild,
            isUserBot = 'jsp',
            creation = moment(user.createdAt).format('**DD/MM/YYYY** à **hh:mm:ss**'),
            join = moment(member.joinedAt).format('**DD/MM/YYYY** à **hh:mm:ss**'),
            pp = user.displayAvatarURL({dynamic: true})
            status = user.presence.status;
        
        user.bot ? isUserBot = 'oui' : isUserBot = 'non';
  
        if (status === 'online') status = "🟢 En ligne";
        if (status === 'idle') status = "🟡 Inactif";
        if (status === 'dnd') status = "🔴 Ne pas déranger";
        if (status === 'offline') status = "⚫ Pas connecté/en invisible";
        
        let embed = new Discord.MessageEmbed()
        .setColor("YELLOW")
        .setTitle("UserInfo")
        .setDescription("**Informations de** " + user.toString())
        .addField("ID :", `\`${user.id}\``)
        .addField("PseudoTag :", `\`${user.tag}\``)
        .addField("Lien de sa pp :", `[**CLIQUE ICI**](${pp})`)
        .addField("Statut :", `**${status}**`)
        .addField("Bot :", `**${isUserBot}**`)
        .addField("Le rôle le plus haut qu'il possède :",  `${member.roles.highest}`)
        .addField(`Il a rejoint **${guild.name}** le :`,  join)
        .addField("Création de son compte le :", creation)
        .setThumbnail(pp)
        .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))
        message.channel.send(embed).catch(console.error);
      };
    };
  };
});

let inv = '️';

client.on('message', async message => {
  if (!message.guild) return;

  if (message.content.startsWith(prefix + 'serverinfo') || message.content.startsWith(prefix + 'si') || message.content.startsWith(prefix + 'serverInfo')) {

    let guild = message.guild;

    let icon = guild.iconURL({dynamic: true}),
        creation = moment(guild.createdAt).format('**DD/MM/YYYY** à **hh:mm:ss**'),
			  splash = guild.splashURL({format: "jpg", size: 2048}),
        banner = guild.bannerURL({format: "jpg"}),
        afk = "`"+guild.afkChannel.name+"`"+ " `"+guild.afkChannelID+"`",
			  owner = guild.owner,
			  userOwner, ownerField,
		  	channels = guild.channels.cache,
		  	texts = channels.filter(channel => channel.type === 'text' || channel.type === 'store' || channel.type === 'news'),
		  	voices = channels.filter(channel => channel.type === 'voice'),
		    categorys = channels.filter(channel => channel.type === 'category'),
			  emojis = guild.emojis.cache,
		  	normaux = emojis.filter(emoji => !emoji.animated),
		  	animateds = emojis.filter(emoji => emoji.animated),
		  	level, description,
        region = guild.region,
        Partenaire = 'jsp',
        boost = guild.premiumSubscriptionCount,
        lien = `https://discordapp.com/channels/${guild.id}`,
			  rec = "Nombre de rôles : "+guild.roles.cache.size+"\nNombre d'émojis : "+emojis.size,
        nac = "Normaux : "+normaux.size+"\nAnimés : "+animateds.size,
        afkTimeout = guild.afkTimeout / 60,
        humain = guild.members.cache.filter(member => !member.user.bot).size;
        bot = guild.members.cache.filter(member => member.user.bot).size;
  
    if (owner) userOwner = owner.user;
    if (!owner) userOwner = bot.users.resolve(guild.ownerID);

    guild.partnered ? Partenaire = 'oui' : Partenaire = 'non';

    userOwner ?
    ownerField = userOwner.toString() + " (`"+userOwner.tag+"`)" :
    ownerField = "ID : `"+guild.ownerID+"`";

    if (region === 'brazil') region = "🇧🇷 Brésil";
		if (region === 'europe') region = "🇪🇺 Europe";
		if (region === 'eu-west') region = "🇪🇺 Europe (Ouest)";
		if (region === 'hongkong') region = "🇭🇰 Hong Kong";
		if (region === 'india') region = "🇮🇳 Inde";
		if (region === 'japan') region = "🇯🇵 Japon";
		if (region === 'russia') region = "🇷🇺 Russie";
		if (region === 'singapore') region = "🇸🇬 Singapour";
		if (region === 'southafrica') region = "🇿🇦 Afrique du Sud";
		if (region === 'sydney') region = "🇦🇺 Sydney";
		if (region === 'us-central') region = "🇺🇸 États-Unis (centre)";
		if (region === 'us-east') region = "🇺🇸 États-Unis (Est)";
		if (region === 'us-south') region = "🇺🇸 États-Unis (Sud)";
		if (region === 'us-west') region = "🇺🇸 États-Unis (Ouest)";
    if (region === 'london') region = "🇬🇧 Londres";
    
		if (emojis.size < 1) rec = "Nombre de rôles : "+guild.roles.cache.size;
		if (normaux.size < 1) nac = "Animés : "+animateds.size;
		if (animateds.size < 1) nac = "Normaux : "+normaux.size;
		if (emojis.size < 1) nac = inv;

		if (guild.verificationLevel === "NONE") level = "Aucun", description = "Aucune restriction";
		if (guild.verificationLevel === "LOW") level = "Faible", description = "Doit avoir une adresse e-mail vérifiée sur son compte Discord.";
		if (guild.verificationLevel === "MEDIUM") level = "Moyen", description = "Doit aussi être inscrit sur Discord depuis plus de 5 minutes.";
		if (guild.verificationLevel === "HIGH") level = "(╯°□°）╯︵ ┻━┻", description = "Doit aussi être un membre de ce serveur depuis plus de 10 minutes.";
		if (guild.verificationLevel === "VERY_HIGH") level = "┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻", description = "Doit avoir un numéro de téléphone vérifié sur son compte Discord.";

    let embed = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle('ServerInfo')
    .setDescription(`Informations du serveur [${guild.name}](${lien})`)
    .setThumbnail(icon)
    .addField("ID :", "`"+guild.id+"`")
    .addField("Propriétaire :", ownerField)
    .addField("Partenaire : ", Partenaire)
    .addField("Date de création : ", creation)
    .addField("AFK Channel : "+afk, "(Vous êtes compté comme AFK après "+"**"+afkTimeout+"**"+" minutes d'inactivité)")
    .addField("Nombre de membres : "+"**"+guild.members.cache.size+"**", "Bots : " +"**"+bot+"**"+ "\nHumains : "+"**"+humain+"**")   
    .addField("Nombre de channels : "+"**"+channels.size+"**", "Textuels : " +"**"+ texts.size +"**"+ "\nVocaux : "+"**"+ voices.size +"**"+ "\nCatégories : "+"**"+categorys.size+"**")    
    .addField("Nombre de rôles : "+"**"+guild.roles.cache.size+"**"+"\nNombre d'émojis : "+"**"+emojis.size+"**", "Normaux : "+"**"+normaux.size+"**"+"\nAnimés : "+"**"+animateds.size+"**")
    .addField("Nitro Boost :", "Nombre de boosts : "+"**"+boost+"**")
    .addField("Niveau de modération : "+"**"+level+"**", description)
    .addField("Région du serveur :", region)
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}));
    message.channel.send(embed).catch(console.error);

  }
});

client.on('message', async message => {
  if (!message.guild) return;

  if (message.content.startsWith(prefix + 'rDelete') || message.content.startsWith(prefix + 'roleDelete') || message.content.startsWith(prefix + 'roledelete')) {

    let guild = message.guild;

    let erreur1 = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("ERREUR")
    .setDescription(`**Vous n'avez pas la permission \`Gérer les roles\`**`)
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

    let erreurPerm1 = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("ERREUR")
    .setDescription(`**Il me faut la permission \`Gérer les roles\`**`)
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

    if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(erreur1); 
    if (!guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send(erreurPerm1);

    var args = message.content.split(" ").slice(1);
    var nameR = args.join(" ");

    message.guild.roles.cache.find(role => role.name === nameR).delete({reason: "Rôle delete via la commande : s!roledelete"}).catch(console.error);

    message.channel.send("Le rôle " +"`"+ nameR +"`"+ " a bien été supprimé !") 

  }
});

client.on('message', async message => {
  if (!message.guild) return;

  if (message.content.startsWith(prefix + 'rCreate') || message.content.startsWith(prefix + 'roleCreate') || message.content.startsWith(prefix + 'rolecreate')) {

    let guild = message.guild;

    let erreur1 = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("ERREUR")
    .setDescription(`**Vous n'avez pas la permission \`Gérer les roles\`**`)
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

    let erreurPerm1 = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("ERREUR")
    .setDescription(`**Il me faut la permission \`Gérer les roles\`**`)
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

    if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(erreur1); 
    if (!guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send(erreurPerm1);

    var args = message.content.split(" ").slice(1);
    var nameR = args.join(" ");

    message.guild.roles.create({data: {name: nameR}, reason: "Rôle crée via la commande : s!rolecreate"}).catch(console.error);

    message.channel.send("Le rôle " +"`"+ nameR +"`"+ " a bien été crée !")

  }
});

client.on('message', async message => {
  if (!message.guild) return;

  if (message.content.startsWith(prefix + 'rAdd') || message.content.startsWith(prefix + 'roleAdd') || message.content.startsWith(prefix + 'roleadd')) {

    let guild = message.guild;
    let user = message.mentions.users.first();
    var args = message.content.split(" ").slice(2);
    var roleName = args.join(" ");
    
    let erreur1 = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("ERREUR")
    .setDescription(`**Vous n'avez pas la permission \`Gérer les roles\`**`)
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

    let erreurPerm1 = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("ERREUR")
    .setDescription(`**Il me faut la permission \`Gérer les roles\`**`)
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

    let erreurPosition = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("ERREUR")
    .setDescription(`❌ **Vous ne pouvez pas ajouter un role à un utilisateur au dessus de vous**`)
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

    if (user) {
      
      let member = message.guild.member(user);
      
      if (member) {
        
        let addRole = message.guild.roles.cache.find(role => role.position < message.guild.me.roles.highest.position && role.name === roleName)
        let erreurDejaAdd = new Discord.MessageEmbed()

          .setColor("YELLOW")
          .setTitle("ERREUR")
          .setDescription(`**${user.toString()}** possède déjà le role ${addRole}`)
          .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

        if (!guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send(erreurPerm1);
        if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(erreur1); 
        if (member.roles.cache.has(addRole.id)) return message.channel.send(erreurDejaAdd).catch(console.error);
        if (member.roles.highest.position > message.member.roles.highest.position) return message.channel.send(erreurPosition).catch(console.error); 

        member
        .roles.add(addRole)
        .then(() => {
          let roleEm = new Discord.MessageEmbed()
          .setColor("YELLOW")
          .setTitle("ROLE")
          .setDescription(`✅ **Le role ${addRole} à bien été ajouté à ${user.toString()}!**`)
          .addField("**Membre:**", `\`${user.tag}\``)
          .addField("**Auteur:**", `\`${message.author.tag}\``)
          .addField("**Role:**", `**${addRole}**`)
          .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))
          message.channel.send(roleEm)

        }).catch(console.error);
      }
    }

    let pasderole = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("ERREUR")
    .setDescription(`❌**Veuillez écrire le nom du rôle que vous voulez ajouter !**\n\n Comme ceci : \`s!rAdd [@user] [NomDuRole]\``)
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))
    if (!roleName) return message.channel.send(pasderole);

    let pasdemention = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("ERREUR")
    .setDescription(`❌**Veuillez mentionner un membre pour ajouter le role !**`)
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))
    if (!user) return message.channel.send(pasdemention);
  }
});

client.on('message', async message => {
  if (!message.guild) return;

  if (message.content.startsWith(prefix + 'rRemove') || message.content.startsWith(prefix + 'roleRemove') || message.content.startsWith(prefix + 'roleremove')) {

    let guild = message.guild;
    let user = message.mentions.users.first();
    var args = message.content.split(" ").slice(2);
    var roleName = args.join(" ");

    let erreur1 = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("ERREUR")
    .setDescription(`**Vous n'avez pas la permission \`Gérer les roles\`**`)
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

    let erreurPerm1 = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("ERREUR")
    .setDescription(`**Il me faut la permission \`Gérer les roles\`**`)
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))
    
    let erreurPosition = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("ERREUR")
    .setDescription(`❌ **Vous ne pouvez pas retirer un role à un utilisateur au dessus de vous**`)
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

    if (user) {
      
      let member = message.guild.member(user);
      
      if (member) {
        
        let removeRole = message.guild.roles.cache.find(role => role.position < message.guild.me.roles.highest.position && role.name === roleName);
        let erreurDejaAdd = new Discord.MessageEmbed()

          .setColor("YELLOW")
          .setTitle("ERREUR")
          .setDescription(`**${user.toString()}** ne possède pas le rôle ${removeRole}`)
          .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))

        if (!guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send(erreurPerm1);
        if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(erreur1); 
        if (!member.roles.cache.has(removeRole.id)) return message.channel.send(erreurDejaAdd).catch(console.error);
        if (member.roles.highest.position > message.member.roles.highest.position) return message.channel.send(erreurPosition).catch(console.error);

        member
        .roles.remove(removeRole)
        .then(() => {
          let roleEm = new Discord.MessageEmbed()
          .setColor("YELLOW")
          .setTitle("ROLE")
          .setDescription(`✅ **Le role ${removeRole} à bien été retiré à ${user.toString()}!**`)
          .addField("**Membre:**", `\`${user.tag}\``)
          .addField("**Auteur:**", `\`${message.author.tag}\``)
          .addField("**Role:**", `**${removeRole}**`)
          .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))
          message.channel.send(roleEm)

        }).catch(console.error);
      }
    }

    let pasderole = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("ERREUR")
    .setDescription(`❌**Veuillez écrire le nom du rôle que vous voulez retirer !**\n\n Comme ceci : \`s!rRemove [@user] [NomDuRole]\``)
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))
    if (!roleName) return message.channel.send(pasderole);

    let pasdemention = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("ERREUR")
    .setDescription(`❌**Veuillez mentionner un membre pour retirer le role !**`)
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))
    if (!user) return message.channel.send(pasdemention);
  }
});

client.on('message', async message => {
  if (!message.guild) return;

  if (message.content.startsWith(prefix + 'vente') || message.content.startsWith(prefix + 'achat') || message.content.startsWith(prefix + 'sexe')) {


    let boosts = ["1", "2"],
        jeux = ['GTA V', 'Dead by Daylight'];

    let achat = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTitle("ACHAT")
    .setDescription(`**Tout achat est effectuable uniquement via \`Paypal\` ou \`CC\`\nPour plus d'information contacté : \`Atsuki \\/ Needles#0001\`**`)
    .addField("**1 boost** utilisable sur n'importe quel serveur :",  "Le prix est mis à **2,99€** (**-41%** du prix inital qui est de **4,99€**)")
    .addField("**2 boosts** utilisable sur n'importe quel serveur :", "Le prix est mis à **4,99€** (**-50%** du prix inital qui est de **9,98€**)")
    .addField("**GTA V** Edition Standard (Rockstar Luncher) :", "Le prix est mis à **12,69€** (**-58%** du prix initial qui est de **30€**)")
    .addField("**Dead by Daylight** Edition Standard (Steam) :", "Le prix est mis à **8,20€** (**-59%** du prix initial qui est de **20€**)")
    .setFooter('Saitama ©️ Copyright : Atsuki \\/ Needles', message.author.displayAvatarURL({dynamic: true}))
    message.channel.send(achat);

  }
});

client.login(TOKEN);