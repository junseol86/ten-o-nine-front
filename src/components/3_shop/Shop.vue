<template>
    <div id="shop" v-bind:style="shopStyle">
        <div id="thumbnail-container">
            <div id="thumbnail" v-bind:style="thumbnailStyle"></div>
        </div>
        <div id="description">
            <span v-bind:style="areaStyle">{{ props.area }}</span><br>
            <span v-bind:style="shopNameStyle">{{ props.shop_name }}</span>
        </div>
    </div>
</template>

<script>
import Values from '../../scripts/values.js'

export default {
  name: 'shop',
  props: ['props', 'shopType'],
  data () {
    return {
      shopStyle: {},
      thumbnailStyle: {
        height: '0px',
        background: '',
        backgroundSize: '',
        backgroundPosition: ''
      },
      shopNameStyle: {
        color: '',
        fontSize: '1.1em',
        fontWeight: 'bold'
      },
      // areaColors: ['#ffce74', '#ff7a7c', '#c4cb61', '#70d6ef', '#d070ef'],
      areaStyle: {
        fontSize: '0.9em',
        color: ''
      }
    }
  },
  mounted () {
    this.shopNameStyle.color = this.shopType === 'cafe' ? '#555' : 'white'
    this.areaStyle.color = this.shopType === 'cafe' ? '#e9c27a' : '#9a4f5f'
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
            line-height: 18px;
        }
    }
</style>

