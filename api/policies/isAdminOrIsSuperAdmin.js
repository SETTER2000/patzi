module.exports = function isAdminOrIsSuperAdmin(req, res, next) {

    if (!req.me) {
        if (req.wantsJSON) {
            return res.forbidden('isAdminOrKadr: Вам не разрешено выполнять это действие.');
        }
        sails.log('isAdminOrKadr: Вам не разрешено выполнять это действие.');
        return res.redirect('/');
    }

    User.findOne(req.me).exec(function (err, foundUser) {

        if (err) return res.negotiate(err);

        if (!foundUser) {
            if (req.wantsJSON) {
                return res.forbidden('isAdminOrKadr: Вам не разрешено выполнять это действие.');
            }
            return res.redirect('/');
        }

        if (foundUser.isAdmin || foundUser.isSuperAdmin) {
            return next();
        } else {
            if (req.wantsJSON) {
                return res.forbidden('isAdminOrKadr: Вам не разрешено выполнять это действие.');
            }
            return res.redirect('/');
        }

    });
};
