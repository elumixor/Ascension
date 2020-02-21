const storage = require('./storage_manager')

class AssertionError extends Error {
  constructor(message) {
    super(message);
    // Ensure the name of this error is the same as the class name
    this.name = this.constructor.name;
    // This clips the constructor invocation from the stack trace.
    // It's not absolutely essential, but it does make the stack trace a little nicer.
    //  @see Node.js reference (bottom)
    Error.captureStackTrace(this, this.constructor);
  }
}

function assert(condition, message = "Assertion failed") {
  if (!condition) throw new AssertionError(message);
}


function isUniqueTask(name, time) {
  return false;
}

function isUniqueGoal(name) {
  return false;
}

function timeIsFree(time) {
  return false;
}

module.exports = {assert, isUniqueTask, isUniqueGoal}
