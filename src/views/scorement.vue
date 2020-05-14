<template>
  <div class="manage">
    <div class="top">车辆进出详情</div>
    <div class="list">
      <div v-if=" list ==''" class="carr">暂无车牌</div>
      <div>
        <van-cell
          v-for="(item,index) in list"
          :key="index"
          is-link
          @click="jump(item)"
        >{{item.plate}}</van-cell>
      </div>
    </div>

    <div class="divimg">
      
      <img   :class="[rotat?'fa fa-arrow-down go':'fa fa-arrow-down aa']"     @click="rotate" :src="url" />
    </div>
  </div>
</template>
<script>

import { getAllPlates } from "../request/access";
import { Form } from "vant";
export default {
  nmae: "tabbar",
  data() {
    return {
      list: [],
      rotat: false,
      num: 0,
      onpresscTime: 0,
      url:require('../assets/img/shuaxin.png')
    };
  },
  created() {
    this.getall();
  },
  components: {
  
  },
  methods: {
    jump(item) {
      this.$router.push({
        name: "gotime",
        params: {
          data: item.plate
        }
      });
    },
    getall() {
      getAllPlates().then(res => {
        this.list = res.data.data;
        console.log(this.list);
      });
    },
    rotate() {
      if (Date.now() - this.onpresscTime > 4000) {
        this.rotat = !this.rotat;
        this.onpresscTime = Date.now();
        this.num += 1;
        this.getall();
        console.log(this.num);
      } else {
        this.$message({
          showClose: true,
          message: "请勿连续刷新4秒后再试",
          type: "warning"
        });
      }
    }
  }
};
</script>
<style  scoped>
.manage {
  background: white;
  width: 100%;
  height: calc(100vh - 50px);
}
.top {
  height: 2.5rem;
  width: 100%;
  line-height: 2.5rem;
  text-align: center;
  border-bottom: 1px #8f8f8f solid;
}
.list {
  height: calc(100vh - 90px);
  width: 100%;
  overflow: auto;
}
.carr {
  height: 4rem;
  width: 100%;
  line-height: 4rem;
  text-align: center;
  color: #666666;
  letter-spacing: 5px;
}
.divimg > img {
  width: 40px;
  height: 40px;
}
.divimg {
  width: 40px;
  height: 40px;
  position: absolute;
  bottom: 50px;
  right: 30px;
}
.aa {
  transition: all 2s;
}
.go {
  transform: rotate(-360deg);

  transition: all 2s;
}
</style>