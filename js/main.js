"use strict";

const DATAFILE = './data/corpus.csv';

function readCsv(file,where,delimiter=";") {
    let reader = new FileReader();
    reader.onload = function(progressEvent) {
        const text = this.result;
        var lines = text.split('\n');
        for (var line = 1; line < lines.length; line++) {
            var lineText = lines[line];
            if (lineText !== '') {
                const lineColumns = lineText.split(delimiter);
                const textColumn = lineColumns[0];
                const translationColumn = lineColumns[1];
                const commentColumn = lineColumns[2];
                const regionColumn = lineColumns[3];
                where.insertAdjacentHTML('beforeend',formatTableRow(line,textColumn,translationColumn,commentColumn,regionColumn));
            }
        }
    }
    reader.readAsText(file);
}

function formatTableRow(rowId,text,translation,comment,region) {
    return `<tr id="table-row-${rowId}"><td class="pokelatin">${text}</td><td class="monospace"></td><td>${translation}</td><td>${comment}</td><td>${region}</td></tr>`
}

async function loadCorpus() {
    let corpusTable = document.querySelector('#pokelatin-table tbody');
    let corpusFilePromise = await fetch(DATAFILE);
    let corpusFile = await corpusFilePromise.blob();
    readCsv(corpusFile,corpusTable,";");
}

async function loadPage() {
    loadCorpus();
    document.querySelector('#translation-form').addEventListener("submit", (event) => {
        translate(event);
    });
    document.querySelector('#translation-form input[name="regionInput"]').addEventListener("keyup", (event) => {
        filterRegion(event);
    });
    document.querySelector('#translation-form input[name="textInput"]').addEventListener("keyup", (event) => {
        filterTexto(event);
    });
}

async function translate(e) {
    e.preventDefault();
    const SPECIAL_CHARS = [' ','(',')'];
    const decipherDict = e.target.querySelector('input[name="decipherDict"]').value;
    if(decipherDict !== '') {
        try {
            const decipherDictJSON = JSON.parse(decipherDict);
            let rows = document.querySelectorAll('#pokelatin-table tr');
            for(let row = 1; row < rows.length; row++) {
                const textColumn = rows[row].querySelectorAll('td')[0];
                let translation = "";
                for(let c = 0; c < textColumn.textContent.length; c++) {
                    const thisChar = String(textColumn.textContent[c]);
                    if(SPECIAL_CHARS.includes(thisChar)) {
                        translation = translation + thisChar;
                    } else {
                        if(!(thisChar in decipherDictJSON)) {
                            translation = translation + '.';
                        } else {
                            translation = translation + decipherDictJSON[thisChar];
                        }
                    }
                }
                let translationColumn = rows[row].querySelectorAll('td')[1];
                translationColumn.innerHTML = translation;

            }
        } catch (error) {
            alert('The input JSON is not valid!');
        }
    }
}

async function filterRegion(event) {
    const filterRegion = event.target.value;
    const tableRows = document.querySelectorAll('#pokelatin-table tr');
    for(let row=1; row < tableRows.length; row++) {
        const region = tableRows[row].querySelectorAll('td')[4].textContent;
        if(region.includes(filterRegion)) {
            tableRows[row].classList.remove('hide');
        } else {
            tableRows[row].classList.add('hide');
        }
    }
}

async function filterTexto(event) {
    const filterTexto = event.target.value;
    const tableRows = document.querySelectorAll('#pokelatin-table tr');
    for(let row=1; row < tableRows.length; row++) {
        const texto = tableRows[row].querySelectorAll('td')[0].textContent;
        if(texto.includes(filterTexto)) {
            tableRows[row].classList.remove('hide');
        } else {
            tableRows[row].classList.add('hide');
        }
    }
}

document.addEventListener('DOMContentLoaded',loadPage);