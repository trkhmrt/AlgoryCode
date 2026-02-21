# Hero Alanı Tasarım Fikirleri – Mor, Turkuaz, Pembe

Yazılım / AI şirketleri (OpenAI, Vercel, Linear, Stripe, Google AI) tarzında, kurumsal renklerinizle (mor, turkuaz, pembe) kullanabileceğiniz hero konseptleri.

---

## 1. Hareketli gradient mesh (OpenAI / Vercel tarzı)

**Ne hissettirir:** Yumuşak, sürekli akan renk bulutları; arka planda canlı ama göz yormayan.

**Nasıl:** Büyük, blur’lu mor / pembe / turkuaz “blob”lar yavaşça hareket eder, üst üste biner; gradient mesh gibi. Arka plan açık (beyaza yakın) veya çok açık gri; renkler %40–60 opacity ile.

**Renk kullanımı:**
- Sol üst: mor (#8b7fc7, #a89dd4)
- Sağ / orta: pembe (#e8c8e0, #d4a5c8)
- Alt / merkez: turkuaz (#7ec9c3, #5eb8b0)

**Örnek cümle (AI’ya prompt):**  
*“Hero background: soft animated gradient mesh, purple pink and teal blobs slowly moving and blending, light grey white base, glassmorphism style like OpenAI or Vercel website, subtle blur, no sharp edges.”*

---

## 2. Tek renkli gradient + hafif ışık (Linear / Stripe tarzı)

**Ne hissettirir:** Sade, kurumsal; tek bir gradient ve üzerinde hafif “ışık” hareketi.

**Nasıl:** Arka plan tek bir yumuşak gradient (örn. sol üst mor → sağ alt turkuaz). Üzerinde ince, beyaza yakın veya açık pembe/turkuaz bir “spotlight” veya şerit yatay/diyagonal yavaşça kayar (CSS gradient animation veya pseudo-element).

**Renk kullanımı:**
- Gradient: `linear-gradient(135deg, #a89dd4 0%, #e8c8e0 40%, #7ec9c3 100%)`
- Işık: `rgba(255,255,255,0.15)` veya açık pembe/turkuaz

**Örnek cümle:**  
*“Minimal hero background: single smooth gradient from soft purple to pink to teal, one subtle moving light streak across, clean software company style like Linear.”*

---

## 3. Orta koyu + neon glow (AI / tech ürün tanıtımı)

**Ne hissettirir:** Biraz daha “tech”, odak noktası ortada; renkler parlıyor ama abartılı değil.

**Nasıl:** Arka plan orta koyu gri (#1a1a2e gibi). Ortada veya logonun etrafında mor–pembe–turkuaz gradient glow (blur’lu daire veya radial gradient) yavaşça büyüyüp küçülür veya hafif kayar.

**Renk kullanımı:**
- Arka plan: #1a1a2e veya #0f0f1a
- Glow: mor, pembe, turkuaz %50–70 opacity, 80–120px blur

**Örnek cümle:**  
*“Hero: dark blue-grey background, central glowing gradient orb in purple pink and teal, slow pulse animation, tech product launch style.”*

---

## 4. Sade statik gradient (resim / illüstrasyon için zemin)

**Ne hissettirir:** Çok sade; metin ve CTA ön planda, arka plan sadece renk geçişi.

**Nasıl:** Tek, statik gradient. Hareket yok; üzerine istersen ince grid veya geometrik çizgiler eklenebilir.

**Örnek gradient:**  
`linear-gradient(180deg, #f5f0ff 0%, #fce4ec 35%, #e0f7f5 100%)`  
(veya daha canlı tonlar: #e8e0f5 → #f5d0e8 → #c8f0eb)

**Örnek cümle:**  
*“Simple hero: one static gradient background, light purple at top, light pink in middle, light teal at bottom, no animation, minimalist.”*

---

## 5. Hareketli çizgiler / grid (futuristik yazılım)

**Ne hissettirir:** Dinamik, “kod / data” hissi; renkler çizgilerde.

**Nasıl:** Koyu veya orta koyu arka plan. Üzerinde ince mor, pembe, turkuaz çizgiler veya grid; yavaş animasyonla kayar veya fade in/out. Gradient sadece çizgilerde kullanılır.

**Renk kullanımı:**  
Çizgiler: mor #a89dd4, pembe #e8c8e0, turkuaz #7ec9c3; stroke veya border; opacity 0.4–0.7.

**Örnek cümle:**  
*“Hero: dark background, thin animated gradient lines or grid in purple pink and teal, slow movement, futuristic software company.”*

---

## Hangi konsepti ne zaman seçmek?

| Konsept              | Ne zaman tercih?                    |
|----------------------|-------------------------------------|
| 1. Gradient mesh      | Hareketli, modern, “AI/cloud” hissi  |
| 2. Tek gradient + ışık | Sade ama canlı, kurumsal            |
| 3. Orta koyu + glow   | Ürün odaklı, tech lansman           |
| 4. Statik gradient    | En sade, resim/illüstrasyon ağırlıklı |
| 5. Çizgiler / grid    | Futuristik, developer odaklı        |

Şu an sitede **1. konsept**e yakın bir yapı var (blob’lar, salınım). İstersen 2 veya 3’e kaydırabiliriz; hangi numarayı istediğini söylemen yeterli.
