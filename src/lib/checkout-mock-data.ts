/**
 * Sandbox checkout autofill — geliştirme/test için.
 * Canlıya çıkmadan önce bu dosyayı ve CheckoutForm'daki kullanımını kaldırın.
 */
export const CHECKOUT_MOCK_DATA = {
  name: "Test",
  surname: "Kullanıcı",
  email: "test@algorycode.com",
  phone: "+905350000000",
  identityNumber: "11111111111",
  cardHolderName: "TEST KULLANICI",
  cardNumber: "5406670000000009",
  expireMonth: "12",
  expireYear: "2030",
  cvc: "123",
} as const;

export const USE_CHECKOUT_MOCK_DATA = process.env.NODE_ENV === "development";
