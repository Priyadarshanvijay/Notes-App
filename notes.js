const fs = require('fs');
const chalk = require('chalk');
const getNotes = () => {
    return "Your notes...";
};

const addNote =(title, body) => {
    const notes = loadNotes();
    // const duplicateNotes = notes.filter((note) => note.title === title); //was causing code to slow down
    const duplicateNote = notes.find((note) => note.title === title);
    if(!duplicateNote){
        notes.push({
            title : title,
            body : body
        });
        saveNotes(notes);
        console.log(chalk.green.inverse('New Note Added!'));
    }else{
        console.log(chalk.red.inverse('Note title taken!'));
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const newNotesArray = notes.filter((note) => title != note.title);
    let isThere = false;
    for(let i = 0 ; i < notes.length ; ++i){
        if(notes[i].title === title){
            isThere = true;
            break;
        }
    }
    if(isThere){
        console.log(chalk.green(`Deleting \'${title}\'`));
        console.log(chalk.green.inverse('Note Removed!'));
        saveNotes(newNotesArray);
    }
    else{
        console.log(chalk.inverse.red(`No note found with title \'${title}\'`));
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }catch(e){
        return []; // return nothing as the file is not there
    }
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.yellow.inverse.bold("YOUR NOTES:"));
    notes.forEach(note => {
        console.log(note.title);
    });
}

module.exports = {
    getNotes : getNotes,
    addNote : addNote,
    removeNote : removeNote,
    listNotes : listNotes
};