module.exports = {


  friendlyName: 'Translit word',


  description: 'Транслитерация строк кириллицы.',


  inputs: {
    str: {
      type: 'string',
      description: 'Любая строка.'
    }
  },


  exits: {
    success: {
      description: 'All done.',
    },
  },


  fn: async function (inputs) {
    /**
     * Функция Вова - возвращает транслит без мягких и твёрдых знаков
     * @param string
     * @returns {string}
     */
    function vova(string, connector) {
      const a = {
        "Ё": "YO",
        "Й": "I",
        "Ц": "TS",
        "У": "U",
        "К": "K",
        "Е": "E",
        "Н": "N",
        "Г": "G",
        "Ш": "SH",
        "Щ": "SCH",
        "З": "Z",
        "Х": "H",
        "Ъ": "_",
        "ё": "yo",
        "й": "i",
        "ц": "ts",
        "у": "u",
        "к": "k",
        "е": "e",
        "н": "n",
        "г": "g",
        "ш": "sh",
        "щ": "sch",
        "з": "z",
        "х": "h",
        "ъ": "_",
        "Ф": "F",
        "Ы": "I",
        "В": "V",
        "А": "a",
        "П": "P",
        "Р": "R",
        "О": "O",
        "Л": "L",
        "Д": "D",
        "Ж": "ZH",
        "Э": "E",
        "ф": "f",
        "ы": "i",
        "в": "v",
        "а": "a",
        "п": "p",
        "р": "r",
        "о": "o",
        "л": "l",
        "д": "d",
        "ж": "zh",
        "э": "e",
        "Я": "Ya",
        "Ч": "CH",
        "С": "S",
        "М": "M",
        "И": "I",
        "Т": "T",
        "Ь": "'",
        "Б": "B",
        "Ю": "YU",
        "я": "ya",
        "ч": "ch",
        "с": "s",
        "м": "m",
        "и": "i",
        "т": "t",
        "ь": "'",
        "б": "b",
        "ю": "yu"
      };

      let arr = _.filter(string, function (v) {
        return /[^ьъ]/i.test(v);
      });

      return arr.join('').split(' ').map(function (word) {
        let y = word.split('').map(char => a[char] || char).join("");
        return y;
      }).join(" ");
    }

    // Регистрируем новую функцию vova в Lodash
    _.mixin({'vova': vova});

    console.log('VOVA: ', _.vova(inputs.str));

    return _.vova(inputs.str);

  }
};

