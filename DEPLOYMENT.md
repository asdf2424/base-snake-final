# Vercel Deployment Protection Kapatma

Farcaster manifest dosyasının çalışması için Vercel Deployment Protection'ı kapatmanız gerekiyor.

## Adımlar:

1. **Vercel Dashboard'a gidin:**
   - https://vercel.com/dashboard
   - Projenizi seçin: `base-snake-final`

2. **Settings > Deployment Protection'a gidin:**
   - Sol menüden "Settings" seçin
   - "Deployment Protection" bölümünü bulun

3. **Deployment Protection'ı kapatın:**
   - "Deployment Protection" toggle'ını **KAPALI** yapın
   - Veya `.well-known/*` path'lerini bypass listesine ekleyin

4. **Alternatif: Bypass Listesi Ekle:**
   - Deployment Protection açık kalabilir
   - Bypass listesine şu path'i ekleyin: `/.well-known/*`

## Farcaster Manifest Test:

Deployment protection kapandıktan sonra şu URL'yi test edin:
```
https://base-snake-final-zlufz9vgu-ygtp2424gmailcoms-projects.vercel.app/.well-known/farcaster.json
```

Bu URL JSON formatında manifest döndürmelidir.

## Not:

- Deployment protection'ı kapatmak sitenizi herkese açık hale getirir
- Sadece `.well-known/*` path'lerini bypass etmek daha güvenli bir seçenektir

