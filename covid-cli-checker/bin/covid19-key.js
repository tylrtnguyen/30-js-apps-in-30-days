const program = require('commander');
const key = require('../commands/key');

program
    .command('set')
    .description('Set API Key -- https://rapidapi.com/api-sports/api/covid-193')
    .action(key.set)

program
    .command('show')
    .description('Show API Key')
    .action(key.show)

program
    .command('remove')
    .description('Remove API Key')
    .action(key.remove)

program.parse(process.argv)