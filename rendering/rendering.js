// How would I render something smoothly in a DOM?
// We have positions, using translate to move in CSS
// In JavaScript, we use requestAnimationFrame() which is a method of Window objects

// Create a function to move an element. The function arguments are,
// distance, duration, and the element to move.

/*
    function moveElement(duration, distance, element) {}
*/
const el = document.getElementById('moving-object');

// move element function
function moveElement(duration, distance, element) {
  const start = performance.now();
  function move(currentTime) {
     const elapsed = currentTime - start;
     const progress = elapsed / duration;
     const amountToMove = distance * progress;
     
    element.style.transform = `translateX(${amountToMove}px)`;
    if(amountToMove < distance) {
      requestAnimationFrame(move);
    }
  }
  requestAnimationFrame(move);
}

moveElement(5000, 400, el);

