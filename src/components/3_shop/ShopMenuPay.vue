<template>
    <div id="menu-pay">
        <top-bar v-bind:props="topBarProps"></top-bar>
        <div id="bg" v-bind:style="bgStyle">
        </div>
        <div v-if="!isLoading" id="logo-container">
          <img v-if="!isLoading" id="logo" src="../../assets/images/interfaces/shop/pay_screen_logo.png"/>
        </div>
        <div v-if="isLoading" id="loading-container">
          <div>
            <img id="loading" class="spin" src="../../assets/images/interfaces/shop/pay_screen_loading.png"/>
          </div>
        </div>
        <div id="shop-name">@{{ shopName }}</div>
        <div id="status">{{ isLoading ? '결재 중' : menuName }}</div>
        <div id="slideBar" v-bind:style="{left: slideBarLeft}">
            <div v-bind:style="buttonContainerStyle" v-if="isAvailable"  v-on:touchstart="touchStart" v-on:touchmove="touchMove" v-on:touchend="touchEnd">
                <div v-bind:style="buttonStyle"></div>
            </div>
            <span v-if="isAvailable"  v-bind:style="slideBarTextStyle">직원에게 제시하세요</span>
            <div id="see-you-tomorrow" v-if="!isAvailable">
              내일 또 이용해 주세요
            </div>
        </div>
    </div>
</template>

<script>
import TopBar from '../0_reused/TopBar'
import Background from '../../assets/images/backgrounds/liquid_bg_orange_clear.jpg'
import Values from '../../scripts/values.js'

const availableUrl = `${Values.values.dist}/api/user/coupon`

export default {
  components: {TopBar},
  name: 'shop-detail',
  computed: {
    userToken () {
      return this.$store.getters.getUserToken
    }
  },
  data () {
    return {
      shopName: '',
      menuName: '',
      availabilityChecked: false,
      isAvailable: true,
      isLoading: false,
      slideBarLeft: '0px',
      touchStartPoint: 0,
      dragAmount: 0,
      topBarProps: {
        width: 0,
        page: 'menuPay',
        depth: 'pay',
        bgOpacity: 0
      },
      bgStyle: {
        position: 'absolute',
        width: '',
        height: '',
        backgroundImage: 'url(' + Background + ')',
        backgroundSize: '',
        backgroundPosition: '',
        opacity: 1
      },
      buttonContainerStyle: {
        width: '64px',
        height: '64px',
        position: 'absolute',
        left: '0px'
      },
      buttonStyle: {
        width: '40px',
        height: '40px',
        margin: '8px',
        borderRadius: '28px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        border: '3px solid white'
      },
      slideBarTextStyle: {
        color: 'white',
        lineHeight: '62px',
        paddingLeft: '36px',
        fontSize: '1.1em',
        visibility: 'visible'
      }
    }
  },
  methods: {
    setBackground: function () {
      var ip = require('../../scripts/image_processor.js')
      var bgImg = new Image()
      var self = this
      bgImg.src = Background
      bgImg.onload = function () {
        var resultStyle = ip.imageProcessor().fillImageStyle(document.getElementById('bg'), this)
        self.bgStyle.backgroundSize = resultStyle.backgroundSize
        self.bgStyle.backgroundPosition = resultStyle.backgroundPosition
      }
    },
    availabilityCheck: function () {
      this.$http.get(`${availableUrl}`, {
        headers: {
          'Content-Type': 'application/json',
          'access-token': this.userToken
        }
      })
      .then((result) => {
        this.isLoading = false
        this.available = result.data
        this.availabilityChecked = true
        this.isAvailable = result.data.valid
        if (this.availabilityChecked) {
          this.bgStyle.opacity = result.data.valid ? 1 : 0.5
        }
      }).catch(err => {
        console.log(err)
      })
    },
    useCoupon: function () {
      var querystring = require('querystring')
      this.isLoading = true
      this.$http.post(`${availableUrl}`,
      querystring.stringify({
        'menu_idx': 1000001,
        'shop_idx': 1000001
      }),
        {
          headers: {
            'Content-Type': 'application/json',
            'access-token': this.userToken
          },
          params: {
            'menu_idx': 1000001,
            'shop_idx': 1000001
          }
        })
      .then((result) => {
        this.availabilityCheck()
      }).catch(err => {
        console.log(err)
      })
    },
    touchStart: function (event) {
      this.touchStartPoint = event.touches[0].clientX
    },
    touchMove: function (event) {
      this.dragAmount = event.touches[0].clientX - this.touchStartPoint
      if (this.dragAmount > 0 && this.dragAmount < 196) {
        this.buttonContainerStyle.left = this.dragAmount + 'px'
        this.slideBarTextStyle.visibility = 'hidden'
        this.bgStyle.opacity = (196 - this.dragAmount / 2) / 196
      }
    },
    touchEnd: function (evnet) {
      if (this.dragAmount > 196) {
        this.useCoupon()
      } else {
        this.dragAmount = 0
        this.buttonContainerStyle.left = '0px'
        this.slideBarTextStyle.visibility = 'visible'
        this.bgStyle.opacity = 1
      }
    }
  },
  created () {
    this.height = window.innerHeight
    this.bgStyle.width = window.innerWidth + 'px'
    this.bgStyle.height = window.innerHeight + 'px'
    this.slideBarLeft = (window.innerWidth - 256) / 2 + 'px'
    this.setBackground()
  },
  activated () {
    this.shopName = this.$route.params.shop_name
    this.menuName = this.$route.params.menu_name
    this.availabilityCheck()
  }
}
</script>

