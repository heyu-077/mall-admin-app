<template>
  <div class="product-list">
    <!-- 搜索框部分 -->
    <search-box @submit="searchSubmit" :categoryList="categoryList" />
    <!-- 表格部分 -->
    <product-table
      :data="tableData"
      :page="page"
      @change="changePage"
      :categoryList="categoryList"
    />
  </div>
</template>

<script>
import SearchBox from '@/components/search.vue';
import ProductTable from '@/components/productTable.vue';
import api from '@/api/product';
import categoryApi from '@/api/category';

export default {
  data() {
    return {
      tableData: [],
      searchForm: {},
      categoryList: [],
      page: {
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        total: 70,
      },
      categoryObj: {},
    };
  },
  components: {
    SearchBox,
    ProductTable,
  },
  async created() {
    await categoryApi.list().then((res) => {
      this.categoryList = res.data;
      res.data.forEach((item) => {
        this.categoryObj[item.id] = item;
      });
    });
    this.getTableData();
  },
  methods: {
    getTableData() {
      api.list({
        page: this.page.current,
        size: this.page.pageSize,
        ...this.searchForm,
      }).then((res) => {
        // console.log(res);
        // this.page.total = res.total;
        this.tableData = res.data.map((item) => ({
          ...item,
          categoryName: this.categoryObj[item.category].name,
        }));
      });
    },
    searchSubmit(form) {
      console.log(form);
      this.searchForm = form;
      this.getTableData();
    },
    changePage(page) {
      this.page = page;
      this.getTableData();
    },
  },
};
</script>
