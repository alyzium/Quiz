class Question {
    constructor(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }

    isCorrectAnswer(choice) {
        return this.answer === choice; // checker le parametre passé par l'utilisateur 
    }
}

let questions = [
    new Question("Quelle méthode  Javascript permet de  filtrer les éléments d'un tableau ?",
        ["indexOf()", "map()", "reduce()", "filter()"],
        "filter()"),
    new Question("Quelle méthode  Javascript permet de  verifier si un élément figure sur le tableau ?",
        ["isNaN()", "includes()", "indexOf()", "isOdd()"],
        "indexOf()"),
    new Question("Quelle méthode transforme du Json en un objet Javascript ?",
        ["JSON.parse()", "JSON.object()", "JSON.stringify()", "JSON.tojs()"],
        "JSON.parse()"),
    new Question("Quel objet Javascript permet d'arrondir à l'entier le plus proche",
        ["Math.ceil()", "Math.floor()", "Math.round()", "Math.random()"],
        "Math.round()"),
    new Question("Quelle operateur devons nous utiliser  pour avoir le résultat 5 (?) 5=10",
        ["+", "-", "*", "/"],
        "+"),
]

class Quiz {
    constructor(questions) {
        this.score = 0;
        this.questions = questions;
        this.currentQuestionIndex = 0;
    }

    getCurrentQuestion() {
        return this.questions[this.currentQuestionIndex];
    }

    guess(answer) {
        if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
            this.score++;
        }
        this.currentQuestionIndex++;
    }

    hasEnded() {
        return this.currentQuestionIndex >= this.questions.length;
    }
}

// regroup all the functions related to the display    
const display = {
    elementShown: function (id, text) {
        let element = document.getElementById(id);
        element.innerHTML = text;
    },
    endQuiz: function () {
        let endQuizHTML = `
        <h1> Quiz terminé </h1>
        <h3> Votre score est de :  ${quiz.score}/${quiz.questions.length} </h3><br><br>
        <h4> Vous allez être rediriger vers le debut de Quiz dans quelques instants </h4>`;
        this.elementShown("quiz", endQuizHTML);
        setInterval(function () {
            window.location.reload(1);
        }, 7000);

    },
    question: function () {
        this.elementShown("question", quiz.getCurrentQuestion().text); // on cherche la question depuis le constructeur
    },

    choices: function () {
        let choices = quiz.getCurrentQuestion().choices;

        guessHandler = (id, guess) => {
            document.getElementById(id).onclick = function () {
                quiz.guess(guess);
                quizApp();
            }
        }

        for (let i = 0; i < choices.length; i++) {
            this.elementShown("choice" + i, choices[i]);
            guessHandler("guess" + i, choices[i]);
        }
    },  
    progress: function () {
        let currentQuestionNumber = quiz.currentQuestionIndex + 1;
        this.elementShown("progress", "Question " + currentQuestionNumber + " sur " + quiz.questions.length);
    }
}

// game logic
quizApp = () => {
    if (quiz.hasEnded()) {
        //end
        display.endQuiz();
    } else {
        // logic ( affichage de la question , des choix et le progres )
        display.question();
        display.choices();
        display.progress();
        
    }
}

// create Quiz

let quiz = new Quiz(questions);
quizApp();
console.log(quiz);