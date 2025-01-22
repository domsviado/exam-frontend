<template>
  <q-dialog
    v-model="showDialog"
    @hide="$emit('hide')"
    @show="show"
    v-bind="$attrs"
  >
    <q-card
      class="card"
      :class="cardClass"
      :style="`width: ${width}; max-width: ${width}`"
    >
      <div
        class="card__title flex justify-between bg-primary text-white"
        :class="cardTitleClass"
      >
        {{ title }}
        <slot name="close-dialog"></slot>
      </div>
      <div class="card__content">
        <slot> </slot>
      </div>
      <q-inner-loading
        :showing="loading"
        color="primary"
        label="Please wait..."
      ></q-inner-loading>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: null,
  },
  width: {
    type: String,
    default: "600px",
  },
  loading: {
    type: Boolean,
    default: false,
  },
  cardClass: {
    type: String,
    default: "bg-primary text-white",
  },
  cardTitleClass: {
    type: String,
    default: "bg-primary text-white",
  },
});
const emit = defineEmits(["ok", "hide", "show"]);
const showDialog = ref(props.show);
watch(
  () => props.show,
  (show) => {
    showDialog.value = show;
  }
);
function show() {
  emit("show");
}

function closeDialog() {
  emit("hide");
}
</script>

<style lang="postcss" scoped>
.card {
  &__title {
    @apply font-semibold text-lg text-left p-4;
  }
  &__content {
    @apply mt-2 px-4 pb-4;
  }
}
</style>
