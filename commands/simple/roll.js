const commando = require('discord.js-commando');

class RollCommand extends commando.Command{

    constructor(client){
        super(client, 
            {name: 'roll', 
             group: 'simple',
             memberName: 'roll',
             description: 'Rolls a value between 0 and 100'}            
            );   
    }

    async run(message, args){
        if(args <= 0){
            args = 6;
        }
        var chance = Math.floor(Math.random() * args + 1);
        message.channel.sendMessage("You rolled " + chance + "!");        
    }

}

module.exports = RollCommand;