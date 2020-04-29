const ConfigStore = require('configstore');
const packageJson = require('../package.json')

class KeyManager {
    constructor() {
        this.conf = new ConfigStore(packageJson.name);
    }

    setKey(key) {
        this.conf.set('apiKey', key)
        return key
    }

    getKey() {
        const key = this.conf.get('apiKey');
        if(!key){
            throw new Error('No API key -- Get a key at: https://rapidapi.com/api-sports/api/covid-193');
        }
        return key;
    }

    removeKey() {
        const key = this.conf.get('apiKey');
        if(!key){
            throw new Error('No API key -- Get a key at: https://rapidapi.com/api-sports/api/covid-193')
        }
        this.conf.delete('apiKey');
        return;
    }
}

module.exports = KeyManager