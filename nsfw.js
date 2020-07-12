const { get } = require('https');
const { measureMemory } = require('vm');
const { parse } = require('path');

module.exports.run = async(client, message, args) => {

    let avatarbot = client.user.avatarURL({dynamic: true});

    let nonsfw = new Discord.MessageEmbed()
    .setColor(couleur)
    .setTitle("NSFW ERREUR")
    .setDescription(message.channel.toString()+" n'est pas un channel **NSFW** !")
    .setFooter('Rick🛸 ©️ Copyright : Atsuki \\/ Needles', avatarbot)

    let nonsfw = new Discord.MessageEmbed()
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
                .setTitle("NSFW ERREUR")
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

module.exports.help = {
    name: "neko"
};