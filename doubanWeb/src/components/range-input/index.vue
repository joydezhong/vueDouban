<template>
  <div class="ri-wrap">
    <el-col :span="11">
      <el-input
        class="ri-input"
        :size="size"
        :placeholder="startPlaceholder"
        @change="changeValueRange"
        v-model="startRange"
        :type="type"
      >
      </el-input>
    </el-col>
    <el-col :span="2">
      <span style="line-height: 36px;font-size: 14px;padding: 0 5px">{{separator}}</span>
    </el-col>
    <el-col :span="11">
      <el-input
        class="ri-input"
        :size="size"
        :placeholder="endPlaceholder"
        @change="changeValueRange"
        v-model="endRange"
        :type="type"
      >
      </el-input>
    </el-col>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        startRange: "",
        endRange: "",
        type: 'text',
      }
    },
    props: {
      size: String,
      startPlaceholder: String,
      endPlaceholder: String,
      separator: String,
      // type: String,
    },
    mounted() {
      // this.data = this.searchList
    },
    methods: {
      changeValueRange(){
        let startRange = this.startRange || 0;
        let endRange = this.endRange || 0;
        this.$emit('handleRangeValue', startRange, endRange)
      },
      clearData(){
        this.startRange = "";
        this.endRange = "";
      },
    }
  }
</script>

<style>
  .ri-wrap{
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    height: 38px;
    line-height: 38px;
    box-sizing: border-box;
    background: #fff;
  }
  .ri-input .el-input__inner{
    border: none !important;
    font-size: 14px;
  }
</style>
