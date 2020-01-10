<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
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
import { mapGetters } from 'vuex'
import lineChart from '@/components/charts/line-charts.vue'

export default {
  name: 'Dashboard',
  components: { lineChart },
  data() {
    return {
      platformTitle: 'ds',
      Passortloading: false,
      devicePassortTrend: {
        data: {
          '2020-01-10': { count: 0 },
          '2020-01-09': { count: 1 },
          '2020-01-08': { count: 0 },
          '2020-01-07': { count: 1 },
          '2020-01-06': { count: 0 },
          '2020-01-05': { count: 0 },
          '2020-01-04': { count: 0 },
          '2020-01-03': { count: 0 },
          '2020-01-02': { count: 0 },
          '2020-01-01': { count: 0 },
          '2019-12-31': { count: 0 },
          '2019-12-30': { count: 0 },
          '2019-12-29': { count: 0 },
          '2019-12-28': { count: 0 },
          '2019-12-27': { count: 0 },
          '2019-12-26': { count: 0 },
          '2019-12-25': { count: 0 },
          '2019-12-24': { count: 0 },
          '2019-12-23': { count: 0 },
          '2019-12-22': { count: 0 },
          '2019-12-21': { count: 0 },
          '2019-12-20': { count: 0 },
          '2019-12-19': { count: 1 },
          '2019-12-18': { count: 0 },
          '2019-12-17': { count: 0 },
          '2019-12-16': { count: 0 },
          '2019-12-15': { count: 0 },
          '2019-12-14': { count: 0 },
          '2019-12-13': { count: 0 },
          '2019-12-12': { count: 0 }
        },
        code: 200,
        msg: 'success'
      }
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  methods: {
    handleDateChange() {
      console.log(11)
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
