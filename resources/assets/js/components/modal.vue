<template>
    <div>
        <a class="waves-effect waves-light btn" href="#modal1" @click="open">Modal</a>

        <!-- Modal Structure -->
        <div id="modal1" class="modal">
            <div class="modal-content">
                <h4>Modal Header</h4>
                <p>A bunch of text</p>
            </div>
            <div class="modal-footer">
                <a href="#!" class=" waves-effect waves-green btn-flat" @click="close">Agree</a>
            </div>

        </div>
    </div>
</template>

<script>

    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        mounted(){

        },
        methods:{
            open(){
                $('#modal1').modal();
            },
            close(){
                 $('#modal1').modal();
            }
        }
    }



</script>
