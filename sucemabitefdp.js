const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const translate = require('google-translate-open-api').default;
const si = require('systeminformation');

const auth = require('./auth.json');

const bot = new Discord.Client({
	fetchAllMembers: true,
	disableEveryone: true,
	partials: ['REACTION']
});

let prefix = "a!",
	codeOrBeta = "code",
	version = "1.0.1",
	inv = '️',
	enDev = '🔧 En dev...',
	moloId = '553543583710445568',
	servId = '706832516975427585',
	contributorRoleId = '708830891799085098',
	supportInvite = 'https://discord.gg/hNjpb86',
	whitelist = ['513050669754744841', '560884158742790144', '553543583710445568', '573949473806614548', '639889624637898760'],
	link = `https://discordapp.com/oauth2/authorize?client_id=706818598538182736&scope=bot&permissions=8`,
	invites = `[Serveur support](${supportInvite})\n[Lien d'invitation du bot](${link})`,
	token;

if (codeOrBeta === 'beta') token = auth.tokenbeta;
if (codeOrBeta === 'code') token = auth.tokenoff;

bot.login(token).catch(console.error);bot.on('warn', info => {console.log(`Warn : ${info}`);});bot.on('error', error => {console.log(`Erreur de connection : ${error.message}`);});bot.on('disconnect', closeEvent => {console.log(`Bot déconnecté, code d'erreur : ${closeEvent.code}`);});bot.on('reconnecting', () => {console.log(`Reconnexion en cours...`);});


String.prototype.substring2 = function (indice1, indice2) {
  if (typeof indice1 !== 'number' && isNaN(Number(indice1))) return this;
  if (typeof indice1 === 'string') indice1 = Number(indice1);
  if (indice1 && indice2) {
    if (typeof indice2 === 'string') indice2 = Number(indice2);
    if (typeof indice2 !== 'number' && isNaN(Number(indice2))) return this;
    return this.substring(this.length-indice2, this.length-indice1);
  } else if (indice1 && !indice2) {
    return this.substring(0, this.length-indice1);
  } else {
    return this;
  }
}

String.prototype.subOneWord = function () {
  let darkstring = this.toString();
  
  let index1 = darkstring.indexOf(' '),
    index2 = darkstring.indexOf('\n');
  
  if (index1 === -1) index1 = null;
  if (index2 === -1) index2 = null;
  
  if (index1 < index2 || (index1 && !index2)) {
    let part2 = darkstring.substring(index1).trim();
    
    return part2;
  } else if (index2 < index1 || (index2 && !index1)) {
    let part2 = darkstring.substring(index2).trim();
    
    return part2;
  } else return "";
}

String.prototype.subword = function (nombreDeMots) {
  if (typeof nombreDeMots === "number") {
    
    let newstring = this.toString();
    for (let i = 0; i < nombreDeMots; i++) {
      newstring = newstring.subOneWord();
    }
    
    return newstring;
  }
}

Date.prototype.getMillisecondsDifference = function (date2) {
  let date1 = this;
  
  let time1 = date1.getTime(),
      time2 = date2.getTime();
    
  let diffMillis;
  
  if (time1 > time2) diffMillis = time1-time2;
  if (time1 < time2) diffMillis = time2-time1;
  if (time1 === time2) diffMillis = 0;
  
  return diffMillis;
};


bot.on('ready', () => {
	console.log("bot allumé");
	
	let help = prefix+"help",
		guilds = bot.guilds.cache;
	
 	num = 1;
	let multiPresence = setInterval(function() {
		if (num === 1) {
			bot.user.setPresence({
				status: 'online',
				activity: {
					name: `${prefix}help pour la page d'aide`,
					type: "PLAYING"
				}
			}).catch(console.error);
			num = 2;
		} else if (num === 2) {
			bot.user.setPresence({
				status: 'idle',
				activity: {
					name: `version ${version}`,
					type: "LISTENING"
				}
			}).catch(console.error);
			num = 3;
		} else if (num === 3) {
			bot.user.setPresence({
				status: 'dnd',
				activity: {
					name: `${guilds.size} serveur${guilds.size > 1 ? "s" : inv}`,
					type: "WATCHING"
				}
			}).catch(console.error);
			num = 1;
		}
	}, 20 * 1000);
});


bot.on('guildCreate', guild => {
	if (!guild.me.hasPermission(["VIEW_CHANNEL", "SEND_MESSAGES"])) return guild.leave().catch(console.error);
});


