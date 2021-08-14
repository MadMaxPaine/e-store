import { makeAutoObservable } from 'mobx';


export default class DeviceStore {
 constructor() {
  this._types = [
   { id: 1, name: "Freezers" },
   { id: 2, name: "Phones" },
   { id: 3, name: "TV's" },
   { id: 4, name: "PC's" },
  ];
  this._brands = [
   { id: 1, name: "Samsung" },
   { id: 2, name: "Xiaomi" },
   { id: 3, name: "Lenovo" },
   { id: 4, name: "Apple" },
  ];
  this._devices = [
   { id: 1, name: "Galaxy x", price: 25000, rating: 5, img: 'https://content2.rozetka.com.ua/goods/images/big/165919739.jpg' },
   { id: 2, name: "Galaxy x", price: 25000, rating: 5, img: 'https://content2.rozetka.com.ua/goods/images/big/165919739.jpg' },
   { id: 3, name: "Galaxy x", price: 25000, rating: 5, img: 'https://content2.rozetka.com.ua/goods/images/big/165919739.jpg' },
   { id: 4, name: "Galaxy x", price: 25000, rating: 5, img: 'https://content2.rozetka.com.ua/goods/images/big/165919739.jpg' },
  ];
  this._selectedType = {};
  this._selectedBrand = {};
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
 setSelectedType(type) {
  this._selectedType = type;
 }
 setSelectedBrand(brand) {
  this._selectedBrand = brand;
 }

 get types() {
  return this._types;
 }
 get brands() {
  return this._brands;
 }
 get devices() {
  return this._devices;
 }
 get selectedType() {
  return this._selectedType;
 }
 get selectedBrand() {
  return this._selectedBrand;
 }
}