import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { defineStore } from 'pinia';
import { jwtDecode } from 'jwt-decode';

import { userConfirm, findById, tokenRegeneration, logout } from '@/api/member';
import { httpStatusCode } from '@/util/http-status';
import { useMenuStore } from '@/store/menuStore';
export const useMemberStore = defineStore(
  'memberStore',
  () => {
    const router = useRouter();
    const menuStore = useMenuStore();
    const isLogin = ref(false);
    const isLoginError = ref(false);
    const userInfo = ref(null);
    const isValidToken = ref(false);

    const userLogin = async loginUser => {
      await userConfirm(
        loginUser,
        async response => {
          // async 키워드 추가
          console.log('response좀 보자', response);
          if (response.data.status === httpStatusCode.CREATE) {
            let { data } = response.data;
            let accessToken = data.accessToken;
            let refreshToken = data.refreshToken;
            sessionStorage.setItem('accessToken', accessToken);
            sessionStorage.setItem('refreshToken', refreshToken);

            isLogin.value = true;
            isLoginError.value = false;
            isValidToken.value = true;

            console.log('sessionStorage에 담았다', isLogin.value);
          } else {
            console.log('로그인 실패했다');
            isLogin.value = false;
            isLoginError.value = true;
            isValidToken.value = false;
          }
        },
        error => {
          console.error('로그인 에러', error);
          alert('아이디 혹은 비밀번호를 확인해주세요');
          isLogin.value = false;
          isLoginError.value = true;
          isValidToken.value = false;
        },
      );
    };

    const getUserInfo = async token => {
      let decodeToken = jwtDecode(token);
      console.log('2. decodeToken', decodeToken);
      //여기서 에러?
      await findById(
        decodeToken.memberId,
        async response => {
          console.log('token 유효성 검사', response);

          if (response.status === 200) {
            userInfo.value = response.data;
            isValidToken.value = true;
            console.log(
              '3. getUserInfo data ------------------------>> ',
              response.data,
            );
          } else {
            console.log('유저 정보 없음!!!!');
            isValidToken.value = false;
            await tokenRegenerate();
          }
        },
        async error => {
          console.error(
            'getUserInfo() error code [토큰 만료되어 사용 불가능.] ::: ',
            error.response.status,
          );
          isValidToken.value = false;
          await tokenRegenerate();
        },
      );
    };

    const tokenRegenerate = async () => {
      console.log(
        '토큰 재발급 >> 기존 토큰 정보 : {}',
        sessionStorage.getItem('accessToken'),
      );
      await tokenRegeneration(
        JSON.stringify(userInfo.value),
        response => {
          if (response.status === 201) {
            let accessToken = response.data.accessToken;
            console.log('재발급 완료 >> 새로운 토큰 : {}', accessToken);
            sessionStorage.setItem('accessToken', accessToken);
            isValidToken.value = true;
          }
        },
        async error => {
          // HttpStatus.UNAUTHORIZE(401) : RefreshToken 기간 만료 >> 다시 로그인!!!!
          if (error.response.status === 'fail') {
            console.log('갱신 실패');
            // 다시 로그인 전 DB에 저장된 RefreshToken 제거.
            await logout(
              userInfo.value.memberId,
              response => {
                if (response.status === 200) {
                  console.log('리프레시 토큰 제거 성공');
                } else {
                  console.log('리프레시 토큰 제거 실패');
                }
                alert('RefreshToken 기간 만료!!! 다시 로그인해 주세요.');
                isLogin.value = false;
                userInfo.value = null;
                isValidToken.value = false;
                router.push({ name: 'login' });
              },
              error => {
                console.error(error);
                isLogin.value = false;
                userInfo.value = null;
              },
            );
          }
        },
      );
    };

    const userLogout = async memberId => {
      console.log('안뜸?', memberId);
      await logout(
        memberId,
        response => {
          console.log(`응답으로 옴 ${memberId}`);
          if (response.status === 200) {
            isLogin.value = false;
            userInfo.value = null;
            isValidToken.value = false;
            sessionStorage.removeItem('refreshToken');
            sessionStorage.removeItem('accessToken');
            sessionStorage.removeItem('menuStore');
            menuStore.logout();
          } else {
            console.error('유저 정보 없음!!!!');
          }
        },
        error => {
          console.log(error);
        },
      );
    };
    if (sessionStorage.getItem('accessToken') !== null) {
      getUserInfo(sessionStorage.getItem('accessToken'));
    }

    return {
      isLogin,
      isLoginError,
      userInfo,
      isValidToken,
      userLogin,
      getUserInfo,
      tokenRegenerate,
      userLogout,
    };
  },
  { persist: { storage: sessionStorage } },
);
