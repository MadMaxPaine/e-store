import { makeAutoObservable, action, runInAction } from "mobx";
import { addDeviceIntoBasket, deleteDeviceFromBasket } from "../http/basketAPI";
import { fetchOneDevice } from "../http/deviceAPI";

export default class Basket {
  items = [];
 
  constructor() {
    makeAutoObservable(this, {
      fetchBasket: action,
      setBasketItems: action,
      addItem: action,
      removeItem: action,
      updateItemQuantity: action,
      clearBasket: action,
    });
  }

  // Завантажити дані кошика з сервера
  async fetchBasket(data) {   
    runInAction(() => {
      this.items = data;
    });
  }

  async setBasketItems(data) {
    const newItems = [];

    for (const item of data) {
      try {
        const value = await fetchOneDevice(item.deviceId);
        const existingItem = newItems.find((basketItem) => basketItem.id === value.id);

        if (!existingItem) {
          newItems.push({ ...value, quantity: item.quantity });
        }
      } catch (err) {
        console.error("Failed to fetch device:", err);
      }
    }

    runInAction(() => {
      this.items = newItems;
    });
  }

  // Додати товар до кошика
  async addItem(item, quantity = 1) {
    await addDeviceIntoBasket(item.id, quantity);
    runInAction(() => {
      const existingItem = this.items.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.items.push({ ...item, quantity });
      }
    });
  }

  // Видалити товар з кошика
  async removeItem(id) {
    await deleteDeviceFromBasket(id);
    runInAction(() => {
      this.items = this.items.filter((item) => item.id !== id);
    });
  }

  // Отримати загальну вартість кошика
  get totalPrice() {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  // Отримати загальну кількість товарів у кошику
  get totalQuantity() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  // Очистити кошик
  clearBasket() {
    runInAction(() => {
      this.items = [];
    });
  }
}
