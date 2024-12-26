<template>
  <div>
    <InfoPlazaHeader />
    <div class="container mw-screen-xl">
      <LoanHeader activeTab="governmentFund" />
      <BestLoanCard2 :itemList="best4List" linkType="governmentFund" />

      <div class="row mb-4 d-flex justify-content-end">
        <!-- d-flex 및 justify-content-end 추가 -->
        <!-- 필터링 및 검색 -->
        <div class="col-6"></div>
        <div class="col-6 d-flex">
          <!-- col-auto 사용 -->
          <!-- 대출 구분 -->
          <div class="col-1">
            <i
              class="fa-solid fa-rotate-right refresh-icon mt-2"
              :class="{ spinning: isSpinning }"
              style="font-size: 24px; color: #5a5a5a; cursor: pointer"
              @click="refreshIcon"
            ></i>
          </div>
          <div class="col-2">
            <select
              class="form-select round-corner"
              aria-label="Default select example"
              @change="onCategoryChange"
              v-model="selectedCategory"
            >
              <option value="전체" selected disabled hidden>구분</option>
              <option value="전체">전체</option>
              <option value="직접대출">직접대출</option>
              <option value="대리대출">대리대출</option>
            </select>
          </div>
          <!-- 검색창 -->
          <div class="col-7">
            <div class="h-100">
              <form
                class="h-100 form-group"
                @submit.prevent="changeInputData"
                style="height: 40px"
              >
                <div class="h-100 input-group input-group-sm">
                  <input
                    type="text"
                    class="rounded form-control ms-1"
                    placeholder="검색어를 입력해 주세요."
                    v-model="searchInput"
                  />
                </div>
              </form>
            </div>
          </div>
          <div class="col-2">
            <button
              type="button"
              class="btn btn-light fs-lg mt-1 me-1"
              aria-label="Search button"
              style="height: 40px"
              @click="changeInputData"
            >
              <i class="bi bi-search"></i>
            </button>
          </div>
        </div>
      </div>

      <div class="row">
        <!-- 대출 상품 카드 내용 -->
        <div class="row">
          <!-- 대출 상품 카드 여러개 -->
          <div
            class="col-xl-4 mb-5"
            v-for="(item, index) in paginatedDataList"
            :key="index"
          >
            <div
              class="card card-xl-stretch mb-5 mb-xl-8 hover-card2"
              style="height: 100%"
            >
              <div
                class="card-body pt-5 d-flex flex-column justify-content-between"
                style="height: 100%"
              >
                <div>
                  <div
                    id="kt_stats_widget_8_carousel"
                    class="carousel carousel-custom carousel-stretch slide"
                    data-bs-ride="carousel"
                    data-bs-interval="8000"
                  >
                    <div class="row mb-3" style="height: 70px">
                      <div class="col-3 d-flex align-items-center">
                        <img
                          :src="'/images/banklogo/' + 'government' + '.png'"
                          alt=""
                          style="width: 100px"
                        />
                      </div>
                      <div class="col-9 d-flex align-items-center">
                        <!-- Change align-items to center -->
                        <span
                          class="fs-3 text-gray-500 fw-bolder pe-2 text-left"
                        >
                          {{ item.loanProductName }}
                        </span>
                      </div>
                    </div>
                    <div class="carousel-inner pt-0">
                      <div class="carousel-item active">
                        <div class="carousel-wrapper">
                          <div class="d-flex flex-column flex-grow-1">
                            <!-- 첫 번째 행: 신청기간 마감 -->
                            <div
                              class="d-flex justify-content-between align-items-center"
                              style="min-height: 2.5rem"
                            >
                              <p class="fs-5">신청기간</p>
                              <p class="fs-5 fw-bolder">
                                {{
                                  item.applicationPeriod
                                    ? item.applicationPeriod.replace(/>/g, '')
                                    : ''
                                }}
                                <!-- Ensured that '>' is not present -->
                              </p>
                            </div>

                            <!-- 두 번째 행: 구분 -->
                            <div
                              class="d-flex justify-content-between align-items-center"
                              style="min-height: 2.5rem"
                            >
                              <p class="fs-5">구분</p>
                              <p class="fs-5 fw-bolder">
                                {{ item.category }}
                              </p>
                            </div>

                            <!-- 세 번째 행: 금리 -->
                            <div
                              class="d-flex justify-content-between align-items-center"
                              style="min-height: 2.5rem"
                            >
                              <p class="fs-5">금리</p>
                              <p class="fs-5 fw-bolder">
                                {{ item.totalInterestRate }}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Info (상세 보기 버튼) -->
                <div class="d-flex justify-content-end pt-0 mt-auto">
                  <RouterLink
                    :to="`/infoPlaza/governmentFund/governmentFundDetail/${item.loanProductName}`"
                    class="btn btn-light btn-sm btn-color-muted fs-7 fw-bolder px-5"
                    >상세 보기</RouterLink
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 페이지네이션 -->
        <PaginationComponent
          :current-page="currentPage"
          :total-items="totalItems"
          :items-per-page="itemsPerPage"
          @page-changed="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import InfoPlazaHeader from '@/components/infoplaza/InfoPlazaHeader.vue';
