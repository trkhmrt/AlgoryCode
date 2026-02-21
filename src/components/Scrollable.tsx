export default function Scrollable() {
  return (
    <section className="scroll-container">
      <div className="text-content">
        <div className="text-block">
          <h2>Complex tasks become easy</h2>
          <p>Yazı içeriği burada yukarı doğru kayacak...</p>
        </div>
        <div className="text-block">
          <h2>Built-in tools</h2>
          <p>Kullanıcı kaydırdıkça bu metinler ekrana girecek...</p>
        </div>
        <div className="text-block">
          <h2>Customizable and extendable</h2>
          <p>Son yazı bloğu...</p>
        </div>
      </div>

      <div className="visual-content">
        <div className="sticky-box">
          <p>Bu alan ekranda sabit kalacak</p>
        </div>
      </div>
    </section>
  );
}
