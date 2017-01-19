<template>
    <div>

        <div>this is template body</div>
        <other-component/>
    </div>
</template>
<style>
    body{

    }
</style>
<script>
   // import HeaderComponent from './components/Example.vue'
    import OtherComponent from './Example.vue'
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        components:{
            'other-component':OtherComponent,

        }
    }
</script>
