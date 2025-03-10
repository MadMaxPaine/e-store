import { makeAutoObservable } from 'mobx';

export default class Basket {
    items = [];

    constructor() {
        makeAutoObservable(this);
    }

    // Додати товар до кошика або збільшити кількість, якщо такий товар вже є
    addItem(item) {
        const existingItem = this.items.find((i) => i.id === item.id);
        if (existingItem) {
            this.updateItemQuantity(item.id, existingItem.quantity + 1);
        } else {
            this.items.push({ ...item, quantity: 1 });
        }
    }

    // Видалити товар з кошика
    removeItem(id) {
        this.items = this.items.filter((item) => item.id !== id);
    }

    // Видалити всі товари одного типу
    removeAllItem(id) {
        this.items = this.items.filter((item) => item.id !== id);
    }

    // Оновлення кількості товару в кошику
    updateItemQuantity(id, quantity) {
        if (quantity <= 0) {
            this.removeItem(id); // Якщо кількість 0, видаляємо товар
        } else {
            const item = this.items.find((i) => i.id === id);
            if (item) {
                item.quantity = quantity;
            }
        }
    }

    // Отримати загальну вартість кошика
    get totalPrice() {
        return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
    }

    // Отримати загальну кількість товарів у кошику
    get totalQuantity() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    // Оновлення кошика після отримання даних з API
    setBasketItems(items) {
        this.items = items;
    }

    // Очистити кошик
    clearBasket() {
        this.items = [];
    }
}
