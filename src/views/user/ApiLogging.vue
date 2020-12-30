<template>
  <div class="apiLogging">
    <el-table
      :data="apiLoggingList"
      border
      stripe
      style="width: 100%">
      <el-table-column
        prop="userId"
        label="用户名">
      </el-table-column>
      <el-table-column
        prop="logName"
        label="操作">
      </el-table-column>
      <el-table-column
        prop="api"
        label="接口名称">
      </el-table-column>
      <el-table-column
        prop="method"
        label="方法">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'ApiLogging',
  data () {
    return {
      params: {
        currentPage: 1,
        pageSize: 10
        // GET /log/operationLog/{currentPage}/{pageSize}
      },
      apiLoggingList: [],
      total: 0
    }
  },
  methods: {
    async getApiLoggingList () {
      const { data: res } = await this.$http.get(`/log/operationLog/${this.params.currentPage}/${this.params.pageSize}`)
      console.log(res)
      this.apiLoggingList = res.data.data.list
      this.total = res.data.data.total
    }
  },
  created () {
    this.getApiLoggingList()
  }
}
</script>

<style>

</style>