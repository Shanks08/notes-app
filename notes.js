const chalk = require("chalk");
const fs = require("fs");

const addNote = (title, body) => {
	const noteArr = loadNotesFromMemory();
	// const duplicateNotes = noteArr.filter((note) => note.title === title);
	const duplicateNotes = noteArr.find((note) => note.title === title);
	if (!duplicateNotes) {
		noteArr.push({
			title: title,
			body: body,
		});
		console.log(noteArr);
		console.log(chalk.green.bold.inverse("ADDED A NEW NOTE!"));
	} else {
		console.log(chalk.red.bold.inverse("TITLE ALREADY EXISTS!"));
	}
	loadNotesToMemory(noteArr);
};

const listNotes = () => {
	const data = JSON.parse(fs.readFileSync("notes.json"));
	if (data.length === 0) {
		console.log(chalk.red.bold.inverse("LIST EMPTY!"));
	} else {
		data.forEach((data) => {
			console.log(chalk.whiteBright.bold.underline(data.title));
			console.log(chalk.white(data.body));
		});
		console.log(chalk.green.bold.inverse("NOTES LISTED!"));
	}
};

const readNote = (title) => {
	const notesArr = loadNotesFromMemory();
	const note = notesArr.find((note) => note.title === title);
	if (note) {
		console.log(chalk.whiteBright.bold.underline(note.title));
		console.log(chalk.white(note.body));
		console.log(chalk.green.bold.inverse("NOTE READ!"));
	} else {
		console.log(chalk.red.bold.inverse("NO SUCH NOTE TITLE!"));
	}
};

const removeNote = (title) => {
	const notesArr = loadNotesFromMemory();
	const note = notesArr.filter((note) => note.title !== title);
	if (note.length === notesArr.length) {
		console.log(chalk.bgRed.bold("NO SUCH TITLE!"));
	} else {
		loadNotesToMemory(note);
		console.log(chalk.bgGreen.bold("NOTE DELETED!"));
	}
};

// returns array of note objects from "notes.json"
const loadNotesFromMemory = () => {
	try {
		const dataBuffer = fs.readFileSync("./notes.json");
		return JSON.parse(dataBuffer);
	} catch (e) {
		return [];
	}
};

// takes a notesArr and convert to JSON to store in "notes.json"
const loadNotesToMemory = (noteArr) => {
	const dataJSON = JSON.stringify(noteArr);
	fs.writeFileSync("notes.json", dataJSON);
};

module.exports = {
	addNote: addNote,
	readNote: readNote,
	listNotes: listNotes,
	removeNote: removeNote,
};
