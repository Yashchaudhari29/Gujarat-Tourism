const fs = require('fs');
let css = fs.readFileSync('src/styles.css', 'utf8');

const featuredCss = `
.personality-card.featured-person {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
  align-items: center;
}

@media (max-width: 768px) {
  .personality-card.featured-person {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
`;

if(!css.includes('.featured-person')) {
    css += featuredCss;
    fs.writeFileSync('src/styles.css', css);
    console.log('Added featured-person CSS');
}
