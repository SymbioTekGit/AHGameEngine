const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

async function preloadImages(urls) {
    const promises = urls.map((url) => {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.src = url;
            image.onload = () => resolve(image);
            image.onerror = () => reject(`Image failed to load: ${url}`);
        });
    });
    return Promise.all(promises);
}


async function setup() {
    var images = await preloadImages(["./Assets/solomonskey-cpc-tileset.png", "./Assets/solomonskey-cpc-title.png"]);
    ctx.drawImage(images[1], 0, 0);
}

function render() {
    // TBD
}

function update() {
    // TBD
}

function loop() {
    // TBD
    
    // Call the game loop recursively
    requestAnimationFrame(loop);
}

async function main() {
    await setup();

    loop();
}

main();