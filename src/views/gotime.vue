<template>
  <div class="gotime">
    <div class="carname">{{car}}</div>
    <div class="carnamelist">
      <el-row class="elcol" v-for="(item,index) in list" :key="index">
        <el-col class="textdate" :span="10">{{item.creattime}}</el-col>
        <el-col :span="8">
            <img class="imgg" :src="item.imgurl">
        </el-col>
        <el-col class="textdatea" :span="6">{{item.statu}}</el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import {findrecord} from '../request/access'
export default {
  name: "videorecording",
  data() {
    return {
      car: "",
      list: [
      ]
    };
  },
  components: {},
  created() {
    this.videodata();
  },
  methods: {
    videodata() {
      this.car = this.$route.params.data;
      console.log(this.car);
      if (this.car != undefined) {
        //发送请求
        findrecord(this.car).then(res=>{
          this.list=res.data.data
            console.log(res)
        })
      }

      // getmedialist(this.serial).then(res => {

      // this.list = res.data.data;

      //   });
    }
  },
  watch: {
    $route: "videodata"
  }
};
</script>

<style  scoped>
.gotime {
  width: 100%;
  height: 100vh;
  background: #ffffff;
}
.carname {
  height: 2.5rem;
  line-height: 2.5rem;
  width: 100%;
  text-align: center;
  border-bottom: 1px #8f8f8f solid;
}
.elcol {
  height: 6rem;
  
  border-bottom: 2px #dfdfdf solid;
}
.textdate {
  padding-left: 15px;
  line-height: 6rem;
  font-size: 14px;
}
.carnamelist{
 height: calc(100vh - 2.5rem);
 width: 100%;
 overflow: auto;
}
.imgg{
  max-height: 5rem;
  margin-top: 0.5rem;
}
.textdatea{
  
  line-height: 6rem;
   font-size: 14px;
   text-align: right;
   padding-right: 10px;
}
</style>