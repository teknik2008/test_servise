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
  },  {
    scene_id: 2,
    request_id: 4,
    path: '/lead/filters',
    name: 'Получение фильтров',
    method: 'GET',
    count: 1,
    parallel: 1,
    delay: 1000
  }, {
    scene_id: 2,
    request_id: 5,
    path: '/affiliate?limit=10000',
    name: 'Получение афилейтов',
    method: 'GET',
    count: 1,
    parallel: 1,
    delay: 1000
  }, {
    scene_id: 2,
    request_id: 6,
    path: '/brand?limit=999999&stats=1',
    name: 'Получение брендов',
    method: 'GET',
    count: 1,
    parallel: 1,
    delay: 1000
  }, {
    scene_id: 2,
    request_id: 7,
    path: '/campaign?limit=999999',
    name: 'Получение компаний',
    method: 'GET',
    count: 1,
    parallel: 1,
    delay: 1000
  }, {
    scene_id: 2,
    request_id: 8,
    path: '/country?limit=999999&stats=1',
    name: 'Получение стран',
    method: 'GET',
    count: 1,
    parallel: 1,
    delay: 1000
  }, {
    scene_id: 2,
    request_id: 9,
    path: '/lead?skip=0&limit=15&sort=lead_id%20DESC&where%5BdeletedAt%5D=-1',
    name: 'Получение лидов',
    method: 'GET',
    count: 1,
    parallel: 1,
    delay: 1000
  }, {
    scene_id: 2,
    request_id: 10,
    path: '/bookmark?group=table-leads',
    name: 'Получение статистики',
    method: 'GET',
    count: 1,
    parallel: 1,
    delay: 1000
  }]

  module.exports=requests