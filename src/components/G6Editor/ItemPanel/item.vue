<template>
  <div class="item-panel-wrapper">
    <div v-for="(list, idx) in list" class="panel-list" :key="idx">
      <div class="panel-title">{{list.title}}</div>
      <div class="panel-content">
        <div v-for="(item, idx) in list.children" 
              class="panel-child" 
              :key="idx"
              :data-type="item.type"
              :data-shape="item.shape"
              draggable
              @dragstart="handleDragstart"
              @dragend="handleDragEnd($event,item)" >{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ItemPanelArray } from '@A/static'
import eventBus from '@/utils/eventBus'
export default {
  data() {
    return {
      page: null,
      command: null,
      offsetX: 0,
      offsetY: 0,
      list: ItemPanelArray
    }
  },
  created() {
    this.bindEvent()
  },
  methods: {
    handleDragstart(e) {
      this.offsetX = e.offsetX
      this.offsetY = e.offsetY
    },
    handleDragEnd(e, item) {
      let data = {}
      Object.assign(data, item)
      data.offsetX = this.offsetX
      data.offsetY = this.offsetY
      if (this.page) {
        const graph = this.page.graph
        // const size = e.target.dataset.size.split("*")
        const xy = graph.getPointByClient(e.x, e.y)
        data.x = xy.x
        data.y = xy.y
       // data.size = item.size.split("*")
        data.type = 'node'
        this.command.executeCommand('add', [data])
      }
    },
    bindEvent() {
      eventBus.$on('afterAddPage', page => {
        this.page = page
        this.command = page.command
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.item-panel-wrapper {
  .panel-list {
    width: 100%;
    .panel-title {
      line-height: 2;
      padding: 0 10px;
      font-size: 14px;
      background-color: #eee;
      border-bottom: 1px solid #d7d6d6;
    }
    .panel-content {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      padding: 0px 10px 10px;
      .panel-child {
        padding: 6px 8px;
        background-color: rgba(53, 53, 238, .3);
        border: 1px solid rgb(95, 95, 233);
        margin-right: 8px;
        margin-top: 10px;
        border-radius: 8px;
        &:hover {
          background-color: rgba(53, 53, 238, .5);
        }
      }
    }
  }
}
</style>