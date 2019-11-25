
module.exports = async function (req, res, proceed) {
  let isUser = false;
  if (!req.me) {
    if (req.wantsJSON) {
      return res.forbidden('isUser: Вам не разрешено выполнять это действие #1.');
    }
    sails.log('isUser: Вам не разрешено выполнять это действие #2.');
    return res.redirect('/');
  }

  let foundUser = await User.findOne({id:req.me.id}).populate('groups');

  if (!foundUser) {
    if (req.wantsJSON) {
      return res.forbidden('isUser: Вам не разрешено выполнять это действие #3.');
    }
    return res.redirect('/');
  }

  isUser = (_.last(_.pluck(foundUser.groups, 'label')) === 'user');

  return (isUser) ? proceed() : res.redirect('/');

  // return proceed();

};
