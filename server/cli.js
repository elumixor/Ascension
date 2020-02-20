const api = require("./api");
const args = process.argv.slice(3);

function prompt(description) {
  console.log(`Enter ${description}: `)
  return "cannot yet read from command line :("
}

// Input handle
const command = args[0];

switch (command) {
  case "create":
    switch (args[1]) {
      case "goal":
        if (args[2] && args[2] === "staged")
          api.createGoal(prompt("goal name"))
        else
          api.createGoal(prompt("goal name"), prompt("description"))
    }
    break;

  default:
    console.error("Unknown command: " + command);
    break;
}

