<template>
  <div class="gutter-container" v-loading="listLoading">
    <el-divider content-position="left">《{{data.title}}》</el-divider>
    <el-row :gutter="30">
      <el-col :span="8">
        <div class="grid-content bg-purple go-right">
          <img v-show="showImg" :src="`https://images.weserv.nl/?url=${data.bookImg}`" class="image">
          <p v-if="isLoading" v-loading="isLoading" class="image" style="text-align: center"></p>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content bg-purple">
          <!--{{data.bookInfo}}-->
          <!--<div><pre>{{data.bookInfo.replace(' ', '')}}</pre></div>-->
          <p class="bookInfo" v-html="data.bookInfoHtml"></p>
        </div>
      </el-col>
    </el-row>
    <el-row class="mrt40 mrb30">
      <el-col :span="24">
        <el-button size="mini" type="primary" plain round>想读</el-button>
        <el-button size="mini" type="primary" plain round>在读</el-button>
        <el-button size="mini" type="primary" plain round>读过</el-button>
        <el-rate
          v-model="value"
          disabled
          show-score
          style="display: inline-block"
          class="mrl20"
          text-color="#ff9900"
          score-template="{value}">
        </el-rate>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-divider content-position="left">内容简介</el-divider>
        <p class="contentInfo" v-html="data.contentInfoHtml"></p>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-divider content-position="left">作者简介</el-divider>
        <p class="contentInfo" v-html="data.authorInfoHtml"></p>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-divider content-position="left">目录</el-divider>
        <p class="contentInfo" v-if="data.catalogInfoHtml" v-html="data.catalogInfoHtml"></p>
        <p class="contentNoInfo" v-if="!data.catalogInfoHtml">暂无相关内容</p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "bookDetails",
    data(){
      return {
        isLoading: true,
        showImg: false,
        listLoading:false,
        data: {},
        value: null,
      }
    },
    mounted(){
      this.getLists();
      this.timer();
    },
    methods:{
      timer(){
        setTimeout(()=>{
          this.isLoading = false;
          this.showImg = true;
        }, 1200)
      },
      getLists(){
        let params = {};
        params.bookId = this.$route.query.book;
        this.listLoading = true;
        this.$myGet(
          `/api/books/bookDetails`,
          {
            params: params
          },
          res => {
            console.log(res,"获取列表");
            this.listLoading = false;
            this.data = res.data;
            this.value = Number((res.data.grade / 2).toFixed(1));
          },
          this
        );
      }
    }
  }
</script>

<style scoped>
  .gutter-container{
    margin-top: 40px;
  }
  .image{
    width: 200px;
    max-height: 280px;
  }
  .bookInfo{
    line-height: 1.8;
  }
  .contentNoInfo{
    color: #d4d4d4;
  }
  .el-divider__text{
    font-size: 16px;
    color: #475669;
  }
</style>
