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


  for(let y =0; y<1000; y++){

    let nm = await sails.helpers.strings.random();
    nm = await User.create({
        emailAddress: `${nm}@mail.ru`,
        fullName: nm,
        password: await sails.helpers.passwords.hashPassword(sails.config.custom.passwordSuperAdmin),
        preferredLocale: 'en'
      }).fetch();

    await User.addToCollection(nm.id, 'groups', group2.id);
  }

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
