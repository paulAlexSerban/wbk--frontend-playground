const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const basePath = main.getAttribute('data-base-path');

const data = [
    {
        image: basePath.replace('{0}', 'drink'),
        text: "I'm Thirsty",
    },
    {
        image: basePath.replace('{0}', 'food'),
        text: "I'm Hungry",
    },
    {
        image: basePath.replace('{0}', 'tired'),
        text: "I'm Tired",
    },
    {
        image: basePath.replace('{0}', 'hurt'),
        text: "I'm Hurt",
    },
    {
        image: basePath.replace('{0}', 'happy'),
        text: "I'm Happy",
    },
    {
        image: basePath.replace('{0}', 'angry'),
        text: "I'm Angry",
    },
    {
        image: basePath.replace('{0}', 'sad'),
        text: "I'm Sad",
    },
    {
        image: basePath.replace('{0}', 'scared'),
        text: "I'm Scared",
    },
    {
        image: basePath.replace('{0}', 'outside'),
        text: 'I Want To Go Outside',
    },
    {
        image: basePath.replace('{0}', 'home'),
        text: 'I Want To Go Home',
    },
    {
        image: basePath.replace('{0}', 'school'),
        text: 'I Want To Go To School',
    },
    {
        image: basePath.replace('{0}', 'grandma'),
        text: 'I Want To Go To Grandmas',
    },
];

data.forEach(createBox);

// Create speech boxes
function createBox(item) {
    const box = document.createElement('div');

    const { image, text } = item;

    box.classList.add('box');

    box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
  `;

    box.addEventListener('click', () => {
        setTextMessage(text);
        speakText();

        // Add active effect
        box.classList.add('active');
        setTimeout(() => box.classList.remove('active'), 800);
    });

    main.appendChild(box);
}

// Init speech synth
const message = new SpeechSynthesisUtterance();

// Store voices
let voices = [];

function getVoices() {
    voices = speechSynthesis.getVoices();

    voices.forEach((voice) => {
        const option = document.createElement('option');

        option.value = voice.name;
        option.innerText = `${voice.name} ${voice.lang}`;

        voicesSelect.appendChild(option);
    });
}

// Set text
function setTextMessage(text) {
    message.text = text;
}

// Speak text
function speakText() {
    speechSynthesis.speak(message);
}

// Set voice
function setVoice(e) {
    message.voice = voices.find((voice) => voice.name === e.target.value);
}

// Voices changed
speechSynthesis.addEventListener('voiceschanged', getVoices);

// Toggle text box
toggleBtn.addEventListener('click', () => document.getElementById('text-box').classList.toggle('show'));

// Close button
closeBtn.addEventListener('click', () => document.getElementById('text-box').classList.remove('show'));

// Change voice
voicesSelect.addEventListener('change', setVoice);

// Read text button
readBtn.addEventListener('click', () => {
    setTextMessage(textarea.value);
    speakText();
});

getVoices();
