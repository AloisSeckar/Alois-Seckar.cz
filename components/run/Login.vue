<template>
  <ClientOnly>
    <dialog ref="myDialog" class="border border-1 border-primary rounded p-2">
      <form method="dialog">
        <p class="m-2">
          <label for="userInput">Secret phrase:</label>
          <UInput
            id="userInput"
            v-model="inputValue"
            type="password"
            autocomplete="on"
          />
        </p>
        <div class="m-2 flex flex-row gap-2 justify-center">
          <UButton @click="submitValue">
            Login
          </UButton>
          <UButton color="amber" @click="closeDialog">
            Close
          </UButton>
        </div>
      </form>
    </dialog>
  </ClientOnly>
</template>

<script setup lang="ts">
const myDialog = useTemplateRef<HTMLDialogElement>('myDialog')
const inputValue = ref('')

function openDialog() {
  myDialog.value?.showModal()
}
defineExpose({ openDialog })

function closeDialog() {
  myDialog.value?.close()
}

function submitValue() {
  useLoginStore().setLogin(inputValue.value)
  closeDialog()
}
</script>
