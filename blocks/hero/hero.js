/**
 * Decorates the hero block
 * @param {Element} block The hero block element
 */
export default function decorate(block) {
  // Create hero container and wrapper
  const heroContainer = document.createElement('div');
  heroContainer.className = 'hero-container';

  // Check for background image in the last row
  const rows = [...block.children];
  const lastRow = rows[rows.length - 1];
  if (lastRow?.querySelector('img')) {
    const img = lastRow.querySelector('img');
    heroContainer.style.backgroundImage = `url(${img.src})`;
    heroContainer.style.backgroundSize = 'cover';
    heroContainer.style.backgroundPosition = 'center';
    lastRow.remove();
  }

  const heroWrapper = document.createElement('div');
  heroWrapper.className = 'hero-wrapper';

  // Create hero card
  const heroCard = document.createElement('div');
  heroCard.className = 'hero-card';

  // Create content section
  const content = document.createElement('div');
  content.className = 'hero-content';

  // First row is headline
  if (rows[0]) {
    const h1 = document.createElement('h1');
    h1.textContent = rows[0].textContent;
    content.appendChild(h1);
    rows[0].remove();
  }

  // Second row is description
  if (rows[1]) {
    const p = document.createElement('p');
    p.textContent = rows[1].textContent;
    content.appendChild(p);
    rows[1].remove();
  }

  // Create buttons container
  const buttons = document.createElement('div');
  buttons.className = 'hero-buttons';

  // Add primary button
  const primaryBtn = document.createElement('button');
  primaryBtn.className = 'button-primary';
  primaryBtn.textContent = rows[2]?.textContent || 'Get Started';
  buttons.appendChild(primaryBtn);

  // Add secondary button
  const secondaryBtn = document.createElement('button');
  secondaryBtn.className = 'button-secondary';
  secondaryBtn.textContent = rows[3]?.textContent || 'Learn More';
  buttons.appendChild(secondaryBtn);

  // Assemble the hero structure
  heroCard.appendChild(content);
  heroCard.appendChild(buttons);
  heroWrapper.appendChild(heroCard);
  heroContainer.appendChild(heroWrapper);

  // Replace block content with new structure
  block.textContent = '';
  block.appendChild(heroContainer);

  // Add button click handlers
  primaryBtn.addEventListener('click', () => {
    // Add your primary button action here
    console.log('Primary button clicked');
  });

  secondaryBtn.addEventListener('click', () => {
    // Add your secondary button action here
    console.log('Secondary button clicked');
  });
}