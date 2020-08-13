const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const CsvReadableStream = require('csv-reader');

let inputStream = fs.createReadStream('smart-book.csv', 'utf8');

let rezData = [];
let dataToWrite = [];

function transformString(str, separator) {
  return str.split(separator);
};

function addValueToArray(objKey, value) {
  objKey.push(...value);
};

function writeDictionary(arrayOfObjects, objectToAdd, keyToAdd, keyToCompare) {
  let singleWord = arrayOfObjects.find(obj => obj[keyToCompare] == objectToAdd[keyToCompare]);
  if (singleWord !== undefined) {
    addValueToArray(singleWord[keyToAdd], objectToAdd[keyToAdd]);
  } else {
    arrayOfObjects.push(objectToAdd);
  };
};

function isEmpty(item) {
  if (item == '') {
    return true;
  };
};

function convertArrayOfObjects(arrayOfObjects, target) {
  for (i = 0; i < arrayOfObjects.length; i++) {
    arrayOfObjects[i].translate = arrayOfObjects[i].translate.join(', ');
    const { word, translate, transcription, example } = arrayOfObjects[i];
    target.push({ word, transcription, translate, example })
  };
};

function cleaningEmptyProps(array) {
  array.map(function (obj) {
    for (key in obj) {
      if (isEmpty(obj[key])) {
        delete obj[key];
      }
    };
    return obj;
  });
};

const csvWriter = createCsvWriter({
  path: 'rewordFile.csv',
  header: [
    { id: 'word', title: 'WORD' },
    { id: 'translate', title: 'TRANSLATE' },
    { id: 'transcription', title: 'TRANSRIPTION' },
    { id: 'example', title: 'EXAMPLE' },
  ],
  fieldDelimiter: ';',

});

function readAndWrite() {
  inputStream
    .pipe(new CsvReadableStream({ skipHeader: true, delimiter: ';', asObject: true }))
    .on('data', function (row) {
      row.translate = transformString(row.translate, ', ');
      writeDictionary(rezData, row, 'translate', 'word');

      // console.log('A row arrived: ', row);
    })
    .on('end', function (data) {
      console.log('No more rows!');

      convertArrayOfObjects(rezData, dataToWrite);
      console.log(dataToWrite);
      // cleaningEmptyProps(dataToWrite)
      csvWriter
        .writeRecords(dataToWrite)
        .then(() => console.log('The CSV file was written successfully'));
    });
};

readAndWrite();   