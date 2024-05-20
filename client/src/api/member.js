import { localAxios } from '@/util/http-commons';

const local = localAxios();

async function userConfirm(param, success, fail) {
  console.log('param', param);
  await local
    .post(`/members/login`, param) // POST 요청의 본문에 `param`을 직접 포함시키기
    .then(response => {
      // 서버 응답 데이터가 성공적인지 확인
      if (response.data.status === 'success' && response.data.data) {
        console.log('Login successful:', response.data.message);
        success(
          // accessToken: response.data.data.accessToken,
          // refreshToken: response.data.data.refreshToken,
          response,
        );
      } else {
        console.log('Failed to login:', response.data.message);
        fail(new Error('로그인 실패: ' + response.data.message));
      }
    })
    .catch(error => {
      console.error('Error during login:', error);
      fail(error);
    });
  console.log('userConfirm ok');
}

async function findById(memberId, success, fail) {
  local.defaults.headers['Authorization'] =
    sessionStorage.getItem('accessToken');
  await local
    .get(`/members/${memberId}`, {
      headers: { 'ngrok-skip-browser-warning': '69420' },
    })
    .then(success)
    .catch(fail);
}

async function tokenRegeneration(member, success, fail) {
  local.defaults.headers['refreshToken'] =
    sessionStorage.getItem('refreshToken');
  await local.post(`/members/refresh`, member).then(success).catch(fail);
}

async function logout(memberId, success, fail) {
  await local.get(`/members/logout/${memberId}`).then(success).catch(fail);
}

async function userRegist(user, success, fail) {
  // console.log('VITE_VUE_API_URL:', import.meta.env.VITE_VUE_API_URL);

  await local.post(`/members/signup`, user).then(success).catch(fail);
}

async function userDelete(memberId, success, fail) {
  await local.delete(`/members/${memberId}`).then(success).catch(fail);
}

async function findPwd(memberId, success, fail) {
  await local.get(`/members/${memberId}`).then(success).catch(fail);
}

async function userModify(user, success, fail) {
  await local.put(`/members/${user.id}`, user).then(success).catch(fail);
}

async function userList(success, fail) {
  await local.get(`/members`).then(success).catch(fail);
}

async function idCheck(memberId, success, fail) {
  await local
    .get(`/members`, { params: { id: memberId } })
    .then(response => {
      if (response.data.length > 0) {
        success(response);
      } else {
        fail(new Error('존재하지 않는 아이디입니다.'));
      }
    })
    .catch(fail);
}

async function changePwd(user, success, fail) {
  await local.put(`/members/${user.id}/change`, user).then(success).catch(fail);
}

async function adminDelete(memberId, success, fail) {
  console.log('관리자가 회원을 삭제한다', memberId);
  await local.delete(`/members/${memberId}`).then(success).catch(fail);
}

async function adminGetUser(memberId, success, fail) {
  await local.get(`/members/${memberId}`).then(success).catch(fail);
}

export {
  userConfirm,
  findById,
  tokenRegeneration,
  logout,
  userRegist,
  userDelete,
  findPwd,
  userModify,
  userList,
  idCheck,
  changePwd,
  adminDelete,
  adminGetUser,
};
