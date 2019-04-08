// Функция без обратного вызова
const sum = (a, b) => a + b;
const res = sum(1, 2);
console.log(res);

// Функция обратного вызова
const downloadFile = (url, callback) => {
  setTimeout(function () {
    /**
     *  Здесь проверка загрузки файла и
     *  в зависимости от того загрузился файл или нет
     *  в первый аргумент функции обратного вызова (callback)
     *  ставим ошибка загрузки - true 1
     *  или false 0
     */

    callback(1, 'file')
  }, 2000);
};

function handler(err, res) {
  if (err) return console.log('Первая функция. File loading error.');
  return console.log(`Ok. File downloaded ${res}.`);
}

downloadFile('http://example.com/arr.zip', handler);

console.log('Вторая функция.');



function pause(ms) {
  return new Promise(res=>{
    setTimeout(res, ms)
  })
}

await pause(2000); console.log('First function.');
await pause(2000); console.log('Two function.');
