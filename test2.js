let kennel = { // тот же самый объект, сжатый для краткости
  dogs: [
    {
      name: 'Adam',
      parents: [
        {
          gender: 'dam',
          name: 'Ella',
          images: [
            {fd: "http://localhost/0", name: '_cover.jpg'},
            {fd: "http://localhost/1", name: 'ella.jpg'}
          ]
        },
        {
          gender: 'sire',
          name: 'Neron',
          images: [
            {fd: "http://localhost/0", name: '_cover.jpg'},
            {fd: "http://localhost/1", name: 'neron.jpg'}
          ]
        }
      ]
    },
    {
      name: 'Bazhen',
      parents: [
        {
          gender: 'dam',
          name: 'Ella',
          images: [
            {fd: "http://localhost/0", name: '_cover.jpg'},
            {fd: "http://localhost/1", name: 'ella.jpg'}
          ]
        },
        {
          gender: 'sire',
          name: 'Lux',
          images: [
            {fd: "http://localhost/0", name: '_cover.jpg'},
            {fd: "http://localhost/1", name: 'lux.jpg'}
          ]
        }
      ]
    }
  ],
  breeder: {
    sites: [{name: 'Peter', salary: 2000}, {name: 'Alex', salary: 1800}],
    internals: [{name: 'Jack', salary: 1300}]
  }
};

// Функция для подсчёта суммы зарплат
function sumSalaries(collection) {
  if (Array.isArray(collection)) { // случай (1)
    console.log('collection::: ' , collection);
    return collection.map(current =>  {
      console.log('current.fd::: ' , current.fd);
       current.fd ? current.imageSrc = 'http://resolve' : '';
      return current;
    });
  } else { // случай (2)
    let sum = [];
    for (let subdep of Object.values(collection)) {
      sum.push(sumSalaries(subdep)); // рекурсивно вызывается для подотделов, суммируя результаты
    }
    return sum;
  }
}

let r = sumSalaries(kennel);
console.log(r);
console.log('***********************-1-****************************');
console.log(r[0][0]);
console.log('***********************-2-****************************');
console.log(r[0][0].parents);
console.log('***********************-3-****************************');
console.log(r[0][0].parents[0]);
