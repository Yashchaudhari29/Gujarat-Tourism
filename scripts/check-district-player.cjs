const assert=require('node:assert/strict');
(async()=>{
 const {createDistrictPlayer}=await import('../src/runtime/district-player.js');
 const instances=[];
 class AudioMock{
  constructor(src){instances.push(this);this.src=src;this.paused=true;this.currentTime=0;this.duration=30;this.volume=1;this.playbackRate=1;this.error=null;this.ended=false;this.plays=0;}
  load(){this.currentTime=0;}play(){this.plays++;this.paused=false;this.onplay?.();return Promise.resolve();}pause(){this.paused=true;this.onpause?.();}removeAttribute(){this.src='';}
 }
 global.Audio=AudioMock;global.localStorage={getItem:()=>null,setItem(){}};
 const listeners=new Set();global.document={hidden:false,addEventListener:(n,f)=>listeners.add(f),removeEventListener:(n,f)=>listeners.delete(f)};
 const nodes=new Map();const node=s=>{if(!nodes.has(s))nodes.set(s,{textContent:'',value:0,disabled:false,style:{},classList:{toggle(){}},setAttribute(){}});return nodes.get(s)};
 const scene=(start,end,title)=>({start,end,title,text:title,image:title+'.jpg'});
 const base={audio:'test.mp3',script:'script',title:'Test',gu:'Test',scenes:[scene(0,10,'first'),scene(10,20,'last')],topics:[{id:'t1',start:10,end:20,title:'Topic'}],sources:[]};
 const recordings={test:base,empty:{...base,scenes:[]},gap:{...base,scenes:[scene(0,9,'first'),scene(10,20,'last')]},missing:{...base,audio:''},unpublished:{...base,published:false}};
 let cleanup,html;const show=createDistrictPlayer({$:node,$$:()=>[],open:s=>{nodes.clear();html=s},esc:s=>s,onCleanup:fn=>cleanup=fn,isReduced:()=>false,recordings});
 const audio=()=>instances.at(-1);
 show('test');assert.equal(audio().plays,1,'Opening from a Play click calls audio.play synchronously');audio().onloadedmetadata();await Promise.resolve();
 node('#recording-play').onclick();assert.equal(audio().paused,true);
 audio().currentTime=12;node('#recording-play').onclick();assert.equal(audio().currentTime,12,'Resume preserves absolute time');
 audio().currentTime=0;audio().ontimeupdate();node('#recording-next').onclick();assert.equal(audio().currentTime,10,'Next scene uses authored absolute timestamp, not duration scaling');assert.equal(node('#detail-title').textContent,'last');
 node('#recording-speed').onchange({target:{value:'1.5'}});assert.equal(audio().playbackRate,1.5);
 node('#recording-seek').oninput({target:{value:'20'}});assert.equal(node('#detail-title').textContent,'last','End retains final scene');assert.equal(audio().paused,true);
 node('#recording-play').onclick();assert.equal(audio().currentTime,0,'Replay restarts full story');
 const previous=audio();show('test','t1');assert.equal(previous.paused,true);assert.equal(previous.src,'','Switch releases prior audio');assert.equal(listeners.size,1);
 audio().onloadedmetadata();assert.equal(audio().currentTime,10,'Topic starts at its absolute start');audio().currentTime=20;audio().ontimeupdate();assert.equal(audio().paused,true);node('#recording-play').onclick();assert.equal(audio().currentTime,10,'Completed topic replays at its own start');
 // Seeking before delayed metadata must survive loading, and repeated metadata must not restart it.
 show('test');node('#recording-seek').oninput({target:{value:'14'}});audio().onloadedmetadata();assert.equal(audio().currentTime,14);audio().currentTime=16;audio().onloadedmetadata();assert.equal(audio().currentTime,16,'Repeated metadata never rewinds playback');
 cleanup();assert.equal(audio().paused,true);assert.equal(audio().ontimeupdate,null);assert.equal(listeners.size,0);cleanup();
 show('test','t1');audio().duration=15;audio().onloadedmetadata();assert.equal(audio().paused,true);assert.equal(node('#recording-play').disabled,true);const count=audio().plays;node('#recording-play').onclick();assert.equal(audio().plays,count,'Invalid timeline cannot play');assert.match(node('#recording-status').textContent,/સમય/);
 for(const slug of ['empty','gap','missing','unpublished']){const before=instances.length;show(slug);assert.equal(instances.length,before);assert.match(html,/Narration unavailable/);}
 show('test');audio().onloadedmetadata();audio().onerror();assert.match(node('#recording-status').textContent,/could not load/);cleanup();
 console.log('PASS: district factory — direct play, authored timing, pause/resume, seek, final scene, topics/replay, speed, delayed metadata, invalid media, switching and cleanup');
})().catch(e=>{console.error(e);process.exitCode=1});
