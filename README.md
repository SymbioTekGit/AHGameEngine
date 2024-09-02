# AH GAME ENGINE

Based on Data Structure. Will be 2D first and on Canvas HTML. But could be extended to Swift, etc ...

References:
 * [PixiJS Tutorial for compete Beginners](https://waelyasmina.net/articles/pixi-js-tutorial-for-complete-beginners/)
 * [PixiJS](https://pixijs.com/8.x/guides)


## Install

```
% npm install
% npx vite
```

## Columns

Reference:
 * [Columns Genesis Manual](https://manuals.sega.com/genesismini/pdf/COLUMNS.pdf)
 * [Sega Retro](https://segaretro.org/Columns)

## Data Structure

```
AHImageRef = { 
  id: Number, 
  url: Number
}

AHImage = {
    id: Number,
    url: String,
    img: Image,
    width: Number,
    height: Number

    draw(x, y, w, h, dx = 0, dy = 0);
}

AHTileSet = {
    gid: Number,
    imageId: Number,
    dx: Number,
    dy: Number,
    dw: Number,
    dh: Number

    draw(x, y);
}

AH3Number {
    x: Number,
    y: Number,
    z: Number
}

class AH3DNode {
    constructor() {
        parent: AH3DNode,
        children: AH3DNode
        anchor: AH3Float,
        size: AH3Float,
        position: AH3Float,
        rotation: AH3Float,
        scale: AH3Float
    }
    
    addChild(node);
}
```

## Reference

 * [HTML Canvas](https://www.w3schools.com/html/html5_canvas.asp)
 * [HTML Canvas Tutorial](https://www.w3schools.com/graphics/canvas_intro.asp)
 * [Code In Complete](https://codeincomplete.com/articles/javascript-boulderdash/)
