class Goal {
  constructor(name, deadline, description, image, tasks, subgoals, supergoals) {
    this.name = name
    this.deadline = deadline
    this.description = description
    this.tasks = tasks
    this.image = image
    this.subgoals = subgoals
    this.supergoals = supergoals
  }

  completion() {
    return 0;
  }

  toString() {
    return `Goal(${this.name})`;
  }

  containsSubgoal(subgoal) {
    return false;
  }

  containsTask(task) {
    return false;
  }
}

class Task {
  constructor(name, goal) {
    this.name = name;
    this.goal = goal;
    this.completion = 0;
  }
}

class SingleTask extends Task {
  constructor(name, goal, time) {
    super(name, goal);
    this.time = time;

    goal.tasks.push(this);
  }

  complete() {
    this.completion = 1;
  }

  uncomplete() {
    this.completion = 1;
  }
}

class PeriodicTask extends Task {
  constructor(name, goal, schedule) {
    super(name, goal);
    this.schedule = schedule;
    this.instances = [];
  }

  updateCompletion() {
    this.completion = this.instances.filter(ins => ins.completed).length / this.instances.length;
  }
}

class PeriodicTaskInstance {
  constructor(baseTask) {
    this.baseTask = baseTask;
    this.completed = false;
  }

  complete() {
    this.completed = true;
    this.baseTask.updateCompletion();
  }

  uncomplete() {
    this.completed = false;
    this.baseTask.updateCompletion();
  }

}

class PeriodicSchedule {
  constructor(dayTimes) {
    this.dayTimes = dayTimes;
  }
}

module.exports = {Goal, Task, SingleTask, PeriodicTask, PeriodicTaskInstance, PeriodicSchedule}

