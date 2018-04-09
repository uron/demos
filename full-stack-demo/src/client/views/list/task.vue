<template>
    <div>
        <header :class="$style.head">
            <div :class="$style.wrap">
                <u-logo :class="$style.left"></u-logo><span :class="$style.title">full stack demo</span>
            </div>
        </header>
        <u-grid-layout>
        <u-grid-layout-row :repeat="8">
            <u-grid-layout-column :span="2"></u-grid-layout-column>
            <u-grid-layout-column :span="4">
                <main :class="$style.body">
                    <u-grid-layout gap="large">
                        <u-grid-layout-row :repeat="1">
                            <u-grid-layout-column :span="1">
                                欢迎, {{user}}!  你的待办事项是： 
                                <u-link :class="$style.right" @click="loginOut">退出</u-link>
                            </u-grid-layout-column>
                        </u-grid-layout-row>
                        <u-grid-layout-row :repeat="1">
                            <u-grid-layout-column :span="1">
                                <u-input size="normal huge" v-model="addName" @keyup.enter="addTask"></u-input>
                                <u-button color="primary" :class="$style.btn" :disabled="!addName" @click="addTask">添加</u-button>
                            </u-grid-layout-column>
                        </u-grid-layout-row>
                    </u-grid-layout>
                    <u-tabs :value="type" @select="type = $event.value">
                        <u-tab title="待办事项" value="todo"></u-tab>
                        <u-tab title="已完成事项" value="done"></u-tab>
                    </u-tabs>
                    <template v-if="type=='todo'">
                        <u-grid-layout gap="large">
                            <u-grid-layout-row v-if="todolist.length == 0">
                                <u-grid-layout-column>暂无待办事项</u-grid-layout-column>
                            </u-grid-layout-row>
                            <u-grid-layout-row v-else :repeat="2" v-for="(item ,index) in todolist">
                                <u-grid-layout-column :span="1">
                                    {{item.content}}
                                </u-grid-layout-column>
                                <u-grid-layout-column :span="1">
                                    <u-button size="small" color="primary" @click="changeStatus(index)">完成</u-button>
                                    <u-button size="small" :class="$style.btn" @click="getUpdate(index)">修改</u-button>
                                    <u-button size="small" :class="$style.btn" @click="deleteTask(index)">删除</u-button>
                                </u-grid-layout-column>
                            </u-grid-layout-row>
                        </u-grid-layout>
                    </template>
                    <template v-else>
                        <u-grid-layout gap="large">
                            <u-grid-layout-row v-if="donelist.length == 0">
                                <u-grid-layout-column>暂无已完成事项</u-grid-layout-column>
                            </u-grid-layout-row>
                            <u-grid-layout-row v-else :repeat="2" v-for="(item ,index) in donelist">
                                <u-grid-layout-column :span="1">
                                    <span :class="$style.done">{{item.content}}</span>
                                </u-grid-layout-column>
                                <u-grid-layout-column :span="1">
                                    <u-button size="small" color="primary" @click="changeStatus(index)">还原</u-button>
                                </u-grid-layout-column>
                            </u-grid-layout-row>
                        </u-grid-layout>
                    </template>
                </main>
            </u-grid-layout-column>
            <u-grid-layout-column :span="2"></u-grid-layout-column>
        </u-grid-layout-row>
    </u-grid-layout>
    <u-modal :visible="updateVisible" title="修改任务" @ok="updateTask" @cancel="updateVisible = false">
        <u-form>
            <u-form-item label="任务名称">
                <u-input size="normal" v-model="update.content"></u-input>
            </u-form-item>
        </u-form>
    </u-modal>
    </div>
</template>

<script>
export default {
    data(){
        return{
            id: '',
            user: '',
            addName: '',
            searchName: '',
            type: 'todo',
            todolist: [],
            donelist: [],
            updateVisible: false,
            update: {},
        }
    },
    created(){
        this.getUser();
        this.getTodoTask();
        this.getDoneTask();
    },
    methods: {
        getUser(){
            const token = sessionStorage.getItem('demo-token')
            if (token !== null && token !== 'null') {
                let data = token.split('&&');
                this.user = data[0];
                this.id = data[1];
            }
        },
        loginOut(){
            sessionStorage.setItem('demo-token', null);
            this.$router.push('/login');
        },
        addTask(){
            let param = {
                id: this.id,
                content: this.addName,
                status: false,
            };
            const result = this.$http.post('/task', param);
            result.then(res => {
                if(res.data.success){
                    this.$toast.show('创建任务成功');
                    this.addName = '';
                    this.getTodoTask();
                }
            })
        },
        getTodoTask(){
            const result = this.$http.get('/task/todo/' + this.id);
            result.then((res) => {
                if (res.data.success) { 
                    this.todolist = res.data.result;
                }
            })
        }, 
        getDoneTask(){
            const result = this.$http.get('/task/done/' + this.id);
            result.then(res => {
                if(res.data.success) {
                    this.donelist = res.data.result;
                }
            })
        },
        deleteTask(index){
            const result = this.$http.delete('/task/' + this.id + '/' + this.todolist[index].id);
            result.then(res => {
                if(res.data.success) {
                    this.$toast.show('删除任务成功');
                    this.getTodoTask();
                }
            })
        },
        changeStatus(index){
            const url = this.type === 'todo' ? '/task/' + this.id + '/' + this.todolist[index].id : '/task/' + this.id + '/' + this.donelist[index].id;
            const param = {
                content: this.type === 'todo' ? this.todolist[index].content : this.donelist[index].content,
                status: this.type === 'todo' ? this.todolist[index].status : this.donelist[index].status,
            };
            const result = this.$http.put(url, param);
            result.then(res => {
                if(res.data.success) {
                    this.$toast.show('任务状态更新成功');
                    this.getTodoTask();
                    this.getDoneTask();
                }
            })
        },
        getUpdate(index){
            this.update = this.todolist[index];
            this.updateVisible = true;    
        },
        updateTask(){
            const param = {
                content: this.update.content,
                status: this.update.status
            };
            const result = this.$http.put('/task/' + this.id + '/' + this.update.id , param);
            result.then(res => {
                if(res.data.success) {
                    this.$toast.show('任务修改成功');
                    this.getTodoTask();
                }
            })
        },
    }
}
</script>

<style module>
.head {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    height: 68px;
    background: $brand-primary;
    color: white;
    box-shadow: 0 3px 4px rgba(0,0,0,0.1);
    padding: 0 10px;
    z-index: 1;
}
.wrap {
    width: 1180px;
    margin: 0 auto;
}
.title{
    color: #fff;
    height: 64px;
    line-height: 64px;
    font-size: 24px;
}
.left {
    float: left;
}
.body{
    margin-top: 100px;
}
.right{
    float: right;
}
.btn{
    margin-left: 20px !important;
}
.done{
    color: rgb(221, 221, 221);
    text-decoration: line-through;
}
</style>

