// Load the questions from python_q.json
fetch("q.json")
  .then(response => response.json())
  .then(questions => {
    // Shuffle the questions array
    questions.sort(() => Math.random() - 0.5);

    // Shuffle the answers for each question
    for (const question of questions) {
      question.answers = question.wrongans.concat(question.correctans);
      question.answers.sort(() => Math.random() - 0.5);
    }

    // Display the first question
    let i = 0;
    let j = 0;
    displayQuestion(i);

    // Handle form submission
    const form = document.querySelector("form");
    form.addEventListener("submit", event => {
      event.preventDefault();
      const selectedOption = document.querySelector("input[name='option']:checked");
      if (selectedOption === null) {
        alert("Please select an option.");
        return;
      }
      const answer = selectedOption.value;
      const correctAnswers = questions[i].correctans;
      if (correctAnswers.includes(answer)) {
        displayResult("Correct!", "green");
        i++;
        j++;
        if (i < questions.length) {
          displayQuestion(i);
        } else {
          displayResult(`You got ${j} out of ${questions.length} questions correct!`, "blue");
        }
      } else {
        displayResult("Incorrect. The correct answer is " + correctAnswers.join(", ") + ".", "red");
        i++;
        if (i < questions.length) {
          displayQuestion(i);
        } else {
          displayResult(`You got ${j} out of ${questions.length} questions correct!`, "blue");
        }
      }
    });

    // Display a question
    function displayQuestion(i) {
      const questionDiv = document.querySelector("#question");
      const optionsDiv = document.querySelector("#options");
      const question = questions[i].Question;
      const options = questions[i].answers;
      questionDiv.textContent = question;
      optionsDiv.innerHTML = "";
      for (const option of options) {
        const label = document.createElement("label");
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "option";
        radio.value = option;
        label.appendChild(radio);
        label.append(` ${option}`);
        optionsDiv.appendChild(label);
        optionsDiv.appendChild(document.createElement("br"));
      }
    }

    // Display a result message
    function displayResult(message, color) {
      const resultDiv = document.querySelector("#result");
      resultDiv.textContent = message;
      resultDiv.style.color = color;
    }
  })
  .catch(error => console.error(error));
