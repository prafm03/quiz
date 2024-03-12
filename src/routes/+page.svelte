<!-- App.svelte -->
<script>
    const quiz = {
        title: "Ashton on Mersey Greek Club Gods Quiz",
        questions: [
            {
                question: "Who was the god of fire?",
                options: {
                    Apollo: false,
                    Hephaestus: true,
                    Artemis: false,
                },
            },
            {
                question: "Who was the king of Olympus?",
                options: {
                    Ares: false,
                    Zeus: true,
                    Hermes: false,
                },
            },
            {
                question:
                    "Which goddess protected women, families and birth, as well as being queen of the gods?",
                options: {
                    Aphrodite: false,
                    Hera: true,
                    Demeter: false,
                },
            },
            {
                question:
                    "Which Olympian was the son of Zeus and born to a mortal mother?",
                options: {
                    Poseidon: false,
                    Dionysus: true,
                    Hades: false,
                },
            },
            {
                question: "Who was the god of sky?",
                options: {
                    Apollo: false,
                    Zeus: true,
                    Hermes: false,
                },
            },
            {
                question: "Who had a forge under a volcano?",
                options: {
                    Hestia: false,
                    Hephaestus: true,
                    Athena: false,
                },
            },
            {
                question:
                    "Which goddess has a chariot pulled by swans to glide through the air?",
                options: {
                    Demeter: false,
                    Hera: false,
                    Aphrodite: true,
                },
            },
            {
                question: "Who was the goddess of hearth, home and family?",
                options: {
                    Hestia: true,
                    Artemis: false,
                    Ares: false,
                },
            },
            {
                question:
                    "Who taught men how to grow corn, and was the goddess of the harvest?",
                options: {
                    Demeter: true,
                    Aphrodite: false,
                    Hades: false,
                },
            },
            {
                question: "Who had a helmet that could make them invisible?",
                options: {
                    Poseiden: false,
                    Athena: false,
                    Hades: true,
                },
            },
        ],
    };

    let currentQuestionIndex = 0;
    let userAnswers = [];
    let showResults = false;
    let selectedOption = null;

    function loadQuestion() {
        return quiz.questions[currentQuestionIndex];
    }

    function checkAnswer() {
        if (selectedOption) {
            const answer = selectedOption;
            userAnswers.push({
                question: quiz.questions[currentQuestionIndex].question,
                selectedAnswer: answer,
                correctAnswer: Object.keys(
                    quiz.questions[currentQuestionIndex].options,
                ).find(
                    (key) =>
                        quiz.questions[currentQuestionIndex].options[key] ===
                        true,
                ),
            });
            currentQuestionIndex++;
            if (currentQuestionIndex < quiz.questions.length) {
                return true;
            } else {
                showResults = true;
                return false;
            }
        } else {
            alert("Please select an answer!");
            return false;
        }
    }

    function resetQuiz() {
        currentQuestionIndex = 0;
        userAnswers = [];
        showResults = false;
    }

    function getRowColor(answer) {
        return answer.selectedAnswer === answer.correctAnswer
            ? "bg-green-50"
            : "bg-red-50";
    }
</script>

{#if !showResults}
    <div class="mx-auto my-6 max-w-xl">
        <h2 class="mb-4 text-xl text-gray-600">
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
        </h2>
        <form on:submit={checkAnswer}>
            <h3 class="mb-4 text-3xl font-semibold tracking-wide">
                {quiz.questions[currentQuestionIndex].question}
            </h3>

            <div class="flex flex-col">
                {#each Object.keys(quiz.questions[currentQuestionIndex].options) as option}
                    <label class="mb-2 inline-flex items-center" for={option}>
                        <input
                            class="form-radio mr-2 h-5 w-5 text-indigo-500"
                            bind:group={selectedOption}
                            type="radio"
                            name="answer"
                            id={option}
                            value={option}
                            required
                        />
                        <span class="text-gray-700">{option}</span>
                    </label>
                {/each}
            </div>
            <button
                class="mt-4 rounded bg-indigo-500 px-4 py-2 font-semibold text-white hover:bg-indigo-600"
                type="submit">Next</button
            >
        </form>
    </div>
{:else}
    <div class="mx-auto max-w-xl">
        <h2 class="mb-4 text-2xl font-semibold">Results</h2>
        <table class="w-full border-collapse border border-gray-300">
            <thead>
                <tr class="border-b border-gray-300 bg-gray-200">
                    <th class="px-4 py-2 text-left">Question</th>
                    <th class="px-4 py-2 text-left">Your Answer</th>
                    <th class="px-4 py-2 text-left">Correct Answer</th>
                </tr>
            </thead>
            <tbody>
                {#each userAnswers as answer}
                    <tr class="{getRowColor(answer)} border-b border-gray-300">
                        <td class="px-4 py-2">{answer.question}</td>
                        <td class="px-4 py-2">{answer.selectedAnswer}</td>
                        <td class="px-4 py-2">{answer.correctAnswer}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
        <p class="mt-4">
            Your score: {userAnswers.filter(
                ({ selectedAnswer, correctAnswer }) =>
                    selectedAnswer === correctAnswer,
            ).length}/{quiz.questions.length}
        </p>
        <button
            class="mt-4 rounded bg-indigo-500 px-4 py-2 font-semibold text-white hover:bg-indigo-600"
            on:click={resetQuiz}>Restart Quiz</button
        >
    </div>
{/if}
