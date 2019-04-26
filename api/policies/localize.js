module.exports = async function(req, res, proceed) {
  // If no user is logged in, continue with the default locale.
  // Если ни один пользователь не вошел в систему, перейдите к локали по умолчанию.
  // console.log('111-GOOOOOOO',req);
  if (!req.session.userId) {return proceed();}
  var me = await User.findOne({ id: req.session.userId });
  if (me.preferredLocale) {
    req.setLocale(me.preferredLocale);
  }

  // console.log('SET LOCAL:',  req.getLocale());
  // Load the user from the database
  // Загрузка пользователя из базы данных
  // User.findOne(req.session.userId).exec(function(err, user) {
  //   if (err) {return res.serverError(err);}
  //   // Set the locale to the user's preference
  //   // Установите локаль в соответствии с предпочтениями пользователя
  //   req.setLocale('ru');
  //   // req.setLocale(user.preferredLocale);
  // });
  // console.log('SET LOCAL-2:', req.getLocale());
  return proceed();
};
