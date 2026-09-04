# Campiqo Mobil Uygulama — Ürün Seviyesi Tamamlama Roadmap'i

> Son inceleme tarihi: 4 Eylül 2026  
> Mobil repository: `C:\Projeler\CampiqoApp`  
> Backend repository: `C:\Projeler\Campiqo`  
> Hedef platform: Expo SDK 55, React Native 0.83, React 19.2, iOS ve Android

## 1. Amaç

Bu roadmap'in amacı Campiqo mobil uygulamasını mevcut prototip/temel UI seviyesinden;
backend'in sunduğu tüketici özelliklerini eksiksiz kullanan, güvenli, erişilebilir,
ölçümlenebilir, test edilmiş ve App Store/Google Play dağıtımına hazır bir ürüne
dönüştürmektir.

Roadmap tamamlandığında "mobil taraf bitti" denebilmesi için yalnızca ekranların
çalışması yeterli değildir. Aşağıdaki koşulların tamamı sağlanmalıdır:

- Desteklenen bütün kullanıcı akışları gerçek staging backend'iyle uçtan uca çalışır.
- Uygulamada legacy Axios/AsyncStorage auth hattı kalmaz.
- API erişiminin tek kaynağı sürümlü OpenAPI sözleşmesi ve generated client olur.
- Auth, deep link, push notification, gerçek zamanlı chat ve hesap yaşam döngüsü tamamlanır.
- Kritik kullanıcı yolları otomatik testlerle korunur.
- Crash, performans, erişilebilirlik, güvenlik ve mağaza yayın kapıları geçilir.
- Üretim rollback, destek ve gözlemleme prosedürleri yazılı ve denenmiş olur.

## 2. İnceleme özeti ve mevcut baseline

### 2.1 Backend durumu

Backend, .NET 8 üzerinde katmanlı bir yapıya sahiptir:

```text
Campiqo.Api
    -> Campiqo.Application
        -> Campiqo.Domain
    -> Campiqo.Infrastructure
```

Olumlu backend yetenekleri:

- 83 path altında 101 HTTP operasyonu ve 94 sözleşme şeması vardır.
- JWT access/refresh token, token rotation ve aktif oturum yönetimi vardır.
- E-posta doğrulama, şifre sıfırlama ve hesap reaktivasyonu vardır.
- RFC 7807 Problem Details hata standardı uygulanmıştır.
- Verified-email ve admin authorization policy'leri vardır.
- Rate limiting, request timeout, idempotency ve optimistic concurrency vardır.
- Kamp taslağı, yayınlama, başvuru penceresi, görünürlük ve iptal akışları vardır.
- Katılım isteği, bekleme listesi, davet, katılımcı ve yoklama yönetimi vardır.
- SignalR tabanlı gerçek zamanlı chat; text/image/location/system mesajları vardır.
- Push notification subscription, tercihler ve notification deep link üretimi vardır.
- İçerik raporlama, kullanıcı engelleme ve moderasyon altyapısı vardır.
- Hesap deaktivasyonu/silinmesi ve kullanıcı veri dışa aktarımı vardır.
- PostgreSQL/PostGIS, S3, image variant, outbox, background worker ve observability
  altyapıları bulunmaktadır.
- Production Docker, health check, migration, backup, rollback ve release runbook'ları vardır.

Doğrulama sırasında backend Release build'i başarılı oldu. Testlerin 867'si geçti;
PostgreSQL/PostGIS Testcontainers kullanan 87 test Docker engine erişilemediği için
çalışamadı. Bunlar kod assertion hatası değil ortam önkoşulu hatasıdır. Ürün kabulünden
önce Docker çalışan CI/yerel ortamda 954 testin tamamı yeşil olmalıdır.

### 2.2 Mobil durumu

Mobil uygulamada 17 ekran, 111 el yazımı kaynak dosyası ve yaklaşık 10.133 satır
el yazımı kod vardır. Mevcut güçlü taraflar:

- Ekran, component, hook, service, Redux ve validation klasör ayrımı anlaşılırdır.
- Expo 55 / React Native 0.83 / React 19.2 sürüm matrisi uyumludur.
- OpenAPI client üretimi, sözleşme smoke testleri ve CI drift kontrolü hazırlanmıştır.
- Yeni API adapter'ında SecureStore, single-flight refresh, tek retry, Problem Details
  normalizasyonu ve idempotency UUID üretimi vardır.
- Ana sayfa, kamp liste/detay, favori, temel kamp oluşturma, profil, yorum, puanlama,
  bildirim listesi ve temel chat UI'ları mevcuttur.

Ana riskler:

- Gerçek ekranlar generated client yerine 30 adet legacy Axios çağrısı kullanmaktadır.
- Backend eski `/api/...` rotalarını geriye uyumluluk için sunuyor olsa da sözleşmenin
  kanonik rotası `/api/v1/...`'dir; mobil legacy davranışa bağımlıdır.
- Login cevabı token string sanılmaktadır; güncel backend access token, refresh token
  ve user içeren `AuthResponse` döndürmektedir.
- Aktif token AsyncStorage'da tutulmakta; hazırlanmış SecureStore hattı kullanılmamaktadır.
- Oturum açılışta restore edilmemekte ve auth/app navigation ayrılmamaktadır.
- Mobil contract kopyası backend contract'ından 188 satır geridedir. Fark bugün için
  iki admin audit endpoint'idir; yine de contract drift sıfır olmalıdır.
- Generated client yalnızca testlerde kullanılmaktadır; testler gerçek UI hattını
  doğrulamamaktadır.
- El yazımı kodun büyük kısmı JSX'tir ve `checkJs` kapalı olduğu için typecheck dışında kalır.
- Server state; component, hook ve Redux arasında parçalıdır.
- Hataların çoğu kullanıcıya gösterilmeden yalnızca console'a yazılmaktadır.
- Push notification, deep link, SignalR, offline davranışı, analytics, crash reporting,
  E2E test ve mağaza release konfigürasyonu yoktur.

