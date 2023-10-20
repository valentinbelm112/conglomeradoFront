export const validateToken = (token) => {
  const jwt =
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJKREVMQUNSVVpSIiwidXNlcl9uYW1lIjoiSkRFTEFDUlVaUiIsImNvZF9wZXJzb25hbCI6IkpPU0UgQU5UT05ZIERFIExBIENSVVogUk9NQU5JIiwiY29kX2VzdGFkbyI6IiIsImlhdCI6MTY5NzgyMDE4NywiZXhwIjoxNjk3ODM0NTg3fQ.sgpOY3dYuTiWAYuyOA6sT99kOEwcO9OCodEXIxII2JFY10fgiTQotraR86jS_5lBIq4zn-R8YGuUzsVtf5NytQ";
  const base64Url = jwt.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  const payload = JSON.parse(atob(base64));

  // Obtén la fecha actual en segundos (timestamp)
  const currentDate = Math.floor(Date.now() / 1000);
  console.log(payload.exp);
  console.log(currentDate);
  if (payload.exp && payload.exp < currentDate) {
    // El token ha expirado
    console.log("El token ha expirado");
    return true;
  } else {
    // El token aún es válido
    console.log("El token es válido");
    return false;
  }
};
