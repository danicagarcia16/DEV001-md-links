#!/usr/bin/env node

const chalk = require('chalk');
const { mdLinks } = require('./index.js');
const { totalLinks, uniqueLinks, brokenLinks } = require('./clistat.js');
const error = require('./error.js');



const option = process.argv.slice(2);

const userPath = process.argv[2];

const validate = option.includes('--validate') 
const stats = option.includes('--stats') 



mdLinks(userPath, { validate })
    .then(resolve => {

        if (validate && stats) {
            console.log(chalk.bold.cyan(totalLinks(resolve)));
            console.log(chalk.bold.cyan(uniqueLinks(resolve)));
            console.log(chalk.bold.red(brokenLinks(resolve)));
        } else if (validate) {
            console.log(resolve.flat());
        } else if (stats) {
            console.log(chalk.bold.cyan(totalLinks(resolve)));
            console.log(chalk.bold.cyan(uniqueLinks(resolve)));
        } 
         else{
            return mensajeError('THIS FILE HAS NO LINKS TO SHOW, TRY ANOTHER PATH')
        }
    })
    .catch((reject) => {
         {
            return mensajeError('THIS PATH DOES NOT EXIST, TRY ANOTHER ONE')
        }
    });