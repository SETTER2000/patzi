module.exports = async function (req, res, proceed) {
  let isHomepage = false;

  let url = `${req.protocol}://${req.hostname}:${req.port}`;
  isHomepage = (sails.config.custom.baseUrl === url);

  return (isHomepage) ? proceed() : res.redirect('/');

};
