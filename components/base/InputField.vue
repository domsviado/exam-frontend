<template>
  <q-input
    v-bind="$attrs"
    filled
    dense
    v-model="value"
    :type="showPassword ? 'text' : inputType"
    :error="errors.length ? true : undefined"
    :error-message="errorMessage"
    no-error-icon
  >
    <template #label v-if="$slots.label">
      <slot name="label"></slot>
    </template>
    <template #append v-if="$slots.append">
      <slot name="append"></slot>
    </template>
  </q-input>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";

const props = defineProps({
  label: {
    type: String,
    default: null,
  },
  inputType: {
    type: String as PropType<
      | "number"
      | "text"
      | "textarea"
      | "time"
      | "password"
      | "email"
      | "search"
      | "tel"
      | "file"
      | "url"
      | "date"
      | "datetime-local"
      | undefined
    >,
    default: "text",
  },
  name: {
    type: String,
    required: true,
  },
  inputClass: {
    type: String,
    default: null,
  },
  step: {
    type: String,
    default: "1",
  },
  rules: {
    type: [String, Object],
  },
  modelValue: {
    type: [String, Number] as PropType<string | number | null>,
  },
  showPassword: {
    type: Boolean,
    default: false,
  },
  isDirty: {
    type: Boolean,
    default: false,
  },
  sizeClass: {
    type: String,
    default: "",
  },
  heightClass: {
    type: String,
    default: "",
  },
  widthClass: {
    type: String,
    default: "",
  },
  labelColor: {
    type: String,
    default: "",
  },
  blur: {
    type: Function,
    default: null,
  },
});
const emit = defineEmits(["update:modelValue", "update:isDirty", "change"]);

const { errorMessage, meta, errors, value, handleChange } = useField(
  props.name,
  props.rules,
  {
    bails: false,
    initialValue: props.modelValue,
    label: props.label ? props.label : props.name,
  }
);

// Watch value change
watch(value, (val) => {
  emit("update:modelValue", val);
});

// Watch meta (dirty state)
watch(
  meta,
  (meta) => {
    emit("update:isDirty", meta.dirty);
  },
  { deep: true }
);
</script>
