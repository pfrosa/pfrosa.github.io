//@TODO:
//praia gerar na borda do mapa e mudar a regra pra borda do bioma
//fix colors on bioms, add player count to mather, add selected bioms to matter
//get special biom rule for coast and beaches
const _MAP_SIZES = {
    big: {
        MAX_WIDTH: 12,
        MIDDLEROWS: 23,
        SPREAD: 4,
    },
    medium: {
        MAX_WIDTH: 10,
        MIDDLEROWS: 19,
        SPREAD: 3,
    },
    small: {
        MAX_WIDTH: 8,
        MIDDLEROWS: 15,
        SPREAD: 3,
    }
}


//default to big map size
const CONFIG = {
    NUM_PLAYERS: 4,
    MAX_WIDTH: 12,
    MIDDLEROWS: 17,
    SPREAD: 4,
};

const STATE = {
    rows: [],
    flatHexes: [],
    flatIndex: 0
};
// agua eh na borda de alguns biomas especificos, praia e costeiro so
const BIOMS = [
    {
        name: 'Montanhoso',
        backgroundColor: 'lightGray',
        pattern: 'zigzag-pattern',
    },
    {
        name: "Tundra",
        backgroundColor: 'powderblue',
        pattern: 'diagonal-lines-pattern',

    },
    {
        name: "Savana",
        backgroundColor: 'darkgoldenrod',
        pattern: 'checkerboard-pattern'
    },
    {
        name: "Costeiro", //(Praia/Costa), 
        backgroundColor: 'aqua',
        borderBackgroundColor: 'palegoldenrod',
        pattern: 'wavy-pattern',

    },
    {
        name: "Urbano/Rural",
        backgroundColor: 'gray',
        pattern: 'cubes-pattern',

    },
    {
        name: "Floresta", // (Densa/ Aberta/ Montanhosa/ Temperada/ Tropical),
        backgroundColor: 'forestgreen',
        pattern: 'triangles-pattern',

    },
    {
        name: "Desértico",
        backgroundColor: 'khaki',
        pattern: 'paper-pattern',

    },
    {
        name: "Campos",
        backgroundColor: 'lime',
        pattern : 'lines-pattern'

    },

];

// 

const SEED = Math.random();

Math.seedrandom(SEED);
// Math.seedrandom(0.41342047817838035);
const mapElement = document.body.querySelector('.map');
const reGen = document.body.querySelector('#regen');
const savePng = document.body.querySelector('#save-png');
const mapSize = document.body.querySelector('#map-size');
const legendElement = document.body.querySelector('#legend');
const biomsWrapper = document.body.querySelector('.bioms-wrapper');
const nPlayersSelect = document.body.querySelector('#n-players');
const toggleHach = document.body.querySelector(`#disable-patterns`);

toggleHach.addEventListener('click', () => {
    document.body.classList.toggle('disabled-patterns');
})

nPlayersSelect.addEventListener('change', (e) => {
    CONFIG.NUM_PLAYERS = Number(e.target.value);
});

savePng.addEventListener('click', () => {
    const link = document.createElement('a');
    const xmlns = 'http://www.w3.org/2000/svg';
    const svgBox = document.createElementNS(xmlns, 'svg');
    const foreignObject = document.createElementNS(xmlns, 'foreignObject');
    const styleEl = document.createElement('style');
    const cssRules = Array.from(document.styleSheets[0].cssRules).map(e => e.cssText).join(' ')
    const defs = document.createElement('defs');
    const mapClone = mapElement.cloneNode(true);
    styleEl.setAttribute('type', 'text/css');
    styleEl.innerHTML = cssRules;
    const { width, height } = mapElement.getBoundingClientRect();

    foreignObject.append(mapClone);
    foreignObject.setAttribute('width', width);
    foreignObject.setAttribute('height', height);
    foreignObject.setAttribute('x', '0');
    foreignObject.setAttribute('y', '0');
    foreignObject.querySelectorAll(`*`).forEach(el => {
        el.setAttribute('xmlns', "http://www.w3.org/1999/xhtml");
    });
    defs.appendChild(styleEl);
    svgBox.appendChild(defs);
    svgBox.appendChild(foreignObject);
    svgBox.setAttribute('version', "1.1");
    svgBox.setAttribute('xmlns', "http://www.w3.org/2000/svg");
    svgBox.setAttribute('width', width);
    svgBox.setAttribute('height', height);
    svgBox.setAttribute('viewBox', `0 0 ${width} ${height}`);
    const svg64 = btoa(`<?xml version="1.0" encoding="UTF-8"?>` + svgBox.outerHTML);
    const b64Start = 'data:image/svg+xml;base64,';
    const image64 = b64Start + svg64;

    const image = new Image()
    image.src = image64;
    const canvas = document.createElement('canvas')
    canvas.style.border = '3px dashed black';

    const context = canvas.getContext('2d')

    // console.log(image64);
    // document.body.appendChild(canvas);
    // document.body.appendChild(image);
    image.onload = () => {
        const resMutiplier = 2;
        // context.translate(1500,1500); // move to center of canvas`
        canvas.setAttribute('width', image.width * resMutiplier)
        canvas.setAttribute('height', image.height * resMutiplier)
        context.fillStyle = 'white';
        context.drawImage(image, 0, 0, image.width * resMutiplier, image.height * resMutiplier);
        link.href = canvas.toDataURL('image/png');
        link.download = 'map.png';
        link.click();
    };


});

