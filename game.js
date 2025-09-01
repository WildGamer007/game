// game.js
document.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    event.preventDefault(); // Prevent browser scrolling
    triggerAttack(); // Replace with your attack function
  }
});

// Example attack function (replace with your actual attack logic)
function triggerAttack() {
  console.log('Attack triggered!');
  // Add your attack logic here, e.g., player animation or projectile spawn
}
