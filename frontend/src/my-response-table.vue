<template>
<div>
  <div class="table__overflow elevation-1">
  <table class="datatable table">
<thead>
   <tr>
      <th role="columnheader" scope="col" class="column text-xs-left"></th>
      <template v-for="host in hosts">
      <th role="columnheader" colspan=3 scope="col" class="column sortable active desc text-xs-center">{{host.name}}</th>
      </template>
   </tr>
   <tr>
      <th role="columnheader" scope="col" class="column text-xs-left">путь запроса</th>
      <template v-for="host in hosts">
        <th role="columnheader" scope="col" class="column sortable active desc text-xs-right">статус</th>
        <th role="columnheader" scope="col" class="column sortable text-xs-right">время</th>
        <th role="columnheader" scope="col" class="column sortable text-xs-right">размер</th>
      </template>
   </tr>
   <tr class="datatable__progress">
      <th colspan="100%" class="column"></th>
   </tr>
</thead>
   <template>
<tbody  v-for="scene_item in scene" :key="scene_item.scene_id">
  <tr>
    <td :colspan="1"  class="text-xs-left" :class="colors.titlePanel">{{scene_item.name}} </td>
    <template v-for="host in hosts">
      <td class="text-xs-center" :colspan="3" :class="colors.titlePanel">Время выполнения {{$store.getters.sceneResponseTime({scene_id:scene_item.scene_id,host_id:host.host_id}).time}} мс</td>
     </template>
  </tr>
  <tr v-for="request in get_requests(scene_item.scene_id)" :key="request.request_id">
    <td class="text-xs-left">
        <div>{{request.name}}</div>
      <div>{{request.path}}</div> 
      </td>
     <template v-for="host in hosts">
      <template v-for="response in [get_responses(`${scene_item.scene_id}_${host.host_id}_${request.request_id}`)]">
        <td class="text-xs-right">{{response.status}}</td>
        <td class="text-xs-right">{{response.time}}</td>
        <td class="text-xs-right">{{response.length}}</td>
    </template>
   </template>
  </tr>
</tbody>
   </template>
</table>
</div>
   <v-btn color="primary" @click="runTestResponse">Test</v-btn>
  </div>
</template>
<script>
import store from "@/store";
export default {
  props: ["hosts", "scene", "requests"],
  store,
  data() {
    return {
      colors: { titlePanel: "teal darken-1" },
      sort: {}
    };
  },
  methods: {
    get_requests(scene_id) {
      return this.$store.getters.requests(scene_id);
    },
    get_responses(key) {
      return this.$store.getters.responseIndex(key) || {};
    },
    runTestResponse() {
      let { hosts, scene } = this;
      let requests = store.state.requests;
      store.commit('clearResponse');
      this.$store.dispatch("startTest", { hosts, scene, requests });
    }
  }
};
</script>