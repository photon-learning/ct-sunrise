<style src="./LocationSelector.scss" lang="scss"></style>
<i18n src="./LocationSelector.txt"></i18n>
<script src="./LocationSelector.js"></script>

<template>
  <li>
    <a href="javascript:;">{{$t(title)}}</a>
    <ul >
      
      <li v-for="value in listValues" v-bind:key="value.name" >
        <div v-if="descriptiontext == value.id">
          <a @click.prevent="()=>setValue(value.id)" href="javascript:;" class="lang-choosed"
          >{{value.name}}</a>
        </div>
      <div v-else>
        <a @click.prevent="()=>setValue(value.id)" href="javascript:;" class="lang-default"
          >{{value.name}}</a>
      </div>
        
      </li>
    </ul>
    
  </li>

</template>
