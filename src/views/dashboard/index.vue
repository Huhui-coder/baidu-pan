<template>
  <div class="dashboard-container">
    <div class="dashboard-text" />
    <div class="wrap">
      <line-chart
        :title="platformTitle"
        :type="'platform'"
        :data="devicePassortTrend"
        :loading="Passortloading"
        @handleTimeChange="handleDateChange"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import lineChart from '@/components/charts/line-charts.vue'

export default {
  name: 'Dashboard',
  components: { lineChart },

  data() {
    return {
      platformTitle: '统计图',
      Passortloading: false,
      userId: localStorage.getItem('userId'),
      devicePassortTrend: {}
    }
  },
  computed: {
  },
  mounted() {
    this.fetch()
  },
  methods: {
    ...mapActions('user', ['fetchAnaly']),
    async fetch(type) {
      const data = {
        operaTypeId: type || 1,
        searchDayNumber: 30,
        userId: this.userId
      }
      const res = await this.fetchAnaly(data)
      console.log(res)
      this.devicePassortTrend = res.data
    },
    handleDateChange(res) {
      this.fetch(res.type)
      console.log(res)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
