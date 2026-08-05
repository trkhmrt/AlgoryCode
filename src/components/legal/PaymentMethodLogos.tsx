type PaymentMethodLogosProps = {
  variant?: "footer" | "checkout";
  className?: string;
};

export function PaymentMethodLogos({
  variant = "footer",
  className = "",
}: PaymentMethodLogosProps) {
  if (variant === "checkout") {
    return (
      <div
        className={`flex flex-col items-center gap-3 sm:items-start ${className}`}
      >
        <img
          src="/images/iyzico/iyzico_ile_ode_colored_horizontal.svg"
          alt="iyzico ile öde"
          width={280}
          height={32}
          className="h-7 w-auto max-w-full"
        />
        <img
          src="/images/iyzico/logo_band_colored.svg"
          srcSet="/images/iyzico/logo_band_colored@1x.png 1x, /images/iyzico/logo_band_colored@2x.png 2x, /images/iyzico/logo_band_colored@3x.png 3x"
          alt="Visa, Mastercard ve diğer ödeme yöntemleri"
          width={429}
          height={32}
          className="h-8 w-auto max-w-full"
        />
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-end gap-2 ${className}`}>
      <img
        src="/images/iyzico/logo_band_colored.svg"
        srcSet="/images/iyzico/logo_band_colored@1x.png 1x, /images/iyzico/logo_band_colored@2x.png 2x, /images/iyzico/logo_band_colored@3x.png 3x"
        alt="Visa, Mastercard ve iyzico ile öde"
        width={429}
        height={32}
        className="h-8 w-auto max-w-full sm:h-9"
      />
    </div>
  );
}
