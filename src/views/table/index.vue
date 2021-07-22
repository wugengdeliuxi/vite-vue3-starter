<template>
  <div class="table">
    <global-search>
      <template #operate>
        搜索：
        <el-input
          placeholder="请输入字段名或code"
          style="width: 200px"
          v-model.trim="searchForm.name"
          clearable
          @keyup.enter="searchData"
        >
        </el-input>
        <el-button type="primary" @click="searchData" style="margin-left: 12px">搜索</el-button>
        <el-button @click="handleReset">重置</el-button>
      </template>
    </global-search>
    <global-table
      :selectable="false"
      v-loading="loading"
      :columns="columns"
      :data="tableData"
      :pagination="false"
    >
      <template v-slot:buttons>
        <div class="buttons">
          <el-button type="primary" icon="el-icon-plus" @click="handleCreate">新 建</el-button>
        </div>
      </template>
    </global-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue'

export default defineComponent({
  name: 'Table',
  setup() {
    const columns = ref([])
    const tableData = ref([])
    const loading = ref(false)
    const searchState = reactive({
      searchForm: {
        name: ''
      }
    })

    const searchData = () => {
      console.log(2)
    }

    const handleReset = () => {
      console.log(2)
    }

    const handleCreate = () => {
      console.log(1)
    }

    return {
      columns,
      tableData,
      loading,
      ...toRefs(searchState),
      searchData,
      handleReset,
      handleCreate
    }
  }
})
</script>

<style lang="scss" scoped></style>
