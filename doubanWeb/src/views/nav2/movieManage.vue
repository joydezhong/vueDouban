<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.title" placeholder="电影名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filters.copyrightInfo" placeholder="演员"></el-input>
        </el-form-item>
        <el-form-item>
          <rangeInput
            style="width: 300px;"
            size="medium"
            start-placeholder="开始评分数"
            end-placeholder="结束评分数"
            separator="至"
            @handleRangeValue="getGradeRangeValue"
            ref="myRange"
          >
          </rangeInput>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getLists">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="lists" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index">
      </el-table-column>
      <el-table-column prop="title" label="电影名称" :formatter="formatTitle" sortable>
      </el-table-column>
      <el-table-column prop="bookImg" label="剧照">
        <template slot-scope="scope">
          <img
            :src="(scope.row.movieImg.indexOf('doubanio.com') != -1)?`https://images.weserv.nl/?url=${scope.row.movieImg}`:scope.row.movieImg"
            width="40"
            height="50">
        </template>
      </el-table-column>
      <el-table-column prop="copyrightInfo" label="演员" :formatter="formatAuthor" sortable>
      </el-table-column>
      <el-table-column prop="grade" label="评分" sortable>
      </el-table-column>
      <el-table-column prop="remark" label="评论人数" sortable>
      </el-table-column>
      <!--<el-table-column prop="addr" label="地址" min-width="180" sortable>-->
      <!--</el-table-column>-->
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
      <el-pagination
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :page-size="pageSize"
        :total="total"
        style="float:right;"
      >
      </el-pagination>
    </el-col>

    <!--编辑界面-->
    <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="书名" prop="title">
          <el-input v-model="editForm.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="bookImg">
          <el-upload
            class="avatar-uploader"
            action="http://192.168.31.18:3000/api/upload"
            :show-file-list="false"
            :on-success="handleUpdateSuccess"
          >
            <img v-if="editForm.bookImg" :src="editForm.bookImg" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="评分" prop="grade">
          <el-input-number v-model="editForm.grade" :min="0" :max="10"></el-input-number>
        </el-form-item>
        <el-form-item label="出版时间" prop="birth">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="editForm.birth"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="出版社" prop="publisher">
          <el-input v-model="editForm.publisher" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="出版国家" prop="publishAddress">
          <el-input v-model="editForm.publishAddress" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="editForm.author" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input type="textarea" v-model="editForm.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--标题  图片 评分 信息  描述 时间-->
    <!--新增界面-->
    <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-form-item label="书名" prop="title">
          <el-input v-model="addForm.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="bookImg">
          <el-upload
            class="avatar-uploader"
            action="http://192.168.31.18:3000/api/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="addForm.bookImg" :src="addForm.bookImg" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="评分" prop="grade">
          <el-input-number v-model="addForm.grade" :min="0" :max="10"></el-input-number>
        </el-form-item>
        <el-form-item label="出版时间" prop="birth">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="addForm.birth"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="出版社" prop="publisher">
          <el-input v-model="addForm.publisher" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="出版国家" prop="publishAddress">
          <el-input v-model="addForm.publishAddress" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="addForm.author" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input type="textarea" v-model="addForm.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
  import Vue from "vue"
  import {mapState, mapMutations} from 'vuex';
  import rangeInput from '../../components/range-input'

  export default {
    data() {
      return {
        filters: {
          title: '',
          copyrightInfo: ''
        },
        imageUrl: '',
        currentRange: [],

        users: [],
        pageSize: 10,
        pageNum: 1,
        listLoading: false,
        sels: [],//列表选中列
        total: 0,
        lists: [],
        editFormVisible: false,//编辑界面是否显示
        editLoading: false,
        editFormRules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ]
        },
        //编辑界面数据
        editForm: {

        },
        addFormVisible: false,//新增界面是否显示
        addLoading: false,
        addFormRules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ]
        },
        //新增界面数据
        addForm: {
          title: '',
          grade: '',
          author: '',
          bookImg: '',
          birth: '',
          description: '',
          publisher: '',
          publishAddress: ''
        }

      }
    },
    methods: {
      ...mapMutations("movies",
        [
          "updateState",
        ]
      ),
      handleAvatarSuccess(res, file) {
        // this.addForm.bookImg = URL.createObjectURL(file.raw);
        this.addForm.bookImg = res.data.path;
      },
      handleUpdateSuccess(res, file){
        this.editForm.bookImg = res.data.path;
      },
      //名称
      formatTitle: function(row, column){
        return row.title.split('/')[0];
      },
      //作者
      formatAuthor: function (row, column) {
        return row.copyrightInfo.split('主演:')[1].split('/')[0];
        let result;
        if(row.copyrightInfo.indexOf('主演:') != -1){
          result = row.copyrightInfo.split('主演:')[1];
        }
      },
      getGradeRangeValue(startVal, endVal){
        console.log(startVal, endVal, 'grade range value')
        this.searchGradeRange = [startVal, endVal];
        this.currentRange = [startVal, endVal];
      },
      handleCurrentChange(val) {
        this.pageNum = val;
        this.getLists();
      },
      //获取用户列表
      getLists() {
        // console.log(this.searchGradeRange, this.currentRange, 'searchGradeRange')
        this.filters.grade = this.currentRange.join();
        let params = {
          pageSize: this.pageSize,
          pageNum: this.pageNum,
          ...this.filters
        };
        console.log(params,'params');
        this.listLoading = true;
        this.$myGet(
          `/api/movies/movieLists`,
          {
            params: params
          },
          res => {
            this.listLoading = false;
            this.lists = res.data.docs;
            this.total = res.data.total;
            console.log(res, 'res');
          }
        )
      },
      //删除
      handleDel: function (index, row) {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          let params = { id: row._id };
          this.$myPost(
            `/api/movies/movieRemove`,
            params,
            res => {
              console.log(res, 'res')
              if(res.code == 1){
                this.$message({
                  message: '删除成功',
                  type: 'success'
                });
                this.getLists();
              }
            }
          )
        }).catch(() => {

        });
      },
      //显示编辑界面
      handleEdit: function (index, row) {
        this.editFormVisible = true;

        let paramsObject = Object.assign({}, row);
        let arr = paramsObject.bookInfo.split('/');
        paramsObject.birth = arr[arr.length-1];
        paramsObject.publisher = arr[arr.length-2];
        if(paramsObject.bookInfo.indexOf(']') != -1){
          let locationArr = arr[0].split(']');
          paramsObject.author = locationArr[locationArr.length-1];
          paramsObject.publishAddress = locationArr[0].replace('[','');
        }else{
          paramsObject.author = '';
          paramsObject.publishAddress = '';
        }
        if(paramsObject.bookImg.indexOf('doubanio.com') != -1){
          paramsObject.bookImg = 'https://images.weserv.nl/?url=' + paramsObject.bookImg;
        }
        delete paramsObject.bookInfo;
        this.editForm = paramsObject;
      },
      //编辑
      editSubmit: function () {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.editLoading = true;
            let params = Object.assign({}, this.editForm);
            params.bookInfo = "[" + params.publishAddress + "]" + params.author + "/" + params.publisher + "/" + params.birth;
            delete params.birth;
            delete params.publishAddress;
            delete params.author;
            delete params.publisher;
            console.log(params, 'params');

            this.$myPost(
              `/api/books/updateBook`,
              params,
              res => {
                console.log(res, 'res');
                this.editLoading = false;
                this.editFormVisible = false;
                if(res.code == 1){
                  this.$message({
                    message: '更新成功',
                    type: 'success'
                  });
                }else{
                  this.$message.error('error'+ res.data);
                }
                this.getLists();
              }
            )
          }
        });
      },
      //显示新增界面
      handleAdd: function () {
        this.addFormVisible = true;
        this.addForm = {
          title: '',
          grade: '',
          bookInfo: '',
          bookImg: '',
          birth: '',
          description: ''
        };
      },
      //新增
      addSubmit: function () {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.addLoading = true;
            let params = Object.assign({}, this.addForm);
            params.bookInfo = "[" + params.publishAddress + "]" + params.author + "/" + params.publisher + "/" + params.birth;
            delete params.birth;
            delete params.publishAddress;
            delete params.author;
            delete params.publisher;
            console.log(params, 'params');

            this.$myPost(
              `/api/books/addBook`,
              params,
              res => {
                console.log(res, 'res');
                this.addLoading = false;
                this.addFormVisible = false;
                if(res.code == 1){
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                  });
                }else{
                  this.$message.error('error'+ res.data);
                }
                this.getLists();
              }
            )
          }
        });
      },
      selsChange: function (sels) {
        this.sels = sels;
      },
      //批量删除
      batchRemove: function () {
        let ids = this.sels.map(item => item._id);
        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          let params = { id: ids };
          console.log(params, 'params');

          this.$myPost(
            `/api/books/removeBook`,
            params,
            res => {
              console.log(res, 'res')
              if(res.code == 1){
                this.$message({
                  message: '批量删除成功',
                  type: 'success'
                });
                this.getLists();
              }
            }
          )
        }).catch(() => {

        });
      }
    },
    mounted() {
      this.getLists();
      console.log(this, 'this')
    },
    components: {
      rangeInput
    },
    computed: {
      searchGradeRange: {
        get () {
          console.log(this.$store, 'stroe');
          return this.$store.state.movies.searchGradeRange
        },
        set (value) {
          this.updateState({type: 'orderType',value: value})
        }
      }
    }
  }

</script>

<style scoped>

</style>
