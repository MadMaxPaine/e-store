import { $host, $authhost } from "./index";

export const login = async function (email, password) {
  return $authhost.post("api/user/login", { email, password });
};
export const registration = async function (regData) {
  const { data } = await $host.post("api/user/registration", regData);
  return data;
};

export const logout = async function () {
  return $authhost.post("api/user/logout");
};


export const fetchUserInfo = async (id) => {
  const { data } = await $authhost.get(`api/userinfo/${id}`);
  return data;
};


export const updateUserInfo = async (userInfo) => {
  const formData = new FormData();
  formData.append("firstName", userInfo.firstName);
  formData.append("secondName", userInfo.secondName);
  formData.append("phone", userInfo.phone);
  formData.append("gender", userInfo.gender);
  if (userInfo.avatar) {
    formData.append("avatar", userInfo.avatar);
  }

  const { data } = await $authhost.put("api/userinfo/update", formData);
  return data;
};
