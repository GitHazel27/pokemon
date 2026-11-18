<template>
    <!-- Pantalla de carga -->
    <section v-if="isLoading || !randomPokemon" class="flex flex-col justify-center items-center w-screen h-screen">
        <h1 class="text-3xl">Espere por favor</h1>
        <h3 class="animate-pulse">Cargando Pokémons</h3>
    </section>

    <section v-else class="flex flex-col justify-center items-center w-screen h-screen">
        <h1 class="mt-5">¿Quién es este Pokémon?</h1>

        <!-- Resultado-->
        <h3 v-if="gameStatus === GameStatus.Won" class="text-green-600 text-2xl font-bold capitalize">
            ¡Correcto! Es {{ randomPokemon.name }}
        </h3>
        <h3 v-else-if="gameStatus === GameStatus.Lost" class="text-red-600 text-2xl font-bold capitalize">
            Perdiste, era {{ randomPokemon.name }}
        </h3>

        <!-- Pokémon Picture -->
        <PokemonPicture
            :pokemon-id="randomPokemon.id"
            :show-pokemon="gameStatus !== GameStatus.Playing"
        />

        <!-- Pokémon Options -->
        <PokemonOptions
            :options="pokemonOptions"
            :block-selection="gameStatus !== GameStatus.Playing"
            :correct-answer="randomPokemon.id"
            :selected-id="selectedId"
            @selected-option="checkAnswer"
        />

        <!-- Nueva ronda -->
        <button
            v-if="gameStatus !== GameStatus.Playing"
            class="mt-4 bg-blue-500 text-white rounded-lg px-4 py-2 cursor-pointer hover:bg-blue-600 transition-all"
            @click="getNextOptions()"
        >
            Jugar de nuevo
        </button>
    </section>
</template>

<script lang="ts" setup>
import PokemonOptions from '@/components/PokemonOptions.vue'
import PokemonPicture from '../components/PokemonPicture.vue'
import { GameStatus } from '../interfaces'
import { usePokemonGame } from '../composables/usePokemonGame.ts'
import confetti from 'canvas-confetti'
import { watch } from 'vue'

const {
    gameStatus,
    isLoading,
    pokemonOptions,
    randomPokemon,
    selectedId,
    getNextOptions,
    checkAnswer,
} = usePokemonGame()

watch(gameStatus,(status)=>{
    if (status === GameStatus.Won){
        confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } })
    }
})
</script>

<style scope>
</style>