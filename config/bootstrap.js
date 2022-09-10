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
  var moment = require('moment');


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
    var lastRunBootstrapInfo = await sails.helpers.fs.readJson(bootstrapLastRunInfoPath).tolerate('doesNotExist');// (it's ok if the file doesn't exist yet-- just keep going.)

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

  for (let identity in sails.models) {
    await sails.models[identity].destroy({});
  }//∞



  let alexFox = await User.create({
    emailAddress: sails.config.custom.internalEmailAddress,
    fullName: 'Alex Fox',
    fullNameEn: 'Alex Fox',
    isAdmin: false,
    defaultIcon:'gravatar',
    isSuperAdmin: true,
    preferredLocale: 'en',
    password: await sails.helpers.passwords.hashPassword(sails.config.custom.passwordSuperAdmin),
    gravatar: await sails.helpers.gravatar.getAvatarUrl(sails.config.custom.internalEmailAddress)
  }).fetch();

  let star = await User.create({
    emailAddress: 'vasef@mail.ru',
    fullName: 'Ольга Петрова',
    fullNameEn:await sails.helpers.translitWord.with({str: 'Ольга Петрова'}) ,
    isAdmin: false,
    isSuperAdmin: false,
    preferredLocale: 'ru',
    avatar:'https://d2e0ab19zxiehc.cloudfront.net/avatar_olga.jpg',
    password: await sails.helpers.passwords.hashPassword(sails.config.custom.passwordSuperAdmin),
    gravatar: await sails.helpers.gravatar.getAvatarUrl('vasef@mail.ru')
  }).fetch();


  let elena_sova = await User.create({
    emailAddress: 'elena_sova@poaleell.com',
    fullName: 'Елена Сова',
    fullNameEn:await sails.helpers.translitWord.with({str: 'Елена Сова'}) ,
    isAdmin: false,
    preferredLocale: 'ru',
    avatar:'https://d2e0ab19zxiehc.cloudfront.net/sova.jpg',
    password: await sails.helpers.passwords.hashPassword(sails.config.custom.passwordSuperAdmin)
  }).fetch();


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
  await User.addToCollection(star.id, 'groups', [group2.id,group3.id,group4.id,]);
  await User.addToCollection(elena_sova.id, 'groups', [group2.id,group3.id,group4.id,]);



  let kennelsArr = [
    {
      label: `Sasquehanna`,
      rightName: true,
      dateCreate: '2010-09-13T00:00:00+04:00',
      registerNumber: '000000',
      whoCreate: alexFox.id,
      continent: 1,
      country: 1,
      region: 1000001,
    },
    {
      label: `Poale Ell`,
      rightName: true,
      dateCreate: '2010-09-13T00:00:00+04:00',
      registerNumber: '000000',
      whoCreate: alexFox.id,
      continent: 1,
      country: 1,
      region: 1000001,
    },
    {
      label: `Alfa Laval`,
      rightName: true,
      dateCreate: '2010-09-13T00:00:00+04:00',
      registerNumber: '000000',
      whoCreate: alexFox.id,
      continent: 1,
      country: 1,
      region: 1000001,
    },
    {
      label: `Olegro Katrin`,
      rightName: true,
      dateCreate: '2010-09-13T00:00:00+04:00',
      registerNumber: '000000',
      whoCreate: alexFox.id,
      continent: 1,
      country: 1,
      region: 1000001,
    },
    {
      label: 'Zlato Dinastii',
      rightName: true,
      dateCreate: '2010-09-13T00:00:00+04:00',
      registerNumber: '000000',
      whoCreate: alexFox.id,
      continent: 1,
      country: 1,
      region: 1000001,
    },

  ];
  let createdKennels = await Kennel.createEach(kennelsArr).fetch();
  sails.log(`Created ${createdKennels.length} kennel${createdKennels.length === 1 ? '' : 's'}.`);
  const dogsArr = [
    {
      label: `Adam`,
      gender: 'sire',
      letter:'A',
      sale:false,
      see:true,
      dateBirth:await sails.helpers.dateConverter('"2016-04-10T20:35:00.000Z"'),
      kennel: 'Poale Ell'
    },
    {
      label: `Ella`,
      gender: 'dam',
      letter:'E',
      sale:false,
      see:true,
      dateBirth: await sails.helpers.dateConverter('"2013-07-08T08:00:00.000Z"'),
      kennel: 'Sasquehanna'
    },
    {
      label: `De Lux Supernova`,
      gender: 'sire',
      letter:'D',
      sale:false,
      see:true,
      dateBirth: await sails.helpers.dateConverter('"2015-12-09T08:00:00.000Z"'),
      kennel: 'Alfa Laval'
    },
    {
      label: `Naruto`,
      gender: 'sire',
      letter:'N',
      sale:false,
      see:true,
      dateBirth: await sails.helpers.dateConverter('"2015-09-25T09:00:00.000Z"'),
      kennel: 'Olegro Katrin'
    },
    {
      label: `Neron`,
      gender: 'sire',
      letter:'N',
      winner:true,
      sale:false,
      see:true,
      dateBirth: await sails.helpers.dateConverter('"2011-03-02T09:00:00.000Z"'),
      kennel: 'Zlato Dinastii'
    },
  ];

 dogsArr.map( dog => {
    dog.fullName=  `${dog.kennel} ${dog.label}`;
   dog.kennel = createdKennels.find(kennel => kennel.label === dog.kennel).id;
    let label = _.startCase(dog.label.toString().toLowerCase()).replace(/Fci\b/g, '(FCI)');
  });


  let createdDogs = await Dog.createEach(dogsArr).fetch();
  sails.log(`Created ${createdDogs.length} dog${createdDogs.length === 1 ? '' : 's'}.`);

  let poaleEll = await Kennel.findOne({label:'Poale Ell'});
  let userKennels =  await User.addToCollection(star.id, 'kennels', poaleEll.id);

  sails.log(`Created  ${userKennels} userKennels${userKennels === 1 ? '' : 's'}.`);

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
