<template>
  <div class="page">
    <div :id="pageId" class="graph-container" style="position: relative;"></div>
  </div>
</template>


<script>
import G6 from "@antv/g6/build/g6"
import { initBehavors } from "@/behavior"
export default {
  data() {
    return {
      pageId: "graph-container",
      graph: null
    }
  },
  props: {
    height: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 0
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  created() {
    initBehavors()
  },
  mounted() {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    init() {
      const height =  this.height - 42 
      const width =  this.width - 400

      this.graph = new G6.Graph({
        container: "graph-container",
        height: height,
        width: width,
        modes: {
          // 支持的 behavior
          default: [
            "drag-canvas",
            "zoom-canvas",
            "hover-node",
            "select-node",
            "hover-edge",
            "keyboard",
            "customer-events",
            "add-menu"
          ],
          mulitSelect: ["mulit-select"],
          addEdge: ["add-edge"],
          moveNode:[ "drag-item"]
        }
      })
      // 通过$parent去拿父组件的editor与command
      const { editor, command } = this.$parent 
      // 当初始化G6Graph之后其他页面接收到afterAddPage事件
      editor.emit("afterAddPage", { graph: this.graph, command })

      this.readData()
    },
    readData() {
      let data = this.data
      // data 是一个包括 nodes 和 edges 的对象
      if (data) {
        this.graph.read(data) // 接收数据，并进行渲染，read 方法的功能相当于 data 和 render 方法的结合
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page{
  margin-left: 200px;
  margin-right: 200px;
}
</style>