const { Command } = require("commander");
const program = new Command();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts();
      break;

    case "get":
      getContactById(id);
      break;

    case "add":
      addContact(name, email, phone);
      break;

    case "remove":
      removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);

// const { Command } = require("commander");
// const program = new Command();
// const {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
// } = require("./contacts.js");

// program
//   .command("add <name> <email> <phone>")
//   .alias("a")
//   .description("Add a new contact")
//   .action((name, email, phone) => {
//     addContact(name, email, phone);
//   });

// program
//   .command("getById <id>")
//   .alias("get")
//   .description("get contact by Id")
//   .action((id) => getContactById(id));

// program
//   .command("getById <id>")
//   .alias("get")
//   .description("get contact by Id")
//   .action((id) => getContactById(id));

// program.parse(process.argv);
