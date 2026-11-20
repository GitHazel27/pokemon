<template>
    <section class="my-4 flex justify-center">
        <div class="float-soft rounded-full bg-white/70 ring-4 ring-pink-300 shadow-lg shadow-pink-300 p-10">
        <img
            :src="imageSource"
            alt="Pokémon"
            class="h-[200px]"
            :class="[
                    showPokemon ? 'transition-all duration-500' : 'brightness-0',
                    { 'opacity-0': !loaded },
                ]"
                @load="loaded = true"
        />
        </div>
    </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { ref } from 'vue'
import {watch} from 'vue'

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

const loaded = ref(false)

watch(() => props.pokemonId, () => {
    loaded.value = false
})
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