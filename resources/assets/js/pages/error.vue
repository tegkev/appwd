<template>
    <div>
        <div class="row ">
            <div class="col m6 offset-m3 error card-panel  green darken-1">
                <div class="col header-error m12 green ligthen-5">
                    <h3 >Oups !! une erreur s'est protuite</h3>
                    <br>
                    <h1 class="red-text ligthen-2">Erreur: {{ status }}</h1>
                    <br>
                    <p class="right-align">{{ message }}</p>
                </div>
            </div>

        </div>


    </div>
</template>

<script>

    export default{
        data(){
            return{
                status:"",
                message:"",
            }
        },

    }
</script>
<style>
body{
    background-color:green;
}
   .error{

    margin-top: 10%;

  }
  .error h3,p{
    color:white;
  }
  .error-header{
    height: 20px;
  }
</style>