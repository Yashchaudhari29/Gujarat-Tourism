
import fs from 'fs';
const data = JSON.parse(fs.readFileSync('src/data/personalities-data.json', 'utf8'));
data.forEach(p => {
  if (!p.image || p.image === 'assets/placeholder-person.jpg' || !p.image.includes('.')) {
    p.image = \https://ui-avatars.com/api/?name=\&size=512&background=321C04&color=D9C4AA\;
  }
});
fs.writeFileSync('src/data/personalities-data.json', JSON.stringify(data, null, 2));

