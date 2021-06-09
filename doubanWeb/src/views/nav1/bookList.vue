<template>
  <div class="gutter-container">
    <div>
      <span>{{firstDocs.description || '暂无'}}</span>
      <el-divider content-position="left">《{{firstDocs.title}}》</el-divider>
    </div>
    <el-row :gutter="gutter" v-loading="listLoading">
      <el-col v-for="item in data" :span="6" :key="item.bookId" :offset="0" style="margin-top: 30px">
        <el-card :body-style="{ padding: '0px' }">
          <img
            :src="(item.bookImg.indexOf('doubanio.com') != -1)?`https://images.weserv.nl/?url=${item.bookImg}`:item.bookImg"
            class="image">
          <div style="padding: 14px;">
            <span style="font-weight: bold">{{item.title}}</span>
            <p class="bottom clearfix">
              <i :class="`allstar allstar${item.grade*10}`"></i>
              <em v-if="item.grade" style="color:#b0b0b0">{{item.grade}}</em>
              <em v-if="!item.grade" style="color:#b0b0b0">评论不足</em>
            </p>
            <div class="bookInfo bottom clearfix">
              <p>{{item.bookInfo || '暂无'}}</p>
            </div>
            <div class="description bottom clearfix">
              <p>{{item.description || '暂无描述'}}</p>
            </div>
            <div class="bottom clearfix">
              <time class="time">{{item.bookInfo && item.bookInfo.split('/').pop() || '暂无'}}</time>
              <el-button type="text" @click="handleClick(item.bookId)" class="button">更多<i class="el-icon-arrow-down el-icon--right"></i></el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-pagination
      class="pages"
      background
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-size="pageSize"
      layout="prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
  import { getBookList } from '../../api/api';
  export default {
    name: "bookList",
    data(){
      return {
        gutter: 24,
        listLoading: false,
        data: [],
        page: null,
        pages: null,
        total: 0,
        firstDocs:{},

        pageSize: 12,
        pageNum: 1,
      }
    },
    mounted(){
      this.getLists();
    },
    methods:{
      getLists(){
        let params = {};
        params.pageSize = this.pageSize;
        params.pageNum = this.pageNum;
        this.listLoading = true;
        getBookList(params).then(res => {
            console.log(res,"获取列表");
            this.listLoading = false;
            this.data = res.data.docs;
            this.page = res.data.page;
            this.pages = res.data.pages;
            this.total = res.data.total;
            this.firstDocs = res.data.docs && res.data.docs[0];
        })
      },
      handleCurrentChange(page){
        this.pageNum = page;
        this.getLists();
        console.log(page, 'page');
      },
      handleClick(id){
        this.$router.push(`/listDisplay/bookList/bookDetails?book=${id}`);
      }
    }
  }
</script>

<style scoped>
  .gutter-container{
    margin-top: 40px;
  }
  .bookInfo{
    height: 52px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .bookInfo p{
    line-height: 1.4;
  }
  .description{
    height: 72px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
  .description p{
    line-height: 1.4;
  }
  .pages{
    margin: 40px auto;
    text-align: center;
  }
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    height: 350px;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
