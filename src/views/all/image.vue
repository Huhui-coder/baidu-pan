<template>
  <div>
    <tab-list />
    <div>
      <div v-viewer class="images">
        <img src="./1.jpg">
        <img src="./2.jpg">
      </div>
    </div>
  </div>
</template>

<script>
import tabList from '@/components/tabList/index'
export default {
  components: { tabList },
  data() {
    return {
      images: ['1.jpg', '2.jpg']
    }
  }
}
</script>

