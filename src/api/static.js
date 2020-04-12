
const ItemPanelArray = [{
  title: "触发点",
  icon: "",
  children: [{
    name: "完成事件",
    label: "完成事件",
    type: "node",
    size: [170, 34],
    shape: "customNode",
    outPoints: [[1, 0.5]],
    typeCode: 'Listening'
  }, {
    name: "时间段完成事件",
    label: "时间段完成事件",
    type: "node",
    size: [170, 34],
    shape: "customNode",
    outPoints: [[1, 0.5]],
    typeCode: 'Listening'
  }]
}, {
  title: "条件",
  icon: "",
  children: [{
    name: "会员属性节点",
    label: "会员属性节点",
    type: "node",
    size: [170, 34],
    shape: "customNode",
    inPoints: [[0, 0.5]],
    outPoints: [[1, 0.4], [1, 0.6]],
    typeCode: 'condition'
  }, {
    name: "会员标签",
    label: "会员标签",
    type: "node",
    size: [170, 34],
    shape: "customNode",
    inPoints: [[0, 0.5]],
    outPoints: [[1, 0.4], [1, 0.6]],
    typeCode: 'condition'
  }]
}, {
  title: "动作",
  icon: "",
  children: [{
    name: "发送微信公众号客服消息",
    label: "发送微信公众号客服消息",
    type: "node",
    size: [170, 34],
    shape: "customNode",
    inPoints: [[0, 0.5]],
    outPoints: [[1, 0.5]],
    typeCode: 'action'
  }, {
    name: "发送短信节点",
    label: "发送短信节点",
    type: "node",
    size: [170, 34],
    shape: "customNode",
    inPoints: [[0, 0.5]],
    outPoints: [[1, 0.5]],
    typeCode: 'action'
  }]
}, {
  title: "节点形式",
  icon: "",
  children: [{
    name: "并发节点",
    label: "并发节点",
    type: "node",
    size: [170, 34],
    shape: "customNode",
    inPoints: [[0, 0.5]],
    outPoints: [[1, 0.5]],
    typeCode: 'concurrent'
  }]
}]

export { ItemPanelArray }