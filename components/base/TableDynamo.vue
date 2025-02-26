<template>
  <q-table v-bind="$attrs" @request="onRequest" v-model:pagination="pagination">
    <!-- LOADING TEMPLATE -->
    <template v-slot:loading>
      <q-inner-loading showing color="primary" />
    </template>
    <!-- SEARCH TEMPLATE -->
    <template v-if="filterable" v-slot:top-right>
      <q-input
        borderless
        dense
        debounce="300"
        v-model="filter"
        placeholder="Search"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
    <!-- PAGINATION TEMPLATE -->
    <template v-slot:pagination="scope">
      <q-btn
        icon="chevron_left"
        color="grey-8"
        round
        dense
        flat
        :disable="scope.isFirstPage"
        @click="onPrevPage(scope)"
      />
      <q-btn
        icon="chevron_right"
        color="grey-8"
        round
        dense
        flat
        :disable="scope.isLastPage"
        @click="onNextPage(scope)"
      />
    </template>
    <!-- SLOT FOR BODY ACTION -->
    <template v-slot:body-cell-action="props">
      <q-td :props="props">
        <slot name="action" v-bind="props.row"></slot>
      </q-td>
    </template>
  </q-table>
</template>
<script setup lang="ts">
interface Column {
  name: string;
  label: string;
  field: string | ((row: any) => any);
  required?: boolean;
  align?: "left" | "right" | "center";
  sortable?: boolean;
  sort?: (a: any, b: any, rowA: any, rowB: any) => number;
  headerClasses?: string;
  classes?: string;
}

const props = defineProps({
  filterable: {
    type: Boolean,
    default: false,
  },
  lastEvaluatedToken: {
    type: String,
    default: null,
  },
  nextPageCustom: {
    type: Boolean,
    default: false,
  },
  prevPageCustom: {
    type: Boolean,
    default: false,
  },
});

const pagination = ref({
  sortBy: "desc",
  descending: false,
  page: 1,
  rowsPerPage: 2,
  rowsNumber: 10,
  lastEvaluatedToken: null,
});

let filter = ref("");
const emit = defineEmits(["fetchData", "nextPage", "prevPage"]);

const onRequest = (props) => {
  pagination.value = props.pagination;
  emit("fetchData", pagination.value);
};

const evaluatedKeys = ref<any>([]);

watch(
  () => props.lastEvaluatedToken,
  (newToken) => {
    pagination.value.lastEvaluatedToken = newToken;
  }
);

const onNextPage = (scope) => {
  if (!scope.isLastPage) {
    evaluatedKeys.value.push(pagination.value.lastEvaluatedToken);
    if (props.nextPageCustom) {
      emit("nextPage");
    }
    scope.nextPage();
  }
};
const onPrevPage = (scope) => {
  if (!scope.isFirstPage) {
    evaluatedKeys.value.pop();
    const lastKey = evaluatedKeys.value[evaluatedKeys.value.length - 1];
    pagination.value.lastEvaluatedToken = lastKey;
    if (props.prevPageCustom) {
      emit("prevPage");
    }
    scope.prevPage();
  }
};
</script>
