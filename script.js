const button = document.getElementById("showButton");
const messageHeading = document.querySelector(".message h2");
const messageText = document.querySelector(".message p");
const cardBody = document.querySelector(".card-body");
const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");
const photo = document.getElementById("heroImage");
const photoFallback = document.querySelector(".photo-fallback");
let confetti = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createConfetti() {
  const colors = ["#ff7fbf", "#ff9fd9", "#ffc4e2", "#ffd4f3", "#ffe6fb"];
  for (let i = 0; i < 140; i += 1) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: 8 + Math.random() * 10,
      speed: 1 + Math.random() * 3,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: -0.04 + Math.random() * 0.08,
      color: colors[Math.floor(Math.random() * colors.length)],
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

function revealMessage() {
  messageHeading.textContent = "Selamat ulang tahun, Nursarah!";
  messageText.textContent =
    "Hari ini semua doa untukmu dikirim dengan pelukan hangat dan cinta tak berujung. Semoga semua cita-citamu terus tumbuh dan senyummu selalu bersinar.";
  cardBody.innerHTML =
    "<p>Terima kasih sudah jadi bagian terbaik dalam hidupku.</p><p>Mari rayakan hari ini dengan penuh tawa, kado kecil, dan momen yang tak terlupakan.</p>";
  button.textContent = "Terima kasih sayang!";
  button.disabled = true;

  // Play confetti and start animation
  createConfetti();
  animate();

  // Try to play background music if present
  const bg = document.getElementById("bgMusic");
  if (bg && bg.paused) {
    bg.play().catch(() => {
      // autoplay may be blocked; user can toggle manually
    });
    const musicToggle = document.getElementById("musicToggle");
    if (musicToggle) musicToggle.setAttribute("aria-pressed", "true");
  }

  // spawn small hearts for 3 seconds
  let hearts = 0;
  const heartInterval = setInterval(() => {
    spawnHeart();
    hearts += 1;
    if (hearts > 12) clearInterval(heartInterval);
  }, 180);
}

// If we're on the wish page, auto-run revealMessage; otherwise navigate to wish.html
if (button) {
  const isWishPage =
    window.location.pathname.endsWith("wish.html") ||
    window.location.pathname.endsWith("/wish.html");
  if (isWishPage) {
    window.addEventListener("load", () => {
      // small delay so DOM elements are ready
      setTimeout(() => {
        revealMessage();
      }, 120);
    });
  } else {
    button.addEventListener("click", () => {
      sessionStorage.setItem("wishAutoPlay", "1");
      window.location.href = "wish.html";
    });
  }
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

photo.addEventListener("load", () => {
  photoFallback.style.display = "none";
});

photo.addEventListener("error", () => {
  photo.style.display = "none";
  photoFallback.style.display = "grid";
});

// music toggle
const musicToggle = document.getElementById("musicToggle");
const bgMusic = document.getElementById("bgMusic");
if (musicToggle && bgMusic) {
  musicToggle.addEventListener("click", () => {
    if (bgMusic.paused) {
      bgMusic.play().catch(() => {});
      musicToggle.textContent = "⏸️ Hentikan Musik";
      musicToggle.setAttribute("aria-pressed", "true");
    } else {
      bgMusic.pause();
      musicToggle.textContent = "▶️ Putar Musik";
      musicToggle.setAttribute("aria-pressed", "false");
    }
  });
}

// spawn floating heart
function spawnHeart() {
  const el = document.createElement("div");
  el.className = "heart";
  // position near button
  const rect = button.getBoundingClientRect();
  const startX = rect.left + rect.width / 2 + (Math.random() * 80 - 40);
  const startY = rect.top + (Math.random() * 20 - 10);
  el.style.left = startX + "px";
  el.style.top = startY + "px";
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1100);
}
