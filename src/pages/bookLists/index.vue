<template>
  <div>
    <div class="mdui-typo">
      <div class="mdui-chip">
        <span class="mdui-chip-icon"><i class="mdui-icon material-icons">library_books</i></span>
        <span class="mdui-chip-title">新书速递</span>
      </div>
      <!--<hr/>-->
      <blockquote>
        <p>666</p>
        <footer>666 ——666</footer>
      </blockquote>
    </div>
    <div class="child-box">
      <div class="mdui-row">

        <div class="mdui-col-md-3 mdui-col-sm-6 mdui-col-xs-12" v-for="(item, index) in data">
          <div class="card-box">
            <div class="mdui-card">
              <div class="mdui-card-media">
                <img :src="`https://images.weserv.nl/?url=${item.bookImg}`" />
                <!--<p class="img-box" data-img="{{item.bookImg}}"></p>-->
                <div class="mdui-card-menu">
                  <button class="mdui-btn mdui-btn-icon mdui-text-color-white"><i class="mdui-icon material-icons">share</i></button>
                </div>
              </div>
              <div class="mdui-card-primary">
                <div class="mdui-card-primary-title">{{item.title}}</div>
                <div class="mdui-card-primary-subtitle grade-div">
                  <!--<i class="mdui-icon material-icons mdui-text-color-orange mdui-typo-subheading-opacity">&#xe838;</i>-->
                  <i class="allstar allstar10"></i>
                  <em v-if="!item.grade" class="mdui-typo-body-2-opacity">{{item.grade}}</em>
                  <!--<em ng-if="!item.grade" class="mdui-typo-body-2-opacity">评论不足</em>-->
                </div>
                <div class="mdui-card-primary-subtitle book-copyright">{{item.bookInfo}}}</div>
              </div>
              <div class="mdui-card-content">{{item.description?item.description:"暂无描述"}}</div>
              <div class="mdui-card-actions">
                <a href="#/bookDetails" class="mdui-btn mdui-btn-icon mdui-float-right"><i class="mdui-icon material-icons">expand_more</i></a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import "./index.css"

  export default {
    name: 'bookLists',
    data(){
      return {

      }
    },
    mounted(){
      this.getList();
    },
    methods:{
      getList(){
        let params = {};
        params.pageSize = 10;
        params.pageNum = 1;
        this.$myGet(
          `/api/books/bookLists`,
          {
            params: params
          },
          res => {
            console.log(res,"获取列表");
            this.data = res.data.docs;
            this.pages = res.data.pages;
            this.total = res.data.total;
          },
          this
        );
      }
    }
  }
</script>


<style scoped>

</style>
