import fs from 'node:fs';

/** @param {string} path */
function readFileSync(path) {
  return fs.readFileSync(path, { encoding: 'utf-8' });
}

export default readFileSync;
