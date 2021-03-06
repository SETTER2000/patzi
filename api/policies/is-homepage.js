module.exports = async function (req, res, proceed) {

  if (sails.config.environment === 'development') {
    let isHomepage = false;
    let url = `${req.protocol}://${req.hostname}:${req.port}`;
    let url2 = `${req.protocol}://${req.hostname}`;
    isHomepage = (sails.config.custom.baseUrl === url || sails.config.custom.baseUrl === url2);
    return (isHomepage) ? proceed() : res.redirect('/');
  } else {
    proceed()
  }

};
