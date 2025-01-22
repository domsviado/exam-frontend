<template>
  <div class="q-pa-md">
    <div class="row justify-end">
      <div class="mb-2">
        <q-btn color="primary" no-caps class="mb-2" @click="showDialog"
          >Add New Customer</q-btn
        >
      </div>
    </div>

    <q-table
      :loading="isLoading"
      title="Customers"
      :rows="rows"
      :columns="columns"
      v-model:pagination="pagination"
      row-key="name"
      @request="onRequest"
    />

    <Dialog
      title="Add New Customer"
      v-model="dialogVisible"
      cardClass="bg-white text-black"
    >
      <template #close-dialog>
        <button
          @click="cancelDialog"
          class="close-dialog"
          data-modal-toggle="crud-modal"
        >
          <svg
            class="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
      </template>
      <VForm @submit="onSubmit">
        <div class="row gap-2">
          <InputField
            class="col"
            name="first_name"
            placeholder="First Name"
            rules="max:30|required|validName"
            v-model="form.first_name"
          >
            <template #label> First Name </template>
          </InputField>
          <InputField
            class="col"
            name="last_name"
            placeholder="Last Name"
            rules="max:30|required|validName"
            v-model="form.last_name"
          >
            <template #label> Last Name </template>
          </InputField>
        </div>
        <InputField
          class="my-2"
          name="email"
          placeholder="Email Address"
          rules="required|email|max:128"
          v-model="form.email"
        >
          <template #label> Email </template>
        </InputField>
        <InputField
          class="my-2"
          name="birthdate"
          inputType="date"
          placeholder="Birthdate"
          rules="required|validAge"
          v-model="form.birthdate"
          hint="Birthdate"
        >
          <template #label> Birthdate </template>
        </InputField>
        <div class="row justify-end">
          <q-btn
            color="primary"
            type="submit"
            :loading="isSubmitting"
            label="Save"
          ></q-btn>
        </div>
      </VForm>
    </Dialog>
  </div>
</template>
<script setup lang="ts">
import { useCustomerStore } from "~/store/customer";
definePageMeta({
  layout: "default",
});
const { $api, $toast } = useNuxtApp();
const customerStore = useCustomerStore();

const pagination = ref({
  sortBy: "desc",
  descending: false,
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 10,
});

onMounted(() => {
  fetchCustomers(pagination.value.page);
});

const isLoading = ref(false);
const dialogVisible = ref(false);

const rows = ref([]);

const fetchCustomers = async (page) => {
  const { data, error } = await $api.customers.fetchAll(page);
  if (data.value?.data) {
    rows.value = data.value.data;
    pagination.value.rowsNumber = data.value.pagination.total_items;
  }
};

const onRequest = async (props) => {
  const { page } = props.pagination;
  isLoading.value = true;
  await fetchCustomers(page);
  pagination.value.page = page;
  isLoading.value = false;
};

const showDialog = () => {
  dialogVisible.value = true;
};

const cancelDialog = () => {
  form.first_name = null;
  form.last_name = null;
  form.email = null;
  form.birthdate = null;
  dialogVisible.value = false;
};

const form = reactive({
  first_name: null,
  last_name: null,
  email: null,
  birthdate: null,
});

const onSubmit = async () => {
  isLoading.value = true;
  const { data, error } = await $api.customers.createCustomer(form);
  if (data.value.data) {
    console.log("Data", data.value);
    $toast.success(data.value.message);
    await fetchCustomers(pagination.value);
  }
  cancelDialog();
  isLoading.value = false;
};

const columns = [
  {
    name: "first_name",
    required: true,
    label: "First Name",
    align: "left",
    field: "first_name",
  },
  {
    name: "last_name",
    required: true,
    label: "Last Name",
    align: "left",
    field: "last_name",
  },
  {
    name: "email",
    required: true,
    label: "Email Address",
    align: "left",
    field: "email",
  },
  {
    name: "birthdate",
    required: true,
    label: "Birthdate",
    align: "left",
    field: "birthdate",
  },
  {
    name: "age",
    required: true,
    label: "Age",
    align: "left",
    field: "age",
  },
  {
    name: "created_at",
    required: true,
    label: "Date Created",
    align: "left",
    field: "created_at",
  },
];
</script>
