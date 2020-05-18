const Discord = require('discord.js');
const bot = new Discord.Client();
const token = "NzExMjQ2ODQwNTE5MDY1NjAx.XsFciA.cOWBzDuZftX_QEjWUl6tD5RVHiw";
const PREFIX = "-";
const ping = require('minecraft-server-util')

bot.on("ready", () => {
    console.log("Ready!")
})
bot.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(channel => channel.name === "welcome");
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
        case "ping":
        message.channel.send("Pinging......").then(m => {
            let ping = m.createdTimestamp - message.createdTimestamp
            let choices = ["Is this really my ping?", "That bad?", "How is it?", "I wasn\'t expecting that."]
            let response =  choices[Math.floor(Math.random() * choices.length)]
                m.edit(`${response}: Bot Latency ${ping}, API Latency: ${Math.round(bot.ping)}`)});
        break;
    }
})

bot.login(token)
