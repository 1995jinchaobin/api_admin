<template>
  <div class="main">
    <el-container style="height: 100vh">
      <el-aside :width="collapse ? '64px' : '220px'">
        <el-menu
          background-color="#2F4050"
          text-color="#A7B1C2"
          active-text-color="#fff"
          hover-text-color="#fff"
          unique-opened
          :collapse="collapse"
          :collapse-transition="false"
          :router="true"
          :default-active="defaultActive"
        >
          <!-- 用户头像 -->
          <div class="imgUser" v-show="!collapse">
            <!-- <img src="@/assets/profile_small.jpg" alt="#" /> -->
          </div>
          <!-- app设置 -->
          <el-submenu :index="item.id + ''" v-for="item in navBarList" :key="item.id">
            <template slot="title">
              <i class="iconfont icon-download"></i>
              <span slot="title">{{item.name}}</span>
            </template>
            <el-menu-item v-for="item2 in item.children" :index="item2.url+''" :key="item2.id" @click="tagBtn(item2.name)"
              >{{item2.name}}</el-menu-item
            >
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧视图 -->
      <el-container>
        <!-- 头部区域 -->
        <el-header>
          <div class="top">
            <el-button
              type="success"
              :icon="collapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
              class="iconCe"
              @click="collapse = !collapse"
            ></el-button>
            <!-- <span>清空缓存</span> -->
          </div>
          <div class="tabTop">
            <!-- <i class="el-icon-caret-left"></i> -->
            <el-button
              icon="el-icon-caret-left"
              class="iconLeft"
              @click="tagLeftBtn"
            ></el-button>
            <el-button
              icon="el-icon-caret-right"
              class="iconRight"
              @click="tagRightBtn"
            ></el-button>
            <!-- <i class="el-icon-caret-right"></i> -->
            <el-button
              icon="el-icon-switch-button"
              class="outBtn"
              @click="pushLogin"
              >退出</el-button
            >
            <el-button class="closeTagBtn" @click="closeOtherTag"
              >关闭其他选项卡</el-button
            >
            <div :class="zuoyi ? 'tagLeft' : ''" class="tagAll" ref="fatherBox">
              <el-tag
                ref="ziBox"
                v-for="(tag, index) in tags"
                :key="tag.name"
                :closable="tags.length === 1 ? false : true"
                :class="tagIndex === index ? 'tag' : ''"
                @close="handleClose(tag)"
                @click="tagNavBtn(tag.url)"
              >
                {{ tag.name }}
              </el-tag>
            </div>
          </div>
        </el-header>
        <el-main>
          <div class="neibu">
            <router-view />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// const Base64 = require('js-base64').Base64
