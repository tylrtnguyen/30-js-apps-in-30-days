## COVID-19 CLI - Day#1
### Command line interface written in Node.js to check COVID-19 data
### API Used: https://rapidapi.com/api-sports/api/covid-193
#### Usage
1. git clone <repo_URL>
2. npm install
3. npm link
#### Commands
1. Help Command
- covid19 --help || covid19 -h
2. Check version
- covid19 --version || covid19 -V
3. Get the new cases by country (it's gonna be canada and today by default)
- covid19 check cases --country <country> --date <date>
4. Compare two different dates
- covid19 check compare --country <country> --date1 <date1> --date2 <date2>
5. Get the statistics data
- covid19 check statistics --country <country>
##### This project is inspired by the Coindex CLI by Brad Traversy
  
