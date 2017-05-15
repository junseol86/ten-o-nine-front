import Vue from 'vue'
import Router from 'vue-router'
import Intro from '@/components/1_intro/Intro'
import StoryList from '@/components/2_story/StoryList'
import ShopList from '@/components/3_shop/ShopList'
import ShopDetail from '@/components/3_shop/ShopDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Intro',
      component: Intro
    },
    {
      path: '/story_list',
      name: 'StoryList',
      component: StoryList
    },
    {
      path: '/shop_list',
      name: 'ShopList',
      component: ShopList
    },
    {
      path: '/shop_detail/:shop_id',
      name: 'ShopDetail',
      component: ShopDetail
    }
  ]
})
