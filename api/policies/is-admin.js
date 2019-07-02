/**
 * is-super-admin
 *
 * A simple policy that blocks requests from non-super-admins.
 *
 * For more about how to use policies, see:
 *   https://sailsjs.com/config/policies
 *   https://sailsjs.com/docs/concepts/policies
 *   https://sailsjs.com/docs/concepts/policies/access-control-and-permissions
 */
module.exports = async function (req, res, proceed) {

  // First, check whether the request comes from a logged-in user.
  // > For more about where `req.me` comes from, check out this app's
  // > custom hook (`api/hooks/custom/index.js`).
  // Сначала проверяем, приходит ли запрос от вошедшего в систему пользователя.
  //> Подробнее о происхождении `req.me` можно узнать из этого приложения
  //> custom hook (`api / hooks / custom / index.js`).
  if (!req.me) {
    return res.unauthorized();
  }//•

  if (!req.me.isAdmin) {
    // return res.forbidden();
    return res.notFound();
  }//•
  // let user = await User.findOne({
  //   where: {id: req.me.id},
  //   select: ['fullName']
  // })
  //   .populate('groups');
  // // console.log('GROUPSSS: ', user);
  //
  // await _.each(user.groups, group => {
  //   req.me.isAdmin = (group.label === 'admin');
  //   // req.me[`is_${group.label}`] =  (group.label);
  // });
  //
  // // Then check that this user is a "super admin".
  // // Затем убедитесь, что этот пользователь является «супер-администратором».
  // if (!req.me.isAdmin) {
  //   // return res.forbidden();
  //   return res.notFound();
  // }//•
  // await User.update({id: req.me.id},{isAdmin:true});
  // IWMIH, у нас есть «админ».
  return proceed();

};
