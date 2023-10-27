export default defineEventHandler(async (event) => {
  // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // NOTE: オレオレ証明書を使用している場合は有効にする
  let tokenType = '';
  let accessToken = '';
  let refreshToken = '';
  let expires = 0;

  const formData = new FormData();
  formData.append('client_id', useRuntimeConfig().public.clientId);
  formData.append('client_secret', useRuntimeConfig().clientSecret);
  formData.append('grant_type', 'refresh_token');
  formData.append('refresh_token', String(getQuery(event).refreshToken));

  await $fetch(useAppConfig().wekoOrigin + '/oauth/token', {
    timeout: useRuntimeConfig().public.apiTimeout,
    method: 'POST',
    body: formData,
    onResponse({ response }) {
      if (response.status === 200) {
        tokenType = response._data.token_type;
        accessToken = response._data.access_token;
        refreshToken = response._data.refresh_token;
        expires = response._data.expires_in;
      }
    },
    onResponseError(context) {
      // TODO: log file
      console.log(context);
    }
  });

  return { tokenType, accessToken, refreshToken, expires };
});