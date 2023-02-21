function loadEvents(client) {
    const fs = require('fs');

    const folders = fs.readdirSync('./Events');
    for (const folder of folders) {
        const files = fs.readdirSync(`./Events/${folder}`).filter(file => file.endsWith('.js'));

        for (const file of files) {
            const event = require(`../Events/${folder}/${file}`);
            if (event.rest) {
                if (event.once)
                    client.rest.once(event.name, (...args) => event.execute(...args, client));
                else
                    client.rest.on(event.name, (...args) => event.execute(...args, client));
            } else {
                if (event.once)
                    client.on(event.name, (...args) => event.execute(...args, client));
                else
                    client.on(event.name, (...args) => event.execute(...args, client));
            }
            console.log(`Loaded event ${event.name} from file ${file}`);
            continue;
        }
    }
    console.log('Loaded all events!');
}

module.exports = {loadEvents};
