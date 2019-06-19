const env = (() => {
  const ENV = {
    // 请求url
    baseApi: '',
  }

  switch (process.env.NODE_ENV) {
    case 'development':

      ENV.baseApi = `http://192.168.31.18:3000`;
      // ENV.baseApi = `http://192.168.9.22:3000`;

      break
    default:
      ENV.baseApi = process.env.API_ENV === 'dev' ?
        `http://192.168.31.18:3000` :
        // `http://192.168.9.22:3000` :
        `https://666/api`;

      break
  }

  return ENV
})()

export default env
