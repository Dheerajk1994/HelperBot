const commando = require('discord.js-commando');

class ClearChannelCommand  extends commando.Command{

    constructor (client) { 
        super(client, {name: 'clearchannel', group: 'simple', memberName: 'clearchannel', description: 'Clears all the messages from the current channel.'}
        );
    }

    async run(message, args){
        message.channel.sendMessage("Clearing channel... hold on!");
        var fetchedMsgs;
        do{
            fetchedMsgs = await message.channel.fetchMessages({limit: 100});
            message.channel.bulkDelete(100)
                .catch(console.error);
       }while(fetchedMsgs.size >= 2);

    }

}

module.exports = ClearChannelCommand;