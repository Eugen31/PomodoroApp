// reference to elements
const startTimmer = document.getElementById('startTimmer');
const stopTimmer = document.getElementById('stopTimmer');
const resetTimmer = document.getElementById('resetTimmer');
const cycleCount = document.querySelector('.pomodoroCycle');
let minutes = document.querySelector('.minutes');
let seconds = document.querySelector('.seconds');
let currentCycleMessage = document.querySelector('h1');


// get audio sound
let errorSound = new Audio('./assets/err.mp3');
let startSound = new Audio('./assets/start.mp3');
let shortB = new Audio('./assets/short.mp3')
let longB = new Audio('./assets/long.mp3')



let pomodoro = {
    workTime: 25,
    shortBreak: 5,
    longBreak: 15,
    secondsTime: '00',
    cycleComplete: false
}
let { workTime, shortBreak, longBreak, secondsTime, cycleComplete } = pomodoro;

minutes.innerText = workTime;
seconds.innerText = secondsTime;

let checkIfIsRunning;


// start counting function only if is not already running.
const checkIfRunning = () => {
    if (checkIfIsRunning === undefined) {
        if (minutes.innerText == 25) {
            currentCycleMessage.innerHTML = 'Now is time for working';
        }
        playSound(startSound);
        checkIfIsRunning = setInterval(startCount, 1000);
        startTimmer.blur()

    } else {
        playSound(errorSound)
        alert('time is already running')
    }
}

// create tommates func.
const createTomates = () => {
    const createImg = document.createElement('img');
    createImg.setAttribute('src', './assets/tomato.png')
    cycleCount.appendChild(createImg);
}

// counting func.
const startCount = () => {

    // if minutes and seconds is 0, and cildren of cycleCount is greater then 3 -RESET ALL VALUES AND STOP THE FUNCTION.
    if (minutes.innerText == 0 && seconds.innerText == 0 && cycleComplete === true && cycleCount.childElementCount > 3) {
        playSound(longB);
        cycleCount.innerText = '';
        cycleComplete = false;
        currentCycleMessage.innerHTML = 'Pomodoro Timmer';
        return resetCycle();
    }

    // if minutes and seconds is 0, and cildren of cycleCount is equal with 3 - TAKE A LONG BREAK OF 15 MIN.
    else if (minutes.innerText == 0 && seconds.innerText == 0 && cycleCount.childElementCount == 3) {
        playSound(shortB)
        minutes.innerText = longBreak;
        seconds.innerText = secondsTime;
        cycleComplete = true;
        createTomates()
        currentCycleMessage.innerHTML = 'Take a long break';



        // if minutes and seconds is 0, and one cycle is complete - CREATE A TOMATE RESET ALL VALUE AND RUN THE FUNCTION AGAIN. 
    } else if (minutes.innerText == 0 && seconds.innerText == 0 && cycleComplete === true) {
        createTomates()
        resetCycle()
        checkIfRunning()
        cycleComplete = false;

        // if seconds are not 0, COUNTDOWN SECONDS.
    } else if (seconds.innerText != 0) {
        seconds.innerText--;

        // if minutes are not 0 and seconds are equal to 0 - SET VALUE OF SECONDS TO 59 AND THEN COUNTDOWN MINUTES.
    } else if (minutes.innerText != 0 && seconds.innerText == 0) {
        seconds.innerText = 59;
        minutes.innerText--;

        // if minutes and seconds are equal to 0 - GO FOR SHORT BREAK AND CHANGE CYCLE TO TRUE.
    } else if (minutes.innerText == 0 && seconds.innerText == 0) {
        playSound(shortB);
        minutes.innerText = shortBreak;
        seconds.innerText = secondsTime;
        cycleComplete = true;
        currentCycleMessage.innerHTML = 'Take a short break';
    }

}

// stop timmer func.
const stopCycle = () => {
    clearInterval(checkIfIsRunning);
    checkIfIsRunning = undefined;
    stopTimmer.blur()
}

// reset timmer func.
const resetCycle = () => {
    stopCycle();
    minutes.innerText = 25;
    seconds.innerText = '00';
    checkIfIsRunning = undefined
    resetTimmer.blur()
    currentCycleMessage.innerHTML = 'Pomodoro Timmer';

}

// playSound function
const playSound = src => src.play();


// keybord events
window.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        checkIfRunning()
    }

    if (e.keyCode === 32) {
        stopCycle()
    }

    if (e.keyCode === 8) {
        resetCycle()
    }
})

// mouse events
startTimmer.addEventListener('click', checkIfRunning)
resetTimmer.addEventListener('click', resetCycle)
stopTimmer.addEventListener('click', stopCycle);