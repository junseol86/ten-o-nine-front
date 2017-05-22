<template>
    <div id="shop" v-bind:style="shopStyle">
        <div id="thumbnail-container">
            <div id="thumbnail" v-bind:style="thumbnailStyle"></div>
        </div>
        <div id="description">
            <span v-bind:style="{color: areaColorPicked}">{{ props.area }}</span><br>
            <span>{{ props.shop_name }}</span>
        </div>
    </div>
</template>

<script>
import Values from '../../scripts/values.js'

export default {
  name: 'shop',
  props: ['props'],
  data () {
    return {
      shopStyle: {},
      thumbnailStyle: {
        height: '0px',
        background: '',
        backgroundSize: '',
        backgroundPosition: ''
      },
      areaColors: ['#ffce74', '#ff7a7c', '#c4cb61', '#70d6ef', '#d070ef'],
      areaColorPicked: ''
    }
  },
  created () {
    this.areaColorPicked = this.areaColors[Math.floor(Math.random() * this.areaColors.length)]
  },
  mounted () {
    // console.log(this.props.thumb_img_url.includes('http') ? this.props.thumb_img_url : `${Values.values.dist}/${this.props.thumb_img_url}`)
    this.thumbnailStyle.height = getComputedStyle(document.getElementById('shop')).width
    var ip = require('../../scripts/image_processor.js')
    var bgImg = new Image()
    var self = this
    bgImg.src = this.props.thumb_img_url.includes('http') ? this.props.thumb_img_url : `${Values.values.dist}/${this.props.thumb_img_url}`
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
    #description {
        height: 64px;
        text-align: right;
        padding: 12px;
        & span {
            color: #444;
            // color: white;
            line-height: 18px;
        }
    }
</style>

