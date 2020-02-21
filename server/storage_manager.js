const fs = require('fs')

const pathToFile = '../storage/user_data.json';

let data = {
  goals: [],
  remainingTasks: []
};

function readAllData() {
  data = JSON.parse(fs.readFileSync(pathToFile));
  console.log("Data successfully read.")
  console.log(data);
}

function writeAllData() {
  let data = JSON.stringify(data);
  fs.writeFileSync(pathToFile, data);
  console.log("Data written.")
}

module.exports = {
  goals: data.goals, tasks: data.remainingTasks,
  readAllData, writeAllData
}
