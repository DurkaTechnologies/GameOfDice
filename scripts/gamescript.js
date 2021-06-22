document.querySelector("#start-button").addEventListener("click", LoadGame);
document.querySelector("#start-button-pc").addEventListener("click", StartGamePC);

const winValue = 15;
var game, gameDices;
var firstPlayerBox, secondPlayerBox;
var firstScoreDOM, secondScoreDOM;
var rollButton;

function InitPlayes() {
	game = new Game();
	gameDices = new GameDices();

	game.FirstPlayer.Name = firstInput.value == "" ? "FirstPlayer": firstInput.value;
	game.SecondPlayer.Name = secondInput.value == "" ? "SecondPlayer": secondInput.value;

	if (playWithPC) 
		game.SecondPlayer.Name = "This computer";

	game.FirstPlayer.Score = 0;
	game.SecondPlayer.Score = 0;
}

function InitElements() {
	rollButton = document.getElementById("roll-button");
	gameDices.Dices = [...document.querySelectorAll(".die-list")];
	firstPlayerBox = document.querySelector("#first-player");
	secondPlayerBox = document.querySelector("#second-player");

	document.querySelector("#start-box").setAttribute("class", "hidden");
	document.querySelector("#game-box").setAttribute("class", "game-container")
	game.turnPlayerBox = document.querySelector(".turn-box").querySelector("#turn-text");
	game.turnPlayerBox.innerHTML = game.FirstPlayer.Name;

	rollButton.addEventListener("click", StartGame);

	let duration = getDuration(gameDices.Dices[0], true);
	rollButton.addEventListener("click", function () {
		rollButton.disabled = true;
		setTimeout(function() {
			rollButton.disabled = false;
			if (game.turn) {
				game.turnPlayerBox.innerHTML = game.FirstPlayer.Name;
				firstPlayerBox.classList.toggle("red");
    			secondPlayerBox.classList.toggle("blue");
    			game.turnPlayerBox.classList.toggle("red-text");
    			game.turnPlayerBox.setAttribute("class", "red-text")
				CheckGame();	
			}
			else {
				game.turnPlayerBox.innerHTML = game.SecondPlayer.Name;
				firstPlayerBox.classList.toggle("red");
    			secondPlayerBox.classList.toggle("blue");
    			game.turnPlayerBox.setAttribute("class", "blue-text")
			}
		}, duration);
	});
}

function SetScore(DOM, value) {
	DOM.innerHTML = value;
}

function AnimScore(DOM, value) {
	DOM.classList.add("after-visibility");
	DOM.style.setProperty('--number', value);

	var animDur = window.getComputedStyle(DOM, ':after').
		getPropertyValue('animation-duration')

	setTimeout(function() {
		DOM.classList.remove("after-visibility");
	}, TimeToInt(animDur));
	
}

function AddScore(DOM, player, number) {
	player.Score += number;
	AnimScore(DOM, number);
	SetScore(DOM, player.Score);
}

function InitPlayerBoxes() {
	firstPlayerBox.querySelector("h3").innerHTML = game.FirstPlayer.Name;
	secondPlayerBox.querySelector("h3").innerHTML = game.SecondPlayer.Name;

	firstScoreDOM = firstPlayerBox.querySelector("h4");
	secondScoreDOM = secondPlayerBox.querySelector("h4");

	SetScore(firstScoreDOM, game.FirstPlayer.Score);
	SetScore(secondScoreDOM, game.SecondPlayer.Score);
}

function LoadGame() {
	InitPlayes();
	InitElements();
	InitPlayerBoxes();
}

function StartGamePC() {
	playWithPC = true;
	LoadGame();
} 

function StartGame() {
	gameDices.RollDice();

	if (game.turn) {
		game.turn = false;
		game.firstSum = gameDices.Sum;
	}
	else {
		game.turn = true;
	}
}

function CheckGame() {
	if (game.firstSum > gameDices.Sum) {
		if (game.firstSum % 2 == 0) 
			AddScore(firstScoreDOM, game.FirstPlayer, 2);
		else 
			AddScore(firstScoreDOM, game.FirstPlayer, 1);
	}
	else if (game.firstSum < gameDices.Sum) {
		if (gameDices.Sum % 2 == 0)
			AddScore(secondScoreDOM, game.SecondPlayer, 2);
		else 
			AddScore(secondScoreDOM, game.SecondPlayer, 1);
	}
	else {
		AddScore(firstScoreDOM, game.FirstPlayer, 1);
		AddScore(secondScoreDOM, game.SecondPlayer, 1);
	}

	if ((game.FirstPlayer.Score >= winValue) || (game.SecondPlayer.Score >= winValue)) {
		EndGame();
	}
}

function EndGame() {
	rollButton.disabled = true;

}


function getDuration(element, transition) {
	let durString;
	if (transition === true) 
		durString = getComputedStyle(element).transitionDuration
	else 
		durString = getComputedStyle(element).animationDuration
	
    return TimeToInt(durString);
};

function TimeToInt(timeStr) {
	timeStr = timeStr.toLowerCase()
    let isMS = timeStr.indexOf("ms") >= 0;
	let numberStr = timeStr.match(/\d/);
    let numberNum = parseInt(numberStr[0], 10);
    return isMS ? numberNum : numberNum * 1000;
}