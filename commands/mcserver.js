module.exports= {
    Name: "mcserver",
    Description: "Gets Info",
    execute(message, args){
        if(!args[1]) return message.channel.send('You must type a minecraft server ip')

        ping(args[1], (error, reponse) =>{
            if(error) throw error
            const Embed = new Discord.MessageEmbed()
            .setTitle('Server Status')
            .addField('Server IP', reponse.host)
            .addField('Server Version', reponse.version)
            .addField('Online Players', reponse.onlinePlayers)
            .addField('Max Players', reponse.maxPlayers)
           
            message.channel.send(Embed)
        })
    }
}