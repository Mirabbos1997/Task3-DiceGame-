const chalk = require("chalk");

module.exports = class HelpTable {
  static calculateProbabilities(diceConfigs) {
    return diceConfigs.map((userDice, i) =>
      diceConfigs.map((computerDice, j) =>
        i === j
          ? "- (0.3333)"
          : (
            userDice.reduce(
              (userWins, userRoll) =>
                userWins +
                computerDice.filter(computerRoll => userRoll > computerRoll)
                  .length,
              0
            ) /
            (userDice.length * computerDice.length)
          ).toFixed(4)
      )
    );
  }

  static renderTable(diceConfigs, probabilities) {
    const header = ["User's Dice v \\ Computer's Dice", ...diceConfigs.map(config => config.join(","))];
    const tableWidth = Math.max(...header.map(h => h.length)) + 5; // Adjust for better spacing
    const separator = "+" + header.map(() => "-".repeat(tableWidth)).join("+") + "+";

    const formatRow = row =>
      "| " +
      row.map(cell => cell.padEnd(tableWidth)).join("| ") +
      " |";

    // Print header
    console.log(chalk.blueBright(separator));
    console.log(chalk.bold.green(formatRow(header)));
    console.log(chalk.blueBright(separator));

    // Print rows with dice results
    probabilities.forEach((row, i) => {
      const userDiceResult = diceConfigs[i].join(","); // User dice
      const formattedRow = [
        `User Dice: ${userDiceResult}`,
        ...row.map((prob, j) => {
          const computerDiceResult = diceConfigs[j].join(",");
          if (prob.includes("-")) return chalk.red(prob); // Red for ties
          if (parseFloat(prob) > 0.5)
            return chalk.green(
              `${prob} (User: ${userDiceResult} | Computer: ${computerDiceResult})`
            ); // Green for higher probabilities
          return chalk.yellow(
            `${prob} (User: ${userDiceResult} | Computer: ${computerDiceResult})`
          ); // Yellow for lower probabilities
        }),
      ];
      console.log(chalk.white(formatRow(formattedRow)));
      console.log(chalk.blueBright(separator));
    });
  }
};
