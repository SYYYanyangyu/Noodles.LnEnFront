<template>
  <div class="pagination">
    <el-pagination
      v-model:currentPage="currentPage"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="pageSize"
      layout="sizes, prev, pager, next, jumper, total"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { ElPagination } from 'element-plus';

export default defineComponent({
  components: {
    ElPagination,
  },
  props: {
    total: {
      type: Number,
      required: true,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
  },
  setup(props) {
    const currentPage = ref(1);

    function handleSizeChange(size: number) {
      // 处理每页显示条数变化
      console.log('每页显示条数：', size);
    }

    function handleCurrentChange(newPage: number) {
      // 处理当前页码变化
      console.log('当前页码：', newPage);
      currentPage.value = newPage;
    }

    return {
      currentPage,
      handleSizeChange,
      handleCurrentChange,
    };
  },
});
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>