export default {
  name: 'Home',
  data () {
    return {
      collapse: false,
      tags: [{ name: '首页', url: 'home' }],
      // tagAllList: [
      //   { name: '安卓下载地址', url: 'android' },
      //   { name: '苹果下载地址', url: 'apple' },
      //   { name: '用户广播', url: 'contentlist' },
      //   { name: '会员管理', url: 'user' },
      //   { name: '会员等级', url: 'level' },
      //   { name: '拉黑管理', url: 'blacklist' },
      //   { name: '聊天管理', url: 'userchat' },
      //   { name: '聊天室内容', url: 'chatroom' },
      //   { name: '聊天室列表', url: 'chatmember' },
      //   { name: '标签设置', url: 'site' },
      //   { name: '轮播图', url: 'switch' },
      //   { name: '系统广播', url: 'sysinform' },
      //   { name: '聊天图片', url: 'userimg' },
      //   { name: '管理员', url: 'admin' },
      //   { name: '权限设置', url: 'power' },
      //   { name: '敏感词管理', url: 'senword' },
      //   { name: '群管理', url: 'groupm' },
      //   { name: '群聊天', url: 'groupchat' },
      //   { name: '投诉列表', url: 'complaintlist' }
      // ],
      navBarList: [
        { id:1, name: '用户管理', children: [
          { name: '日志记录', url: '/logging',id: 11 },
          { name: 'API记录', url: '/api/logging',id: 12 }
        ]},
        { id:2, name: '资源配置', children: [
          { name: '用户管理1', url: '/user',id: 21 }
        ]},
        { id:3, name: '菜单管理', children: [
          { name: '用户管理1', url: '/user',id: 31 }
        ]},
        { id:4, name: 'API管理', children: [
          { name: '用户管理1', url: '/user',id: 41 }
        ]},
        { id:5, name: '角色管理', children: [
          { name: '用户管理1', url: '/user',id: 51 }
        ]}
      ],
      // 点击标签的位置
      tagIndex: 0,
      zuoyi: false,
      powerListArr: [],
      isWrite: null,
      // 侧边栏高亮
      defaultActive: ''
    }
  },
  created () {
    // this.$router.push('home')
    // this.powerListArr = Base64.decode(
    //   window.sessionStorage.getItem('power')
    // ).split(',')
    // console.log(this.powerListArr)
    // this.isWrite = this.powerListArr.indexOf('9')
    // console.log(this.isWrite)
    // if (this.isWrite !== -1) {
    //   window.sessionStorage.setItem('isWrite', 'isWriteQweasd')
    // }
  },
  methods: {
    // 左侧菜单栏点击
    tagBtn (url) {
      console.log(url)
      // const a = this.tags
      //   .map(item => {
      //     return item.url
      //   })
      //   .indexOf(url)
      // console.log(a)
      // if (a === -1) {
      //   const push = this.tagAllList.find(item => {
      //     return item.url === url
      //   })
      //   console.log(push)
      //   this.tags.push(push)
      //   this.tagIndex = this.tags.length - 1
      //   console.log(this.tags)
      // } else {
      //   this.tagIndex = a
      // }
    },
    // 点击标签
    tagNavBtn (url) {
      console.log(url)
      const a = this.tags
        .map(item => {
          return item.url
        })
        .indexOf(url)
      console.log(a)
      this.tagIndex = a
      this.defaultActive = url
      this.$router.push(url)
    },
    // 关闭标签
    handleClose (value) {
      console.log(value)
      console.log(this.tags.indexOf(value))
      console.log(this.tagIndex) // 2
      console.log(this.tags.length) // 3
      console.log(this.tagIndex === this.tags.length - 1)
      const gl = this.tagIndex
      const dj = this.tags.indexOf(value)
      const al = this.tags.length
      // const rt = this.tags[gl].url
      if (gl === dj && dj === al - 1) {
        this.tagIndex -= 1
        const rt1 = this.tags[gl - 1].url
        this.$router.push(rt1)
      } else if (gl === dj && gl !== al - 1) {
        const rt2 = this.tags[gl + 1].url
        this.$router.push(rt2)
        console.log(rt2)
      } else if (gl > dj) {
        this.tagIndex -= 1
        const rt1 = this.tags[gl].url
        this.$router.push(rt1)
      } else {
        const rt1 = this.tags[gl].url
        this.$router.push(rt1)
      }
      this.tags.splice(this.tags.indexOf(value), 1)
    },
    // 左移按钮标签
    tagLeftBtn () {
      this.zuoyi = false
    },
    // 右移按钮标签
    tagRightBtn () {
      // console.log('you ')
      let b = 0
      for (let a = 0; a < this.tags.length; a++) {
        // console.log(a)
        b += this.$refs.ziBox[a].$el.clientWidth
      }
      const fatherBoxWidth = this.$refs.fatherBox.offsetWidth
      if (fatherBoxWidth < b) {
        this.zuoyi = true
      }
    },
    // 关闭其他标签卡
    closeOtherTag () {
      if (this.tags.length === 1) return
      const obj = this.tags[this.tagIndex]
      this.tags = []
      this.tags.push(obj)
      this.zuoyi = false
      this.tagIndex = 0
    },
    // 退出
    pushLogin () {
      window.sessionStorage.clear()
      this.$router.push('login')
    }
  }
}
</script>
<style lang="less">
.main {
  .el-container {
    min-width: 800px;
  }
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  .el-aside {
    background-color: #2f4050;
    // 鼠标悬浮变色
    .el-submenu__title:hover,
    .el-menu-item:hover {
      color: #fff !important;
    }
    i {
      color: #a7b1c2;
    }
    .el-submenu__title:hover i {
      color: #fff;
    }
    // i:hover{
    //   color: #fff !important;
    // }
    i + span {
      margin-left: 20px;
    }
  }
  // 隐藏侧边菜单滚动条
  .el-aside::-webkit-scrollbar {
    display: none;
  }
  // 侧边栏头像
  .imgUser {
    height: 150px;
    img {
      border-radius: 50%;
      margin: 30px;
    }
  }
  .el-menu {
    border: none;
  }
  .el-menu-item {
    height: 38px !important;
    line-height: 38px !important;
    border-left: 5px solid #19aa8d;
  }
  .el-submenu__title {
    height: 45px !important;
    line-height: 45px !important;
  }
  // 右边头部
  .el-header {
    height: 85px !important;
    padding: 0;
    border-bottom: 3px solid #000;
    .top {
      height: 50px;
      background-color: #f3f3f4;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      .iconCe {
        font-size: 25px;
        width: 35px;
        height: 30px;
        text-align: center;
        padding: 0;
      }
      span {
        font-size: 14px;
        font-weight: 600;
        color: #999c9e;
      }
    }
    .tabTop {
      height: 32px;
      background-color: #fff;
      display: flex;
      position: relative;
      // overflow: hidden;
      // border-bottom: 2px solid #ccc;
      // i{
      //   font-size: 30px;
      // }
      .iconLeft,
      .iconRight {
        position: absolute;
        height: 32px;
        width: 30px;
        font-size: 25px;
        padding: 0;
        color: #ccc;
      }
      .iconRight {
        right: 159px;
      }
      .outBtn {
        position: absolute;
        right: 0;
        height: 32px;
        width: 60px;
        padding: 0;
        i {
          color: red;
        }
      }
      .tag {
        background-color: blue;
        color: #fff;
        border-bottom: 1px solid blue;
      }
      .tagAll {
        margin: 0 189px 0 30px;
        display: flex;
        width: 100%;
        overflow: hidden;
      }
      .closeTagBtn {
        position: absolute;
        right: 59px;
        height: 32px;
        padding: 0;
      }
      .tagLeft {
        justify-content: flex-end;
      }
      .el-tag {
        cursor: pointer;
      }
    }
  }
  .el-main {
    padding: 0px;
    background-color: #f3f3f4;
    .neibu {
      padding: 20px;
    }
  }
  .el-main > div {
    width: calc(100% - 40px);
    min-height: calc(100% - 40px);
    background: #fff;
    margin: 20px;
    box-shadow: 0 -3px #e7eaec;
  }
}
</style>