<template>
  <div class="itempannel">
    <Item />
  </div>
</template>

<script>
import Item from "./item"
import eventBus from "@/utils/eventBus"
export default {
  components: { Item },
  data() {
    return {
      page: null,
      command:null
    }
  },
  created() {
    this.bindEvent()
  },
  methods: {
    bindEvent() {
      eventBus.$on("afterAddPage", page => {
        this.page = page
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.itempannel {
  height: 100%;
  position: absolute;
  left: 0px;
  z-index: 2;
  background: #f7f9fb;
  width: 200px;
  padding-top: 0;
  border-right: 1px solid #e6e9ed;
}
</style>