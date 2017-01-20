<template>
    <div id="login-page" class="row">
        <div class="col s3 z-depth-4 offset-s5 card-panel">
            <form class="login-form">
                <div class="row">
                    <div class="input-field col s12 center"><img src="images/login-logo.png" alt=""
                                                                 class="circle responsive-img valign profile-image-login">
                        <p class="center login-form-text">Material Design Admin Template</p></div>
                </div>
                <div class="row margin">
                    <div class="input-field col {invalid:status} s12">
                        <i class="mdi-social-person-outline prefix"></i>
                        <input id="username" type="text" v-model="name" @blur="controle">
                        <label for="username" class="active">Username</label></div>
                </div>
                <a href="#">{{name}}</a>
                <div class="row margin">
                    <div class="input-field col s12">
                        <i class="mdi-action-lock-outline prefix"></i>
                        <input id="password" type="password" v-model="password">
                        <label for="password" class="active">Password</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12 m12 l12  login-text">
                        <input type="checkbox" id="remember-me" v-model="remember">
                        <label for="remember-me">Remember me</label></div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <a href="index.html" class="btn waves-effect waves-ligh  col s12" @click.prevent="affiche">Login</a>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s6 m6 l6"><p class="margin medium-small"><a href="">Register Now!</a>
                    </p></div>
                    <div class="input-field col s6 m6 l6"><p class="margin right-aligned medium-small"><a href="">Forgot
                        password ?</a></p></div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>

    export default{
        data(){
            return{
                name:"",
                password:"",
                remember:false
            }
        },
        methods:{
            affiche(){
                alert('bonjour');
            },
            controle(){
                    if(this.name.length <3){
                        alert('champ mal rempli');
                        status=true;
                    }
            }
        }


    }
</script>
