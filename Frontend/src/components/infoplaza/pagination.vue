<template>
  <div class="py-4 px-6 mt-3">
    <div class="row align-items-center justify-content-center text-center">
      <div class="col-md-12 d-flex flex-column align-items-center">
        <!-- Pagination -->
        <nav aria-label="Page navigation example">
          <ul class="pagination pagination-spaced gap-1">
            <!-- First Page Button -->
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <a class="page-link" href="#" @click.prevent="changePage(1)">
                <i class="fa-solid fa-angles-left"></i>
              </a>
            </li>
            <!-- Previous Page Button -->
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <a
                class="page-link"
                href="#"
                @click.prevent="changePage(currentPage - 1)"
              >
                <i class="fa-solid fa-angle-left"></i>
              </a>
            </li>
            <!-- Ellipsis -->
            <li v-if="currentPage >= 7" class="page-item disabled">
              <span class="page-link">...</span>
            </li>
            <!-- Page Numbers -->
            <li
              v-for="page in visiblePages"
              :key="page"
              class="page-item"
              :class="{ active: currentPage === page }"
            >
              <a class="page-link" href="#" @click.prevent="changePage(page)">
                {{ page }}
              </a>
            </li>
            <!-- Ellipsis -->
            <li
              v-if="currentPage <= totalPages - 10"
              class="page-item disabled"
            >
              <span class="page-link">...</span>
            </li>
            <!-- Next Page Button -->
            <li
              class="page-item"
              :class="{ disabled: currentPage === totalPages }"
            >
              <a
                class="page-link"
                href="#"
                @click.prevent="changePage(currentPage + 1)"
              >
                <i class="fa-solid fa-angle-right"></i>
              </a>
            </li>
            <!-- Last Page Button -->
            <li
              class="page-item"
              :class="{ disabled: currentPage === totalPages }"
            >
              <a
                class="page-link"
                href="#"
                @click.prevent="changePage(totalPages)"
              >
                <i class="fa-solid fa-angles-right"></i>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, toRefs } from 'vue';

// Props from the parent
const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalItems: {
    type: Number,
    required: true,
  },
  itemsPerPage: {
    type: Number,
    default: 20,
  },
});

// Emit event to parent
const emit = defineEmits(['page-changed']);

// Compute total pages and visible pages
const totalPages = computed(() =>
  Math.ceil(props.totalItems / props.itemsPerPage)
);

const visiblePages = computed(() => {
  const pages = [];
  const maxVisiblePages = 10; // Max number of visible pages
  const startPage = Math.max(1, props.currentPage - 5);
  const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages.value);

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  return pages;
});

// Page change handler
function changePage(page) {
  if (page >= 1 && page <= totalPages.value) {
    emit('page-changed', page); // Emit page change event to parent
  }
}
</script>
