import { localAxios } from '@/util/http-commons';

const local = localAxios();

// 모든 리스트를 가져오기
function listHotplace(param, success, fail) {
  console.log('Hotplace list param :', param);
  local.post(`/hotplace/list`, JSON.stringify(param)).then(success).catch(fail);
}

// 핫플레이스 작성
async function writeHotplace(hotplace, success, fail) {
  console.log('hotplace write ', hotplace);
  await local
    .post(`/hotplace/write`, JSON.stringify(hotplace))
    .then(success)
    .catch(fail);
}

// 핫플레이스 이미지 업로드
async function writeFileHotplace(formData, success, fail) {
  console.log('hotplace write file', formData);
  await local
    .post(`/hotplace/write/file`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(success)
    .catch(fail);
}

function modifyHotplace(article, success, fail) {
  local
    .put(`/hotplace/modify`, JSON.stringify(article))
    .then(success)
    .catch(fail);
}

function deleteHotplace(hotplaceno, success, fail) {
  local.delete(`/hotplace/delete/${hotplaceno}`).then(success).catch(fail);
}

// 핫플 찜 하기
function changeRecommend(hotplaceId, memberId, success, fail) {
  local
    .post(`/hotplace/heart/${hotplaceId}/${memberId}`)
    .then(success)
    .catch(fail);
}

// 찜 누른 pk들 조회
function getMyRecommend(memberId, success, fail) {
  local.get(`/hotplace/myHeart/${memberId}`).then(success).catch(fail);
}

// 찜 목록 조회
function userlistRecommend(memberId, success, fail) {
  local.get(`/hotplace/myHeartList/${memberId}`).then(success).catch(fail);
}

function top3(success, fail) {
  local.get(`/hotplace/top3`).then(success).catch(fail);
}

export {
  listHotplace,
  writeHotplace,
  writeFileHotplace,
  modifyHotplace,
  deleteHotplace,
  changeRecommend,
  getMyRecommend,
  userlistRecommend,
  top3,
};
