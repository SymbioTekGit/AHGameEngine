const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
var time = 0;
var size = { w: 50, h: 50 };
var position = { x: 160, y: 100, z: 0 };
var anchor = { x: 0.5, y: 0.5 };
var scale = { x: 2, y: 2 };
var angle = 0;

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.globalCompositeOperation = "lighter";

    ctx.save();
    ctx.fillStyle = "green";
    ctx.translate(position.x, position.y);
    ctx.rotate(angle * Math.PI / 180);
    ctx.scale(scale.x, scale.y);
    ctx.fillRect(-size.w * anchor.x, - size.h * anchor.y, size.w, size.h);
    ctx.restore();

    angle += 1;

    // Call the game loop recursively
    requestAnimationFrame(loop);
}

function setup() {
    
}

function main() {
    setup();

    loop();
}

main();