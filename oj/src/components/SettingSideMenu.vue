<template>
<ul>
  <li class="nav-item">
    <a>个人资料</a>
    <ul class="pure-menu-list subnav" style="height: auto;">
      <li class="nav-item">
        <a href="/setting">个人信息</a>
      </li>
      <li class="nav-item">
        <a href="/setting/avatar">修改头像</a>
      </li>
      <li class="nav-item">
        <a href="/setting/security">Security</a>
      </li>
    </ul>
  </li>
</ul>
</template>

<script>
export default {
  data() {
    return {

    }
  }
}
</script>

<style lang="css">
.side-nav ul {
  padding: 0;
  margin: 0;
  overflow: hidden;
}

.side-nav li {
  list-style: none;
}

.side-nav .nav-item a {
  font-size: 16px;
  color: #5e6d82;
  line-height: 40px;
  height: 40px;
  margin: 0;
  padding: 0;
  text-decoration: none;
  display: block;
  position: relative;
  transition: all .3s;
}

.side-nav .nav-item .nav-item a {
  display: block;
  height: 40px;
  line-height: 40px;
  font-size: 13px;
  padding-left: 24px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.side-nav .nav-item .nav-item a:hover {
  color: #20a0ff;
}
</style>
