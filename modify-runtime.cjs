const fs = require('fs');

let exp = fs.readFileSync('src/runtime/experience.js', 'utf8');
if (!exp.includes('translateText')) {
  exp = exp.replace(
    'import {navigate} from \'../routes.js\';',
    'import {navigate} from \'../routes.js\';\nimport {translateText} from \'../locale/context.js\';\nconst tr = s => typeof s === \'string\' ? translateText(s, document.documentElement.lang) : s;'
  );
  
  // Replace string literals with tr() calls
  exp = exp.replace(/>(Watch the Gujarati story )</g, '>"+tr("$1")+"<');
  exp = exp.replace(/Explore \$\{/g, '"+tr("Explore ")+"${');
  exp = exp.replace(/Select a link to see how life in this habitat connects\./g, '"+tr("Select a link to see how life in this habitat connects.")+"');
  exp = exp.replace(/>(Explore all 34 districts →)</g, '>"+tr("$1")+"<');
  exp = exp.replace(/ABOUT THE EXPLORATION/g, '"+tr("ABOUT THE EXPLORATION")+"');
  exp = exp.replace(/A more curious way to see Gujarat\./g, '"+tr("A more curious way to see Gujarat.")+"');
  exp = exp.replace(/>(READ BEYOND THE STORY)</g, '>"+tr("$1")+"<');
  exp = exp.replace(/>(Sources & image credits)</g, '>"+tr("$1")+"<');
  exp = exp.replace(/>(A NOTE FOR THE JOURNEY)</g, '>"+tr("$1")+"<');
  exp = exp.replace(/>(What should we explore next\?)</g, '>"+tr("$1")+"<');
  exp = exp.replace(/>(GOVERNANCE DIRECTORY)</g, '>"+tr("$1")+"<');
  exp = exp.replace(/>(Union Council of Ministers)</g, '>"+tr("Union Council of Ministers")+"<');
  exp = exp.replace(/>(Gujarat Council of Ministers)</g, '>"+tr("Gujarat Council of Ministers")+"<');
  exp = exp.replace(/>(GUJARAT GAURAV)</g, '>"+tr("$1")+"<');
  exp = exp.replace(/>(INITIATIVE PROFILE)</g, '>"+tr("$1")+"<');
  exp = exp.replace(/THE ART OF LOOKING CLOSER/g, '"+tr("THE ART OF LOOKING CLOSER")+"');
  exp = exp.replace(/Photographic detail/g, '"+tr("Photographic detail")+"');
  exp = exp.replace(/Development & Resilience/g, '"+tr("Development & Resilience")+"');

  // For language change re-render
  const reRender = `
    window.addEventListener('languagechange', () => {
      setEra(currentEra);
      if (habitat) {
        const p = document.querySelector('.wildlife-content>.primary');
        if (p) p.innerHTML = tr('Explore ') + regions[habitat].name + ' <span>↗</span>';
        const ed = document.getElementById('eco-detail');
        if (ed) ed.textContent = tr('Select a link to see how life in this habitat connects.');
      }
      if (dialog.open) {
        close();
      }
    }, {signal});
  `;
  exp = exp.replace(/window\.addEventListener\('motionchange',\(\)=>setEra\(currentEra\),\{signal\}\);/, `window.addEventListener('motionchange',()=>setEra(currentEra),{signal});\n${reRender}`);
  
  fs.writeFileSync('src/runtime/experience.js', exp);
}

let kng = fs.readFileSync('src/runtime/knowledge.js', 'utf8');
if (!kng.includes('translateText')) {
  kng = kng.replace(
    'import {knowledge} from \'../data/knowledge.js\';',
    'import {knowledge} from \'../data/knowledge.js\';\nimport {translateText} from \'../locale/context.js\';\nconst tr = s => typeof s === \'string\' ? translateText(s, document.documentElement.lang) : s;'
  );
  
  kng = kng.replace(/LOOK DEEPER/g, '"+tr("LOOK DEEPER")+"');
  kng = kng.replace(/Context, evidence & connections/g, '"+tr("Context, evidence & connections")+"');
  kng = kng.replace(/EXPLORE THE DETAILS/g, '"+tr("EXPLORE THE DETAILS")+"');
  
  fs.writeFileSync('src/runtime/knowledge.js', kng);
}

console.log('Done modifying files');
