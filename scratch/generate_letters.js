const opentype = require('opentype.js');

try {
  const font = opentype.loadSync('./font.ttf');
  const paths = font.getPaths('Jagadish', 0, 150, 144);
  const dStrings = paths.map(p => p.toPathData(2));
  console.log(JSON.stringify(dStrings));
} catch (e) {
  console.error(e);
}
