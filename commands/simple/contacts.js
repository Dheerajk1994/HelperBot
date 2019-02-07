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
            if(msgArgs[1] == 'add' && msgArgs.length >= 5){//ADDS AN ENTRY
                let sql;
                sql = `INSERT INTO contactinfo (nickname, firstname, lastname, phone, email) VALUES ('${msgArgs[2].toLowerCase()}', '${msgArgs[3]}', '${msgArgs[4]}', '${msgArgs[5]}', '${msgArgs[6]}')`;
                connection.query(sql, function(err, result){
                    if(err){ console.log(err); message.channel.sendMessage("ERROR: Maybe that name already exists in the db!");}
                    else { return message.channel.sendMessage("Successfully added " + msgArgs[2].toLowerCase()
                     + " to contact. Use '!contacts edit' to edit fields."); }                       
                });
                return;
            }
            if(msgArgs[1] === 'edit'){//EDITS AN ENTRY

            }
            if(msgArgs[1] === 'get' && msgArgs.length === 3){//GETS AN ENTRY
                let sql = `SELECT * FROM contactinfo WHERE nickname = '${msgArgs[2].toLowerCase}'`;
                connection.query(sql, function(err, result, fields){
                    if(err){
                        onsole.log(err); 
                        message.channel.sendMessage("Uh oh! Couldnt find that nickname in the db!");
                    }
                    else{
                        var msg = '';
                        /*msg += "Firstname: " + result.firstname + '\n' +
                               "Lasttname: " + result.lastname + '\n' + 
                               "Phone    : " + result.phone + '\n' +
                               "Email    : " + result.email + '\n';*/
                        message.channel.sendMessage(result[0].nickname);
                    }
                });
                return;
            }
            if(msgArgs[1] === 'listall'){//LIST ALL ENTRIES
                message.channel.sendMessage("Entries in contacts list:");
                let sql = 'SELECT * FROM contactinfo ';
                connection.query(sql, function(err, rows){
                    if(err){
                        console.log(err); 
                        message.channel.sendMessage("error");
                    }
                    else
                    var i;
                    var msg = '';
                    for(i = 0; i < rows.length; i++){
                        msg += rows[i].nickname + '\n';
                    }
                    message.channel.sendMessage(msg);
                });
                return;
            }
            if(msgArgs[1] === 'delete'){//DELETES AN ENTRY

            }
            return message.channel.sendMessage("Poor syntax. Type '!contacts help' for more info.");
        }
}

module.exports = ContactsCommand;