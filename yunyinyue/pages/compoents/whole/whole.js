// pages/compoents/whole/whole.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        dataFromParent: {
            type: Array
        },
        // fn: {
        //     type: Function
        // }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        handletap() {
            this.triggerEvent('fn', {index: 0})
            
        },
    }
})
