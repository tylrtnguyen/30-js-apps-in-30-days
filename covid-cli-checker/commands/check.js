const KeyManager = require('../lib/KeyManager');
const CovidAPI = require('../lib/CovidAPI');

const check = {
    async checkCases(cmd) {
        try {
            const keyManager = new KeyManager();
            const key = keyManager.getKey();
            const api = new CovidAPI(key);

            const caseData = await api.getCases(cmd.country, cmd.date);

            console.log(caseData);
        }
        catch (err) {
            console.log(err.message.red);
        }
      
    },
    async compareDate(cmd) {
        try {
            const keyManager = new KeyManager();
            const key = keyManager.getKey();
            const api = new CovidAPI(key)

            const compareData = await api.compareDate(cmd.country, cmd.date1, cmd.date2)

            console.log(compareData)
        }
        catch (err) {
            console.log(err.message.red)
        }
        
    },
    async checkStatistics(cmd) {
        try {
            const keyManager = new KeyManager();
            const key = keyManager.getKey();
            const api = new CovidAPI(key)

            const statistics = await api.checkStatistics(cmd.country)

            console.log(statistics)
        }
        catch (err) {
            console.log(err.message.red)
        }
    }

}

module.exports = check;
