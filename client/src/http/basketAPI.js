import {$authhost} from "./index";

export const addDeviceIntoBasket = async (id) => {
  const { data } = await $authhost.post("api/basket/add"+id);
  return data;
};

export const deleteDeviceFromBasket = async (product) => {
  const { data } = await $authhost.delete("api/basket/remove", { data: product });
  return data;
};

export const updateDeviceInBasket = async (product) => {
  const { data } = await $authhost.post("api/basket/update", product);
  return data;
};

export const clearBasket = async (product) => {
  const { data } = await $authhost.delete("api/basket/clear", product);
  return data;
};

export const getDevicesInBasket = async (id) => {
  const { data } = await $authhost.get("api/basket/"+id);
  return data;
};

