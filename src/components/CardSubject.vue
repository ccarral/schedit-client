<template>
  <div class="card m-1 bg-info bg-opacity-25 border">
    <div class="card-body p-2 colored-block" :class="style">
      <div class="conatainer">
        <div class="position-relative">
          <div class="position-absolute top-0 end-0">
            <button @click="$emit('closed')" type="button" class="btn btn-dark p-0 pe-1 ps-1">
              <i class="fa-solid fa-xmark "></i>
            </button>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col" >
          <p class="p-0 m-0"><b>{{ subjectName }}</b></p>
          <p v-if="group" class="p-0 m-0"><span>Grupo: </span><b>{{ group }}</b></p>
          <p v-if="id" class="p-0 m-0"><span>Clave: </span><b>{{ id }}</b></p>
          <p v-if="teacher" class="p-0 m-0"><span>Profesor(a):
          </span><b>{{ teacher }}</b></p>
        </div>
        <div class="col d-flex text-center align-items-center justify-content-center">
          <div class="sticker">
          {{label}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    subjectName: {
      type: String,
      default: "Nombre Materia",
    },
    group: {
      type: String,
      optional: true,
    },
    id:{
      type: String,
      optional: true,
    },
    teacher:{
      type: String,
      optional: true
    },
    label:{
        type: String,
        default: ""
    },
    style:{
        type:String,
    }
  },
  name: 'CardSubject'
}
</script>

<style>

</style>
