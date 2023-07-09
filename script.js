(() => {

    const svg = document.querySelector(".svg");
    const cell = document.querySelector(".cell");
    cell.remove();
    const letterLookup = getLetterLookup();

    const hexGrid = [];

    for (let y = 0; y < 20; y++) {
        const hexRow = [];
        for (let x = 0; x < 23; x++) {
            const hd = getHexDigit();
            hexRow.push(hd);
            const cc = cell.cloneNode(true);
            cc.setAttribute("transform", `translate(${x * 32} ${y * 32})`);
            applyLetter(cc, hd);
            svg.appendChild(cc);
        }
        hexGrid.push(hexRow);
    }

    console.log(hexGrid)

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
        return hex[Math.floor(Math.random() * hex.length)];
    }

    function applyLetter(cc, hd) {
        const pattern = letterLookup[hd];
        const rects = cc.querySelectorAll("rect");
        for (let r = 0; r < 5; r++) {
            for (let c = 0; c < 5; c++) {
                if (pattern[r][c] === "0") {
                    rects[r * 5 + c].setAttribute("fill", "#333");
                } else {
                    rects[r * 5 + c].setAttribute("fill", "none");
                }
            }
        }
    }

})();