### 2.3 Ürün kapsamı kararı

Bu roadmap tüketici mobil uygulamasını kapsar. Backend'deki `/api/v1/admin/*`
operasyonları ayrı bir yönetim panelinin sorumluluğudur ve tüketici uygulamasına
eklenmeyecektir. Kullanıcının kendi raporlarını görmesi ve içerik raporlaması mobil
kapsamdadır.

## 3. Değişmez mimari kararlar

Uygulama boyunca aşağıdaki kararlar korunacaktır:

1. API sözleşmesinin tek kaynağı backend `contracts/openapi/v1/campiqo-v1.json` dosyasıdır.
2. Mobil modeller generated OpenAPI modellerinden gelir; paralel el yazımı API DTO'ları olmaz.
3. Generated kaynaklar elle değiştirilmez; adapter ve mapper'lar `src/api` veya feature
   katmanında bulunur.
4. Tek auth/session kaynağı SecureStore'dur. Access token Redux persist veya AsyncStorage'a
   yazılmaz.
5. Server state için tek cache yaklaşımı kullanılır. Önerilen tercih TanStack Query;
   Redux yalnızca gerçek client/global UI state için tutulur. Ekip isterse aynı ilkeleri
   RTK Query ile uygulayabilir, ancak iki çözüm aynı anda kullanılmaz.
6. Bütün yeni uygulama kodu TypeScript olur. JSX/JS geçişi tamamlanmadan ürün kabulü verilmez.
7. Navigation route ve parametreleri tamamen typed olur.
8. Kullanıcıya gösterilecek hata metni Problem Details `code`, `detail` ve `errors`
   alanlarından merkezi olarak üretilir; ham backend hata metnine string eşitliği yapılmaz.
9. Mutating ve idempotent endpoint'lerde generated client'ın `Idempotency-Key` desteği kullanılır.
10.   Backend metadata endpoint'leri enum ve seçeneklerin kaynağıdır; mobilde paralel sabit
      kategori/status listeleri tutulmaz.
11.   Tüm yeni bağımlılıklar Expo SDK 55'in sürümlü dokümantasyonuna göre ve mümkün olan
      yerlerde `npx expo install` ile eklenir.
12.   Her faz, kendi kabul kriterleri ve otomatik testleri tamamlanmadan kapatılmaz.

## 4. Hedef mobil mimari

```text
src/
├── app/
│   ├── providers/          # Query, Redux, theme, error boundary, analytics
│   ├── navigation/         # Typed auth/app stacks, tabs, linking
│   └── bootstrap/          # Session restore, remote/platform bootstrap
├── api/
│   ├── generated/          # OpenAPI çıktısı; elle değiştirilmez
│   ├── client/             # Auth refresh, idempotency, Problem Details
│   ├── queries/            # Query keys/options
│   └── mappers/            # API DTO -> UI model dönüşümleri
├── features/
│   ├── auth/
│   ├── account/
│   ├── discovery/
│   ├── camps/
│   ├── participation/
│   ├── chat/
│   ├── notifications/
│   ├── profile/
│   └── safety/
├── design-system/
│   ├── tokens/
│   └── components/
├── shared/
│   ├── hooks/
│   ├── utils/
│   ├── storage/
│   └── observability/
└── test/
    ├── fixtures/
    ├── factories/
    └── server/
```

Kurallar:

- Screen yalnızca orchestration ve navigation yapar.
- Feature hook'ları query/mutation, form state ve kullanıcı aksiyonlarını yönetir.
- Presentational component doğrudan API veya Redux çağırmaz.
- API response doğrudan karmaşık UI component'lerine verilmez; mapper/view-model sınırı kullanılır.
- Query key'leri merkezi, deterministik ve feature bazlıdır.
- Mutation sonrası invalidation/optimistic update politikası açıkça tanımlanır.

## 5. Fazlar

## Faz 0 — Baseline, kapsam ve sözleşmeyi kilitleme

**Amaç:** Üzerinde çalışılacak tek ve doğrulanmış başlangıç noktası oluşturmak.

### İşler

- [x] Görsel/video baseline, hızlı teslim kararıyla bilinçli olarak kapsam dışı bırakıldı.
- [x] Backend ve mobil çalışma ağaçlarındaki mevcut değişiklikler ayrıldı ve commit'lendi.
- [x] Backend Docker engine ile 954 testin tamamı çalıştırıldı.
- [x] Backend OpenAPI sözleşmesi mobile senkronize edildi.
- [x] Generated TypeScript client yeniden üretildi.
- [x] Backend baseline, mobil contract ve generated client arasında sıfır drift doğrulandı.
- [x] Consumer endpoint'leri için endpoint -> ekran -> query/mutation -> test matrisi oluşturuldu.
- [x] Admin endpoint'leri consumer mobil kapsamı dışında işaretlendi.
- [x] Ürün dili, minimum iOS/Android, tablet ve web kapsamı kararları yazıldı.
- [x] Analytics event isimlendirme ve kişisel veri sınıflandırma dokümanı başlatıldı.

### Kabul kriterleri

- Backend full suite: 954/954 başarılı.
- Mobil `typecheck` ve contract testleri başarılı.
- Contract hash/drift CI tarafından korunuyor.
- Her user-facing backend operasyonu "mobilde var", "planlandı" veya "bilinçli kapsam dışı"
  durumlarından birine sahip.

## Faz 1 — API ve session mimarisini tekleştirme

**Amaç:** Legacy ağ hattını kaldırmak ve bütün ekranları güvenli, typed API temeline taşımak.

### İşler

- [ ] Generated client factory'yi Auth, Camp, User, Chat, Notification, Upload, Legal,
      Metadata, Report ve UserBlock API'lerini expose edecek şekilde genişlet.
