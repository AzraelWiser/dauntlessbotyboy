const Discord = require('Discord.js');
const bot = new Discord.Client();
const token = "NzExMjQ2ODQwNTE5MDY1NjAx.XsAQiA.LRbqbfis_YX9xV3POM8fdtxSqFk";
const PREFIX = "-";
const ping = require('minecraft-server-util')
const fs = require('fs');

bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    bot.commands.set(command.name, command)
}
bot.on("ready", () => {
    console.log("Ready!")
})
bot.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(channel => channel.name === "where-commands-are-run");
    if (!channel) return;
    channel.send(`Welcome to Dauntless ${member}, Please follow our rules! Enjoy!`)
});

bot.on("message", async message => {
    if (message.author.bot) return;
    let args = message.content.substring(PREFIX.length).split(" ");
    switch (args[0]) {
        case 'mcserver':
            if (!args[1]) return message.channel.send('You must type a minecraft server ip')

            ping(args[1], (error, reponse) => {
                if (error) throw error
                const Embed = new Discord.MessageEmbed()
                    .setTitle('Server Status')
                    .addField('Server IP', reponse.host)
                    .addField('Server Version', reponse.version)
                    .addField('Online Players', reponse.onlinePlayers)
                    .addField('Max Players', reponse.maxPlayers)

                message.channel.send(Embed)
            })
            break;
    }
})

bot.login(token)