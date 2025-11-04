/**
 * Decorates the hero block
 * @param {Element} block The hero block element
 */
export default function decorate(block) {
  // Convert children to array and log for debugging
  const rows = Array.from(block.children);
  console.log('Initial rows:', rows);

  // Create hero container and wrapper
  const heroContainer = document.createElement('div');
  heroContainer.className = 'hero-container';

  // Handle background image from last row
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

  // Handle headline - get H1 from first row or find it in the row
  const h1Element = rows[0]?.querySelector('h1');
  let h1Text = '';
  if (h1Element) {
    // Extract the H1 element and its text
    h1Text = h1Element.textContent.trim();
    const h1 = document.createElement('h1');
    h1.textContent = h1Text;
    content.appendChild(h1);
  } else {
    // Fallback: get text from first div inside the row
    const headlineText = rows[0]?.querySelector('div')?.textContent || '';
    if (headlineText) {
      h1Text = headlineText.trim();
      const h1 = document.createElement('h1');
      h1.textContent = h1Text;
      content.appendChild(h1);
    }
  }
  // Remove the H1 row after processing
  if (rows[0]) rows[0].remove();

  // Handle description - look for paragraph element in the remaining rows
  // Make sure it's not the same as the H1 text and doesn't contain H1 elements
  let descriptionFound = false;
  for (let i = 0; i < rows.length; i++) {
    // Skip rows that contain H1 elements
    if (rows[i]?.querySelector('h1')) {
      continue;
    }
    const p = rows[i]?.querySelector('p');
    if (p && p.textContent.trim()) {
      let pText = p.textContent.trim();
      
      // Remove H1 text from the paragraph if it starts with it
      if (h1Text && pText.startsWith(h1Text)) {
        pText = pText.substring(h1Text.length).trim();
      }
      
      // Skip if this paragraph is empty or same as the H1 text
      if (pText && pText !== h1Text) {
        // Found a paragraph - use it as description
        const description = document.createElement('p');
        description.textContent = pText;
        content.appendChild(description);
        rows[i].remove();
        descriptionFound = true;
        break;
      }
    }
  }
  
  // Fallback: if no paragraph found, try getting text from first remaining row
  // Make sure it's not the same as the H1 text
  if (!descriptionFound && rows[0]) {
    const descriptionText = rows[0]?.querySelector('div')?.textContent || '';
    let descText = descriptionText.trim();
    
    // Remove H1 text from the description if it starts with it
    if (h1Text && descText.startsWith(h1Text)) {
      descText = descText.substring(h1Text.length).trim();
    }
    
    if (descText && descText !== h1Text) {
      const p = document.createElement('p');
      p.textContent = descText;
      content.appendChild(p);
      rows[0].remove();
    }
  }

  // Create buttons container
  const buttons = document.createElement('div');
  buttons.className = 'hero-buttons';

  // Add primary button - get text from first div inside the row
  const primaryBtnText = rows[2]?.querySelector('div')?.textContent || 'Get Started';
  const primaryBtn = document.createElement('button');
  primaryBtn.className = 'button-primary';
  primaryBtn.textContent = primaryBtnText;
  buttons.appendChild(primaryBtn);

  // Add secondary button - get text from first div inside the row
  const secondaryBtnText = rows[3]?.querySelector('div')?.textContent || 'Learn More';
  const secondaryBtn = document.createElement('button');
  secondaryBtn.className = 'button-secondary';
  secondaryBtn.textContent = secondaryBtnText;
  buttons.appendChild(secondaryBtn);

  // Assemble the hero structure
  heroCard.appendChild(content);
  heroCard.appendChild(buttons);
  heroWrapper.appendChild(heroCard);
  heroContainer.appendChild(heroWrapper);

  // Clear and update block content
  block.innerHTML = '';
  block.appendChild(heroContainer);

  // Add button click handlers
  primaryBtn.addEventListener('click', () => {});
  secondaryBtn.addEventListener('click', () => {});
}
