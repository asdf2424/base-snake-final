# 🖼️ Görselleri Oluşturma

Farcaster manifest dosyası için iki görsel dosyası oluşturmanız gerekiyor:

## 1. icon.png (512x512px)

**Konum:** `/public/icon.png`

**Özellikler:**
- Boyut: 512x512 piksel
- Format: PNG
- Arka plan: Şeffaf veya düz renk
- İçerik: Snake oyunu için bir ikon

**Oluşturma Yöntemleri:**
- Canva, Figma gibi tasarım araçları
- AI görsel oluşturucular (DALL-E, Midjourney)
- Online icon generator'lar

## 2. og-image.png (1200x630px)

**Konum:** `/public/og-image.png`

**Özellikler:**
- Boyut: 1200x630 piksel (Open Graph standart)
- Format: PNG veya JPG
- İçerik: Snake oyunu için bir önizleme görseli

**Önerilen İçerik:**
- Oyun ekran görüntüsü
- "Base Snake Final" başlığı
- Oyun kontrolleri veya gameplay görseli

## 🚀 Hızlı Çözüm

Eğer görselleri şimdilik oluşturamıyorsanız, geçici olarak:

1. **icon.png için:** Basit bir SVG veya PNG ikon oluşturun
2. **og-image.png için:** Oyun ekranının bir screenshot'ını alın ve 1200x630 boyutuna getirin

## 📝 Not

Görselleri oluşturduktan sonra:
1. Dosyaları `/public/` klasörüne koyun
2. Değişiklikleri commit edin
3. Vercel'e deploy edin

Manifest dosyası görselleri otomatik olarak kullanacaktır.