<style lang="scss" scoped>
#menu-pay {
    position: relative;
    height: 100%;
    background-color: black;
    & #logo {
        width: 160px;
        height: 160px;
        opacity: 0.99;
        margin-top: 112px;
    }
    & #loading-container {
        opacity: 0.99;
        padding-top: 112px;
      & > div {
        width: 160px;
        height: 160px;
        margin: auto;
        position: relative;
      }
    }
    & #loading {
        width: 160px;
        height: 160px;
        opacity: 0.99;
    }
    & #shop-name {
      color: white;
      opacity: 0.67;
      font-size: 1.1em;
      margin: 36px 0 12px;
    }
    & #status {
        opacity: 0.99;
        color: white;
        font-size: 2em;
        font-weight: bold;
    }
    & #slideBar {
        position: absolute;
        width: 256px;
        height: 62px;
        bottom: 40px;
        opacity: 0.99;
        background-color: rgba(0, 0, 0, 0.33);
        border: 1px solid white;
        border-radius: 32px;
        text-align: center;
    }
    & #see-you-tomorrow {
        color: white;
        font-size: 1.2em;
        opacity: 0.99;
        bottom: 48px;
        height: 62px;
        line-height: 62px;
    }
}

@-webkit-keyframes spinnerRotate
{
    from{-webkit-transform:rotate(0deg);}
    to{-webkit-transform:rotate(360deg);}
}
@-moz-keyframes spinnerRotate
{
    from{-moz-transform:rotate(0deg);}
    to{-moz-transform:rotate(360deg);}
}
@-ms-keyframes spinnerRotate
{
    from{-ms-transform:rotate(0deg);}
    to{-ms-transform:rotate(360deg);}
}
.spin{
    -webkit-animation-name: spinnerRotate;
    -webkit-animation-duration: 2s;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-timing-function: linear;
    -moz-animation-name: spinnerRotate;
    -moz-animation-duration: 2s;
    -moz-animation-iteration-count: infinite;
    -moz-animation-timing-function: linear;
    -ms-animation-name: spinnerRotate;
    -ms-animation-duration: 2s;
    -ms-animation-iteration-count: infinite;
    -ms-animation-timing-function: linear;
}

</style>
