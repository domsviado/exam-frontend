<template>
  <div class="alert" :class="type">
    <div class="alert__header">
      <div class="header__title">
        <Icon
          name="mdi:check-circle"
          color="#16A34A"
          width="24"
          height="24"
          v-if="type === 'success'"
        />
        <Icon
          name="mdi:close-octagon"
          color="#E45959"
          width="24"
          height="24"
          v-if="type === 'danger'"
        />
        <Icon
          name="mdi:alert"
          color="#facc15"
          width="24"
          height="24"
          v-if="type === 'warning'"
        />
        <Icon
          name="mdi:information-outline"
          color="#407B95"
          width="24"
          height="24"
          v-if="type === 'info'"
        />
        {{ title }}
      </div>
      <div class="header__action"></div>
    </div>
    <div class="alert__body">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  type: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: null,
  },
});
</script>

<style lang="postcss" scoped>
.alert {
  @apply p-[12px];
  &__header {
    @apply flex flex-row justify-between items-center;
    .header__title {
      @apply flex flex-row items-center gap-[5px];
      @apply font-semibold text-[0.875rem];
    }
  }
  &__body {
    @apply pl-[30px] text-[0.875rem];
  }
  &.success {
    @apply bg-cucumber border border-green-500 rounded-lg;
    > .alert__header {
      > .header__title {
      }
    }
  }
  &.danger {
    @apply bg-salmon border border-paprika rounded-lg;
    > .alert__header {
      > .header__title {
        @apply text-paprika;
      }
    }
  }
  &.info {
    @apply bg-bubbles border border-soap rounded-lg;
    > .alert__header {
      > .header__title {
        @apply text-soap;
      }
    }
  }
  &.warning {
    @apply bg-yellow-100 border border-yellow-500 rounded-lg;
    > .alert__header {
      > .header__title {
        @apply text-yellow-500;
      }
    }
  }
}
</style>