- [ ] Environment-aware API origin doğrulaması ekle; development, staging ve production
      adreslerini build profile üzerinden yönet.
- [ ] HTTPS zorunluluğunu staging/production build'lerinde fail-fast uygula.
- [ ] SecureStore session repository'yi tek session kaynağı yap.
- [ ] Access/refresh token save, restore, rotate, clear ve corrupt-session senaryolarını tamamla.
- [ ] Eşzamanlı 401'lerde tek refresh ve başarısız refresh'te atomik logout davranışını koru.
- [ ] Refresh sırasında oluşan network hatası ile invalid refresh token durumunu ayır.
- [ ] Merkezi `AppProblem` modeli ve kullanıcı mesajı eşlemesi oluştur.
- [ ] Timeout, cancellation, network unavailable, 429 ve 5xx retry politikalarını tanımla.
- [ ] Mutation endpoint'lerine idempotency key bağla.
- [ ] Upload işlemlerinde FormData boundary'sini transport katmanına bırak.
- [ ] Bütün legacy `src/services/*`, Axios client ve AsyncStorage token servisini kaldır.
- [ ] Manuel `Camp`, `Notification`, `ChatMessage`, `UserProfile` API tiplerini kaldır veya
      yalnızca açık UI view-model'lerine dönüştür.

### Testler

- [ ] SessionStore unit testleri.
- [ ] Login/save/restore/logout testleri.
- [ ] 10 paralel 401 isteğinde tek refresh testi.
- [ ] Refresh failure, offline refresh ve malformed session testleri.
- [ ] Problem Details validation/forbidden/conflict/rate-limit testleri.
- [ ] Her generated API grubundan en az bir contract smoke testi.

### Kabul kriterleri

- Kaynakta `axios`, `apiClient`, `tokenService` veya auth amaçlı AsyncStorage kullanımı yok.
- Hiçbir screen/hook raw URL oluşturmaz.
- Bütün API çağrıları `/api/v1` generated operasyonları üzerinden gider.
- Tokenlar log, Redux, analytics veya crash breadcrumb içine düşmez.

## Faz 2 — TypeScript, uygulama shell'i ve navigation

**Amaç:** Uygulama yaşam döngüsünü ve navigation güvenliğini ürün seviyesine getirmek.

### İşler

- [ ] Tüm `.js`/`.jsx` uygulama dosyalarını `.ts`/`.tsx`'e geçir.
- [ ] TypeScript `strict`, `noUncheckedIndexedAccess`, `noImplicitOverride` ve uygun
      unused kontrollerini etkinleştir.
- [ ] Typed Redux hook'ları ve typed navigation param listeleri oluştur.
- [ ] AuthStack, VerificationStack ve AppStack'i ayır.
- [ ] Bootstrap state'leri tanımla: loading, authenticated, unauthenticated,
      email-unverified, reactivation-required ve fatal-config-error.
- [ ] SecureStore session restore bitmeden yanlış ekranın görünmesini engelle.
- [ ] Navigation history'de auth ekranı bırakmayan reset davranışı ekle.
- [ ] Universal/app link şeması ve `/notifications/open` resolver'ını kur.
- [ ] Cold start, background ve foreground notification/deep-link davranışlarını aynı
      resolver üzerinden geçir.
- [ ] Global Error Boundary ve kurtarılabilir fatal-error ekranı ekle.
- [ ] AppState değişiminde session/query yenileme politikasını tanımla.

### Kabul kriterleri

- Uygulama yeniden açıldığında geçerli session doğrudan AppStack'e gider.
- Süresi dolmuş/iptal edilmiş session auth ekranına temiz şekilde döner.
- Auth olmayan kullanıcı korumalı route'a deep link ile giremez.
- Navigation route adlarında ve parametrelerinde `any` yoktur.
- El yazımı uygulama kaynaklarında `.js`/`.jsx` kalmaz.

## Faz 3 — Design system ve ortak UX durumları

**Amaç:** Dağınık stilleri ve tutarsız loading/error davranışlarını merkezi hale getirmek.

### İşler

- [ ] Renk, spacing, typography, radius, elevation ve motion tokenlarını oluştur.
- [ ] Mevcut yüzlerce hard-coded rengi design tokenlarına taşı.
- [ ] Kullanılacak tema yaklaşımını tekleştir; ölü Paper/theme kodunu kaldır veya gerçekten bağla.
- [ ] Light/dark/system theme kararını uygula ve kalıcı hale getir.
- [ ] Ortak Button, IconButton, TextField, Select, DateField, Card, Avatar, Badge,
      Snackbar, Dialog, Sheet, Skeleton, EmptyState ve ErrorState bileşenlerini oluştur.
- [ ] Safe area için yalnızca `react-native-safe-area-context` kullan.
- [ ] Form alanlarında label, inline error, required state ve submit state standardı oluştur.
- [ ] Destructive aksiyonlarda confirmation ve geri alınabilir aksiyonlarda undo standardı ekle.
- [ ] Dynamic Type/font scaling ve reduced-motion davranışlarını destekle.
- [ ] Minimum 44x44 touch target ve screen-reader etiketlerini uygula.

### Kabul kriterleri

- Screen dosyalarında ürün renk hex'i kullanılmaz.
- Her async ekran loading, empty, error, retry ve success durumlarına sahiptir.
- Erişilebilirlik denetiminde kritik/major ihlal yoktur.
- Küçük telefon, büyük telefon ve tablet düzenleri taşmadan çalışır.

## Faz 4 — Authentication ve hesap giriş yaşam döngüsü

**Amaç:** Backend'in bütün kullanıcı erişim akışlarını tamamlamak.

### İşler

