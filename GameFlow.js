const readline = require("readline");
const chalk = require("chalk");
const FairRandom = require("./FairRandom");

module.exports = class GameFlow {
  // Decide who starts
  static async decideFirstMove() {
    console.log(chalk.cyanBright("Deciding who starts..."));

    // Generate random value and HMAC
    const randomValue = FairRandom.generateRandomValue(1);
    const { hmac, secretKey } = FairRandom.generateHMAC(randomValue);

    console.log(chalk.magenta(`HMAC: ${hmac}`)); // Show HMAC to user
    const userGuess = await this.getUserInput(chalk.yellow("Guess the value (0 or 1): "));

    // Reveal the result and verify HMAC
    console.log(chalk.blue(`Key: ${secretKey.toString("hex")}`));
    console.log(chalk.blue(`Random Value: ${randomValue}`));
    console.log(chalk.blue(`Verified: ${FairRandom.verifyHMAC(hmac, secretKey, randomValue)}`));

    if (Number(userGuess) === randomValue) {
      console.log(chalk.greenBright("Correct! You start."));
      return true;
    } else {
      console.log(chalk.redBright("Wrong! Computer starts."));
      return false;
    }
  }

  // Play a round
  static async playRound(userDice, computerDice) {
    // User roll
    const userRollValue = FairRandom.generateRandomValue(userDice.sides.length - 1);
    const userRoll = userDice.roll(userRollValue);
    console.log(chalk.greenBright(`Your roll: ${userRoll}`));

    // Computer roll with HMAC
    const computerRollValue = FairRandom.generateRandomValue(computerDice.sides.length - 1);
    const { hmac, secretKey } = FairRandom.generateHMAC(computerRollValue);

    console.log(chalk.magenta(`HMAC for Computer Roll: ${hmac}`)); // Show HMAC
    const computerRoll = computerDice.roll(computerRollValue);

    // Reveal the result and verify HMAC
    console.log(chalk.redBright(`Computer's roll: ${computerRoll}`));
    console.log(chalk.blue(`Key: ${secretKey.toString("hex")}`));
    console.log(chalk.blue(`Verified: ${FairRandom.verifyHMAC(hmac, secretKey, computerRollValue)}`));

    // Determine winner
    if (userRoll > computerRoll) {
      console.log(chalk.green.bold("You win this round! 🎉"));
    } else if (userRoll < computerRoll) {
      console.log(chalk.red.bold("Computer wins this round! 😢"));
    } else {
      console.log(chalk.yellowBright("It's a tie!"));
    }
  }

  // Get user input
  static getUserInput(prompt) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise(resolve => rl.question(prompt, answer => {
      rl.close();
      resolve(answer);
    }));
  }
};
