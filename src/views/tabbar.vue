<template>
    
    <div class="tabbar">
        <div class="tabbarflex"  @click="listment">
            <div class="tabbardiv">车辆管理</div>
        </div>
         <div class="tabbarflex" @click="analysis">
             <div >进出详情</div>
        </div>
    </div>

</template>
<script>

export default {
    nmae:"tabbar",
    methods:{
        listment(){
            this.$router.push('/');
            
        },
        analysis(){
            this.$router.push('/scorement');
        }
    }
    
}
</script>
<style  scoped>
.tabbar{
    display: flex;
    height: 3rem;
    width: 100%;
    border-top: 1px solid #DEDCDC;
}
.tabbarflex{
    line-height: 3rem;
    width: 50%;
    text-align: center;
    font-size: 14px;
    color: #5F5F5F;
}
.tabbardiv{
    margin-top: 0.5rem;
    height: 2rem;
    line-height: 2rem;
    border-right: 1px #EFEFEF solid;
   

}
</style>