var hold = false

function initListeners(canvas) {
  /*** Window resize listener ***/
  window.addEventListener('resize', (e) => {
    canvas.width = document.getElementById('rubik').offsetWidth
    canvas.height = document.getElementById('rubik').offsetWidth * 0.9
  })

  /*** Mouse drag listener ***/
  var rotating = false
  var previous_x, previous_y

  function startRotation(e) {
    e.preventDefault()
    rotating = true
    previous_x = e.pageX
    previous_y = e.pageY
    return
  }

  function endRotation(e) {
    e.preventDefault()
    rotating = false
    return
  }

  function rotate(e) {
    e.preventDefault()
    if (!rotating) return

    var dx = e.pageX - previous_x
    var dy = e.pageY - previous_y

    applyCameraRotation(dx, dy)

    previous_x = e.pageX
    previous_y = e.pageY
  }

  canvas.addEventListener('mousedown', startRotation, false)
  canvas.addEventListener('mouseup', endRotation, false)
  canvas.addEventListener('mouseout', endRotation, false)
  canvas.addEventListener('mousemove', rotate, false)

  /*** Key press listener ***/
  document.onkeypress = function (e) {
    if (event.keyCode == 32) {
      e.preventDefault()
      hold = true
      console.log(hold)
    }
  }

  document.onkeyup = function (e) {
    e.preventDefault()
    if (event.keyCode == 32) {
      hold = false
      console.log(hold)
    }
  }

  document.onkeydown = function (e) {
    if (event.keyCode == 37) {
      // left
      applyCameraRotation(-10, 0)
    } else if (event.keyCode == 38) {
      // up
      applyCameraRotation(0, 10)
    } else if (event.keyCode == 39) {
      // right
      applyCameraRotation(10, 0)
    } else if (event.keyCode == 40) {
      // down
      applyCameraRotation(0, -10)
    } else if (event.keyCode == 27) {
      animationQueue = []
      // Q
    } else if (event.keyCode == 81) {
      hold ? animationQueue.push(-1) : animationQueue.push(1)
      // W
    } else if (event.keyCode == 87) {
      hold ? animationQueue.push(-2) : animationQueue.push(2)
      // E
    } else if (event.keyCode == 69) {
      hold ? animationQueue.push(-3) : animationQueue.push(3)
      // A
    } else if (event.keyCode == 65) {
      hold ? animationQueue.push(4) : animationQueue.push(-4)
      // S
    } else if (event.keyCode == 83) {
      hold ? animationQueue.push(5) : animationQueue.push(-5)
      // D
    } else if (event.keyCode == 68) {
      hold ? animationQueue.push(6) : animationQueue.push(-6)
      // Z
    } else if (event.keyCode == 90) {
      hold ? animationQueue.push(-7) : animationQueue.push(7)
      // X
    } else if (event.keyCode == 88) {
      hold ? animationQueue.push(-8) : animationQueue.push(8)
      // C
    } else if (event.keyCode == 67) {
      hold ? animationQueue.push(-9) : animationQueue.push(9)
    }
  }
}

/*** Camera view ***/
function applyCameraRotation(dx, dy) {
  if (isAnimating == true) {
    return
  }
  var absPhi = Math.abs(degrees(PHI) % 360)

  if ((absPhi > 180.0 && absPhi < 270.0) || PHI < 0.0) {
    if (degrees(PHI) % 360 < -180.0) {
      up = vec3(0.0, 1.0, 0.0)
      THETA += (-dx * 2 * Math.PI) / canvas.width
    } else {
      up = vec3(0.0, -1.0, 0.0)
      THETA += (dx * 2 * Math.PI) / canvas.width
    }
  } else {
    if (absPhi > 270.0) {
      up = vec3(0.0, -1.0, 0.0)
      THETA += (dx * 2 * Math.PI) / canvas.width
    } else {
      up = vec3(0.0, 1.0, 0.0)
      THETA += (-dx * 2 * Math.PI) / canvas.width
    }
  }

  PHI += (-dy * 2 * Math.PI) / canvas.height
  getPositions()
}
