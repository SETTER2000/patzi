/**
 * 403 (Forbidden) Handler
 *
 * Usage:
 * return res.forbidden();
 * return res.forbidden(err);
 * return res.forbidden(err, 'some/specific/forbidden/view');
 *
 * e.g.:
 * ```
 * return res.forbidden('Access denied.');
 * ```
 */

module.exports = function forbidden(data, options) {

  // Get access to `req`, `res`, & `sails`
  const req = this.req;
  const res = this.res;
  const sails = req._sails;

  // Set status code
  res.status(403);

  // Log error to console
  if (data !== undefined) {
    sails.log.verbose('Sending 403 ("Forbidden") response: \n', data);
  }
  else {
    sails.log.verbose('Sending 403 ("Forbidden") response');
  }

  // Only include errors in response if application environment
  // is not set to 'production'.  In production, we shouldn't
  // send back any identifying information about errors.
  // Включить в ответ только ошибки, если среда приложения
  // не установлен на «производство». В производстве мы не должны
  // отправить обратно любую идентифицирующую информацию об ошибках.
  if (sails.config.environment === 'production' && sails.config.keepResponseErrors !== true) {
    data = undefined;
  }

  // If the user-agent wants JSON, always respond with JSON
  // If views are disabled, revert to json
  // Если пользовательский агент хочет JSON, всегда отвечайте JSON
  // Если представления отключены, вернуться к json
  if (req.wantsJSON || sails.config.hooks.views === false) {
    return res.json(data);
  }

  // If second argument is a string, we take that to mean it refers to a view.
  // If it was omitted, use an empty object (`{}`)
  // Если вторым аргументом является строка, мы понимаем, что она относится к представлению.
  // Если это было опущено, используйте пустой объект (`{}`)
  options = (typeof options === 'string') ? {view: options} : options || {};

  // Attempt to prettify data for views, if it's a non-error object
  // Попытка предварительно подтвердить данные для представлений, если это объект без ошибок
  const viewData = data;
  if (!(viewData instanceof Error) && 'object' === typeof viewData) {
    try {
      viewData = require('util').inspect(data, {depth: null});
    } catch (e) {
      viewData = undefined;
    }
  }

  // If a view was provided in options, serve it.
  // Otherwise try to guess an appropriate view, or if that doesn't
  // work, just send JSON.
  // Если представление было предоставлено в настройках, обслуживаем его.
  // В противном случае попробуйте угадать подходящее представление, или если это не так
  // работа, просто отправьте JSON.
  if (options.view) {
    return res.view(options.view, {data: viewData, title: 'Forbidden'});
  }

  // If no second argument provided, try to serve the default view,
  // but fall back to sending JSON(P) if any errors occur.
  // Если второй аргумент не предоставлен, попробуйте использовать представление по умолчанию,
  // но вернемся к отправке JSON (P), если возникнут какие-либо ошибки.
  else {
    return res.view('403', {data: viewData, title: 'Forbidden'}, (err, html) => {

      // If a view error occured, fall back to JSON(P).
      if (err) {
        //
        // Additionally:
        // • If the view was missing, ignore the error but provide a verbose log.
        if (err.code === 'E_VIEW_FAILED') {
          sails.log.verbose('res.forbidden() :: Could not locate view for error page (sending JSON instead).  Details: ', err);
        }
        // Otherwise, if this was a more serious error, log to the console with the details.
        else {
          sails.log.warn('res.forbidden() :: When attempting to render error page view, an error occured (sending JSON instead).  Details: ', err);
        }
        return res.json(data);
      }

      return res.send(html);
    });
  }

};

