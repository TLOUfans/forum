<template>
  <el-container>
    <el-header height="inherit">
      <img :src="GLOBAL.serverPath + imgSrc" alt="" width="100%" height="100%">
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-row>
          <el-menu
            default-active="user"
            :router="true">
            <el-menu-item index="user">
              <i class="el-icon-menu"></i>
              <span slot="title">用户管理</span>
            </el-menu-item>
            <el-menu-item index="register">
              <i class="el-icon-setting"></i>
              <span slot="title">注册</span>
            </el-menu-item>
          </el-menu>
        </el-row>
      </el-aside>
      <el-container>
        <el-main>
          <router-view/>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import { readFile } from "../api/api";
export default {
  name: "home",
  data() {
    return {
      imgSrc: '/8a7745bf492ba4565c139909be8d7e9529c07e4a.png@.webp'
    };
  },
  methods: {},
  created() {
    // readFile({filePath: 'server/public/8a7745bf492ba4565c139909be8d7e9529c07e4a.png@.webp'}).then(res => {
    //   this.imgSrc = res.data
    // })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
// @import '../../static/index.scss';
.el-header {
  padding: 0;
}
</style>