bot.on('message', async message => {
	if (!message.content.startsWith(prefix)) return;
	
	if (message.author.bot || !message.guild) return;
	
	let molo = bot.users.resolve(moloId),
		serv = bot.guilds.resolve(servId),
		msg = message.content.toLowerCase(),
		msgToArray = msg.split(' ');
	
	let fuckEmbed = new Discord.MessageEmbed()
		.setColor("RED")
		.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
		.setTitle("**Erreur**")
		.setDescription("Je n'ai pas la permission `Envoyer des messages`")
		.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
	
	if (!message.guild.me.hasPermission("SEND_MESSAGES")) return message.author.send(fuckEmbed).catch(console.error);
	if (!message.guild.me.hasPermission("EMBED_LINKS")) return message.channel.send("❌ Il me faut la permission `Intégrer des liens` pour pouvoir envoyer de beaux messages")
	
	let errorEmbed = new Discord.MessageEmbed()
		.setColor("RED")
		.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
		.setTitle("**Erreur**")
		.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
	
	/*
	
	if (!message.guild.me.hasPermission("___________________")) errorEmbed.setDescription("`___________________`");
	
	*/
	
	/* AIDE */
	
	let help = prefix+'help ';
	
	if (msg === prefix+'help') {
		let helpEmbed = new Discord.MessageEmbed()
			.setColor(8129291)
			.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
			.setTitle("**Page d'aide des commandes d'aide**")
			.addField('`'+prefix+'help`', "Affiche cette page")
			.addField('`'+prefix+'help util`', "Affiche la page des commandes utiles")
			.addField('`'+prefix+'help fun`', "Affiche la page des commandes funs")
			.addField('`'+prefix+'help info`', "Affiche la page des commandes d'information")
			.addField('`'+prefix+'help mod`', "Affiche la page des commandes de modération")
			.addField('`'+prefix+'help music`', "Affiche la page des commandes de musique");
			if (whitelist.includes(message.author.id) || message.author.id === moloId) helpEmbed.addField('`'+prefix+'help admin`', "Affiche la page des commandes d'administration");
			helpEmbed
			.addField(inv, invites)
			.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
		
		message.channel.send(helpEmbed).catch(console.error);
	}
	
	if (msg.startsWith(help)) {
		let arg = msg.subword(1);
		
		let util = 'util';
		
		if (arg === util) {
			let helpUtil = new Discord.MessageEmbed()
				.setColor(8129291)
				.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
				.setTitle("**Page d'aide des commandes utiles**")
				.addField('`'+prefix+'ping`', "Calcule le ping du bot")
				.addField('`'+prefix+'changelog`', "Affiche ce qui a été modifié/ajouté/retiré de la version actuelle")
				.addField('`'+prefix+'credits`', "Permet de connaitre les gens qui m'ont aidé à faire le bot")
				.addField('`'+prefix+'invite`', "Pour obtenir le serveur support et le lien d'invite du bot")
				.addField('`'+prefix+'trad [lang1] [lang2] [text]`', "Permet de traduire un texte")
				.addField('`'+prefix+'emoji [info/add/remove] [:emoji:/id/nom] (:emoji:/id/lien)`', "Permet d'obtenir des informations sur un émoji ou d'en ajouter/retirer un au serv")
				.addField(inv, invites)
				.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
			
			message.channel.send(helpUtil).catch(console.error);
		}
		
		let fun1 = 'fun';
		
		if (arg === fun1) {
			let helpFun = new Discord.MessageEmbed()
				.setColor(8129291)
				.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
				.setTitle("**Page d'aide des commandes funs**")
				.addField('`'+prefix+'say (@user | id) [text]`', "Créé un webhook et le fait parler")
				.addField('`'+prefix+'invisible`', "Envoie un message totalement invisible")
				.addField('`'+prefix+'bestServ`', "Permet de connaitre le serveur avec le plus de membres où le bot est")
				.addField(inv, invites)
				.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
			
			message.channel.send(helpFun).catch(console.error);
		}
		
		let info = 'info';
		
		if (arg === info) {
			let helpInfo = new Discord.MessageEmbed()
				.setColor(8129291)
				.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
				.setTitle("**Page d'aide des commandes d'information**")
				.addField('`'+prefix+'info`', "Donne des informations sur le bot")
				.addField('`'+prefix+'emoteInfo [:emoji: | id]`', "Donne des informations sur un émoji personalisé")
				.addField('`'+prefix+'serverInfo (id)`', "Donne des informations sur un serveur")
				.addField('`'+prefix+'userInfo (@user | id)`', "Donne des informations sur un utilisateur")
				.addField(inv, invites)
				.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
			
			message.channel.send(helpInfo).catch(console.error);
		}
		
		let mod = 'mod';
		
		if (arg === mod) {
			let helpMod = new Discord.MessageEmbed()
				.setColor(8129291)
				.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
				.setTitle("**Page d'aide des commandes de modération**")
				.addField('`'+prefix+'mute [@user | id] (raison)`', "Permet de mute un membre")
				.addField('`'+prefix+'unmute [@user | id] (raison)`', "Permet d'unmute un membre")
				.addField('`'+prefix+'kick [@user | id] (raison)`', "Permet de kick un membre")
				.addField('`'+prefix+'ban [@user | id] (raison)`', "Permet de ban un membre")
				.addField('`'+prefix+'clear [nombre]`', "Permet de clear un certain nombre de messages")
				.addField(inv, invites)
				.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
				
			
			message.channel.send(helpMod).catch(console.error);
		}
		
		let music1 = 'music',
			music2 = 'musique';
		
		if (arg === music1 || arg === music2) {
			let helpUtil = new Discord.MessageEmbed()
				.setColor(8129291)
				.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
				.setTitle("**Page d'aide des commandes de musique**")
				.addField('`'+prefix+'join`', "Permet de faire rejoindre le channel où l'utilisateur se trouve")
				.addField('`'+prefix+'leave`', "Permet de faire quitter le channel où se trouve le bot")
				.addField('`'+prefix+'play`', "Permet de faire jouer de la musique au bot (actuellement disponible seulement avec youtube)")
				.addField('`'+prefix+'pause`', "Permet de mettre pause ou de l'enlever")
				.addField('`'+prefix+'stop`', "Stoppe conplètement la musique en cours")
				.addField(inv, invites)
				.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
			
			message.channel.send(helpUtil).catch(console.error);
		}
	}
	
	/* UTILE */
	
	if (msg === prefix+'ping') {
		let start1 = Date.now();
		let ping1 = new Discord.MessageEmbed()
			.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
			.setTitle('Ping')
			.setDescription("Calcul du ping en cours")
			.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
		
		message.channel.send(ping1).then(msg1 => {
			let start2 = Date.now(),
				edit1 = Date.now() - start1;
			let ping2 = new Discord.MessageEmbed()
				.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
				.setTitle('Ping')
				.setDescription("Calcul du ping en cours.")
				.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
			
			msg1.edit(ping2).then(msg2 => {
				let start3 = Date.now(),
					edit2 = Date.now() - start2;
				let ping3 = new Discord.MessageEmbed()
					.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
					.setTitle('Ping')
					.setDescription("Calcul du ping en cours..")
					.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
				
				msg2.edit(ping3).then(msg3 => {
					let start4 = Date.now(),
						edit3 = Date.now() - start3;
					let ping4 = new Discord.MessageEmbed()
						.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
						.setTitle('Ping')
						.setDescription("Calcul du ping en cours...")
						.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
					
					msg3.edit(ping4).then(msg4 => {
						let edit4 = Date.now() - start4,
							moyenne = Math.floor( (edit1+edit2+edit3+edit4) / 4 ),
							pingDuBot = Math.floor(bot.ws.ping);
						let ping = new Discord.MessageEmbed()
							.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
							.setTitle('Ping')
							.setDescription("Ping du bot : **"+pingDuBot+" Ms**\nTemps moyen écoulé entre chaque edit : **"+moyenne+" Ms**")
							.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
						
						msg4.edit(ping).catch(console.error);
					}).catch(console.error);
				}).catch(console.error);
			}).catch(console.error);
		}).catch(console.error);
	}
	
	if (msg === prefix+'changelog') {
		let changelog = new Discord.MessageEmbed()
			.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
			.setTitle("**Modification de la version 1.0.1**")
			.addField("**Correction de bugs**", "Dont : la commande `"+prefix+"bestserv` que j'avais enlevé sans faire exprès et la commande `"+prefix+"credits` qui ne marchait pas s'il n'y avait pas de contributeur")
			.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
		
		message.channel.send(changelog).catch(console.error);
	}
	
	if (msg === prefix+'credits' || msg === prefix+'credit') {
		bot.fetchApplication().then(application => {
			let creator = application.owner,
				contributors = serv.members.cache.filter(member => member.roles.cache.has(contributorRoleId)),
				contributorsLine = contributors.map(contributor => contributor.toString()+' (`'+contributor.user.tag+'` `'+contributor.id+'`)').join('\n');
			
			if (contributors.size < 1) contributorsLine = "Aucun";
			
			let credits = new Discord.MessageEmbed()
				.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
				.setTitle("Credits")
				.setDescription("Voici la liste des personnes qui m'ont aidé à faire d'Akira ce qu'il est aujourd'hui, et je tiens à tous les remercier :")
				.addField("Créateur :", creator.toString()+' (`'+creator.tag+'` `'+creator.id+'`)')
				.addField("Développeur :", molo.toString()+' (`'+molo.tag+'` `'+molo.id+'`)')
				.addField(`Contributeur${contributors.size > 1 ? "s" : inv} :`, contributorsLine)
				.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
			
			message.channel.send(credits).catch(console.error);
		}).catch(console.error);
	}
	
	if (msg === prefix+'invite' || msg === prefix+'support') {
		let invite = new Discord.MessageEmbed()
			.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
			.setTitle("Invite")
			.setDescription("Serveur support : "+supportInvite+"\nLien pour ajouter le bot : https://bit.ly/akiraoff")
			.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
		
		message.channel.send(invite).catch(console.error);
	}
	
	let trad = prefix+"trad";
	
	if (msg.startsWith(trad)) {
		let args = message.content.subword(1),
			index1 = args.indexOf(' '),
			lang1a = args.substring(0, index1),
			lang1b = lang1a,
			index2 = args.indexOf(' ', index1+1),
			lang2a = args.substring(index1+1, index2),
			lang2b = lang2a,
			txt = args.subword(2),
			txt2 = txt;
		
		let gayEmbed = new Discord.MessageEmbed()
			.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
			.setTitle("**Trad**")
			.setDescription("❌ Merci d'écrire la commande de cette façon : `"+prefix+"trad [lang1] [lang2] [text]` (exemple : `"+prefix+"trad fr en Salut !`)")
			.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
		
		if (!lang1a || !lang2a || !txt) return message.channel.send(gayEmbed).catch(console.error);
		
		let langs = {
			"Automatic": "auto",
			"English": "en",
			"French": "fr",
			"Japanese": "ja",
			"Arabic": "ar",
			
			"Automatique": "auto",
			"Anglais": "en",
			"Français": "fr",
			"Japonais": "ja",
			"Arabe": "ar",
		},
			keys = Object.keys(langs);
		
		if (keys.includes(lang1a)) lang1b = langs[lang1a];
		if (keys.includes(lang2a)) lang2b = langs[lang2a];
		
		txt2 = txt.replace(/needles/gi, "gay").replace(/kururo/gi, "python is bad");
		
		translate(txt2, {
			from: lang1b,
			to: lang2b,
		}).then(result => {
			let tradedText = result.data;
			
			if (!tradedText || tradedText.length < 1) tradedText = "Une erreur est survenue, merci de prévenir "+molo.tag;
			tradedText = tradedText.replace(/needles/gi, "gay").replace(/kururo/gi, "python is bad");
			
			let tradedEmbed = new Discord.MessageEmbed()
				.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
				.setTitle("**Trad**")
				.setDescription("✅ Votre texte a correctement été traduit de `"+lang1a+"` à `"+lang2a+"`")
				.addField("Texte original :", "```"+txt+"```")
				.addField("Texte traduit :", "```"+tradedText+"```")
				.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
			
			message.channel.send(tradedEmbed).catch(console.error);
			
		}).catch(error => {
			let erroredEmbed = new Discord.MessageEmbed()
				.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
				.setTitle("**Trad**")
				.setDescription("❌ Je n'ai pas pu traduire votre texte```"+error+"```")
				.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
			
			message.channel.send(erroredEmbed).catch(console.error);
		});
	}
	
	let emoji1 = prefix+'emoji ',
		emoji2 = prefix+'emote ';
	
	if (msg.startsWith(emoji1) || msg.startsWith(emoji2)) {
		let args = message.content.subword(1);
		
		if (args.startsWith("info") || args.startsWith("infos") || args.startsWith("i")) {
			let arg = args.subword(1);
			
			let errorNoArg = new Discord.MessageEmbed()
				.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
				.setTitle('Emoji info')
				.setDescription("❌ Il faut mentionner/indiquer l'ID de l'émoji")
				.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
			
			if (!arg) return message.channel.send(errorNoArg).catch(console.error);
			
			let arg2 = arg,
				s = '<',
				s2 = '<:',
				e = '>';
			if ( (arg.startsWith(s) && !arg.startsWith(s2)) && arg.endsWith(e) ) arg2 = arg.substring(s.length, arg.length-e.length);
			if ( (arg.startsWith(s) && arg.startsWith(s2)) && arg.endsWith(e) ) arg2 = arg.substring(s2.length, arg.length-e.length);
			
			let emote = bot.emojis.resolve(arg) || bot.emojis.cache.find(emoji => emoji.identifier === arg2);
			
			let errorNoEmote = new Discord.MessageEmbed()
				.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
				.setTitle('Emoji info')
				.setDescription("❌ Je n'ai pas trouvé d'émoji avec comme ID/mention `"+arg+"`")
				.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
			
			if (!arg) return message.channel.send(errorNoArg).catch(console.error);
			if (!emote) return message.channel.send(errorNoEmote).catch(console.error);
			
			let creation = emote.createdAt,
				guild = emote.guild,
				animated;
			emote.animated ? animated = 'Oui' : animated = 'Non';
			
			let jour=creation.getDate();jour<10&&(jour="0"+jour);let jour2=creation.getDate();1===jour2&&(jour2="1er");let mois=1+creation.getMonth();mois<10&&(mois="0"+mois);let mois2="?";"01"!==mois&&1!==mois||(mois2="Janvier"),"02"!==mois&&2!==mois||(mois2="Février"),"03"!==mois&&3!==mois||(mois2="Mars"),"04"!==mois&&4!==mois||(mois2="Avril"),"05"!==mois&&5!==mois||(mois2="Mai"),"06"!==mois&&6!==mois||(mois2="Juin"),
			"07"!==mois&&7!==mois||(mois2="Juillet"),"08"!==mois&&8!==mois||(mois2="Août"),"09"!==mois&&9!==mois||(mois2="Septembre"),"10"!==mois&&10!==mois||(mois2="Octobre"),"11"!==mois&&11!==mois||(mois2="Novembre"),"12"!==mois&&12!==mois||(mois2="Décembre");let année2=creation.getFullYear(),année=année2.toString().substring(2),heure=creation.getHours();heure<10&&(heure="0"+heure);let min=creation.getMinutes();
			min<10&&(min="0"+min);let x1,x2,x3,x4,now=new Date,agoMilliseconds=now.getMillisecondsDifference(creation),agoSeconds=agoMilliseconds/1e3,truncSeconds=Math.trunc(agoSeconds),testMilliseconds=agoSeconds-truncSeconds,testMilliseconds2=1e3*testMilliseconds,milliseconds=Math.round(testMilliseconds2),abc=truncSeconds+" seconde"+(x1=truncSeconds>1?"s":inv),agoMinutes=truncSeconds/60,truncMinutes=Math.trunc(agoMinutes),
			testSeconds=agoMinutes-truncMinutes,testSeconds2=60*testSeconds,seconds=Math.round(testSeconds2);abc=truncMinutes+" minute"+(x2=truncMinutes>1?"s":inv)+" et "+seconds+" seconde"+(x1=seconds>1?"s":inv);let agoHours=truncMinutes/60,truncHours=Math.trunc(agoHours),testMinutes=agoHours-truncHours,testMinutes2=60*testMinutes,minutes=Math.round(testMinutes2);
			abc=truncHours+" heure"+(x3=truncHours>1?"s":inv)+", "+minutes+" minute"+(x2=minutes>1?"s":inv)+" et "+seconds+" seconde"+x1;let agoDays=truncHours/24,truncDays=Math.trunc(agoDays),testHours=agoDays-truncDays,testHours2=24*testHours,hours=Math.round(testHours2);abc=truncDays+" jour"+(x4=truncDays>1?"s":inv)+", "+hours+" heure"+(x3=hours>1?"s":inv)+", "+minutes+" minute"+x2+" et "+seconds+" seconde"+x1;
			let agoMonths=truncDays/30.4167,truncMonths=Math.trunc(agoMonths),testDays=agoMonths-truncMonths,testDays2=30.4167*testDays,days=Math.round(testDays2);abc=truncMonths+" mois, "+days+" jour"+(x4=days>1?"s":inv)+", "+hours+" heure"+x3+", "+minutes+" minute"+x2+" et "+seconds+" seconde"+x1,truncMonths<=0&&(abc=days+" jour"+x4+", "+hours+" heure"+x3+", "+minutes+" minute"+x2+" et "+seconds+" seconde"+x1),
			truncMonths<=0&&days<=0&&(abc=hours+" heure"+x3+", "+minutes+" minute"+x2+" et "+seconds+" seconde"+x1),truncMonths<=0&&days<=0&&hours<=0&&(abc=minutes+" minute"+x2+" et "+seconds+" seconde"+x1),truncMonths<=0&&days<=0&&hours<=0&&minutes<=0&&(abc=seconds+" seconde"+x1);
			let wsh=`${jour}/${mois}/${année} | Le ${jour2} ${mois2} ${année2} à ${heure}h${min}\nIl y a ${abc}.`;
			
			if (guild.me.hasPermission("MANAGE_EMOJIS")) {
				emote.fetchAuthor().then(author => {
					let infoEmbed = new Discord.MessageEmbed()
						.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
						.setTitle('Emoji info')
						.setDescription("Informations de l'émoji "+emote.toString())
						.setThumbnail(emote.url)
						.addField("Nom :", "`"+emote.name+"`")
						.addField("ID :", "`"+emote.id+"`")
						.addField("Mention (bot) :", "`<"+emote.identifier+">`")
						.addField("Mention (utilisateur) :", "`:"+emote.name+":`")
						.addField("Animé :", animated)
						.addField("Lien de l'image :", `[Clique ici](${emote.url})`)
						.addField("Date d'ajout :", wsh)
						.addField("Ajouté par :", author.toString()+" (`"+author.tag+"` `"+author.id+"`)")
						.addField("Sur le serveur :", guild.name+" (`"+guild.id+"`)")
						.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
					
					message.channel.send(infoEmbed).catch(console.error);
				}).catch(console.error);
			} else {
				let infoEmbed = new Discord.MessageEmbed()
					.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
					.setTitle('Emoji info')
					.setDescription("Informations de l'émoji "+emote.toString())
					.setThumbnail(emote.url)
					.addField("Nom :", "`"+emote.name+"`")
					.addField("ID :", "`"+emote.id+"`")
					.addField("Mention (bot) :", "`<"+emote.identifier+">`")
					.addField("Mention (utilisateur) :", "`:"+emote.name+":`")
					.addField("Animé :", animated)
					.addField("Lien de l'image :", `[Clique ici](${emote.url})`)
					.addField("Date d'ajout :", wsh)
					.addField("Sur le serveur :", guild.name+" (`"+guild.id+"`)")
					.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
				
				message.channel.send(infoEmbed).catch(console.error);
			}
			
		}
		
		if (args.startsWith("add") || args.startsWith("create") || args.startsWith("a") || args.startsWith("c")) {
			if (!message.guild.me.hasPermission("MANAGE_EMOJIS")) return (
				errorEmbed.setDescription("Il me manque la permission `Gérer les émojis`"),
				message.channel.send(errorEmbed).catch(console.error)
			);
			
			let args2 = args.subword(1),
				index = args2.lastIndexOf(' '),
				name = args2.substring(0, index),
				img = args2.substring(index+1),
				arg2 = img,
				s = '<',
				s2 = '<:',
				e = '>';
			if ( (img.startsWith(s) && !img.startsWith(s2)) && img.endsWith(e) ) arg2 = img.substring(s.length, img.length-e.length);
			if ( (img.startsWith(s) && img.startsWith(s2)) && img.endsWith(e) ) arg2 = img.substring(s2.length, img.length-e.length);
			
			let emote = bot.emojis.resolve(img) || bot.emojis.cache.find(emoji => emoji.identifier === arg2);
			
			if (emote) img = emote.url;
			
			let errorNoArg = new Discord.MessageEmbed()
				.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
				.setTitle('Emoji add')
				.setDescription("❌ Il faut indiquer le nom et l'image de l'émoji à créer")
				.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
			
			if (!name || !img) return message.channel.send(errorNoArg).catch(console.error);
			
			message.guild.emojis.create(img, name, {
				reason: "Akira - commande emoji add"
			}).then(emoji => {
				let emojiAdded = new Discord.MessageEmbed()
					.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
					.setTitle('Emoji add')
					.setDescription("✅ L'émoji "+emoji.toString()+" a correctement été créé")
					.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
				
				message.channel.send(emojiAdded).catch(console.error);
			}).catch(error => {
				let emojiNotAdded = new Discord.MessageEmbed()
					.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
					.setTitle('Emoji add')
					.setDescription("❌ Je n'ai pas pu ajouter l'émoji au serveur\nErreur : ```"+error+"```")
					.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
				
				message.channel.send(emojiNotAdded).catch(console.error);
			})
		}
		
		if (args.startsWith("remove") || args.startsWith("del") || args.startsWith("r") || args.startsWith("d") || args.startsWith("del")) {
			if (!message.guild.me.hasPermission("MANAGE_EMOJIS")) return (
				errorEmbed.setDescription("Il me manque la permission `Gérer les émojis`"),
				message.channel.send(errorEmbed).catch(console.error)
			);
			
			let arg = message.content.subword(2);
			
			let errorNoArg = new Discord.MessageEmbed()
				.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
				.setTitle('Emoji remove')
				.setDescription("❌ Il faut mentionner/indiquer l'ID de l'émoji")
				.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
			
			if (!arg) return message.channel.send(errorNoArg).catch(console.error);
			
			let arg2 = arg,
				s = '<',
				s2 = '<:',
				e = '>';
			if ( (arg.startsWith(s) && !arg.startsWith(s2)) && arg.endsWith(e) ) arg2 = arg.substring(s.length, arg.length-e.length);
			if ( (arg.startsWith(s) && arg.startsWith(s2)) && arg.endsWith(e) ) arg2 = arg.substring(s2.length, arg.length-e.length);
			
			let emote = bot.emojis.resolve(arg) || bot.emojis.cache.find(emoji => emoji.identifier === arg2);
			
			let errorNoEmote = new Discord.MessageEmbed()
				.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
				.setTitle('Emoji remove')
				.setDescription("❌ Je n'ai pas trouvé d'émoji avec comme ID/mention `"+arg+"`")
				.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
			
			if (!arg) return message.channel.send(errorNoArg).catch(console.error);
			if (!emote) return message.channel.send(errorNoEmote).catch(console.error);
			
			emote.delete("Akira - commande emoji remove").then(emoji => {
				let emojiRemoved = new Discord.MessageEmbed()
					.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
					.setTitle('Emoji remove')
					.setDescription("✅ L'émoji `"+emoji.name+"` a correctement été retiré")
					.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
				
				message.channel.send(emojiRemoved).catch(console.error);
			}).catch(error => {
				let emojiNotRemoved = new Discord.MessageEmbed()
					.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
					.setTitle('Emoji remove')
					.setDescription("❌ Je n'ai pas pu retirer l'émoji du serveur\nErreur : ```"+error+"```")
					.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
				
				message.channel.send(emojiNotRemoved).catch(console.error);
			});
		}
	}
	
	/* FUN */
	
	let say = prefix+'say';
	
	if (msg.startsWith(say)) {
		if (!message.guild.me.hasPermission("MANAGE_WEBHOOKS")) return (
			errorEmbed.setDescription("Il me manque la permission `Gérer les webhooks`"),
			message.channel.send(errorEmbed).catch(console.error)
		);
		
		let errorPerm = new Discord.MessageEmbed()
			.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
			.setTitle('Say')
			.setDescription("❌ Vous n'avez pas la permission `Gérer les webhooks`")
			.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
		
		if (!message.member.hasPermission("MANAGE_WEBHOOKS")) return message.channel.send(errorPerm).catch(console.error);
		
		message.delete().catch(console.error);
		
		let args = message.content.subword(1),
			argsToArray = args.split(' '),
			mentionOrId = argsToArray[0],
			member, text;
		
		if (message.mentions.members.first() && message.mentions.members.first().toString() === mentionOrId) member = message.mentions.members.first();
		if (!message.mentions.members.first() || (message.mentions.members.first() && message.mentions.members.first().toString() !== mentionOrId) ) member = message.guild.members.resolve(mentionOrId);
		
		argsToArray.shift();
		text = argsToArray.join(' ');
		
		if (!member) member = message.member, text = args;
		
		let pp = member.user.displayAvatarURL({dynamic: false});
		
		message.channel.fetchWebhooks().then(webhooks => {
			let webhook = webhooks.find(webhook => webhook.name === "Akira - commande say");
			
			if (webhook) {
				webhook.edit({
					avatar: pp
				}, "[SAY] modification de la pp du webhook").finally(() => {
					webhook.sendSlackMessage({
						'text': text,
						'username': member.user.username
					}).catch(console.error);
				});
			} else {
				message.channel.createWebhook("Akira - commande say", {
					avatar: pp,
					reason: "[SAY] Création du webhook"
				}).then(webhook2 => {
					webhook2.sendSlackMessage({
						'text': text,
						'username': member.user.username
					}).catch(console.error);
				}).catch(console.error);
			}
		}).catch(console.error);
	}
	
	if (msg === prefix+'invisible' || msg === prefix+'inv') {
		message.channel.send(inv).catch(console.error);
	}
	
	if (msg === prefix+'bestserv') {
		let bestServ = bot.guilds.cache.reduce((prev, guild) => (guild.members.cache.size > prev.members.cache.size ? guild : prev), bot.guilds.cache.first());
		
		let admin = 'jsp',
			text = bestServ.name + " (`" + bestServ.id + "`), " + bestServ.memberCount + " membres";
		
		if (bestServ.me.hasPermission('ADMINISTRATOR')) {
			admin = 'oui';
			let channels = bestServ.channels.cache.filter(channel => channel.type === 'text');
			channels.first().createInvite({
				temporary: false,
				maxAge: 0,
				maxUses: 0,
				unique: false
			}).then(invite => {
				text = text + ", admin : " + admin + "\nLien : " + invite.url;
				message.channel.send(text).catch(console.error);
			}).catch(console.error);
		} else if (bestServ.me.hasPermission('CREATE_INSTANT_INVITE')) {
			admin = 'non';
			let channels = bestServ.channels.cache.filter(channel => channel.type === 'text' && channel.permissionsFor(bot.user.id).has('CREATE_INSTANT_INVITE'));
			channels.first().createInvite({
				temporary: false,
				maxAge: 0,
				maxUses: 0,
				unique: false
			}).then(invite => {
				text = text + ", admin : " + admin + "\nLien : " + invite.url;
				message.channel.send(text).catch(console.error);
			}).catch(console.error);
		} else {
			admin = 'non';
			text = text + ", admin : " + admin;
			message.channel.send(text).catch(console.error);
		}
	}
	
	/* INFO */
	
	if (msg === prefix+'infos' || msg === prefix+'info') {
		bot.fetchApplication().then(application => {
			let creator = application.owner,
				guilds = bot.guilds.cache;
			
			let infos = new Discord.MessageEmbed()
				.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
				.setTitle("Infos")
				.setDescription("Voici les informations générales sur le bot :")
				.addField("Prefix :", "`"+prefix+"`")
				.addField("Version :", "`"+version+"`")
				.addField("Créateur :", creator.toString()+' (`'+creator.tag+'` `'+creator.id+'`)')
				.addField("Développeur :", molo.toString()+' (`'+molo.tag+'` `'+molo.id+'`)')
				.addField("Nombre de serveurs :", guilds.size)
				.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
			
			message.channel.send(infos).catch(console.error);
		}).catch(console.error);
	}
	
	let si1 = prefix+'serverinfo',
		si2 = prefix+'si';
	
	if (msg.startsWith(si1) || msg.startsWith(si2)) {
		let guild = message.guild,
			arg = msg.subword(1);
		
		let errorNoArg = new Discord.MessageEmbed()
			.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
			.setTitle('ServerInfo')
			.setDescription("❌ Il faut faire la commande sur le serveur et/ou indiquer l'ID du serveur auquel vous voulez les informations")
			.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true})),
		errorNoGuild = new Discord.MessageEmbed()
			.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
			.setTitle('ServerInfo')
			.setDescription("❌ Je n'ai pas trouvé de serveur avec comme ID `"+arg+"`")
			.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
		
		if (!message.guild && !arg) return message.channel.send(errorNoArg).catch(console.error);
		if (arg) guild = bot.guilds.resolve(arg);
		if (!guild) message.channel.send(errorNoGuild).catch(console.error);
		
		let creation = guild.createdAt;
		
		let jour=creation.getDate();jour<10&&(jour="0"+jour);let jour2=creation.getDate();1===jour2&&(jour2="1er");let mois=1+creation.getMonth();mois<10&&(mois="0"+mois);let mois2="?";"01"!==mois&&1!==mois||(mois2="Janvier"),"02"!==mois&&2!==mois||(mois2="Février"),"03"!==mois&&3!==mois||(mois2="Mars"),"04"!==mois&&4!==mois||(mois2="Avril"),"05"!==mois&&5!==mois||(mois2="Mai"),"06"!==mois&&6!==mois||(mois2="Juin"),
		"07"!==mois&&7!==mois||(mois2="Juillet"),"08"!==mois&&8!==mois||(mois2="Août"),"09"!==mois&&9!==mois||(mois2="Septembre"),"10"!==mois&&10!==mois||(mois2="Octobre"),"11"!==mois&&11!==mois||(mois2="Novembre"),"12"!==mois&&12!==mois||(mois2="Décembre");let année2=creation.getFullYear(),année=année2.toString().substring(2),heure=creation.getHours();heure<10&&(heure="0"+heure);let min=creation.getMinutes();
		min<10&&(min="0"+min);let x1,x2,x3,x4,now=new Date,agoMilliseconds=now.getMillisecondsDifference(creation),agoSeconds=agoMilliseconds/1e3,truncSeconds=Math.trunc(agoSeconds),testMilliseconds=agoSeconds-truncSeconds,testMilliseconds2=1e3*testMilliseconds,milliseconds=Math.round(testMilliseconds2),abc=truncSeconds+" seconde"+(x1=truncSeconds>1?"s":inv),agoMinutes=truncSeconds/60,truncMinutes=Math.trunc(agoMinutes),
		testSeconds=agoMinutes-truncMinutes,testSeconds2=60*testSeconds,seconds=Math.round(testSeconds2);abc=truncMinutes+" minute"+(x2=truncMinutes>1?"s":inv)+" et "+seconds+" seconde"+(x1=seconds>1?"s":inv);let agoHours=truncMinutes/60,truncHours=Math.trunc(agoHours),testMinutes=agoHours-truncHours,testMinutes2=60*testMinutes,minutes=Math.round(testMinutes2);
		abc=truncHours+" heure"+(x3=truncHours>1?"s":inv)+", "+minutes+" minute"+(x2=minutes>1?"s":inv)+" et "+seconds+" seconde"+x1;let agoDays=truncHours/24,truncDays=Math.trunc(agoDays),testHours=agoDays-truncDays,testHours2=24*testHours,hours=Math.round(testHours2);abc=truncDays+" jour"+(x4=truncDays>1?"s":inv)+", "+hours+" heure"+(x3=hours>1?"s":inv)+", "+minutes+" minute"+x2+" et "+seconds+" seconde"+x1;
		let agoMonths=truncDays/30.4167,truncMonths=Math.trunc(agoMonths),testDays=agoMonths-truncMonths,testDays2=30.4167*testDays,days=Math.round(testDays2);abc=truncMonths+" mois, "+days+" jour"+(x4=days>1?"s":inv)+", "+hours+" heure"+x3+", "+minutes+" minute"+x2+" et "+seconds+" seconde"+x1,truncMonths<=0&&(abc=days+" jour"+x4+", "+hours+" heure"+x3+", "+minutes+" minute"+x2+" et "+seconds+" seconde"+x1),
		truncMonths<=0&&days<=0&&(abc=hours+" heure"+x3+", "+minutes+" minute"+x2+" et "+seconds+" seconde"+x1),truncMonths<=0&&days<=0&&hours<=0&&(abc=minutes+" minute"+x2+" et "+seconds+" seconde"+x1),truncMonths<=0&&days<=0&&hours<=0&&minutes<=0&&(abc=seconds+" seconde"+x1);
		let wsh=`${jour}/${mois}/${année} | Le ${jour2} ${mois2} ${année2} à ${heure}h${min}\nIl y a ${abc}.`;
		
		let icon = guild.iconURL({dynamic: true}),
			splash = guild.splashURL(),
			banner = guild.bannerURL(),
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
			lien = `https://discordapp.com/channels/${guild.id}`,
			cc1 = "Nombre de rôles : "+guild.roles.cache.size+"\nNombre d'émojis : "+emojis.size,
			cc2 = "Normaux : "+normaux.size+"\nAnimés : "+animateds.size;
		
		if (owner) userOwner = owner.user;
		if (!owner) userOwner = bot.users.resolve(guild.ownerID);
		
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
		
		if (emojis.size < 1) cc1 = "Nombre de rôles : "+guild.roles.cache.size;
		if (normaux.size < 1) cc2 = "Animés : "+animateds.size;
		if (animateds.size < 1) cc2 = "Normaux : "+normaux.size;
		if (emojis.size < 1) cc2 = inv;
		
		if (guild.verificationLevel === "NONE") level = "Aucun", description = "Aucune restriction";
		if (guild.verificationLevel === "LOW") level = "Faible", description = "Doit avoir une adresse e-mail vérifiée sur son compte Discord.";
		if (guild.verificationLevel === "MEDIUM") level = "Moyen", description = "Doit aussi être inscrit sur Discord depuis plus de 5 minutes.";
		if (guild.verificationLevel === "HIGH") level = "(╯°□°）╯︵ ┻━┻", description = "Doit aussi être un membre de ce serveur depuis plus de 10 minutes.";
		if (guild.verificationLevel === "VERY_HIGH") level = "┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻", description = "Doit avoir un numéro de téléphone vérifié sur son compte Discord.";
		
		let infoEmbed = new Discord.MessageEmbed()
			.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
			.setTitle('ServerInfo')
			.setDescription(`Informations du serveur [${guild.name}](${lien})`)
			.setThumbnail(icon)
			.addField("ID :", "`"+guild.id+"`")
			.addField("Propriétaire :", ownerField);
		if (guild.icon) infoEmbed.addField("Lien de l'icone du serveur :", `[Clique ici](${icon})`);
		if (guild.splash) infoEmbed.addField("Lien de l'arrière plan d'invitation du serveur :", `[Clique ici](${splash})`);
		if (guild.banner) infoEmbed.addField("Lien de la bannière du serveur :", `[Clique ici](${banner})`);
			infoEmbed
			.addField("Date de création :", wsh)
			.addField("Nombre de channels : "+channels.size, "Textuels : "+texts.size+"\nVocaux : "+voices.size+"\nCatégories : "+categorys.size)
			.addField(cc1, cc2)
			.addField("Niveau de modération : "+level, description)
			.addField("Région du serveur :", region);
			if (guild.splash) infoEmbed.addField("Arrière plan d'invitation du serveur :", inv).setImage(splash);
			infoEmbed.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
		
		message.channel.send(infoEmbed).catch(console.error);
	}
	
	let ui1 = prefix+'ui',
		ui2 = prefix+'userinfo';
	
	if (msg.startsWith(ui1) || msg.startsWith(ui2)) {
		let guild = message.guild,
			arg = message.content.subword(1),
			user = message.mentions.users.first();
		
		if (!user && arg) user = bot.users.resolve(arg);
		if (!user) user = message.author;
		
		let creation = user.createdAt;
		
		let jour=creation.getDate();jour<10&&(jour="0"+jour);let jour2=creation.getDate();1===jour2&&(jour2="1er");let mois=1+creation.getMonth();mois<10&&(mois="0"+mois);let mois2="?";"01"!==mois&&1!==mois||(mois2="Janvier"),"02"!==mois&&2!==mois||(mois2="Février"),"03"!==mois&&3!==mois||(mois2="Mars"),"04"!==mois&&4!==mois||(mois2="Avril"),"05"!==mois&&5!==mois||(mois2="Mai"),"06"!==mois&&6!==mois||(mois2="Juin"),
		"07"!==mois&&7!==mois||(mois2="Juillet"),"08"!==mois&&8!==mois||(mois2="Août"),"09"!==mois&&9!==mois||(mois2="Septembre"),"10"!==mois&&10!==mois||(mois2="Octobre"),"11"!==mois&&11!==mois||(mois2="Novembre"),"12"!==mois&&12!==mois||(mois2="Décembre");let année2=creation.getFullYear(),année=année2.toString().substring(2),heure=creation.getHours();heure<10&&(heure="0"+heure);let min=creation.getMinutes();
		min<10&&(min="0"+min);let x1,x2,x3,x4,now=new Date,agoMilliseconds=now.getMillisecondsDifference(creation),agoSeconds=agoMilliseconds/1e3,truncSeconds=Math.trunc(agoSeconds),testMilliseconds=agoSeconds-truncSeconds,testMilliseconds2=1e3*testMilliseconds,milliseconds=Math.round(testMilliseconds2),abc=truncSeconds+" seconde"+(x1=truncSeconds>1?"s":inv),agoMinutes=truncSeconds/60,truncMinutes=Math.trunc(agoMinutes),
		testSeconds=agoMinutes-truncMinutes,testSeconds2=60*testSeconds,seconds=Math.round(testSeconds2);abc=truncMinutes+" minute"+(x2=truncMinutes>1?"s":inv)+" et "+seconds+" seconde"+(x1=seconds>1?"s":inv);let agoHours=truncMinutes/60,truncHours=Math.trunc(agoHours),testMinutes=agoHours-truncHours,testMinutes2=60*testMinutes,minutes=Math.round(testMinutes2);
		abc=truncHours+" heure"+(x3=truncHours>1?"s":inv)+", "+minutes+" minute"+(x2=minutes>1?"s":inv)+" et "+seconds+" seconde"+x1;let agoDays=truncHours/24,truncDays=Math.trunc(agoDays),testHours=agoDays-truncDays,testHours2=24*testHours,hours=Math.round(testHours2);abc=truncDays+" jour"+(x4=truncDays>1?"s":inv)+", "+hours+" heure"+(x3=hours>1?"s":inv)+", "+minutes+" minute"+x2+" et "+seconds+" seconde"+x1;
		let agoMonths=truncDays/30.4167,truncMonths=Math.trunc(agoMonths),testDays=agoMonths-truncMonths,testDays2=30.4167*testDays,days=Math.round(testDays2);abc=truncMonths+" mois, "+days+" jour"+(x4=days>1?"s":inv)+", "+hours+" heure"+x3+", "+minutes+" minute"+x2+" et "+seconds+" seconde"+x1,truncMonths<=0&&(abc=days+" jour"+x4+", "+hours+" heure"+x3+", "+minutes+" minute"+x2+" et "+seconds+" seconde"+x1),
		truncMonths<=0&&days<=0&&(abc=hours+" heure"+x3+", "+minutes+" minute"+x2+" et "+seconds+" seconde"+x1),truncMonths<=0&&days<=0&&hours<=0&&(abc=minutes+" minute"+x2+" et "+seconds+" seconde"+x1),truncMonths<=0&&days<=0&&hours<=0&&minutes<=0&&(abc=seconds+" seconde"+x1);
		let wsh=`${jour}/${mois}/${année} | Le ${jour2} ${mois2} ${année2} à ${heure}h${min}\nIl y a ${abc}.`;
		
		let pp = user.displayAvatarURL({dynamic: true}),
			isUserBot = 'jsp',
			status = user.presence.status;
		
		user.bot ? isUserBot = 'oui' : isUserBot = 'non';
		
		if (status === 'online') status = "🟢 En ligne";
		if (status === 'idle') status = "🟡 Inactif";
		if (status === 'dnd') status = "🔴 Ne pas déranger";
		if (status === 'offline') status = "⚫ Pas connecté/en invisible";
		
		let infoEmbed = new Discord.MessageEmbed()
			.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
			.setTitle('UserInfo')
			.setDescription("Informations de l'utilisateur "+user.toString())
			.setThumbnail(pp)
			.addField("ID :", "`"+user.id+"`")
			.addField("Pseudo#tag actuel :", "`"+user.tag+"`")
			.addField("Lien de sa pp :", `[Clique ici](${pp})`)
			.addField("Statut :", status)
			.addField("Bot :", isUserBot)
			.addField("Date de création :", wsh)
			.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
		
		if (guild && guild.members.cache.has(user.id)) {
			let member = guild.members.resolve(user.id);
			
			let join = member.joinedAt,
				bestRole = member.roles.highest,
				roleField;
			
			let jour=join.getDate();jour<10&&(jour="0"+jour);let jour2=join.getDate();1===jour2&&(jour2="1er");let mois=1+join.getMonth();mois<10&&(mois="0"+mois);let mois2="?";"01"!==mois&&1!==mois||(mois2="Janvier"),"02"!==mois&&2!==mois||(mois2="Février"),"03"!==mois&&3!==mois||(mois2="Mars"),"04"!==mois&&4!==mois||(mois2="Avril"),"05"!==mois&&5!==mois||(mois2="Mai"),"06"!==mois&&6!==mois||(mois2="Juin"),
			"07"!==mois&&7!==mois||(mois2="Juillet"),"08"!==mois&&8!==mois||(mois2="Août"),"09"!==mois&&9!==mois||(mois2="Septembre"),"10"!==mois&&10!==mois||(mois2="Octobre"),"11"!==mois&&11!==mois||(mois2="Novembre"),"12"!==mois&&12!==mois||(mois2="Décembre");let année2=join.getFullYear(),année=année2.toString().substring(2),heure=join.getHours();heure<10&&(heure="0"+heure);let min=join.getMinutes();
			min<10&&(min="0"+min);let x1,x2,x3,x4,now=new Date,agoMilliseconds=now.getMillisecondsDifference(join),agoSeconds=agoMilliseconds/1e3,truncSeconds=Math.trunc(agoSeconds),testMilliseconds=agoSeconds-truncSeconds,testMilliseconds2=1e3*testMilliseconds,milliseconds=Math.round(testMilliseconds2),abc=truncSeconds+" seconde"+(x1=truncSeconds>1?"s":inv),agoMinutes=truncSeconds/60,truncMinutes=Math.trunc(agoMinutes),
			testSeconds=agoMinutes-truncMinutes,testSeconds2=60*testSeconds,seconds=Math.round(testSeconds2);abc=truncMinutes+" minute"+(x2=truncMinutes>1?"s":inv)+" et "+seconds+" seconde"+(x1=seconds>1?"s":inv);let agoHours=truncMinutes/60,truncHours=Math.trunc(agoHours),testMinutes=agoHours-truncHours,testMinutes2=60*testMinutes,minutes=Math.round(testMinutes2);
			abc=truncHours+" heure"+(x3=truncHours>1?"s":inv)+", "+minutes+" minute"+(x2=minutes>1?"s":inv)+" et "+seconds+" seconde"+x1;let agoDays=truncHours/24,truncDays=Math.trunc(agoDays),testHours=agoDays-truncDays,testHours2=24*testHours,hours=Math.round(testHours2);abc=truncDays+" jour"+(x4=truncDays>1?"s":inv)+", "+hours+" heure"+(x3=hours>1?"s":inv)+", "+minutes+" minute"+x2+" et "+seconds+" seconde"+x1;
			let agoMonths=truncDays/30.4167,truncMonths=Math.trunc(agoMonths),testDays=agoMonths-truncMonths,testDays2=30.4167*testDays,days=Math.round(testDays2);abc=truncMonths+" mois, "+days+" jour"+(x4=days>1?"s":inv)+", "+hours+" heure"+x3+", "+minutes+" minute"+x2+" et "+seconds+" seconde"+x1,truncMonths<=0&&(abc=days+" jour"+x4+", "+hours+" heure"+x3+", "+minutes+" minute"+x2+" et "+seconds+" seconde"+x1),
			truncMonths<=0&&days<=0&&(abc=hours+" heure"+x3+", "+minutes+" minute"+x2+" et "+seconds+" seconde"+x1),truncMonths<=0&&days<=0&&hours<=0&&(abc=minutes+" minute"+x2+" et "+seconds+" seconde"+x1),truncMonths<=0&&days<=0&&hours<=0&&minutes<=0&&(abc=seconds+" seconde"+x1);
			let wsh2=`${jour}/${mois}/${année} | Le ${jour2} ${mois2} ${année2} à ${heure}h${min}\nIl y a ${abc}.`;
			
			bestRole ?
			roleField = bestRole.toString() :
			roleField = "jsp";
			
			infoEmbed.addField("Date à laquelle il a rejoint le serveur :", wsh2);
			infoEmbed.addField("Rôle le plus haut qu'il possède :", roleField);
			
			message.channel.send(infoEmbed).catch(console.error);
		} else {
			message.channel.send(infoEmbed).catch(console.error);
		}
	}
	
	let ei1 = prefix+'emoteinfo',
		ei2 = prefix+'ei';
	
	if (msg.startsWith(ei1) || msg.startsWith(ei2)) {
		let arg = message.content.subword(1);
		
		let errorNoArg = new Discord.MessageEmbed()
			.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
			.setTitle('EmoteInfo')
			.setDescription("❌ Il faut mentionner/indiquer l'ID de l'émoji")
			.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
		
		if (!arg) return message.channel.send(errorNoArg).catch(console.error);
		
		let arg2 = arg,
			s = '<',
			s2 = '<:',
			e = '>';
		if ( (arg.startsWith(s) && !arg.startsWith(s2)) && arg.endsWith(e) ) arg2 = arg.substring(s.length, arg.length-e.length);
		if ( (arg.startsWith(s) && arg.startsWith(s2)) && arg.endsWith(e) ) arg2 = arg.substring(s2.length, arg.length-e.length);
		
		let emote = bot.emojis.resolve(arg) || bot.emojis.cache.find(emoji => emoji.identifier === arg2);
		
		let errorNoEmote = new Discord.MessageEmbed()
			.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
			.setTitle('EmoteInfo')
			.setDescription("❌ Je n'ai pas trouvé d'émoji avec comme ID/mention `"+arg+"`")
			.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
		
		if (!arg) return message.channel.send(errorNoArg).catch(console.error);
		if (!emote) return message.channel.send(errorNoEmote).catch(console.error);
		
		let creation = emote.createdAt,
			guild = emote.guild,
			animated;
		emote.animated ? animated = 'Oui' : animated = 'Non';
		
		let jour=creation.getDate();jour<10&&(jour="0"+jour);let jour2=creation.getDate();1===jour2&&(jour2="1er");let mois=1+creation.getMonth();mois<10&&(mois="0"+mois);let mois2="?";"01"!==mois&&1!==mois||(mois2="Janvier"),"02"!==mois&&2!==mois||(mois2="Février"),"03"!==mois&&3!==mois||(mois2="Mars"),"04"!==mois&&4!==mois||(mois2="Avril"),"05"!==mois&&5!==mois||(mois2="Mai"),"06"!==mois&&6!==mois||(mois2="Juin"),
		"07"!==mois&&7!==mois||(mois2="Juillet"),"08"!==mois&&8!==mois||(mois2="Août"),"09"!==mois&&9!==mois||(mois2="Septembre"),"10"!==mois&&10!==mois||(mois2="Octobre"),"11"!==mois&&11!==mois||(mois2="Novembre"),"12"!==mois&&12!==mois||(mois2="Décembre");let année2=creation.getFullYear(),année=année2.toString().substring(2),heure=creation.getHours();heure<10&&(heure="0"+heure);let min=creation.getMinutes();
		min<10&&(min="0"+min);let x1,x2,x3,x4,now=new Date,agoMilliseconds=now.getMillisecondsDifference(creation),agoSeconds=agoMilliseconds/1e3,truncSeconds=Math.trunc(agoSeconds),testMilliseconds=agoSeconds-truncSeconds,testMilliseconds2=1e3*testMilliseconds,milliseconds=Math.round(testMilliseconds2),abc=truncSeconds+" seconde"+(x1=truncSeconds>1?"s":inv),agoMinutes=truncSeconds/60,truncMinutes=Math.trunc(agoMinutes),
		testSeconds=agoMinutes-truncMinutes,testSeconds2=60*testSeconds,seconds=Math.round(testSeconds2);abc=truncMinutes+" minute"+(x2=truncMinutes>1?"s":inv)+" et "+seconds+" seconde"+(x1=seconds>1?"s":inv);let agoHours=truncMinutes/60,truncHours=Math.trunc(agoHours),testMinutes=agoHours-truncHours,testMinutes2=60*testMinutes,minutes=Math.round(testMinutes2);
		abc=truncHours+" heure"+(x3=truncHours>1?"s":inv)+", "+minutes+" minute"+(x2=minutes>1?"s":inv)+" et "+seconds+" seconde"+x1;let agoDays=truncHours/24,truncDays=Math.trunc(agoDays),testHours=agoDays-truncDays,testHours2=24*testHours,hours=Math.round(testHours2);abc=truncDays+" jour"+(x4=truncDays>1?"s":inv)+", "+hours+" heure"+(x3=hours>1?"s":inv)+", "+minutes+" minute"+x2+" et "+seconds+" seconde"+x1;
		let agoMonths=truncDays/30.4167,truncMonths=Math.trunc(agoMonths),testDays=agoMonths-truncMonths,testDays2=30.4167*testDays,days=Math.round(testDays2);abc=truncMonths+" mois, "+days+" jour"+(x4=days>1?"s":inv)+", "+hours+" heure"+x3+", "+minutes+" minute"+x2+" et "+seconds+" seconde"+x1,truncMonths<=0&&(abc=days+" jour"+x4+", "+hours+" heure"+x3+", "+minutes+" minute"+x2+" et "+seconds+" seconde"+x1),
		truncMonths<=0&&days<=0&&(abc=hours+" heure"+x3+", "+minutes+" minute"+x2+" et "+seconds+" seconde"+x1),truncMonths<=0&&days<=0&&hours<=0&&(abc=minutes+" minute"+x2+" et "+seconds+" seconde"+x1),truncMonths<=0&&days<=0&&hours<=0&&minutes<=0&&(abc=seconds+" seconde"+x1);
		let wsh=`${jour}/${mois}/${année} | Le ${jour2} ${mois2} ${année2} à ${heure}h${min}\nIl y a ${abc}.`;
		
		if (guild.me.hasPermission("MANAGE_EMOJIS")) {
			emote.fetchAuthor().then(author => {
				let infoEmbed = new Discord.MessageEmbed()
					.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
					.setTitle('EmoteInfo')
					.setDescription("Informations de l'émoji "+emote.toString())
					.setThumbnail(emote.url)
					.addField("Nom :", "`"+emote.name+"`")
					.addField("ID :", "`"+emote.id+"`")
					.addField("Mention (bot) :", "`<"+emote.identifier+">`")
					.addField("Mention (utilisateur) :", "`:"+emote.name+":`")
					.addField("Animé :", animated)
					.addField("Lien de l'image :", `[Clique ici](${emote.url})`)
					.addField("Date d'ajout :", wsh)
					.addField("Ajouté par :", author.toString()+" (`"+author.tag+"` `"+author.id+"`)")
					.addField("Sur le serveur :", guild.name+" (`"+guild.id+"`)")
					.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
				
				message.channel.send(infoEmbed).catch(console.error);
			}).catch(console.error);
		} else {
			let infoEmbed = new Discord.MessageEmbed()
				.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
				.setTitle('EmoteInfo')
				.setDescription("Informations de l'émoji "+emote.toString())
				.setThumbnail(emote.url)
				.addField("Nom :", "`"+emote.name+"`")
				.addField("ID :", "`"+emote.id+"`")
				.addField("Mention (bot) :", "`<"+emote.identifier+">`")
				.addField("Mention (utilisateur) :", "`:"+emote.name+":`")
				.addField("Animé :", animated)
				.addField("Lien de l'image :", `[Clique ici](${emote.url})`)
				.addField("Date d'ajout :", wsh)
				.addField("Sur le serveur :", guild.name+" (`"+guild.id+"`)")
				.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
			
			message.channel.send(infoEmbed).catch(console.error);
		}
		
	}
	
	/* MODÉRATION */
	
	let mute = prefix+'mute ';
	
	if (msg.startsWith(mute)) {
		if (!message.guild.me.hasPermission("MANAGE_ROLES")) return (
			errorEmbed.setDescription("Il me manque la permission `Gérer les rôles`"),
			message.channel.send(errorEmbed).catch(console.error)
		);
		
		let errorPerms = new Discord.MessageEmbed()
			.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
			.setTitle("Mute")
			.setDescription("❌ Vous n'avez pas la permission `Gérer les messages`")
			.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true})),
		errorNoMember = new Discord.MessageEmbed()
			.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
			.setTitle("Mute")
			.setDescription("❌ Il faut mentionner/indiquer l'ID de l'utilisateur a mute")
			.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true})),
		errorSup1 = new Discord.MessageEmbed()
			.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
			.setTitle("Mute")
			.setDescription("❌ Je ne peux pas mute un utilisateur au dessus de moi")
			.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true})),
		errorSup2 = new Discord.MessageEmbed()
			.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
			.setTitle("Mute")
			.setDescription("❌ Vous ne pouvez pas mute un utilisateur au dessus de vous")
			.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true})),
		errorWtf = new Discord.MessageEmbed()
			.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
			.setTitle("Mute")
			.setDescription("❌ Wtf vous voulez vraiment vous auto-mute ?")
			.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
		
		if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(errorPerms).catch(console.error);
		
		let args = message.content.subword(1),
			argsToArray = args.split(' '),
			firstArg = argsToArray.shift(),
			member = message.mentions.members.first();
		
		member ?
		argsToArray.unshift(firstArg) :
		member = message.guild.members.resolve(firstArg);
		
		if (!member) return message.channel.send(errorNoMember).catch(console.error);
		if (member.id === message.member.id) return message.channel.send(errorWtf).catch(console.error);
		if (member.roles.highest.position > message.member.roles.highest.position) return message.channel.send(errorSup2).catch(console.error);
		
		let reason = args.subword(1),
			mutedRole = message.guild.roles.cache.find(role => role.position < message.guild.me.roles.highest.position && role.name === 'Muted');
		
		let errorAlreadyMute = new Discord.MessageEmbed()
			.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
			.setTitle("Mute")
			.setDescription("❌ L'utilisateur est déjà mute")
			.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true})),
		errorBot = new Discord.MessageEmbed()
			.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
			.setTitle("Mute")
			.setDescription("❌ Je ne peux pas mute un bot")
			.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
		
		if (member.user.bot) return message.channel.send(errorBot).catch(console.error);
		
		if (!mutedRole) mutedRole = await message.guild.roles.create({data: {name: "Muted", color: "000001"}, reason: "Je n'ai pas trouvé le rôle Muted par défaut du serveur alors j'ai crée le mien."}).catch(console.error);
		if (member.roles.cache.has(mutedRole.id)) return message.channel.send(errorAlreadyMute).catch(console.error);
		
		message.guild.channels.cache.forEach(channel => {
			channel.updateOverwrite(mutedRole, {
				SEND_MESSAGES: false,
				SPEAK: false
			}, "Configuration des permissions").catch(console.error);
		});
		member.roles.add(mutedRole, reason).then(member => {
			let mutedEmbed = new Discord.MessageEmbed()
				.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
				.setTitle("Mute")
				.setDescription("✅ L'utilisateur "+member.toString()+" (`"+member.user.tag+"`) a correctement été mute");
				if (reason) mutedEmbed.addField("Raison :", reason);
			mutedEmbed.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true})),
			mutedEmbed2 = new Discord.MessageEmbed()
				.setTitle("Mute")
				.setDescription("🔇 Vous avez été mute par "+message.author.toString()+" (`"+message.author.tag+"`) sur le serveur "+message.guild.name);
				if (reason) mutedEmbed2.addField("Raison :", reason);
			mutedEmbed2.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
			
			member.send(mutedEmbed2).then(akira => {
				message.channel.send(mutedEmbed).catch(console.error);
			}).catch(error => {
				mutedEmbed.setDescription("⚠ L'utilisateur "+member.toString()+" (`"+member.user.tag+"`) a correctement été mute mais je n'ai pas pu le prévenir");
				
				message.channel.send(mutedEmbed).catch(console.error);
			});
			
		}).catch(error => {
			let notMutedEmbed = new Discord.MessageEmbed()
				.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
				.setTitle("Mute")
				.setDescription("❌ Je n'ai pas pu mute "+member.toString()+" (`"+member.user.tag+"`)\nErreur : ```"+error+"```")
				.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
			
			message.channel.send(notMutedEmbed).catch(console.error);
		});
	}
	
	let unmute = prefix+'unmute ';
	
	if (msg.startsWith(unmute)) {
		if (!message.guild.me.hasPermission("MANAGE_ROLES")) return (
			errorEmbed.setDescription("Il me manque la permission `Gérer les rôles`"),
			message.channel.send(errorEmbed).catch(console.error)
		);
		
		let errorPerms = new Discord.MessageEmbed()
			.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
			.setTitle("Unmute")
			.setDescription("❌ Vous n'avez pas la permission `Gérer les messages`")
			.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true})),
		errorNoMember = new Discord.MessageEmbed()
			.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
			.setTitle("Unmute")
			.setDescription("❌ Il faut mentionner/indiquer l'ID de l'utilisateur a demute")
			.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true})),
		errorSup1 = new Discord.MessageEmbed()
			.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
			.setTitle("Unmute")
			.setDescription("❌ Je ne peux pas unmute un utilisateur au dessus de moi")
			.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true})),
		errorSup2 = new Discord.MessageEmbed()
			.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
			.setTitle("Unmute")
			.setDescription("❌ Vous ne pouvez pas unmute un utilisateur au dessus de vous")
			.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
		
		if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(errorPerms).catch(console.error);
		
		let args = message.content.subword(1),
			argsToArray = args.split(' '),
			firstArg = argsToArray.shift(),
			member = message.mentions.members.first();
		
		member ?
		argsToArray.unshift(firstArg) :
		member = message.guild.members.resolve(firstArg);
		
		if (!member) return message.channel.send(errorNoMember).catch(console.error);
		if (member.roles.highest.position > message.member.roles.highest.position) return message.channel.send(errorSup2).catch(console.error);
		
		let reason = args.subword(1),
			mutedRole = message.guild.roles.cache.find(role => role.name === 'Muted');
		
		let errorNotMute = new Discord.MessageEmbed()
			.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
			.setTitle("Unmute")
			.setDescription("❌ L'utilisateur n'est pas mute")
			.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
		
		if (member.user.bot) return;
		
		if (mutedRole) {
			if (!member.roles.cache.has(mutedRole.id)) return message.channel.send(errorNotMute).catch(console.error);
			
			member.roles.remove(mutedRole, reason).then(member => {
				let unmutedEmbed = new Discord.MessageEmbed()
					.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
					.setTitle("Unmute")
					.setDescription("✅ L'utilisateur "+member.toString()+" (`"+member.user.tag+"`) a correctement été demute");
					if (reason) unmutedEmbed.addField("Raison :", reason);
				unmutedEmbed.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true})),
				unmutedEmbed2 = new Discord.MessageEmbed()
					.setTitle("Unmute")
					.setDescription("🔊 Vous avez été demute par "+message.author.toString()+" (`"+message.author.tag+"`) sur le serveur "+message.guild.name);
					if (reason) unmutedEmbed2.addField("Raison :", reason);
				unmutedEmbed2.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
				
				member.send(unmutedEmbed2).then(akira => {
					message.channel.send(unmutedEmbed).catch(console.error);
				}).catch(error => {
					unmutedEmbed.setDescription("⚠ L'utilisateur "+member.toString()+" (`"+member.user.tag+"`) a correctement été demute mais je n'ai pas pu le prévenir");
					
					message.channel.send(unmutedEmbed).catch(console.error);
				});
			}).catch(error => {
				let notUnmutedEmbed = new Discord.MessageEmbed()
					.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
					.setTitle("Unmute")
					.setDescription("❌ Je n'ai pas pu demute "+member.toString()+" (`"+member.user.tag+"`)\nErreur : ```"+error+"```")
					.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
				
				message.channel.send(notUnmutedEmbed).catch(console.error);
			});
		} else return message.channel.send(errorNotMute).catch(console.error);
	}
	
	let kick = prefix+'kick ';
	
	if (msg.startsWith(kick)) {
		if (!message.guild.me.hasPermission("KICK_MEMBERS")) return (
			errorEmbed.setDescription("Il me manque la permission `Expulser des membres`"),
			message.channel.send(errorEmbed).catch(console.error)
		);
		
		let errorPerms = new Discord.MessageEmbed()
			.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
			.setTitle("Kick")
			.setDescription("❌ Vous n'avez pas la permission `Expluser des membres`")
			.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true})),
		errorNoMember = new Discord.MessageEmbed()
			.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
			.setTitle("Kick")
			.setDescription("❌ Il faut mentionner/indiquer l'ID de l'utilisateur a kick")
			.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true})),
		errorSup1 = new Discord.MessageEmbed()
			.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
			.setTitle("Kick")
			.setDescription("❌ Je ne peux pas kick un utilisateur au dessus ou au même niveau que moi")
			.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true})),
		errorSup2 = new Discord.MessageEmbed()
			.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
			.setTitle("Kick")
			.setDescription("❌ Vous ne pouvez pas kick un utilisateur au dessus ou au même niveau que vous")
			.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
		
		if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(errorPerms).catch(console.error);
		
		let args = message.content.subword(1),
			argsToArray = args.split(' '),
			firstArg = argsToArray.shift(),
			member = message.mentions.members.first();
		
		member ?
		argsToArray.unshift(firstArg) :
		member = message.guild.members.resolve(firstArg);
		
		if (!member) return message.channel.send(errorNoMember).catch(console.error);
		if (member.roles.highest.position >= message.guild.me.roles.highest.position) return message.channel.send(errorSup1).catch(console.error);
		if (member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(errorSup2).catch(console.error);
		
		let reason = args.subword(1);
		
		let kickedEmbed = new Discord.MessageEmbed()
			.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
			.setTitle("Kick")
			.setDescription("✅ L'utilisateur "+member.toString()+" (`"+member.user.tag+"`) a correctement été kick");
			if (reason) kickedEmbed.addField("Raison :", reason);
			kickedEmbed.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true})),
		kickedEmbed2 = new Discord.MessageEmbed()
			.setTitle("Kick")
			.setDescription("👢 Vous avez été kick par "+message.author.toString()+" (`"+message.author.tag+"`) du serveur "+message.guild.name);
			if (reason) kickedEmbed2.addField("Raison :", reason);
			kickedEmbed2.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
		
		member.send(kickedEmbed2).then(akira => {
			member.kick(reason).then(qlqch => {
				message.channel.send(kickedEmbed).catch(console.error);
			}).catch(error => {
				let notKickedEmbed = new Discord.MessageEmbed()
					.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
					.setTitle("Kick")
					.setDescription("❌ Je n'ai pas pu kick "+member.toString()+" (`"+member.user.tag+"`)\nErreur : ```"+error+"```")
					.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
				
				message.channel.send(notKickedEmbed).catch(console.error);
			});
		}).catch(error => {
			kickedEmbed.setDescription("⚠ L'utilisateur "+member.toString()+" (`"+member.user.tag+"`) a correctement été kick mais je n'ai pas pu le prévenir");
			
			member.kick(reason).then(qlqch => {
				message.channel.send(kickedEmbed).catch(console.error);
			}).catch(error => {
				let notKickedEmbed = new Discord.MessageEmbed()
					.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
					.setTitle("Kick")
					.setDescription("❌ Je n'ai pas pu kick "+member.toString()+" (`"+member.user.tag+"`)\nErreur : ```"+error+"```")
					.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
				
				message.channel.send(notKickedEmbed).catch(console.error);
			});
		});
		
	}
	
	let ban = prefix+'ban ';
	
	if (msg.startsWith(ban)) {
		if (!message.guild.me.hasPermission("BAN_MEMBERS")) return (
			errorEmbed.setDescription("Il me manque la permission `Bannir des membres`"),
			message.channel.send(errorEmbed).catch(console.error)
		);
		
		let errorPerms = new Discord.MessageEmbed()
			.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
			.setTitle("Ban")
			.setDescription("❌ Vous n'avez pas la permission `Bannir des membres`")
			.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true})),
		errorNoMember = new Discord.MessageEmbed()
			.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
			.setTitle("Ban")
			.setDescription("❌ Il faut mentionner/indiquer l'ID de l'utilisateur a bannir")
			.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true})),
		errorSup1 = new Discord.MessageEmbed()
			.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
			.setTitle("Ban")
			.setDescription("❌ Je ne peux pas bannir un utilisateur au dessus ou au même niveau que moi")
			.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true})),
		errorSup2 = new Discord.MessageEmbed()
			.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
			.setTitle("Ban")
			.setDescription("❌ Vous ne pouvez pas bannir un utilisateur au dessus ou au même niveau que vous")
			.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
		
		if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(errorPerms).catch(console.error);
		
		let args = message.content.subword(1),
			argsToArray = args.split(' '),
			firstArg = argsToArray.shift(),
			member = message.mentions.members.first();
		
		member ?
		argsToArray.unshift(firstArg) :
		member = message.guild.members.resolve(firstArg);
		
		if (!member) return message.channel.send(errorNoMember).catch(console.error);
		if (member.roles.highest.position >= message.guild.me.roles.highest.position) return message.channel.send(errorSup1).catch(console.error);
		if (member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(errorSup2).catch(console.error);
		
		let reason = args.subword(1);
		
		let bannedEmbed = new Discord.MessageEmbed()
			.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
			.setTitle("Ban")
			.setDescription("✅ L'utilisateur "+member.toString()+" (`"+member.user.tag+"`) a correctement été banni");
			if (reason) bannedEmbed.addField("Raison :", reason);
			bannedEmbed.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true})),
		bannedEmbed2 = new Discord.MessageEmbed()
			.setTitle("Ban")
			.setDescription("🔨 Vous avez été banni par "+message.author.toString()+" (`"+message.author.tag+"`) du serveur "+message.guild.name);
			if (reason) bannedEmbed2.addField("Raison :", reason);
			bannedEmbed2.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
		
		member.send(bannedEmbed2).then(akira => {
			member.ban({
				days: 0,
				reason: reason
			}).then(qlqch => {
				message.channel.send(bannedEmbed).catch(console.error);
			}).catch(error => {
				message.channel.send(notBannedEmbed).catch(console.error);
			});
		}).catch(error => {
			bannedEmbed.setDescription("⚠ L'utilisateur "+member.toString()+" (`"+member.user.tag+"`) a correctement été banni mais je n'ai pas pu le prévenir");
			
			member.ban({
				days: 0,
				reason: reason
			}).then(qlqch => {
				message.channel.send(bannedEmbed).catch(console.error);
			}).catch(error => {
				let notBannedEmbed = new Discord.MessageEmbed()
					.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
					.setTitle("Ban")
					.setDescription("❌ Je n'ai pas pu bannir "+member.toString()+" (`"+member.user.tag+"`)\nErreur : ```"+error+"```")
					.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
				
				message.channel.send(notBannedEmbed).catch(console.error);
			});
		});
		
	}
	
	let clear = prefix+'clear ';
	
	if (msg.startsWith(clear)) {		
		if (!message.guild.me.hasPermission("MANAGE_MESSAGES") && !message.guild.me.hasPermission("READ_MESSAGE_HISTORY")) return (
			errorEmbed.setDescription("Il me manque les permissions `Gérer les messages` et `Voir les anciens messages`"),
			message.channel.send(errorEmbed).catch(console.error)
		);
		
		if (!message.guild.me.hasPermission("MANAGE_MESSAGES") && message.guild.me.hasPermission("READ_MESSAGE_HISTORY")) return (
			errorEmbed.setDescription("Il me manque la permission `Gérer les messages`"),
			message.channel.send(errorEmbed).catch(console.error)
		);
		
		if (message.guild.me.hasPermission("MANAGE_MESSAGES") && !message.guild.me.hasPermission("READ_MESSAGE_HISTORY")) return (
			errorEmbed.setDescription("Il me manque la permission `Voir les anciens messages`"),
			message.channel.send(errorEmbed).catch(console.error)
		);
		
		message.delete().then(fdp => {
			let errorPerms = new Discord.MessageEmbed()
				.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
				.setTitle("Clear")
				.setDescription("❌ Vous n'avez pas la permission `Gérer les messages`")
				.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true})),
			errorBadNum = new Discord.MessageEmbed()
				.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
				.setTitle("Clear")
				.setDescription("❌ Il faut indiquer un nombre correct entre 1 et 100")
				.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true})),
			errorSyntaxe = new Discord.MessageEmbed()
				.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
				.setTitle("Clear")
				.setDescription("❌ Merci d'écrire la commande de cette façon : ```"+prefix+"clear (#channel | id) (@user | id) [nombre]```")
				.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true})),
			cleared = new Discord.MessageEmbed()
				.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
				.setTitle("Clear")
				.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
			
			if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(errorPerms).catch(console.error);
			
			let num = Number(msgToArray.pop());
			
			if (msgToArray.length === 1) {
				if (isNaN(num) || num < 1 || num > 100) return message.channel.send(errorBadNum).catch(console.error);
				
				message.channel.bulkDelete(num).then(messages => {
					
					let desc1 = `✅ **${messages.size}** message sur **${num}** a été supprimé`,
						desc2 = `✅ **${messages.size}** messages sur **${num}** ont été supprimés`,
						desc3 = `⚠ **${messages.size}** message sur **${num}** a été supprimé`,
						desc4 = `⚠ **${messages.size}** messages sur **${num}** ont été supprimés`,
						desc5 = `❌ Aucun message n'a été supprimé`,
						desc;
					
					if (messages.size === num && messages.size <= 1) desc = desc1;
					if (messages.size === num && messages.size > 1) desc = desc2;
					if (messages.size !== num && messages.size <= 1) desc = desc3;
					if (messages.size !== num && messages.size > 1) desc = desc4;
					if (messages.size === 0) desc = desc5;
					
					cleared.setDescription(desc);
					
					message.channel.send(cleared).then(akira => {
						akira.delete({timeout: 4000}).catch(console.error);
					}).catch(console.error);
				}).catch(console.error);
			}
			
			if (msgToArray.length === 2) {
				let arg = msgToArray[1],
					channel = message.mentions.channels.first(),
					user = message.mentions.users.first();
				
				if (isNaN(num) || num < 1 || num > 100) return message.channel.send(errorBadNum).catch(console.error);
				
				if (!channel) channel = message.guild.channels.resolve(arg);
				if (!user) user = bot.users.resolve(arg);
				
				if (!channel && !user) return message.channel.send(errorSyntaxe).catch(console.error);
				
				let messagesToDelete;
				
				if (!channel && user) messagesToDelete = message.channel.messages.cache.filter(message1 => message1.author.id === user.id).last(num), channel = message.channel;
				if (channel && !user) messagesToDelete = channel.messages.cache.last(num);
				
				channel.bulkDelete(messagesToDelete).then(messages => {
					
					let desc1 = `✅ **${messages.size}** message sur **${num}** a été supprimé`,
						desc2 = `✅ **${messages.size}** messages sur **${num}** ont été supprimés`,
						desc3 = `⚠ **${messages.size}** message sur **${num}** a été supprimé`,
						desc4 = `⚠ **${messages.size}** messages sur **${num}** ont été supprimés`,
						desc5 = `❌ Aucun message n'a été supprimé`,
						desc;
					
					if (messages.size === num && messages.size <= 1) desc = desc1;
					if (messages.size === num && messages.size > 1) desc = desc2;
					if (messages.size !== num && messages.size <= 1) desc = desc3;
					if (messages.size !== num && messages.size > 1) desc = desc4;
					if (messages.size === 0) desc = desc5;
					
					cleared.setDescription(desc);
					
					message.channel.send(cleared).then(akira => {
						akira.delete({timeout: 4000}).catch(console.error);
					}).catch(console.error);
				}).catch(console.error);
			}
			
			if (msgToArray.length === 3) {
				let arg1 = msgToArray[1],
					arg2 = msgToArray[2],
					channel = message.mentions.channels.first(),
					user = message.mentions.users.first();
				
				if (isNaN(num) || num < 1 || num > 100) return message.channel.send(errorBadNum).catch(console.error);
				
				if (arg1 && !channel) channel = message.guild.channels.resolve(arg1);
				if (arg2 && !user) user = bot.users.resolve(arg2);
				
				if (!channel || (channel && channel.type !== 'text') || !user) return message.channel.send(errorSyntaxe).catch(console.error);
				
				let messagesToDelete = channel.messages.cache.filter(message1 => message1.author.id === user.id).last(num);
				
				channel.bulkDelete(messagesToDelete).then(messages => {
					let desc1 = `✅ **${messages.size}** message sur **${num}** a été supprimé`,
						desc2 = `✅ **${messages.size}** messages sur **${num}** ont été supprimés`,
						desc3 = `⚠ **${messages.size}** message sur **${num}** a été supprimé`,
						desc4 = `⚠ **${messages.size}** messages sur **${num}** ont été supprimés`,
						desc5 = `❌ Aucun message n'a été supprimé`,
						desc;
					
					if (messages.size === num && messages.size <= 1) desc = desc1;
					if (messages.size === num && messages.size > 1) desc = desc2;
					if (messages.size !== num && messages.size <= 1) desc = desc3;
					if (messages.size !== num && messages.size > 1) desc = desc4;
					if (messages.size === 0) desc = desc5;
					
					cleared.setDescription(desc);
					
					message.channel.send(cleared).then(akira => {
						akira.delete({timeout: 4000}).catch(console.error);
					}).catch(console.error);
				}).catch(console.error);
			}
			
		}).catch(console.error);
		
	}
	
	/* MUSIQUE */
	
	let connection;
	if (bot.voice) connection = bot.voice.connections.find(connection2 => connection2.channel.guild.id === message.guild.id);
	
	if (msg === prefix+'join') {
		if (!message.guild.me.hasPermission("CONNECT")) return (
			errorEmbed.setDescription("Il me manque la permission `Se connecter`"),
			message.channel.send(errorEmbed).catch(console.error)
		);
		
		let errorNoChan = new Discord.MessageEmbed()
			.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
			.setTitle('Join')
			.setDescription("❌ Vous devez rejoindre un salon vocal")
			.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
		
		if (!message.member.voice.channel) return message.channel.send(errorNoChan).catch(console.error);
		
		message.member.voice.channel.join().catch(console.error);
		
		if (message.deletable) message.delete().catch(console.error);
	}
	
	if (msg === prefix+'leave') {
		let errorNoChan = new Discord.MessageEmbed()
			.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
			.setTitle('Leave')
			.setDescription("❌ Je ne suis pas dans un salon vocal")
			.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
		
		if (!connection) return message.channel.send(errorNoChan).catch(console.error);
		
		connection.disconnect();
		
		if (message.deletable) message.delete().catch(console.error);
	}
	
	let play = prefix+'play';
	
	if (msg.startsWith(play)) {
		let test = message.guild.me.hasPermission("CONNECT") && message.guild.me.hasPermission("SPEAK"),
			chan = message.member.voice.channel;
		
		if (!connection && !message.guild.me.hasPermission("CONNECT") && !message.guild.me.hasPermission("SPEAK")) return (
			errorEmbed.setDescription("Il me manque les permissions `Se connecter` et `Parler`"),
			message.channel.send(errorEmbed).catch(console.error)
		);
		if (!connection && !message.guild.me.hasPermission("CONNECT") && message.guild.me.hasPermission("SPEAK")) return (
			errorEmbed.setDescription("Il me manque la permission `Se connecter`"),
			message.channel.send(errorEmbed).catch(console.error)
		);
		if (!connection && message.guild.me.hasPermission("CONNECT") && !message.guild.me.hasPermission("SPEAK") && !chan) return (
			errorEmbed.setDescription("Il me manque la permission `Parler`"),
			message.channel.send(errorEmbed).catch(console.error)
		);
		if (!connection && message.guild.me.hasPermission("CONNECT") && !message.guild.me.hasPermission("SPEAK") && chan) return (
			errorEmbed.setDescription("Il me manque la permission `Parler`"),
			message.member.voice.channel.join().catch(console.error),
			message.channel.send(errorEmbed).catch(console.error)
		);
		
		let errorChannelNotJoinable = new Discord.MessageEmbed()
			.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
			.setTitle('Play')
			.setDescription("❌ Je ne peux pas rejoindre ce channel")
			.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true})),
		errorNoChan = new Discord.MessageEmbed()
			.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
			.setTitle('Play')
			.setDescription("❌ Vous devez rejoindre un salon vocal")
			.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true})),
		errorRandom = new Discord.MessageEmbed()
			.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
			.setTitle('Play')
			.setDescription("❌ Une erreur est survenue (merci de contacter `"+molo.tag+"` ou de rejoindre le [serveur support]("+supportInvite+"))")
			.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true})),
		errorNoArg = new Discord.MessageEmbed()
			.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
			.setTitle('Play')
			.setDescription("❌ Il faut indiquer le lien de la musique à jouer (actuellement seuls les liens de vidéos youtube sont supportés)")
			.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true})),
		errorNotYoutubeLink = new Discord.MessageEmbed()
			.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
			.setTitle('Play')
			.setDescription("❌ Il faut indiquer un lien youtube correct")
			.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
		
		if (!connection && test && !chan) return message.channel.send(errorNoChan).catch(console.error);
		if (!connection && test && chan && !chan.joinable) return message.channel.send(errorChannelNotJoinable).catch(console.error);
		if (!connection && test && chan && chan.joinable) connection = await chan.join().catch(console.error);
		
		if (!connection) return message.channel.send(errorRandom).catch(console.error);
		
		let arg = message.content.subword(1);
		
		if (!arg) return message.channel.send(errorNoArg).catch(console.error);
		
		let index = arg.lastIndexOf('/'),
			f = arg.substring(index+1);
		
		if ( (!arg.startsWith("https://www.youtube.com/") && 
			  !arg.startsWith("https://www.youtu.be/")    && 
			  !arg.startsWith("https://youtube.com/")     && 
			  !arg.startsWith("https://youtu.be/")        && 
			  !arg.startsWith("http://www.youtube.com/")  && 
			  !arg.startsWith("http://www.youtu.be/")     && 
			  !arg.startsWith("http://youtube.com/")      && 
			  !arg.startsWith("http://youtu.be/")         && 
			  !arg.startsWith("www.youtube.com/")         && 
			  !arg.startsWith("www.youtu.be/")            && 
			  !arg.startsWith("youtube.com/")             && 
			  !arg.startsWith("youtu.be/")) || !f ) return message.channel.send(errorNotYoutubeLink).catch(console.error);
		
		let connection = connection.play(ytdl(arg, { filter: 'audioonly' }));
		message.delete().catch(console.error);
	}
	
	if (msg === prefix+'pause') {
		let errorNotPlaying = new Discord.MessageEmbed()
			.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
			.setTitle('Play')
			.setDescription("❌ Je ne suis pas en train de jouer de la musique")
			.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true})),
		errorRandom = new Discord.MessageEmbed()
			.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
			.setTitle('Play')
			.setDescription("❌ Une erreur est survenue (merci de contacter `"+molo.tag+"` ou de rejoindre le [serveur support]("+supportInvite+"))")
			.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
		
		if (!connection || !connection.dispatcher) return message.channel.send(errorNotPlaying).catch(console.error);
		
		message.delete().catch(console.error);
		
		if (molo.isGay) return message.channel.send(errorRandom).catch(console.error);
		
		if (connection.dispatcher.paused) {
			connection.dispatcher.resume();
		} else {
			connection.dispatcher.pause();
		}
	}
	
	if (msg === prefix+'stop') {
		let errorNotPlaying = new Discord.MessageEmbed()
			.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
			.setTitle('Play')
			.setDescription("❌ Je ne suis pas en train de jouer de la musique")
			.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true})),
		errorRandom = new Discord.MessageEmbed()
			.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
			.setTitle('Play')
			.setDescription("❌ Une erreur est survenue (merci de contacter `"+molo.tag+"` ou de rejoindre le [serveur support]("+supportInvite+"))")
			.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
		
		if (!connection) return message.channel.send(errorNotPlaying).catch(console.error);
		
		message.delete().catch(console.error);
		
		if (!connection.dispatcher) return message.channel.send(errorRandom).catch(console.error);
		
		connection.dispatcher.end();
	}
	
});


