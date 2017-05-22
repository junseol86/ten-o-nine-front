<template>
    <div id="story-list">
        <div id="scroll-container" v-bind:style="{height: height + 'px'}" v-on:scroll="onScroll">
          <top-bar v-bind:props="topBarProps"></top-bar>
          <div id="top-bar-space"></div>
          <story v-for="story in stories" :key="story.idx" v-bind:props="story"></story>
          <div v-if="!is_last" id="loading">Loading...</div>
        </div>
    </div>
</template>

<script>
import TopBar from '../0_reused/TopBar'
import Story from './Story'
import Values from '../../scripts/values.js'

const listUrl = `${Values.values.dev}/api/stories`

export default {
  components: {TopBar, Story},
  name: 'story-list',
  data () {
    return {
      height: 0,
      stories: [],
      listPage: 1,
      is_last: false,
      // 상세페이지에서 돌아온 것이 아니라면 리스트를 다시 로드
      toRefresh: true,
      topBarProps: {
        userToken: '',
        width: 0,
        page: 'storyList',
        depth: 'list',
        bgOpacity: 1,
        onNavigate: function () {
          this.toRefresh = true
        }
      }
    }
  },
  methods: {
    initialLoad () {
      this.topBarProps.userToken = this.$route.params.user_token
    },
    getList: function () {
      if (!this.is_last) {
        this.$http.get(`${listUrl}?page=${this.listPage}`)
            .then((result) => {
              this.stories = this.stories.concat(result.data.list)
              this.is_last = result.data.is_last
              this.listPage++
            })
      }
    },
    onScroll: function () {
      this.topBarProps.bgOpacity = document.getElementById('scroll-container').scrollTop > 48 ? 0.3 : 1
      if (document.getElementById('scroll-container').scrollTop + this.height === document.getElementById('scroll-container').scrollHeight) {
        this.getList()
      }
    }
  },
  created () {
    this.height = window.innerHeight
    this.getList()
  },
  mounted () {
    this.topBarProps.width = getComputedStyle(document.getElementById('story-list')).width
  },
  // keep-alive를 사용한 상태에서 다른 사이트를 방문했다가 되돌아올 시 실행된다
  activated () {
    this.initialLoad()
  }
}
</script>

<style lang="scss" scoped>
#scroll-container {
  position: relative;
  overflow: scroll;
  background-color: black;
  & #top-bar-space {
    height: 48px;
  }
  & #loading {
    color: white;
    background-color: black;
    text-align: center;
    height: 48px;
    line-height: 48px;
  }
}
</style>
