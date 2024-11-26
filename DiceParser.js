module.exports = class DiceParser {
  static parseArgs(args) {
    // Check if enough arguments are provided
    if (args.length < 3) {
      throw new Error("Invalid arguments. Pass at least 3 dice configurations.");
    }

    // Validate each dice configuration
    return args.slice(2).map(arg => {
      const sides = arg.split(",").map(Number);

      // Check for empty or missing sides
      if (sides.length === 0 || arg.trim() === "") {
        throw new Error(`Invalid dice configuration: "${arg}". Dice must have at least one side.`);
      }

      // Check for non-integer values
      if (sides.some(isNaN)) {
        throw new Error(`Invalid dice configuration: "${arg}". All sides must be integers.`);
      }

      // Check for negative or zero values (optional, based on dice rules)
      if (sides.some(side => side <= 0)) {
        throw new Error(`Invalid dice configuration: "${arg}". Dice sides must be positive integers.`);
      }

      return sides;
    });
  }
};
