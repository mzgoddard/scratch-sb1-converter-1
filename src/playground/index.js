import {SB1File} from '../..';
import {SB1View} from './view';

SB1View.register(require('./array').ArrayRenderer);
SB1View.register(require('./field').FieldRenderer);
SB1View.register(require('./js-primitive').JSPrimitiveRenderer);
SB1View.register(require('./object').ObjectRenderer);
SB1View.register(require('./viewable').ViewableRenderer);

const createDownload = (name, mime, content) => {
    const anchor = document.createElement('a');
    anchor.download = name;
    anchor.href = URL.createObjectURL(new Blob([content], {type: mime}));
    anchor.innerText = name;
    return anchor;
};

let last = null;
const readFile = f => {
    const reader = new FileReader();
    reader.onload = function (event) {
        if (last) {
            last.forEach(document.body.removeChild, document.body);
        }
        const sb1 = new SB1File(event.target.result);
        last = [
            new SB1View(sb1, 'file').element,
            new SB1View(Array.from(sb1.infoRaw()), 'raw - info').element,
            new SB1View(Array.from(sb1.dataRaw()), 'raw - data').element
        ];
        last.forEach(document.body.appendChild, document.body);
    };
    reader.readAsArrayBuffer(f);
};

Array.from(document.getElementsByClassName('file')).forEach(el => {
    el.addEventListener('change', () => {
        Array.from(el.files).forEach(readFile);
    });
});

document.body.addEventListener('drop', e => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    document.getElementsByClassName('file')[0].files = e.dataTransfer.files;
});

document.body.addEventListener('dragover', e => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
});
