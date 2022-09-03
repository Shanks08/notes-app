const yargs = require("yargs");
const notes = require("./notes.js");

yargs.version("1.1.0");

// add notes
yargs.command({
	command: "add",
	describe: "Add a new note",
	builder: {
		title: {
			describe: "Note title",
			demandOption: true,
			type: "string",
		},
		body: {
			describe: "Note Body",
			demandOption: true,
			type: "string",
		},
	},
	handler(argv) {
		notes.addNote(argv.title, argv.body);
	},
});

// Remove Note
yargs.command({
	command: "remove",
	describe: "Remove a note",
	builder: {
		title: {
			describe: "Note title",
			demandOption: true,
			type: "string",
		},
	},
	handler(argv) {
		notes.removeNote(argv.title);
	},
});

// Read Note
yargs.command({
	command: "read",
	describe: "Reads the note",
	builder: {
		title: {
			describe: "Note title",
			demandOption: true,
			type: "string",
		},
	},
	handler(argv) {
		notes.readNote(argv.title);
	},
});

// List all notes
yargs.command({
	command: "list",
	describe: "List all nodes",
	handler() {
		notes.listNotes();
	},
});

yargs.parse();
