document.addEventListener("DOMContentLoaded", initializeQuizGame);

function initializeQuizGame() {
    // UI Elements
    const uiSections = {
        welcome: document.querySelector(".welcome-section"),
        nameEntry: document.querySelector(".name-entry-section"),
        countdown: document.querySelector(".countdown-section"),
        question: document.querySelector(".question-section"),
        results: document.querySelector(".results-section"),
        details: document.querySelector(".details-section"),
    };

    const buttons = {
        proceed: document.querySelector(".proceed-btn"),
        return: document.querySelector(".return-btn"),
        startGame: document.querySelector(".start-game-btn"),
        newGame: document.querySelector(".new-game-btn"),
        showDetails: document.querySelector(".show-details-btn"),
        backToResults: document.querySelector(".back-to-results-btn"),
        confirmAnswer: document.querySelector(".answer-confirm-btn"),
    };

    const displayElements = {
        nameInputs: document.querySelector(".name-inputs-container"),
        activePlayer: document.querySelector(".active-player-name"),
        question: document.querySelector(".question-display"),
        answerOptions: document.querySelector(".answer-options"),
        countdown: document.querySelector(".countdown-display"),
        timer: document.querySelector(".seconds-remaining"),
        results: document.querySelector(".results-display"),
        answersSummary: document.querySelector(".answers-summary"),
    };

    const game = {
        timer: null,
        data: {
            players: [],
            category: "",
            questionCount: 3,
            answerLog: [],
            currentPlayerIndex: 0,
            timePerQuestion: 10,
            currentQuestion: null,
            selectedAnswer: null,
        },
        questions: {
            html: createHTMLQuestions(),
            css: createCSSQuestions(),
            js: createJSQuestions(),
        },
    };

    loadSavedGame();
    setupEventListeners();

    function createHTMLQuestions() {
        return [
            {
                question: "What does HTML stand for?",
                answers: [
                    "Hyper Text Markup Language",
                    "Hot Mail",
                    "How to Make Lasagna",
                    "Home Tool Markup Language",
                ],
                correct: 0,
            },
            {
                question: "Who is making the Web standards?",
                answers: [
                    "The World Wide Web Consortium",
                    "Microsoft",
                    "Mozilla",
                    "Google",
                ],
                correct: 0,
            },
            {
                question:
                    "Which HTML tag is used to define an internal style sheet?",
                answers: ["<script>", "<style>", "<css>", "<html>"],
                correct: 1,
            },
            {
                question:
                    "Choose the correct HTML element for the largest heading:",
                answers: ["<head>", "<heading>", "<h6>", "<h1>"],
                correct: 3,
            },
            {
                question: "Which character is used to indicate an end tag?",
                answers: ["/", "<", "#", "*"],
                correct: 0,
            },
            {
                question: "Who invented HTML?",
                answers: [
                    "Tim Berners-Lee",
                    "Steve Jobs",
                    "Bill Gates",
                    "Mark Zuckerberg",
                ],
                correct: 0,
            },
            {
                question:
                    "This tag is used to create paragraphs in my web page:",
                answers: ["<BR>", "<P>", "<HR>", "<HTML>"],
                correct: 1,
            },
        ];
    }

    function createCSSQuestions() {
        return [
            {
                question: "CSS colors can take the form of all except:",
                answers: [
                    "a color name",
                    "an RGBa value",
                    "a hex code",
                    "monochromatic value",
                ],
                correct: 3,
            },
            {
                question: "What does CSS stand for?",
                answers: [
                    "Creative Style Sheets",
                    "Cascading Style Sheets",
                    "Colorful Style Sheets",
                    "Computer Style Sheets",
                ],
                correct: 1,
            },
            {
                question:
                    "Which HTML attribute is used to define inline styles?",
                answers: ["class", "font", "style", "styles"],
                correct: 2,
            },
            {
                question:
                    "Which property is used to change the background color?",
                answers: [
                    "bgcolor",
                    "background-color",
                    "color",
                    "backgroundStyle",
                ],
                correct: 1,
            },
            {
                question:
                    "Which property is used to change the font of an element?",
                answers: [
                    "font-family",
                    "font-weight",
                    "font-style",
                    "text-style",
                ],
                correct: 0,
            },
            {
                question: "How do you select an element with id 'demo' in CSS?",
                answers: ["*demo", ".demo", "demo", "#demo"],
                correct: 3,
            },
        ];
    }

    function createJSQuestions() {
        return [
            {
                question: "What will be logged to the console?",
                image: "hminteresting.jpg",
                answers: ["2015", "2016", "2017", "2018"],
                correct: 1,
            },
            {
                question: "Loops are the part of the program that...",
                answers: ["Repeats", "Remembers", "Chooses", "Varies"],
                correct: 0,
            },
            {
                question: "Inside which HTML element do we put the JavaScript?",
                answers: ["<script>", "<js>", "<javascript>", "<scripting>"],
                correct: 0,
            },
            {
                question: "Where is the correct place to insert a JavaScript?",
                answers: [
                    "Both <head> and <body>",
                    "Only <head>",
                    "Only <body>",
                    "Nowhere",
                ],
                correct: 0,
            },
            {
                question:
                    "What is the correct syntax for referring to an external script called 'xxx.js'?",
                answers: [
                    "<script src='xxx.js'>",
                    "<script name='xxx.js'>",
                    "<script href='xxx.js'>",
                    "<script file='xxx.js'>",
                ],
                correct: 0,
            },
            {
                question: "How do you write 'Hello World' in an alert box?",
                answers: [
                    "alert('Hello World');",
                    "prompt('Hello World');",
                    "alertBox('Hello World');",
                    "msgBox('Hello World');",
                ],
                correct: 0,
            },
            {
                question:
                    "Which event occurs when the user clicks on an HTML element?",
                answers: ["onmouseover", "onchange", "onclick", "onmouseclick"],
                correct: 2,
            },
        ];
    }

    function setupEventListeners() {
        buttons.proceed.addEventListener("click", handleProceed);
        buttons.return.addEventListener("click", handleReturn);
        buttons.startGame.addEventListener("click", startGame);
        buttons.confirmAnswer.addEventListener("click", confirmAnswer);
        buttons.showDetails.addEventListener("click", showAnswerDetails);
        buttons.backToResults.addEventListener("click", returnToResults);
        buttons.newGame.addEventListener("click", resetGame);
    }

    function handleProceed() {
        const playerCount = +document.querySelector(".player-count-select")
            .value;
        const category = document.querySelector(".category-select").value;
        const questionCount = +document.querySelector(".question-amount-select")
            .value;

        game.data.category = category;
        game.data.questionCount = questionCount;

        displayElements.nameInputs.innerHTML = "";
        for (let i = 1; i <= playerCount; i++) {
            const input = document.createElement("input");
            input.type = "text";
            input.placeholder = `Name for Player ${i}`;
            input.classList.add("player-name-input");
            displayElements.nameInputs.appendChild(input);
        }

        toggleSection(uiSections.welcome, uiSections.nameEntry);
    }

    function handleReturn() {
        toggleSection(uiSections.nameEntry, uiSections.welcome);
    }

    function startGame() {
        const nameInputs = document.querySelectorAll(".player-name-input");
        const playerNames = Array.from(nameInputs).map((input) =>
            input.value.trim()
        );

        if (playerNames.some((name) => name === "")) {
            alert("All player names must be filled!");
            return;
        }

        const playerColors = ["#e63946", "#2a9d8f", "#457b9d", "#8338ec"];
        game.data.players = playerNames.map((name, index) => ({
            name,
            score: 0,
            color: playerColors[index % playerColors.length],
            questions: [],
        }));

        prepareQuestions();
        game.data.currentPlayerIndex = 0;
        game.data.answerLog = [];
        saveGameState();

        toggleSection(uiSections.nameEntry, uiSections.countdown);
        startCountdown(5);
    }

    function prepareQuestions() {
        let availableQuestions = [];

        if (game.data.category === "mixed") {
            availableQuestions = [
                ...game.questions.html,
                ...game.questions.css,
                ...game.questions.js,
            ];
        } else {
            availableQuestions = [...game.questions[game.data.category]];
        }

        shuffleArray(availableQuestions);

        const totalQuestionsNeeded =
            game.data.players.length * game.data.questionCount;
        while (availableQuestions.length < totalQuestionsNeeded) {
            availableQuestions = availableQuestions.concat(availableQuestions);
        }

        let questionIndex = 0;
        game.data.players.forEach((player) => {
            player.questions = availableQuestions.slice(
                questionIndex,
                questionIndex + game.data.questionCount
            );
            questionIndex += game.data.questionCount;
        });
    }

    function startCountdown(seconds) {
        displayElements.countdown.textContent = seconds;
        displayElements.countdown.classList.add("countdown-animate");

        const interval = setInterval(() => {
            seconds--;
            displayElements.countdown.textContent = seconds;

            if (seconds <= 0) {
                clearInterval(interval);
                displayElements.countdown.classList.remove("countdown-animate");
                toggleSection(uiSections.countdown, uiSections.question);
                beginQuestionRound();
            }
        }, 1000);
    }

    function beginQuestionRound() {
        if (checkAllQuestionsAnswered()) {
            endGame();
            return;
        }

        if (game.timer) clearInterval(game.timer);

        const currentPlayer = game.data.players[game.data.currentPlayerIndex];
        displayElements.activePlayer.textContent = currentPlayer.name;
        displayElements.activePlayer.style.color = currentPlayer.color;
        document.documentElement.style.setProperty(
            "--accent-color",
            currentPlayer.color
        );

        if (currentPlayer.questions.length === 0) {
            moveToNextPlayer();
            beginQuestionRound();
            return;
        }

        const question = currentPlayer.questions.shift();
        displayQuestion(question);
        startQuestionTimer();
    }

    function displayQuestion(question) {
        displayElements.question.innerHTML = "";

        if (question.image) {
            const img = document.createElement("img");
            img.src = question.image;
            img.alt = "Question Image";
            img.style.maxWidth = "100%";
            img.style.marginBottom = "10px";
            displayElements.question.appendChild(img);
        }

        const questionText = document.createElement("p");
        questionText.textContent = question.question;
        questionText.style.fontSize = "18px";
        displayElements.question.appendChild(questionText);

        displayElements.answerOptions.innerHTML = "";
        question.answers.forEach((answer) => {
            const button = document.createElement("button");
            button.classList.add("answer-option-btn");
            button.textContent = answer;
            button.addEventListener("click", () => {
                document
                    .querySelectorAll(".answer-option-btn")
                    .forEach((btn) => {
                        btn.classList.remove("selected");
                    });
                button.classList.add("selected");
                game.data.selectedAnswer = answer;
            });
            displayElements.answerOptions.appendChild(button);
        });

        game.data.currentQuestion = question;
    }

    function startQuestionTimer() {
        let timeLeft = game.data.timePerQuestion;
        displayElements.timer.textContent = timeLeft;

        game.timer = setInterval(() => {
            timeLeft--;
            displayElements.timer.textContent = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(game.timer);
                evaluateAnswer(true);
            }
        }, 1000);
    }

    function confirmAnswer() {
        if (game.data.currentQuestion) {
            evaluateAnswer(false);
        }
    }

    function evaluateAnswer(timeExpired) {
        if (game.timer) clearInterval(game.timer);

        const currentPlayer = game.data.players[game.data.currentPlayerIndex];
        const question = game.data.currentQuestion;
        const selectedButton = document.querySelector(
            ".answer-option-btn.selected"
        );

        let selectedIndex = -1;
        let playerAnswer = "No answer";

        if (selectedButton) {
            const allButtons = [
                ...document.querySelectorAll(".answer-option-btn"),
            ];
            selectedIndex = allButtons.indexOf(selectedButton);
            playerAnswer = question.answers[selectedIndex] || "No answer";
        }

        const correctAnswer =
            question.answers[question.correct] || "No correct answer";
        const isCorrect = !timeExpired && selectedIndex === question.correct;

        if (isCorrect) {
            currentPlayer.score += 10;
        }

        game.data.answerLog.push({
            playerName: currentPlayer.name,
            question: question.question,
            correctAnswer,
            selectedAnswer: playerAnswer,
            isCorrect,
        });

        moveToNextPlayer();

        if (checkAllQuestionsAnswered()) {
            endGame();
        } else {
            beginQuestionRound();
        }

        saveGameState();
    }

    function moveToNextPlayer() {
        game.data.currentPlayerIndex++;
        if (game.data.currentPlayerIndex >= game.data.players.length) {
            game.data.currentPlayerIndex = 0;
        }
    }

    function checkAllQuestionsAnswered() {
        return game.data.players.every(
            (player) => player.questions.length === 0
        );
    }

    function endGame() {
        toggleSection(uiSections.question, uiSections.results);
        displayResults();
        saveGameState();
    }

    function displayResults() {
        const sortedPlayers = [...game.data.players].sort(
            (a, b) => b.score - a.score
        );
        const topScore = sortedPlayers[0].score;
        const winners = sortedPlayers.filter(
            (player) => player.score === topScore
        );

        if (winners.length === 1) {
            displayElements.results.innerHTML = `Champion: <strong>${winners[0].name}</strong> with ${winners[0].score} points!<br><br>`;
        } else {
            const winnerNames = winners.map((winner) => winner.name).join(", ");
            displayElements.results.innerHTML = `Draw! Champions: <strong>${winnerNames}</strong> with ${topScore} points!<br><br>`;
        }

        displayElements.results.innerHTML += sortedPlayers
            .map(
                (player, index) =>
                    `${index + 1}. ${player.name} - ${player.score} points`
            )
            .join("<br>");
    }

    function showAnswerDetails() {
        toggleSection(uiSections.results, uiSections.details);
        displayElements.answersSummary.innerHTML = "";

        displayElements.answersSummary.style.display = "flex";
        displayElements.answersSummary.style.flexWrap = "wrap";
        displayElements.answersSummary.style.justifyContent = "space-around";

        game.data.players.forEach((player) => {
            const playerColumn = createPlayerAnswerColumn(player);
            displayElements.answersSummary.appendChild(playerColumn);
        });
    }

    function createPlayerAnswerColumn(player) {
        const column = document.createElement("div");
        column.style.backgroundColor = "#222";
        column.style.padding = "10px";
        column.style.margin = "10px";
        column.style.borderRadius = "8px";
        column.style.flex = "1 1 200px";

        const heading = document.createElement("h3");
        heading.textContent = `${player.name}'s Answers`;
        heading.style.color = player.color;
        column.appendChild(heading);

        const playerAnswers = game.data.answerLog.filter(
            (entry) => entry.playerName === player.name
        );

        playerAnswers.forEach((answer, index) => {
            const answerElement = createAnswerElement(answer, index);
            column.appendChild(answerElement);
        });

        return column;
    }

    function createAnswerElement(answer, index) {
        const element = document.createElement("div");
        element.style.marginBottom = "15px";
        const color = answer.isCorrect ? "#66ff66" : "#ff6666";

        element.innerHTML = `
            <strong>Q${index + 1}:</strong> ${escapeHtml(answer.question)}<br/>
            <em style="color:green;">Correct: ${escapeHtml(
                answer.correctAnswer
            )}</em><br/>
            <span style="color:${color};">
                Your Answer: ${escapeHtml(answer.selectedAnswer)}
            </span>
        `;
        return element;
    }

    function escapeHtml(text) {
        return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    function returnToResults() {
        toggleSection(uiSections.details, uiSections.results);
    }

    function resetGame() {
        localStorage.removeItem("gameState");
        location.reload();
    }

    function toggleSection(hideSection, showSection) {
        hideSection.classList.remove("active");
        hideSection.classList.add("hidden");
        showSection.classList.remove("hidden");
        showSection.classList.add("active");
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function saveGameState() {
        localStorage.setItem("gameState", JSON.stringify(game.data));
    }

    function loadSavedGame() {
        const savedData = localStorage.getItem("gameState");
        if (savedData) {
            game.data = JSON.parse(savedData);
        }
    }
}
