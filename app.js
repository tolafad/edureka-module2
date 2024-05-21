const fs = require('fs');
var argv = require('yargs');

// require express
const express = require('express');
// create object and add port
const app = express();
const port = 6500;

argv

    .usage('Usage: $0 <command> [options]')
    .command('filename', 'Enter file name', (yargs) => {

        // command options

        return yargs.option('name')
    },


        ({ name }) => {
            console.log("filename ================================= " + name);
            let content = [];

            try {

                var c = fs.readFileSync('.filenames', { encoding: "utf8" }); //read array from file

                if (c.length > 0) {
                    content = JSON.parse(c);
                }

                if (content.indexOf(name) === -1) {
                    content.push(name);

                    fs.writeFileSync('.filenames', JSON.stringify(content));
                }
                else {
                    console.log("file " + name + " already exists");
                }

                try {
                    fs.writeFileSync(`${name}.txt`, "You are awesome", { flag: 'wx' });
                } catch (e) {
                    if (e.code === 'EEXIST') {
                        console.log(`${name} already exists, enter a different filename`);
                        return;
                    }
                }


            } catch (e) {
                console.log(e) // logs any error encountered with reading the file
            }




        }

    )
    .demandCommand(1, 'You need at least one command before moving on')
    .help('h')
    .alias('h', 'help')

    .argv;
