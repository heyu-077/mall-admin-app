<template>
  <div class="search-box">
    <a-form-model
      layout="inline"
      :model="searchForm"
      @submit="handleSubmit"
      @submit.native.prevent
    >
      <a-form-model-item label="检索关键字">
        <a-input v-model="searchForm.searchWord" placeholder="请输入关键字">
        </a-input>
      </a-form-model-item>
      <a-form-model-item label="商品类目">
        <a-select
          v-model="searchForm.category"
          show-search
          placeholder="请选择商品类目"
          style="width: 200px"
          @change="handleChange"
          allowClear
        >
          <a-select-option
            v-for="category in categoryList"
            :key="category.id"
            :value="category.name"
          >
            {{ category.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item>
        <a-button
          type="primary"
          html-type="submit"
        >
          搜索
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchForm: {
        searchWord: '',
        category: '',
      },
    };
  },
  props: ['categoryList'],
  methods: {
    // 提交搜索表单时触发
    handleSubmit() {
      this.$emit('submit', this.searchForm);
    },
    // 切换类目时触发
    handleChange(val) {
      this.searchForm.category = val;
    },
  },
};
</script>

<style lang="less" scope>
   .search-box{
       padding:15px 30px;
   }
</style>
