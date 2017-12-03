const busboy = require('busboy-promise');

module.exports = () => {
  return async (ctx, next) => {
    // the body isn't multipart, so busboy can't parse it
    if (!ctx.request.is('multipart/*')) {
      return await next();
    }

    let parts = await busboy(ctx.req, {
      autoFields: true
    });
    ctx.request.body=ctx.request.body||{}
    for (let name in parts.fields) {
      let field = parts.fields[name];
      ctx.request.body[name] = field.value;
    }

    for (let name in parts.files) {
      let file = parts.files[name];
      ctx.request.files[name] = file.value;
    }
    await next()
  };
}