import LoanHeader from '@/components/infoplaza/LoanHeader.vue';
import PaginationComponent from '@/components/infoplaza/pagination.vue';
import { ref, computed } from 'vue';
import axios from 'axios';
import { useLoan } from '@/stores/loan.js';
import BestLoanCard2 from '@/components/infoplaza/BestLoanCard2.vue';

const BASEURI = '/api/infoPlaza/loan';

const {
  currentPage,
  itemsPerPage,
  totalItems,
  totalPages,
  paginatedDataList,
  dataList,
  changePage,
  formatDate,
  formatEndDate,
  handlePageChange,
} = useLoan(BASEURI);

const selectedCategory = ref('전체');
const best4List = ref([]);

const searchInput = ref('');

// 데이터 리스트 가져오는 함수
const bringLoanList = async () => {
  try {
    // Best 인기 업종 - 전체
    const response = await axios.get(BASEURI + '/getFilteredList', {
      params: {
        category: selectedCategory.value,
        input: searchInput.value,
      }, // 선택된 필터링 값을 쿼리 파라미터로 전송
    });
    if (response.status === 200) {
      dataList.value = response.data;
      totalItems.value = dataList.value.length;
    } else {
      console.log('데이터 조회 실패');
    }
  } catch (error) {
    console.log('에러발생 :' + error);
  }
};

// 데이터 리스트 가져오는 함수
const bringBest4List = async () => {
  try {
    // Best 인기 업종 - 전체
    const response = await axios.get(BASEURI + '/getBest4');
    if (response.status === 200) {
      best4List.value = response.data;
    } else {
      console.log('데이터 조회 실패');
    }
  } catch (error) {
    console.log('에러발생 :' + error);
  }
};

// 직접대출/대리대출
const onCategoryChange = (event) => {
  selectedCategory.value = event.target.value;
  bringLoanList();
};
// '검색' 필터링
const changeInputData = (event) => {
  bringLoanList();
};

const visiblePages = computed(() => {
  const pages = [];
  for (let i = 1; i <= totalPages.value; i++) {
    pages.push(i);
  }
  return pages;
});

const bringTotalList = async () => {
  try {
    // Best 인기 업종 - 전체
    const response = await axios.get(BASEURI + '/getFilteredList', {
      params: {
        category: '전체',
        input: '',
      }, // 선택된 필터링 값을 쿼리 파라미터로 전송
    });
    if (response.status === 200) {
      dataList.value = response.data;
      totalItems.value = dataList.value.length;
      console.log(dataList.value);
    } else {
      console.log('데이터 조회 실패');
    }
  } catch (error) {
    console.log('에러발생 :' + error);
  }
};
const isSpinning = ref(false);
const refreshIcon = () => {
  isSpinning.value = !isSpinning.value;
  bringTotalList();
  setTimeout(() => {
    isSpinning.value = false; // 회전 후 원래 상태로 돌아오게 함
    selectedCategory.value = '전체';
    searchInput.value = '';
  }, 500); // 애니메이션 시간에 맞춰 0.5초 후 해제
};

bringBest4List();
bringLoanList();
</script>

<style scoped>
/* nav 아래 hr 같은 선 제거 */
.hover-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-card:hover {
  transform: translate(
    -4px,
    -4px
  ); /* Moves the card slightly to the top-left */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1); /* Adds a subtle shadow effect */
}
.hover-card2 {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-card2:hover {
  transform: translate(
    -3px,
    -3px
  ); /* Moves the card slightly to the top-left */
}
.nav {
  border-bottom: none !important;
}

/* li 간격을 늘리기 위한 스타일 */
.nav-item {
  margin: 0 30px; /* li 요소 간의 좌우 간격을 15px로 설정 */
}
/* 활성화된 탭 스타일 */
.nav-link.active {
  background-color: transparent !important; /* 배경 투명 */
  border-bottom: 2px solid #007bff !important; /* 파란색 밑줄 */
  border-radius: 0 !important; /* 테두리 둥글게 하지 않음 */
  border-width: 0;
}

.nav-link.active h4 {
  color: #0056b3 !important; /* 파란색 텍스트 */
}

/* 비활성화된 탭 스타일 */
.nav-link {
  color: #555 !important; /* 약간 어두운 회색 텍스트 */
  border-width: 0;
}

.nav-link:hover h4 {
  color: #007bff !important; /* 호버 시 파란색 */
  text-decoration: none !important; /* 호버 시 밑줄 제거 */
}
.row.d-flex {
  display: flex;
  flex-wrap: wrap;
}

.card-link {
  width: 100%;
}

.card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.custom-card {
  padding: 1rem; /* 기본 패딩을 줄입니다 */
  font-size: 0.875rem; /* 폰트 크기를 줄입니다 */
}
.refresh-icon {
  transition: transform 0.5s ease, color 0.5s ease;
}

.refresh-icon.spinning {
  color: #000; /* 클릭 시 검은색으로 변경 */
  transform: rotate(360deg); /* 회전 애니메이션 */
}
</style>
