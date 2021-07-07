
const firstInput = $("#first-input");
const errorText = $("#error-text");
const secondInput = $("#second-input");
const startBtn = $("#start-button");
var playWithPC = false;

var EnterName = function(player) {
	return function (event) { 
		if (firstInput.value != secondInput.value) {
			firstInput.attr("class", "control");
			secondInput.attr("class", "control");
			startBtn.prop('disabled', false);
			errorText.html("");
		}
		else {
			if (player == 1) {
				firstInput.attr("class", "control danger");
				secondInput.attr("class", "control");
				startBtn.prop('disabled', true);
				errorText.html("Incorrect first player name");
			}
			else {
				secondInput.attr("class", "control danger");
				firstInput.attr("class", "control");
				startBtn.prop('disabled', true);
				errorText.html("Incorrect second player name");
			}
		}
		
	};
};

firstInput.keyup(EnterName(1));
secondInput.keyup(EnterName(2));
