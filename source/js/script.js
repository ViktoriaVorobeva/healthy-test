const checkButton = document.querySelector('#button');
const errorBlock = document.querySelector('#error');
const resultBlock = document.querySelector('#result');
const resetButton = document.querySelector('#reset');

const COUNTQUESTIONS = 10;

const ITERPRETATION = [
  [10, 16, "Вам чаще следует обращать внимание на собственное здоровье. Ваше пренебрежительное отношение к здоровью может стоить Вам очень дорого.Чтобы жить полноценной изнью, необходимо хоть чуточку прислушиваться к собственному организму и обеспечивать себе хорошее самочувствие"],
  [17, 24, "По большому счету Ваше отношение к здоровью вполне разумное, но стоит больше времени проводить на свежем воздухе: и в спортивном зале. Не стоит также все свое свободное время проводить в кабинете врача, но и пренебрегать его советами тоже не стоит"],
  [25, 30, "В Вашей щепетильности по отношению к собственному здоровью никто не усомнится. Но врачи не всегда смогут Вам помочь. Дело не в Вашем слабом здоровье, дело — в нервном напряжении. Разберитесь в своих отношениях с окружающими и почувствуете себя гораздо лучше. Все, что Вам необходимо на сегодняшний день, — это уют и спокойствие."]
]

const SOLUTION = [{
    a: 3,
    b: 1,
    c: 2
  },
  {
    a: 3,
    b: 2,
    c: 1
  },
  {
    a: 1,
    b: 2,
    c: 3
  },
  {
    a: 3,
    b: 2,
    c: 1
  },
  {
    a: 3,
    b: 1,
    c: 2
  },
  {
    a: 3,
    b: 2,
    c: 1
  },
  {
    a: 1,
    b: 3,
    c: 2
  },
  {
    a: 1,
    b: 2,
    c: 3
  },
  {
    a: 1,
    b: 2,
    c: 3
  },
  {
    a: 1,
    b: 1,
    c: 3
  },
];

let isError = false;

function getErrorMessage() {
  const textElement = document.createElement('p');
  textElement.innerHTML = "Необходимо ответить на все вопросы";
  textElement.classList.add('error');
  errorBlock.appendChild(textElement);
  isError = true;
}

function getInterpretation(num) {
  for (let [left, right, text] of ITERPRETATION) {
    if (left <= num && num <= right) {
      return text;
    }
  }
}

resetButton.addEventListener('click', (event) => {
  event.preventDefault();
  location.reload();
})

function getResultMessage(sum) {
  const titleElement = document.createElement('h2');
  const textElement = document.createElement('p');
  titleElement.innerHTML = `Ваш результат: ${sum}`;
  textElement.innerHTML = getInterpretation(sum);
  resultBlock.appendChild(titleElement);
  titleElement.classList.add('success');
  resultBlock.appendChild(textElement);
  textElement.classList.add('success');

  if (isError) {
    const error = document.querySelector('#error p');
    errorBlock.removeChild(error);
  }
  isError = false;
  checkButton.setAttribute('disabled', '');
}

checkButton.addEventListener('click', () => {
  const answers = document.querySelectorAll('input[type=radio]');
  const filteredInputs = [];
  let validationCount = 0;

  for (const answer of answers) {
    if (answer.checked) {
      validationCount++;
      filteredInputs.push(answer.value);
    }
  }

  if (validationCount < COUNTQUESTIONS) {
    getErrorMessage();
    return;
  }

  let sum = 0;
  for (let i = 0; i < filteredInputs.length; i++) {
    const currentAnswer = filteredInputs[i];
    const currentSolution = SOLUTION[i];
    sum += currentSolution[currentAnswer];
  }
  getResultMessage(sum)
})
