type PaymentMethodLogosProps = {
  className?: string;
};

export function PaymentMethodLogos({ className = "" }: PaymentMethodLogosProps) {
  const cardBand = (
    <img
      src="/images/payment/card-band.svg"
      alt="Visa ve Mastercard"
      width={120}
      height={24}
      className="h-8 w-auto max-w-full sm:h-9"
    />
  );

  const paytrLogo = (
    <img
      src="/images/paytr/paytr-logo-color.svg"
      alt="PayTR"
      width={280}
      height={32}
      className="h-7 w-auto max-w-full sm:h-8"
    />
  );

  return (
    <div
      className={`flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4 ${className}`}
    >
      {paytrLogo}
      {cardBand}
    </div>
  );
}
