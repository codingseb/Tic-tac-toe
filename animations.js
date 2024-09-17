function createFirework(winner) {
    const fireworkCount = 25;
    const particleCount = 100;
    const colors = winner === 'O' ? ['#ff4136', '#ff851b', '#ffdc00'] : ['#0074d9', '#7fdbff', '#39cccc'];

    for (let f = 0; f < fireworkCount; f++) {
        const firework = document.createElement('div');
        firework.className = 'firework';
        document.body.appendChild(firework);

        // Position aléatoire sur l'écran
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        firework.style.left = `${startX}px`;
        firework.style.top = `${startY}px`;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            if (winner === 'O') {
                particle.style.borderRadius = '50%';
            } else {
                particle.innerHTML = '×';
                particle.style.fontSize = '20px';
                particle.style.fontWeight = 'bold';
            }
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            firework.appendChild(particle);

            const angle = Math.random() * Math.PI * 2;
            const distance = 50 + Math.random() * 150; // Augmenté la distance maximale

            anime({
                targets: particle,
                translateX: Math.cos(angle) * distance,
                translateY: Math.sin(angle) * distance,
                scale: [1, 0],
                opacity: [1, 0],
                easing: 'easeOutExpo',
                duration: 2000 + Math.random() * 1000,
                delay: Math.random() * 1000,
                complete: function () {
                    particle.remove();
                }
            });
        }

        setTimeout(() => {
            firework.remove();
        }, 3000);
    }
}

function createDrawAnimation() {
    const animationContainer = document.createElement('div');
    animationContainer.style.position = 'fixed';
    animationContainer.style.top = '0';
    animationContainer.style.left = '0';
    animationContainer.style.width = '100%';
    animationContainer.style.height = '100%';
    animationContainer.style.pointerEvents = 'none';
    animationContainer.style.zIndex = '1000';
    document.body.appendChild(animationContainer);

    const redCircle = createSVGSymbol('O');
    redCircle.style.position = 'absolute';
    redCircle.style.left = '0';
    redCircle.style.bottom = '20px';
    redCircle.style.width = '100px';
    redCircle.style.height = '100px';
    const circleElement = redCircle.querySelector('.o-symbol');
    circleElement.style.stroke = '#ff4136';
    circleElement.style.strokeWidth = '12'; 
    circleElement.style.fill = 'none'; 
    animationContainer.appendChild(redCircle);

    const blueX = createSVGSymbol('X');
    blueX.style.position = 'absolute';
    blueX.style.right = '0';
    blueX.style.bottom = '20px';
    blueX.style.width = '100px';
    blueX.style.height = '100px';
    blueX.querySelectorAll('.x-symbol').forEach(line => {
        line.style.stroke = '#0074d9';
        line.style.strokeWidth = '12'; 
    });
    animationContainer.appendChild(blueX);

    const handshakeIcon = document.createElement('div');
    handshakeIcon.innerHTML = '🤝';
    handshakeIcon.style.position = 'absolute';
    handshakeIcon.style.fontSize = '60px';
    handshakeIcon.style.left = '50%';
    handshakeIcon.style.bottom = '40px';
    handshakeIcon.style.transform = 'translateX(-50%) scale(0)';
    handshakeIcon.style.opacity = '0';
    animationContainer.appendChild(handshakeIcon);

    anime.timeline({
        easing: 'easeOutQuad',
        duration: 1000,
        complete: function() {
            setTimeout(() => {
                animationContainer.remove();
            }, 3000);
        }
    }).add({
        targets: redCircle,
        translateX: window.innerWidth / 2 - 75
    }).add({
        targets: blueX,
        translateX: -window.innerWidth / 2 + 75
    }, '-=1000').add({
        targets: handshakeIcon,
        scale: 1,
        opacity: 1,
        duration: 500
    }).add({
        targets: handshakeIcon,
        translateY: -20,
        direction: 'alternate',
        duration: 300,
        loop: 2
    });
}