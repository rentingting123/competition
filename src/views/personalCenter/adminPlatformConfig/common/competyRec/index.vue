<template>
<div class="wrapper">
  <ul class="competyContainer clearfix">
    <li v-for="item in competyList" :key="item.id + '1'">
      <div class="inner">
        <img :src="item.img_url" v-if="item.img_url"/>
        <img src='https://web.moocollege.com/mooc/hzq/competition/competition/competition.jpg' v-else/>
        <div class="mask" @click="dialogFormVisible=true">
          <div class="content">
            <i class="el-icon-plus"></i>替换竞赛
          </div>
        </div>
      </div>
    </li>
  </ul>
  <el-dialog title="添加推荐竞赛" :close-on-click-modal= false :visible.sync="dialogFormVisible">
    <el-input
      placeholder="请输入关键字搜索"
      prefix-icon="el-icon-search"
      v-model="keyword" @keyup="search">
    </el-input>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="hot">最热</el-menu-item>
      <el-menu-item index="new">最新</el-menu-item>
    </el-menu>
    <ul class='actContainer'>
        <li v-for="item in actList" :key="item.id" @click="selectItem(item)">
          <div class='prdImg'>
              <img :src="item.prdImgUrl"/>
          </div>
          <div class="act">
              <h3>{{item.prdName}}</h3>
              <p class="price"><el-tag>PHP</el-tag><el-tag>高性能</el-tag></p>
              <p class="amount">专家</p>
          </div>
          <div class="apply">
            <el-radio v-model="item.selectedItem" :label="item.id"></el-radio>
          </div>
        </li>
    </ul>    
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>  
</div>   
</template>
<script>
export default {
  data(){
    return {
      competyList: [{
        img_url: 'https://web.moocollege.com/mooc/hzq/competition/competition/competition.jpg',
        id: '1'
      },{
        img_url: 'https://web.moocollege.com/mooc/hzq/competition/competition/competition.jpg',
        id: '2'
      },{
        img_url: null,
        id: '3'
      }],
      dialogFormVisible: false,
      keyword: '',
      activeIndex: "hot",
      actList: [{
        id: 1,
        prdImgUrl: 'https://web.moocollege.com/mooc/hzq/competition/competition/competition.jpg',
        prdName:'11111大赛',
        selectedItem: 1
      },{
        id: 2,
        prdImgUrl: 'https://web.moocollege.com/mooc/hzq/competition/competition/competition.jpg',
        prdName:'11111大赛',
        selectedItem: 1
      }]
    }
  },
  methods: {
    search(){

    },
    selectItem(item){
      item.selectedItem = item.id;
    },
    handleSelect(key, keyPath) {
      this.getList(key)
    },
    getList(tag){

    }
  },
  created(){
    this.getList(0)
  }
}
</script>
<style lang="less">
.clearfix {
  &:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: " ";
    clear: both;
    height: 0;
  }
}
.wrapper{
  .competyContainer{
    li{
      width:48%;
      height:230px;
      padding:1%;
      float:left;
      cursor:pointer;
      .inner{
        width:100%;
        height:100%;
        position:relative;
        &:hover{
          .mask{
            visibility: visible;
          }
        }
        img{
          width:100%;
          height:100%;
        }
        .mask{
          visibility: hidden;
          width:100%;
          height:100%;
          position:absolute;
          left:0;
          top:0;
          display:table;
          background:#666;
          color:#fff;
          font-weight:bold;
          text-align:center;
          opacity:0.9;
          .content{
            display:table-cell;
            vertical-align: middle;
          }
        }
      }
    }
  }
  .actContainer{
    background:#fff;
    max-height:400px;
    overflow:auto;
    li{
      position: relative;
      .prdImg{
        position:absolute;
        left: 0;
        top:0;
        padding:1.6rem;
        a{
          display:block;
          width:100%;
          height:100%;
          img{
            width:14.8rem;
            height:14.8rem;
            border-radius:1rem;
          }
          .mask{
            width:14.8rem;
            height:14.8rem;
            position:absolute;
            top:1.6rem;
            left:1.6rem;
          }
        }
      }
      .act{
        padding:1.4rem 0 0 12rem;
        a {
          display: block;
          height: 14.8rem;
        }
        h3{
          font-size:14px;
          line-height: 24px;
          font-weight:normal;
          color:#010101;
          text-overflow: ellipsis;
          overflow:hidden; 
          display:-webkit-box; 
          -webkit-box-orient:vertical;
          -webkit-line-clamp:2;
        }
        .amount{
          font-size:14px;
          line-height: 24px;
          left: 18rem;
          span{
            color:#898989;
          }
          em{
            color:#898989;
            margin-right:2.7rem;
          }
          i{
            color:#898989;
          }
        }
        .price{
          color:#898989;
          text-decoration: line-through;
          font-size:1.8rem;
          margin-bottom:10px;
          span{
            margin-right:5px;
          }
        }
      }
      .apply{
        position:absolute;
        right: 0;
        top:0;
        width:5rem;
        height:10rem;
        display:table;
        .el-radio{
          display:table-cell;
          vertical-align: middle;
          .el-radio__label{ 
            display:none;
          }
        }
      }
    }
  }
}
</style>
