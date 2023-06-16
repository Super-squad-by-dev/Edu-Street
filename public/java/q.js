const course = "Java 101 course";

fetch("q.json")
  .then(response => response.json())
  .then(questions => {
    questions.sort(() => Math.random() - 0.5);

    for (const question of questions) {
      question.answers = question.wrongans.concat(question.correctans);
      question.answers.sort(() => Math.random() - 0.5);
    }

    let i = 0;
    let j = 0;
    displayQuestion(i);

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
          displayResult(`You got ${j*5}% out of ${questions.length} questions correct!`, "blue");
          setTimeout(() => {
            if (j>15){
              localStorage.setItem("course", course);
              window.location.href = "../certificates/display.html";
            }else{
              displayResult(`You got ${j*5}% and you need more than ${10*5}% to pass`, "red");
            }
          }, 2000);
        }
      } else {
        displayResult("Incorrect. The correct answer is " + correctAnswers.join(", ") + ".", "red");
        i++;
        if (i < questions.length) {
          displayQuestion(i);
        } else {
          displayResult(`You got ${j*5}% out of 100% questions correct!`, "blue");
          if(j>10){
            setTimeout(() => {
              window.location.href = "../certificates/certificate.html";
            }, 2000);
          }
          else{
            setTimeout(() => {
              displayResult(`You got ${j*5}% and you need more than ${10*5}% to pass`, "red");
            }, 2000);
          }
        }
      }
    });

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

    function displayResult(message, color) {
      const resultDiv = document.querySelector("#result");
      resultDiv.textContent = message;
      resultDiv.style.color = color;
    }
  })
  .catch(error => console.error(error));
