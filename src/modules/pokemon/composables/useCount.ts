import { ref, watch, type Ref } from 'vue'
import { GameStatus } from '../interfaces'

export const useCount = (gameStatus: Ref<GameStatus>) => {
    const wins = ref(0)
    const losses = ref(0)

    watch(gameStatus, (status) => {
        if (status === GameStatus.Won) wins.value++
        else if (status === GameStatus.Lost) losses.value++
    })

    const resetCount = () => {
        wins.value = 0
        losses.value = 0
    }

    return {
        wins,
        losses,
        resetCount,
    }
}