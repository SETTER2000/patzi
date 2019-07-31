
module.exports = async function (req, res, proceed) {
  let isUser = false;
  let isOwner = false;
  let isBreeder = false;
  let isAdmin = false;

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
  isOwner = (_.last(_.pluck(foundUser.groups, 'label')) === 'owner');
  isBreeder = (_.last(_.pluck(foundUser.groups, 'label')) === 'breeder');
  isAdmin = (_.last(_.pluck(foundUser.groups, 'label')) === 'admin');

  return (isUser || isOwner || isBreeder || isAdmin) ? proceed() : res.redirect('/');

  // return proceed();

};
