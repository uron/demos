<template>
    <u-grid-layout :class="$style.login">
        <u-grid-layout-row :repeat="1">
            <u-grid-layout-column :span="1">
                <u-form :class="$style.form" :rules="rules">
                    <u-form-item label="账号" name="account">
                        <u-input type="text" size="large" v-model="account" placeholder="请输入账号"></u-input>
                    </u-form-item>
                    <u-form-item label="密码" name="pwd">
                        <u-input type="password" size="large" v-model="password" placeholder="请输入密码"></u-input>
                    </u-form-item>
                    <u-form-item>
                        <u-button color="primary" @click="login">登录</u-button>
                        <u-link :class="$style.link" to="/register">注册</u-link>
                    </u-form-item>
                </u-form>
            </u-grid-layout-column>
        </u-grid-layout-row>
    </u-grid-layout>
</template>

<script>
export default {
    data(){
        return{
            account: '',
            password: '',
            rules: {
                account: [
                    { type: 'string', required: true, trigger: 'blur', message: '请输入账号' },
                ],
                pwd: [
                    { type: 'string', required: true, trigger: 'blur', message: '请输入密码' },
                ],
            },
        }
    },
    methods: {
        login(){
            let param = {
                name: this.account,
                password: this.password
            }
            const result = this.$http.post('/user', param)
            result.then((res) => {
                if (res.data.success) { // 如果成功
                    sessionStorage.setItem('demo-token', res.data.name + '&&' + res.data.id) // 用sessionStorage把用户信息保存下来
                    this.$toast.show('登录成功！');
                    this.$router.push('/task') // 进入todolist页面，登录成功
                } else {
                    this.$toast.show(res.data.info);
                    sessionStorage.setItem('demo-token', null) // 将token清空
                    }
                }, (err) => {
                    console.log(err)
                    this.$toast.show('请求错误！')
                    sessionStorage.setItem('demo-token', null) // 将token清空
                })
            return result
        },
    },
}
</script>

<style module>
.login{
    padding-top: 100px;
}
.link{
    margin-left: 30px;
}
</style>
