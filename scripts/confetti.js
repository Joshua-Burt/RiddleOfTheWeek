// Possibly implement.

let isConfetti = false;

function confetti() {
	let canvas = document.createElement("canvas");
	canvas.style.position = "fixed";
	canvas.style.top = "0";
	canvas.style.left = "0";
	canvas.style.pointerEvents = "none";
	canvas.style.zIndex = "999999";
	canvas.style.display = "block";
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	document.body.appendChild(canvas);
	let context = canvas.getContext("2d");
	let particles = [];

	isConfetti = true;

	for (let i = 0; i < 250; i++) {
		particles.push({
			x: Math.random() * canvas.width,
			y: Math.random() * canvas.height,
			vx: Math.random() * 10 - 5,
			vy: Math.random() * 10 - 5,
			color:
				"rgb(" +
				Math.floor(Math.random() * 255) + "," +
				Math.floor(Math.random() * 255) + "," +
				Math.floor(Math.random() * 255) +
				")"
		});
	}
	requestAnimationFrame(draw);
	let particleCount = 0;

	function startFall(particle) {
		particle.x = Math.random() * canvas.width;
		particle.y = 0;
		particle.vy = 0;
		particle.vx = (Math.random() - 0.5) * 5;
		particle.angle = 0;
	}

	function draw() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		if (particleCount < particles.length) {
			let particle = particles[particleCount];
			startFall(particle);
			particleCount++;
		}
		for (let i = 0; i < particleCount; i++) {
			let particle = particles[i];
			particle.x += particle.vx;
			particle.y += particle.vy;
			particle.vy += 0.05 - Math.random() * 0.05
			particle.vx += (Math.random() - 0.5) * 0.5;
			particle.angle += Math.random() * 0.1 - 0.05;
			if (particle.x > canvas.width ||
				particle.x < 0 ||
				particle.y > canvas.height ||
				particle.y < 0) {

				if(isConfetti) {
					startFall(particle);
				}
			}
			context.save();

			// Move confetti down
			if(	particle.x < canvas.width &&
				particle.x > 0 &&
				particle.y < canvas.height &&
				particle.y > 0) {
				context.translate(particle.x + 5, particle.y + 2.5);
				context.rotate(particle.angle);
				context.translate(-5, -2.5);
				context.beginPath();
				context.fillStyle = particle.color;
				context.fillRect(0, 0, 10, 5);
			}
			context.restore();
		}
		requestAnimationFrame(draw);
	}
}

function stopConfetti() {
	isConfetti = false;
}