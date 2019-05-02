const Benchmark = require('benchmark');
const fs = require('fs');
const path = require('path');
const geotiff = require('../dist/geotiff.bundle.min.js');

const buffer = fs.readFileSync(path.join(__dirname, 'data', 'stripped.tiff'));
const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);

const options = {
  onStart() { console.log(this.name); },
  onError(event) { console.log(event.target.error); },
  onCycle(event) { console.log(String(event.target)); }
};

const suite = new Benchmark.Suite('Opening Test', options);
suite
  .add('Open and read', async function () {
      await doStuff();
  })
  .run();

async function doStuff() {
  const tiff = await geotiff.fromArrayBuffer(arrayBuffer);
  const image = await tiff.getImage();

  await image.readRasters({
    window: [200, 200, 210, 210], samples: [0],
  });
}
