import { computed, Ref } from 'vue'
import { tableProps } from './types'

export default function useTableHeight(props: tableProps, innerHeight: Ref<number>) {
  const tableHeight = computed(() => {
    const { height } = props
    if (height) {
      let customHeight = height
      if (typeof customHeight === 'string') {
        if (customHeight.endsWith('px')) {
          customHeight = parseFloat(customHeight)
        }
      }
      if (typeof customHeight === 'number') {
        return customHeight
      }
      return customHeight
    }
    console.log(innerHeight)
    return innerHeight
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