//@TODO COLAPSABLE

legendElement.append(...BIOMS.map(biome => {
    const biomElement = document.createElement('div');
    const biomName = document.createElement('div');
    const biomColor = document.createElement('div');
    const biomBorderColor = document.createElement('div');


    biomElement.classList.add('biom-legend');
    //biomeElement.style.backgroundColor = biome.backgroundColor;
    biomName.innerText = biome.name;
    biomColor.classList.add(biome.pattern);
    biomBorderColor.classList.add(biome.pattern);
    biomColor.style.backgroundColor = biome.backgroundColor;
    biomBorderColor.style.backgroundColor = biome.borderBackgroundColor || biome.backgroundColor;
    biomBorderColor.style.opacity =  biome.borderBackgroundColor ? '1' : '0.7';
    biomElement.append(biomName, biomColor, biomBorderColor);
    return biomElement;
}));

// @TODO get diff solution to this, a map solve it;
const createHexObject = (row, pos) => ({
    row,
    pos,
    bgColor: false,
    opacity: 1,
    flatIndex: STATE.flatIndex++,
    text: `${row}-${pos}`,
    biomIndex: null,
});

const createHex = (content = {}) => {
    const hexElement = document.createElement('div');
    hexElement.style.backgroundColor = content.bgColor || BIOMS[content.biomIndex]?.backgroundColor || `RED`;
    hexElement.style.opacity = content.opacity;
    hexElement.dataset.dist = content.dist || 0;

    hexElement.innerText = content.text;
    // hexElement.style.backgroundImage = content.showImage ? BIOMS[content.biomIndex].backgroundImage || 'none' : 'none';
    hexElement.classList.add('hex');

    //add pattern if exists
    hexElement.classList.add(BIOMS[content.biomIndex]?.pattern || 'none');

    // hexElement.addEventListener('click', () => hexElement.style.backgroundColor = 'red');
    content.htmlElement = hexElement;
    return hexElement;
}

const createRow = (row) => {
    const rowElement = document.createElement('div');
    rowElement.append(...row.map(createHex))
    rowElement.classList.add('row');
    return rowElement;
}

