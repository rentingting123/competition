<template>
  <div class="lottery">
        <el-button size="mini" type="warning" :disabled="show" @click.stop="choose">
            {{$t('worksShow.team1')}}
        </el-button>

       <el-dialog title="抽签" :close-on-click-modal= false :modal-append-to-body="false" :append-to-body='true' :visible.sync="show" width="600">
           <div  class="loading">
                <img :src="url" width="400">
                <div v-show="showLoading" class="loading1">
                    <p>{{$t('worksShow.team2')}}{{poolGroupName}}</p>
                    <p>{{$t('worksShow.team3')}}{{poolSort}}</p>
                </div>
           </div>
      </el-dialog>

  </div>
</template>

<script>
import network from '@@/api/jxapi'
export default {
    props:['poolGroupName',"cb",'poolSort','poolId'],
    data(){
        return{
            show: false,
            showLoading: false,
            url: 'https://web.moocollege.com/mooc/hzq/competition/loading.gif',
            canClick:true
        }
    },
    created(){
        
    },
    methods:{
        async choose(){
          if(this.canClick){
            this.canClick=false
            this.$message('抽签中，请耐心等候！');
              let res = await network.updatePoolSortStatus({data:{
                  poolId: this.poolId
              }})
              if(res == 'error') {
                  this.show= false
                  this.canClick=true;
              }else {
                  this.showLoading = true
                  this.canClick=true;
                  this.show = true
                  this.url = 'https://web.moocollege.com/mooc/hzq/competition/loading.gif'
              }
          }else{

          }
            
        }
    },
    watch:{
        show(val){
            if(!val){
                this.showLoading = false
                this.url = ''
                this.cb&&this.cb()
            }
        }
    }
    
}
</script>

<style lang="less" scoped>
.lottery{
    display: inline-block;
    vertical-align: top;
}
.loading{
        width: 400px;
        margin: 0 auto;
        text-align: center;
        .loading1{
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            align-content: center;
            p{
                width: 100%;
                font-size: 20px;
                color: #000000;
                margin-top: 10px;
            }
        }
    }
.el-button--warning{
    background-color: #F29206;
    border-color: #F29206;
}
</style>