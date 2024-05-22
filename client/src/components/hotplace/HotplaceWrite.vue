<script setup>
import { onMounted, ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { writeHotplace, writeFileHotplace } from '@/api/hotplace.js';
import { useMemberStore } from '@/store/memberStore';
import FilterBox from '@/components/hotplace/FilterBox.vue';
import { emitter } from '@/util/eventBus';

const memberStore = useMemberStore();
const router = useRouter();
const memberId = memberStore.userInfo.data.memberId;
// 핫플 객체
const hotplace = reactive({
  memberId: null,
  title: '',
  content: '',
  address: '',
  heart: 0, // default 값 설정
  selectedFilter: '', // 필터 변수 넣기
});
//게시물 필터
const filters = [
  'aden',
  '_1977',
  'brannan',
  'brooklyn',
  'clarendon',
  'earlybird',
  'gingham',
  'hudson',
  'inkwell',
  'kelvin',
  'lark',
  'lofi',
  'maven',
  'mayfair',
  'moon',
  'nashville',
  'perpetua',
  'reyes',
  'rise',
  'slumber',
  'stinson',
  'toaster',
  'valencia',
  'walden',
  'willow',
  'xpro2',
];

const hotplaceId = ref(0);

// 이미지 객체
const image = ref({
  file: null,
  preview: null,
});

// 파일을 첨부하면 실행되는 함수
const onInputImg = e => {
  hotplace.memberId = memberId;
  const target = e.target;
  if (target.files && target.files[0]) {
    image.value.file = target.files[0];
    image.value.preview = URL.createObjectURL(target.files[0]);
  }
  console.log('게시물에 대한 memberId', hotplace.memberId);
};
onMounted(() => {
  emitter.on('clickFilter', s => {
    // s가 null이거나 undefined인 경우 'basic'을 사용
    hotplace.selectedFilter = s || 'basic';
    console.log('필터 클릭됨', hotplace.selectedFilter);
  });
});
// 등록하기 버튼을 누르면 실행되는 함수
const write = async () => {
  console.log('작성할 핫플 글 -> ', hotplace);
  await writeHotplace(
    hotplace,
    ({ data }) => {
      console.log('write한 핫플 번호 ->', data);
      hotplaceId.value = data;
    },
    error => {
      console.log(error);
    },
  );

  // 파일 이미지
  const formData = new FormData();
  if (image.value.file) {
    formData.append('uploadFile', image.value.file);
    console.log('이미지와 연결된 핫플레이스 아이디', hotplaceId.value.data);
    formData.append('hotplaceId', hotplaceId.value.data);

    // 이미지 파일 업로드 요청
    await writeFileHotplace(
      formData,
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      },
    );
  }
  moveList();
};

// HotplaceList.vue로 이동
const moveList = () => {
  router.push('/hotplace');
};
</script>

<template>
  <v-container class="my-5">
    <v-row>
      <v-col cols="12" md="8">
        <v-card class="pa-5" outlined>
          <v-card-title>
            <h3 class="font-weight-bold">핫플 등록</h3>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="write">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="hotplace.title"
                    label="장소"
                    placeholder="장소..."
                    dense
                    hide-details
                    class="mb-4 input-field custom-underline"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-textarea
                    v-model="hotplace.content"
                    label="후기"
                    placeholder="후기..."
                    rows="5"
                    dense
                    hide-details
                    class="mb-4 input-field custom-underline"
                  ></v-textarea>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="hotplace.address"
                    label="주소"
                    placeholder="주소..."
                    dense
                    hide-details
                    class="mb-4 input-field custom-underline"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-file-input
                    @change="onInputImg"
                    label="파일 첨부"
                    accept="image/*"
                    dense
                    hide-details
                    class="mb-4 input-field custom-underline"
                  ></v-file-input>
                </v-col>
              </v-row>
              <div class="text-center">
                <v-btn @click="write" color="#0A82FF" class="mr-4 action-btn"
                  >등록하기</v-btn
                >
                <v-btn @click="moveList" color="#FF607F" class="action-btn"
                  >뒤로가기</v-btn
                >
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="pa-5" outlined>
          <v-card-title>
            <h3 class="font-weight-bold">사진 미리보기</h3>
          </v-card-title>
          <v-card-text>
            <v-card v-if="image.preview" class="mx-auto image-card">
              <v-img
                :src="image.preview"
                height="350px"
                class="preview-image"
                cover
                :class="hotplace.selectedFilter"
              ></v-img>
            </v-card>
          </v-card-text>
        </v-card>
        <div class="filters" v-if="image.preview">
          <FilterBox
            :image="image.preview"
            :filter="filter"
            v-for="(filter, i) in filters"
            :key="i"
          >
            <template v-slot:a> {{ filter }}</template>
          </FilterBox>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.font-weight-bold {
  font-weight: bolder;
}

.input-field {
  background-color: #f9f9f9;
  border-radius: 8px;
}

.custom-underline .v-input__control .v-input__slot:before,
.custom-underline .v-input__control .v-input__slot:after {
  content: none;
}

.custom-underline {
  border-bottom: 2px solid #dcdcdc;
}

.action-btn {
  transition: all 0.3s ease;
}

.action-btn:hover {
  transform: scale(1.05);
}

.image-card {
  transition: all 0.3s ease;
  border: 2px solid #dcdcdc;
  padding: 10px;
  border-radius: 15px;
}

.preview-image {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.image-card:hover .preview-image {
  transform: scale(1.1);
  transition: all 0.3s ease;
}

.v-card {
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.v-card-title {
  border-bottom: 1px solid #e0e0e0;
}

.v-card-text {
  padding-top: 20px;
}

.filters {
  overflow-x: scroll;
  white-space: nowrap;
}
.filter-1 {
  width: 100px;
  height: 100px;
  background-color: cornflowerblue;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color: white;
  background-size: cover;
}
.filters::-webkit-scrollbar {
  height: 5px;
}
.filters::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.filters::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}
.filters::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
