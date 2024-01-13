// Vertices scaling
var s = 0.97

// Cubes spacing
var spacing = 2.05

// For the drawElements() function
var numVertices = 36

// Location to and actual matrices
var projectionMatrixLoc, modelViewMatrixLoc
var modelViewMatrix, projectionMatrix

var eye = vec3(0.0, 0.0, 4.0)
var at = vec3(0.0, 0.0, 0.0)
var up = vec3(0.0, 1.0, 0.0)

var cameraRadius = 20.0
var cameraRadiusMinimum = 12.5
var cameraRadiusMaximum = 50.0
var THETA = radians(20)
var PHI = radians(70)

// Field-of-view in Y direction angle (in degrees)
var fovy = 45.0
// Viewport aspect ratio
var aspect = 1.0

var near = 0.3
var far = 30

// Vertices definition
var vertices = [
  vec3(-s, -s, -s),
  vec3(s, -s, -s),
  vec3(s, s, -s),
  vec3(-s, s, -s),
  vec3(-s, -s, s),
  vec3(s, -s, s),
  vec3(s, s, s),
  vec3(-s, s, s),
  vec3(-s, -s, -s),
  vec3(-s, s, -s),
  vec3(-s, s, s),
  vec3(-s, -s, s),
  vec3(s, -s, -s),
  vec3(s, s, -s),
  vec3(s, s, s),
  vec3(s, -s, s),
  vec3(-s, -s, -s),
  vec3(-s, -s, s),
  vec3(s, -s, s),
  vec3(s, -s, -s),
  vec3(-s, s, -s),
  vec3(-s, s, s),
  vec3(s, s, s),
  vec3(s, s, -s),
]

// Colors definition for the above vertices
// Define startingVertexColors and vertexColors
var startingVertexColors = [
  // A total of 24 vertices (4 for each of 6 faces)

  // GREEN
  vec4(0.0, 1.0, 0.0, 1.0),
  vec4(0.0, 1.0, 0.0, 1.0),
  vec4(0.0, 1.0, 0.0, 1.0),
  vec4(0.0, 1.0, 0.0, 1.0),

  // BLUE
  vec4(0.0, 0.0, 1.0, 1.0),
  vec4(0.0, 0.0, 1.0, 1.0),
  vec4(0.0, 0.0, 1.0, 1.0),
  vec4(0.0, 0.0, 1.0, 1.0),

  // ORANGE
  vec4(1.0, 0.5, 0.0, 1.0),
  vec4(1.0, 0.5, 0.0, 1.0),
  vec4(1.0, 0.5, 0.0, 1.0),
  vec4(1.0, 0.5, 0.0, 1.0),

  // RED
  vec4(1.0, 0.0, 0.0, 1.0),
  vec4(1.0, 0.0, 0.0, 1.0),
  vec4(1.0, 0.0, 0.0, 1.0),
  vec4(1.0, 0.0, 0.0, 1.0),

  // WHITE
  vec4(1.0, 1.0, 1.0, 1.0),
  vec4(1.0, 1.0, 1.0, 1.0),
  vec4(1.0, 1.0, 1.0, 1.0),
  vec4(1.0, 1.0, 1.0, 1.0),

  // YELLOW
  vec4(1.0, 1.0, 0.0, 1.0),
  vec4(1.0, 1.0, 0.0, 1.0),
  vec4(1.0, 1.0, 0.0, 1.0),
  vec4(1.0, 1.0, 0.0, 1.0),
]
var vertexColors = [
  // GREEN
  vec4(0.0, 1.0, 0.0, 1.0),
  vec4(0.0, 1.0, 0.0, 1.0),
  vec4(0.0, 1.0, 0.0, 1.0),
  vec4(0.0, 1.0, 0.0, 1.0),

  // BLUE
  vec4(0.0, 0.0, 1.0, 1.0),
  vec4(0.0, 0.0, 1.0, 1.0),
  vec4(0.0, 0.0, 1.0, 1.0),
  vec4(0.0, 0.0, 1.0, 1.0),

  // ORANGE
  vec4(1.0, 0.5, 0.0, 1.0),
  vec4(1.0, 0.5, 0.0, 1.0),
  vec4(1.0, 0.5, 0.0, 1.0),
  vec4(1.0, 0.5, 0.0, 1.0),

  // RED
  vec4(1.0, 0.0, 0.0, 1.0),
  vec4(1.0, 0.0, 0.0, 1.0),
  vec4(1.0, 0.0, 0.0, 1.0),
  vec4(1.0, 0.0, 0.0, 1.0),

  // WHITE
  vec4(1.0, 1.0, 1.0, 1.0),
  vec4(1.0, 1.0, 1.0, 1.0),
  vec4(1.0, 1.0, 1.0, 1.0),
  vec4(1.0, 1.0, 1.0, 1.0),

  // YELLOW
  vec4(1.0, 1.0, 0.0, 1.0),
  vec4(1.0, 1.0, 0.0, 1.0),
  vec4(1.0, 1.0, 0.0, 1.0),
  vec4(1.0, 1.0, 0.0, 1.0),
]

// Indices definition for the above vertices
var indices = [
  0,
  1,
  2,
  0,
  2,
  3, // front
  4,
  5,
  6,
  4,
  6,
  7, // back
  8,
  9,
  10,
  8,
  10,
  11, // left
  12,
  13,
  14,
  12,
  14,
  15, // right
  16,
  17,
  18,
  16,
  18,
  19, // bottom
  20,
  21,
  22,
  20,
  22,
  23, // top
]
