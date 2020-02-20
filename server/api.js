const fm = require("./file_system/file_manger");
const domain = require("./domain/domain");

// API functions

// Creating and adding

/** Create Goal (lifetime/un-scheduled) */
/** Create Goal (staged) */
function createGoal(name, stage = null, description = "", tasks = [], image = null, subgoals = [], supergoals = []) {
  console.log("Creating new goal with: " + name);
  // todo: check requirements
  const goal = new domain.Goal(name, stage, description, tasks, image, subgoals, supergoals);
  console.log("Created new goal " + goal);
}

/** Create Sub-goal */
function addSubGoal(target, subgoal) {
  console.log("Adding sub-goal " + subgoal + " to a " + target);
  // todo: check requirements
  target.subgoals.push(subgoal);
  subgoal.supergoals.push(target);
}

/** Create Super-goal */
function addSuperGoal(target, supergoal) {
  addSubGoal(supergoal, target);
}

/** Create Task (hierarchy) / Add task with no goal into a schedule. */
function createTaskSingle(name, goal = null, time = null) {
  console.log("Creating new task: " + name)
  return new domain.SingleTask(name, goal, time);
}

function createTaskPeriodic(name, goal = null, schedule = null) {
  console.log("Creating new task: " + name + " (periodic)")
  return new domain.PeriodicTask(name, goal, schedule);
}

/** Schedule task. */
function scheduleTaskSingle(task, time) {
  task.time = time;
}

/** Schedule task. */
function scheduleTaskPeriodic(task, schedule) {
  task.schedule = schedule;
}

module.exports = {
  createGoal,
  addSubGoal,
  addSuperGoal,
  createTaskSingle,
  createTaskPeriodic,
  scheduleTaskSingle,
  scheduleTaskPeriodic
}



