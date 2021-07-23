import { computed, Ref } from 'vue'
import { TableProps } from './types'

export default function useTableHeight(props: TableProps, innerHeight: Ref<number>) {
  const tableHeight = computed(() => {
    const { height } = props
    if (height) {
      let customHeight = height
      if (typeof customHeight === 'string') {
        if (customHeight.endsWith('px')) {
          customHeight = parseFloat(customHeight)
        }
      } else {
        return customHeight
      }
      return customHeight
    }
    return innerHeight.value
  })

  const tableContainerHeight = computed(() => {
    const { height } = props
    if (height) {
      if (typeof height === 'number') {
        return `${height}px`
      }
      return height
    }
    return '100%'
  })

  return {
    tableHeight,
    tableContainerHeight
  }
}
