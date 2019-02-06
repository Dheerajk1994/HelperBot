const commando = require('discord.js-commando');

class RoleCommand extends commando.Command{

    constructor(client){
        super(client, 
            {name: 'role', 
             group: 'simple',
             memberName: 'role',
             description: 'Roles a value between 0 and 100'}            
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

module.exports = RoleCommand;