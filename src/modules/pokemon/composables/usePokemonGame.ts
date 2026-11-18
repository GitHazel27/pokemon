import { computed, onMounted, ref } from 'vue'
import { GameStatus, type Pokemon, type PokemonListResponse } from '../interfaces'
import { pokemonApi } from '../api/pokemonApi'

//Devuelve una copia mezclada
const shuffle = <T>(array: T[]): T[] => [...array].sort(() => Math.random() - 0.5)

export const usePokemonGame = () => {
    const gameStatus = ref<GameStatus>(GameStatus.Playing)
    const pokemons = ref<Pokemon[]>([])
    const pokemonOptions = ref<Pokemon[]>([])
    const randomPokemon = ref<Pokemon | null>(null) //Pokemon correcto
    const selectedId = ref<number | null>(null) //Id el pokemon elegido

    // Lista completa (sin mezclar) para rellenar cuando se agoten los pokémon
    let allPokemons: Pokemon[] = []

    const isLoading = computed(() => pokemonOptions.value.length === 0 || !randomPokemon.value)

    //Llama a la api y transforma cada resultado en id:name
    const getPokemons = async (): Promise<Pokemon[]> => {
        const response = await pokemonApi.get<PokemonListResponse>('/?limit=151')
        return response.data.results.map(pokemon => {
            const urlParts = pokemon.url.split('/')
            const id = urlParts.at(-2) ?? 0
            return {
                name: pokemon.name,
                id: +id,
            }
        })
    }

    // Prepara una nueva ronda: 4 opciones, solo una es la correcta
    const getNextOptions = (howMany: number = 5) => {
        //Reinicia el juego
        gameStatus.value = GameStatus.Playing
        selectedId.value = null

        //Vuelve a mezclar la lista si hay menos pokemons
        if (pokemons.value.length < howMany) {
            pokemons.value = shuffle(allPokemons)
        }

        pokemonOptions.value = pokemons.value.slice(0, howMany)
        pokemons.value = pokemons.value.slice(howMany)

        const index = Math.floor(Math.random() * pokemonOptions.value.length)
        randomPokemon.value = pokemonOptions.value[index] ?? null
    }

    // Solo una oportunidad
    const checkAnswer = (id: number) => {
        if (gameStatus.value !== GameStatus.Playing) return

        selectedId.value = id
        gameStatus.value = id === randomPokemon.value?.id ? GameStatus.Won : GameStatus.Lost
    }

    // Lo montamos directamente para ver el resultado al momento en que cargue la aplicación
    onMounted(async () => {
        await new Promise((r) => setTimeout(r, 1000))
        allPokemons = await getPokemons()
        pokemons.value = shuffle(allPokemons)
        getNextOptions()
    })

    return {
        gameStatus,
        isLoading,
        pokemonOptions,
        randomPokemon,
        selectedId,
        // Methods
        getNextOptions,
        checkAnswer,
    }
}