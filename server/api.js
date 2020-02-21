const domain = require("./domain/domain");
const storage = require('./storage_manager')
const {assert, isUniqueGoal, isUniqueTask, timeIsFree} = require("./assertions")

function getGoal(name) {}
function getTask(name, goal = null) {}

// Creating and adding
/** Creates Goal */
function createGoal(name, deadline = null, description = "", image = null) {
  // goals should have unique name
  assert(isUniqueGoal(name), `Goal with name ${name} already exists.`);

  const goal = new domain.Goal(name, deadline, description, image);
  storage.goals.push(goal);
  return goal;
}

/** Create Task (hierarchy) / Add task with no goal into a schedule. */
function createTaskSingle(name, time = null, goal = null) {
  const task = new domain.SingleTask(name, time);

  if (!goal) addTaskUnclassified(task);
  else addTask(goal, task);

  return task;
}

/** Creates periodic task */
function createTaskPeriodic(name, schedule = null, goal = null) {
  const task = new domain.PeriodicTask(name, goal, schedule);

  if (!goal) addTaskUnclassified(task);
  else addTask(goal, task);

  return task;
}

/** Adds a task to a goal */
function addTask(goal, task) {
  assert(!goal.containsTask(task), `Goal already includes task ${task}`);
  goal.tasks.push(task);
}

/** Adds an unclassified task to storage */
function addTaskUnclassified(task) {
  // Cannot have two same unclassified tasks
  assert(isUniqueTask(task.name, task.time), `Unclassified task ${task} already exists`);
  storage.tasks.push(task);
}

/** Add subgoal to a goal */
function addSubGoal(target, subgoal) {
  // goal cannot contain same subgoal twice (recursively)
  assert(!target.containsSubgoal(subgoal), `Goal already contains subgoal ${subgoal}`);

  // goal cannot contain subgoal, that recursively contains this goal
  assert(!subgoal.containsSubgoal(target));

  // subgoal's deadline should be earlier than the target's deadline
  assert(subgoal.deadline < target.deadline || target.deadline == null);

  target.subgoals.push(subgoal);
  subgoal.supergoals.push(target);
}

/** Add supergoal to a goal */
function addSuperGoal(target, supergoal) {
  addSubGoal(supergoal, target);
}

/** Schedule task. */
function scheduleTaskSingle(task, time) {
  assert(!task.time);
  task.time = time;
}

/** Schedule task periodic. */
function scheduleTaskPeriodic(task, schedule) {
  assert(!task.schedule);
  task.schedule = schedule;
}

/** Swap tasks' times */
function swapTasksTime(a, b) {
  assert(a.time && b.time)
  const t = a.time;
  a.time = b.time;
  b.time = t;
}

// Edit
function changeGoalName(goal, name) {}
function changeGoalDeadline(goal, deadline) {}

function changeGoalDetails(goal, description, image) {}

function changeTaskName(goal, name) {}
function changeTaskTime(task, time) {}
function changeTaskSchedule(task, schedule) {}

// Completion
function completeTask(task) {}
function completeTaskInstance(taskInstance) {}
function uncompleteTask(task) {}
function uncompleteTaskInstance(taskInstance) {}

// Deletion
function deleteGoal(goal) {}
function deleteTask(task) {}

module.exports = {
  createGoal,
  addSubGoal,
  addSuperGoal,
  createTaskSingle,
  createTaskPeriodic,
  scheduleTaskSingle,
  scheduleTaskPeriodic
}





