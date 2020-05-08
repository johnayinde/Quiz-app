const questionNumber = document.querySelector(".question-numberSpan");
const total = document.querySelector(".total");
const question = document.querySelector(".questions");
const trackerContainer = document.querySelector(".answers-tracker");
const options = document.querySelector(".options").children;

const correctAnswerSpan = document.querySelector(".correct-answer");
const total2 = document.querySelector(".total-question2");
const percent = document.querySelector(".percent");


const op1 = document.querySelector(".option1");
const op2 = document.querySelector(".option2");
const op3 = document.querySelector(".option3");
const op4 = document.querySelector(".option4");
let questionIndex;
let index = 0;
let score = 0;
let myArray = [];
let myArr = [];
// "answers-tracker
// console.log( question)

// Questions , options , answers

const questions = [
	{
		q: 'how do you call a function name "myFunction?',
		options: ['myFunction()', 'call myFunction()', 'call function myFunction()', 'all the above'],
		answer: 0
	},
	{
		q: 'how do you write if statement in javascript',
		options: ['if i == 5 then', 'if (i == 5)', 'if i = 5', 'if i = 5 then '],
		answer: 1
	},
	{
		q: 'how does a for loop start',
		options: ['for (i = 0; i<= 5)', 'for (i <= 5; i++)', 'for i = 1 to 5', 'for (i = 0; i<= 5 i++)'],
		answer: 3
	},
	{
		q: 'how do declear javascript variable',
		options: ['variable carName', 'var carNAme', 'var 1carNAme', 'van carNAme'],
		answer: 1
	},
	{
		q: 'which operator is used to assigna value to a variable',
		options: ['-', '=', '+', ':'],
		answer: 1
	},
];

// set questions, options, and question number
total.innerHTML = questions.length;
function load() {

	questionNumber.innerHTML = index + 1;
	question.innerHTML = questions[questionIndex].q;
	op1.innerHTML = questions[questionIndex].options[0];
	op2.innerHTML = questions[questionIndex].options[1];
	op3.innerHTML = questions[questionIndex].options[2];
	op4.innerHTML = questions[questionIndex].options[3];
	index++
}
function check(element) {
	if (element.id == questions[questionIndex].answer) {
		element.classList.add('correct');
		updateAnswerTracker('correct');
		score++;
	} else {
		element.classList.add('wrong');
		updateAnswerTracker('wrong');

	}
	disableOptions();
}
function disableOptions() {
	for (let i = 0; i < options.length; i++) {
		options[i].classList.add('disabled');
		/*
		cannot reselect options after picking the wrong answer
		we need to enable it back for next()
		*/
		if (options[i].id == questions[questionIndex].answer) {
			options[i].classList.add('correct'); //select correct answer while disabled
		}
	}
}
function enableOptions() {
	for (let i = 0; i < options.length; i++) {
		options[i].classList.remove('disabled', "correct", "wrong");
	}
}
function validate() {
	if (!options[0].classList.contains('disabled')) {
		alert('pls select one option');
	} else {
		enableOptions()
		randomQuestion();
	}
}
function next() {
	/**
	 * b4 going to next 
	 * check if user select ans question or not 
	 * alert if not select else Next()
	 */
	validate()
}
function randomQuestion() {
	let randomNumber = Math.floor(Math.random() * questions.length);
	let hitDuplicate = 0;
	// removing duplicates
	if (index == questions.length) {
		quizOver();
	}
	else {
		if (myArray.length > 0) {
			for (let i = 0; i < myArray.length; i++) {
				if (myArray[i] == randomNumber) {
					hitDuplicate = 1;
					break;
				}
			}
			if (hitDuplicate == 1) {
				randomQuestion();
			} else {
				questionIndex = randomNumber;
				load();
				myArr.push(questionIndex);

			}
		}
		if (myArray.length == 0) {
			questionIndex = randomNumber;
			load();
			myArr.push(questionIndex);
		}
		console.log("myArr:" + myArr)
		myArray.push(questionIndex);

	}
}
function answerTracker() {
	for (let i = 0; i < questions.length; i++) {
		const div = document.createElement('div');
		trackerContainer.appendChild(div);
	}
}
function updateAnswerTracker(className) {
	trackerContainer.children[index - 1].classList.add(className);
}

function quizOver() {
	document.querySelector(".quiz-over").classList.add('show');
	correctAnswerSpan.innerHTML = score;
	total2.innerHTML = questions.length;
	percent.innerHTML = (score/questions.length)*100 + "%";
}
function tryAgain() {
	window.location.reload();
}
window.onload = function () {
	randomQuestion()
	answerTracker()

}
