const openModalBtn = document.getElementById('openModal');
const closeModalBtn = document.getElementById('closeModal');
const playbackBtn = document.querySelector('.pomodoroControls');

const showModal = document.querySelector('.modalInfo');
const container = document.querySelector('.container');


// open modal
openModalBtn.addEventListener('click', () => {
    showModal.classList.add('activeModalInfo')
    playbackBtn.classList.add('activePomodoroControls')
    openModalBtn.style.display = "none";


})

// close modal
closeModalBtn.addEventListener('click', () => {
    showModal.classList.remove('activeModalInfo')
    playbackBtn.classList.remove('activePomodoroControls')
    openModalBtn.style.display = "flex";
})

// close the box if user clicks anywhere outside of the modal
window.onclick = function(event) {
    if (event.target == container) {
        showModal.classList.remove('activeModalInfo')
        playbackBtn.classList.remove('activePomodoroControls')
        openModalBtn.style.display = "flex";
    }
}