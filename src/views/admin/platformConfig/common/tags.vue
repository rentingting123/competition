<template>
    <div class="tags">
       <el-tag
            
            v-for="(tag,index) in titleTags"
            :key="index"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag}}
        </el-tag>

        <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            maxlength="8"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
            >
        </el-input>

        <el-button v-else class="button-new-tag" size="small" @click="showInput">新增 +</el-button>
        
    </div>
</template>
<script>

export default {
    props:['titleTags','tagsNumber'],
    data() {
        
        return {
            inputVisible: false,
            inputValue: ''
        }
    },
    methods: {
      handleClose(tag) {
        this.titleTags.splice(this.titleTags.indexOf(tag), 1);
        this.$emit('transTags',this.titleTags)
      },

      showInput() {
        if(this.tagsNumber){
          if(this.titleTags.length<=this.tagsNumber-1){
            this.inputVisible = true;
            this.$nextTick(_ => {
              this.$refs.saveTagInput.$refs.input.focus();
            });
          }else{
            this.$message.info('培训标签最多选择三个')
          }
        }else{
          this.inputVisible = true;
          this.$nextTick(_ => {
            this.$refs.saveTagInput.$refs.input.focus();
          });
        }
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.titleTags.push(inputValue);
        }
        this.$emit('transTags',this.titleTags)
        this.inputVisible = false;
        this.inputValue = '';
      },
      
    }
   
   
    
}
</script>


<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
    border-radius: 20px;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  
</style>
<style lang="less">
.tags{
  .el-tag{
    border-radius: 20px;
  }
}

</style>
