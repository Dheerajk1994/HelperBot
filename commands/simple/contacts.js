const commando = require('discord.js-commando');
const mysql = require('mysql');
var connection;

class ContactsCommand  extends commando.Command{
    constructor(client)
        {
            super(client,
                {name: 'contacts', group: 'simple', memberName: 'contacts', description: 'Shows contac info.'}
                );
            connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: 'password123',
                database: 'contactsdb'
            });

            connection.connect(err =>{
                if(err) throw err;
                console.log("Connected to database."); 
                connection.query("SHOW TABLES", console.log);
            });
        };

        async run(message, args) {
            let msgArgs = message.content.split(' ');
            if(msgArgs[1] === 'help'){
                return message.channel.sendMessage('!contacts <action> <param>' + '\n' +
                'Actions: ' + '\n' +
                'add <name>     //adds a new entry into contacts' + '\n'+
                'edit <name> <row> <info>   //edits already existing info eg: !contacts edit john email john@gmail.com' + '\n' +
                'get <name>     //fetches contact info' + '\n'+
                'list      //list all entries' + '\n'+
                'delete <name>      //deletes an entry'
                );
            }
            if(msgArgs[1] == 'add' && msgArgs.length === 3){//ADDS A ENTRY
                let sql;
                sql = `INSERT INTO contactinfo (nickname) VALUES ('${msgArgs[2]}')`;
                connection.query(sql, function(err, result){
                    if(err) console.log(err);
                    else return message.channel.sendMessage("Successfully added " + msgArgs[2] + " to contact. Use '!contacts edit' to edit fields.");                        
                });
                return message.channel.sendMessage("Something went wrong!");
            }
            if(msgArgs[1] === 'edit'){//EDITS ENTRY

            }
            if(msgArgs[1] === 'get'){//GETS AN ENTRY

            }
            if(msgArgs[1] === 'list'){//LISTS ALL ENTRIES

            }
            if(msgArgs[1] === 'delete'){//DELETES AN ENTRY

            }
            return message.channel.sendMessage("Poor syntax. Type '!contacts help' for more info.");
        }
}

module.exports = ContactsCommand;