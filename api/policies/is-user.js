
module.exports = async function (req, res, proceed) {
  let isUser = false;
  if (!req.me) {
    if (req.wantsJSON) {
      return res.forbidden('isUser: Вам не разрешено выполнять это действие.');
    }
    sails.log('isUser: Вам не разрешено выполнять это действие.');
    return res.redirect('/');
  }

  let foundUser = await User.findOne(req.me).populate('groups');

  if (!foundUser) {
    if (req.wantsJSON) {
      return res.forbidden('isUser: Вам не разрешено выполнять это действие.');
    }
    return res.redirect('/');
  }

  isUser = (_.last(_.pluck(foundUser.groups, 'label')) === 'user');

  return (isUser) ? proceed() : res.redirect('/');

  // return proceed();

};
