const axios = require('axios');
const colors = require('colors');

class CovidAPI {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://covid-193.p.rapidapi.com/'
    }

    // Get data for country in a day
    async getCases(country, date) {
        try {
            const config = {
                headers: {
                    "Content-Type":"application/octet-stream",
                    "x-rapidapi-host":"covid-193.p.rapidapi.com",
                    "x-rapidapi-key":this.apiKey
                }
            }
            const res = await axios.get(`${this.baseUrl}/history?country=${country}&day=${date}`, config)

            // Get the latest update
            const latestResult = res.data.response[0]
            // Format output
            let output = '';
            output += `Country: ${latestResult.country.green}\n`;
            output += `Day and time: ${latestResult.time.blue}\n`;
            output += `New cases: ${latestResult.cases.new}\n`;
            output += `Active: ${latestResult.cases.active}\n`;
            output += `New deaths: ${latestResult.deaths.new}\n`;
            output += `Total test: ${latestResult.tests.total}`;
            return output
        }
        catch (err) {
            handleAPIError(err)
        }
    }

    // Check Statistics
    async checkStatistics(country){
        try {
            const config = {
                headers: {
                    "Content-Type":"application/octet-stream",
                    "x-rapidapi-host":"covid-193.p.rapidapi.com",
                    "x-rapidapi-key":this.apiKey
                }
            }

            const res = await axios.get(`${this.baseUrl}/statistics?country=${country}`, config)
            const result = res.data.response[0]
            
            // Format output
            let output = '';
            output += `Country: ${result.country.green}\n`
            output += `Day and time: ${result.time.blue}\n`
            output += `***CASES***`.cyan + '\n'
            output += `New: ${result.cases.new}\n`
            output += `Active: ${result.cases.active}\n`
            output += `Critical: ${result.cases.critical}\n`
            output += `Recovered: ${result.cases.recovered}\n`
            output += `Total: ${result.cases.total}\n`
            output += `***DEATHS***`.magenta + '\n'
            output += `New: ${result.deaths.new}\n`
            output += `Total: ${result.deaths.total}\n`
            output += `***TESTS***`.yellow + '\n'
            output += `Total: ${result.tests.total}`
            return output
        }
        catch (err) {
            console.log(err.message.red)
        }
    }

    // Compare two dates
    async compareDate(country, date1, date2) {
        try {
            const config = {
                headers: {
                    "Content-Type":"application/octet-stream",
                    "x-rapidapi-host":"covid-193.p.rapidapi.com",
                    "x-rapidapi-key":this.apiKey
                }
            };

            const res1 = await axios.get(`${this.baseUrl}/history?country=${country}&day=${date1}`, config);
            const res2 = await axios.get(`${this.baseUrl}/history?country=${country}&day=${date2}`, config);

            const resultStart = res1.data.response[0];
            const resultStop = res2.data.response[0];
            // Data modifying
            const caseDifference = resultStop.cases.active - resultStart.cases.active;
            const testDifference = resultStop.tests.total - resultStart.cases.total;
            const deathDifference = resultStop.deaths.total - resultStart.deaths.total;
            // Output formatting
            let output = '';
            output += `Country: ${resultStart.country.green}\n`;
            output += `From: ${resultStart.day}\n`;
            output += `To: ${resultStop.day}\n`;
            output += `Cases difference: ${caseDifference}\n`;
            output += `Tests difference: ${testDifference}\n`;
            output += `Deaths difference: ${deathDifference}`;
            // Return output
            return output
        }
        catch (err) {
            handleAPIError(err)
        }
    }
}

function handleAPIError(err) {
    if(err.response.status === 401) {
        throw new Error('Your API key is invalid - Get one at https://rapidapi.com/api-sports/api/covid-193')
    }
    else if(err.response.status === 404) {
        throw new Error('Your API is not responding');
    }
    else {
        throw new Error('Something wrong happened');
    }
}

module.exports = CovidAPI;