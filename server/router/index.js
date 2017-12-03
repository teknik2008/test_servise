const Router = require('koa-router');
const router = new Router();
const fixture = require('../fixture')
const TestServise = require('../test_servise/')

router.get('/fixture', async (ctx) => {
  ctx.body = fixture
})

router.post('/start', async (ctx) => {
  let { hosts, scene, requests } = ctx.request.body;
  let testServise = new TestServise(hosts, scene, requests)
  testServise.emitter.on('response', (data) => {
    ctx.io.socket.emit('response', data)
  })
  testServise.emitter.on('timescene', (data) => {
    ctx.io.socket.emit('timescene', data)
  })
  ctx.body = fixture
})

module.exports = router;