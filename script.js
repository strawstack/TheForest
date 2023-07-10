(() => {

    const ROWS = 20;
    const COLS = 23;

    const svg = document.querySelector(".svg");
    const cell = document.querySelector(".cell");
    cell.remove();
    const letterLookup = getLetterLookup();

    const hexGrid = [];

    for (let y = 0; y < ROWS; y++) {
        const hexRow = [];
        for (let x = 0; x < COLS; x++) {
            const hd = getHexDigit();
            hexRow.push(hd);
            const cc = cell.cloneNode(true);
            cc.setAttribute("transform", `translate(${x * 32} ${y * 32})`);
            applyLetter(cc, hd.letter);
            svg.appendChild(cc);
        }
        hexGrid.push(hexRow);
    }

    const cells = document.querySelectorAll(".cell");
    for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
            hexGrid[y][x].ref = cells[y * COLS + x];
        }
    }

    // Layers
    treeLayer();
    stoneLayer();
    waterLayer();
    dirtLayer();

    // Add types as classes
    for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
            const dataClass = hexGrid[y][x].data.type;
            if (dataClass !== null) {
                hexGrid[y][x].ref.classList.add(dataClass);
            }
        }
    }

    function treeLayer() {
        for (let y = 0; y < ROWS; y++) {
            for (let x = 0; x < COLS; x++) {
                const letter = hexGrid[y][x].letter;
                if (letter === "F") {
                    hexGrid[y][x].data.type = "tree";
                    circleTree(hexGrid, y, x);
                }
            }
        }
    }

    function stoneLayer() {
        for (let y = 0; y < ROWS; y++) {
            for (let x = 0; x < COLS; x++) {
                const cellInfo = hexGrid[y][x];
                if (cellInfo.data.type === "tree") {
                    if (cellInfo.letter === "3" || cellInfo.letter === "4") {
                        cellInfo.data.type = "stone";
                    }
                } else {
                    if (cellInfo.letter === "3") {
                        cellInfo.data.type = "stone";
                    }
                }
            }
        }
    }

    function waterLayer() {
        for (let x = 0; x < COLS; x++) {
            if (hexGrid[0][x].letter === "F") {
                addStream(0, x);
            }
        }
    }

    function addStream(sy, sx) {
        let ty = sy;
        let tx = sx;
        while (bounds(ty, tx)) {
            hexGrid[ty][tx].data.type = "water";
            ty += 1;
            if (bounds(ty, tx)) {
                hexGrid[ty][tx].data.type = "water";
                tx += (isEven(ty, tx)) ? 1 : -1;
            }
        }
    }

    function dirtLayer() {
        for (let y = 0; y < ROWS; y++) {
            for (let x = 0; x < COLS; x++) {
                if (hexGrid[y][x].data.type === null) {
                    hexGrid[y][x].data.type = "dirt";
                }
            }
        }
    }

    function isEven(y, x) {
        return parseInt(hexGrid[y][x].letter, 16) % 2 === 0;
    }

    function circleTree(hexGrid, ty, tx) {
        //const shift = (tx === 0) ? 1 : -1;
        //const refLetter = hexGrid[ty][tx + shift].letter;
        //const bigRadius = parseInt(refLetter, 16) > 7;
        const radSize = 1;
        for (let oy = -radSize + ty; oy <= radSize + ty; oy++) {
            for (let ox = -radSize + tx; ox <= radSize + tx; ox++) {
                if (bounds(oy, ox)) {
                    const cellRef = hexGrid[oy][ox].ref;
                    if (!isAlreadyTree(cellRef)) {
                        hexGrid[oy][ox].data.type = "tree";
                    }
                }
            }
        }
    }

    function isAlreadyTree(cellRef) {
        return cellRef.classList.value.indexOf("tree") !== -1;
    }

    function bounds(oy, ox) {
        return oy >= 0 && oy < ROWS && ox >= 0 && ox < COLS;
    }

    function getLetterLookup() {
        return {
            "0": [
                "00000",
                "00 00",
                "00 00",
                "00 00",
                "00000",
            ],
            "1": [
                "0000 ",
                " 000 ",
                " 000 ",
                " 000 ",
                "00000",
            ],
            "2": [
                "00000",
                "  000",
                "00000",
                "000  ",
                "00000",
            ],
            "3": [
                "00000",
                " 0000",
                "00000",
                " 0000",
                "00000",
            ],
            "4": [
                "00 00",
                "00000",
                "00000",
                "  000",
                "  000",
            ],
            "5": [
                "00000",
                "000  ",
                "00000",
                "  000",
                "00000",
            ],
            "6": [
                "00000",
                "000  ",
                "00000",
                "00 00",
                "00000",
            ],
            "7": [
                "00000",
                " 0000",
                " 0000",
                " 0000",
                " 0000",
            ],
            "8": [
                "00000",
                "00 00",
                "00000",
                "00 00",
                "00000",
            ],
            "9": [
                "00000",
                "0 000",
                "00000",
                "  000",
                "  000",
            ],
            "A": [
                "00000",
                "00000",
                "00 00",
                "00000",
                "00 00",
            ],
            "B": [
                "00000",
                "00 00",
                "0000 ",
                "00 00",
                "00000",
            ],
            "C": [
                "00000",
                "00000",
                "0000 ",
                "00000",
                "00000",
            ],
            "D": [
                "0000 ",
                "00000",
                "00 00",
                "00000",
                "0000 ",
            ],
            "E": [
                "00000",
                "0000 ",
                "00000",
                "0000 ",
                "00000",
            ],
            "F": [
                "00000",
                "0000 ",
                "00000",
                "0000 ",
                "0000 ",
            ],
        };
    }

    function getHexDigit() {
        const hex = "0123456789ABCDEF";
        return {
            letter: hex[Math.floor(Math.random() * hex.length)],
            ref: null,
            data: {
                type: null
            }
        }
    }

    function applyLetter(cc, hd) {
        const pattern = letterLookup[hd];
        const rects = cc.querySelectorAll("rect");
        for (let r = 0; r < 5; r++) {
            for (let c = 0; c < 5; c++) {
                if (pattern[r][c] === "0") {
                    //rects[r * 5 + c].setAttribute("fill", "#333");
                } else {
                    rects[r * 5 + c].setAttribute("fill", "none");
                }
            }
        }
    }

})();