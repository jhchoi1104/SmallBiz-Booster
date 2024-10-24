<template>
  <div>
    <!-- Title Section -->
    <div class="d-flex justify-content-center align-items-center mt-5">
      <div class="row">
        <div class="d-flex align-items-center mb-6">
          <img
            src="@/assets/img/infoplaza/thumbsUp.png"
            alt=""
            style="height: auto; max-height: 30px"
          />
          <h2 class="ms-2" style="font-weight: 700">BEST 금리 상품</h2>
        </div>
      </div>
    </div>

    <!-- Card Section -->
    <div class="card mb-10 p-4" style="background-color: #f6f4f9">
      <div class="row">
        <div class="col-xl-3" v-for="(item, index) in itemList" :key="index">
          <RouterLink
            :to="`/infoPlaza/${linkType}/${
              item.loanKey || item.loanProductName
            }`"
          >
            <div class="card card-xl-stretch h-100 hover-card">
              <div
                class="card-body pt-5 d-flex flex-column justify-content-between"
              >
                <div>
                  <div class="d-flex flex-stack flex-wrap">
                    <span
                      class="fs-3 text-gray-500 pe-2"
                      style="font-weight: 500"
                    >
                      {{ item.productName || item.loanProductName }}
                    </span>
                  </div>
                  <div class="carousel-inner pt-6">
                    <div class="carousel-item active">
                      <div class="carousel-wrapper">
                        <div class="d-flex flex-column flex-grow-1">
                          <!-- Additional content can be added here -->
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Interest Rate -->
                <div class="d-flex justify-content-end align-items-end ms-auto">
                  <p class="fs-6 text-gray-600 mb-1">금리</p>
                  <p class="h2 fw-bold mb-0 ms-2">
                    {{ item.lowestInterestRate || item.totalInterestRate }}
                  </p>
                </div>
              </div>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

// Props definition
const props = defineProps({
  itemList: {
    type: Array,
    required: true,
    default: () => [],
  },
  linkType: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.hover-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-card:hover {
  transform: translate(-4px, -4px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.card {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
