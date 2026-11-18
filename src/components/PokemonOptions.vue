<template> <!--flex-row para fila, flex-col para columna-->
    <section class="mt-5 flex flex-row items-center">
        <!--5 Botonoes-->
        <button
            v-for="{ id, name } in options"
            :key="id"
            :disabled="blockSelection"
            class="capitalize shadow-md rounded-lg p-3 m-2 w-40 text-center transition-all"
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
    if (!props.blockSelection) return 'bg-white cursor-pointer hover:bg-gray-100'
    // Después de responder: la correcta en verde, la elegida (si falló) en rojo
    if (id === props.correctAnswer) return 'bg-green-500 text-white'
    if (id === props.selectedId) return 'bg-red-500 text-white'
    return 'bg-white opacity-50'
}
</script>

<style scoped>
@reference "tailwindcss";

li{
    @apply bg-white shadow-md rounded-lg p-3 m-2 cursor-pointer w-40 text-center transition-all hover:bg-gray-100;
}

</style>