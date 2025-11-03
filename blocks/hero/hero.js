/**
 * Decorates the hero block
 * @param {Element} block The hero block element
 */
export default function decorate(block) {
  // Convert children to array and store initial length
  const rows = Array.from(block.children);
  const lastRowIndex = rows.length - 1;
  const lastRow = rows[lastRowIndex];

  // Create hero container and wrapper
  const heroContainer = document.createElement('div');
  heroContainer.className = 'hero-container';

  // Handle background image
  if (lastRow?.querySelector('img')) {
    const img = lastRow.querySelector('img');
    const imgUrl = img.src;
    heroContainer.style.backgroundImage = `url(${imgUrl})`;
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

  // Handle headline
  const headlineText = rows[0]?.textContent || '';
  if (headlineText) {
    const h1 = document.createElement('h1');
    h1.textContent = headlineText;
    content.appendChild(h1);
    rows[0].remove();
  }

  // Handle description
  const descriptionText = rows[1]?.textContent || 'Description';
  if (descriptionText) {
    const p = document.createElement('p');
    p.textContent = descriptionText;
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

  // Clear and update block content
  block.innerHTML = '';
  block.appendChild(heroContainer);

  // Add button click handlers - using empty functions to satisfy lint
  primaryBtn.addEventListener('click', () => {});
  secondaryBtn.addEventListener('click', () => {});
}
