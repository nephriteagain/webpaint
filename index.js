var root = document.getElementById('root');
var canvas = document.getElementById('board');
var ctx = canvas.getContext('2d');
var isDrawing = false;
var lastX = 0;
var lastY = 0;
var drawingStates = [];
// Function to capture and store the drawing state
function saveDrawingState() {
    drawingStates.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
}
// Function to replay the drawings on the canvas from the stored states
function replayDrawings() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var _i = 0, drawingStates_1 = drawingStates; _i < drawingStates_1.length; _i++) {
        var state = drawingStates_1[_i];
        ctx.putImageData(state, 0, 0);
    }
}
// Function to undo the last drawing action
function undoLastDrawing() {
    if (drawingStates.length > 0) {
        drawingStates.pop(); // Remove the last drawing state
        replayDrawings(); // Replay the remaining states on the canvas
    }
}
canvas.addEventListener('mousedown', function (e) {
    var _a;
    isDrawing = true;
    _a = [e.offsetX, e.offsetY], lastX = _a[0], lastY = _a[1];
});
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', function () {
    isDrawing = false;
    saveDrawingState();
});
canvas.addEventListener('mouseout', function () {
    isDrawing = false;
});
function draw(e) {
    var _a;
    if (!isDrawing)
        return;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    _a = [e.offsetX, e.offsetY], lastX = _a[0], lastY = _a[1];
}
ctx.lineWidth = 5;
var currentColor = 'white';
var currentColorElem = document.querySelector('.current');
var colors = {
    "rgb(255, 0, 0)": "red",
    "rgb(0, 0, 255)": "blue",
    "rgb(0, 128, 0)": "green",
    "rgb(255, 165, 0)": "orange",
    "rgb(255, 255, 0)": "yellow",
    "rgb(128, 0, 128)": "purple",
    "rgb(0, 0, 0)": "black",
    "rgb(255, 255, 255)": "white",
    "rgb(150, 70, 0)": "brown"
};
var colorPallete = document.querySelectorAll('.color');
colorPallete.forEach(function (color) {
    color.addEventListener('click', function () {
        var bg = getComputedStyle(color).backgroundColor;
        currentColor = colors[bg];
        currentColorElem.style.backgroundColor = currentColor;
        ctx.strokeStyle = bg;
    });
});
// Function to handle the "keydown" event
function handleKeyDown(event) {
    // Check if the pressed key is "Z" or "z" (keycode 90 for "Z" and 122 for "z")
    if (event.key === 'Z' || event.key === 'z') {
        // Trigger the undo functionality
        undoLastDrawing();
    }
}
window.addEventListener('keypress', handleKeyDown);
