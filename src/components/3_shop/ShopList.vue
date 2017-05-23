<template>
    <div id="shop-list">
        <div id="scroll-container" v-bind:style="scrollContainerStyle" v-on:scroll="onScroll">
          <top-bar v-bind:props="topBarProps" v-bind:onChangeShopType="initialLoad"></top-bar>
          <div id="top-bar-space"></div>
          <div id="shop-list-container">
            <div class="shop-container" v-for="shop in shops" v-on:click="toDetail(shop.idx)">
                <shop :key="shop.idx" v-bind:props="shop" v-bind:shopType="topBarProps.shopType"></shop>
            </div>
          </div>
          <div v-if="!is_last" id="loading">Loading...</div>
        </div>
    </div>
</template>

<script>
import TopBar from '../0_reused/TopBar'
import Shop from './Shop'
import Values from '../../scripts/values.js'

const listUrl = `${Values.values.dist}/api/shops`

export default {
  components: {TopBar, Shop},
  name: 'shop-list',
  data () {
    return {
      shops: [],
      region: '',
      searchWord: '',
      listPage: 1,
      is_last: false,
      // 상세페이지에서 돌아온 것이 아니라면 리스트를 다시 로드
      toRefresh: true,
      topBarProps: {
        userToken: '',
        shopType: '',
        width: 0,
        page: 'shopList',
        depth: 'list',
        bgOpacity: 1,
        onNavigate: function () {
          this.toRefresh = true
        }
      },
      scrollContainerStyle: {
        height: '',
        backgroundColor: ''
      },
      height: 0,
      scrollTop: 0
    }
  },
  methods: {
    getList: function () {
      if (!this.is_last) {
        this.$http.get(`${listUrl}?region=${this.region}&search=${this.searchWord}&page=${this.listPage}&st=${this.topBarProps.shopType === 'cafe' ? 'C' : 'A'}`)
            .then((result) => {
              this.shops = this.shops.concat(result.data.list)
              this.is_last = result.data.is_last
              this.listPage++
            })
      }
    },
    initialLoad: function () {
      this.topBarProps.userToken = this.$route.params.user_token
      this.topBarProps.shopType = this.$route.params.type
      this.scrollContainerStyle.backgroundColor = this.$route.params.type === 'cafe' ? 'white' : '#111'
      this.shops = []
      this.is_last = false
      this.listPage = 1
      this.getList()
    },
    onScroll: function () {
      this.topBarProps.bgOpacity = document.getElementById('scroll-container').scrollTop > 48 ? 0.3 : 1
      if (document.getElementById('scroll-container').scrollTop + this.height === document.getElementById('scroll-container').scrollHeight) {
        this.getList()
      }
    },
    toDetail: function (shopId) {
      this.toRefresh = false
      this.scrollTop = document.getElementById('scroll-container').scrollTop
      this.$router.push(`shop_detail/${shopId}`)
    }
  },
  created () {
    this.scrollContainerStyle.height = window.innerHeight + 'px'
    // this.getList()
  },
  mounted () {
    this.topBarProps.width = getComputedStyle(document.getElementById('shop-list')).width
  },
  activated () {
    if (this.toRefresh) {
      // 상세페이지에서 돌아온 상태가 아닐 시 초기 로드
      this.initialLoad()
    } else {
      this.toRefresh = true
      // 상세페이지에서 돌아온 상태면 이전 스크롤 위치로 복귀
      document.getElementById('scroll-container').scrollTop = this.scrollTop
    }
  }
}
</script>

<style lang="scss" scoped>
#scroll-container {
  position: relative;
  overflow: scroll;
  #shop-list-container {
    overflow: hidden;
    &:after {
        clear: both;
    }
    & .shop-container {
        width: 50%;
        float: left;
    }
  }
  & #top-bar-space {
    height: 48px;
  }
  & #loading {
    color: white;
    background-color: black;
    text-align: center;
    height: 48px;
    line-height: 48px;
  }
}
</style>
