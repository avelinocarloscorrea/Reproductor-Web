let videos = [];
let currentVideoIndex = 0;

fetch('videos.json')
    .then(response => response.json())
    .then(data => {
        videos = data;
        loadVideo(currentVideoIndex);
        populatePlaylist();
    });

function loadVideo(index) {
    const videoPlayer = document.getElementById('video-player');
    const videoTitle = document.getElementById('video-title');
    const videoDescription = document.getElementById('video-description');
    const importantNotes = document.getElementById('important-notes');
    const examples = document.getElementById('examples');
    const usage = document.getElementById('usage');
    const graphics = document.getElementById('graphics');
    const quizQuestion = document.getElementById('quiz-question');
    const quizOptions = document.getElementById('quiz-options');
    const quizResult = document.getElementById('quiz-result');

    const video = videos[index];
    videoPlayer.src = video.file;
    videoTitle.textContent = video.title;
    videoDescription.textContent = video.description;

    // Show important notes
    importantNotes.innerHTML = `<strong>Importancia:</strong> ${video.importance}`;

    // Show examples
    examples.innerHTML = `<strong>Ejemplos:</strong><ul>${video.examples.map(example => `<li>${example}</li>`).join('')}</ul>`;

    // Show usage
    usage.innerHTML = `<strong>Uso:</strong> ${video.usage}`;



    // Load quiz
    quizQuestion.textContent = video.quiz.question;
    quizOptions.innerHTML = video.quiz.options.map(option => `<button onclick="selectAnswer('${option.answer}', ${option.correct})">${option.answer}</button>`).join('');

    // Clear previous quiz result
    quizResult.textContent = "";

    videoPlayer.play();
}

function populatePlaylist() {
    const playlist = document.getElementById('playlist');
    videos.forEach((video, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = video.title;
        listItem.onclick = () => {
            currentVideoIndex = index;
            loadVideo(currentVideoIndex);
        };
        playlist.appendChild(listItem);
    });
}

function selectAnswer(answer, correct) {
    const quizResult = document.getElementById('quiz-result');
    if (correct) {
        quizResult.textContent = "¡Respuesta Correcta!";
    } else {
        quizResult.textContent = "Respuesta Incorrecta. Inténtalo de nuevo.";
    }
}
