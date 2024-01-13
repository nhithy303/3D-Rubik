/*** Handle button inputs ***/
function initInputs() {
  // Handle randomize and reset buttons
  document.getElementById('randomize').onclick = randomTurns
  document.getElementById('reset').onclick = () => {
    location.reload()
  }

  // Handle movement buttons
  document.getElementById('1').onclick = function () {
    hold ? animationQueue.push(-1) : animationQueue.push(1)
  }
  document.getElementById('2').onclick = function () {
    hold ? animationQueue.push(-2) : animationQueue.push(2)
  }
  document.getElementById('3').onclick = function () {
    hold ? animationQueue.push(-3) : animationQueue.push(3)
  }
  document.getElementById('4').onclick = function () {
    hold ? animationQueue.push(4) : animationQueue.push(-4)
  }
  document.getElementById('5').onclick = function () {
    hold ? animationQueue.push(5) : animationQueue.push(-5)
  }
  document.getElementById('6').onclick = function () {
    hold ? animationQueue.push(6) : animationQueue.push(-6)
  }
  document.getElementById('7').onclick = function () {
    hold ? animationQueue.push(-7) : animationQueue.push(7)
  }
  document.getElementById('8').onclick = function () {
    hold ? animationQueue.push(-8) : animationQueue.push(8)
  }
  document.getElementById('9').onclick = function () {
    hold ? animationQueue.push(-9) : animationQueue.push(9)
  }
  return
}

/*** Perform scrambling function ***/
function randomTurns() {
  var input = document.getElementById('random-count').value
  console.log(input)
  if (isNaN(input) || !input) {
    alert('Error: The value specified is not a valid input.')
    return
  } else if (input < 1 || input > 500) {
    alert('Error: The value specified is out of range (1 - 500).')
    return
  } else if (animationQueue.length != 0) {
    alert('Error: There are moves in progress. Please wait!')
    return
  }
  var turn, previousTurn
  for (i = 0; i < input; i++) {
    while (1) {
      turn = 9 - Math.round(Math.random() * 18)
      if (turn != 0 && turn != previousTurn * -1) {
        break
      }
    }
    animationQueue.push(turn)
    previousTurn = turn
  }
}

/*** Update solving status ***/
function updateStatus(status) {
  document.getElementById('status').innerHTML = status
  return
}