- [ ] Login'i gerçek `AuthResponse` ile bağla; user ve profile-completion durumunu işle.
- [ ] Register öncesi `GET /legal/documents/current` çağrısı yap.
- [ ] Kullanım koşulları ve gizlilik politikası linklerini, sürümlerini ve ayrı onaylarını ekle.
- [ ] Kayıt sonrası backend'in döndürdüğü session ve e-posta doğrulama durumunu işle.
- [ ] E-posta doğrulama token deep link ekranını ekle.
- [ ] Doğrulama e-postasını tekrar gönderme ve cooldown UX'i ekle.
- [ ] Şifremi unuttum ve token ile yeni şifre belirleme akışını ekle.
- [ ] Deaktive hesap için reaktivasyon talebi ve reaktivasyon deep link akışını ekle.
- [ ] Verified-email gerektiren aksiyonlarda backend'in 403 kodunu doğrulama CTA'sına çevir.
- [ ] Aktif cihaz/oturum listesi ve "tüm cihazlardan çıkış" özelliklerini ekle.
- [ ] Logout'ta backend refresh token revoke çağrısını best-effort yap, sonra local session'ı temizle.
- [ ] Password manager/autofill, email keyboard ve güvenli şifre giriş özelliklerini tamamla.

### Kabul kriterleri

- Register, verify, login, refresh, forgot/reset password, logout, logout-all ve reactivate
  gerçek staging backend'inde E2E geçer.
- Terms/privacy sürümleri backend'e doğru gönderilir.
- Uygulama verified-email gerektiren aksiyonları anlaşılır şekilde yönetir.
- Hiçbir auth response veya token production log'una yazılmaz.

## Faz 5 — Keşif, arama ve kamp detayı

**Amaç:** Backend discovery kapasitesini gerçek ürün deneyimine dönüştürmek.

### İşler

- [ ] Server-side search ve debounce ekle.
- [ ] Location, koordinat/radius, status, category, difficulty, minimum experience,
      amenities, availability, upcoming ve date-range filtrelerini ekle.
- [ ] Backend `CampSortOption` seçenekleriyle sıralamayı bağla.
- [ ] Metadata endpoint'inden kategori, difficulty, visibility ve sort seçeneklerini getir/cache'le.
- [ ] Offset pagination için tekrar etmeyen, yarış koşulu güvenli infinite list kur.
- [ ] Pull-to-refresh ve stale-cache davranışlarını standardize et.
- [ ] Ana sayfadaki "popüler" ve "yaklaşan" bölümleri ilk 10 kaydı client-side sıralamak
      yerine backend sorgularından üret.
- [ ] Kamp detayında address, meeting point, harita koordinatı, application window,
      available spots, difficulty, experience, pet/child friendly, equipment, rules ve
      amenities alanlarını göster.
- [ ] Kartlarda `thumbnailUrl`, detayda `detailImageUrl`, tam ekranda original fallback kullan.
- [ ] Organizer rating, tamamlanan/iptal edilen kamp sayısı ve cancellation-rate güven
      göstergesini açıklayıcı biçimde göster.
- [ ] Cancelled/full/applications-closed/waitlisted gibi bütün join-action durumlarını işle.
- [ ] Deep link ile doğrudan kamp detayına güvenli giriş ekle.

### Kabul kriterleri

- Filtre/sıralama kombinasyonları gerçek backend sonuçlarıyla contract testinden geçer.
- Liste 1.000+ kayıt simülasyonunda duplicate/drop üretmez.
- Kamp detayı bütün status ve nullable-field kombinasyonlarında render edilir.
- Liste scroll performansı hedef cihazlarda akıcıdır.

## Faz 6 — Kamp oluşturma ve organizer yönetimi

**Amaç:** Organizer'ın kampı fikir aşamasından tamamlanmasına kadar mobilde yönetebilmesi.

### İşler

- [ ] Mevcut tek adımlı formu doğrulanmış, kayıp veri önleyen çok adımlı akışa çevir.
- [ ] Başlık, açıklama, location/address/meeting point ve koordinat alanlarını ekle.
- [ ] Application start/end, camp start/end ve timezone davranışını açıkça yönet.
- [ ] Visibility, category, difficulty, minimum experience, pet/child friendly,
      equipment, rules ve amenities alanlarını ekle.
- [ ] Draft oluşturma/kaydetme/devam etme ve publish akışlarını bağla.
- [ ] Autosave veya kontrollü "taslak kaydet" davranışı ekle.
- [ ] Publish validation hatalarını ilgili form adımına/alanına taşı.
- [ ] Çoklu kamp görseli ekleme, sıralama, cover seçme ve silme özelliklerini ekle.
- [ ] Upload progress, retry, cancellation, MIME/size ve görsel kalite kontrolü ekle.
- [ ] Kamp düzenleme için concurrency version gönder ve 409 conflict çözüm UX'i ekle.
- [ ] Başvuruları aç/kapat akışını ekle.
- [ ] Kamp iptalinde zorunlu sebep, sonuç özeti ve confirmation ekle.
- [ ] Kamp silme için kapsam ve backend kurallarına uygun destructive-flow ekle.
- [ ] "Oluşturduğum kamplar" listesini paginated organizer dashboard'a dönüştür.

### Kabul kriterleri

- Draft -> edit -> image management -> publish -> update -> cancel akışı staging E2E geçer.
- Double-tap/retry aynı kampı iki kez oluşturmaz.
- Uygulama kapanıp açıldığında taslak kaybolmaz.
- 409 concurrency conflict veri ezmeden çözülür.

## Faz 7 — Katılım, davet, katılımcı ve yoklama

**Amaç:** Kamp katılım yaşam döngüsünü iki kullanıcı rolü açısından eksiksiz tamamlamak.

### Katılımcı işleri

- [ ] Join request gönderme sonucunda pending/waitlisted durumlarını işle.
- [ ] Aktif başvuruyu ve status geçmişini göster.
- [ ] Başvuruyu geri çekme akışını ekle.
- [ ] Kamp davetleri inbox'ını ekle; accept/reject işlemlerini bağla.
- [ ] Katıldığı kamptan ayrılma akışını ekle.
- [ ] "Katıldığım kamplar" listesini pagination ve status filtreleriyle tamamla.

