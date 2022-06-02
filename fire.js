const pixels = Array.from(document.querySelectorAll("g>rect"));
const pixelWidth = 1;
const pixelHeight = 13;
const firstRow = Number(pixels[0].attributes.y.value);
const lastRow = Number(pixels[6].attributes.y.value);
const firstCol = Number(pixels[0].attributes.x.value);
const lastCol = Number(pixels[pixels.length - 1].attributes.x.value);

let previousTime;

const fireColorsPalette = [
    { "r": 7, "g": 7, "b": 7 },
    { "r": 103, "g": 31, "b": 7 },
    { "r": 191, "g": 71, "b": 7 },
    { "r": 207, "g": 111, "b": 15 },
    { "r": 207, "g": 135, "b": 23 },
    { "r": 183, "g": 183, "b": 47 },
    { "r": 239, "g": 239, "b": 199 },
]

function fireColorString(fireIntensity) {
    return `rgb(${fireColorsPalette[fireIntensity].r},\
        ${fireColorsPalette[fireIntensity].g},\
        ${fireColorsPalette[fireIntensity].b})`
        .replace(/^\s+|\s+$|\s+(?=\s)/g, "")
}

function updateFireIntensityPerPixel(currentPixelIndex) {
    const pixel = pixels.find(pixel => {
        if (Number(pixel.attributes.x.value) === currentPixelIndex.x &&
            Number(pixel.attributes.y.value) === currentPixelIndex.y) {
            return true
        }
    })
    const decay = Math.floor(Math.random() * 4);
    if (pixel) {
        const fireIntensity =
            (currentPixelIndex.y / pixelHeight) - decay >= 0 ?
                (currentPixelIndex.y / pixelHeight) - decay :
                0;
        pixel.style.fill = fireColorString(fireIntensity);
    }
}

function renderAnimation(timestamp = 0) {
    if (!previousTime) {
        previousTime = timestamp
    }
    const elapsed = timestamp - previousTime;
    if (elapsed > 160) {
        previousTime = timestamp;
        for (let x = firstCol; x >= lastCol; x = x - pixelWidth) {
            for (let y = firstRow; y <= lastRow; y = y + pixelHeight) {
                const pixelIndex = { x, y };
                updateFireIntensityPerPixel(pixelIndex)
            }
        }
    }
    return window.requestAnimationFrame(renderAnimation);
}