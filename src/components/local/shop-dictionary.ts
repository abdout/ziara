import enShop from './en-ecommerce.json';
import arShop from './ar-ecommerce.json';
import type { Locale } from './config';

const shopDictionaries = {
  en: enShop,
  ar: arShop,
} as const;

export const getShopDictionary = (locale: Locale) => {
  return shopDictionaries[locale] ?? shopDictionaries.en;
};

export type ShopDictionary = typeof enShop;