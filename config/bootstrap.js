/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function () {

  // Import dependencies
  var path = require('path');

  // This bootstrap version indicates what version of fake data we're dealing with here.
  var HARD_CODED_DATA_VERSION = 4;

  // This path indicates where to store/look for the JSON file that tracks the "last run bootstrap info"
  // locally on this development computer (if we happen to be on a development computer).
  var bootstrapLastRunInfoPath = path.resolve(sails.config.appPath, '.tmp/bootstrap-version.json');

  // Whether or not to continue doing the stuff in this file (i.e. wiping and regenerating data)
  // depends on some factors:
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  // If the hard-coded data version has been incremented, or we're being forced
  // (i.e. `--drop` or `--environment=test` was set), then run the meat of this
  // bootstrap script to wipe all existing data and rebuild hard-coded data.
  if (sails.config.models.migrate !== 'drop' && sails.config.environment !== 'test') {
    // If this is _actually_ a production environment (real or simulated), or we have
    // `migrate: safe` enabled, then prevent accidentally removing all data!
    if (process.env.NODE_ENV === 'production' || sails.config.models.migrate === 'safe') {
      sails.log('Так как мы работаем с миграцией: \'safe\' and/or NODE_ENV=production (in the "' + sails.config.environment + '" Sails, если быть точным), пропуская оставшуюся часть начальной загрузки, чтобы избежать потери данных...');
      return;
    }//•

    // Compare bootstrap version from code base to the version that was last run
    var lastRunBootstrapInfo = await sails.helpers.fs.readJson(bootstrapLastRunInfoPath)
      .tolerate('doesNotExist');// (it's ok if the file doesn't exist yet-- just keep going.)

    if (lastRunBootstrapInfo && lastRunBootstrapInfo.lastRunVersion === HARD_CODED_DATA_VERSION) {
      sails.log('Работает v' + HARD_CODED_DATA_VERSION + ' файла начальной загрузки (bootstrap.js)...  (because it\'s already been run)');
      sails.log('(последний запуск на этом компьютере: @ ' + (new Date(lastRunBootstrapInfo.lastRunAt)) + ')');
      return;
    }//•

    sails.log('Запуск v' + HARD_CODED_DATA_VERSION + ' bootstrap script...  (' + (lastRunBootstrapInfo ? 'before this, the last time the bootstrap ran on this computer was for v' + lastRunBootstrapInfo.lastRunVersion + ' @ ' + (new Date(lastRunBootstrapInfo.lastRunAt)) : 'looks like this is the first time the bootstrap has run on this computer') + ')');
  }
  else {
    sails.log('Запуск скрипта начальной загрузки, поскольку он был вынужден ...  (either `--drop` or `--environment=test` использовался)');
  }


  // Since the hard-coded data version has been incremented, and we're running in
  // a "throwaway data" environment, delete all records from all models.
  for (let identity in sails.models) {
    await sails.models[identity].destroy({});
  }//∞
  // By convention, this is a good place to set up fake data during development.
  // По общему мнению, это хорошее место для настройки поддельных данных во время разработки.
  let ryanDahl = await User.create(
    {
      emailAddress: sails.config.custom.friendEmailAddress,
      fullName: 'Ryan Dahl',
      password: await sails.helpers.passwords.hashPassword(sails.config.custom.passwordSuperAdmin),
      preferredLocale: 'en'
    }).fetch();

  let alexFox = await User.create({
    emailAddress: sails.config.custom.internalEmailAddress,
    fullName: 'Alex Fox',
    isSuperAdmin: true,
    preferredLocale: 'en',
    password: await sails.helpers.passwords.hashPassword(sails.config.custom.passwordSuperAdmin),
    gravatar: await sails.helpers.gravatar.getAvatarUrl(sails.config.custom.internalEmailAddress)
  }).fetch();

  let adam = await User.create({
    emailAddress: 'administrator.f@mail.ru',
    fullName: 'Poale Ell Adam',
    // preferredLocale: 'en',
    password: await sails.helpers.passwords.hashPassword(sails.config.custom.passwordSuperAdmin),
    gravatar: await sails.helpers.gravatar.getAvatarUrl(sails.config.custom.internalEmailAddress)
  }).fetch();

  let bob = await User.create({
    emailAddress: 'kremotory@mail.ru',
    fullName: 'Bob Scott',
    isSuperAdmin: true,
    // preferredLocale: 'en',
    password: await sails.helpers.passwords.hashPassword(sails.config.custom.passwordSuperAdmin),
    gravatar: await sails.helpers.gravatar.getAvatarUrl(sails.config.custom.internalEmailAddress)
  }).fetch();

  // Добавить Райана Даля , как одного из друзей Алекса Фокса
  // и добавить Алекса Фокса в друзья Райану Далю
  await User.addToCollection(alexFox.id, 'friends', ryanDahl.id);
  await User.addToCollection(ryanDahl.id, 'friends', alexFox.id);

  // Создаём группу пользователей admin

  let group2 = await Group.create({
    label: 'user',
    whoCreate: alexFox.id,
    subtitle: 'user - группа по умолчанию для всех зарегистрированных и подтвердивших свой email пользователей. Чтение. Комментарии.'
  }).fetch();
  let group3 = await Group.create({label: 'owner', whoCreate: alexFox.id}).fetch();
  let group4 = await Group.create({label: 'breeder', whoCreate: alexFox.id}).fetch();
  let group = await Group.create({
    label: 'admin',
    whoCreate: alexFox.id,
    subtitle: 'admin - самая привилегированная группа пользователей сайта. Права на управление сайтом. Удаление, Изменение, Добавление, Обновление.',
  }).fetch();
  // Добавить пользователя alexFox.id в группу 'admin'
  await User.addToCollection(alexFox.id, 'groups', group.id);


  let continentEurasia = await Continent.create({
    label: 'Eurasia',
    whoCreate: alexFox.id,
    description: 'Евра́зия — самый большой материк на Земле, и единственный, омываемый четырьмя океанами: на юге — Индийским, на севере — Северным Ледовитым, на западе — Атлантическим, на востоке — Тихим. Континент расположен в Северном полушарии между 9° з. д. и 169° з. д., при этом часть островов Евразии находится в Южном полушарии.'
  }).fetch();


  let continentSouthAmerica = await Continent.create({
    label: 'South America',
    whoCreate: alexFox.id,
    description: 'Ю́жная Аме́рика — один из шести материков планеты Земля, расположенный на юге Западного полушария. Омывается на западе Тихим океаном, на востоке — Атлантическим, на севере — Карибским морем, которое является естественным рубежом между двумя Америками. Панамский перешеек на северо-западе материка соединяет Южную Америку с Северной.'
  }).fetch();


  let continentNorthAmerica = await Continent.create({
    label: 'North America',
    whoCreate: alexFox.id,
    description: 'Се́верная Аме́рика (англ. North America, фр. Amérique du Nord, исп. América del Norte, Norteamérica, аст. Ixachitlān Mictlāmpa) — один из шести материков планеты Земля, расположенный на севере Западного полушария Земли.'
  }).fetch();


  let continentAfrica = await Continent.create({
    label: 'Africa',
    whoCreate: alexFox.id,
    description: 'А́фрика — второй по площади материк после Евразии, омывается Средиземным морем с севера, Красным — с северо-востока, Атлантическим океаном с запада и Индийским океаном с востока и юга. Африкой называется также часть света, состоящая из материка Африка и прилегающих островов. Площадь Африки без островов составляет 29,2 млн км², с островами — около 30,3 млн км²[3], покрывая, таким образом, 6 % общей площади поверхности Земли и 20,4 % поверхности суши. На территории Африки расположено 55 государств.'
  }).fetch();


  let continentAustralia = await Continent.create({
    label: 'Australia',
    whoCreate: alexFox.id,
    description: 'Австра́лия[2][3] (от лат. australis — «южный») — континент, расположенный в Восточном и Южном полушариях Земли. Вся территория материка является основной частью государства Австралия. Материк входит в часть света Австралия и Океания. Самый маленький и сухой материк.'
  }).fetch();


  // let country = await Country.create({
  //   label: 'Russia',
  //   whoCreate: alexFox.id,
  //   region: continentEurasia.id,
  //   description: 'Росси́я, официально также Росси́йская Федера́ция[e] (РФ[f]) — государство в Восточной Европе и Северной Азии. Территория России в рамках её конституционного устройства[c] составляет 17 125 191[6] км²; население страны (в пределах её заявленной территории[c]) составляет 146 781 095[7] чел. (2019). Занимает первое место в мире по территории, шестое — по объёму ВВП по ППС и девятое — по численности населения.'
  // }).fetch();

  let arrCountryEurasia = [
    'Абхазия',
    'Австрия',
    'Азербайджан',
    'Албания',
    'Андорра',
    'Армения',
    'Афганистан',
    'Бангладеш',
    'Бахрейн',
    'Белоруссия',
    'Бельгия',
    'Болгария',
    'Босния и Герцеговина',
    'Бруней',
    'Бутан',
    'Ватикан',
    'Великобритания',
    'Венгрия',
    'Восточный Тимор',
    'Вьетнам',
    'Германия',
    'Греция',
    'Грузия',
    'Дания',
    'ДНР',
    'Египет',
    'Израиль',
    'Индия',
    'Индонезия',
    'Иордания',
    'Ирак',
    'Иран',
    'Ирландия',
    'Исландия',
    'Испания',
    'Италия',
    'Йемен',
    'Казахстан',
    'Камбоджа',
    'Катар',
    'Кипр',
    'Киргизия',
    'Китай',
    'Китайская Республика',
    'КНДР',
    'Кувейт',
    'Лаос',
    'Латвия',
    'Ливан',
    'Литва',
    'Лихтенштейн',
    'ЛНР',
    'Люксембург',
    'Малайзия',
    'Мальдивы',
    'Мальта',
    'Молдавия',
    'Монако',
    'Монголия',
    'Мьянма',
    'НКР',
    'Непал',
    'Нидерланды',
    'Норвегия',
    'ОАЭ',
    'Оман',
    'Пакистан',
    'Государство Палестина',
    'Польша',
    'Португалия',
    'Приднестровье',
    'Республика Корея',
    'Республика Косово',
    'Россия',
    'Северная Македония',
    'Румыния',
    'Сан-Марино',
    'Саудовская Аравия',
    'Северный Кипр',
    'Сербия',
    'Сингапур',
    'Сирия',
    'Словакия',
    'Словения',
    'Таджикистан',
    'Таиланд',
    'Туркмения',
    'Турция',
    'Узбекистан',
    'Украина',
    'Филиппины',
    'Финляндия',
    'Франция',
    'Хорватия',
    'Черногория',
    'Чехия',
    'Швейцария',
    'Швеция',
    'Шри-Ланка',
    'Эстония',
    'Южная Осетия',
    'Япония'];
  let arrCountrySouthAmerica = ['Аргентина',
    'Боливия',
    'Бразилия',
    'Венесуэла',
    'Гайана',
    'Колумбия',
    'Парагвай',
    'Перу',
    'Суринам',
    'Уругвай',
    'Чили',
    'Эквадор',
    'Фолклендские (Мальвинские) острова',
    'Французская Гвиана',
    'Южная Георгия и Южные Сандвичевы острова'];
  let arrCountryNorthAmerica = ['Антигуа и Барбуда',
    'Багамские Острова',
    'Барбадос',
    'Белиз',
    'Гаити',
    'Гватемала',
    'Гондурас',
    'Гренада',
    'Доминика',
    'Доминиканская Республика',
    'Канада',
    'Коста-Рика',
    'Куба',
    'Мексика',
    'Никарагуа',
    'Панама',
    'Сальвадор',
    'Сент-Люсия',
    'Сент-Винсент и Гренадины',
    'Сент-Китс и Невис',
    'Соединённые Штаты Америки',
    'Тринидад и Тобаго',
    'Ямайка'];
  let arrCountryAfrica = ['Алжир',
    'Ангола',
    'Бенин',
    'Ботсвана',
    'Буркина-Фас',
    'Бурунди',
    'Габон',
    'Гамбия',
    'Гана',
    'Гвинея',
    'Гвинея-Бисау',
    'Джибути',
    'Египе',
    'Замбия',
    'Зимбабве',
    'Кабо-Верде',
    'Камерун',
    'Канарские остров',
    'Кения',
    'Коморские Острова',
    'Демократическая Республика Конго',
    'Республика Конг',
    'Кот-д’Ивуар',
    'Лесото',
    'Либерия',
    'Ливия',
    'Маврикий',
    'Мавритания',
    'Мадагаскар',
    'Мадейр',
    'Майотт',
    'Малави',
    'Мали',
    'Марокко',
    'Мелиль',
    'Мозамбик',
    'Намибия',
    'Нигер',
    'Нигерия',
    'Реюньо',
    'Руанда',
    'Сан-Томе и Принсипи',
    'Сахарская Арабская Демократическая Республик',
    'Свазиленд',
    'Острова Святой Елены, Вознесения и Тристан-да-Кунь',
    'Сейшельские острова',
    'Сенегал',
    'Сеут',
    'Сомали',
    'Сомалиленд',
    'Судан',
    'Сьерра-Леоне',
    'Танзания',
    'Того',
    'Тунис',
    'Уганда',
    'ЦАР',
    'Чад',
    'Экваториальная Гвинея',
    'Эритрея',
    'Эфиопия',
    'Южно-Африканская Республик',
    'Южный Судан'];
  let arrCountryAustralia = ['Австралийская столичная территория',
    'Виктория',
    'Западная Австралия',
    'Квинсленд',
    'Новый Южный Уэльс',
    'Северная территория',
    'Тасмания',
    'Южная Австралия'
  ];

  arrCountryEurasia = await arrCountryEurasia.map(country => {
    return {
      label: country,
      whoCreate: alexFox.id,
      region: continentEurasia.id,
      description: 'Описание отсутствует.'
    }
  });

  arrCountrySouthAmerica = await arrCountrySouthAmerica.map(country => {
    return {
      label: country,
      whoCreate: alexFox.id,
      region: continentSouthAmerica.id,
      description: 'Описание отсутствует.'
    }
  });

  arrCountryNorthAmerica = await arrCountryNorthAmerica.map(country => {
    return {
      label: country,
      whoCreate: alexFox.id,
      region: continentNorthAmerica.id,
      description: 'Описание отсутствует.'
    }
  });

  arrCountryAfrica = await arrCountryAfrica.map(country => {
    return {
      label: country,
      whoCreate: alexFox.id,
      region: continentAfrica.id,
      description: 'Описание отсутствует.'
    }
  });

  arrCountryAustralia = await arrCountryAustralia.map(country => {
    return {
      label: country,
      whoCreate: alexFox.id,
      region: continentAustralia.id,
      description: 'Описание отсутствует.'
    }
  });



  let resCountryEurasia = await Country.createEach(arrCountryEurasia).fetch();
  let resCountrySouthAmerica = await Country.createEach(arrCountrySouthAmerica).fetch();
  let resCountryNorthAmerica = await Country.createEach(arrCountryNorthAmerica).fetch();
  let resCountryAfrica = await Country.createEach(arrCountryAfrica).fetch();
  let resCountryAustralia = await Country.createEach(arrCountryAustralia).fetch();
  // console.log('resCountryEurasia: ', resCountryEurasia);


  let ar = [];
  for (let y = 0; y < 20; y++) {
    let nm = await sails.helpers.strings.random('alphanumeric', 6);
    ar.push({
      emailAddress: `${nm}@mail.ru`,
      fullName: nm,
      kennelAddress: nm,
      phone: await sails.helpers.strings.random('alphanumeric', 5),
      password: await sails.helpers.passwords.hashPassword(sails.config.custom.passwordSuperAdmin),
      preferredLocale: 'en'
    });
  }
  let createdUsers = await User.createEach(ar).fetch();
  sails.log(`Created ${createdUsers.length} user${createdUsers.length === 1 ? '' : 's'}.`);

  // for (let y = 0; y < 100; y++) {
  //
  //   let nm = await sails.helpers.strings.random("alphanumeric", 6);
  //   nm = await User.create({
  //     emailAddress: `${nm}@mail.ru`,
  //     fullName: nm,
  //     kennelAddress: nm,
  //     phone: await sails.helpers.strings.random("alphanumeric", 6),
  //     password: await sails.helpers.passwords.hashPassword(sails.config.custom.passwordSuperAdmin),
  //     preferredLocale: 'en'
  //   }).fetch();
  //
  //   await User.addToCollection(nm.id, 'groups', group2.id);
  // }

  // В БУДУЩЕМ: Решить что с эти делать
  // Create some things
  /* await Thing.createEach([
    {owner: ryanDahl.id, label: 'Сладкая дрель'},
    {owner: ryanDahl.id, label: 'Капкан на куницу'},
    {owner: ryanDahl.id, label: 'Моторная лодка'},
    {owner: alexFox.id, label: 'Красный рассвет'}
  ]).fetch(); */

  /*  await Litter.createEach([
      {owner: alexFox.id,label: 'a', born: new Date(2016, 3, 10)},
      {owner: alexFox.id,label: 'b', born: new Date(2017, 10, 3)},
      {owner: ryanDahl.id,label: 'c', born: new Date(2008, 2, 15)},
      {owner: ryanDahl.id,label: 'd', born: new Date(2010, 5, 21)}]).fetch();*/


  // Save new bootstrap version
  await sails.helpers.fs.writeJson.with({
    destination: bootstrapLastRunInfoPath,
    json: {
      lastRunVersion: HARD_CODED_DATA_VERSION,
      lastRunAt: Date.now()
    },
    force: true
  })
    .tolerate((err) => {
      sails.log.warn('По какой-то причине не удалось записать загрузочную версию файла .json. Это может быть результатом проблемы с настроенными вами путями или, если вы работаете, ограничения хостинг-провайдера, связанного с `pwd`. В качестве обходного пути попробуйте обновить app.js, чтобы явно передать в `appPath: __dirname` вместо того, чтобы полагаться на` chdir`. Текущий sails.config.appPath: `' + sails.config.appPath + '`.  Полная информация об ошибке: ' + err.stack + '\n\n(Продолжим в любом случае в этот раз...)');
    });

};
