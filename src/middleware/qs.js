const qs = require('qs');


function qsKoa(options) {
  return async function ctxQs(ctx, next) {
    let querystring = ctx.querystring;
    if (!querystring) return await next();
    let query = qs.parse(querystring, options)
    ctx.queryParams = query;
    await next();
  }
}

module.exports = qsKoa;