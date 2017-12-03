const requests = [{
    request_id: 1,
    scene_id: 1,
    path: '/platform?limit=99999',
    method: 'GET',
    name: 'Получение лидов',
    count: 1,
    parallel: 1,
    delay: 1000
  }, {
    scene_id: 1,
    request_id: 2,
    path: '/brand?skip=0&limit=999&sort=brand_id%20DESC&populate=api&stats=1',
    name: 'Получение фильтров',
    method: 'GET',
    count: 1,
    parallel: 1,
    delay: 1000
  }, {
    scene_id: 2,
    request_id: 3,
    path: '/123556',
    name: 'Получение фильтров',
    method: 'GET',
    count: 1,
    parallel: 1,
    delay: 1000
  }]

  module.exports=requests