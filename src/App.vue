<template>
  <div id="app">
    <div class="home">
      <div class="add" @click="openPicker">车辆管理</div>
      
      <van-field class="vanfield" v-model="sms" center clearable placeholder="请输入车牌号码">
        <template #button>
          <van-button size="small" type="primary" @click="caradd">添加</van-button>
        </template>
      </van-field>
      <div class="management">
        <van-divider content-position="left" :style="{ borderColor: '#828385', margin: '0 ' }">我添加的车牌</van-divider>
        <management ref="managemen"   @addttime="addttime" @mana="mana"></management>
        <van-divider content-position="left" :style="{ borderColor: '#828385', margin: '0 ' }">全部车牌</van-divider>
        <copymanagement ref="copymanagement" @copymana="copymana"  @addtime="addtime"></copymanagement>
      </div>
    </div>
    <tabbar class="tabbar"></tabbar>
    <keep-alive>
      <router-view class="routerview"></router-view>
    </keep-alive>

    <van-popup v-model="show" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        :min-date="minDate"
        :max-date="maxDate"
        cancel-button-text="请选择车牌到期时间"
        @confirm="handleFirm"
      />
    </van-popup>
  </div>
</template>

<script>
import { login, addPlates } from "./request/access";
import tabbar from "./views/tabbar";
import management from "./views/management";
import copymanagement from "./views/copymanagement ";
import { outtime } from "./js/stamp.js";

export default {
  name: "App",
  components: {
    tabbar,
    management,
    copymanagement
  },
  data() {
    return {
      res:'',
      code: "",
      token: "",
      sms: "",
      crarr:"",
      show: false,
      maturitytime: "",
      currentDate: new Date(),
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1)
    };
  },

  created() {
    this.GetCodeDemo();
    let datetime = new Date();
    console.log(outtime(datetime));
  },
  methods: {

    getQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
        return unescape(r[2]);
      } else {
        return null;
      }
    },
    GetCodeDemo() {
      var code = this.getQueryString("code");
      this.code = code;
      console.log(code);
      this.Getcode();
    },

    Getcode() {
      var parameters = this.code;
      login(parameters).then(
        res => {
            this.res=res
          //取出用户信息  和token
          if (res.data.error == 1) {
            this.$message({
              showClose: true,
              message: res.data.message,
              type: "warning"
            });
          }
          this.token = res.data.data;

      
          this.$store.dispatch("addtoken", this.token); //存token
         
          //console.log(this.$store.state.token); //拿token
           this.$refs.managemen.videodata();
            this.$refs.copymanagement.videodata();
         
        },
        err => {
          this.$message.warning("服务器异常，请稍后再试");
        }
      );
    },
    caradd() {
      var express = /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/;
      if (express.test(this.sms) && this.sms != "") {
        
           this.crarr=this.sms
           this.show = true;
      } else {
        this.$message({
          showClose: true,
          message: "请输入正确车牌号",
          type: "warning"
        });
      }
    },
    openPicker() {},

    handleFirm(value) {
      let datetime = new Date();
      let rightnow = outtime(datetime);
      //转时间戳
      this.maturitytime = outtime(value);

      if (rightnow >= this.maturitytime) {
        this.$message({
          showClose: true,
          message: "到期时间不得小于当前时间",
          type: "warning"
        });
      } else {
        this.show = false;
        addPlates(this.crarr, this.maturitytime).then(res => {
          //取出用户信息  和token
          if (res.data.error == 1) {
            this.$message({
              showClose: true,
              message: res.data.message,
              type: "warning"
            });
          } else {
            this.$message({
              showClose: true,
              message: "更新成功",
              offset: 100,
              type: "success"
            });
            this.sms = ''
            this.crarr= ''
            this.$refs.managemen.videodata();
            this.$refs.copymanagement.videodata();
          }
        });
      }
    },
    mana(){
      console.log("mana")
      this.$refs.copymanagement.videodata();
     
    },
    copymana(){
      console.log("copymana")
       this.$refs.managemen.videodata();
    },
    addtime(plate){
     
      this.crarr=plate
      this.show = true;

    },
    addttime(plate){
      alert(plate)
      this.crarr=plate
      this.show = true;

    }
  }
};
</script>

<style>
.home {
  width: 100%;

  height: calc(100vh - 50px);
}
.add {
  width: 100%;
  background: white;
  height: 2.5rem;
  text-align: center;
  line-height: 2.5rem;
  border-bottom: 2px  #e4f0fa solid;
}
.management {
  height: calc(100vh - 160px);
  overflow: auto;
}
.routerview {
  position: absolute;
  top: 0;
  bottom: 0px;
  left: 0;
  right: 0;
}
.vanfield {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
<style>
.van-cell {
  border: 1px solid #e4f0fa !important;
}
</style>