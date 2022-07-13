<template>
  <div class="card-class" :class="{'invisible': !this.classroom.visible}">
    <div class="header" :style="{background: getRandomColor(this.classroom.name + this.classroom.subject_name + this.classroom.group_name + this.classroom.room_name)}">
      <Dropdown 
        trigger="click" 
        placement="bottom-end" 
        @on-click="handleSelectDropdown">
        <Button 
          type="text" 
          shape="circle" 
          icon="more"></Button>
        <DropdownMenu slot="list">
          <DropdownItem name="0">Edit</DropdownItem>
          <DropdownItem name="1">Delete</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <div class="body" 
      @click="onSelect()">
      <div style="font-weight: 600">
        {{this.classroom.name}} | {{this.classroom.subject_name}}
      </div>
      <div>
        {{this.classroom.room_name}} | {{this.classroom.group_name}} 
      </div>
      <!-- <Badge :count="group.announcements">
        <Icon type="ios-bell"></Icon>
      </Badge>
      <Badge :count="group.quantity">
        <Icon type="ios-people"></Icon>
      </Badge>
      <Badge v-if="group.isContesting">
        <Icon type="ios-timer"></Icon>
      </Badge>
      <Badge v-else dot>
        <Icon type="ios-timer"></Icon>
      </Badge> -->
    </div>
  </div>
</template>

<script>
  import { randomColor } from '@/utils/constants'

  export default {
    name: 'ClassroomCard',
    data () {
      return {
      }
    },
    props: {
      classroom: {
      }
    },
    methods: {
      onSelect () {
        this.$emit('onClick', this.classroom.id)
      },
      handleSelectDropdown (event) {
        switch (event) {
          case '0':
            this.$emit('onEdit', this.classroom.id)
            break
          default:
            this.$emit('onDelete', this.classroom.id)
            break
        }
      },
      getRandomColor (input) {
        return randomColor(input)
      }
    }
  }
</script>

<style scoped lang="less">
.card-class {
    width: 200px;
    border: 1px solid #ececec;
    border-radius: 10px;
    box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
    transition: box-shadow 0.3s ease-in-out;

    &.invisible {
      opacity: 0.4;
    }
    
    .header {
      position: relative;
      height: 110px;
      line-height: 45px;
      font-size: 17px;
      padding: 0 10px;
      font-weight: 600;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      color: rgb(238, 238, 238);
      border-bottom: 1px solid #919191;
      background: #ce2a2a;

      .ivu-dropdown {
        position: absolute;
        top: 0;
        right: 10px;
      }
    }

    .body {
      background: white;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      min-height: 80px;
      padding: 10px;
      cursor: pointer;

      &:active {
        opacity: 0.75;
      }

      &:hover {
        color: var(--color-primary)
      }

      .ivu-badge {
        margin-top: 15px;

        &:not(:first-child) {
          margin-left: 30px;
        }

        i {
          font-size: 25px;
        }
      }
    }
  }
</style>
