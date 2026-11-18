<template>
    <section>
        <img
            :src="imageSource"
            alt="Pokémon"
            class="h-[200px] transition-all"
            :class="{ 'brightness-0': !showPokemon }"
        />
    </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

interface Props {
    pokemonId: number
    showPokemon?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    showPokemon: false,
})

//Recibe el id y devuelve la url 
const imageSource = computed(
    () => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${props.pokemonId}.svg`,
)
</script>

<style scope>
img{
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
}
</style>