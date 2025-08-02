export default class LogModel {
  constructor(stack, level, pkg, message) {
    this.stack = stack;
    this.level = level;
    this.pkg = pkg;
    this.message = message;
  }
}
