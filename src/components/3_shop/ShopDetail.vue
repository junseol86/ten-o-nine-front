<template>
    <div id="shop-detail">
        <div id="scroll-container" v-bind:style="{height: height + 'px'}" v-on:scroll="onScroll">
          <top-bar v-bind:props="topBarProps"></top-bar>
          <div id="top-bar-space"></div>
          <div v-if="detailLoaded" id="shop-detail-container">
            <div id="shop-image" v-bind:style="shopImageStyle"></div>
            <span id="shop-name">{{ shopDetail.shop_name }}</span>
            <div id="area-and-address">{{ shopDetail.area }} | {{ shopDetail.addr}}</div>
            <div id="tels"><span v-for="tel in shopDetail.tels">{{ tel }}</span></div>
            <div id="see-menu-btn">
              <span v-on:click="scrollToMenu()">한 잔 메뉴 보기</span>
            </div>
            <story v-for="story in shopDetail.stories" :key="story.idx" v-bind:props="story"></story>
            <div id="below-stories">
              <div id="sites" v-if="shopDetail.sites.length > 0">
                <div id="sites-title">사이트 바로가기</div>
                <div class="site" v-for="site in shopDetail.sites">
                  <span>●</span>
                  {{ site }}
                  </div>
              </div>
              <div id="menus" v-if="shopDetail.sites.length > 0">
                <div id="menus-title">한 잔 메뉴</div>
                <div id="menu-list">
                  <div class="menu-container" v-for="menu in shopDetail.menus" :key="menu.idx" >
                    <shop-menu v-bind:props="menu"></shop-menu>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import TopBar from '../0_reused/TopBar'
import Story from '../2_story/Story'
import ShopMenu from './ShopMenu'

const listUrl = 'http://13.124.80.145:8082/api/shops'

export default {
  components: {TopBar, Story, ShopMenu},
  name: 'shop-detail',
  data () {
    return {
      shopId: 0,
      shopDetail: {},
      detailLoaded: false,
      topBarProps: {
        width: 0,
        page: 'shopDetail',
        depth: 'detail',
        bgOpacity: 1
      },
      shopImageStyle: {
        height: '320px',
        background: '',
        backgroundSize: '',
        backgroundPosition: ''
      }
    }
  },
  methods: {
    initialLoad: function () {
      this.shopId = this.$route.params.shop_id
      this.detailLoaded = false
    },
    getDetail: function () {
      if (!this.is_last) {
        this.$http.get(`${listUrl}/${this.shopId}`)
            .then((result) => {
              this.shopDetail = result.data
              console.log(this.shopDetail)
              this.detailLoaded = true
              this.setShopImage()
            })
      }
    },
    setShopImage: function () {
      var ip = require('../../scripts/image_processor.js')
      var bgImg = new Image()
      var self = this
      bgImg.src = this.shopDetail.thumb_img_url
      bgImg.onload = function () {
        var resultStyle = ip.imageProcessor().fillImageStyle(document.getElementById('shop-image'), this)
        console.log(resultStyle)
        self.shopImageStyle.background = resultStyle.background
        self.shopImageStyle.backgroundSize = resultStyle.backgroundSize
        self.shopImageStyle.backgroundPosition = resultStyle.backgroundPosition
      }
    },
    onScroll: function () {
      this.topBarProps.bgOpacity = document.getElementById('scroll-container').scrollTop > 48 ? 0.3 : 1
    },
    scrollToMenu: function () {
      document.getElementById('scroll-container').scrollTop = document.getElementById('menus').offsetTop
      console.log(document.getElementById('menus').offsetTop)
    }
  },
  created () {
    this.height = window.innerHeight
  },
  mounted () {
    this.topBarProps.width = getComputedStyle(document.getElementById('shop-detail')).width
  },
  activated () {
    this.initialLoad()
    this.getDetail()
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
  & #shop-detail-container {
    position: relative;
    background-color: white;
    & #shop-name {
      position: absolute;
      right: 24px;
      top: 294px;
      color: white;
      background-color: black;
      border: 1px solid white;
      padding: 12px;
      font-size: 1.7em;
    }
    & #area-and-address {
      padding: 60px 0 8px 0;
    }
    & #tels {
      padding: 0 0 20px 0;
      & span {
        color: #a00354;
        padding: 0 8px;
        border-right: 1px solid #bfbfbf;
        &:last-child {
          border-right: 0;
        }
      }
    }
    & #see-menu-btn {
      padding: 12px 0 36px;
      & span {
        padding: 10px 16px;
        border: 1px solid #dedede;
        border-radius: 20px;      
        font-size: 1.1em;
      }
    }

    & #below-stories {
      background-color: #222;
      color: white;
      
      & #sites {
        text-align: left;
        & #sites-title {
          padding: 36px 12px 12px;
          font-size: 1.1em;
          font-weight: bold;
        }
        & .site {
          padding: 16px 8px 16px 16px;
          border-top: 1px solid #222;
          background-color: #333;
          font-size: 0.9em;
          & span {
            color: #222;
            margin-right: 4px;
            font-size: 0.5em;
          }
        }
      }
      
      & #menus {
        text-align: left;
        & #menus-title {
          padding: 36px 12px 12px;
          font-size: 1.1em;
          font-weight: bold;
        }
        & #menu-list {
          overflow: hidden;
          &:after {
            clear:both;
          }
          & .menu-container {
            float: left;
            width: 50%;
          }
        }
      }

    }
    
  }
}
</style>