module.exports = async function (req, res, proceed) {
  let isHomepage = false;

  let url = `${req.protocol}://${req.hostname}:${req.port}`;
  let url2 = `${req.protocol}://${req.hostname}`;
  console.log('url2:: ' , url);
  console.log('url2:: ' , url2);
  isHomepage = (sails.config.custom.baseUrl === url || sails.config.custom.baseUrl === url2);

  return (isHomepage) ? proceed() : res.redirect('/');

};
