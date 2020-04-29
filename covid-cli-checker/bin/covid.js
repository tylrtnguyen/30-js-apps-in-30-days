#!/usr/bin/env node
const program = require('commander');
// Get package.json file
const packageJson = require('../package.json')

// Commander setup
program
    .version(packageJson.version)
    .command('key', 'Manage API Key -- https://rapidapi.com/api-sports/api/covid-193')
    .command('check', 'Check COVID-19 data')
    .command('history', 'Return the history of confirmed cases in the last week')
    .parse(process.argv);

