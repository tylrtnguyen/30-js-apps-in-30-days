const program = require('commander');
const check = require('../commands/check');

const today = new Date();
// getMonth() – Provides current month values 0-11. Where 0 for Jan and 11 for Dec. So added +1 to get result.
const date = today.getFullYear()+'-'+'0'+(today.getMonth()+1)+'-'+today.getDate();

program
    .command('cases')
    .description('Check the number of confirmed cases for current day')
    .option('--country <country>', 'Add a specific country in CSV format', 'canada')
    .option('--date <date>', 'Add the custom date', date)
    .action(check.checkCases)

program
    .command('statistics')
    .description('Check the statistics data of a country')
    .option('--country <country>', 'Add a specific country in CSV format', 'canada')
    .action(check.checkStatistics)

program
    .command('compare')
    .description('Compare the difference between two given dates')
    .option('--country <country>', 'Add a specific country in CSV format', 'canada')
    .option('--date1 <date1>', 'Add the starting date', '2020-04-01')
    .option('--date2 <date2>', 'Add the stopped date', '2020-04-29')
    .action(check.compareDate)

program.parse(process.argv)