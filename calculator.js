const keys = document.querySelectorAll('.key');
const view_input = document.querySelector('.view .input');
const view_output = document.querySelector('.view .output');

let input = "";

for (let key of keys) {
	const value = key.dataset.key;

	key.addEventListener('click', () => {
		if (value == "clear") {
			input = "";
			view_input.innerHTML = "";
			view_output.innerHTML = "";
		} else if (value == "backspace") {
			input = input.slice(0, -1);
			view_input.innerHTML = CleanInput(input);
		} else if (value == "=") {
			let result = eval(PerpareInput(input));

			view_output.innerHTML = CleanOutput(result);
		} else if (value == "brackets") {
			if (
				input.indexOf("(") == -1 || 
				input.indexOf("(") != -1 && 
				input.indexOf(")") != -1 && 
				input.lastIndexOf("(") < input.lastIndexOf(")")
			) {
				input += "(";
			} else if (
				input.indexOf("(") != -1 && 
				input.indexOf(")") == -1 || 
				input.indexOf("(") != -1 &&
				input.indexOf(")") != -1 &&
				input.lastIndexOf("(") > input.lastIndexOf(")")
			) {
				input += ")";
			}

			view_input.innerHTML = CleanInput(input);
		} else {
			if (ValidateInput(value)) {
				input += value;
				view_input.innerHTML = CleanInput(input);
			}
		}
	})
}

function CleanInput(input) {
	let input_array = input.split("");
	let input_array_length = input_array.length;

	for (let i = 0; i < input_array_length; i++) {
		if (input_array[i] == "*") {
			input_array[i] = ` <span class="sign">x</span> `;
		} else if (input_array[i] == "/") {
			input_array[i] = ` <span class="sign">÷</span> `;
		} else if (input_array[i] == "+") {
			input_array[i] = ` <span class="sign">+</span> `;
		} else if (input_array[i] == "-") {
			input_array[i] = ` <span class="sign">-</span> `;
		} else if (input_array[i] == "(") {
			input_array[i] = `<span class="brackets">(</span>`;
		} else if (input_array[i] == ")") {
			input_array[i] = `<span class="brackets">)</span>`;
		} else if (input_array[i] == "%") {
			input_array[i] = `<span class="percent">%</span>`;
		}
	}

	return input_array.join("");
}

function CleanOutput (output) {
	let output_string = output.toString();
	let decimal = output_string.split(".")[1];
	output_string = output_string.split(".")[0];

	let output_array = output_string.split("");
	
	if (output_array.length > 3) {
		for (let i = output_array.length - 3; i > 0; i -= 3) {
			output_array.splice(i, 0, ",");
		}
	}

	if (decimal) {
		output_array.push(".");
		output_array.push(decimal);
	}

	return output_array.join("");
}

function ValidateInput (value) {
	let last_input = input.slice(-1);
	let operators = ["+", "-", "*", "/"];

	if (value == "." && last_input == ".") {
		return false;
	}

	if (operators.includes(value)) {
		if (operators.includes(last_input)) {
			return false;
		} else {
			return true;
		}
	}

	return true;
}

function PerpareInput (input) {
	let input_array = input.split("");

	for (let i = 0; i < input_array.length; i++) {
		if (input_array[i] == "%") {
			input_array[i] = "/100";
		}
	}

	return input_array.join("");
}