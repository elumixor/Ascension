class Goal {
  constructor(name, stage, description, tasks, image, subgoals, supergoals) {
    this.name = name
    this.stage = stage
    this.description = description
    this.tasks = tasks
    this.image = image
    this.subgoals = subgoals
    this.supergoals = supergoals
  }

  toString() { return `Goal(${this.name})`; }
}

class Task {
  constructor(name, goal) {
    this.name = name;
    this.goal = goal;
  }
}

class SingleTask extends Task {
  constructor(name, goal, time) {
    super(name, goal);
    this.time = time;

    goal.tasks.push(this);
  }
}

class PeriodicTask extends Task {
  constructor(name, goal, schedule) {
    super(name, goal);
    this.schedule = schedule;
    this.instances = [];
  }
}

class PeriodicTaskInstance {
  constructor(baseTask) {
    this.baseTask = baseTask;
  }
}

class PeriodicSchedule {
  constructor(dayTimes) {
    this.dayTimes = dayTimes;
  }
}

module.exports = {Goal, Task, SingleTask, PeriodicTask, PeriodicTaskInstance, PeriodicSchedule}

