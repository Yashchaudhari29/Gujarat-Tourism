import assert from 'node:assert/strict';
import {resolveRoute, normalizePath, legacyRoutes, personPath} from '../src/routes.js';
for (const [path, type, id] of [['/','home'],['/leadership/','leadership'],['/leadership/narendra-modi','leadership','narendra-modi'],['/districts/kutch/','districts','kutch'],['/development/sauni-yojana','development','sauni-yojana'],['/explore/people/narsinh-mehta','explorer'],['/explore/environment','explorer'],['/explore-deeper','hub']]) {
  const actual = resolveRoute(path); assert.equal(actual.type,type,path); assert.equal(actual.id,id,path);
}
for (const path of ['/leadershipish','/leadership/a/extra','/districts/a/extra','/explore/unknown','/explore','/development/a/extra','/leadership/%ZZ']) assert.equal(resolveRoute(path).type,'not-found',path);
assert.equal(normalizePath('/districts///'),'/districts');
assert.equal(legacyRoutes['#people-explorer'],'/explore/people');
assert.equal(personPath('a b'),'/leadership/a%20b');
console.log('PASS: exact routes, legacy documentary link, trailing slashes, invalid paths and encoded IDs');
