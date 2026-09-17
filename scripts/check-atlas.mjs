import assert from 'node:assert/strict';
import {atlasViewport,nearestNorth} from '../src/runtime/atlas.js';
import atlasData from '../src/data/historical-atlas.json' with { type: 'json' };
import districtPhotos from '../src/data/district-photos.json' with { type: 'json' };
for(const [w,h] of [[0,0],[100,0],[0,100],[NaN,20],[20,Infinity],[-1,20]]){
 const size=atlasViewport(w,h);assert.equal(size.visible,false);assert.equal(size.aspect,1);assert.ok(size.width>0&&size.height>0);
}
assert.deepEqual(atlasViewport(1200,600),{width:1200,height:600,aspect:2,visible:true});
for(const angle of [0,.2,-.2,Math.PI-0.01,13*Math.PI+.1,-17*Math.PI-.1,120*Math.PI+.4]){
 const target=nearestNorth(angle);assert.ok(Math.abs(target-angle)<=Math.PI+1e-10,'North takes at most half a turn');assert.ok(Math.abs(Math.sin(target))<1e-10,'Target is north');assert.ok(Math.cos(target)>.999999);
}
assert.equal(nearestNorth(NaN),0);
console.log('PASS: atlas hidden-viewport projection and shortest north alignment helpers');
