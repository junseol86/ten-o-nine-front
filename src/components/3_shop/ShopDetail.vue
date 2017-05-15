<template>
    <div id="shop-detail">
        <div id="scroll-container" v-bind:style="{height: height + 'px'}" v-on:scroll="onScroll">
          <top-bar v-bind:props="topBarProps"></top-bar>
          <div id="top-bar-space"></div>
        </div>
    </div>
</template>

<script>
import TopBar from '../0_reused/TopBar'

// const listUrl = 'http://13.124.80.145:8082/api/shops'

export default {
  components: {TopBar},
  name: 'shop-detail',
  data () {
    return {
      shopId: this.$route.params.shop_id,
      topBarProps: {
        width: 0,
        page: 'shopDetail',
        depth: 'detail',
        bgOpacity: 1
      }
    }
  },
  methods: {
    onScroll: function () {
    }
  },
  created () {
    this.height = window.innerHeight
  },
  mounted () {
    this.topBarProps.width = getComputedStyle(document.getElementById('shop-detail')).width
  }
}
</script>

<style lang="scss" scoped>
#scroll-container {
  position: relative;
  overflow: scroll;
  background-color: #222;
  & #top-bar-space {
    height: 48px;
  }
}
</style>
