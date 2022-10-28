<template>
<div>
    <ul class="all">
        <li @click="active(item)" class="libox" v-for="item in list" :key="item.id" >
            <img class="limg" :src="item.url"/>
            <div class="ltext">
            <h2>{{item.title}}</h2>
            <p>{{item.title2}}</p>
            </div>
        </li>
    </ul>
  <el-dialog
  :title="activeName"
  
  :visible.sync="centerDialogVisible"
  width="70%">
  <div class="dialogAll">
 <video v-if="centerDialogVisible" width="100%" controls :src="activedVideo">
 </video>
 <show :data="activeHtml"/>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="centerDialogVisible = false">关闭</el-button>
  </span>
</el-dialog>
</div>
</template>
<script>
import show from '@@/components/editor/show' 
export default {
    
    props:['list'],
    components:{show},
    data(){
        return{
            centerDialogVisible:false,
            activedVideo:'',
            activeName:'',
            activeHtml:''
        }
    },
    methods:{
        active(item){
            this.centerDialogVisible=true
            this.activedVideo=item.img
            this.activeName = item.title
            this.activeHtml = item.info
        }
    },
    watch:{
        list:{
            immediate: true,
            handler(val){
                let id = this.$route.query.id
                val.map(item=>{
                    console.log(item.id, id);
                    if(item.id==id){
                        return this.active(item)
                    }
                })
            }
        }
    }
}
</script>

<style lang="less" scoped>
.all{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 12px;
    .libox{
        width: 370px;
        height: 90px;
        display: flex;
        align-items: center;
        margin-top: 15px;
        overflow: hidden;
        cursor: pointer;
    }
    .ltext{
        height: 90px;
        text-align: left;
    }
    .limg{
        height: 90px;
        width: 160px;
        border-radius: 10px;
        margin-right: 12px;
    }

}
    
</style>