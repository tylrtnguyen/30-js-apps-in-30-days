const KeyManager = require('../lib/KeyManager');
const inquirer = require('inquirer');
const colors = require('colors');
// Custom validator
const { isRequired } = require('../utils/validation')

const key = {
    async set() {
        const keyManager = new KeyManager()
        const input = await inquirer.prompt([
            {
                type: 'input',
                name: 'apiKey',
                validate: isRequired,
                message: 'Enter API Key '.green + 'https://rapidapi.com/api-sports/api/covid-193'
            }
        ]);
        const key = keyManager.setKey(input.apiKey)
        if(key){
            console.log('API Key already set')
        }
    },
    show() {
        try {
            const keyManager = new KeyManager();
            const key = keyManager.getKey();
            console.log('Rapid API Key: ' + key.yellow)
        }
        catch (err) {
            console.log(err.message.red)
        }
    },
    remove() {
        try {
            const keyManager = new KeyManager();
            const key = keyManager.removeKey();

            console.log('Key removed'.bgBlue)
        }
        catch (err) {
            console.log(err.message.red)
        }
    }   
}

module.exports = key