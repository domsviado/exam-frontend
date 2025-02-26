<template>
  <q-card class="q-pa-md" style="min-width: 400px">
    <q-card-section>
      <div class="text-h6">Login</div>
      <div class="text-subtitle2">Please enter your credentials</div>
    </q-card-section>

    <q-card-section>
      <VForm @submit="onSubmit" class="q-gutter-md">
        <Alert :type="alertType" v-if="hasError" :title="alertMessage" />
        <InputField
          inputType="text"
          name="email"
          placeholder="Email address"
          :rules="{ email: true, required: true }"
          v-model="username"
          autofocus
        />
        <InputField
          id="password"
          name="password"
          placeholder="Password"
          v-model="password"
          :inputType="isPassword ? 'password' : 'text'"
          :rules="{ required: true }"
          label="Password"
        >
          <template v-slot:append>
            <q-icon
              :name="isPassword ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPassword = !isPassword"
            />
          </template>
        </InputField>

        <div class="row">
          <div class="col-12">
            <q-btn
              class="full-width"
              type="submit"
              label="Login"
              color="primary"
              unelevated
              no-caps
              :loading="isLoading"
            />
          </div>
        </div>
      </VForm>
    </q-card-section>
  </q-card>
</template>
<script setup lang="ts">
definePageMeta({
  layout: "unauthenticated-layout",
});

const { $router } = useNuxtApp();
const username = ref(null);
const password = ref(null);
const isPassword = ref(true);
const isLoading = ref(false);

const hasError = ref(false);
const alertType = ref("danger");
const alertMessage = ref("");

const onSubmit = async () => {
  try {
    isLoading.value = true;
    const response = await loginApi({ email: username, password });
    if (response.success) {
      $router.push("/customers");
    } else {
      hasError.value = true;
      alertMessage.value = response.message;
    }
  } catch (err) {
    console.error(err.message);
  } finally {
    isLoading.value = false;
  }
};
const onReset = () => {
  password.value = "";
};
</script>
<style scoped></style>
