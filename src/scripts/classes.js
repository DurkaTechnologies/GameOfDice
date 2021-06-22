class Player {
	Name = "";
	Score = parseInt("0");
	constructor (name, score) {
		this.Name = name;
		this.Score = score;
	}
}

class Game {
	firstSum;
	turn = true;
	turnPlayerBox;

	FirstPlayer;
	SecondPlayer;

	constructor () {
		this.FirstPlayer = new Player();
		this.SecondPlayer = new Player();
	}
}

function ToggleClasses(die) {
    die.classList.toggle("odd-roll");
    die.classList.toggle("even-roll");
}
  
function GetRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class GameDices {
	Dices = [];
	Sum;
	
	RollDice() {
		this.Sum = parseInt(0);
		this.Dices.forEach(die => {
			ToggleClasses(die);
			die.dataset.roll = GetRandomNumber(1, 6);
			this.Sum += parseInt(die.dataset.roll);
		});
		console.log(this.Sum);
	}
}