<template>
    <div id="shop-menu" v-bind:style="menuStyle">
        <div id="thumbnail-container">
            <div id="thumbnail" v-bind:style="thumbnailStyle"></div>
            <div id="black-bg">
                <span>{{ props.menu_name }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import Values from '../../scripts/values.js'

export default {
  name: 'story',
  props: ['props'],
  data () {
    return {
      menuStyle: {},
      thumbnailStyle: {
        border: '1px solid #222',
        boxSizing: 'border-box',
        height: '0px',
        background: '',
        backgroundSize: '',
        backgroundPosition: ''
      }
    }
  },
  mounted () {
    this.thumbnailStyle.height = Number(getComputedStyle(document.getElementById('shop-menu')).width.replace('px', '')) * 1.2 + 'px'
    var ip = require('../../scripts/image_processor.js')
    var bgImg = new Image()
    var self = this
    bgImg.src = `${Values.values.dist}/${this.props.thumb_img_url}`
    bgImg.onload = function () {
      var thumbnailBgStyle = ip.imageProcessor().fillImageStyle(document.getElementById('thumbnail'), this)
      self.thumbnailStyle.background = thumbnailBgStyle.background
      self.thumbnailStyle.backgroundSize = thumbnailBgStyle.backgroundSize
      self.thumbnailStyle.backgroundPosition = thumbnailBgStyle.backgroundPosition
    }
  }
}
</script>

<style lang="scss" scoped>
#shop-menu {
    & #thumbnail-container {
        position: relative;
        & #black-bg {
            position: absolute;
            bottom: 0px;
            width: 100%;
            height: 60px;
            text-align: left;
            padding-left: 4px;
            background: url('../../assets/images/interfaces/shop/shop_menu_black_bg.png');
            // background-color: rgba(0, 0, 0, 0.3);
            & span {
                font-size: 1.1em;
                color: white;
                padding: 10px 10px;
                line-height: 80px;
                // background-color: rgba(0, 0, 0, 0.67);
            }
        }
    }
}
</style>
