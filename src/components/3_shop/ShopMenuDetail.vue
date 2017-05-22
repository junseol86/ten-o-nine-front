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
          <div id="bottom-space"></div>
          <div v-if="availabilityChecked" id="bottom-buttons" v-bind:style="{width: topBarProps.width}" v-on:click="goToPay()">
            <div v-bind:style="bottomButtonStyle"></div>
            <img v-if="available" src="../../assets/images/interfaces/shop/select_drink_check.png">
            <span id="text">{{ available ? '메뉴 선택' : '오늘의 한 잔은 소진되었습니다.' }}</span>
          </div>
        </div>
    </div>
</template>

<script>
import TopBar from '../0_reused/TopBar'
import Background from '../../assets/images/backgrounds/liquid_bg_orange_clear.jpg'
const detailUrl = 'http://13.124.80.145:8082/api/menus'
const availableUrl = `http://13.124.80.145:8082/api/users`
// const availableUrl = `http://localhost:8082/api/users`

export default {
  components: {TopBar},
  name: 'shop-detail',
  data () {
    return {
      menuId: 0,
      availabilityChecked: false,
      available: false,
      backgroundHeight: 0,
      topBarProps: {
        userToken: '',
        width: 0,
        page: 'menuDetail',
        depth: 'menu',
        bgOpacity: 1
      },
      menuImageStyle: {
        background: '',
        backgroundSize: '',
        backgroundPosition: ''
      },
      bottomButtonStyle: {
        width: '',
        opacity: 1,
        height: '56px',
        position: 'absolute',
        backgroundImage: 'url(' + Background + ')',
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
        this.$http.get(`${detailUrl}/${this.menuId}`)
          .then((result) => {
            this.menuDetail = result.data
            this.detailLoaded = true
            this.setMenuImage()
          })
      }
    },
    checkAvailable: function () {
      this.$http.get(`${availableUrl}/available`)
      // this.$http.get(`${availableUrl}/available`, {
      //   headers: { 'access_token': 'haha' }
      // })
      .then((result) => {
        this.available = result.data
        this.bottomButtonStyle.opacity = result.data ? 1 : 0.3
        this.availabilityChecked = true
      }).catch(err => {
        console.log(err)
      })
    },
    goToPay: function () {
      if (this.available) {
        this.$router.push('../menu_pay')
      }
    },
    setMenuImage: function () {
      var ip = require('../../scripts/image_processor.js')
      var bgImg = new Image()
      var self = this
      bgImg.src = this.menuDetail.thumb_img_url
      bgImg.onload = function () {
        var resultStyle = ip.imageProcessor().fillImageStyle(document.getElementById('menu-image'), this)
        self.menuImageStyle.background = resultStyle.background
        self.menuImageStyle.backgroundSize = resultStyle.backgroundSize
        self.menuImageStyle.backgroundPosition = resultStyle.backgroundPosition
      }
    },
    onScroll: function () {
      var scrollContainer = document.getElementById('scroll-container')
      var menuDetail = document.getElementById('menu-detail')
      this.topBarProps.bgOpacity = scrollContainer.scrollTop > 48 ? 0.3 : 1
      var windowHeight = window.innerHeight
      var scrollHeight = Number(getComputedStyle(menuDetail).height.replace('px', ''))
      var scrollable = scrollHeight - windowHeight + 104
      var bgMovable = this.backgroundHeight - 56
      this.bottomButtonStyle.backgroundPosition = `0 -${scrollContainer.scrollTop * bgMovable / scrollable}px`
    }
  },
  created () {
    this.height = window.innerHeight
  },
  mounted () {
    this.topBarProps.width = getComputedStyle(document.getElementById('shop-detail')).width
    this.bottomButtonStyle.width = getComputedStyle(document.getElementById('shop-detail')).width
    this.backgroundHeight = 772 * Number(this.bottomButtonStyle.width.replace('px', '')) / 1280
    this.bottomButtonStyle.backgroundSize = `${this.bottomButtonStyle.width} ${this.backgroundHeight}px`
    // this.bottomButtonStyle.backgroundPosition = `0 ${(this.backgroundHeight - 56 / 2)}px`
  },
  activated () {
    this.initialLoad()
    this.getDetail()
    this.checkAvailable()
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
      background-color: #222;
  }
  & #bottom-space {
    height: 56px;
  }
  & #bottom-buttons {
    position: fixed;
    bottom: 0px;
    height: 56px;
    color: white;
    line-height: 56px;
    font-size: 1.3em;
    background-color: black;
    & img {
      width: 20px;
      height: 20px;
      opacity: 0.8;
      vertical-align: middle;
      margin-right: 4px;
    }
    & #text {
      opacity: 0.99;
    }
  }
}
</style>
