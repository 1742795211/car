<template>
  <div class="manage">
    <!-- <div class="top">车辆管理</div> -->
    <div class="managediv">
      <van-popup v-model="show" round position="bottom" :style="{ height: '30%' }">
        <div class="truetext">
          是否删除当前车牌
          <br />
          <span>注意:</span>进出数据不可恢复
        </div>
        <div class="trueerror">
          <div class="error" @click="showfalse">取消</div>
          <div class="true" @click="showtrue">确认</div>
        </div>
      </van-popup>

      <div class="elcoltable">
        <div v-if=" list ==''" class="carr">暂未添加过车牌</div>
        <el-row class="elcol" v-for="(item,index) in list" :key="index">
          <el-col :span="6">{{item.plate}}</el-col>


          <el-col class="daoqi" :span="4" v-if="cxdatea(item.expringtime)" >已过期</el-col>
          <el-col class="daoqi" :span="4" v-if="cxdatea(item.expringtime)" >

          <van-button  color="#45FA6F" plain size="small" @click="addtime(item.plate)">重置</van-button>
          </el-col>

          <el-col :span="8" v-else >{{datea(item.expringtime)}}到期</el-col>




          <el-col :span="5">
            <van-button color="#12aff1" @click="deletea(item.plate,index)" size="small">删除</van-button>
          </el-col>
          <el-col :span="5">
            <van-button
              v-if="item.status == 1"
              color="#12aff1"
              plain
              @click="lookat(item,index)"
              size="small"
            >禁用</van-button>
            <van-button v-else color="#7A7D7F" plain @click="lookatA(item,index)" size="small">启用</van-button>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import { outtime } from "../js/stamp.js";
import { Dialog } from "vant";
import { formatDate } from "../js/datachange";
import {
  deltePlate,
  getMyPlates,
  getAllPlates,
  updatastatu
} from "../request/access";
export default {
  nmae: "tabbar",
  data() {
    return {
      showw: 1,
      list: "",
      serial: "",
      show: false,
      id: "",
      i: "",
      rightnow:""
    };
  },
  created() {
    this.videodata();
    let datetime = new Date();
    this.rightnow = outtime(datetime);
  },
  computed: {
    datea() {
      return function(expringtime) {
        const dataS = new Date(expringtime );
        var dataa = formatDate(dataS, "yyyy-MM-dd ");
        return dataa;
      };
    },
    cxdatea(){
       return function (expringtime) {
                    if( expringtime < this.rightnow){
                        return  true
                    }else{
                        return  false
                    }
       }
    }
  },
  methods: {
    showfalse() {
      console.log("123");
      this.show = false;
    },
    showtrue() {
      deltePlate(this.id).then(res => {
        if (res.data.error == 1) {
          this.$message({
            showClose: true,
            message: res.data.message,
            type: "warning",
            offset: 200
          });
        } else {
          this.list.some((item, i) => {
            //实际上some就是判断循环终止的一种条件方法
            if (item.plate == this.id) {
              this.list.splice(i, 1); //在数组的some方法中，return true 就会立即终止这个数组的后续循环
              return true;
            }
          });
          this.$emit("mana");
        }
      });

      this.show = false;
    },

    deletea(id, i) {
      console.log(id, i);
      this.id = id;
      this.i = i;
      this.show = true;
    },
    lookat(item, index) {
       //禁用
      updatastatu(item.plate,0).then(res =>{
      if (res.data.error == 1) {
            this.$message({
              showClose: true,
              message: res.data.message,
              type: "warning"
            });
          } else {
            this.$message({
              showClose: true,
              message: res.data.data,
              type: "success"
            });
            this.list[index].status = 0;
            this.$emit("mana");
          }
      })
     
      
    },
    lookatA(item, index) {
      //启用
      updatastatu(item.plate,1).then(res =>{
      if (res.data.error == 1) {
            this.$message({
              showClose: true,
              message: res.data.message,
              type: "warning"
            });
          } else {
            this.$message({
              showClose: true,
              message: res.data.data,
              type: "success"
            });
            this.list[index].status = 1;
            this.$emit("mana");
          }
      })
     


    },
    addtime(plate){
      
      this.$emit("addttime",plate);
    },
    videodata() {
      //获取车牌
      getMyPlates().then(res => {
        console.log(res);
        this.list = res.data.data;
      });
    }
  }
};
</script>
<style  scoped>
/* .manage {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
} */
.managediv {
  width: 100%;
  background: white;

  overflow: auto;
  z-index: 2;
}
.top {
  width: 100%;
  background: white;
  height: 2.5rem;
  text-align: center;
  line-height: 2.5rem;
  border-bottom: 1px #8f8f8f solid;
}
.videorecording {
  width: 38rem;
  height: 100vh;
  margin: 0 auto;
}
.classname {
  width: 100%;
  text-align: center;
  line-height: 3rem;
  border-bottom: 1px #e5e9f2 solid;
}
.elcol {
  font-size: 14px;
  padding-left: 15px;
  height: 2.6rem;
  line-height: 2.6rem;
  border-bottom: 1px #e5e9f2 solid;
}
.elcoltable {
  overflow: auto;
}
.trueerror {
  display: flex;
  position: absolute;
  bottom: 0px;
  left: 0;
  right: 0;
}
.true {
  text-align: center;
  width: 50%;
  line-height: 3.5rem;
  height: 3.5rem;
  border-top: 1px solid #ececec;
}
.error {
  text-align: center;
  width: 50%;
  height: 3.5rem;
  line-height: 3.5rem;
  border-top: 1px solid #ececec;
  border-right: 1px solid #ececec;
}
.truetext {
  height: 6rem;
  width: 100%;
  text-align: center;
  padding-top: 3rem;
  font-size: 18px;
  line-height: 2.5rem;
}
.truetext > span {
  color: #fd3600;
}
.carr {
  height: 4rem;
  width: 100%;
  line-height: 4rem;
  text-align: center;
  color: #666666;
  letter-spacing: 5px;
}
.daoqi{
  color: #fd3600;
}
</style>