const generateView = (showNormalized = false) => {
    //@todo add custom seeed
    // const seed = Math.random();
    // Math.seedrandom(seed);
    // console.log('seed:', seed);

    Object.assign(CONFIG, _MAP_SIZES[mapSize.value]);

    STATE.flatIndex = 0;

    STATE.rows = [
        ...Array(CONFIG.MAX_WIDTH - 1).fill(true).map((_, i) => Array(i + 1).fill(i).map(createHexObject)),
        ...Array(CONFIG.MIDDLEROWS).fill(true).map((_, i) => Array(CONFIG.MAX_WIDTH - i % 2).fill(i + CONFIG.MAX_WIDTH - 1).map(createHexObject)),
        ...Array(CONFIG.MAX_WIDTH - 1).fill(true).map((_, i) => Array(CONFIG.MAX_WIDTH - (i + 1)).fill(i + CONFIG.MIDDLEROWS + CONFIG.MAX_WIDTH - 1).map(createHexObject)),
    ];

    STATE.flatHexes = STATE.rows.flat();

    const selectedBioms = Array.from(biomsWrapper.querySelectorAll(`input:checked`)).map(check => BIOMS[check.value]);
    while (selectedBioms.length < CONFIG.NUM_PLAYERS) {
        const shuffledBioms = [...BIOMS].sort(() => 0.5 - Math.random());
        selectedBioms.push(shuffledBioms.find(b => !selectedBioms.includes(b)));
    };
    const selectedBiomsIndex = selectedBioms.map(b => BIOMS.indexOf(b));

    const biomCountProxyHandler = {
        get(target, p) {
            if (!target[p]) {
                target[p] = 0;
            }
            return target[p];
        }
    };
    const biomCount = new Proxy({}, biomCountProxyHandler);



    const spread = (hex, i, inplace = false) => {
        const spreadDistN = getNeighborHexesV3(hex, CONFIG.SPREAD, true);
        const randomCenterHex = spreadDistN[getRandomInt(spreadDistN.length)];
        const spread = getSpreadV3(inplace ? hex : randomCenterHex, CONFIG.SPREAD, true);
        spread.forEach(neighbor => {
            biomCount[BIOMS[selectedBiomsIndex[i]].name]++;
            if (!neighbor.bgColor) {
                neighbor.biomIndex = selectedBiomsIndex[i];
                neighbor.dist = neighbor.depth;
            }
        })
        // rows.at(randomCenterHex.row)[randomCenterHex.pos].opacity = 0.3;
    }

    const randomHex = [
    ];

    STATE.flatHexes.forEach(hex => hex.bgColor = false)

    //get bioms and implement praia on lugar certo

    Array(CONFIG.NUM_PLAYERS).fill(true).forEach((_, i) => {
        const isCoast = BIOMS[selectedBiomsIndex[i]]?.borderBackgroundColor !== undefined;
        const mapEdges = getNeighborHexesV3({ row: CONFIG.MIDDLEROWS - 1, pos: (CONFIG.MAX_WIDTH - 2) / 2 }, CONFIG.MAX_WIDTH - 1, true);
        const borderFlatIndex = mapEdges.map(border => border.flatIndex);
        let randomNumber = getRandomInt(STATE.flatHexes.length);
        let neighbors = getSpreadV3(STATE.flatHexes[randomNumber], CONFIG.SPREAD + 1)
        let neighborsIndex = neighbors.map(n => n.flatIndex);

        while ((isCoast && !borderFlatIndex.includes(randomNumber)) ||
            randomHex.includes(randomNumber) ||
            neighborsIndex.some(i => randomHex.includes(i))) {
            randomNumber = getRandomInt(STATE.flatHexes.length)
            neighbors = getSpreadV3(STATE.flatHexes[randomNumber], CONFIG.SPREAD + 1)
            neighborsIndex = neighbors.map(n => n.flatIndex);
        }
        randomHex.push(randomNumber);
    })

    randomHex.forEach((hexPos, i) => {
        const hex = STATE.flatHexes[hexPos];
        spread(hex, i, true);
        STATE.rows.at(hex.row)[hex.pos].biomIndex = selectedBiomsIndex[i];
        STATE.rows.at(hex.row)[hex.pos].dist = 0;
    })

    randomHex.reverse().forEach((hexPos, i) => {
        const hex = STATE.flatHexes[hexPos];
        spread(hex, CONFIG.NUM_PLAYERS - 1 - i);
    })

    randomHex.reverse().forEach((hexPos, i) => {
        const hex = STATE.flatHexes[hexPos];
        spread(hex, i);
    })
    while (STATE.flatHexes.some(hex => hex.biomIndex == null)) {
        // break;
        STATE.flatHexes.filter(hex => hex.biomIndex == null)
            .forEach(hex => {
                const neighbors = getSpreadV3(hex, 1);
                const colorCount = neighbors.reduce((bioms, n) => {
                    if (n.biomIndex !== null) bioms[n.biomIndex] += 1;
                    return bioms;
                }, new Proxy({}, biomCountProxyHandler));
                const majority = Object.keys(colorCount)
                    .reduce((biggest, current) =>
                        biggest = colorCount[current] > (colorCount[biggest] || 0) ? current : biggest, null);

                if (majority != null) {
                    hex.biomIndex = Number(majority);
                }

            });
    }

    //@MAYBE searchFor loners, find any hex that is surreound by different biom and change it to the majority biom

    if (showNormalized) {
        STATE.flatHexes
            .map(hex => {
                const newHex = normalizePos(hex);
                hex.text = `${newHex.row}-${newHex.column}`;
                return newHex;
            })
    }


    STATE.flatHexes.forEach(hex => {
        const isCoast = BIOMS[hex.biomIndex]?.borderBackgroundColor !== undefined;
        const neighbors = getNeighborHexesV3(hex, 1, true).map(hex => STATE.rows[hex.row][hex.pos]);
        const isBorderF = (neighbors) => neighbors.some(n => n.biomIndex !== hex.biomIndex);
        const isBorder = isBorderF(neighbors);
        const isDoubleBorder = neighbors.some(n => isBorderF(getNeighborHexesV3(n, 1, true).map(hex => STATE.rows[hex.row][hex.pos])));
        hex.opacity = isBorder && !isCoast? 0.7 : 1;
        hex.bgColor = isCoast && (isBorder || isDoubleBorder) ? BIOMS[hex.biomIndex].borderBackgroundColor : BIOMS[hex.biomIndex].backgroundColor;
        hex.showImage = isBorder ? false : true;
    });

    const elementsOnMap = STATE.rows.map(createRow);
    mapElement.innerHTML = '';
    mapElement.append(...elementsOnMap);
}

