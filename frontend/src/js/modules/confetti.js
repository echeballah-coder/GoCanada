/**
 * @file modules/confetti.js
 * @description Module d'animation de confettis pour célébrer les succès.
 * Utilise un Canvas HTML5 overlay pour dessiner des particules colorées.
 */

export function triggerConfetti() {
    // Créer le canvas s'il n'existe pas
    let canvas = document.getElementById('confetti-canvas');
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'confetti-canvas';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none'; // Laisser passer les clics
        canvas.style.zIndex = '9999';
        document.body.appendChild(canvas);
    }

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 150;
    const colors = ['#D80621', '#FFC107', '#ffffff', '#00C853', '#2962FF'];

    // Initialiser les particules
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height, // Commencer au-dessus de l'écran
            w: Math.random() * 10 + 5,
            h: Math.random() * 10 + 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            speedY: Math.random() * 3 + 2,
            speedX: Math.random() * 2 - 1,
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 10 - 5
        });
    }

    let animationId;
    let startTime = Date.now();
    const duration = 3000; // 3 secondes

    function animate() {
        const elapsed = Date.now() - startTime;

        // Nettoyer le canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Mettre à jour et dessiner chaque particule
        particles.forEach((p, index) => {
            p.y += p.speedY;
            p.x += Math.sin(p.y * 0.01) + p.speedX;
            p.rotation += p.rotationSpeed;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
            ctx.restore();

            // Si la particule sort de l'écran, on peut l'arrêter ou la recycler
            // Ici on laisse tomber jusqu'à la fin de la durée
        });

        if (elapsed < duration) {
            animationId = requestAnimationFrame(animate);
        } else {
            // Fin de l'animation
            cancelAnimationFrame(animationId);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Optionnel : retirer le canvas du DOM
            // document.body.removeChild(canvas);
        }
    }

    animate();
}
