const Commando = require("discord.js-commando");
const bot = new Commando.Client();
const TOKEN = 'NTQyMTg1OTk1ODc0MDc0NjU2.DzqWWA.Bgm4DEcOXvIsE7r_EnRnsh5O0hk';

bot.registry.registerGroup('simple', 'Simple');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + '/commands');

bot.on("ready", function(){
    console.log("Bot Ready!");
});


bot.on("message", function(message){
    if(!message.author.bot && message.content.toLowerCase() == "hello" || message.content.toLowerCase() == "hi"){
        if(message.author.username != "Scaboodle"){
            message.channel.sendMessage("Hello " + message.author + "!");
        }        
        else{
            message.channel.sendMessage("Fook off "+ message.author + "!");
        }
    }
});

bot.login(TOKEN);   