function loadCommands(client) {
    const fs = require('fs');
    const commandsArray = [];
  
    const commandsFolder = fs.readdirSync('./Commands');
    for (const folder of commandsFolder) {
      const commandFiles = fs.readdirSync(`./Commands/${folder}`).filter(file => file.endsWith('.js'));
  
      for (const file of commandFiles) {
        const commandFile = require(`../Commands/${folder}/${file}`);
        
        const properties = {folder, ...commandFile};
        client.commands.set(commandFile.data.name, commandFile);
  
        commandsArray.push(commandFile.data.toJSON());
  
        console.log(`${file} loaded.`);
      }
    }
    client.application.commands.set(commandsArray);
  
    console.log(`Loaded all commands!`);
  }

module.exports = {loadCommands};