const getRandomInt = (max) => Math.floor(Math.random() * max);

const normalizePos = hex => {
    const distFromEdge = hex.row > (CONFIG.MIDDLEROWS + CONFIG.MAX_WIDTH - 3) ?
        hex.row - (CONFIG.MIDDLEROWS + CONFIG.MAX_WIDTH - 3) : CONFIG.MAX_WIDTH - hex.row
    return {
        ...hex,
        rowPair: hex.row + (hex.row % 2 !== 0 ? 1 : 0),
        column: (distFromEdge > 0 ? distFromEdge - 1 : 1) + hex.pos * 2 + (distFromEdge < 1 && hex.row % 2 != 0 ? -1 : 0),
    }
};

const getNeighborHexesV3 = (hex = { row: 0, pos: 0 }, distance = 1, borderOnly = false) => {
    //center is the 1 
    const normalizedHex = normalizePos(hex);
    const columns = 1 + distance * 2;
    const offsetsColumns = Array(columns).fill(true).map((_, i) => i - Math.floor(columns / 2))
    const offsetsRows = offsetsColumns
        .map((offset, i) =>
            Array(offsetsColumns.length - Math.abs(i - Math.floor(offsetsColumns.length / 2)))
                .fill(true)
                .map((_, i, x) =>
                    (
                        (i - Math.floor(x.length / 2))
                        + (x.length % 2 == 0 && i >= x.length / 2 ? 1 : 0)
                    ) * -2 + (x.length % 2 == 0 ? i >= x.length / 2 ? +1 : -1 : 0)));

    if (borderOnly) {
        offsetsRows.forEach((_, i, a) => _.forEach((_, j, b) => {
            if (i > 0 && j > 0 && i < a.length - 1 && j < b.length - 1) {
                offsetsRows[i][j] = Infinity;
            }
        }))
    }


    const allNormalizedHexes = STATE.flatHexes
        .map(normalizePos)
        .reduce((arr, hex, _, full) => {
            // console.log(full);
            if (!arr[hex.row]?.length) {
                arr[hex.row] = new Array(CONFIG.MAX_WIDTH * 2 - 1).fill();
            }
            arr[hex.row] = arr[hex.row].with(hex.column, hex);
            return arr;
        }, []);


    const hexes = offsetsColumns.map((oc, i) => {
        return offsetsRows[i].map(or => {
            const offsetObjectNormalized = {
                oc,
                or,
                _row: normalizedHex.row + or,
                _pos: normalizedHex.column + oc,
            };
            const actualHex = allNormalizedHexes[offsetObjectNormalized._row]?.[offsetObjectNormalized._pos];
            return actualHex;
        })
    });

    return hexes.flat().filter(_ => _);
}

const getSpreadV3 = (hex, depth = 1, setDepth = false) => {
    return Array(depth)
        .fill(true)
        .map((_, i) => getNeighborHexesV3(hex, i + 1, i > 0))
        .map((ditanceObjs, i) =>
            ditanceObjs.map(distanceObj => {
                const { row, pos } = distanceObj;
                const hex = STATE.rows[row]?.[pos];
                if (setDepth && hex && !hex.depth) {
                    hex.depth = i + 1;
                };
                return hex;
            })
        )
        .flat()
}


generateView(true);
reGen.addEventListener('click', generateView);
