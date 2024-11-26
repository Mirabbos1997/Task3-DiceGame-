const DiceParser = require("./DiceParser");
const Dice = require("./Dice");
const GameFlow = require("./GameFlow");
const HelpTable = require("./HelpTable");
const chalk = require("chalk");

(async () => {
  try {
    const diceObjects = DiceParser.parseArgs(process.argv).map(config => new Dice(config));
    console.log(chalk.bold.yellowBright("\nWelcome to the Dice Game! 🎲"));

    while (true) {
      console.log("\nGame Menu:\n0 - If you want to play game select '0'\n1 - Do you need a help click '1'\nX - If you want to exit from the game select 'x'");
      const choice = await GameFlow.getUserInput(chalk.cyan("Choose an option: "));

      if (choice === "0") {
        const userStarts = await GameFlow.decideFirstMove();
        await GameFlow.playRound(diceObjects[0], diceObjects[1], userStarts);
      } else if (choice === "1") {
        HelpTable.renderTable(
          DiceParser.parseArgs(process.argv),
          HelpTable.calculateProbabilities(DiceParser.parseArgs(process.argv))
        );
      } else if (choice.toUpperCase() === "X") {
        console.log(chalk.bold.redBright("Exiting the game. Goodbye!"));
        break;
      } else {
        console.log(chalk.red("Your choice is invalid . Please try another selection!."));
      }
    }
  } catch (err) {
    console.error(chalk.red(`Error: ${err.message}`));
  }
})();
