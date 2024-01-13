/*******************************************/
/*** Global variables and look up tables ***/
/*******************************************/
var cubePosition = [
  [
    [[], [], []],
    [[], [], []],
    [[], [], []],
  ],
  [
    [[], [], []],
    [[], [], []],
    [[], [], []],
  ],
  [
    [[], [], []],
    [[], [], []],
    [[], [], []],
  ],
]

// Animation parameters
var rotationAngle = 3
var animationTimer = 1
var interval
var isAnimating = false
var animationQueue = []
var currentAngle = 0

/*** Face colors corresponding to numbers ***/
// BLUE = 0
// RED = 1
// GREEN =  2
// ORANGE = 3
// YELLOW = 4
// WHITE = 5

// Look up table to figure out the orientation of the cube
// The format of the response is an array: [top bottom front back left right]
var phiLUT = {
  'yellow-top': function () {
    var theta = degrees(THETA) % 360
    var index = getThetaFace(theta)
    var value = 40 + index
    return value
  },
  'white-top': function () {
    var theta = degrees(THETA) % 360
    var index = getThetaFace(theta)
    var value = 50 + ((index + 2) % 4)
    return value
  },
  'yellow-front': function () {
    var theta = degrees(THETA) % 360
    var index = getThetaFace(theta)
    var value = ((index + 2) % 4) * 10 + 4
    return value
  },
  'white-front': function () {
    var theta = degrees(THETA) % 360
    var index = getThetaFace(theta)
    var value = index * 10 + 5
    return value
  },
}

// Look up table to translate positions
var translationLUT = {
  40: function () {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9]
  },
  41: function () {
    return [7, 8, 9, 4, 5, 6, -3, -2, -1]
  },
  42: function () {
    return [-3, -2, -1, 4, 5, 6, -9, -8, -7]
  },
  43: function () {
    return [-9, -8, -7, 4, 5, 6, 1, 2, 3]
  },
  50: function () {
    return [-3, -2, -1, -6, -5, -4, 7, 8, 9]
  },
  51: function () {
    return [-9, -8, -7, -6, -5, -4, -3, -2, -1]
  },
  52: function () {
    return [1, 2, 3, -6, -5, -4, -9, -8, -7]
  },
  53: function () {
    return [7, 8, 9, -6, -5, -4, 1, 2, 3]
  },
  4: function () {
    return [-3, -2, -1, -7, -8, -9, -4, -5, -6]
  },
  24: function () {
    return [1, 2, 3, 9, 8, 7, -4, -5, -6]
  },
  34: function () {
    return [7, 8, 9, -1, -2, -3, -4, -5, -6]
  },
  14: function () {
    return [-9, -8, -7, 3, 2, 1, -4, -5, -6]
  },
  5: function () {
    return [1, 2, 3, -7, -8, -9, 6, 5, 4]
  },
  25: function () {
    return [-3, -2, -1, 9, 8, 7, 6, 5, 4]
  },
  35: function () {
    return [-9, -8, -7, -1, -2, -3, 6, 5, 4]
  },
  15: function () {
    return [7, 8, 9, 3, 2, 1, 6, 5, 4]
  },
}

/**********************************************/
/*** Get positions of the faces of the cube ***/
/**********************************************/
function getPositions() {
  var phi = degrees(PHI) % 360
  // All instances where yellow is on top
  if ((-315 < phi && phi < -225) || (45 < phi && phi < 135)) {
    return phiLUT['yellow-top']()
  } else if ((-135 < phi && phi < -45) || (225 < phi && phi < 315)) {
    return phiLUT['white-top']()
  } else if ((-225 < phi && phi < -135) || (135 < phi && phi < 225)) {
    return phiLUT['white-front']()
  } else {
    return phiLUT['yellow-front']()
  }
}

/***************************************************************/
/*** Get position of the face corresponding to a theta value ***/
/***************************************************************/
function getThetaFace(theta) {
  if ((-135 < theta && theta < -45) || (225 < theta && theta < 315)) {
    return 3
  } else if ((-225 < theta && theta < -135) || (135 < theta && theta < 225)) {
    return 2
  } else if ((-315 < theta && theta < -225) || (45 < theta && theta < 135)) {
    return 1
  } else {
    return 0
  }
}

/**************************************************/
/*** Translate based on which face is looked at ***/
/**************************************************/
function translateMove(plane) {
  var absPlane = Math.abs(plane)
  var position = getPositions()
  console.log(position)
  var translation = translationLUT[position]()
  var move = translation[absPlane - 1] * (plane / absPlane)
  return move
}

/********************************************/
/*** Initialize the positions of the cube ***/
/********************************************/
function fillCubePositions() {
  for (i = -1; i < 2; i++) {
    for (j = -1; j < 2; j++) {
      for (k = -1; k < 2; k++) {
        cubePosition[i + 1][j + 1][k + 1][0] = i
        cubePosition[i + 1][j + 1][k + 1][1] = j
        cubePosition[i + 1][j + 1][k + 1][2] = k
        cubePosition[i + 1][j + 1][k + 1][3] = [
          vec3(-1, 0, 0),
          vec3(0, -1, 0),
          vec3(0, 0, -1),
        ]
        cubePosition[i + 1][j + 1][k + 1][4] = mat4()
      }
    }
  }
}

/**************************/
/*** Animation function ***/
/**************************/
function animate(action) {
  interval = setInterval(function () {
    rotation(action)
  }, animationTimer)
}

