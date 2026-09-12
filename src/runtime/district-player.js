// One user-supplied recording; every visual scene and topic uses its absolute timeline.
export function createDistrictPlayer({ $, $$, open, esc, onCleanup, isReduced, recordings }) {
 return function showRecording(slug,topicId){
  const story=recordings[slug];if(!story)return;
  const topic=topicId?story.topics.find(t=>t.id===topicId):null;
  if(topicId&&!topic)return;
  let from=topic?.start||0,to=topic?.end||story.scenes.at(-1).end;
  const scenes=story.scenes.filter(s=>s.end>from&&s.start<to);
  let current=-1,disposed=false,english=false,finished=false,ticket=0,invalidTiming=false;
  const media=new Audio(story.audio);media.preload='metadata';media.volume=1;
  try{const v=localStorage.getItem('gujarat-volume');if(v!==null)media.volume=Math.max(0,Math.min(1,Number(v)||0));}catch{}
  const format=n=>{n=Math.floor(Math.max(0,n||0));return `${Math.floor(n/60)}:${String(n%60).padStart(2,'0')}`};
  open(`<div class="cinema" id="cinema"><div class="cinema-stage"><img id="recording-image" src="${esc(scenes[0].image)}" alt="${esc(scenes[0].title)}"><div class="cinema-scrim"></div><span class="cinema-kicker">GUJARAT UNVEILED / ${esc(story.title)}</span><div class="cinema-caption"><span id="recording-scene"></span><h2 id="detail-title" lang="gu"></h2><p id="recording-caption" lang="gu"></p></div></div><div class="cinema-controls"><button id="recording-prev" aria-label="Previous scene">⏮</button><button class="play-story" id="recording-play" aria-label="Pause narration">Ⅱ</button><button id="recording-next" aria-label="Next scene">⏭</button><span id="recording-time"></span><div class="cinema-options"><button id="recording-mute" aria-label="Mute narration">🔊</button><label class="volume-control">Volume <input id="recording-volume" aria-label="Narration volume" type="range" min="0" max="1" step="0.05" value="${media.volume}"></label><button id="recording-captions" aria-pressed="false">English captions</button><button id="recording-fullscreen" aria-label="Toggle fullscreen">⛶</button></div></div><label class="story-seek">${topic?'Topic':'Story'} progress<input id="recording-seek" type="range" min="${from}" max="${to}" step="0.1" value="${from}" aria-label="Seek narration"></label></div><div class="detail-body"><span class="eyebrow">${topic?'A CLOSER LOOK':'DISTRICT JOURNEY'}</span><h3 lang="gu">${esc(topic?.gu||topic?.title||story.gu)}</h3><p id="recording-status" role="status">અવાજ શરૂ થઈ રહ્યો છે…</p><div class="chapter-list">${scenes.map((s,i)=>`<button data-recording-scene="${i}"><span>${format(Math.max(from,s.start)-from)}</span><span lang="gu">${esc(s.title)}</span><b>▷</b></button>`).join('')}</div>${story.topics.length?`<h3>Explore one subject</h3><div class="detail-tags">${story.topics.map(t=>`<button data-recording="${esc(slug)}" data-topic="${esc(t.id)}">▷ ${esc(t.gu||t.title)}</button>`).join('')}</div>`:''}<details class="knowledge-section"><summary>Read the complete script · સંપૂર્ણ લખાણ</summary><p class="recording-transcript" lang="gu">${esc(story.script)}</p></details><div class="source-links">${story.sources.map(s=>`<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title)} ↗</a>`).join('')}</div><p class="story-type-note">Narration supplied by the creator. Scenes follow the recording’s timestamps.</p></div>`,'cinema-dialog');
  const status=t=>{if(!disposed)$('#recording-status').textContent=t};
  function sync(){
   if(disposed)return;
   const time=media.currentTime;
   const index=time>=scenes.at(-1).end?scenes.length-1:Math.max(0,scenes.findIndex(s=>time>=s.start&&time<s.end));
   if(index!==current){current=index;const scene=scenes[current];const img=$('#recording-image');img.src=scene.image;img.alt=scene.title;img.style.objectPosition=scene.focus||'50% 50%';$('#detail-title').textContent=scene.title;$('#recording-scene').textContent=`${current+1} / ${scenes.length}`;}
   const scene=scenes[current];$('#recording-caption').textContent=english?(scene.english||scene.text):scene.text;$('#recording-caption').lang=english&&scene.english?'en':'gu';
   $('#recording-image').style.transform=`scale(${isReduced()?1:1+.12*Math.max(0,Math.min(1,(time-scene.start)/(scene.end-scene.start)))})`;
   $('#recording-seek').value=Math.max(from,Math.min(to,time));$('#recording-time').textContent=`${format(time-from)} / ${format(to-from)}`;
   $('#recording-prev').disabled=current===0;$('#recording-next').disabled=current===scenes.length-1;
   $$('[data-recording-scene]').forEach((b,i)=>{b.classList.toggle('active',i===current);b.setAttribute('aria-current',i===current?'step':'false')});
   if(time>=to&&!media.paused){finished=true;media.pause();status('આ ભાગ પૂરો થયો. ફરી સાંભળવા ▶ દબાવો.');}
  }
  function controls(){if(disposed)return;$('#recording-play').textContent=media.paused?'▶':'Ⅱ';$('#recording-play').setAttribute('aria-label',media.paused?'Play narration':'Pause narration');$('#recording-mute').textContent=media.muted||media.volume===0?'🔇':'🔊';$('#recording-mute').setAttribute('aria-label',media.muted?'Unmute narration':'Mute narration');}
  async function play(){if(invalidTiming)return;const t=++ticket;try{await media.play();if(disposed||t!==ticket)return;status('ગુજરાતી વાર્તા · તમારી સાથે સફર');controls()}catch(e){if(!disposed&&t===ticket&&e.name!=='AbortError')status('અવાજ શરૂ થયો નથી. ફરી ▶ દબાવો અથવા જોડાણ તપાસો.');}}
  function seek(time){finished=false;media.currentTime=Math.max(from,Math.min(to,time));sync()}
  $('#recording-play').onclick=()=>{if(media.paused){if(finished||media.ended)seek(from);if(media.error)media.load();play()}else{ticket++;media.pause()}};
  $('#recording-prev').onclick=()=>seek(Math.max(from,scenes[Math.max(0,current-1)].start));$('#recording-next').onclick=()=>seek(scenes[Math.min(scenes.length-1,current+1)].start);
  $$('[data-recording-scene]').forEach(b=>b.onclick=()=>{seek(Math.max(from,scenes[+b.dataset.recordingScene].start));play()});
  $('#recording-seek').oninput=e=>seek(+e.target.value);
  $('#recording-volume').oninput=e=>{media.volume=+e.target.value;media.muted=false;try{localStorage.setItem('gujarat-volume',media.volume)}catch{}controls()};
  $('#recording-mute').onclick=()=>{media.muted=!media.muted;if(!media.muted&&media.volume===0){media.volume=1;$('#recording-volume').value=1}controls()};
  $('#recording-captions').onclick=()=>{english=!english;$('#recording-captions').setAttribute('aria-pressed',english);sync()};
  $('#recording-fullscreen').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await $('#cinema').requestFullscreen()}catch{status('Fullscreen is unavailable in this browser.')}};
  media.onloadedmetadata=()=>{
   if(disposed)return;
   if(!Number.isFinite(media.duration)||media.duration+0.5<to){invalidTiming=true;media.pause();$('#recording-play').disabled=true;status('આ અવાજ અને દૃશ્યોનો સમય મેળ ખાતો નથી. સુધારેલી રેકોર્ડિંગ જરૂરી છે.');return;}
   seek(from);
  };
  media.ontimeupdate=sync;media.onplay=controls;media.onpause=controls;media.onended=()=>{finished=true;controls();status('વાર્તા પૂરી થઈ.');};media.onwaiting=()=>status('અવાજ લોડ થઈ રહ્યો છે…');media.onerror=()=>status('Audio could not load. Check the connection and try Play again.');
  const visibility=()=>{if(document.hidden){ticket++;media.pause()}};document.addEventListener('visibilitychange',visibility);
  sync();play();
  onCleanup(()=>{disposed=true;ticket++;media.pause();media.removeAttribute('src');media.load();document.removeEventListener('visibilitychange',visibility);if(document.fullscreenElement)document.exitFullscreen().catch(()=>{})});
 };
}
