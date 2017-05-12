<template>
    <div id="story" v-bind:style="storyStyle">
        <div id="black-bg">
            <span>{{ props.title }}</span>
        </div>
    </div>
</template>

<script>
export default {
  name: 'story',
  props: ['props'],
  data () {
    return {
      storyStyle: {}
    }
  },
  created () {
    var ip = require('../../scripts/image_processor.js')
    var bgImg = new Image()
    var self = this
    bgImg.src = this.props.thumb_img_url
    bgImg.onload = function () {
      self.storyStyle = ip.imageProcessor().fillImageStyle(self.$el, this)
    }
  }
}
</script>

<style lang="scss" scoped>
  #story {
    height: 248px;
    line-height: 440px;
    & #black-bg {
        height: 100%;
        text-align: left;
        padding-left: 4px;
        background: url('../../assets/images/interfaces/story/story_black_bg.png');
        // background-color: rgba(0, 0, 0, 0.3);
        & span {
        font-size: 1.3em;
        color: white;
        padding: 10px 14px;
        // background-color: rgba(0, 0, 0, 0.67);
        }
    }
  }
</style>
