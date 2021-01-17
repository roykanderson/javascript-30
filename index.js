window.addEventListener('keydown', playSound);

function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    if(!audio) {
        return; // breaks out of function if key isn't one of the audio keys
    }
    audio.currentTime = 0; // rewind audio to the start
    audio.play();
    key.classList.add('playing');
}
d
function removeTransition(e) {
    if(e.propertyName !== 'transform') {
        return; // skip it if it's not a transform
    }
    this.classList.remove('playing');
}

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));