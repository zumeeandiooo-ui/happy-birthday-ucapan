const button = document.getElementById('showButton');
const greeting = document.querySelector('.greeting');
const title = document.querySelector('h1');
const text = document.querySelector('.message p');
const canvas = document.getElementById('confettiCanvas');
const ctx = canvas.getContext('2d');
let confetti = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createConfetti() {
  const colors = ['#ff7fbf', '#84d4ff', '#fff59d', '#9be7ff', '#ffb18f'];
  for (let i = 0; i < 120; i += 1) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: 8 + Math.random() * 8,
      speed: 1 + Math.random() * 3,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: -0.05 + Math.random() * 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.random() * 15,
    });
  }
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetti.forEach((item) => {
    ctx.save();
    ctx.translate(item.x, item.y);
    ctx.rotate(item.rotation);
    ctx.fillStyle = item.color;
    ctx.fillRect(-item.size / 2, -item.size / 2, item.size, item.size * 0.4);
    ctx.restore();
  });
}

function updateConfetti() {
  confetti.forEach((item) => {
    item.y += item.speed;
    item.rotation += item.rotationSpeed;
    if (item.y > canvas.height + 20) {
      item.y = -20;
      item.x = Math.random() * canvas.width;
    }
  });
}

function animate() {
  drawConfetti();
  updateConfetti();
  requestAnimationFrame(animate);
}

button.addEventListener('click', () => {
  greeting.textContent = 'Surprise!';
  title.textContent = 'Hari spesialmu sudah tiba.';
  text.textContent = 'Semoga semua harapanmu menjadi nyata. Aku sayang kamu dan selalu mendukungmu.';
  button.textContent = 'Semoga hari ini indah!';
  button.disabled = true;
  createConfetti();
  animate();
});

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
