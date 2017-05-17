<template>
    <div id="intro" v-bind:style="introStyle">
      <div id="innerWrapper">
        <img v-bind:style="introLogoStyle" src="../../assets/images/interfaces/intro_logo.png">
        <div id="slogan" v-bind:style="sloganStyle">
          <span>{{ clearLetters }}</span><span id="transparentLetters">{{ transparentLetters }}</span>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'intro',
  data () {
    return {
      introStyle: {},
      introLogoStyle: {},
      sloganStyle: [],
      transparentLetters: '나만의 밤이 시작되는 시간',
      clearLetters: '',
      interval: null
    }
  },
  methods: {
    sloganLoading: function () {
      if (this.transparentLetters.length !== 0) {
        this.clearLetters += this.transparentLetters[0]
        this.transparentLetters = this.transparentLetters.slice(1, this.transparentLetters.length)
      } else {
        clearInterval(this.interval)
        this.$router.replace('usertoken/story_list')
      }
    }
  },
  created () {
    var ip = require('../../scripts/image_processor.js')
    var bgImg = new Image()
    var backgrounds = [
      'http://pds26.egloos.com/pmf/201704/27/38/c0222438_590193b68f3ce.jpg',
      'http://pds21.egloos.com/pmf/201704/27/38/c0222438_590193be372cf.jpg',
      'http://pds25.egloos.com/pmf/201704/27/38/c0222438_590193bf22ec5.jpg',
      'http://pds21.egloos.com/pmf/201704/27/38/c0222438_590193c05a5a8.jpg',
      'http://pds27.egloos.com/pmf/201704/27/38/c0222438_590193c1e6812.jpg',
      'http://pds27.egloos.com/pmf/201704/27/38/c0222438_590193c2e7009.jpg',
      'http://pds21.egloos.com/pmf/201704/27/38/c0222438_590193c4db0ed.jpg'
    ]
    bgImg.src = backgrounds[Math.floor(Math.random() * 7)]
    var self = this
    bgImg.onload = function () {
      self.introStyle = ip.imageProcessor().fillImageStyle(self.$el, this)
    }
  },
  mounted () {
    this.introLogoStyle = {
      width: `${this.$el.offsetWidth}px`,
      height: `${this.$el.offsetWidth * 8 / 9}px`
    }
    this.sloganStyle = {
      width: `${this.$el.offsetWidth}px`
    }
    this.interval = setInterval(this.sloganLoading, 80)
  }
}
</script>

<style lang="scss" scoped>
  #intro {
    width: 100%;
    height: 100%;
    & #innerWrapper {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      position: relative;
      & #slogan {
        position: absolute;
        bottom: 24px;
        color:white;
        font-size: 1.1em;
        & #transparentLetters {
          opacity: 0.2;
        }
      }
    }
  }
</style>
