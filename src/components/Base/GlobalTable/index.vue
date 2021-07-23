<template>
  <div class="global-table" :style="{ height: tableContainerHeight }">
    <slot name="title" v-if="isTitle">
      <h4>查询列表</h4>
    </slot>
    <slot name="buttons" v-if="hasButtons">
      <div class="buttons">
        <el-button type="primary" icon="el-icon-plus">新 建</el-button>
      </div>
    </slot>
    <el-table
      ref="tableRef"
      :header-cell-class-name="headercolor"
      :max-height="tableHeight"
      size="medium"
      stripe
      v-bind="$attrs"
    >
      <el-table-column type="selection" width="55" v-if="selectable"> </el-table-column>
      <slot name="first-columns" />
      <template v-for="item in columns">
        <el-table-column
          v-if="item.actions && item.actions.length"
          :key="item.prop"
          :width="item.width"
          :fixed="item.fixed"
          :resizable="item.resizable || false"
          :min-width="item.minwidth"
          :sortable="item.sortable"
          :label="item.label"
        >
          <template v-slot="scope">
            <div v-for="(btnInfo, index) in item.actions" :key="btnInfo.id">
              <el-button
                type="text"
                :disabled="btnInfo.disabled"
                @click.stop="btnInfo.click({ ...scope })"
                >{{ btnInfo.text }}</el-button
              >
              <el-divider
                direction="vertical"
                :key="btnInfo.id"
                v-if="index < item.actions.length - 1"
              ></el-divider>
            </div>
          </template>
        </el-table-column>
        <!-- labelCustomize 是否开启单元格内容自定义，用 getLabel 回调传入，开启 labelIsHtml 可传入 html 结构-->
        <el-table-column
          v-else-if="item.labelCustomize"
          :key="item.prop"
          :width="item.width"
          :prop="item.prop"
          :fixed="item.fixed"
          :resizable="item.resizable || false"
          show-overflow-tooltip
          :min-width="item.minwidth"
          :sortable="item.sortable"
          :label="item.label"
        >
          <template v-slot="scope">
            <div v-if="item.labelIsHtml" v-html="item.getLabel(scope.row || {})" />
            <span v-else>{{
              item.getLabel(scope.row || {}, scope.$index, currentPage, pageSize)
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :key="item.prop"
          :width="item.width"
          :prop="item.prop"
          :fixed="item.fixed"
          :resizable="item.resizable || false"
          show-overflow-tooltip
          :min-width="item.minwidth"
          :sortable="item.sortable"
          :label="item.label"
        />
      </template>
      <slot name="last-columns" />
    </el-table>
    <div v-if="pagination" style="margin-top: 10px; text-align: right">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
        @size-change="sizeChange"
        @current-change="currentChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, PropType, onActivated, onUnmounted, nextTick } from 'vue'
import useListenerResize from './useListenerResize'
import useTableHeight from './useTableHeight'

export default defineComponent({
  name: 'GlobalTable',
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    height: {
      type: [Number, String],
      default: 0
    },
    // 是否可分页
    pagination: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    currentPage: {
      type: [Number, String],
      default: 1
    },
    pageSize: {
      type: [Number, String],
      default: 10
    },
    total: {
      type: [Number, String],
      default: 0
    },
    // 是否显示复选框
    selectable: {
      type: Boolean,
      default: true
    },
    // 头部栏的class名字，用于修改颜色等样式
    headercolor: {
      type: String,
      default: 'headercolor'
    },
    // 是否需要一个标题
    isTitle: {
      type: Boolean,
      default: false
    },
    // 是否需要操作按钮
    hasButtons: {
      type: Boolean,
      default: false
    }
  },
  emits: ['handleSizeChange', 'handleCurrentChange'],
  setup(props, { emit }) {
    const innerHeight = ref(0)
    const tableRef = ref(null)

    const { tableHeight, tableContainerHeight } = useTableHeight(props, innerHeight)

    const { listenerResize } = useListenerResize(innerHeight)

    window.addEventListener('resize', listenerResize)
    onUnmounted(() => {
      window.removeEventListener('resize', listenerResize)
    })

    onMounted(() => {
      if (!props.height) {
        nextTick(() => {
          listenerResize()
        })
      }
    })

    onActivated(() => {
      ;(tableRef.value as any).doLayout()
      nextTick(() => {
        listenerResize()
      })
    })

    const sizeChange = (size: number) => {
      emit('handleSizeChange', size)
    }
    const currentChange = (page: number) => {
      emit('handleCurrentChange', page)
    }

    return {
      tableHeight,
      tableContainerHeight,
      sizeChange,
      currentChange,
      tableRef
    }
  }
})
</script>

<style scoped lang="scss">
.global-table {
  padding: 16px 16px 28px 16px;
  background: #fff;
  // box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.08);
  .buttons {
    margin-bottom: 20px;
    text-align: left;
  }
}
</style>

<style lang="scss">
.el-table__empty-text {
  width: 100%;
  box-sizing: border-box;
}
.global-table .headercolor {
  background: #f7f8fa;
  color: #323233;
}
</style>
