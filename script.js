// Проверка загрузки документа
document.addEventListener('DOMContentLoaded', () => {
    console.log('Document loaded, initializing particles...');
    initParticles();
});

// Частицы для анимированного фона
const canvas = document.getElementById('particles');
const ctx = canvas ? canvas.getContext('2d') : null;

if (!canvas || !ctx) {
    console.error('Canvas or context not found! Check if <canvas id="particles"> exists in HTML.');
} else {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log('Canvas initialized:', canvas.width, 'x', canvas.height);
}

const particlesArray = [];
const numberOfParticles = 60;

class Particle {
    constructor() {
        this.x = Math.random() * (canvas ? canvas.width : window.innerWidth);
        this.y = Math.random() * (canvas ? canvas.height : window.innerHeight);
        this.size = Math.random() * 3 + 1.5;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.speedY = Math.random() * 0.3 - 0.15;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.size > 0.2) this.size -= 0.006;

        if (canvas && (this.x < 0 || this.x > canvas.width)) this.speedX *= -1;
        if (canvas && (this.y < 0 || this.y > canvas.height)) this.speedY *= -1;
    }

    draw() {
        if (ctx) {
            ctx.fillStyle = 'rgba(176, 168, 255, 0.8)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

function initParticles() {
    if (!ctx || !canvas) return;
    particlesArray.length = 0;
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
    console.log('Particles initialized:', particlesArray.length);
}

function animate() {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    requestAnimationFrame(animate);
}

if (ctx) {
    initParticles();
    animate();
}

window.addEventListener('resize', () => {
    if (ctx && canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
        console.log('Canvas resized:', canvas.width, 'x', canvas.height);
    }
});

// Управление модальным окном
function showModal() {
    const modal = document.getElementById('joinModal');
    if (modal) {
        modal.style.display = 'flex';
        console.log('Modal opened');
    } else {
        console.error('Modal not found!');
    }
}

function closeModal() {
    const modal = document.getElementById('joinModal');
    if (modal) {
        modal.style.display = 'none';
        console.log('Modal closed');
    }
}

function copyIP() {
    const ip = document.getElementById('server-ip');
    if (ip) {
        navigator.clipboard.writeText(ip.innerText).then(() => {
            const button = document.querySelector('.copy-button');
            button.classList.add('copied');
            button.innerText = 'Скопировано!';
            setTimeout(() => {
                button.classList.remove('copied');
                button.innerText = 'Копировать IP';
            }, 2000);
            console.log('IP copied:', ip.innerText);
        }).catch(err => {
            console.error('Failed to copy IP:', err);
        });
    } else {
        console.error('Server IP element not found!');
    }
}

window.onclick = function(event) {
    const modal = document.getElementById('joinModal');
    if (event.target == modal) {
        modal.style.display = 'none';
        console.log('Modal closed by clicking outside');
    }
}