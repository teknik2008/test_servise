"use strict";
const hosts = [{
  id:1,
  url: "http://google.com",
  name:"Гугл",
  headers: { Authorization: "bearer 121231231" },
},
{
  id:2,
  url: "http://epto.com",
  name:"Прочий сайт",
  headers: { Authorization: "bearer 121231231" },
}];



const steps = {
  steps: [{
    id:1,
    name: "Тест соеденения",
    parallel: 10,
    delay: 1,
    count: 1,
    headers: { steps: "bearer 121231231" },
    scene: [{
      id:1,
      path: "",
      name: "Получение лидов",
      method: "GET",
      headers: { scene: "bearer 121231231" },
      count: 1,
      parallel: 1,
      delay: 1000,
    },{
      id:2,
      path: "/123556",
      method: "GET",
      name: "Получение фильтров",
      headers: { scene: "bearer 121231231" },
      count: 1,
      parallel: 1,
      delay: 1000,
    }],
  }],
};

exports.steps = steps;
exports.hosts = hosts;