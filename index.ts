const root = document.getElementById('root')


const canvas = document.getElementById('board') as HTMLCanvasElement
const ctx = canvas.getContext('2d')

let isDrawing = false;
let lastX = 0;
let lastY = 0;

const drawingStates = [];

// Function to capture and store the drawing state
function saveDrawingState() {
  drawingStates.push(ctx.getImageData(0, 0, canvas.width, canvas.height,));
}

// Function to replay the drawings on the canvas from the stored states
function replayDrawings() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const state of drawingStates) {
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

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', draw);

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
    saveDrawingState();
});

canvas.addEventListener('mouseout', () => {
  isDrawing = false;
});

function draw(e: MouseEvent) {
    if (!isDrawing) return;
    
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  
    [lastX, lastY] = [e.offsetX, e.offsetY];
  }
  
ctx.lineWidth = 5;


let currentColor = 'white';
const currentColorElem = document.querySelector('.current') as HTMLDivElement

const colors : Record<string,string> = {
    "rgb(255, 0, 0)": "red",
    "rgb(0, 0, 255)": "blue",
    "rgb(0, 128, 0)": "green",
    "rgb(255, 165, 0)": "orange",
    "rgb(255, 255, 0)": "yellow",
    "rgb(128, 0, 128)": "purple",
    "rgb(0, 0, 0)": "black",
    "rgb(255, 255, 255)": "white",
    "rgb(150, 70, 0)": "brown"
}

const colorPallete = document.querySelectorAll('.color')
colorPallete.forEach((color) => {
    color.addEventListener('click', () => {
        const bg = getComputedStyle(color).backgroundColor        
        currentColor = colors[bg];
        currentColorElem.style.backgroundColor = currentColor;
        ctx.strokeStyle = bg;
    })
})


// Function to handle the "keydown" event
function handleKeyDown(event: KeyboardEvent) {
    // Check if the pressed key is "Z" or "z" (keycode 90 for "Z" and 122 for "z")
    if (event.key === 'Z' || event.key === 'z') {
      // Trigger the undo functionality
      undoLastDrawing();
    }
  }

window.addEventListener('keypress', handleKeyDown)