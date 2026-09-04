# Campiqo Analytics and Privacy Baseline

## Durum

- Tarih: `2026-09-05`
- Mobil baseline: `4968ff5`
- Analytics SDK: Henüz seçilmedi
- Crash reporting SDK: Henüz seçilmedi
- Advertising/tracking: Kullanılmayacak
- IDFA/Advertising ID: Kullanılmayacak

Bu belge Faz 0 privacy ve analytics kurallarını tanımlar. Ayrıntılı event
kataloğu özellikler geliştirilirken ilgili fazlarda genişletilir.

## Event isimlendirme

Event formatı:

`domain_object_action`

Kurallar:

- Küçük harf ve `snake_case` kullanılır.
- Dinamik değer event adına yazılmaz.
- iOS ve Android aynı event adını kullanır.
- Başarı ve hata gerekirse ayrı event olur.
- Yeni event production öncesinde bu belgeye eklenir.

Örnekler:

- `auth_login_submitted`
- `auth_login_succeeded`
- `auth_login_failed`
- `camp_detail_viewed`
- `camp_join_requested`
- `chat_message_sent`
- `notification_opened`
- `profile_update_succeeded`

## İzin verilen ortak property'ler

- `screen_name`
- `source`
- `result`
- `error_code`
- `duration_bucket`
- `retry_count_bucket`
- `app_version`
- `build_number`
- `platform`
- `os_major_version`
- `camp_status`
- `join_status`
- `message_type`
- `notification_type`

Property değerleri allowlist veya bucket kullanmalıdır.

## Analytics ve loglarda yasak veriler

- Access token
- Refresh token
- Password
- Authorization header
- Cookie
- Verification/reset/reactivation tokenları
- Ad ve soyad
- E-posta
- Telefon numarası
- User ID ve entity ID'leri
- Kesin enlem/boylam
- Açık adres ve buluşma noktası
- Arama metni
- Mesaj içeriği
- Yorum/review içeriği
- Rapor açıklaması
- Bio ve kamp açıklaması
- Fotoğraf veya dosya içeriği
- Push/device token
- Signed/private dosya URL'si
- Request/response body
- Ham exception mesajı
- Tam deep-link URL'si

## Veri sınıfları

| Sınıf | İçerik | Kural |
|---|---|---|
| P0 | App version, platform, enum, duration bucket | Analytics için kullanılabilir |
| P1 | Device/install ID, IP, crash ve performance verisi | Kişisel kabul edilir; sınırlandırılır |
| P2 | Ad, e-posta, user ID, profil ve hesap verisi | Analytics'e gönderilmez |
| P3 | Konum, mesaj, yorum, görsel ve kullanıcı içeriği | Analytics/loglara gönderilmez |
| P4 | Sağlık, biyometrik, siyasi/dini ve benzeri hassas veri | Yapılandırılmış olarak istenmez |
| P5 | Password, token, secret ve credential | Hiçbir telemetry kanalına gönderilmez |

Serbest metin ve görseller özel nitelikli bilgi içerebileceği için P3/P4 gibi
korunur.

## Consent

Optional product analytics ve diagnostics için durumlar:

- `unknown`
- `granted`
- `denied`
- `withdrawn`

Kurallar:

1. `unknown`, `denied` ve `withdrawn` durumunda optional event gönderilmez.
2. Analytics reddi uygulamanın temel kullanımını engellemez.
3. Kullanıcı tercihini ayarlardan değiştirebilir.
4. Logout ve kullanıcı değişiminde analytics user bağlamı temizlenir.
5. Consent geri çekildiğinde bekleyen optional event queue temizlenir.
6. Zorunlu güvenlik/audit kayıtları optional analytics'ten ayrı tutulur.

## Production log kuralları

- Production kodunda kontrolsüz `console.log` kalmaz.
- Request ve response body loglanmaz.
- Token ve authorization alanları `[REDACTED]` olur.
- E-posta ve diğer kişisel alanlar maskelenir.
- Kullanıcı içeriği crash breadcrumb olarak eklenmez.
- Yalnızca `operation_id`, HTTP status, `problem_code`, süre bucket'ı,
  app version ve platform gibi allowlist alanlar loglanır.
- Redaction davranışı otomatik test edilir.

## Veri saklama başlangıç hedefleri

| Veri | En uzun hedef süre |
|---|---:|
| Raw product analytics | 90 gün |
| Aggregate ürün metriği | 13 ay |
| Crash/performance telemetry | 90 gün |
| Cihazdaki event queue | 24 saat |
| Geçici export dosyası | 24 saat |

Nihai süreler release öncesinde privacy policy ve hukuki gereksinimlerle
doğrulanır.

## Store beyanları

Faz 15 sırasında gerçek release binary incelenerek:

- Apple App Privacy alanları doldurulur.
- Google Play Data Safety formu doldurulur.
- Uygulama ve üçüncü taraf SDK'ların cihaz dışına gönderdiği bütün veriler
  değerlendirilir.
- Privacy policy ile gerçek uygulama davranışının aynı olduğu doğrulanır.
- Kullanıcı hesabı ve verileri için silme mekanizması açıklanır.

Resmi kaynaklar:

- `https://developer.apple.com/app-store/app-privacy-details/`
- `https://support.google.com/googleplay/android-developer/answer/10787469`
- `https://www.kvkk.gov.tr/Icerik/8184/Ozel-Nitelikli-Kisisel-Verilerin-Islenmesine-Iliskin-Rehber`

## Uygulama fazları

- Faz 1: Token, API ve network log redaction
- Faz 4–11: Her özellik için gerekli eventlerin eklenmesi
- Faz 12: Production logger ve secret taraması
- Faz 14: Analytics/crash SDK seçimi ve consent entegrasyonu
- Faz 15: Store privacy beyanları
- Faz 16: Production telemetry doğrulaması

## Faz 0 kabulü

- [x] Event isimlendirme standardı tanımlandı.
- [x] Yasak veri listesi tanımlandı.
- [x] Kişisel veri sınıfları tanımlandı.
- [x] Consent yaklaşımı tanımlandı.
- [x] Production log kuralları tanımlandı.
- [x] Store beyanlarının yapılacağı faz belirlendi.