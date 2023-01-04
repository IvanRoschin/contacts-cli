const path = require("path");
const fs = require("fs").promises;

const contactsPath = path.resolve("db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    console.log("List of contacts: ");
    console.table(JSON.parse(data));
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const contactById = contacts.filter((contact) => contact.id === contactId);
    if (!contactById.length) {
      throw new Error(`No matches with id ${contactId}`);
    }
    console.table(contactById);
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const contactById = contacts.filter((contact) => contact.id !== contactId);

    if (contactById.length === contacts.length) {
      console.log(
        `Contact with ID "${contactId}" don't removed! ID "${contactId}" not found!`
      );
      return;
    }
    console.log("Contact deleted successfully! New list of contacts: ");
    console.table(contactById);

    fs.writeFile(contactsPath, JSON.stringify(contactById), (error) => {
      if (error) {
        return console.log("error :", error);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);

    contacts.push({
      id: (contacts.length + 1).toString(),
      name: name,
      email: email,
      phone: phone,
    });
    fs.writeFile(contactsPath, JSON.stringify(contacts));
    console.log("Contacts added successfully! New lists of contacts: ");
    console.table(contacts);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
