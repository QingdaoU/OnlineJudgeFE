<template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="Class">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.class }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="Head Lecturer">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.headLecturer }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="Quantity">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.quantity }}</span>
      </template>
    </el-table-column>

    <el-table-column 
      label="Students Detail"
      header-align="center"
      align="center">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"><i class="el-icon-view"></i></el-button>
      </template>
    </el-table-column>

    <el-table-column header-align="center" align="center">
      <template slot="header" slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">Add Class</el-button>
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  
  export default {
    name: 'Tab',
    data () {
      return {
        tableData: [{
          class: '12A6 12321',
          quantity: 26,
          headLecturer: 'Alex'
        },
        {
          class: '12A6 1aass',
          quantity: 26,
          headLecturer: 'Alex'
        },
        {
          class: '12A6sss',
          quantity: 26,
          headLecturer: 'Alex'
        },
        {
          class: '12A6',
          quantity: 26,
          headLecturer: 'Alex'
        },
        {
          class: '12A6',
          quantity: 26,
          headLecturer: 'Alex'
        },
        {
          class: '12A6',
          quantity: 26,
          headLecturer: 'Alex'
        },
        {
          class: '12A6',
          quantity: 26,
          headLecturer: 'Alex'
        },
        {
          class: '12A6',
          quantity: 26,
          headLecturer: 'Alex'
        }]
      }
    },
    methods: {
      handleEdit (index, row) {
        console.log(index, row)
      },
      handleDelete (index, row) {
        console.log(index, row)
      }
    }
  }
</script>


<style scoped lang="less">
</style>