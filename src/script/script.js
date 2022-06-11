// set variables
const startTimmer = document.getElementById('startTimmer');
const stopTimmer = document.getElementById('stopTimmer');
const resetTimmer = document.getElementById('resetTimmer');
const cycleCount = document.querySelector('.pomodoroCycle');

let minutes = document.querySelector('.minutes');
let seconds = document.querySelector('.seconds');





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

// start function only if is not already running.
const checkIfRunning = () => {
    if (checkIfIsRunning === undefined) {
        checkIfIsRunning = setInterval(startCount, 1000)
    } else { alert('time is already running') }
}



const createTomates = () => {
    const createImg = document.createElement('img');
    createImg.setAttribute('src', './assets/tomato.png')
    cycleCount.appendChild(createImg);
}


const startCount = () => {

    // if minutes and seconds is 0, and cildren of cycleCount is greater then 3 -RESET ALL VALUES AND STOP THE FUNCTION.
    if (minutes.innerText == 0 && seconds.innerText == 0 && cycleComplete === true && cycleCount.childElementCount > 3) {
        cycleCount.innerText = '';
        cycleComplete = false;
        return resetCycle();
    }

    // if minutes and seconds is 0, and cildren of cycleCount is equal with 3 - TAKE A LONG BREAK OF 15 MIN.
    else if (minutes.innerText == 0 && seconds.innerText == 0 && cycleCount.childElementCount == 3) {
        minutes.innerText = longBreak;
        seconds.innerText = secondsTime;
        cycleComplete = true;
        createTomates()

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
        minutes.innerText = shortBreak;
        seconds.innerText = secondsTime;
        cycleComplete = true;
        // displayCurrentAction.innerText = 'Now is time for a short break'
    }

}

function stopCycle() {
    clearInterval(checkIfIsRunning);
}

function resetCycle() {
    stopCycle();
    minutes.innerText = 25;
    seconds.innerText = '00'
    checkIfIsRunning = undefined
}


// add ev list
startTimmer.addEventListener('click', checkIfRunning)
stopTimmer.addEventListener('click', () => {
    stopCycle()
    checkIfIsRunning = undefined;
});
resetTimmer.addEventListener('click', resetCycle)