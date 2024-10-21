<template>
  <div class="col-4">
    <!--begin::List widget 7-->
    <div class="card card-flush h-md-100">
      <!--begin::Header-->
      <div class="card-header py-7">
        <!--begin::Statistics-->
        <div class="m-0">
          <!--begin::Heading-->
          <div class="d-flex align-items-center mb-2">
            <!--begin::Title-->
            <span class="fs-2hx fw-bold text-gray-800 lh-1 ls-n2">
              {{ title }}
            </span>
            <!--end::Title-->
            <router-link :to="link" class="ms-auto" style="font-size: 13px">
              <i class="fa-solid fa-arrow-up-right-from-square"></i>
              더보기
            </router-link>
          </div>
          <!--end::Heading-->
        </div>
        <!--end::Statistics-->
        <!--begin::Toolbar-->
        <div class="card-toolbar"></div>
        <!--end::Toolbar-->
      </div>
      <!--end::Header-->
      <!--begin::Body-->
      <div class="card-body pt-0">
        <!--begin::Items-->
        <div class="mb-0">
          <div v-for="(item, index) in items" :key="item.stdrTrdarSvc">
            <div class="d-flex flex-stack mt-3">
              <!--begin::Section-->
              <div class="d-flex align-items-center me-5" style="flex-grow: 1">
                <!--begin::Symbol-->
                <div class="symbol symbol-30px me-5 col-2">
                  <img
                    :src="'/images/businessItem/' + item.svcIndutyCdNm + '.png'"
                    alt=""
                    style="width: 30px"
                  />
                </div>
                <!--end::Symbol-->
                <!--begin::Content-->
                <div class="me-auto col-7">
                  <p style="color: gray; font-size: 0.6rem">
                    {{ item.trdarSeCdNm }}
                  </p>
                  <span style="color: black; font-size: 1rem">{{
                    item.svcIndutyCdNm
                  }}</span>
                </div>
                <!--end::Content-->
              </div>
              <!--end::Section-->
              <!--begin::Wrapper-->
              <div class="d-flex align-items-center col-5">
                <span
                  class="text-gray-800 fw-bold fs-6 me-3 col-4 text-center"
                  :class="{
                    'text-success': item.rankChange.startsWith('+'),
                    'text-danger':
                      item.rankChange.startsWith('-') &&
                      !/^-\s*$/.test(item.rankChange),
                  }"
                >
                  {{ item.rankChange }}
                </span>
                <div class="d-flex flex-center">
                  <span v-if="item.opbizStorCo > 0">
                    <span class="badge badge-light-success fs-base text-center">
                      <i class="fa-solid fa-angle-up"></i>
                      {{ item.opbizStorCo }} 점포
                    </span>
                  </span>
                  <span v-else>
                    <span class="badge badge-light-middle fs-base text-center"
                      >{{ item.opbizStorCo }} 점포</span
                    >
                  </span>
                </div>
              </div>
              <!--end::Wrapper-->
            </div>
            <hr v-if="index < items.length - 1" />
          </div>
        </div>
        <!--end::Items-->
      </div>
      <!--end::Body-->
    </div>
    <!--end::List widget 7-->
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  title: String,
  link: String,
  items: Array,
});
</script>

<style scoped>
.badge-light-middle {
  background-color: rgba(255, 165, 0, 0.1); /* 연한 오렌지색 배경 */
  color: #ff8c00; /* 짙은 오렌지색 텍스트 */
}
.badge-light-success {
  background-color: #d4edda !important; /* 밝은 녹색 배경색 */
  color: #155724 !important; /* 진한 녹색 텍스트 */
}
.badge-light-danger {
  background-color: rgba(220, 53, 69, 0.1); /* 연한 빨간색 배경 */
  color: #dc3545; /* 빨간색 텍스트 */
}
.card {
  overflow: hidden; /* 카드가 내부 내용을 벗어나지 않도록 설정 */
  border-radius: 0.35rem; /* 카드의 모서리 라운드 설정 */
}

.text-overlay {
  /* position: absolute; */
  z-index: 1; /* 텍스트가 이미지 위에 표시되도록 설정 */
  text-align: left; /* 왼쪽 정렬 */
  font-weight: 600;
}
.text-purple {
  color: #fca3b9;
}
</style>
