# Campiqo Mobile Product Scope

## Belge bilgileri

- Karar tarihi: `2026-09-05`
- Mobil baseline commit: `4968ff5`
- Expo SDK: `55`
- React Native: `0.83`
- Ürün adı: `Campiqo`
- İlk yayın hedefi: Consumer mobil uygulaması
- Ekip kapasitesi: Tek senior mobile developer

## Amaç

Bu belge Campiqo mobil uygulamasının ilk ürün seviyesi sürümü için desteklenen
platformları, cihazları, dili ve bilinçli kapsam dışı alanları tanımlar.

Bu kararlar Faz 0 ile Faz 16 arasındaki geliştirme, test ve yayın kapsamını belirler.

# Ürün kapsamı

## Ürün tipi

Campiqo, kamp organizatörleri ile katılımcıları bir araya getiren consumer mobil
uygulamasıdır.

Mobil uygulama aşağıdaki kullanıcı rollerini destekler:

- Standart kullanıcı
- Kamp katılımcısı
- Kamp organizatörü

Admin ve moderasyon personeli için consumer mobil uygulamasında özel yönetim
arayüzü geliştirilmeyecektir.

Admin operasyonları ayrı bir yönetim panelinin sorumluluğudur.

## İlk yayın pazarı

İlk ürün seviyesi yayın hedefi Türkiye'dir.

İlk sürümde:

- Varsayılan ülke: Türkiye
- Varsayılan locale: `tr-TR`
- Varsayılan ölçü sistemi: Metrik
- Sıcaklık gösterimi: Celsius
- Mesafe gösterimi: Kilometre/metre
- Tarih gösterimi: Türkçe yerel format
- Saat gösterimi: Cihazın 12/24 saat tercihine uygun
- Telefon numarası gösterimi: Türkiye odaklı
- Backend tarih aktarımı: UTC/ISO 8601
- Kullanıcıya gösterilen tarih: Cihazın yerel saat dilimi

# Dil kapsamı

## İlk sürüm dili

İlk ürün sürümünün kullanıcı arayüzü dili Türkçedir.

Aşağıdaki içerikler Türkçe olacaktır:

- Navigation başlıkları
- Form alanları
- Validation mesajları
- Hata mesajları
- Loading ve empty-state mesajları
- Confirmation dialogları
- Bildirim tercihleri
- İzin açıklamaları
- Gizlilik ve kullanım koşulları
- Store açıklamaları
- Destek içerikleri

## Lokalizasyon mimarisi

İlk sürüm yalnızca Türkçe olsa da kullanıcıya gösterilen metinler component ve
screen dosyalarına dağınık biçimde yazılmayacaktır.

Faz 2 ve Faz 3 sırasında merkezi bir lokalizasyon/message katmanı kurulacaktır.

Kurallar:

1. Kullanıcıya gösterilen yeni metinler merkezi message kaynağından gelir.
2. Backend hata metinleri doğrudan kullanıcıya gösterilmez.
3. Problem Details hata kodları Türkçe kullanıcı mesajlarına eşlenir.
4. Tarih ve sayı formatları `tr-TR` locale kullanır.
5. İngilizce desteği ilk sürüm kabul kriteri değildir.
6. Lokalizasyon mimarisi ileride İngilizce eklenmesini engellememelidir.

# Platform kapsamı

## Desteklenen platformlar

İlk ürün sürümünde desteklenen platformlar:

- Apple iOS
- Google Android

Aşağıdaki platformlar ilk ürün sürümünün kapsamı dışındadır:

- Web/PWA
- macOS
- Windows
- Apple TV
- Android TV
- Wear OS
- watchOS

## Expo SDK 55 teknik tabanı

Expo SDK 55 için resmi platform tabanı:

| Alan                | Değer              |
| ------------------- | ------------------ |
| Expo SDK            | `55`               |
| React Native        | `0.83`             |
| React               | `19.2`             |
| Minimum Node.js     | `20.19.x`          |
| Minimum Android     | Android 7 / API 24 |
| Android compile SDK | `36`               |
| Android target SDK  | `36`               |
| Minimum iOS         | `15.1`             |
| Minimum Xcode       | `26.2`             |

Kaynak:

`https://docs.expo.dev/versions/v55.0.0/`

## Android desteği

Minimum desteklenen Android sürümü:

`Android 7.0 / API 24`

Android ürün kabulü için:

- API 24 altında çalışma garantisi verilmez.
- Target SDK değeri Expo SDK 55 ile uyumlu olarak `36` olmalıdır.
- Google Play submission gereksinimleri yayın öncesinde yeniden doğrulanır.
- Android telefonlarda edge-to-edge davranışı test edilir.
- Android donanım geri tuşu davranışı test edilir.
- Android notification channel davranışı test edilir.
- Runtime permission akışları gerçek cihazda test edilir.
- Düşük bellek koşulları en az bir fiziksel cihazda test edilir.
- Üreticiye bağlı background/push kısıtlamaları belgelenir.

