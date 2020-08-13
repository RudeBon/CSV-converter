let rezData = [
    {
        word: 'value1',
        translate: ['translate1-1, translate1-2', 'translate1-3'],
        transcription: '',
        example: '',
        part: 'part1'
    },
    {
        word: 'value2',
        translate: ['translate2-1, translate2-2'],
        transcription: 'transcription2',
        example: '',
        part: 'part2'
    },
    {
        word: 'value3',
        translate: ['translate3'],
        transcription: '',
        example: 'example3',
        part: 'part3'
    },

]
let dataToWrite = [];

function isEmpty(item) {
    if (item == '') {
        return true;
    }
}

function convertArrayOfObjects(arrayOfObjects, target) {
    for (i = 0; i < arrayOfObjects.length; i++) {
        arrayOfObjects[i].translate = arrayOfObjects[i].translate.join(', ');
        const { word, translate, transcription, example } = arrayOfObjects[i];
        target.push({ word, transcription, translate, example })
    }
}

function cleaningEmptyProps(array){
    array.map(function (obj) {
        for (key in obj) {
            if (isEmpty(obj[key])) {
                delete obj[key];
            }
        }
        return obj;
    });
};
convertArrayOfObjects(rezData, dataToWrite);
cleaningEmptyProps(dataToWrite)

// dataToWrite.map(function (obj) {
//     for (key in obj) {
//         if (isEmpty(obj[key])) {
//             delete obj[key];
//         }
//     }
//     return obj;
// });

console.log(dataToWrite, 'before editing');
// console.log(data, 'after');