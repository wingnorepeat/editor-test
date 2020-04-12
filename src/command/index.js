import { uniqueId } from '@/utils'
class command {
    editor = null;
    undoList = [] // 可撤销的数组集合
    redoList = [] // 可重做的数组集合
    constructor(editor) {
        this.editor = editor;
    }
    executeCommand(key, datas) {
        // 执行操作命令
        const list = []
        datas.map(data => {
            let model = data
            if (key === 'add') { // 添加时
                model.id = data.type + uniqueId() // 元素唯一id
            }
            if (key === 'delete') { // 删除时
                if (data.getType() === 'node') { // getType()获取当前元素的类型是节点node还是线edge
                    const edges = data.getEdges()
                    model = data.getModel() // getModel() 获取数据模型
                    model.type = data.getType()
                    model.id = data.get('id')
                    edges.forEach(edge => {
                        let edgeModel = edge.getModel()
                        edgeModel.type = 'edge'
                        edgeModel.id = edge.get('id')
                        list.push(edgeModel)
                    })
                } else if (data.getType() === 'edge') { // 当类型为线时
                    model = data.getModel()
                    model.type = data.getType()
                    model.id = data.get('id')
                }
            }
            list.push(model)

            this.doCommand(key, model)

        });
        this.undoList.push({ key, datas: list })
        if(key === 'delete'){ // 删除后清空重做数组集合
            this.redoList = []
        }
        this.editor.emit(key, { undoList: this.undoList, redoList: this.redoList }) // 每一次执行操作之后更新撤销与重绘数组
    }
    doCommand(key, data) {
        switch (key) {
            case 'add':
                this.add(data.type, data)
                break;
            case "update":
                // 更新操作会返回3个参数, item,oldModel,newModel
                this.update(data.item, data.newModel)
                break
            case "delete":
                this.remove(data)
                break
        }
    }
    add(type, item) {
        this.editor.add(type, item)
    }
    update(item, model) {
        this.editor.update(item, model)
    }
    remove(item) {
        this.editor.remove(item)
    }
    undo() {
        const undoData = this.undoList.pop()
        const edgeList = []
        const list = []
        for (let i = 0; i < undoData.datas.length; i++) {
            const data = undoData.datas[i]
            if (data.type === 'edge') {
                edgeList.push(data)
                continue
            }
            list.push(data)
            this.doundo(undoData.key, data)
        }
        for (let i = 0; i < edgeList.length; i++) {
            const edge = edgeList[i]
            if (edge.source.destroyed) {
                edge.source = edge.sourceId

            }
            if (edge.target.destroyed) {
                edge.target = edge.targetId
            }
            list.push(edge)
            this.doundo(undoData.key, edge)
        }
        this.redoList.push({ key: undoData.key, datas: list })
        this.editor.emit(undoData.key, { undoList: this.undoList, redoList: this.redoList })
    }
    doundo(key, data) {
        switch (key) {
            case 'add':
                this.remove(data)
                break;
            case "update":
                this.update(data.item, data.oldModel)
                break
            case "delete":
                this.add(data.type, data)
                break
        }
    }
    redo() {
        const redoData = this.redoList.pop()
        const list = []
        const edgeList = []
        for (let i = 0; i < redoData.datas.length; i++) {
            const data = redoData.datas[i]
            if (data.type === 'edge') {
                edgeList.push(data)
                continue
            }
            list.push(data)
            this.doredo(redoData.key, data)
        }
        for (let i = 0; i < edgeList.length; i++) {
            const edge = edgeList[i]
            if (edge.source.destroyed) {
                edge.source = edge.sourceId

            }
            if (edge.target.destroyed) {
                edge.target = edge.targetId
            }
            list.push(edge)
            this.doredo(redoData.key, edge)
        }
        this.undoList.push({ key: redoData.key, datas: list })

        this.editor.emit(redoData.key, { undoList: this.undoList, redoList: this.redoList })
    }
    doredo(key, data) {
        switch (key) {
            case 'add':
                this.add(data.type, data)
                break;
            case "update":
                this.update(data.item, data.newModel)
                break
            case "delete":
                this.remove(data)
                break
        }
    }
    delete(item) {
        this.executeCommand('delete', [item])
    }
}

export default command;