document.addEventListener('DOMContentLoaded', () => {
    const quizForm = document.getElementById('quiz-form');
    const resultDiv = document.getElementById('result');

    const correctAnswers = {
        q1: '8',
        q2: 'list',
        q3: '.py',
        q4: 'def',
        q5: '# This is a comment',
        q6: 'strip()',
        q7: 'Indentation',
        q8: 'x = 5',
        q9: '*',
        q10: 'List'
    };

    quizForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let score = 0;
        const formData = new FormData(quizForm);

        for (const [question, answer] of formData.entries()) {
            if (answer === correctAnswers[question]) {
                score++;
            }
        }

        resultDiv.innerHTML = `<h2>Your Score: ${score} / 10</h2>`;
    });
});