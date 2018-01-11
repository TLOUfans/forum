<template>
  <el-col>
    <div class="tools-container">
    </div>
    <el-table 
      :data="tableData" 
      border 
      :highlight-current-row="true" 
      @sort-change="handleSortChange"
      :default-sort="{ prop: 'uid', order: 'ascending'}" 
      :style="{'min-width': '500px'}"
      v-loading="loading">
      <el-table-column type="index" label="序号" width="50">
      </el-table-column>
      <el-table-column prop="uid" label="用户ID" width="100" sortable="custom">
      </el-table-column>
      <el-table-column prop="name" label="用户名" sortable="custom">
      </el-table-column>
      <el-table-column prop="nickName" label="昵称" sortable="custom">
      </el-table-column>
      <el-table-column label="注册日期" sortable="custom" prop="regDate" width="150">
        <template slot-scope="scope">
          <div v-text="new Date(scope.row.regDate).pattern('yyyy-MM-dd HH:mm:ss')"></div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="padding: 5px 0px;border: 1px solid #e6ebf5; border-top: none; text-align: left">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[10, 50, 100, 1000]"
        :page-size="pageSize" 
        layout="total, sizes, prev, pager, next, jumper" 
        :total="totalCount">
      </el-pagination>
    </div>
    <el-dialog title="用户管理" :visible.sync="showDialog" @close="handleClose">
      <router-view/>
    </el-dialog>
  </el-col>
</template>

<script>
import { register, queryUser, removeUser } from "../api/api";
export default {
  name: "user",
  data() {
    return {
      tableData: [],
      totalCount: 0,
      pageIndex: 1,
      pageSize: 10,
      loading: false,
      showDialog: false
    };
  },
  methods: {
    handleQueryUser(params = {}) {
      this.loading = true;
      Object.assign(
        params,
        { pageIndex: this.pageIndex },
        { pageSize: this.pageSize }
      );
      queryUser(params).then(res => {
        this.loading = false;
        let resData = res.data.result;
        this.tableData = resData.data;
        this.totalCount = resData.total;
      });
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.handleQueryUser();
    },
    handleCurrentChange(pageIndex) {
      this.pageIndex = pageIndex;
      this.handleQueryUser();
    },
    handleSortChange(e) {
      let { column, prop, order } = e;
      order = order == "descending" ? -1 : 1;
      this.handleQueryUser({
        sort: { [prop]: order }
      });
    },
    handleEdit(index, row) {
      this.showDialog = true;
      this.$router.push({ name: "editUser", params: { info: row } });
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return removeUser({ id: row._id });
        })
        .then(() => {
          this.tableData.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          // this.$message({
          //   type: "info",
          //   message: "已取消删除"
          // });
        });
    },
    handleClose() {
      this.$router.push({ path: "/user" });
      this.handleQueryUser();
    }
  },
  created() {
    this.handleQueryUser({
      sort: { uid: -1 }
    });
  }
};
</script>

<style lang="scss" scoped>
.tools-container {
  text-align: left;
  .link {
    font-size: 16px;
    cursor: pointer;
    text-decoration: none;
  }
  .link:visited {
    color: #333;
  }
  .link:hover {
    color: #00f;
    text-decoration: underline;
  }
}
.el-table {
  font-size: 12px;
  th,
  td {
    padding: 5px 0px;
  }
}
</style>

<style>
.el-table th,
.el-table td {
  padding: 5px 0px;
}
</style>
