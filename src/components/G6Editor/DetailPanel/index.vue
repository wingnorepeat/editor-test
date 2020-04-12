<template>
  <div class="detailpannel">
    <div>
      <div v-if="status=='node-selected'" class="pannel" id="node_detailpannel">
        <div class="pannel-title">{{node.label}}</div>
        <div class="block-container">
          <div class="pannel-detail" v-show="node.name === nodeType.ORDER_MESS">
            <div>事件说明: 待请求接口1</div>
          </div>
          <div class="pannel-detail" v-show="node.name === nodeType.COMMIT_USER_MESS">
            <div>事件说明: 待请求接口2</div>
          </div>
          <div class="pannel-detail" v-show="node.name === nodeType.VIP_PROPERTY">
            <div class="age">
              <div class="left">age > </div>
              <div class="right">
                <el-input-number v-model="node.number" :min="1" :max="60"></el-input-number>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="edge_detailpannel" v-if="status==='edge-selected'">
        <div class="pannel-title">连接线</div>
        <div class="block-container">
          我是连接线
        </div>
      </div>
      <div v-if="status==='canvas-selected'" class="pannel" id="canvas_detailpannel">
        <div class="pannel-title">画布</div>
        <div class="block-container">
          <el-checkbox v-model="showGrid" @change="changeGridState">网格对齐</el-checkbox>
        </div>
      </div>
      <!-- <div v-if="status==='group-selected'" class="pannel" id="node_detailpannel">
        <div class="pannel-title">群组详情</div>
        <div class="block-container">
          <div class="p">
            名称：
            <el-input v-model="name" />
          </div>
          <div class="p">
            任意属性：
            <el-input v-model="color" />
          </div>
        </div>
      </div>
      -->
    </div>
  </div>
</template>

<script>
import eventBus from "@/utils/eventBus"
import Grid from "@antv/g6/build/grid"
import nodeType from '@Config/NodeType'

export default {
  data() {
    return {
      status: "canvas-selected",
      showGrid: false,
      page: {},
      graph: {},
      item: {},
      node: {},
      grid: null,
      nodeType: nodeType
    }
  },
  created() {
    this.init()
    this.bindEvent()
  },
  methods: {
    init() {},
    bindEvent() {
      let self = this
      eventBus.$on("afterAddPage", page => {
        self.page = page
        self.graph = self.page.graph
        eventBus.$on("nodeselectchange", item => {
          if (item.select === true && item.target.getType() === "node") {
            self.status = "node-selected"
            self.item = item.target
            self.node = item.target.getModel()
          } 
          else if (item.select === true && item.target.getType() === 'edge') {
            self.status = 'edge-selected'
            self.item = item.target
            self.node = item.target.getModel()
          } 
          else {
            self.status = "canvas-selected"
            self.item = null
            self.node = null
          }
        })
      })
    },
    handleChangeName() {
      const model = {
        label: ''
      }

      this.graph.update(this.item, model)
    },
    changeGridState(value) {
      if (value) {
        this.grid = new Grid()
        this.graph.addPlugin(this.grid)
      } else {
        this.graph.removePlugin(this.grid)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.detailpannel {
  height: 100%;
  position: absolute;
  right: 0px;
  z-index: 2;
  background: #f7f9fb;
  width: 400px;
  border-left: 1px solid #e6e9ed;
  .block-container {
    padding: 16px 8px;
    .pannel-detail {
      font-size: 14px;
      .age {
        display: flex;
        align-items: center;
        .left {
          margin-right: 20px;
          flex-grow: 0;
          flex-shrink: 0;
        }
        .right {
          margin-right: 20px;
          flex: 1;
        }
      }
    }
  }
  .pannel-title {
    height: 32px;
    border-top: 1px solid #dce3e8;
    border-bottom: 1px solid #dce3e8;
    background: #ebeef2;
    color: #000;
    line-height: 28px;
    padding-left: 12px;
  }
}
</style>
