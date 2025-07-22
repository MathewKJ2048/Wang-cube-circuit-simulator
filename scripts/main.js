console.log("script active")


const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
	const container = canvas.parentElement;
	canvas.width = container.clientWidth;
	canvas.height = container.clientHeight;
	
	ctx.fillStyle = '#8080ff'; // light blue to see where it is
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);