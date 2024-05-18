import { localAxios } from '@/util/http-commons';

const local = localAxios();

async function userConfirm(param, success, fail) {
  console.log('param', param);
  const { id, password } = param;
  await local
    .get(`/users`)
    .then(response => {
      if (Array.isArray(response.data) && response.data.length > 0) {
        const user = response.data.find(
          user => user.id === id && user.password === password,
        );
        if (user) {
          success({ data: user });
        } else {
          fail(new Error('아이디 또는 비밀번호가 일치하지 않습니다.'));
        }
      } else {
        fail(new Error('아이디 또는 비밀번호가 일치하지 않습니다.222'));
      }
    })
    .catch(fail);
  console.log('userConfirm ok');
}
async function findById(userid, success, fail) {
  local.defaults.headers['Authorization'] =
    sessionStorage.getItem('accessToken');
  await local.get(`/users/${userid}`).then(success).catch(fail);
}

async function tokenRegeneration(user, success, fail) {
  local.defaults.headers['refreshToken'] =
    sessionStorage.getItem('refreshToken');
  await local.post(`/users/refresh`, user).then(success).catch(fail);
}

async function logout(userid, success, fail) {
  await local.get(`/users/logout/${userid}`).then(success).catch(fail);
}

async function userRegist(user, success, fail) {
  await local.post(`/users`, user).then(success).catch(fail);
}

async function userDelete(userId, success, fail) {
  await local.delete(`/users/${userId}`).then(success).catch(fail);
}

async function findPwd(userId, success, fail) {
  await local.get(`/users/${userId}`).then(success).catch(fail);
}

async function userModify(user, success, fail) {
  await local.put(`/users/${user.id}`, user).then(success).catch(fail);
}

async function userList(success, fail) {
  await local.get(`/admins`).then(success).catch(fail);
}

async function idCheck(userId, success, fail) {
  await local
    .get(`/users`, { params: { id: userId } })
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
  await local.put(`/users/${user.id}/change`, user).then(success).catch(fail);
}

async function adminDelete(userId, success, fail) {
  console.log('관리자가 회원을 삭제한다', userId);
  await local.delete(`/users/${userId}`).then(success).catch(fail);
}

async function adminGetUser(userId, success, fail) {
  await local.get(`/users/${userId}`).then(success).catch(fail);
}

async function uploadProfile(formData, success, fail) {
  console.log('upload profile', formData);
  await local
    .post(`/profiles`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(success)
    .catch(fail);
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
  uploadProfile,
};
