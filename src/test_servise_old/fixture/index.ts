const hosts: host[] = [{
  url: "localhost:3000",
  // tslint:disable-next-line:object-literal-sort-keys
  headers: { Authorization: "bearer 121231231" },
}];

const steps: scheme = {
  steps: [{
    name: "Тест соеденения",
    parallel: 1,
    // tslint:disable-next-line:object-literal-sort-keys
    delay: 1,
    count: 1,
    headers: { steps: "bearer 121231231" },
    scene: [{
      url: "/",
      // tslint:disable-next-line:object-literal-sort-keys
      method: "GET",
      headers: { scene: "bearer 121231231" },
      count: 1,
      parallel: 1,
      delay: 0,
    }],
  }],
};

export { steps, hosts };
