const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes.js');

//customize yargs version

yargs.version('1.1.0');

//create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder : {
        title : {
            describe : 'Note Title',
            demandOption: true,
            type : 'string'
        },
        body : {
            describe: 'Note Body',
            demandOption: true,
            type : 'string'
        }
    },
    handler(argv){
        notes.addNote(argv.title,argv.body);
    }
});

//create remove command
yargs.command({
    command: 'remove',
    describe: 'Removing a note',
    builder : {
        title : {
            describe : 'Title of note to be deleted',
            demandOption : true,
            type : 'string'
        }
    },
    handler(argv){
        notes.removeNote(argv.title);
    }
});

//create read command
yargs.command({
    command: 'read',
    describe: 'Reading a note',
    builder: {
        title : {
            describe : 'Title of note to be read',
            demandOption : true,
            type : 'string'
        }
    },
    handler(argv){
        notes.readNote(argv.title);
    }
});


//create list command
yargs.command({
    command: 'list',
    describe: 'Listing a note',
    handler(){
        notes.listNotes();
    }
});


//add, remove, read, list

yargs.parse();
// console.log(yargs.argv);