## iOS desteği

Minimum desteklenen iOS sürümü:

`iOS 15.1`

iOS ürün kabulü için:

- iOS 15.1 altında çalışma garantisi verilmez.
- Safe area davranışı bütün ekranlarda test edilir.
- Dynamic Type ve VoiceOver kritik akışlarda test edilir.
- Push permission akışı gerçek cihazda test edilir.
- Universal link ve cold-start deep link davranışı test edilir.
- App lifecycle foreground/background geçişleri test edilir.
- App Store submission gereksinimleri yayın öncesinde yeniden doğrulanır.

# Cihaz kapsamı

## Telefonlar

İlk ürün sürümünün zorunlu hedefi telefonlardır.

Desteklenen telefon sınıfları:

- Küçük ekranlı telefon
- Standart ekranlı telefon
- Büyük ekranlı telefon
- Çentikli/Dynamic Island cihaz
- Android edge-to-edge cihaz

Bütün kritik ekranlar aşağıdaki koşullarda taşmadan çalışmalıdır:

- Küçük ekran
- Büyük font
- Uzun Türkçe metin
- Açık klavye
- Loading durumu
- Empty state
- Validation hataları
- Ağ hatası
- Safe area
- Düşük bağlantı hızı

## Tabletler

Tablet için özel optimize edilmiş arayüz ilk sürüm kapsamı dışındadır.

Aşağıdakiler ilk sürümde zorunlu değildir:

- iPad özel split-view tasarımı
- Android tablet özel master-detail tasarımı
- Tablet landscape optimizasyonu
- Tablet için ayrı navigation yapısı
- Çoklu pencere optimizasyonu

Mevcut `app.json` dosyasında `ios.supportsTablet` değeri `true` durumundadır.

Faz 2 veya release konfigürasyonu sırasında bu değer telefon-only ürün kararıyla
uyumlu hâle getirilmelidir:

`ios.supportsTablet: false`

Bu belge tek başına konfigürasyonu değiştirmez; değişiklik ilgili uygulama
konfigürasyonu fazında yapılacaktır.

## Ekran yönü

İlk ürün sürümü yalnızca portrait/dikey ekran yönünü destekler.

Mevcut karar:

`orientation: portrait`

Landscape aşağıdaki akışlar için ilk sürüm kabul kriteri değildir:

- Kamp listesi
- Kamp detayı
- Kamp oluşturma
- Profil
- Chat
- Bildirimler
- Harita
- Görsel görüntüleme

Tam ekran medya deneyimi ileride ayrı ürün kararıyla landscape destekleyebilir.

# Web kapsamı

Web/PWA ilk ürün seviyesi mobil roadmap kapsamı dışındadır.

Bunun anlamı:

- Web için release yapılmaz.
- Browser uyumluluk matrisi hazırlanmaz.
- Responsive web arayüzü geliştirilmez.
- Web push geliştirilmez.
- Web deep-link davranışı ürün kabulüne dahil edilmez.
- Web için accessibility sertifikasyonu yapılmaz.
- Web için E2E test zorunluluğu yoktur.

Mevcut `package.json` içindeki `web` scripti ve `app.json` içindeki web ayarları,
web'in ürün kapsamında olduğu anlamına gelmez.

Bunların korunması veya kaldırılması Faz 2 yapılandırma temizliğinde kararlaştırılır.

# Navigation kapsamı

İlk sürümde navigation aşağıdaki yapıyı kapsar:

- Authentication stack
- E-posta doğrulama stack'i
- Hesap reaktivasyon akışı
- Authenticated application stack
- Ana tab navigation
- Modal ve sheet akışları
- Push notification routing
- Universal/app links
- Cold-start deep links

Korunan route'lar session doğrulanmadan açılamaz.

# Özellik kapsamı

## İlk sürümde zorunlu özellikler

- Kullanıcı kaydı
- Legal belge onayları
- E-posta doğrulama
- Login ve güvenli session
- Token refresh
- Logout ve tüm cihazlardan çıkış
- Şifre sıfırlama
- Hesap reaktivasyonu
- Kamp keşfi
- Arama, filtreleme ve sıralama
- Kamp detayı
- Favoriler
- Kamp oluşturma ve taslak yönetimi
- Kamp görselleri
- Kamp düzenleme, yayınlama ve iptal
- Katılım talebi ve durum geçmişi
- Davet yönetimi
- Katılımcı yönetimi
- Yoklama
- Yorum ve puanlama
- Review ve organizer yanıtı
- İçerik raporlama
- Kullanıcı engelleme
- Gerçek zamanlı chat
- Push bildirimleri
- Bildirim tercihleri
- Profil yönetimi
- Aktif session listesi
- Şifre değiştirme
- Veri dışa aktarma
- Hesap deaktivasyonu
- Hesap silme talebi

## Bilinçli kapsam dışı özellikler

