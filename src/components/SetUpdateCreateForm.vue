<script setup>
import {ref, computed, watch, nextTick } from 'vue'
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

import { useStoreSetsCards } from '@/stores/setsCards.js'


const props = defineProps({
  setName: {
    type: String,
    required: false,
  }
})



// 
const cardsHtml = ref()
const setsCards = useStoreSetsCards()

// initialization
const EMPTY_CARDS_FORM_VALUE = [
  [],
]

const formSetName = ref(props.setName)


const cardsFormData = ref(null)
setCardsFormData()

function setCardsFormData(newSetName) {
  cardsFormData.value = props.setName
    ? Object.entries(setsCards.sets[newSetName || props.setName] )
    : EMPTY_CARDS_FORM_VALUE
}

const storeData = computed(() => 
  props.setName 
    ? setsCards.sets[props.setName] 
    : {}
)

watch(
  storeData,
  newValue => setCardsFormData(),
)



// submition
function onSubmitTry() {
  if (!formSetName.value) {
    alert('fill in set name')
    return
  }

  const newCards = createSetData()
  props.setName 
    ? updateSet(props.setName, newCards)
    : createSet(formSetName.value, newCards)
}

function createSetData() {
  const entries = cardsFormData.value.filter(cardEntry => cardEntry[0] && cardEntry[1] )
  return Object.fromEntries(entries)
}

function updateSet(setName, setCards) {
  setsCards.updateSet(setName, setCards)
}
function createSet(setName, setCards) {
  setsCards.createSet(setName, setCards)
}


// Placeholder
const isLastRowEmpty = computed(() => {
  const lastCard = cardsFormData.value[cardsFormData.value.length - 1]
  return !lastCard.length
})


function onPlaceholderFocus(cardSide) {
  cardsFormData.value.push([])
  const lastCardInd = cardsFormData.value.length - 1
  
  nextTick(() => {
    const row = cardsHtml.value[lastCardInd]
    const targetInput = row.querySelector(`[placeholder=${cardSide}]`)
    targetInput.focus()
  })
}


// clear
function clearRaw(cardInd) {
  cardsFormData.value[cardInd] = []
  if (cardInd === cardsFormData.value.length - 1) return
  cardsHtml.value[cardInd].classList.add('_hidden')
}


</script>

<template>
  <div>
    <form class="form"
      @submit.prevent="onSubmitTry"
    >
      <div class="form__row form-row">
        <Input class="form__set-name" placeholder="set name"
          v-model="formSetName"
        ></Input>
      </div>

      <div class="form__row form-row _label">
        <div>questions:</div>
        <div>answers:</div>
      </div>

      <div class="form__row form-row"
        v-for="card, ind in cardsFormData" :key="ind"
        ref="cardsHtml"
      >
        <Input type="text" class="form-row__question" placeholder="question"
          v-model="card[0]"
          :data-card-ind="ind"
        />
        <Input type="text" class="form-row__answer" placeholder="answer"
          v-model="card[1]"
          :data-card-ind="ind"
        />
        <Btn
          @click="() => clearRaw(ind)"
        >&#x2716;</Btn>
      </div>

      <div class="form__row form-row-placeholder"
        v-if="!isLastRowEmpty"
      >
        <Input type="text" class="form-row__question" placeholder="question"
          @focus.prevent="() => onPlaceholderFocus('question')"
        />
        <Input type="text" class="form-row__answer" placeholder="answer"
          @focus.prevent="() => onPlaceholderFocus('answer')"
        />
      </div>

      <div class="form__row">
        <Btn class="form__submit" type="submit">
          {{ props.setName ? 'save changes' : 'create set' }}
        </Btn>
      </div>
    </form>
  </div>  
</template>

<style scoped lang="pcss">
@import "@/assets/css/_vars";

.form {

  &__row {
    display: flex;
    gap: 2rem;
    margin-bottom: 1rem;
  }

  &__set-name {
    width: 100%;
  }

  &__submit {
    margin-left: auto;
    margin-right: 5.5rem;
  }
}
.form-row {

  &__question,
  &__answer {
    flex: 1 1 auto;
  }

  &__question {
  }

  &__answer {
  }


  &._label {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
.form-row-placeholder {
  padding-right: 5.5rem;
}

._hidden {
  display: none;
}

</style>