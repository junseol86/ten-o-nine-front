<template>
  <div id="app" :style="appStyle">
      <div id="wrapper" :style="wrapperStyle">
        <!-- 페이지가 다른 곳으로 넘어가도 상태가 유지되도록 해준다. (스크롤은 따로 처리해야 함) -->
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        appStyle: {},
        wrapperStyle: {}
      }
    },
    created () {
      // 바깥 레이어 높이 창에 맞추기
      var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      var windowHeight = window.innerHeight
      var wrapperWidth = isMobile ? window.innerWidth : windowHeight * 9 / 16
      this.appStyle = {
        width: window.innerWidth + 'px',
        height: windowHeight + 'px'
      }
      // 실제 모든 요소들이 표시될 레이어 크기 맞추기
      this.wrapperStyle = {
        width: wrapperWidth + 'px'
      }
    }
  }
</script>

// npm install sass-loader node-sass style-loader --save-dev만 해주면 돌아간다
<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif, 'Malgun Gothic', 'Dotum';
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    background-color: black;    
    position: relative;
    text-align: center;
    #wrapper {
      margin: 0 auto;
      background-color: white;
      height: 100%;
    }
  }
</style>