function rotation(face) {
  var actualFace = translateMove(face)
  rotatePlane(actualFace)
  currentAngle += rotationAngle
  if (currentAngle == 90) {
    // Reset parameters
    clearInterval(interval)
    isAnimating = false
    currentAngle = 0
    updatePosition(actualFace)
    if (check()) {
      updateStatus('Solved!')
    } else {
      updateStatus('Unsolved.')
      return
    }
  }
}

/*********************************/
/*** Rotation helper functions ***/
/*********************************/
function negateVec(vec) {
  var temp = []
  for (i = 0; i < vec.length; i++) {
    temp[i] = -vec[i]
  }
  return temp
}

function getRotationAxis(x, y, z) {
  return cubePosition[x + 1][y + 1][z + 1][3]
}
function getRotationMatrix(x, y, z) {
  return cubePosition[x + 1][y + 1][z + 1][4]
}
function setRotationMatrix(x, y, z, m) {
  cubePosition[x + 1][y + 1][z + 1][4] = m
}

/*************************************************/
/*** Rotate each plane based on specified axis ***/
/*************************************************/
function rotatePlane(plane) {
  var x, y, z
  var dir, value
  var mainAxis
  var m
  absPlane = Math.abs(plane)
  directionTable = [1, 1, 1, 0, 0, 0, 0, 0, 0, null, 1, 1, 1, 1, 1, 1, 0, 0, 0]

  // Set main axis values
  if (absPlane <= 3) {
    mainAxis = 0
  } else if (absPlane > 3 && absPlane <= 6) {
    mainAxis = 1
  } else {
    mainAxis = 2
  }

  // Set check values
  if (absPlane == 1 || absPlane == 6 || absPlane == 9) {
    value = -1
  } else if (absPlane == 3 || absPlane == 4 || absPlane == 7) {
    value = 1
  } else {
    value = 0
  }

  // Set direction values
  dir = directionTable[plane + 9]

  for (x = -1; x < 2; x++) {
    for (y = -1; y < 2; y++) {
      for (z = -1; z < 2; z++) {
        // Check if cubie is in the plane of the face being turned
        if (cubePosition[x + 1][y + 1][z + 1][mainAxis] == value) {
          m = getRotationMatrix(x, y, z)
          if (!dir) {
            m = mult(
              m,
              rotate(rotationAngle, getRotationAxis(x, y, z)[mainAxis])
            )
          } else {
            m = mult(
              m,
              rotate(rotationAngle, negate(getRotationAxis(x, y, z)[mainAxis]))
            )
          }
          setRotationMatrix(x, y, z, m)
        }
      }
    }
  }
}

/************************/
/*** Update locations ***/
/************************/
function swap(x, y, z, i, j, k, val) {
  var tmp = []
  if (cubePosition[x + 1][y + 1][z + 1][i] == val) {
    tmp = cubePosition[x + 1][y + 1][z + 1][j]
    cubePosition[x + 1][y + 1][z + 1][j] = cubePosition[x + 1][y + 1][z + 1][k]
    cubePosition[x + 1][y + 1][z + 1][k] = -tmp
    tmp = cubePosition[x + 1][y + 1][z + 1][3][k]
    cubePosition[x + 1][y + 1][z + 1][3][k] = negate(
      cubePosition[x + 1][y + 1][z + 1][3][j]
    )
    cubePosition[x + 1][y + 1][z + 1][3][j] = tmp
  }
}

/*************************/
/*** Update cube state ***/
/*************************/
function updatePosition(plane) {
  //   var i, j, k, val;
  const iBuffer = [2, 2, 2, 1, 1, 1, 0, 0, 0, null, 0, 0, 0, 1, 1, 1, 2, 2, 2]
  const jBuffer = [1, 1, 1, 2, 2, 2, 1, 1, 1, null, 2, 2, 2, 0, 0, 0, 0, 0, 0]
  const kBuffer = [0, 0, 0, 0, 0, 0, 2, 2, 2, null, 1, 1, 1, 2, 2, 2, 1, 1, 1]
  const valBuffer = [
    -1,
    0,
    1,
    -1,
    0,
    1,
    1,
    0,
    -1,
    null,
    -1,
    0,
    1,
    1,
    0,
    -1,
    1,
    0,
    -1,
  ]

  var i = iBuffer[plane + 9]
  var j = jBuffer[plane + 9]
  var k = kBuffer[plane + 9]
  var val = valBuffer[plane + 9]

  for (x = -1; x < 2; x++) {
    for (y = -1; y < 2; y++) {
      for (z = -1; z < 2; z++) {
        swap(x, y, z, i, j, k, val)
      }
    }
  }
}

/***********************************/
/*** Check if the cube is solved ***/
/***********************************/
function check() {
  var ori
  for (i = 0; i < 3; i++) {
    for (j = 0; j < 3; j++) {
      // Six faces
      ori = cubePosition[0][0][0][3]
      for (x = -1; x < 2; x++) {
        for (y = -1; y < 2; y++) {
          for (z = -1; z < 2; z++) {
            // Nine cubes on each face
            if (cubePosition[x + 1][y + 1][z + 1][3][i][j] != ori[i][j]) {
              if (x == 0 && z == 0) {
                if (cubePosition[x + 1][y + 1][z + 1][3][1][j] != ori[1][j]) {
                  return false
                }
              } else if (x == 0 && y == 0) {
                if (cubePosition[x + 1][y + 1][z + 1][3][2][j] != ori[2][j]) {
                  return false
                }
              } else if (y == 0 && z == 0) {
                if (cubePosition[x + 1][y + 1][z + 1][3][0][j] != ori[0][j]) {
                  return false
                }
              } else {
                return false
              }
            }
          }
        }
      }
    }
  }
  return true
}
