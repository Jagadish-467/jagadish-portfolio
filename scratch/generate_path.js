const TextToSVG = require('text-to-svg');
const textToSVG = TextToSVG.loadSync('./font.ttf');

const attributes = { fill: 'none', stroke: 'black' };
const options = { x: 0, y: 0, fontSize: 144, anchor: 'top', attributes: attributes };

const d = textToSVG.getD('Jagadish', options);
console.log(d);
