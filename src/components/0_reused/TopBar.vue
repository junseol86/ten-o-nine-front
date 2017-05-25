<template>
    <div id="top-bar" v-bind:style="{width: props.width}">
        <div id="background" v-bind:style="{opacity: props.bgOpacity}"></div>
        <div class="navigation" v-if="!isSearching && props.depth==='list'" v-on:click="routeTo(`../story_list`)">
            <img v-if="props.page==='storyList'" class="non-trans" src="../../assets/images/interfaces/top_bar/nav_story_on.png">
            <img v-else class="transparent" src="../../assets/images/interfaces/top_bar/nav_story.png">
        </div>
        <div class="navigation" v-if="!isSearching && props.depth==='list'" v-on:click="routeTo(`../shop_list/cafe`)">
            <img v-if="props.page==='shopList' && props.shopType==='cafe'" class="non-trans" src="../../assets/images/interfaces/top_bar/nav_shop_cafe_on.png">
            <img v-else class="transparent" src="../../assets/images/interfaces/top_bar/nav_shop_cafe.png">
        </div>
        <div class="navigation" v-if="!isSearching && props.depth==='list'" v-on:click="routeTo(`../shop_list/bar`)">
            <img v-if="props.page==='shopList' && props.shopType==='bar'" class="non-trans" src="../../assets/images/interfaces/top_bar/nav_shop_bar_on.png">
            <img v-else class="transparent" src="../../assets/images/interfaces/top_bar/nav_shop_bar.png">
        </div>
        <div class="navigation" v-if="!isSearching && props.depth==='list'">
            <img v-if="props.page==='likeList'" class="non-trans" src="../../assets/images/interfaces/top_bar/nav_like_on.png">
            <img v-else class="transparent" src="../../assets/images/interfaces/top_bar/nav_like.png">
        </div>
        <div class="navigation" v-if="props.depth!=='list'" v-on:click="goBack()">
            <img class="non-trans" src="../../assets/images/interfaces/top_bar/nav_back.png">
        </div>
        <div class="navigation" v-if="props.depth==='detail'">
            <img class="non-trans" src="../../assets/images/interfaces/top_bar/nav_like.png">
        </div>
        <div class="right">
            <img class="non-trans" src="../../assets/images/interfaces/top_bar/top_bar_menu.png">
        </div>
        <div v-if="!isSearching && props.page==='shopList'" class="right" v-on:click="setSearching(true)">
            <img class="non-trans" src="../../assets/images/interfaces/top_bar/top_bar_search.png">
        </div>
        <div v-if="isSearching && props.page==='shopList'" class="right" v-on:click="setSearching(false)">
            <img class="non-trans" src="../../assets/images/interfaces/top_bar/top_bar_x.png">
        </div>
        <div id="input-container" v-if="isSearching && props.page==='shopList'">
            <input id="search-input" class="non-trans" type="text"/>
        </div>
    </div>
</template>

<script>
export default {
  name: 'top-bar',
//   width: 앱이 표시될 화면의 너비
  props: ['props', 'onChangeShopType'],
  data () {
    return {
      isSearching: false
    }
  },
  methods: {
    routeTo: function (destination) {
      this.props.onNavigate()
      this.$router.push(destination)
    //   카페, 바 사이에서 페이지 이동할 때 해당 페이지가 다시 로드되도록 하기 위함
      if (this.props.page === 'shopList' && destination.includes('shop_list')) {
        this.onChangeShopType()
      }
    },
    goBack: function () {
      this.$router.go(window.history.back())
    },
    setSearching: function (searching) {
      this.isSearching = searching
    }
  }
}
</script>

<style lang="scss" scoped>
    #top-bar {
        position: fixed;
        z-index: 100;
        height: 48px;
        &:after {
            clear:both;
        }
        & > div {
            &.navigation {
                float: left;
                width: 44px;
                & > img {
                    width: 18px;
                    height: 18px;
                    margin: 15px auto 0;
                    &.transparent {
                        opacity: 0.33;
                    }
                    &.non-trans {
                        opacity: 0.99;
                    }
                }
            }
            &#background {
                position: absolute;
                background-color: black;
                width: 100%;
                height: 48px;
            }
            &.right {
                float: right;
                width: 44px;
                & > img {
                    width: 18px;
                    height: 18px;
                    margin: 15px auto 0;
                    &.non-trans {
                        opacity: 0.99;
                    }
                }
            }
            &#input-container {
                float: left;
                height: 48px;
                & #search-input {
                    height: 48px;
                    width: 240px;
                    line-height: 48px;
                    padding: 0 8px;
                    font-size: 1.2em;
                    margin: 0;
                    outline: 0;
                    border: 0;
                    background-color: rgba(0, 0, 0, 0);
                    color: white;
                    &.non-trans {
                        opacity: 0.99;
                    }
                }
            }
        }
    }
</style>
