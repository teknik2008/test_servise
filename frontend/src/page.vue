<template>
  <v-container grid-list-md text-xs-center>
    <host-item/>  
    <h1>Хосты для запроса</h1> 
    <v-expansion-panel expand>
      <v-expansion-panel-content v-for="host in hosts" :key="host.host_id">
        <div slot="header">{{host.name}}
          <!-- <div> <v-checkbox light  hide-details
     v-model="host.enable"
     :label='host.name'
    ></v-checkbox>
          </div> -->
          </div>
        <v-card>
           <v-layout row wrap>
             <v-flex xs12 > 
               <v-text-field class="px-10" v-model="host.url" type="text" label="Адрес ресурса"></v-text-field>
             </v-flex>
             </v-layout>
          <!-- <v-layout row wrap v-for="(value,key)  in host.headers" :key="key">
             <v-flex xs6 >
              <v-card  color="grey lighten-4">
                <v-card-text class="px-10">{{key}}</v-card-text>
              </v-card>
            </v-flex>
             <v-flex xs6 >
              <v-card  color="grey lighten-4">
                <v-card-text class="px-10">{{value}}</v-card-text>
              </v-card>
            </v-flex>
           </v-layout> -->
             </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <h1 color="pink">Коллекция запросов</h1> 
    <v-expansion-panel expand>
      <v-expansion-panel-content  :class="colors.titlePanel" v-for="scene_item in scene" :key="scene_item.scene_id">
        <div slot="header" class=" colors-text-write" >
          <div>{{scene_item.name}}</div>
        </div>
        <v-card>
          <v-layout row wrap>
            <v-flex xs12 sm3 class="ml-4">
              <v-text-field class="px-10" v-model="scene_item.parallel" type="text" label="Кол-во параллельных запросов"></v-text-field>
            </v-flex>
            <v-flex xs12 sm3 >
              <v-text-field class="px-10" v-model="scene_item.count" type="text" label="Количество повторов"></v-text-field>
            </v-flex>
            <v-flex xs12 sm3 v-show="scene_item.count>1">
              <v-text-field class="px-10" v-model="scene_item.delay" type="text" label="Задержка между повторами, мс"></v-text-field>
            </v-flex>
            <v-flex xs12 v-show="scene_item.count>1">
              <h3 class="ml-4 mr-4 mb-1">Заголовки коллекции</h3>
            </v-flex>
            <v-expansion-panel class="ml-4 mr-4 mb-1">
              <v-expansion-panel-content :class="colors.titlePanel" >
                <div slot="header" >
                  Заголовки
                </div>
                <v-card>
                  <v-flex xs12  v-for="(value,key)  in scene_item.headers" :key="key">
                    <v-layout row wrap>
                      <v-flex xs6 sm6>
                        <v-card  color="grey lighten-4">
                          <v-card-text class="px-10">{{key}}</v-card-text>
                        </v-card>
                      </v-flex>
                      <v-flex xs6 sm6>
                        <v-card  color="grey lighten-4">
                          <v-card-text class="px-10">{{value}}</v-card-text>
                        </v-card>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <h3 class="ml-4 mr-4 mb-1">Запросы</h3>
            <v-expansion-panel class="ml-4 mr-4 mb-1" >
              <v-expansion-panel-content :class="colors.titlePanel"  v-for="request in requests(scene_item.scene_id)" :key="request.scene_id">
                <div slot="header">
                <div>{{request.name}}</div>
              </div>
                <v-card>
                  <v-layout row wrap>
                    <v-flex xs12 sm12 class="ml-4">
                      <v-text-field class="px-10" v-model="request.path" type="text" label="Путь запроса"></v-text-field>
                    </v-flex>
                    <v-flex xs3 class="ml-4">
                      <v-text-field class="px-10" v-model="request.parallel" type="text" label="Кол-во параллельных запросов"></v-text-field>
                    </v-flex>
                    <v-flex xs3  >
                      <v-text-field class="px-10" v-model="request.count" type="text" label="Количество повторов"></v-text-field>
                    </v-flex>
                    <v-flex xs3 v-show="request.count>1">
                      <v-text-field class="px-10" v-model="request.delay" type="text" label="Задержка между повторами, мс"></v-text-field>
                    </v-flex>
                    <v-expansion-panel class="ml-4 mr-4 mb-1">
                      <v-expansion-panel-content>
                        <div slot="header">
                          Заголовки запроса
                        </div>
                        <v-card>
                          <v-flex xs12  v-for="(value,key)  in request.headers" :key="key">
                            <v-layout row wrap>
                              <v-flex xs6 sm6>
                                <v-card  color="grey lighten-4">
                                  <v-card-text class="px-10">{{key}}</v-card-text>
                                </v-card>
                              </v-flex>
                              <v-flex xs6 sm6>
                                <v-card  color="grey lighten-4">
                                  <v-card-text class="px-10">{{value}}</v-card-text>
                                </v-card>
                              </v-flex>
                            </v-layout>
                          </v-flex>
                        </v-card>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-layout>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-layout>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
    </v-flex>
     <h1 color="pink">Выполненые запросы</h1> 
    <my-response-table :hosts="hosts" :scene="scene" :requests="requests"></my-response-table>  
  </v-container>
</template>

<script>
import hostItem from "./components/hosts/host-item";
import myResponseTable from './my-response-table'
import store from "@/store";
export default {
  components: {
    hostItem,
    myResponseTable
  },
  name: "vk-basket",
  store,
  mounted(){
    let _this=this
    
    store.dispatch('getServerData').then(()=>{
      this.$forceUpdate()
      
    }).catch(console.error)
    // store.dispatch('getServerData').then(_this.$forceUpdate).catch(console.clear)
  },
  data() {
    return {
      hosts: this.$store.state.hosts,
      scene: this.$store.state.scene,
      requests: this.$store.getters.requests,
      item: {},
      colors:{
        titlePanel:"teal darken-1"
      }
    };
  }
};
</script>

<style>
.colors-text-write{
  color:#fff
}
</style>

