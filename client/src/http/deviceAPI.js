import { $host, $authhost } from "./index";

export const createType = async (type) => {
  const { data } = await $authhost.post("api/type", type);
  return data;
};

export const fetchTypes = async () => {
  const { data } = await $host.get("api/type");
  return data;
};

export const deleteType = async (type) => {
  const { data } = await $authhost.delete("api/type", { data: type });
  return data;
};

export const createBrand = async (brand) => {
  const { data } = await $authhost.post("api/brand", brand);
  return data;
};

export const fetchBrands = async () => {
  const { data } = await $host.get("api/brand");
  return data;
};

export const deleteBrand = async (brand) => {
  const { data } = await $authhost.delete("api/brand", { data: brand });
  return data;
};

export const createDevice = async (device) => {
  const { data } = await $authhost.post("api/device", device);
  return data;
};

export const fetchDevices = async (typeId, brandId, page, limit = 5) => {
  const { data } = await $host.get("api/device", {
    params: {
      typeId,
      brandId,
      page,
      limit,
    },
  });
  return data;
};

export const fetchOneDevice = async (id) => {
  const { data } = await $host.get("api/device/" + id);
  return data;
};

export const fetchDevicesAll = async () => {
    const { data } = await $authhost.get("api/device"); 
    return data;
  };
export const deleteDevice = async (device) => {
    const { data } = await $authhost.delete("api/device", { data: device });
    return data;
  };