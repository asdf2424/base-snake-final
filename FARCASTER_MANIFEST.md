# Farcaster Manifest Dosyası

## 📋 Manifest Nedir?

Farcaster manifest dosyası (`farcaster.json`), Mini App'inizi kaydetmek ve domain'inize bağlamak için gereklidir. DNS gibi çalışır - Farcaster client'larına uygulamanızın adı, ikonu, işlevselliği hakkında bilgi verir ve Farcaster ekosistemiyle derin entegrasyonlar sağlar.

## 📍 Konum

Manifest dosyası şu konumda olmalıdır:
```
/.well-known/farcaster.json
```

## 📝 Gerekli Alanlar

### 1. **name** (Zorunlu)
- Uygulamanızın adı
- Örnek: `"Base Snake Final"`

### 2. **description** (Zorunlu)
- Uygulamanızın kısa açıklaması
- Örnek: `"Modern Snake oyunu"`

### 3. **iconUrl** (Zorunlu)
- Uygulama ikonunun URL'si
- Önerilen boyut: 512x512px
- Format: PNG veya SVG
- Örnek: `"https://your-domain.com/icon.png"`

### 4. **appUrl** (Zorunlu)
- Uygulamanızın ana URL'si
- Örnek: `"https://your-domain.com"`

### 5. **accountAssociation** (Zorunlu)
- Hesap bağlantısı bilgileri
- Farcaster hesabınızı uygulamanızla bağlamak için kullanılır

```json
{
  "header": "x-farcaster-verify",
  "payload": "accountAddress"
}
```

### 6. **frame** (Opsiyonel)
- Frame bilgileri (Farcaster Frame desteği için)
- Uygulamanızın frame olarak çalışmasını sağlar

## ✅ Mevcut Manifest Yapısı

Projenizde şu yapı kullanılıyor:

```json
{
  "name": "Base Snake Final",
  "description": "Modern Snake oyunu - Next.js, TypeScript, Tailwind CSS ve Framer Motion ile geliştirilmiş",
  "iconUrl": "https://base-snake-final-kkm74t0cu-ygtp2424gmailcoms-projects.vercel.app/icon.png",
  "appUrl": "https://base-snake-final-kkm74t0cu-ygtp2424gmailcoms-projects.vercel.app",
  "accountAssociation": {
    "header": "x-farcaster-verify",
    "payload": "accountAddress"
  },
  "frame": {
    "version": "next",
    "imageUrl": "https://base-snake-final-kkm74t0cu-ygtp2424gmailcoms-projects.vercel.app/og-image.png",
    "button": {
      "title": "Play Snake Game",
      "action": {
        "type": "launch_frame",
        "name": "snake_game",
        "url": "https://base-snake-final-kkm74t0cu-ygtp2424gmailcoms-projects.vercel.app"
      }
    }
  }
}
```

## 🖼️ Gerekli Görseller

Manifest dosyasında referans verilen görselleri oluşturmanız gerekiyor:

1. **icon.png** (512x512px)
   - Uygulama ikonu
   - `/public/icon.png` konumuna yerleştirin

2. **og-image.png** (1200x630px önerilen)
   - Open Graph görseli (Frame için)
   - `/public/og-image.png` konumuna yerleştirin

## 🔧 Dosya Konumları

- **Route Handler:** `app/.well-known/farcaster.json/route.ts`
- **Static Fallback:** `public/.well-known/farcaster.json`

## 🚀 Test

Manifest dosyanızı test etmek için:

```bash
curl https://your-domain.com/.well-known/farcaster.json
```

Başarılı yanıt JSON formatında olmalıdır.

## ⚠️ Önemli Notlar

1. **Vercel Deployment Protection:** Manifest dosyasına erişim için Deployment Protection'ı kapatmanız veya `/.well-known/*` path'ini bypass listesine eklemeniz gerekir.

2. **HTTPS:** Manifest dosyası HTTPS üzerinden erişilebilir olmalıdır.

3. **Content-Type:** Response header'ında `Content-Type: application/json` olmalıdır.

4. **CORS:** Farcaster client'larının erişebilmesi için CORS headers eklenmelidir.

## 📚 Daha Fazla Bilgi

- [Farcaster Documentation](https://docs.farcaster.xyz/)
- [Farcaster Mini Apps](https://docs.farcaster.xyz/mini-apps)