- Admin dashboard
- Admin moderation ekranları
- Audit log görüntüleme
- Web uygulaması
- Tablet özel tasarım
- Desktop uygulaması
- Smartwatch uygulaması
- Sosyal medya ile giriş
- Ödeme ve abonelik
- Reklam sistemi
- Çoklu dil kullanıcı arayüzü
- Offline mutation queue
- Kullanıcılar arası kamp dışı özel mesajlaşma
- Video paylaşımı
- Canlı yayın
- Arka planda sürekli konum takibi

Kapsam dışı özellikler ürün seviyesinde tamamlanma kararını engellemez.

# Ağ ve ortam kapsamı

Uygulama aşağıdaki ortamları desteklemelidir:

- Development
- Staging
- Production

Kurallar:

1. Staging ve production yalnızca HTTPS kullanır.
2. API origin build profile üzerinden yönetilir.
3. Production uygulaması development backend'e bağlanamaz.
4. Raw URL screen veya hook içinde oluşturulamaz.
5. Tokenlar loglara yazılamaz.
6. API response doğrudan karmaşık UI componentlerine verilmez.
7. Gerçek cihaz testleri staging backend üzerinde yapılır.

# Accessibility kapsamı

Accessibility ilk sürüm kapsamındadır.

Zorunlu kabul kriterleri:

- Kritik aksiyonlarda screen-reader label bulunur.
- Touch target minimum `44x44` boyutundadır.
- Dynamic Type temel akışları bozmaz.
- Renk tek başına durum belirtmez.
- Metin ve arka plan kontrastı yeterlidir.
- Form hataları yalnızca renk ile gösterilmez.
- Reduced-motion tercihi desteklenir.
- Loading durumları erişilebilir biçimde bildirilir.
- Kritik/major accessibility ihlali bulunmaz.

# Desteklenen test matrisi

## Android

En az aşağıdaki cihaz sınıfları test edilir:

| Sınıf                   | Amaç                             |
| ----------------------- | -------------------------------- |
| API 24 emulator         | Minimum Android uyumluluğu       |
| Güncel Android emulator | Güncel platform davranışı        |
| Küçük ekran Android     | Layout ve klavye                 |
| Fiziksel Android cihaz  | Push, kamera, dosya ve lifecycle |
| Düşük/orta seviye cihaz | Performans ve bellek             |

## iOS

En az aşağıdaki cihaz sınıfları test edilir:

| Sınıf                             | Amaç                         |
| --------------------------------- | ---------------------------- |
| Minimum desteklenen iOS simulator | Minimum sürüm uyumluluğu     |
| Güncel iOS simulator              | Güncel platform davranışı    |
| Küçük ekran iPhone simulator      | Layout ve klavye             |
| Büyük ekran iPhone simulator      | Responsive telefon düzeni    |
| Fiziksel iPhone                   | Push, deep link ve lifecycle |

# Ürün seviyesi kabul kriterleri

- [ ] Ürün dili Türkçe ve kullanıcıya görünen kritik İngilizce metin yok.
- [ ] Tarih, saat ve sayılar `tr-TR` kurallarına uygun.
- [ ] Android 7/API 24 minimum uyumluluğu doğrulandı.
- [ ] iOS 15.1 minimum uyumluluğu doğrulandı.
- [ ] Android target/compile SDK Expo SDK 55 gereksinimleriyle uyumlu.
- [ ] Küçük, standart ve büyük telefon düzenleri doğrulandı.
- [ ] Tablet özel optimizasyonu release kapsamına yanlışlıkla dahil edilmedi.
- [ ] Web release ürünü oluşturulmadı.
- [ ] Portrait orientation bütün kritik akışlarda korundu.
- [ ] Staging ve production yalnızca HTTPS kullanıyor.
- [ ] Accessibility kritik/major ihlali yok.
- [ ] Push ve deep link gerçek Android ve iPhone cihazlarında doğrulandı.
- [ ] Store submission gereksinimleri yayın tarihinde yeniden kontrol edildi.

# Karar özeti

| Konu                | Karar                          |
| ------------------- | ------------------------------ |
| Ürün adı            | Campiqo                        |
| İlk pazar           | Türkiye                        |
| İlk dil             | Türkçe                         |
| Locale              | `tr-TR`                        |
| Ölçü sistemi        | Metrik                         |
| Mobil platformlar   | iOS ve Android                 |
| Minimum Android     | Android 7 / API 24             |
| Android target SDK  | 36                             |
| Minimum iOS         | iOS 15.1                       |
| Telefon desteği     | Zorunlu                        |
| Tablet özel desteği | Kapsam dışı                    |
| Web/PWA             | Kapsam dışı                    |
| Orientation         | Portrait                       |
| Admin özellikleri   | Kapsam dışı                    |
| Accessibility       | Zorunlu                        |
| Gerçek cihaz testi  | Android ve iPhone için zorunlu |
