<template>
  <div class="logging">
    <el-table
      :data="loggingList"
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
        prop="ip"
        label="IP地址">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Logging',
  data () {
    return {
      params: {
        currentPage: 1,
        pageSize: 10
      },
      loggingList: [],
      total: 0
    }
  },
  methods: {
    async getLoggingList () {
      const { data: res } = await this.$http.get(`/log/accountLog/${this.params.currentPage}/${this.params.pageSize}`)
      console.log(res)
      this.loggingList = res.data.data.list
      this.total = res.data.data.total
      console.log(this.loggingList)
    }
  },
  created () {
    this.getLoggingList()
  }
}
</script>

<style>

</style>