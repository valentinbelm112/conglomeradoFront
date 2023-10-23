import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:9090',
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Reemplaza 'localStorage' con el método de almacenamiento que estés utilizando.
  if (token) {
    config.headers.Authorization = `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJKREVMQUNSVVpSIiwidXNlcl9uYW1lIjoiSkRFTEFDUlVaUiIsImNvZF9wZXJzb25hbCI6IkpPU0UgQU5UT05ZIERFIExBIENSVVogUk9NQU5JIiwiY29kX2VzdGFkbyI6IiIsImlhdCI6MTY5NzgwOTY3NSwiZXhwIjoxNjk3ODI0MDc1fQ.FdCLB3bY9xFvI0sdA1MmuO9wIk-LqYfJgTXOt96j8E9CEwv6GVQURThXAZjvOmLdXwW3UtsuVb20596DQKf7lg`;
  }
  return config;
});

export default instance;