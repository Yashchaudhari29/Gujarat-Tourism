const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const source=fs.readFileSync('src/runtime/district-player.js','utf8');
const fn=source.slice(source.indexOf('function showRecording'),source.lastIndexOf('}'));
const nodes=new Map();const node=s=>{if(!nodes.has(s))nodes.set(s,{textContent:'',value:0,disabled:false,style:{},classList:{toggle(){}},setAttribute(){},requestFullscreen:async()=>{}});return nodes.get(s)};
let audio;class AudioMock{constructor(src){audio=this;this.src=src;this.paused=true;this.currentTime=0;this.duration=30;this.error=null;this.ended=false;}load(){this.currentTime=0;}play(){this.paused=false;this.onplay?.();return Promise.resolve()}pause(){this.paused=true;this.onpause?.()}removeAttribute(){}}
const c={Audio:AudioMock,recordings:{test:{audio:'test.mp3',script:'script',title:'T',gu:'G',scenes:[{start:0,end:10,title:'S1',text:'A'},{start:10,end:20,title:'S2',text:'B'}],topics:[{id:'t1',start:10,end:20,title:'T1'}],sources:[]}},esc:s=>s,open:()=>{},$:node,$$:()=>[],isReduced:()=>false,onCleanup:fn=>{c.cleanup=fn},localStorage:{getItem:()=>null,setItem(){}},document:{addEventListener(){},removeEventListener(){},hidden:false},cleanup:()=>{}};
vm.createContext(c);vm.runInContext(fn+';showRecording("test")',c);
(async()=>{
 assert.equal(audio.src,'test.mp3');
 audio.onloadedmetadata();
 await Promise.resolve(); // flush microtasks for play()
 assert.equal(audio.paused,false,'Autoplay starts recording');
 node('#recording-play').onclick();
 assert.equal(audio.paused,true,'Click pauses recording');
 audio.currentTime=12;
 node('#recording-play').onclick();
 assert.equal(audio.paused,false,'Click resumes recording');
 assert.equal(audio.currentTime,12,'Resume preserves position');
 node('#recording-next').onclick();
 assert.equal(audio.currentTime,15);
 c.cleanup();
 assert.equal(audio.paused,true,'Closing stops audio');
 console.log('PASS: district recording playback');
})().catch(e=>{console.error(e);process.exit(1)});
