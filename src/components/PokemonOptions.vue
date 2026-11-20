<template> <!--flex-row para fila, flex-col para columna-->
    <section class="mt-5 flex flex-row items-center">
        <!--5 Botonoes-->
        <button
            v-for="{ id, name } in options"
            :key="id"
            :disabled="blockSelection"
            class="capitalize font-bold border-2 shadow-md rounded-full py-3 px-4 m-2 w-48 text-center transition-all duration-200 disabled:cursor-default"
            :class="buttonClass(id)"
            @click="emits('selectedOption', id)"
        >
            {{ name }}
    </button>
    </section>
</template>

<script lang="ts" setup>
import type { Pokemon } from '@/modules/pokemon/interfaces'

interface Props {
    options: Pokemon[]
    blockSelection: boolean
    correctAnswer: number
    selectedId: number | null
}

const props = defineProps<Props>()

    //Emite el id del pokemon elegido
const emits = defineEmits<{
    selectedOption: [id: number]
}>()

const buttonClass = (id: number) => {
    // Antes de responder
    if (!props.blockSelection) return 'bg-pink-100 text-pink-700 border-pink-300 cursor-pointer hover:bg-pink-200 hover:scale-105 hover:shadow-lg'
    // Después de responder: la correcta en verde, la elegida (si falló) en rojo
    if (id === props.correctAnswer) return 'bg-emerald-300 text-emerald-900 border-emerald-400 scale-105'
    if (id === props.selectedId) return 'bg-rose-400 text-white border-rose-500'
    return 'bg-pink-50 text-pink-300 border-pink-100 opacity-70'
}
</script>

<style scoped>
@reference "tailwindcss";

li{
    @apply bg-white shadow-md rounded-lg p-3 m-2 cursor-pointer w-40 text-center transition-all hover:bg-gray-100;
}

</style>