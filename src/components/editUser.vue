<template>
  <el-row>
    <el-col>
      <el-form ref="registerForm" status-icon :model="info" label-width="80px">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="info.name"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
          <el-input v-model="info.nickName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSave">保存</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import { updateUser } from "../api/api";
export default {
  name: "edit-user",
  data() {
    return {
      info: {}
    };
  },
  created() {
    this.info = this.$route.params.info;
  },
  methods: {
    handleSave() {
      updateUser(this.info).then(res => {
        if (res.data.success) {
          this.$message({
            type: "success",
            message: "保存成功!"
          });
        } else {
          this.$message({
            type: "warning",
            message: "保存失败!"
          });
        }
      });
    }
  }
};
</script>