### Organizer işleri

- [ ] Pending request listesini paginated hale getir.
- [ ] Approve/reject sırasında satır bazlı loading, hata ve undo/confirmation davranışı ekle.
- [ ] Gönderilmiş davetleri listele, yeni davet oluştur ve daveti revoke et.
- [ ] Katılımcı listesini görüntüle.
- [ ] Katılımcı çıkarma ve bulk-remove akışlarını ekle.
- [ ] Kamp sahipliğini başka katılımcıya transfer etme akışını ekle.
- [ ] Attendance listesini ve katılımcı yoklama güncellemesini ekle.

### Kabul kriterleri

- İki test kullanıcısıyla request -> waitlist/approve/reject/withdraw senaryoları E2E geçer.
- Invitation send -> accept/reject/revoke senaryoları E2E geçer.
- Participant removal/leave sonrasında chat erişimi anında kapanır.
- Hızlı tekrarlanan mutationlar UI ve backend state'ini ayrıştırmaz.

## Faz 8 — Yorumlar, puanlar, review ve güvenlik etkileşimleri

**Amaç:** Kamp sonrası etkileşimleri ve kullanıcı güvenliği özelliklerini tamamlamak.

### İşler

- [ ] Yorum listesini pagination ile yükle; optimistic add/delete uygula.
- [ ] Yalnızca backend'in izin verdiği kullanıcılara yorum composer göster.
- [ ] Puanlama mutation'ında idempotency, loading ve hata davranışı ekle.
- [ ] Review listesini cursor pagination ile göster.
- [ ] Organizer review response oluşturma/güncelleme akışını ekle.
- [ ] Camp, comment, review, message ve user hedefleri için içerik raporlama sheet'i ekle.
- [ ] Report reason/status değerlerini metadata endpoint'inden al.
- [ ] Kullanıcının kendi raporlarını ve durumlarını göster.
- [ ] Kullanıcı block/unblock ve blocked-user listesi ekle.
- [ ] Engellenmiş kullanıcı içeriğinin listeler ve gerçek zamanlı chat üzerindeki etkisini doğrula.
- [ ] Destructive/moderation aksiyonlarında açıklayıcı sonuç mesajı göster.

### Kabul kriterleri

- Rating/review/comment izin matrisinin tamamı test edilir.
- Block edilen kullanıcının içeriği cache, pagination veya SignalR üzerinden geri sızmaz.
- Aynı raporun retry ile çoğalması idempotency sayesinde engellenir.

## Faz 9 — Gerçek zamanlı chat

**Amaç:** Mevcut "gönder ve tüm mesajları yeniden indir" yaklaşımını gerçek ürün chat'ine dönüştürmek.

### İşler

- [ ] Expo/React Native uyumlu SignalR client ekle.
- [ ] `/chatHub` bağlantısında SecureStore-backed access-token factory kullan.
- [ ] Automatic reconnect, exponential backoff, foreground/background ve token-refresh
      yeniden bağlantı davranışlarını uygula.
- [ ] `JoinCampRoom`/`LeaveCampRoom` yaşam döngüsünü screen focus ile bağla.
- [ ] Cursor pagination ile geçmiş mesajları yükle.
- [ ] `ReceiveMessage`, `MessageEdited`, `MessageDeleted` ve `ChatAccessRevoked`
      event'lerini query cache ile birleştir.
- [ ] Text mesajlarını optimistic ve idempotent gönder.
- [ ] Image message için upload `fileId`, thumbnail/detail/original gösterimini bağla.
- [ ] Location message gönderme ve haritada açma akışını ekle.
- [ ] System mesajlarını ayrı, salt okunur bir component ile göster.
- [ ] Mesaj edit/delete yetkisi, edited/deleted durumu ve confirmation ekle.
- [ ] Unread count ve mark-as-read akışını bağla.
- [ ] Organizer announcement görüntüleme/güncelleme/silme akışını ekle.
- [ ] Klavye, scroll-to-bottom, yeni mesaj göstergesi ve uzun mesaj performansını iyileştir.

### Kabul kriterleri

- İki gerçek cihaz arasında mesaj p95 görünme süresi kabul ortamında <= 2 saniyedir.
- Reconnect sonrasında mesaj kaybı veya duplicate oluşmaz.
- Offline gönderim açıkça failed/retry durumuna geçer; sahte başarı göstermez.
- Chat access revoked event'i kullanıcıyı anında odadan çıkarır.
- 10.000 mesajlık fixture ile pagination ve scroll stabil çalışır.

## Faz 10 — Bildirimler, push ve deep link

**Amaç:** Backend notification/outbox sistemini gerçek cihaz deneyimine bağlamak.

### İşler

- [ ] Expo 55 uyumlu notification ve device paketlerini ekle.
- [ ] Backend Firebase kullandığı için Expo push token yerine platform native device token
      stratejisini doğrula ve dokümante et.
- [ ] Android notification channel ve iOS permission akışlarını ekle.
- [ ] Permission istemeden önce kullanıcıya bağlam açıklaması göster.
- [ ] Push device tokenı backend'e platform ve device name ile register et.
- [ ] Token rotation/reinstall/login-user-change durumlarında subscription'ı güncelle.
- [ ] Logout/account deletion sırasında device subscription'ı deactivate et.
- [ ] Bildirim listesini server pagination ile tamamla.
- [ ] Mark-read/read-all mutationlarını optimistic ve rollback güvenli yap.
- [ ] Notification preferences ekranını ekle.
- [ ] Related camp/join-request/message alanlarına göre doğru deep link hedefini aç.
- [ ] Foreground notification banner ve badge senkronizasyonu ekle.
- [ ] Cold start, background tap ve running-app tap senaryolarını test et.

### Kabul kriterleri

