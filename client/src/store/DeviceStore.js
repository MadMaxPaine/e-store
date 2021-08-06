import { makeAutoObservable } from 'mobx';


export default class DeviceStore {
 constructor() {
  this._types = [
   { id: 1, name: "Freezers" },
   { id: 2, name: "Phones" },
  ];
  this._brands = [
   { id: 1, name: "Samsung" },
   { id: 2, name: "Xiaomi" },
  ];
  this._devices = [
   { id: 1, name: "Galaxy x", price: 25000, rating: 5, img: 'https://content2.rozetka.com.ua/goods/images/big/165919739.jpg' },
   { id: 2, name: "Galaxy x", price: 25000, rating: 5, img: 'https://content2.rozetka.com.ua/goods/images/big/165919739.jpg' },
   { id: 3, name: "Galaxy x", price: 25000, rating: 5, img: 'https://content2.rozetka.com.ua/goods/images/big/165919739.jpg' },
   { id: 4, name: "Galaxy x", price: 25000, rating: 5, img: 'https://content2.rozetka.com.ua/goods/images/big/165919739.jpg' },

  ];
  makeAutoObservable(this);
 }

 setTypes(types) {
  this._types = types;
 }
 setBrands(brands) {
  this._brands = brands;
 }
 setDevices(devices) {
  this._devices = devices;
 }

 get Types() {
  return this._types;
 }
 get Brands() {
  return this._brands;
 }
 get Devices() {
  return this._devices;
 }
}