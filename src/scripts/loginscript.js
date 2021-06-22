
const firstInput = document.querySelector("#first-input");
const errorText = document.querySelector("#error-text");
const secondInput = document.querySelector("#second-input");
var playWithPC = false;

var EnterName = function(player) {
	return function (event) { 
		if (firstInput.value != secondInput.value) {
			firstInput.setAttribute("class", "control");
			secondInput.setAttribute("class", "control");
			document.querySelector("#start-button").disabled = false;
			errorText.innerHTML = " ";
		}
		else {
			if (player == 1) {
				firstInput.setAttribute("class", "control danger");
				document.querySelector("#start-button").disabled = true;
				secondInput.setAttribute("class", "control");
				errorText.innerHTML = "Incorrect first player name";
			}
			else {
				secondInput.setAttribute("class", "control danger");
				document.querySelector("#start-button").disabled = true;
				firstInput.setAttribute("class", "control");
				errorText.innerHTML = "Incorrect second player name";
			}
		}
		
	};
};

firstInput.addEventListener('keyup', EnterName(1));
secondInput.addEventListener('keyup', EnterName(2));
