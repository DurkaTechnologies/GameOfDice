$("#start-button").click(LoadGame);
$("#start-button-pc").click(StartGamePC);

$.global = new Object();

$.global.game = 0;
$.global.gameDices = 0;
$.global.firstPlayerBox = 0;
$.global.secondPlayerBox = 0;
$.global.firstScoreDOM = 0;
$.global.secondScoreDOM = 0;
$.global.rollButton = 0;
const winValue = 15;

function InitPlayes() {
	game = new Game();
	gameDices = new GameDices();

	game.FirstPlayer.Name = firstInput.val() == "" ? "FirstPlayer": firstInput.val();
	game.SecondPlayer.Name = secondInput.val() == "" ? "SecondPlayer": secondInput.val();

	if (playWithPC) 
		game.SecondPlayer.Name = "This computer";

	game.FirstPlayer.Score = 0;
	game.SecondPlayer.Score = 0;

}

function PlayAgain() {
	NullifyGame();
	$("#die-1").attr("class", "die-list even-roll")
	$("#die-2").attr("class", "die-list odd-roll")
	game = undefined;
	gameDices = undefined;

	playWithPC ? StartGamePC() : LoadGame();
}

function ToMenu() {
	NullifyGame();
	$("#start-box").attr("class", "container");
	$("#game-box").attr("class", "hidden");
	$("#game-box").css("filter", "");
	$("#game-box").css("background", "");
	firstInput.val("");
	secondInput.val("");
	$("#die-1").attr("class", "die-list even-roll")
	$("#die-2").attr("class", "die-list odd-roll")
	game = undefined;
	gameDices = undefined;

}

function InitElements() {
	rollButton = $("#roll-button");
	gameDices.Dices = [...$(".die-list")];
	firstPlayerBox = $("#first-player");
	secondPlayerBox = $("#second-player");
	$("#winner-box").children("#playagain-button").click(PlayAgain);
	$("#winner-box").children("#tomenu-button").click(ToMenu);
	// console.log($(".die-list").children("li[data-side='1']"))

	$("#start-box").attr("class", "hidden");
	$("#game-box").attr("class", "game-container")
	game.turnPlayerBox = $("#turn-text");
	game.turnPlayerBox.html(game.FirstPlayer.Name);

	rollButton.click(StartGame);

	let duration = getDuration(gameDices.Dices[0], true);
	rollButton.click(function () {
		rollButton.prop('disabled', true);
		setTimeout(function() {
			rollButton.prop('disabled', false);
			if (game.turn) {
				game.turnPlayerBox.html(game.FirstPlayer.Name);
				firstPlayerBox.toggleClass("red");
    			secondPlayerBox.toggleClass("blue");
    			game.turnPlayerBox.toggleClass("red-text");
    			game.turnPlayerBox.attr("class", "red-text")
				CheckGame();	
			}
			else {
				game.turnPlayerBox.html(game.SecondPlayer.Name);
				firstPlayerBox.toggleClass("red");
    			secondPlayerBox.toggleClass("blue");
    			game.turnPlayerBox.attr("class", "blue-text")

				if (playWithPC) {
					rollButton.prop('disabled', true);
					setTimeout(function() {
						rollButton.click();
					}, 1000);
				}
			}
		}, duration);
	});
}

function SetScore(DOM, value) {
	DOM.html(value);
}

function AnimScore(DOM, value) {
	DOM.addClass("after-visibility");
	DOM.css('--number', value);

	var animDur = DOM.css('--animation-duration');

	setTimeout(function() {
		DOM.removeClass("after-visibility");
	}, TimeToInt(animDur));
	
}

function AddScore(DOM, player, number) {
	player.Score += number;
	AnimScore(DOM, number);
	SetScore(DOM, player.Score);
}

function InitPlayerBoxes() {
	firstPlayerBox.children("h3").html(game.FirstPlayer.Name);
	secondPlayerBox.children("h3").html(game.SecondPlayer.Name);

	firstScoreDOM = firstPlayerBox.children("h4");
	secondScoreDOM = secondPlayerBox.children("h4");

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
		rollButton.prop('disabled', true);

		let winner = "";
		if (game.FirstPlayer.Score >= winValue && game.FirstPlayer.Score == game.SecondPlayer.Score)
			winner = "Standoff";
		else if (game.FirstPlayer.Score >= winValue)
			winner = game.FirstPlayer.Name;
		else if (game.SecondPlayer.Score >= winValue)
			winner = game.SecondPlayer.Name;

		setTimeout(function() {
			EndGame(winner);
		}, 1000);
		
	}
}

function EndGame(winner) {
	$("#game-box").css("filter", 'blur(1rem)');
	$("#game-box").css("background", 'radial-gradient(50% 40% at center, #0000004f, #00000000)');

	$winnerBox = $("#winner-box");
	$winnerBox.attr("class", "winner-container")
	$winnerBox.children(winner != "Standoff" ? "#player-box" : "#wintext-box").html(winner);

}

function NullifyGame() {
	$("#winner-box").attr("class", "hidden");
	$("#game-box").css("filter", "");
	$("#game-box").css("background", "");
	rollButton.prop('disabled', false);
	rollButton.unbind();
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
