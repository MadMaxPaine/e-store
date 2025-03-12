import { $authhost } from "./index";

export const addDeviceIntoBasket = async (user,id,quantity) => {  
  const { data } = await $authhost.post("api/basket/add/", {
    userId:user._user.id,
    deviceId: id,
    quantity: quantity
  });  // Надсилаємо deviceId та quantity у body
  return data;
};

export const deleteDeviceFromBasket = async (deviceId) => {
  const { data } = await $authhost.delete(`api/basket/remove/${deviceId}`);
  return data;
};

export const clearBasket = async (id) => {
  const { data } = await $authhost.delete("api/basket/clear/"+id,{ userId: id });
  return data;
};

export const getDevicesInBasket = async (id) => { 
  try {
    const { data } = await $authhost.get('api/basket/'+id, { userId: id });
    return data;
  } catch (err) {
    // Логування помилки для дебагу
    console.error('Error fetching devices in basket:', err);

    // Повертаємо помилку, яку можна обробити в компоненті
    throw new Error('Failed to fetch basket items. Please try again later.');
  }
};