//question database
const STORE = [
  {
    question: 'Name the only insect in the world who can turn their heads?',
    answers: [
      'Bee',
      'Mosquito',
      'Praying Mantis',
      'Fly'
    ],
    correctAnswer:
      'Praying Mantis'
  },
  {
    question:
      'A kangaroos gestation period lasts for how many days?',
    answers: [
      '60',
      '33',
      '115',
      '271'
    ],
    correctAnswer:
      '33'
  },
  {
    question:
      'A baby oyster is called what?',
    answers: [
      'Spat',
      'Spit',
      'Spot',
      'Nub'
    ],
    correctAnswer: 'Spat'
  },
  {
    question: 'Name the worlds largest feline:',
    answers: [
      'Lion',
      'Snow Leopard',
      'Maine Coone',
      'Siberian Tiger'
    ],
    correctAnswer: 'Siberian Tiger'
  },
  {
    question:
      'Name the worlds deadliest spider:',
    answers: [
      'Black Widow',
      'Brazilian Wandering Spider',
      'Shelob',
      'Brown Recluse Spider'
    ],
    correctAnswer:
      'Brazilian Wandering Spider'
  }
];

//variables to store the quiz score and question number information
let score = 0;
let questionNumber = 0;

//template to generate each question
function generateQuestion() {
  if (questionNumber < STORE.length) {
    return createThing(questionNumber);
  } else {
    $('.questionBox').hide();
    finalScore();
    $('.questionNumber').text(10);
  }
}

//increments the number value of the "score" variable by one
//and updates the "score" number text in the quiz view
function updateScore() {
  score++;
  $('.score').text(score);
}

//increments the number value of the "question number" variable by one
//and updates the "question number" text in the quiz view
function updateQuestionNumber() {
  questionNumber++;
  $('.questionNumber').text(questionNumber + 1);
}

//resets the text value of the "question number" and "score" variables
//and updates their repective text in the quiz view
function resetStats() {
  score = 0;
  questionNumber = 0;
  $('.score').text(0);
  $('.questionNumber').text(0);
}

//begins the quiz
function startQuiz() {
  $('.altBox').hide();
  $('.startQuiz').on('click', '.startButton', function (event) {
    $('.startQuiz').hide();
    $('.questionNumber').text(1);
    $('.questionBox').show();
    $('.questionBox').prepend(generateQuestion());
  });
}

//submits a selected answer and checks it against the correct answer
//runs answer functions accordingly
function submitAnswer() {
  $('.jungleBox').on('submit', function (event) {
    event.preventDefault();
    $('.altBox').hide();
    $('.response').show();
    let selected = $('input:checked');
    let answer = selected.val();
    let correct = STORE[questionNumber].correctAnswer;
    if (answer === correct) {
      correctAnswer();
    } else {
      wrongAnswer();
    }
  });
}

//creates html for question form
function createThing(questionIndex) {
  let formMaker = $(`<form>
    <fieldset>
      <legend class="questionText">${STORE[questionIndex].question}</legend>
    </fieldset>
  </form>`)

  let fieldSelector = $(formMaker).find('fieldset');

  STORE[questionIndex].answers.forEach(function (answerValue, answerIndex) {
    $(`<label class="sizeMe" for="${answerIndex}">
        <input class="radio" type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
        <span>${answerValue}</span>
      </label>
      `).appendTo(fieldSelector);
  });
  $(`<button type="submit" class="submitButton button"> Submit</button > `).appendTo(fieldSelector);
  return formMaker;
}

//resulting feedback if a selected answer is correct
//increments user score by one
function correctAnswer() {
  $('.response').html(
    `<h3>Your answer is correct!</h3>
    <img src="images/correct.jpg" alt="happy cow" class="images" width="200px">
      <p class="sizeMe">You made a cow happy!</p>
      <button type="button" class="nextButton button">Next</button>`
  );
  updateScore();
}

//resulting feedback if a selected answer is incorrect
function wrongAnswer() {
  $('.response').html(
    `<h3>That's the wrong answer...</h3>
    <img src="images/wrong.jpg" alt="lunchtime" class="images" width="200px">
    <p class="sizeMe">It's actually:</p>
    <p class="sizeMe">${STORE[questionNumber].correctAnswer}</p>
    <button type="button" class="nextButton button">Next</button>`
  );
}

//generates the next question
function nextQuestion() {
  $('.jungleBox').on('click', '.nextButton', function (event) {
    $('.altBox').hide();
    $('.questionBox').show();
    updateQuestionNumber();
    $('.questionBox form').replaceWith(generateQuestion());
  });
}

//determines final score and feedback at the end of the quiz
function finalScore() {
  $('.final').show();

  const great = [
    'Great job!',
    'images/win.jpg',
    'happy tiger',
    'You must watch a lot of Animal Planet!'
  ];

  const good = [
    'Good, not great.',
    'images/read.jpg',
    'ostrich',
    'You should keep studying ...'
  ];

  const bad = [
    'Do you even go outside?',
    'images/end.jpg',
    'fox sprayed by skunk',
    'Maybe you should read a book?'
  ];

  if (score >= 5) {
    array = great;
  } else if (score >= 3) {
    array = good;
  } else {
    array = bad;
  }
  return $('.final').html(
    `<h3>${array[0]}</h3>
      <img src="${array[1]}" alt="${array[2]}" class="images">
        <h3>Your score is ${score} / 5</h3>
        <p class="sizeMe">${array[3]}</p>
        <button type="submit" class="restartButton button">Restart</button>`
  );
}

//takes user back to the starting view to restart the quiz
function restartQuiz() {
  $('.jungleBox').on('click', '.restartButton', function (event) {
    event.preventDefault();
    resetStats();
    $('.altBox').hide();
    $('.startQuiz').show();
  });
}


//runs the functions
function makeQuiz() {
  startQuiz();
  generateQuestion();
  submitAnswer();
  nextQuestion();
  restartQuiz();
}

$(makeQuiz);