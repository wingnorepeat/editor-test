<template>
  <div id="mountNode" :style="{width:width}">
    <div class="editor" >
      <!--菜单栏（后期去掉）-->
      <context-menu />
      <!--工具栏-->
      <toolbar />
      <div style="height: 42px;"></div>
      <div class="bottom-container">
        <!--左侧栏-->
        <item-panel />
        <!--右侧-->
        <detail-panel />
        <!--地图导航-->
        <minimap />
        <!--canvas-->
        <page :height="height" :width="width" :data="data" />
      </div>
    </div>
    <Flow />
  </div>
</template>

<script>
import Toolbar from "./Toolbar"
import ItemPanel from "./ItemPanel"
import DetailPanel from "./DetailPanel"
import Minimap from "./Minimap"
import Page from "./Page"
import Flow from "./Flow"
import ContextMenu from "./ContextMenu"
import Editor from "./Base/Editor"
import command from "@/command"

export default {
  name: "G6Editor",
  components: {
    Toolbar,
    ItemPanel,
    DetailPanel,
    Minimap,
    Page,
    ContextMenu,
    Flow
  },
  props: {
    height: {
      type: Number,
      default: document.documentElement.clientHeight
    },
    width: {
      type: Number,
      default: document.documentElement.clientWidth
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  created() {
    this.init()
  },
  data() {
    return {
      editor: {},
      command: null
    }
  },
  methods: {
    init() {
      this.editor = new Editor()
      this.command = new command(this.editor)
    }
  }
}
</script>

<style lang="scss" scoped>
#mountNode {
  .editor {
    position: relative;
    width: 100%;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    .bottom-container {
      position: relative;
    }
  }
}
</style>