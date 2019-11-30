const _ = require('lodash');
const url = require('url');
let kennel = { // тот же самый объект, сжатый для краткости
  breeder: [{
    name: 'Olga Petrova',
    images: [{fd: 'http://localhost/7', name: 'olga.jpg'}, {fd: 'http://localhost/8', name: 'olga.jpg'}]
  }],
  dogs: [
    {
      name: 'Adam',
      images: [
        {fd: "http://localhost/4", name: '_cover.jpg'},
        {fd: "http://localhost/5", name: 'ella.jpg'}
      ],
      parents: [
        {
          createdAt: 1575059723257,
          updatedAt: 1575060947035,
          id: "5de1810b0b915e1654c4e7be",
          label: "Ella",
          fullName: "Sasquehanna Ella",
          images: [
            {fd: "http://localhost/11", name: '_cover.jpg'},
            {fd: "http://localhost/12", name: 'ella.jpg'}
          ],
        },
        {
          createdAt: 1575061565899,
          updatedAt: 1575061754382,
          id: "5de1883d0b915e1654c4e7d7",
          label: "Neron",
          fullName: "Zlato Dinastii Neron",
          images: [
            {fd: "http://localhost/14", name: '_cover.jpg'},
            {fd: "http://localhost/15", name: 'ella.jpg'}
          ]
        }
      ]
    },
    {
      name: 'Bazhen',
      images: [
        {fd: "http://localhost/0", name: '_cover.jpg'},
        {fd: "http://localhost/1", name: 'ella.jpg'}
      ]
    }
  ]
};


/**
 * Рекурсивная функция. обавляет свойство imagesSrc все объекты где есть свойство fd.
 * Св-во imagesSrc формируется из сроки fd.
  */


function sumSalaries(collection, options) {
  console.log('Inpput:::: ', collection);

  if (_.isArray(collection)) {
    for (let o of collection) {
      console.log('FOR:', o);
      if (_.isObject(o)) {
        console.log('ARR-2:', o);
        console.log('options:::: ' , options);
        o.fd ? o.src = url.resolve('http://poaleell.com', `/download/${options.collectionName}`) : '';
        console.log('Объект перед return::: ' , o);
        //if(o.src) return o;
        sumSalaries(o,options);
      } else {
        console.log('Else return::: ', o);
        return o;
      }
    }
  } else {
    let s = [];
    for (let o of Object.values(collection)) {
      console.log('else::: ', o);
      if(_.isArray(o)){
        let ret = sumSalaries(o,options);
        if(!_.isUndefined(ret) ) s.push(ret);
      }
      if(!_.isUndefined(o) ) s.push(o);
    }
    return s;
  }
}

let r = sumSalaries(kennel, {collectionName:'dog'});

console.log('***********************- kennel -****************************');
console.log('Kennel::: ', kennel);

console.log('***********************-0- r -****************************');
console.log(r);
console.log('***********************-1- r[0] -****************************');
console.log(r[0]);
console.log('***********************-2- r[0][0].images -****************************');
console.log(r[0][0].images);
console.log('***********************-1- r[1] -****************************');
console.log(r[1]);
console.log('***********************-2- r[1][1].images -****************************');
console.log(r[1][1].images);
console.log('***********************-1- r[1] -****************************');
console.log(r[1]);
console.log('***********************-2- r[1][1] -****************************');
console.log(r[1][1]);
// console.log('***********************-3-****************************');
// console.log(r[0][0].parents[0]);
