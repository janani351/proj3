const questions = [
  { question: 'Which language describes the structure of a web page?', answers: ['HTML', 'Python', 'SQL', 'C'], correct: 0 },
  { question: 'Which CSS property changes text colour?', answers: ['font-size', 'color', 'margin', 'display'], correct: 1 },
  { question: 'Which method selects an element by its ID?', answers: ['queryAll()', 'getElementById()', 'findElement()', 'selectId()'], correct: 1 },
  { question: 'Which browser feature can store small key-value data?', answers: ['localStorage', 'console.log', 'alert()', 'prompt()'], correct: 0 },
  { question: 'Which keyword declares a block-scoped variable?', answers: ['varonly', 'define', 'let', 'static'], correct: 2 }
];
let current = 0;
let score = 0;
let answered = false;

const questionEl = document.querySelector('#question');
const answersEl = document.querySelector('#answers');
const feedbackEl = document.querySelector('#feedback');
const nextButton = document.querySelector('#next');

function showQuestion() {
  answered = false;
  const item = questions[current];
  document.querySelector('#progress').textContent = `Question ${current + 1} of ${questions.length}`;
  document.querySelector('#score').textContent = `Score: ${score}`;
  document.querySelector('#progress-bar').style.width = `${(current / questions.length) * 100}%`;
  questionEl.textContent = item.question;
  feedbackEl.textContent = '';
  nextButton.disabled = true;
  answersEl.replaceChildren();
  item.answers.forEach((answer, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = answer;
    button.addEventListener('click', () => chooseAnswer(index));
    answersEl.append(button);
  });
}
function chooseAnswer(index) {
  if (answered) return;
  answered = true;
  const correct = index === questions[current].correct;
  if (correct) score += 1;
  [...answersEl.children].forEach((button, i) => {
    button.disabled = true;
    if (i === questions[current].correct) button.classList.add('correct');
    else if (i === index) button.classList.add('wrong');
  });
  feedbackEl.textContent = correct ? 'Correct answer!' : `Not quite. Correct answer: ${questions[current].answers[questions[current].correct]}`;
  document.querySelector('#score').textContent = `Score: ${score}`;
  nextButton.disabled = false;
  nextButton.textContent = current === questions.length - 1 ? 'View result' : 'Next question';
}
function finish() {
  document.querySelector('#quiz-area').hidden = true;
  document.querySelector('#result').hidden = false;
  document.querySelector('#final-score').textContent = `You scored ${score} out of ${questions.length}.`;
  document.querySelector('#progress-bar').style.width = '100%';
}
nextButton.addEventListener('click', () => {
  if (!answered) return;
  current += 1;
  if (current < questions.length) showQuestion();
  else finish();
});
document.querySelector('#restart').addEventListener('click', () => {
  current = 0; score = 0;
  document.querySelector('#quiz-area').hidden = false;
  document.querySelector('#result').hidden = true;
  nextButton.textContent = 'Next question';
  showQuestion();
});
showQuestion();
