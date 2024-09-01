async function loadImage(url) {
    return new Promise((resolve, reject) => {
        let image = new Image()
      
        image.onload = () => resolve(image)
        image.onerror = () => reject(new Error(`Could not load image at ${url}`))
        image.src = url  
    })
}

class AHImage {
    constructor() {
        this.id = 0;
        this.url = "";
        this.image = null;
        this.width = 0;
        this.height = 0;
    }

    // { id: Number, url: String } 
    async load(json) {
        this.id = json.id;
        this.url = json.url;
        this.image = await loadImage(json.url);
        this.width = this.image.width;
        this.height = this.image.height;
    }

    
}

class AHImageManager {
    constructor() {
        this.nextId = 1;
        this.images = [];
    }

    get(id) {
        return this.images.find(x => x.id === id);
    }

    // { id: Number, url: String }
    async load(json) {
        let image = new AHImage();
        image.load(json);

        this.images.push(image);
        this.nextId = json.id + 1;
    }

    async bulk(jsons) {
        jsons.forEach(json => {
            this.load(json);
        })
    }
}

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
var currentTime, deltaTime = 0, previousTime = timestamp(), timer = 1/60;
var imageMgr = new AHImageManager();
var bitmaps = [];

function timestamp() {
    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}

async function setup() {
    let imagejsons = [ 
        { id: 1, url: "solomonskey-cpc-tileset.png" },
        { id: 2, url: "solomonskey-cpc-title.png" }
    ];
    await imageMgr.bulk(imagejsons);

    // await imageMgr.load(["./Assets/solomonskey-cpc-tileset.png", "./Assets/solomonskey-cpc-title.png"]);
    console.log(imageMgr);

    bitmaps = [ 
        { imageId: 2, dx: 0, dy: 0, dz: -10, dw: 320, dh: 200, sx: 0, sy: 0, sw: 320, sh: 200 },
        { imageId: 1, dx: 100, dy: 100, dz: 0, dw: 20, dh: 16, sx: 0, sy: 0, sw: 20, sh: 16 },
    ];
}

function render(dt) {
    // TBD
    bitmaps = bitmaps.sort(function(a, b) {
        return (a.dz - b.dz);
    });

    bitmaps.forEach((bitmap) => {
        let img = imageMgr.get(bitmap.imageId);
        ctx.drawImage(img.image, bitmap.sx, bitmap.sy, bitmap.sw, bitmap.sh, bitmap.dx, bitmap.dy, bitmap.dw, bitmap.dh);
    })
}

function update(dt) {
    // TBD
}

function loop() {
    currentTime = timestamp();
    deltaTime = deltaTime + Math.min(1, (currentTime - previousTime) / 1000);
    
    if (deltaTime > timer) {
        update(deltaTime);
        render(deltaTime);
        deltaTime = 0;
    }

    previousTime = currentTime;

    // Call the game loop recursively
    requestAnimationFrame(loop);
}

async function main() {
    await setup();

    loop();
}

main();