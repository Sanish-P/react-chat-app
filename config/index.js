const ENV = {
  production: {
    baseURL: 'http://localhost:3000',
    timeout: 1000
  },
  development: {
    baseURL: 'http://localhost:3000',
    timeout: 1000
  },
  test: {
    baseURL: 'http://localhost:3000',
    timeout: 1000
  }
}


export default function config() {
  console.log(environment);
  return ENV[environment];
}
