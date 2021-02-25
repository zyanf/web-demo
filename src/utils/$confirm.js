import { MessageBox } from 'element-ui'

export default {
    install(Vue) {
        Vue.prototype.$confirmDel = function() {
            return MessageBox.confirm('确定删除这条记录', {
                cancelButtonText: '取消',
                confirmButtonText: '删除',
                iconClass: 'el-icon-warning'
            })
        }

        Vue.prototype.$confirmSave = function() {
            return MessageBox.confirm('内容已经发生改变，是否保存修改', {
                cancelButtonText: '取消',
                confirmButtonText: '保存',
                iconClass: 'el-icon-warning'
            })
        }

        Vue.prototype.$confirmQuit = function() {
            return MessageBox.confirm('确定要退出吗', {
                cancelButtonText: '取消',
                confirmButtonText: '确定',
                iconClass: 'el-icon-warning'
            })
        }

        Vue.prototype.$confirmQuitAll = function() {
            return MessageBox.confirm('是否注销所有子系统', {
                cancelButtonText: '取消',
                confirmButtonText: '确定',
                iconClass: 'el-icon-warning'
            })
        }
    }
}
