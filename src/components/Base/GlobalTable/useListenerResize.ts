import { throttle } from 'lodash'
import { Ref } from 'vue'

export default function userListenerResize(innerHeight: Ref<number>) {
  const listenerResize = throttle((): void => {
    const domBody: Element = document.getElementsByClassName('app-wrapper')[0]
    const domSearch: Element = document.getElementsByClassName('global-search')[0]
    const domBodyHeight: number = domBody?.clientHeight
    const domSearchHeight: number = domSearch?.clientHeight
    innerHeight.value = domBodyHeight - domSearchHeight - 48 - 16 - 16 - 24 - 28
  }, 200)

  return {
    listenerResize
  }
}
