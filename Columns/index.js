// Step 1
import { AnimatedSprite, Application, Assets, Sprite, Spritesheet, Texture } from 'pixi.js';

var players = [ 
    { id: 1, score: 0, level: 1, jewels: 0 },
    { id: 2, score: 0, level: 1, jewels: 0 }];

class AHTileLayer {
    constructor(cols, rows, tileset) {
        this.cols = cols;
        this.rows = rows;
        this.tileset = tileset;
        this.nodes = Array(rows).fill().map(() => Array(cols).fill(null));
        this.node = new Container();
    }


}

class AHTileSet {
    constructor(firstgid = 1) {
        this.spritesheet = null;
        this.firstgid = firstgid;
        this.conf = {};
    }

    getJSON() {
        return JSON.stringify(this.conf,null,'\t');
    }

    async load(imagename, width, height, tilewidth, tileheight, tilecount, animations = {}) {
        this.spritesheet = null;
        this.tilewidth = tilewidth;
        this.tileheight = tileheight;
        this.tilecount = tilecount;

        this.conf = { 
            frames: {},
            meta: {
                image: imagename,
                format: 'RGBA8888',
                size: { w: width, h: height },
                scale: 1
            },
            animations: animations,
        };

        let id = 0;
        let cols = Math.floor(width / this.tilewidth);
        let rows = Math.floor(height / this.tileheight);
        while (id < tilecount) {
            let row = Math.floor(id / rows);
            let col = (id % cols);

            this.conf.frames[id + this.firstgid] = {
                frame: { x: col * tilewidth, y: row * tileheight, w: tilewidth, h: tileheight},
                sourceSize: { w: tilewidth, h: tileheight},
                spriteSourceSize: { x: 0, y: 0, w: tilewidth, h: tileheight}
            }
        
            id += 1;
        }
        console.log(this.conf);

        // Create the SpriteSheet from data and image
        this.spritesheet = new Spritesheet( Texture.from(this.conf.meta.image), this.conf );

        // Generate all the Textures asynchronously
        await this.spritesheet.parse();
    }
}

class AHTile {
    constructor(col, row, gid, tileset) {
        this.node = new Sprite(tileset.tileset)
    }
}

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

    // Bulk load assets
    Assets.add({ alias: 'background', src: 'columns-genesis-2p-backlayer.png'});
    Assets.add({ alias: 'spritesheet', src: 'columns-genesis-spritesheet.png'});
    await Assets.load(['background', 'spritesheet']);
    const background = Sprite.from('background');
    app.stage.addChild(background);

    let tileset = new AHTileSet();
    await tileset.load('columns-genesis-spritesheet.png', 256, 256, 16, 16, 68, { 
        yellow: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        orange: [11, 12, 13, 14, 15, 16, 17, 18, 19],
        green: [21, 22, 23, 24, 25, 26, 27, 28, 29],
        purple: [31, 32, 33, 34, 35, 36, 37, 38, 39],
        red: [41, 42, 43, 44, 45, 46, 47, 48, 49],
        blue: [51, 52, 53, 54, 55, 56, 57, 58, 59] });
    console.log(tileset.getJSON());

    const anim = new AnimatedSprite(tileset.spritesheet.animations.blue);

    // set the animation speed
    anim.animationSpeed = 0.1666;
    // play the animation on a loop
    anim.play();
    // add it to the stage to render
    app.stage.addChild(anim);
}

function main() {
    (async() => {
        await setup();
    })();


}

main();
