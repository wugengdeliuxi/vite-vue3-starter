<template>
  <svg aria-hidden="true" class="svg-icon" :class="className">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script lang="ts">
// import type { CSSProperties } from 'vue';
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'SvgIcon',
  props: {
    prefix: {
      type: String,
      default: 'icon'
    },
    name: {
      type: String,
      required: true
    },
    size: {
      type: [Number, String],
      default: 16
    }
  },
  setup(props) {
    const symbolId = computed(() => `#${props.prefix}-${props.name}`)
    const className = computed(() => `svg-icon-${props.name}`)
    // const getStyle = computed((): CSSProperties => {
    // const { size } = props;
    // let s = `${size}`;
    // s = `${s.replace('px', '')}px`;
    //   return {
    //     width: s,
    //     height: s,
    //   };
    // });

    return {
      symbolId,
      // getStyle,
      className
    }
  }
})
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
