<template>
  <el-row type="flex">
    <el-col :span="6"></el-col>
    <el-col :span="12" class="container">
      <el-form ref="registerForm" status-icon :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
          <el-input v-model="form.nickName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input v-model="form.checkPass" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('registerForm')">注册</el-button>
          <el-button @click="back">取消</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="6"></el-col>
  </el-row>
</template>

<script>
import { register, queryUser } from "../api/api";
export default {
  name: "register",
  data() {
    const validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      } else if (!/^\w+$/.test(value)) {
        return callback(new Error("用户名必须是字母或数字"));
      } else if (!(value.length >= 3 && value.length <= 15)) {
        return callback(new Error("用户名长度必须在3到15之间"));
      } else {
        callback();
      }
    };
    const validateNickName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("昵称不能为空"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("密码不能为空"));
      } else {
        if (this.form.checkPass !== "") {
          this.$refs.registerForm.validateField("checkPass");
        }
        callback();
      }
    };
    const validateCheckPass = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        name: "",
        nickName: "",
        password: "",
        checkPass: ""
      },
      rules: {
        name: [
          {
            validator: validateName,
            trigger: "blur"
          }
        ],
        nickName: [
          {
            validator: validateNickName,
            trigger: "blur"
          }
        ],
        password: [
          {
            validator: validatePassword,
            trigger: "blur"
          }
        ],
        checkPass: [
          {
            validator: validateCheckPass,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.onRegister(this.form);
        } else {
          this.$message({
            type: "warning",
            message: "信息填写不正确"
          });
        }
      });
    },
    onRegister(data) {
      register(data).then(res => {
        if (res.data.success) {
          this.$message({
            type: "success",
            message: "注册成功！"
          });
        } else {
          this.$message({
            type: "error",
            message: res.data.msg
          });
        }
      });
    },
    back() {
      this.$router.push({
        path: "/",
      });
    }
  }
};
</script>

<style lang="scss" scoped>
$font-size: 12px;
$full-width: 100%;
.container {
  font-size: $font-size;
}
</style>