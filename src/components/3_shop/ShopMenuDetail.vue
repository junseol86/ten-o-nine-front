<template>
    <div id="shop-detail">
        <div id="scroll-container" v-bind:style="{height: height + 'px'}" v-on:scroll="onScroll">
          <top-bar v-bind:props="topBarProps"></top-bar>
          <div id="top-bar-space"></div>
          <div id="menu-detail" v-if="detailLoaded">
            <div id="menu-info">
                <div id="menu-image" v-bind:style="menuImageStyle"></div>
                <div id="shop-name">@{{ menuDetail.shop_name }}</div>
                <div id="menu-name">{{ menuDetail.menu_name }}</div>
            </div>
            <div id="menu-content" v-html="menuDetail.content"></div>
          </div>
        </div>
    </div>
</template>

<script>
import TopBar from '../0_reused/TopBar'
const listUrl = 'http://13.124.80.145:8082/api/menus'

export default {
  components: {TopBar},
  name: 'shop-detail',
  data () {
    return {
      menuId: 0,
      topBarProps: {
        userToken: '',
        width: 0,
        page: 'shopDetail',
        depth: 'menu',
        bgOpacity: 1
      },
      menuImageStyle: {
        background: '',
        backgroundSize: '',
        backgroundPosition: ''
      },
      menuDetail: {},
      detailLoaded: false
    }
  },
  methods: {
    initialLoad: function () {
      this.topBarProps.userToken = this.$route.params.user_token
      this.menuId = this.$route.params.menu_id
      this.detailLoaded = false
    },
    getDetail: function () {
      if (!this.is_last) {
        this.$http.get(`${listUrl}/${this.menuId}`)
          .then((result) => {
            this.menuDetail = result.data
            this.detailLoaded = true
            this.setMenuImage()
          })
      }
    },
    setMenuImage: function () {
      var ip = require('../../scripts/image_processor.js')
      var bgImg = new Image()
      var self = this
      bgImg.src = this.menuDetail.thumb_img_url
      bgImg.onload = function () {
        var resultStyle = ip.imageProcessor().fillImageStyle(document.getElementById('menu-image'), this)
        console.log(resultStyle)
        self.menuImageStyle.background = resultStyle.background
        self.menuImageStyle.backgroundSize = resultStyle.backgroundSize
        self.menuImageStyle.backgroundPosition = resultStyle.backgroundPosition
      }
    },
    onScroll: function () {
      this.topBarProps.bgOpacity = document.getElementById('scroll-container').scrollTop > 48 ? 0.3 : 1
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
  & #top-bar-space {
    height: 48px;
  }
  & #menu-info {
    background-color: black;
    padding: 12px 0 36px;
    & #menu-image {
        width: 160px;
        height: 200px;
        margin: 0 auto;
    }
    & #shop-name {
        color:white;
        margin: 12px;
        font-size: 0.9em;
        opacity: 0.5;
    }
    & #menu-name {
        color:white;
        font-size: 1.4em;
    }
  }
  & #menu-content {
      padding: 24px;
  }
}
</style>
