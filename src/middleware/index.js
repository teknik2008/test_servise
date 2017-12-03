

const static = require('koa-static');
const qs = require('./qs');
const body = require('koa-body');
const multipartForm = require('./multipart-form');
const router = require('../router')
const cors = require('koa-cors');
let config={
    // origin:'http://localhost:8082',
    MaxAge:10,
    credentials:true,
    allowHeaders:"Origin, X-Requested-With, Content-Type, Accept"
}

function init(app) {
    app.use(static('./dist', { gzip: true }));
    app.use(cors(config));
    app.use(body());
    app.use(multipartForm());
    app.use(qs());
    app.use(router.routes());
  }
  module.exports = init;