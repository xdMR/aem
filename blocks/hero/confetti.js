export default function createConfetti(element, options = {}) {
  const emojis = ['🎉', '🎊', '✨', '🎈', '🎁', '🌟', '💫', '⭐', '🎯', '🎨','🥳', '🎵', '🎶'];
  const confettiCount = options.count || 50;
  const duration = options.duration || 3000;
  
  const rect = element.getBoundingClientRect();
  const startX = rect.left + rect.width / 2;
  const startY = rect.top + rect.height / 2;
  
  for (let i = 0; i < confettiCount; i += 1) {
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    const confetti = document.createElement('div');
    confetti.textContent = emoji;
    confetti.style.position = 'fixed';
    confetti.style.left = `${startX}px`;
    confetti.style.top = `${startY}px`;
    confetti.style.fontSize = `${Math.random() * 20 + 15}px`;
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '9999';
    confetti.style.userSelect = 'none';
    
    document.body.appendChild(confetti);
    
    const angle = (Math.PI * 2 * Math.random());
    const velocity = 5 + Math.random() * 10;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity - 5;
    const gravity = 0.3;
    const rotation = (Math.random() - 0.5) * 360;
    const rotationSpeed = (Math.random() - 0.5) * 10;
    
    let x = startX;
    let y = startY;
    let currentVy = vy;
    let currentRotation = rotation;
    const startTime = Date.now();
    
    function animate() {
      const elapsed = Date.now() - startTime;
      const progress = elapsed / duration;
      
      if (progress >= 1) {
        confetti.remove();
        return;
      }
      
      x += vx;
      currentVy += gravity;
      y += currentVy;
      currentRotation += rotationSpeed;
      const opacity = 1 - progress;
      
      confetti.style.left = `${x}px`;
      confetti.style.top = `${y}px`;
      confetti.style.transform = `rotate(${currentRotation}deg)`;
      confetti.style.opacity = opacity;
      
      requestAnimationFrame(animate);
    }
    
    animate();
  }
}

