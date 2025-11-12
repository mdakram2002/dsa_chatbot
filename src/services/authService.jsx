import apiRequest from './api';

export const googleAuth = async (accessToken, userInfo) => {
  return apiRequest('/auth/google', {
    method: 'POST',
    body: {
      access_token: accessToken,
      userInfo
    }
  });
};

export const createGuestUser = async () => {
  return apiRequest('/auth/guest', {
    method: 'POST'
  });
};

export const convertGuestToUser = async (guestId, userInfo, accessToken) => {
  return apiRequest('/auth/convert-guest', {
    method: 'POST',
    body: {
      guestId,
      userInfo,
      access_token: accessToken
    }
  });
};