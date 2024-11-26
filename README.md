🎲 Dice Game with Fair Randomness and HMAC Validation
This project is a command-line Dice Game built in Node.js. It demonstrates fairness in random number generation using HMAC (Hash-based Message Authentication Code) for transparency, along with a colorful interactive table of probabilities.

🚀 Features
Fairness Guarantee: Uses cryptographically secure randomness with HMAC validation.
Colorful Output: Displays results and probabilities in a user-friendly format using chalk.
Flexible Dice Configurations: Supports multiple dice with arbitrary sides.
Error Handling: Validates dice configurations and provides clear feedback for invalid inputs.
Help Table: Shows a probability table of winning outcomes for each pair of dice.
🛠️ Installation
Clone the Repository:

bash
Copy code
git clone https://github.com/<your-username>/dice-game.git
cd dice-game
Install Dependencies: Ensure you have Node.js installed, then run:

bash
Copy code
npm install
▶️ Usage
Run the game with the following command:

bash
Copy code
node main.js <dice-configuration-1> <dice-configuration-2> <dice-configuration-3> ...
Example:
bash
Copy code
node main.js 1,2,3,4,5,6 6,6,6,6,6,6 2,2,4,4,9,9
This command starts the game with three dice configurations:

Dice 1: 1,2,3,4,5,6
Dice 2: 6,6,6,6,6,6
Dice 3: 2,2,4,4,9,9
🕹️ Game Menu
Play Game:

Choose dice and roll against the computer.
Fairness is ensured via HMAC validation.
Show Help:

Displays a colorful table of probabilities for each dice pair.
Exit:

Quit the game.
🧪 Test Scenarios
Valid Input:
bash
Copy code
node main.js 1,2,3,4,5,6 6,6,6,6,6,6 2,2,4,4,9,9
Invalid Sides:
bash
Copy code
node main.js 1,2,3,4,5,6 , 2,2,4,4,9,9
Error: Invalid dice configuration: ", ". Dice must have at least one side.

Non-Integer Value:
bash
Copy code
node main.js 1,2,3,4,5,6 a,b,c 2,2,4,4,9,9
Error: Invalid dice configuration: "a,b,c". All sides must be integers.

Mixed Errors:
bash
Copy code
node main.js 1,2,3,4,5 -1,0,a 2,2,4,4,9,9
Error: Invalid dice configuration: "-1,0,a". Dice sides must be positive integers.

📂 Project Structure
plaintext
Copy code
├── Dice.js                  # Dice class for rolling logic
├── DiceParser.js            # Validates and parses dice configurations
├── FairRandom.js            # Handles HMAC and secure randomness
├── HelpTable.js             # Generates and displays the probability table
├── GameFlow.js              # Manages game flow and user interactions
├── main.js                  # Entry point for the program
├── package.json             # Project dependencies
🔧 Dependencies
This project uses the following Node.js libraries:

chalk: For colorful terminal output.
crypto: For HMAC and secure random generation.
Install them automatically via npm install.

🖥️ Running the Game
Clone the repository:

bash
Copy code
git clone https://github.com/<your-username>/dice-game.git
cd dice-game
Install dependencies:

bash
Copy code
npm install
Run the game:

bash
Copy code
node main.js 1,2,3,4,5,6 6,6,6,6,6,6 2,2,4,4,9,9
🛡️ HMAC Fairness
This game uses HMAC to ensure fairness:

The computer generates a random number and computes its HMAC using a secret key.
The HMAC is shown to the user before the number is revealed.
After the user guesses, the secret key and number are revealed, allowing verification of the HMAC.
📜 License
This project is licensed under the MIT License. See LICENSE for details.
