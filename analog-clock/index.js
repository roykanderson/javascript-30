function getHours0to11(dateObject) {
    let hours0to23 = dateObject.getHours();
    if (hours0to23 > 11) {
        return hours0to23 - 12;
    }
    return hours0to23;
}

function rotate(hand, numerator, denominator) {
    let degrees = (numerator / denominator) * 360;
    hand.style.transform = `rotate(${degrees}deg)`;
    if (numerator === denominator - 1) { // if it's the last increment before we go back to 0deg, we need to do a little trick
        setTimeout(() => {hand.classList.remove('transition-enable')}, 100); // temporarily disable the tick animation
        setTimeout(() => {hand.style.transform = `rotate(${degrees-360}deg)`}, 200); // set rotate() to the closest negative value equivalent to 'degrees', so the animation will take the shortest path when it moves to 0deg on the next tick
        setTimeout(() => {hand.classList.add('transition-enable')}, 300); // re-enable the animation
    }
}

setInterval(function() {
    let time = new Date();
    rotate(document.querySelector('.hour-hand'), getHours0to11(time), 12);
    rotate(document.querySelector('.minute-hand'), time.getMinutes(), 60);
    rotate(document.querySelector('.second-hand'), time.getSeconds(), 60);
}, 1000);

// setInterval(function() {
//     rotate(document.querySelector('.second-hand'), 58, 60);
//     setTimeout(function() {
//         rotate(document.querySelector('.second-hand'), 59, 60);
//         setTimeout(function() {
//             rotate(document.querySelector('.second-hand'), 0, 60);
//             setTimeout(function() {
//             rotate(document.querySelector('.second-hand'), 1, 60);
//             }, 1000)
//         }, 1000);
//     }, 1000)
// }, 4000);