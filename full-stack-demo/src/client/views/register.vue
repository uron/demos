<template>
    <u-grid-layout :class="$style.register">
        <u-grid-layout-row :repeat="1">
            <u-grid-layout-column :span="1">
                <u-form :class="$style.form" :rules="rules">
                    <u-form-item label="账号" name="account">
                        <u-input type="text" size="large" v-model="account" placeholder="请输入账号"></u-input>
                    </u-form-item>
                    <u-form-item label="密码" name="pwd">
                        <u-input type="password" size="large" v-model="password" placeholder="请输入密码"></u-input>
                    </u-form-item>
                    <u-form-item label="确认密码" name="pwdAgain">
                        <u-input type="password" size="large" v-model="passwordAgain" placeholder="请再次确认密码"></u-input>
                    </u-form-item>
                    <u-form-item>
                        <u-button color="primary" @click="register">注册</u-button>
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
            passwordAgain: '',
            rules: {
                account: [
                    { type: 'string', required: true, trigger: 'blur', message: '请输入账号' },
                    { type: 'string', required: true, trigger: 'blur', message: '', validator: (rule, value, callback) => {
                        if(value){
                            const result = this.$http.get('/user/exit/' + value);
                            result.then(res => {
                                if(res.data.success){
                                    rule.message = res.data.info;
                                    return callback(rule.message);
                                }else{
                                    callback();
                                }
                            });
                        }
                    }},
                ],
                pwd: [
                    { type: '', required: true, trigger: 'blur'},
                ],
                pwdAgain: [
                    { type: '', required: true, trigger: 'blur', message: '', validator: (rule, value, callback) => {
                        if(value !== this.password){
                            rule.message = '确认密码需与设置密码一致';
                            return callback(rule.message);
                        }else{
                            callback();
                        }
                    }},
                ],
            },
        }
    },
    methods: {
        register(){
            const param = {
                account: this.account,
                password: this.password,
            };
            const result = this.$http.post('/adduser', param);
            result.then(res => {
                if(res.data.success){
                    this.$toast.show('注册用户成功');
                    this.$router.push('/login');
                }
            });
        },
    }
}
</script>

<style module>
.register{
    padding-top: 100px;
}
</style>