- Gerçek Android ve iOS cihazda push teslimi doğrulanır.
- Bildirime dokunmak doğru kamp/chat/request ekranını açar.
- Logout sonrası eski kullanıcıya push gelmez.
- Badge, notification listesi ve backend unread count yeniden açılışta tutarlıdır.

## Faz 11 — Profil, güvenlik, gizlilik ve hesap yaşam döngüsü

**Amaç:** Kullanıcıya hesabı ve verileri üzerinde tam kontrol vermek.

### İşler

- [ ] Profil görüntüleme/düzenlemeyi generated modellere geçir.
- [ ] Profile `concurrencyVersion` gönder ve 409 conflict çözümü ekle.
- [ ] Profil fotoğrafı upload progress/error/retry ve variant URL kullanımını tamamla.
- [ ] Public profile, created/joined camps pagination'ını tamamla.
- [ ] Şifre değiştirme ekranı ekle; başarı sonrası session politikasını backend ile doğrula.
- [ ] Aktif session/device ekranını hesap güvenliği bölümüne bağla.
- [ ] Veri dışa aktarımı talebi, status takibi ve güvenli indirme/paylaşma akışını ekle.
- [ ] Hesap deaktivasyonu için password confirmation ve sonuç akışı ekle.
- [ ] Kalıcı hesap silme talebi, bekleme süresi ve sonuç ekranını ekle.
- [ ] Gizlilik, koşullar, destek, uygulama sürümü ve lisanslar ekranlarını ekle.
- [ ] Hassas ekranlarda screenshot/screen-capture politikasını ürün kararıyla uygula.

### Kabul kriterleri

- Profile concurrency conflict veri kaybı üretmez.
- Export dosyası yalnızca talep sahibi session tarafından indirilebilir.
- Deactivation/deletion sonrası local session, query cache, push subscription ve kişisel
  veriler cihazdan temizlenir.
- Reaktivasyon akışı cold-start deep link ile çalışır.

## Faz 12 — Dayanıklılık, performans ve güvenlik hardening'i

**Amaç:** Gerçek ağ ve cihaz koşullarında güvenilir davranış sağlamak.

### İşler

- [ ] Network state göstergesi ve offline/read-cache davranışı ekle.
- [ ] GET retry; mutation no-blind-retry politikalarını merkezi uygula.
- [ ] Request cancellation ve screen unmount güvenliğini tamamla.
- [ ] Cache TTL, garbage collection ve logout cache purge politikalarını yaz/test et.
- [ ] Görsel cache, thumbnail kullanımı ve memory baskısı davranışını optimize et.
- [ ] Büyük listelerde virtualization ayarlarını ve gereksiz renderları profile et.
- [ ] Hermes/React Native performance profiling ile startup, navigation ve scroll ölç.
- [ ] App binary içinde secret bulunmadığını otomatik taramayla doğrula.
- [ ] Production'da yalnızca allowlist edilmiş HTTPS hostlarına erişim sağlandığını doğrula.
- [ ] Log redaction uygula; token, password, email ve dosya URL'lerini filtrele.
- [ ] Root/jailbreak tespiti yalnızca net tehdit modeli ve ürün kararı varsa ekle.
- [ ] OWASP MASVS odaklı mobil güvenlik checklist'i tamamla.
- [ ] Dependency audit, license allowlist ve lockfile bütünlük kontrolünü CI'a ekle.

### Ölçülebilir hedefler

- Cold start p95: hedef cihazlarda <= 2,5 saniye.
- Ana ekran kullanılabilir hale gelme p95: <= 3 saniye, normal ağ.
- Crash-free users: beta ve production'da >= %99,8.
- ANR-free sessions: >= %99,9.
- Kritik listelerde scroll sırasında gözle görünür uzun frame sorunu yok.
- Memory leak soak testinde sürekli büyüme yok.

## Faz 13 — Test piramidi ve CI kalite kapıları

**Amaç:** Ürün kalitesini manuel kontrole bağlı olmaktan çıkarmak.

### Unit test kapsamı

- [ ] Mapper, formatter, validation, reducer ve query-key testleri.
- [ ] Session, refresh, idempotency ve error-normalization testleri.
- [ ] Deep-link resolver ve notification routing testleri.
- [ ] Chat event merge/deduplication testleri.

### Component/integration kapsamı

- [ ] React Native Testing Library altyapısı kur.
- [ ] MSW veya eşdeğeriyle generated client seviyesinde kontrollü API mock'ları kur.
- [ ] Bütün formların validation, loading, error ve success testlerini yaz.
- [ ] Auth bootstrap ve navigation guard testlerini yaz.
- [ ] Infinite pagination, optimistic update ve rollback testlerini yaz.
- [ ] Accessibility query/role testlerini kritik bileşenlere ekle.

### E2E kapsamı

- [ ] Maestro veya Detox seç ve gerçek release-like build üzerinde çalıştır.
- [ ] Register -> verify -> login.
- [ ] Forgot/reset password.
- [ ] Camp draft -> publish -> discovery -> join -> approve.
- [ ] Chat text/image/location -> edit/delete -> unread/read.
- [ ] Push tap -> deep-linked screen.
- [ ] Rating/comment/report/block.
- [ ] Profile update -> export -> logout.
- [ ] Deactivate -> reactivate ve delete-request akışları.

### CI kapıları

- [ ] Clean install/lockfile doğrulaması.
- [ ] Expo dependency compatibility check.
- [ ] ESLint + Prettier check.
- [ ] Strict TypeScript.
- [ ] Unit/component test ve coverage.
- [ ] OpenAPI generation + drift + breaking-change kontrolü.
- [ ] Secret scan, dependency audit ve license check.
- [ ] Android/iOS preview build.
- [ ] En az bir Android ve bir iOS E2E smoke.

### Minimum coverage kapısı

