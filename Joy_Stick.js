// game.js
const canvas = document.getElementById('gameCanvas'); // Replace with your canvas ID
const ctx = canvas.getContext('2d');
const joystickBase = { x: 100, y: 500, radius: 50 }; // Adjust position and size
const joystickHandle = { x: 100, y: 500 }; // Handle starts at base center
let isDragging = false;

canvas.addEventListener('mousedown', (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;
  const dx = mouseX - joystickBase.x;
  const dy = mouseY - joystickBase.y;
  if (Math.sqrt(dx * dx + dy * dy) < joystickBase.radius) {
    isDragging = true;
  }
});

canvas.addEventListener('mousemove', (e) => {
  if (isDragging) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Clamp handle to base radius
    let dx = mouseX - joystickBase.x;
    let dy = mouseY - joystickBase.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance > joystickBase.radius) {
      const angle = Math.atan2(dy, dx);
      dx = Math.cos(angle) * joystickBase.radius;
      dy = Math.sin(angle) * joystickBase.radius;
    }
    joystickHandle.x = joystickBase.x + dx;
    joystickHandle.y = joystickBase.y + dy;
  }
});

canvas.addEventListener('mouseup', () => {
  isDragging = false;
  joystickHandle.x = joystickBase.x; // Reset to center
  joystickHandle.y = joystickBase.y;
});

// Render joystick (call this in your game loop)
function drawJoystick() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas (or adjust for your game)
  // Draw base
  ctx.beginPath();
  ctx.arc(joystickBase.x, joystickBase.y, joystickBase.radius, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
  ctx.fill();
  // Draw handle
  ctx.beginPath();
  ctx.arc(joystickHandle.x, joystickHandle.y, joystickBase.radius / 2, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0, 0, 255, 0.7)';
  ctx.fill();
}

// Example game loop (adjust to fit your game)
function gameLoop() {
  drawJoystick();
  // Add other rendering logic here
  requestAnimationFrame(gameLoop);
}
gameLoop();
