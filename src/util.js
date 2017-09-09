// Transform DOM prop/attr names applicable to `<svg>` element but react-limited

export function convertReactSVGDOMProperty(str) {
    return str.replace(/[-|:]([a-z])/g, function (g) { return g[1].toUpperCase(); })
}

export function startsWith(str, substring) {
    return str.indexOf(substring) === 0;
}

const DataPropPrefix = 'data-';
// Serialize `Attr` objects in `NamedNodeMap`
export function serializeAttrs(map) {
    const ret = {};
    for (let prop, i = 0; i < map.length; i++) {
        const key = map[i].name;
        if (!startsWith(key, DataPropPrefix)) {
            prop = convertReactSVGDOMProperty(key);
        } 
        ret[prop] = map[i].value;
    }
    return ret;
}

export function getSVGFromSource(src) {
    const svgContainer = document.createElement('div');
    svgContainer.innerHTML = src;
    const svg = svgContainer.firstElementChild;
    svg.remove(); // deref from parent element
    return svg;
}

// get <svg /> element props
export function extractSVGProps(src) {
    const map = getSVGFromSource(src).attributes;
    return (map.length > 0) ? serializeAttrs(map) : null;
}
