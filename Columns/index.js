// Step 1
import {
    Application,
    Graphics,
    Text,
    TextStyle,
    Assets,
    Sprite
  } from 'pixi.js';

async function setup() {
    const app = new Application();
    await app.init({
      width: 320,
      height: 224,
      background: '#800080',
      antialias: false
    });
  
    app.canvas.style.position = 'absolute';
    document.body.appendChild(app.canvas);

    Assets.add({ alias: 'background', src: 'columns-genesis-2p-backlayer.png'});
    Assets.add({ alias: 'spritesheet', src: 'columns-genesis-spritesheet.png'});
    await Assets.load(['background', 'spritesheet']);

    const background = Sprite.from('background');
    app.stage.addChild(background);
}

(async() => {
    await setup();
    
})();