//admins
bot.on('message', message => {
	if (message.author.bot) return;
	
	if (!whitelist.includes(message.author.id) && message.author.id !== moloId) return;
	
	let molo = bot.users.resolve(moloId),
		msg = message.content.toLowerCase();
	
	let help = prefix+'help ';
	
	if (msg.startsWith(help)) {
		let cmd = msg.subword(1);
		
		if (cmd === 'admin') {
			let helpAdmin = new Discord.MessageEmbed()
				.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
				.setColor(8129291)
				.setTitle("**Page d'aide des commandes d'administration**")
				.addField('`'+prefix+'stop`', "Permet d'arrêter le bot")
				.addField('`'+prefix+'stop2`', "Arrêt d'urgence (le bot s'arrête directement)")
				.addField('`'+prefix+'reload`', "Permet de redémarrer le bot")
				.addField('`'+prefix+'exec [code]`', "Permet d'exécuter du code (js)")
				.addField('`'+prefix+'send ["message" | code]`', "Incluez des `\"` si vous voulez envoyer du texte")
				.addField('`'+prefix+'code`', "Envoie le code du self")
				.addField('`'+prefix+'beta`', "Envoie la vesion beta du self")
				.addField('`'+prefix+'code2`', "Envoie le code en format texte")
				.addField('`'+prefix+'beta2`', "Envoie la vesion beta en format texte")
				.addField('`'+prefix+'cpu`', "Permet d'obtenir des informations sur le processeur")
				.addField('`'+prefix+'ram`', "Permet d'obtenir des informations sur la mémoire")
				.addField('`'+prefix+'graph`', "Permet d'obtenir des informations sur la carte graphique")
				.addField('`'+prefix+'wifi`', "Permet d'obtenir des informations sur le wifi")
				.addField(inv, invites)
				.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
			
			message.channel.send(helpAdmin).catch(console.error);
		}
	}
	
	if (msg === prefix+'shutdown' || msg === prefix+'deco' || msg === prefix+'déco' || msg === prefix+'off') {
		let stop1 = new Discord.MessageEmbed()
			.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
			.setTitle('Shutdown')
			.setDescription("Arrêt du bot en cours")
			.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
		
		message.channel.send(stop1).then(msg => {
			let stop2 = new Discord.MessageEmbed()
				.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
				.setTitle('Shutdown')
				.setDescription("Arrêt du bot en cours.")
				.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
			
			msg.edit(stop2).then(msg => {
				let stop3 = new Discord.MessageEmbed()
					.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
					.setTitle('Shutdown')
					.setDescription("Arrêt du bot en cours..")
					.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
				
				msg.edit(stop3).then(msg => {
					let stop4 = new Discord.MessageEmbed()
						.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
						.setTitle('Shutdown')
						.setDescription("Arrêt du bot en cours...")
						.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
					
					msg.edit(stop4).then(msg => {
						let stop = new Discord.MessageEmbed()
							.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
							.setTitle('Shutdown')
							.setDescription("✅ Le bot s'est correctement arrêté")
							.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
						
						msg.edit(stop).then(function() {
							console.log('bot éteint');
							bot.destroy();
							process.exit();
						}).catch(console.error);
						
					}).catch(console.error);
				}).catch(console.error);
			}).catch(console.error);
		}).catch(console.error);
	}
	
	if (msg === prefix+'reload') {
		let reload1 = new Discord.MessageEmbed()
			.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
			.setTitle('Reload')
			.setDescription("Redémarrage du bot en cours")
			.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
		
		message.channel.send(reload1).then(msg => {
			let reload2 = new Discord.MessageEmbed()
				.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
				.setTitle('Reload')
				.setDescription("Redémarrage du bot en cours.")
				.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
			
			msg.edit(reload2).then(msg => {
				let reload3 = new Discord.MessageEmbed()
					.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
					.setTitle('Reload')
					.setDescription("Redémarrage du bot en cours..")
					.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
				
				msg.edit(reload3).then(msg => {
					let reload4 = new Discord.MessageEmbed()
						.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
						.setTitle('Reload')
						.setDescription("Redémarrage du bot en cours...");
					
					msg.edit(reload4).then(msg => {
						let reload = new Discord.MessageEmbed()
							.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
							.setTitle('Reload')
							.setDescription("✅ Le bot s'est correctement redémarré")
							.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
						
						let error = new Discord.MessageEmbed()
							.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
							.setTitle('Reload')
							.setDescription("❌ Le bot n'a pas pu être redémarré")
							.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
						
						try {
							msg.edit(reload).catch(console.error);
							delete require.cache[require.resolve('./'+codeOrBeta+'.js')];
							bot.destroy();
							const code = require('./'+codeOrBeta+'.js');
							code.run(bot, token);
						} catch(e) {
							if (e.message === `${codeOrBeta}.run is not a function`) {
								msg.edit(reload).catch(console.error);
							} else {
								msg.edit(error).catch(console.error);
								console.log(e);
							}
						}
						
					}).catch(console.error);
				}).catch(console.error);
			}).catch(console.error);
		}).catch(console.error);
	}
	
	let exec = prefix+'exec';
	
	if (msg.startsWith(exec)) {
		let code = message.content.subword(1);
		
		let execEmbed = new Discord.MessageEmbed()
			.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
			.setTitle('Exec')
			.setDescription("Je vais exécuter le code ```js\n"+code+"```")
			.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true})),
		errorEmbed = new Discord.MessageEmbed()
			.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
			.setTitle('Exec')
			.setDescription("❌ Vous devez indiquer le code à exécuter")
			.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
		
		if (!code) return message.channel.send(errorEmbed).catch(console.error);
		
		message.channel.send(execEmbed).then(msg1 => {
			try {
				eval(code);
				
				execEmbed.setDescription(execEmbed.description+"\n✅ Le code fonctionne");
				msg1.edit(execEmbed).catch(console.error);
			} catch(error) {
				execEmbed.setDescription(execEmbed.description+"\n❌ Le code ne fonctionne pas :```"+error+"```");
				msg1.edit(execEmbed).catch(console.error);
			}
		}).catch(console.error);
	}
	
	let send = prefix+'send';
	
	if (msg.startsWith(send)) {
		let str = message.content.subword(1);
		
		let code = "message.channel.send("+str+").catch(console.error);";
		
		if (message.deletable) message.delete().catch(console.error);
		try {
			eval(code);
		} catch (err) {
			let errorEmbed = new Discord.MessageEmbed()
				.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
				.setTitle('Send')
				.setDescription("❌ Je ne peux pas envoyer le message suivant : ```"+str+"```Erreur : ```"+err+"```")
				.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
			
			message.channel.send(errorEmbed).catch(console.error);
		}
	}
	
	if (msg === prefix+'code') {
		if (message.deletable) message.delete().catch(console.error);
		message.author.send({
			files: [{
				attachment: 'code.js',
				name: 'code.js'
			}]
		}).catch(console.error);
	} else if (msg === prefix+'beta') {
		if (message.deletable) message.delete().catch(console.error);
		message.author.send({
			files: [{
				attachment: 'beta.js',
				name: 'beta.js'
			}]
		}).catch(console.error);
	} else if (msg === prefix+'code2') {
		if (message.deletable) message.delete().catch(console.error);
		message.author.send({
			files: [{
				attachment: 'code.js',
				name: 'code.txt'
			}]
		}).catch(console.error);
	} else if (msg === prefix+'beta2') {
		if (message.deletable) message.delete().catch(console.error);
		message.author.send({
			files: [{
				attachment: 'beta.js',
				name: 'beta.txt'
			}]
		}).catch(console.error);
	}
	
	if (msg === prefix+'cpu' || msg === prefix+'processeur') {
		si.cpu().then(data => {
			let keys = Object.keys(data),
				ggg;
			
			for (let key of keys) {
				if (key !== "cache") {
					let value = data[key],
						key2 = key,
						value2 = value;
					if (typeof key === "string") key2 = `"${key}"`;
					if (typeof value === "string") value2 = `"${value}"`;
					
					if (value) {
						if (ggg === undefined) {
							ggg = `${key2} : ${value2}\n`;
						} else {
							ggg += `${key2} : ${value2}\n`;
						}
					}
				}
			}
			
			let cpuEmbed = new Discord.MessageEmbed()
				.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
				.setTitle('CPU')
				.setDescription("Informations sur le processeur : ```js\n"+ggg+"```")
				.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
			
			message.channel.send(cpuEmbed).catch(console.error);
		});
	}
	
	if (msg === prefix+'ram' || msg === prefix+'mem' || msg === prefix+'memoire' || msg === prefix+'memory' || msg === prefix+'mémoire') {
		si.mem().then(data => {
			let keys = Object.keys(data),
				ggg;
			
			for (let key of keys) {
				if (key !== "cache") {
					let value = data[key],
						key2 = key,
						value2 = value;
					if (typeof key === "string") key2 = `"${key}"`;
					if (typeof value === "string") value2 = `"${value}"`;
					if (typeof value === "number") value2 = `${value.toLocaleString("fr-FR").replace(/,/g, " ")} ${value <= 1 ? "octet" : "octets"}`;
					if (typeof value2 === "string" && !value2.startsWith('"') && !value2.endsWith('"')) value2 = `"${value2}"`;
					
					if (value) {
						if (ggg === undefined) {
							ggg = `${key2} : ${value2}\n`;
						} else {
							ggg += `${key2} : ${value2}\n`;
						}
					}
				}
			}
			
			let cpuEmbed = new Discord.MessageEmbed()
				.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
				.setTitle('RAM')
				.setDescription("Informations sur la RAM : ```js\n"+ggg+"```")
				.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
			
			message.channel.send(cpuEmbed).catch(console.error);
		});
	}
	
	if (msg === prefix+'graph' || msg === prefix+'graphic' || msg === prefix+'graphics' || msg === prefix+'graphique' || msg === prefix+'graphiques') {
		si.graphics().then(data => {
			let controllersKeys = Object.keys(data.controllers[0]),
				displaysKeys = Object.keys(data.displays[0]),
				ggg = "";
			
			for (let key of controllersKeys) {
				let value = data.controllers[0][key];
				if (typeof key === "string") key = `"${key}"`;
				if (typeof value === "string") value = `"${value}"`;
				
				if (value) {
					if (!ggg.startsWith("controllers :")) {
						ggg = `controllers :\n  ${key} : ${value}\n`;
					} else {
						ggg += `  ${key} : ${value}\n`;
					}
				}
			}
			for (let key of displaysKeys) {
				let value = data.displays[0][key],
					key2 = key,
					value2 = value;
				if (typeof key === "string") key2 = `"${key}"`;
				if (typeof value === "string") value2 = `"${value}"`;
				
				if (value) {
					if (key === "vendor") {
						ggg += `displays :\n  ${key2} : ${value2}\n`;
					} else {
						ggg += `  ${key2} : ${value2}\n`;
					}
				}
			}
			
			let cpuEmbed = new Discord.MessageEmbed()
				.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
				.setTitle('Graphics')
				.setDescription("Informations sur la carte graphique : ```js\n"+ggg+"```")
				.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
			
			message.channel.send(cpuEmbed).catch(console.error);
		});
	}
	
	if (msg === prefix+'wifi' || msg === prefix+'internet') {
		si.wifiNetworks().then(data => {
			let ggg;
			
			for (let wifi of data) {
				let keys = Object.keys(wifi);
				
				for (let key of keys) {
					if (key !== "cache") {
						let value = wifi[key],
							key2 = key,
							value2 = value;
						if (typeof key === "string") key2 = `"${key}"`;
						if (typeof value === "string") value2 = `"${value}"`;
						
						if (value) {
							if (ggg === undefined) {
								ggg = `${key2} : ${value2}\n`;
							} else {
								ggg += `${key2} : ${value2}\n`;
							}
						}
					}
				}
			}
			
			let wifiEmbed = new Discord.MessageEmbed()
				.setAuthor("Demande de "+message.author.tag, message.author.displayAvatarURL({dynamic: true}))
				.setTitle('Wi-Fi')
				.setDescription("Informations sur le wifi : ```js\n"+ggg+"```")
				.setFooter('bot by '+molo.tag, molo.displayAvatarURL({dynamic: true}));
			
			message.channel.send(wifiEmbed).catch(console.error);
		});
	}
	
});

//stop2
bot.on('message', message => {
	if (!whitelist.includes(message.author.id) && message.author.id !== moloId) return;
	
	let molo = bot.users.resolve(moloId),
		msg = message.content.toLowerCase();
	
	let stop2 = prefix+'stop2';
	
	if (msg === stop2) {
		process.exit();
	}
});