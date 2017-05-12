<template>
    <div id="top-bar" v-bind:style="{width: props.width}">
        <div id="background" v-bind:style="{opacity: props.bgOpacity}"></div>
        <div class="navigation" v-on:click="routeTo('story_list')">
            <img v-if="props.page==='storyList'" class="non-trans" src="../../assets/images/interfaces/top_bar/nav_story_on.png">
            <img v-else class="transparent" src="../../assets/images/interfaces/top_bar/nav_story.png">
        </div>
        <div class="navigation" v-on:click="routeTo('shop_list')">
            <img v-if="props.page==='shopList'" class="non-trans" src="../../assets/images/interfaces/top_bar/nav_shop_on.png">
            <img v-else class="transparent" src="../../assets/images/interfaces/top_bar/nav_shop.png">
        </div>
        <div class="navigation">
            <img v-if="props.page==='favoriteList'" class="non-trans" src="../../assets/images/interfaces/top_bar/nav_favorite_on.png">
            <img v-else class="transparent" src="../../assets/images/interfaces/top_bar/nav_favorite.png">
        </div>
        <div class="right">
            <img class="non-trans" src="../../assets/images/interfaces/top_bar/top_bar_menu.png">
        </div>
        <div v-if="props.page==='shopList'" class="right">
            <img class="non-trans" src="../../assets/images/interfaces/top_bar/top_bar_search.png">
        </div>
    </div>
</template>

<script>
export default {
  name: 'top-bar',
//   width: 앱이 표시될 화면의 너비
  props: ['props'],
  methods: {
    routeTo: function (destination) {
      this.$router.push(destination)
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
        }
    }
</style>
