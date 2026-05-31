/**
 * Sandbox checkout autofill — geliştirme ve canlı test için.
 * Kaldırmak için USE_CHECKOUT_MOCK_DATA'yı false yapın ve CheckoutForm kullanımını silin.
 */
import { DEFAULT_IYZICO_TEST_CARD } from "@/constants/iyzico/test-cards";

export const CHECKOUT_MOCK_DATA = {
  name: "Test",
  surname: "Kullanıcı",
  email: "test@algorycode.com",
  phone: "+905350000000",
  identityNumber: "11111111111",
  cardHolderName: "TEST KULLANICI",
  cardNumber: DEFAULT_IYZICO_TEST_CARD.cardNumber,
  expireMonth: "12",
  expireYear: "2030",
  cvc: "123",
} as const;

export const USE_CHECKOUT_MOCK_DATA = true;