- Statements >= %85.
- Branches >= %75.
- Auth/session/API adapter/deep-link/chat merge modülleri >= %90 branch coverage.
- Coverage tek başına kabul değildir; listelenen kritik E2E senaryoların tamamı zorunludur.

## Faz 14 — Analytics, crash reporting ve operasyonel görünürlük

**Amaç:** Üretimde kullanıcı sorunlarını ölçmek ve teşhis edebilmek.

### İşler

- [ ] Crash reporting sağlayıcısını seç ve environment/release etiketiyle bağla.
- [ ] Source map upload'ını CI release işine ekle.
- [ ] Backend correlation/trace ID'yi hata raporlarında PII içermeden taşı.
- [ ] Backend ürün funnel'ıyla uyumlu mobil event kataloğu oluştur.
- [ ] Login/register/verify, discovery, camp-create/publish, join, chat, notification ve
      retention funnel event'lerini ekle.
- [ ] Consent ve privacy kararlarına uygun analytics opt-out/disable mekanizması ekle.
- [ ] Performance spans: app startup, API latency, screen load ve image upload.
- [ ] Feature flag/kill-switch ihtiyacını değerlendir; chat/push gibi riskli özelliklerde
      gerektiğinde kontrollü kapatma desteği ekle.
- [ ] Support ekranına app version, build number, environment ve correlation ID kopyalama ekle.

### Kabul kriterleri

- Staging crash'i symbolicated stack trace ile dashboard'a düşer.
- Bir mobil API hatası backend trace/correlation ID ile uçtan uca bulunabilir.
- Analytics'te token, password, message içeriği veya serbest metin PII tutulmaz.

## Faz 15 — EAS, mağaza hazırlığı ve release engineering

**Amaç:** Tekrarlanabilir ve geri alınabilir mobil dağıtım hattı kurmak.

### İşler

- [ ] iOS bundle identifier ve Android application ID'yi kesinleştir.
- [ ] App scheme, associated domains/app links ve intent filter'ları yapılandır.
- [ ] Development, preview/staging ve production EAS build profile'larını oluştur.
- [ ] Environment değişkenlerini profile bazlı ayır; secret olmayan public config ile
      gerçek secret yönetimini karıştırma.
- [ ] iOS entitlements, push capability ve APNs/Firebase yapılandırmasını tamamla.
- [ ] Android notification icon/channel, signing ve Firebase yapılandırmasını tamamla.
- [ ] Runtime version ve OTA update politikasını tanımla.
- [ ] OTA rollout, rollback ve native-runtime uyumsuzluk kurallarını test et.
- [ ] Semantic version/build number otomasyonu kur.
- [ ] App icon, splash, adaptive icon ve store screenshot'larını finalleştir.
- [ ] Privacy manifest/labels, data safety formu, izin açıklamaları, destek URL'si ve
      hesap silme gerekliliklerini tamamla.
- [ ] Third-party license notices üret.
- [ ] Release notes, rollback ve incident runbook'u yaz.
- [ ] Internal distribution ile release candidate üret.

### Kabul kriterleri

- Temiz makinede aynı commit'ten tekrarlanabilir Android ve iOS production build alınır.
- Staging build production verisine bağlanamaz; production build development HTTP adresine düşemez.
- Push, deep link ve auth callback'leri release build'de gerçek cihazda çalışır.
- OTA rollback tatbikatı tamamlanmıştır.
- Store metadata ve privacy beyanları uygulamanın gerçek davranışıyla eşleşir.

## Faz 16 — Beta, go-live ve kapanış

**Amaç:** Kontrollü kullanıcı doğrulamasıyla ürünü yayınlamak ve mobil geliştirme kapsamını kapatmak.

### İşler

- [ ] QA test matrisi: desteklenen iOS/Android sürümleri, küçük/büyük ekranlar ve düşük/orta
      segment cihazlar.
- [ ] En az bir gerçek iPhone ve iki farklı Android üretici/segment cihazında test.
- [ ] TestFlight ve Play Internal Testing dağıtımı.
- [ ] 1 haftalık ekip dogfood dönemi.
- [ ] Ardından ölçülebilir beta cohort'u; crash, ANR, funnel ve support geri bildirimi izle.
- [ ] P0/P1 hataları sıfırla; kabul edilen P2/P3 borçlarını sahip ve tarih ile kaydet.
- [ ] Backend production smoke, push provider, object storage ve deep-link domain doğrulaması yap.
- [ ] Store review için production release candidate'ı imzala ve gönder.
- [ ] Kademeli rollout uygula: iç test -> küçük yüzde -> %100.
- [ ] İlk 24/72 saat izleme ve rollback sorumlularını belirle.
- [ ] Son mimari, onboarding, release ve incident dokümantasyonunu teslim et.

### Nihai go/no-go kapısı

Aşağıdakilerden biri sağlanmıyorsa yayın yapılmaz:

- [ ] Açık P0 veya P1 hata yok.
- [ ] Backend full suite 954/954, mobil CI ve kritik E2E tamamen yeşil.
- [ ] Contract/generated-client drift sıfır.
- [ ] Auth/session/refresh/revoke gerçek staging ortamında doğrulanmış.
- [ ] Push ve deep link iOS/Android gerçek cihazda doğrulanmış.
- [ ] SignalR reconnect ve access-revocation testleri geçmiş.
- [ ] Crash-free ve ANR hedefleri beta cohort'unda sağlanmış.
- [ ] Accessibility kritik/major ihlal yok.
- [ ] Security/privacy checklist ve mağaza beyanları onaylanmış.
- [ ] Backup, backend rollback ve mobil OTA/store rollback prosedürü denenmiş.
- [ ] Support ve incident sahipleri atanmış.

## 6. Backend özellikleri için mobil kapsama matrisi

