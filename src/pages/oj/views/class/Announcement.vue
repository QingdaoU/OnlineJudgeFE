<template>
  <ul class="announcements-wrapper" key="list">
    <li v-for="announcement in announcements" :key="announcement.title">
      <div class="flex-container">
        <div class="title"><a class="entry">
          {{announcement.title}}</a></div>
        <div class="date">{{announcement.create_time | localtime }}</div>
        <div class="creator"> {{$t('m.By')}} {{announcement.created_by.username}}</div>
      </div>
    </li>
  </ul>
</template>

<script>
  const mockupAnnouncements = [
    {
      'id': 9,
      'created_by': {
        'id': 12,
        'username': 'root',
        'real_name': null
      },
      'title': '各位超级管理级管理员请勿随便修改本站配置',
      'content': '<p>包括</p><ol><li>新增、删除用户权限</li><li>删除、隐藏已有比赛和题目</li><li>站点配置</li></ol><p><b>有任何问题请在“QDU_ACM集训队内部群”和&quot;qq 1670873886&quot;内部沟通</b></p>',
      'create_time': '2021-08-28T11:54:38.654964Z',
      'last_update_time': '2021-10-14T07:54:26.366692Z',
      'visible': true
    },
    {
      'id': 2,
      'created_by': {
        'id': 1,
        'username': 'Duy',
        'real_name': null
      },
      'title': '各位超级请勿随便修请勿随便修管理员请勿随便修改本站配置',
      'content': '<p>包括</p><ol><li>新增、删除用户权限</li><li>删除、隐藏已有比赛和题目</li><li>站点配置</li></ol><p><b>有任何问题请在“QDU_ACM集训队内部群”和&quot;qq 1670873886&quot;内部沟通</b></p>',
      'create_time': '2021-08-28T11:54:38.654964Z',
      'last_update_time': '2021-10-14T07:54:26.366692Z',
      'visible': true
    },
    {
      'id': 5,
      'created_by': {
        'id': 2,
        'username': 'Duong',
        'real_name': null
      },
      'title': '各位超级管本请勿随便修改本站配置',
      'content': '<p>包括</p><ol><li>新增、删除用户权限</li><li>删除、隐藏已有比赛和题目</li><li>站点配置</li></ol><p><b>有任何问题请在“QDU_ACM集训队内部群”和&quot;qq 1670873886&quot;内部沟通</b></p>',
      'create_time': '2021-08-28T11:54:38.654964Z',
      'last_update_time': '2021-10-14T07:54:26.366692Z',
      'visible': true
    }
  ]
  export default {
    name: 'Announcements',
    components: {
    },
    data () {
      return {
        announcements: mockupAnnouncements
      }
    },
    mounted () {
    },
    methods: {
    },
    computed: {
    }
  }
</script>

<style scoped lang="less">
  .announcements-wrapper {
    margin-top: -10px;
    margin-bottom: 10px;
    li {
      padding-top: 15px;
      list-style: none;
      padding-bottom: 15px;
      font-size: 16px;
      border-bottom: 1px solid rgba(187, 187, 187, 0.5);
      &:last-child {
        border-bottom: none;
      }
      .flex-container {
        .title {
          flex: 1 1;
          text-align: left;
          padding-left: 10px;
          a.entry {
            color: #495060;
            &:hover {
              color: #2d8cf0;
              border-bottom: 1px solid #2d8cf0;
            }
          }
        }
        .creator {
          flex: none;
          width: 200px;
          text-align: center;
        }
        .date {
          flex: none;
          width: 200px;
          text-align: center;
        }
      }
    }
  }
</style>