| Backend alanı                 | Bugünkü mobil durum        | Roadmap sonu hedefi                              | Faz         |
| ----------------------------- | -------------------------- | ------------------------------------------------ | ----------- |
| Register/login                | Legacy ve response uyumsuz | Typed, legal-aware, güvenli session              | 1, 4        |
| Refresh/logout/sessions       | UI'da yok                  | Rotation, revoke, session listesi                | 1, 4        |
| Verify/reset/reactivate       | Yok                        | Deep-link destekli tam akış                      | 4           |
| Camp discovery                | Temel ilk sayfa            | Tüm server filtre/sort/pagination                | 5           |
| Camp detail                   | Kısmi                      | Tüm metadata, güven ve durumlar                  | 5           |
| Draft/publish/edit/cancel     | Yok veya çok sınırlı       | Tam organizer yaşam döngüsü                      | 6           |
| Multi-image                   | Tek upload                 | Variant, sıra, cover, delete                     | 6           |
| Join request                  | Kısmi                      | Mine/history/withdraw/waitlist                   | 7           |
| Invitations                   | Yok                        | Inbox, send, accept/reject/revoke                | 7           |
| Participants/attendance       | Yok                        | Liste, remove, leave, bulk, transfer, attendance | 7           |
| Comments/ratings/reviews      | Kısmi                      | Pagination, cursor, organizer response           | 8           |
| Reports/blocking              | Yok                        | Consumer safety merkezi                          | 8           |
| Chat                          | Poll/reload, text          | SignalR + cursor + 4 mesaj tipi                  | 9           |
| Chat edit/delete/announcement | Yok                        | Tam destek                                       | 9           |
| Notification list             | Kısmi                      | Pagination ve doğru routing                      | 10          |
| Push/preferences              | Yok                        | Native push lifecycle ve tercihler               | 10          |
| Profile                       | Kısmi, concurrency eksik   | Typed ve conflict-safe                           | 11          |
| Password/security             | Yok                        | Change password + active sessions                | 4, 11       |
| Export/deactivate/delete      | Yok                        | Tam privacy lifecycle                            | 11          |
| Admin moderation/audit        | Bilinçli kapsam dışı       | Ayrı admin istemcisi                             | Kapsam dışı |

## 7. Önerilen teslim organizasyonu

Fazlar tamamen seri değildir, ancak kritik bağımlılık sırası korunmalıdır:

```text
Faz 0
  -> Faz 1
      -> Faz 2
          -> Faz 3
              -> Faz 4-11 feature ekipleri
                  -> Faz 12-14 hardening
                      -> Faz 15
                          -> Faz 16
```

Önerilen paralellik:

- API/session ve navigation temeli tamamlandıktan sonra discovery/camp ve auth/account
  feature'ları paralel ilerleyebilir.
- Chat, push ve deep link işleri ortak session/navigation sözleşmesine bağımlıdır.
- Test altyapısı Faz 0'da başlar; Faz 13'e ertelenmez. Faz 13 kapsam kapanışıdır.
- Accessibility, analytics ve performans her feature PR'ının Definition of Done'ına dahildir;
  son fazda topluca eklenmez.

Kabaca kapasite tahmini:

- Tek senior mobile developer: yaklaşık 18-24 hafta.
- İki mobile developer + düzenli QA desteği: yaklaşık 11-15 hafta.
- Tahmin; tasarım kararlarının hazır, backend'in büyük ölçüde stabil ve staging/Firebase/EAS
  erişimlerinin gecikmeden sağlandığı varsayımına dayanır.
- Takvim baskısı kalite kapılarının kaldırılmasıyla değil, feature kapsamının ürün sahibi
  tarafından açıkça daraltılmasıyla yönetilmelidir.

## 8. Her PR için Definition of Done

Bir iş aşağıdakilerin tamamı sağlanmadan tamamlanmış sayılmaz:

- [ ] Generated contract ve hedef backend davranışı doğrulandı.
- [ ] TypeScript strict hatası yok; `any` gerekliyse nedeni ve sınırı açık.
- [ ] Loading, empty, error, retry, offline ve success durumları ele alındı.
- [ ] Accessibility label/role/state ve touch target kontrol edildi.
- [ ] Analytics event ve PII değerlendirmesi yapıldı.
- [ ] Unit/component testi eklendi; kritik akışsa E2E güncellendi.
- [ ] iOS ve Android davranışı kontrol edildi.
- [ ] Query invalidation/optimistic rollback davranışı test edildi.
- [ ] Hassas veri loglanmıyor.
- [ ] Dokümantasyon ve kapsama matrisi güncellendi.
- [ ] CI'ın tamamı yeşil.

## 9. Ürün seviyesinde tamamlanmış mobil uygulama tanımı

Roadmap sonundaki mobil uygulama:

- Yeni kullanıcının legal belgeleri kabul ederek kaydolabildiği,
- E-postasını doğrulayıp güvenli oturum açabildiği,
- Şifresini sıfırlayıp hesabını yeniden aktive edebildiği,
- Kampları gelişmiş filtrelerle keşfedebildiği,
- Kamp taslağı oluşturup görselleriyle yayınlayabildiği,
- Katılım, davet, bekleme listesi ve yoklama süreçlerini yönetebildiği,
- Text, image ve location içerikli gerçek zamanlı chat kullanabildiği,
- Push bildiriminden doğru içeriğe yönlenebildiği,
- Yorum, puan, review, rapor ve engelleme özelliklerini güvenle kullanabildiği,
- Profilini, aktif oturumlarını ve kişisel verilerini yönetebildiği,
- Zayıf ağ, token expiry, concurrency conflict ve uygulama yeniden açılışı gibi gerçek
  koşullarda veri kaybetmeden çalıştığı,
- Ölçümlenebilir, erişilebilir, test edilmiş ve geri alınabilir şekilde yayınlanabildiği

bir ürün olmalıdır.

Bu tanım ve Faz 16 go/no-go kapısı birlikte sağlandığında mobil geliştirme kapsamı
ürün seviyesi için tamamlanmış kabul edilir.
