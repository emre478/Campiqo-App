# Mobile Endpoint Coverage Matrix

## Baseline

- İnceleme tarihi: `2026-09-05`
- Mobil baseline commit: `4968ff5`
- Contract SHA-256: `C0915E92DDB486895549DB6E0A08B83EA5EC35E9F00358BFF8D065244FD32748`
- Toplam backend operasyonu: `101`
- Consumer mobil kapsamı: `92`
- Admin kapsam dışı operasyon: `9`
- Aktif fakat legacy operasyon: `30`
- Planlanan consumer operasyon: `62`

## Kapsam

Bu doküman backend API operasyonları ile mobil ekranlar, kullanıcı akışları,
query/mutation entegrasyonları, roadmap fazları ve testler arasındaki
izlenebilirliği tanımlar.

Backend sözleşmesinin tek kaynağı:

`contracts/openapi/v1/campiqo-v1.json`

Mobil uygulamadaki senkronize kopya:

`contracts/campiqo-v1.json`

`/api/v1/admin/*` operasyonları consumer mobil uygulamasının bilinçli olarak
kapsamı dışındadır. Bunlar ayrı bir yönetim panelinin sorumluluğundadır.

Generated API client içinde bir operasyonun bulunması, o operasyonun mobil
uygulamada tamamlandığı anlamına gelmez. Operasyonun gerçek kullanıcı akışına,
merkezi session yönetimine ve gerekli testlere bağlanması gerekir.

## Durum tanımları

- `MOBİLDE VAR — LEGACY`: Kullanıcı akışı mevcut fakat eski Axios, manuel DTO,
  eski session veya parçalı state altyapısını kullanıyor. Ürün seviyesinde tamamlanmış değildir.
- `PLANLANDI`: Operasyon generated client içinde bulunabilir fakat tamamlanmış
  mobil ekran, kullanıcı akışı veya aktif entegrasyon yoktur.
- `BİLİNÇLİ KAPSAM DIŞI`: Consumer mobil uygulamasında yer almayacak admin operasyonudur.

## Tamamlanma kuralı

Bir operasyon ancak aşağıdakilerin tamamı sağlandığında ürün seviyesinde tamamlanmış sayılır:

1. Generated client üzerinden çağrılır.
2. Screen veya feature hook içinde gerçek kullanıcı akışına bağlıdır.
3. Loading, empty, error, retry ve success durumları ele alınmıştır.
4. Problem Details hataları kullanıcıya merkezi biçimde gösterilir.
5. Gerekiyorsa idempotency ve optimistic rollback uygulanır.
6. Unit, integration veya E2E doğrulaması vardır.
7. iOS ve Android davranışı doğrulanmıştır.
8. Bu matris güncellenmiştir.

# Operasyon Matrisi

## Authentication — 12 operasyon

| Domain | OperationId | Method ve path | Mobil ekran/akış | Mevcut entegrasyon | Durum | Hedef faz | Gerekli doğrulama |
|---|---|---|---|---|---|---:|---|
| Auth | `Auth_Register` | `POST /api/v1/auth/register` | `RegisterScreen.jsx` | `authService.register` / legacy Axios; response uyumsuz | MOBİLDE VAR — LEGACY | 1, 4 | Contract, validation ve register E2E |
| Auth | `Auth_Login` | `POST /api/v1/auth/login` | `LoginScreen.jsx` | `authService.login` / legacy Axios; `AuthResponse` yanlış yorumlanıyor | MOBİLDE VAR — LEGACY | 1, 4 | Login, session save ve E2E |
| Auth | `Auth_Refresh` | `POST /api/v1/auth/refresh` | Session yenileme | Generated altyapı var; aktif uygulama hattına bağlı değil | PLANLANDI | 1 | Rotation, paralel 401 ve failure testleri |
| Auth | `Auth_Logout` | `POST /api/v1/auth/logout` | Çıkış | Yalnızca yerel Redux temizliği var; backend revoke yok | PLANLANDI | 1, 4 | Revoke, local cleanup ve E2E |
| Auth | `Auth_LogoutAll` | `POST /api/v1/auth/logout-all` | Tüm cihazlardan çıkış | Ekran ve entegrasyon yok | PLANLANDI | 4 | Logout-all ve session cleanup E2E |
| Auth | `Auth_GetActiveSessions` | `GET /api/v1/auth/sessions` | Hesap güvenliği | Ekran ve entegrasyon yok | PLANLANDI | 4, 11 | Session list integration testi |
| Auth | `Auth_VerifyEmail` | `POST /api/v1/auth/verify-email` | E-posta doğrulama deep linki | Akış yok | PLANLANDI | 4 | Cold-start ve running-app deep-link E2E |
| Auth | `Auth_ResendEmailVerification` | `POST /api/v1/auth/resend-email-verification` | Doğrulama e-postasını tekrar gönder | Akış yok | PLANLANDI | 4 | Cooldown ve rate-limit testi |
| Auth | `Auth_RequestPasswordReset` | `POST /api/v1/auth/request-password-reset` | Şifremi unuttum | Akış yok | PLANLANDI | 4 | Request ve account-enumeration güvenlik testi |
| Auth | `Auth_ResetPassword` | `POST /api/v1/auth/reset-password` | Yeni şifre deep linki | Akış yok | PLANLANDI | 4 | Success, invalid ve expired token E2E |
| Auth | `Auth_RequestAccountReactivation` | `POST /api/v1/auth/request-account-reactivation` | Hesap reaktivasyon talebi | Akış yok | PLANLANDI | 4, 11 | Reactivation request E2E |
| Auth | `Auth_ReactivateAccount` | `POST /api/v1/auth/reactivate-account` | Hesap reaktivasyon deep linki | Akış yok | PLANLANDI | 4, 11 | Cold-start reactivation E2E |

## Camp — 12 operasyon

| Domain | OperationId | Method ve path | Mobil ekran/akış | Mevcut entegrasyon | Durum | Hedef faz | Gerekli doğrulama |
|---|---|---|---|---|---|---:|---|
| Camp | `Camp_GetAll` | `GET /api/v1/camp` | `HomeScreen.jsx`, `CampsScreen.jsx` | `campService.getCamps`; temel pagination | MOBİLDE VAR — LEGACY | 1, 5 | Filter, sort, pagination ve race testleri |
| Camp | `Camp_Create` | `POST /api/v1/camp` | `CreateCampScreen.jsx` | `useCreateCamp` → `campService.createCamp`; eksik model | MOBİLDE VAR — LEGACY | 1, 6 | Validation, idempotency ve create E2E |
| Camp | `Camp_GetDraft` | `GET /api/v1/camp/{id}/draft` | Kamp taslağını aç | Akış yok | PLANLANDI | 6 | Draft restore integration ve E2E |
| Camp | `Camp_SaveDraft` | `PUT /api/v1/camp/{id}/draft` | Taslak kaydet/autosave | Akış yok | PLANLANDI | 6 | Save, retry ve veri kaybı testi |
| Camp | `Camp_PublishDraft` | `POST /api/v1/camp/{id}/publish` | Taslağı yayınla | Akış yok | PLANLANDI | 6 | Publish validation ve E2E |
| Camp | `Camp_GetById` | `GET /api/v1/camp/{id}` | `CampDetailScreen.jsx` | `campService.getCampById`; alanlar kısmi | MOBİLDE VAR — LEGACY | 1, 5 | Status ve nullable-field render testleri |
| Camp | `Camp_Update` | `PUT /api/v1/camp/{id}` | Kamp düzenle | Akış yok | PLANLANDI | 6 | Validation ve 409 concurrency testi |
| Camp | `Camp_Delete` | `DELETE /api/v1/camp/{id}` | Kamp sil | Akış yok | PLANLANDI | 6 | Yetki, confirmation ve sonuç testi |
| Camp | `Camp_SetApplicationStatus` | `PATCH /api/v1/camp/{id}/applications` | Başvuruları aç/kapat | Akış yok | PLANLANDI | 6 | State transition integration testi |
| Camp | `Camp_CancelCamp` | `POST /api/v1/camp/{campId}/cancel` | Kampı iptal et | Akış yok | PLANLANDI | 6 | Sebep, confirmation ve E2E |
| Camp | `Camp_GetMyCreated` | `GET /api/v1/camp/my-created` | `MyCreatedCampsScreen.jsx` | `myCampService.getMyCreatedCamps`; pagination eksik | MOBİLDE VAR — LEGACY | 1, 6 | Pagination ve status filter testi |
| Camp | `Camp_GetMyJoined` | `GET /api/v1/camp/my-joined` | `MyJoinedCampsScreen.jsx` | `myCampService.getMyJoinedCamps`; pagination eksik | MOBİLDE VAR — LEGACY | 1, 7 | Pagination ve status filter testi |

## Camp comments — 3 operasyon

| Domain | OperationId | Method ve path | Mobil ekran/akış | Mevcut entegrasyon | Durum | Hedef faz | Gerekli doğrulama |
|---|---|---|---|---|---|---:|---|
| CampComment | `CampComment_GetComments` | `GET /api/v1/camp/{campId}/comments` | Kamp detayı yorum listesi | `campCommentService.getCampComments`; pagination eksik | MOBİLDE VAR — LEGACY | 1, 8 | Pagination ve async-state testleri |
| CampComment | `CampComment_AddComment` | `POST /api/v1/camp/{campId}/comments` | Kamp detayı yorum ekleme | `campCommentService.addCampComment` | MOBİLDE VAR — LEGACY | 1, 8 | Yetki, optimistic add ve rollback |
| CampComment | `CampComment_DeleteComment` | `DELETE /api/v1/camp/comments/{commentId}` | Yorum silme | `campCommentService.deleteCampComment` | MOBİLDE VAR — LEGACY | 1, 8 | Yetki, confirmation ve optimistic delete |

## Camp favorites — 3 operasyon

| Domain | OperationId | Method ve path | Mobil ekran/akış | Mevcut entegrasyon | Durum | Hedef faz | Gerekli doğrulama |
|---|---|---|---|---|---|---:|---|
| CampFavorite | `CampFavorite_Favorite` | `POST /api/v1/camp/{campId}/favorite` | Kamp detayında favorile | `campService.favoriteCamp` | MOBİLDE VAR — LEGACY | 1, 5 | Optimistic mutation ve rollback |
| CampFavorite | `CampFavorite_Unfavorite` | `DELETE /api/v1/camp/{campId}/favorite` | Kamp detayında favoriden çıkar | `campService.unfavoriteCamp` | MOBİLDE VAR — LEGACY | 1, 5 | Optimistic mutation ve rollback |
| CampFavorite | `CampFavorite_GetFavorites` | `GET /api/v1/camp/favorites` | `FavoritesScreen.jsx` | `campService.getFavoriteCamps`; pagination eksik | MOBİLDE VAR — LEGACY | 1, 5 | Pagination, cache ve empty-state testi |

## Camp images — 5 operasyon

| Domain | OperationId | Method ve path | Mobil ekran/akış | Mevcut entegrasyon | Durum | Hedef faz | Gerekli doğrulama |
|---|---|---|---|---|---|---:|---|
| CampImage | `CampImage_GetImages` | `GET /api/v1/camp/{campId}/images` | Kamp görselleri | Aktif entegrasyon yok | PLANLANDI | 6 | Variant URL ve sıralama testi |
| CampImage | `CampImage_AddImage` | `POST /api/v1/camp/{campId}/images` | Kampa görsel ekleme | Genel upload var; kampa bağlama yok | PLANLANDI | 6 | Multi-image ve idempotency testi |
| CampImage | `CampImage_Reorder` | `PUT /api/v1/camp/{campId}/images/order` | Görsel sıralama | Akış yok | PLANLANDI | 6 | Optimistic reorder ve rollback |
| CampImage | `CampImage_SetCover` | `PUT /api/v1/camp/{campId}/images/{imageId}/cover` | Kapak görseli seçme | Akış yok | PLANLANDI | 6 | Cover mutation ve cache testi |
| CampImage | `CampImage_DeleteImage` | `DELETE /api/v1/camp/{campId}/images/{imageId}` | Kamp görseli silme | Akış yok | PLANLANDI | 6 | Confirmation ve cover etkisi testi |

## Camp invitations — 2 operasyon

| Domain | OperationId | Method ve path | Mobil ekran/akış | Mevcut entegrasyon | Durum | Hedef faz | Gerekli doğrulama |
|---|---|---|---|---|---|---:|---|
| CampInvitation | `CampInvitation_GetSent` | `GET /api/v1/camp/{campId}/invitations` | Organizer gönderilmiş davetler | Ekran ve entegrasyon yok | PLANLANDI | 7 | Pagination ve status testi |
| CampInvitation | `CampInvitation_Create` | `POST /api/v1/camp/{campId}/invitations` | Organizer davet gönderme | Ekran ve entegrasyon yok | PLANLANDI | 7 | Yetki, validation ve idempotency testi |

## Camp join requests — 7 operasyon

| Domain | OperationId | Method ve path | Mobil ekran/akış | Mevcut entegrasyon | Durum | Hedef faz | Gerekli doğrulama |
|---|---|---|---|---|---|---:|---|
| CampJoinRequest | `CampJoinRequest_RequestJoin` | `POST /api/v1/camp/request/{campId}` | Kamp detayında katılım talebi | `campJoinRequestService.requestJoinCamp` | MOBİLDE VAR — LEGACY | 1, 7 | Pending, waitlist ve idempotency testi |
| CampJoinRequest | `CampJoinRequest_GetStatusHistory` | `GET /api/v1/camp/request/{requestId}/history` | Başvuru durum geçmişi | Akış yok | PLANLANDI | 7 | History sırası ve durum mapping testi |
| CampJoinRequest | `CampJoinRequest_WithdrawRequest` | `PATCH /api/v1/camp/request/{requestId}/withdraw` | Başvuruyu geri çek | Akış yok | PLANLANDI | 7 | Confirmation ve state transition testi |
| CampJoinRequest | `CampJoinRequest_ApproveRequest` | `POST /api/v1/camp/request/approve/{requestId}` | Organizer başvuru onayı | `campJoinRequestService.approveJoinRequest` | MOBİLDE VAR — LEGACY | 1, 7 | Satır loading, idempotency ve cache testi |
| CampJoinRequest | `CampJoinRequest_GetMyActiveRequest` | `GET /api/v1/camp/request/mine/{campId}` | Kullanıcının aktif başvurusu | Akış yok | PLANLANDI | 7 | Status/action-state integration testi |
| CampJoinRequest | `CampJoinRequest_GetPendingRequests` | `GET /api/v1/camp/request/pending/{campId}` | `CampJoinRequestsScreen.jsx` | `campJoinRequestService.getPendingJoinRequests` | MOBİLDE VAR — LEGACY | 1, 7 | Pagination ve organizer yetki testi |
| CampJoinRequest | `CampJoinRequest_RejectRequest` | `POST /api/v1/camp/request/reject/{requestId}` | Organizer başvuru reddi | `campJoinRequestService.rejectJoinRequest` | MOBİLDE VAR — LEGACY | 1, 7 | Satır loading, idempotency ve cache testi |

## Camp participants — 7 operasyon

| Domain | OperationId | Method ve path | Mobil ekran/akış | Mevcut entegrasyon | Durum | Hedef faz | Gerekli doğrulama |
|---|---|---|---|---|---|---:|---|
| CampParticipant | `CampParticipant_Leave` | `POST /api/v1/camp/{campId}/leave` | Katıldığı kamptan ayrıl | Akış yok | PLANLANDI | 7 | Confirmation, cache ve chat erişim testi |
| CampParticipant | `CampParticipant_TransferOwnership` | `POST /api/v1/camp/{campId}/ownership/transfer` | Kamp sahipliğini aktar | Akış yok | PLANLANDI | 7 | Yetki, confirmation ve lifecycle testi |
| CampParticipant | `CampParticipant_GetParticipants` | `GET /api/v1/camp/{campId}/participants` | Katılımcı listesi | Akış yok | PLANLANDI | 7 | Pagination, role ve empty-state testi |
| CampParticipant | `CampParticipant_RemoveParticipant` | `DELETE /api/v1/camp/{campId}/participants/{participantUserId}` | Katılımcı çıkar | Akış yok | PLANLANDI | 7 | Confirmation ve chat erişim testi |
| CampParticipant | `CampParticipant_UpdateAttendance` | `PUT /api/v1/camp/{campId}/participants/{participantUserId}/attendance` | Tekil yoklama güncelle | Akış yok | PLANLANDI | 7 | Optimistic update ve rollback |
| CampParticipant | `CampParticipant_GetAttendance` | `GET /api/v1/camp/{campId}/participants/attendance` | Yoklama listesi | Akış yok | PLANLANDI | 7 | Yetki ve attendance mapping testi |
| CampParticipant | `CampParticipant_BulkRemoveParticipants` | `POST /api/v1/camp/{campId}/participants/bulk-remove` | Toplu katılımcı çıkarma | Akış yok | PLANLANDI | 7 | Kısmi hata, confirmation ve cache testi |

## Camp ratings and reviews — 3 operasyon

| Domain | OperationId | Method ve path | Mobil ekran/akış | Mevcut entegrasyon | Durum | Hedef faz | Gerekli doğrulama |
|---|---|---|---|---|---|---:|---|
| CampRating | `CampRating_RateCamp` | `POST /api/v1/camp/{campId}/rate` | `CampRatingCard.jsx` | `useCampRating` → `campRatingService.rateCamp` | MOBİLDE VAR — LEGACY | 1, 8 | Yetki, idempotency ve rating testi |
| CampRating | `CampRating_GetReviews` | `GET /api/v1/camp/{campId}/reviews` | Review listesi | Ekran ve entegrasyon yok | PLANLANDI | 8 | Cursor pagination ve async-state testleri |
| CampRating | `CampRating_UpdateReviewResponse` | `PUT /api/v1/camp/{campId}/reviews/{reviewId}/response` | Organizer review yanıtı | Akış yok | PLANLANDI | 8 | Create/update, yetki ve validation testi |

## Chat — 10 operasyon

| Domain | OperationId | Method ve path | Mobil ekran/akış | Mevcut entegrasyon | Durum | Hedef faz | Gerekli doğrulama |
|---|---|---|---|---|---|---:|---|
| Chat | `Chat_GetMessages` | `GET /api/v1/chat/{campId}` | Mevcut chat mesaj listesi | `chatService.getChatMessages`; tam liste/poll yaklaşımı | MOBİLDE VAR — LEGACY | 1, 9 | Legacy geçiş ve erişim testi |
| Chat | `Chat_SendMessage` | `POST /api/v1/chat/{campId}` | Mevcut text mesaj gönderme | `chatService.sendMessage`; gönderim sonrası reload | MOBİLDE VAR — LEGACY | 1, 9 | Idempotency, optimistic send ve retry |
| Chat | `Chat_GetMessageCursorPage` | `GET /api/v1/chat/{campId}/messages` | Cursor tabanlı mesaj geçmişi | Akış yok | PLANLANDI | 9 | Cursor pagination ve duplicate testi |
| Chat | `Chat_UpdateMessage` | `PUT /api/v1/chat/{campId}/messages/{messageId}` | Mesaj düzenle | Akış yok | PLANLANDI | 9 | Yetki, optimistic update ve SignalR testi |
| Chat | `Chat_DeleteMessage` | `DELETE /api/v1/chat/{campId}/messages/{messageId}` | Mesaj sil | Akış yok | PLANLANDI | 9 | Yetki, confirmation ve SignalR testi |
| Chat | `Chat_GetUnreadCount` | `GET /api/v1/chat/{campId}/unread-count` | Chat okunmamış sayısı | Akış yok | PLANLANDI | 9 | Reconnect ve badge consistency testi |
| Chat | `Chat_MarkMessagesRead` | `PUT /api/v1/chat/{campId}/read` | Mesajları okundu işaretle | Akış yok | PLANLANDI | 9 | Focus lifecycle ve optimistic update |
| Chat | `Chat_GetAnnouncement` | `GET /api/v1/chat/{campId}/announcement` | Kamp duyurusu | Akış yok | PLANLANDI | 9 | Empty, success ve permission testi |
| Chat | `Chat_UpdateAnnouncement` | `PUT /api/v1/chat/{campId}/announcement` | Duyuru oluştur/güncelle | Akış yok | PLANLANDI | 9 | Organizer yetkisi ve SignalR testi |
| Chat | `Chat_DeleteAnnouncement` | `DELETE /api/v1/chat/{campId}/announcement` | Duyuru sil | Akış yok | PLANLANDI | 9 | Confirmation, yetki ve realtime testi |

## Content reports — 2 operasyon

| Domain | OperationId | Method ve path | Mobil ekran/akış | Mevcut entegrasyon | Durum | Hedef faz | Gerekli doğrulama |
|---|---|---|---|---|---|---:|---|
| ContentReport | `ContentReport_Create` | `POST /api/v1/reports` | İçerik/kullanıcı raporlama sheet’i | Akış yok | PLANLANDI | 8 | Target types, validation ve idempotency |
| ContentReport | `ContentReport_GetMine` | `GET /api/v1/reports/me` | Kullanıcının raporları | Ekran ve entegrasyon yok | PLANLANDI | 8 | Pagination, status ve empty-state testi |

## Legal — 1 operasyon

| Domain | OperationId | Method ve path | Mobil ekran/akış | Mevcut entegrasyon | Durum | Hedef faz | Gerekli doğrulama |
|---|---|---|---|---|---|---:|---|
| Legal | `Legal_GetCurrentDocuments` | `GET /api/v1/legal/documents/current` | Kayıt öncesi koşullar ve gizlilik | Entegrasyon yok | PLANLANDI | 4 | Document version ve register E2E |

## Metadata — 2 operasyon

| Domain | OperationId | Method ve path | Mobil ekran/akış | Mevcut entegrasyon | Durum | Hedef faz | Gerekli doğrulama |
|---|---|---|---|---|---|---:|---|
| Metadata | `Metadata_GetCampMetadata` | `GET /api/v1/metadata/camps` | Kamp filtreleri ve formları | Sabit mobil listeleri kullanılıyor | PLANLANDI | 5, 6, 7 | Cache ve enum mapping testi |
| Metadata | `Metadata_GetPlatformMetadata` | `GET /api/v1/metadata/platform` | Bildirim ve rapor metadata’sı | Entegrasyon yok | PLANLANDI | 8, 10 | Cache ve enum mapping testi |

## Notifications — 8 operasyon

| Domain | OperationId | Method ve path | Mobil ekran/akış | Mevcut entegrasyon | Durum | Hedef faz | Gerekli doğrulama |
|---|---|---|---|---|---|---:|---|
| Notification | `Notification_GetMyNotifications` | `GET /api/v1/notification` | `NotificationsScreen.jsx` | `notificationService.getNotifications`; pagination eksik | MOBİLDE VAR — LEGACY | 1, 10 | Pagination ve async-state testleri |
| Notification | `Notification_MarkAsRead` | `POST /api/v1/notification/{notificationId}/read` | Bildirime dokunma | `notificationService.markAsRead` | MOBİLDE VAR — LEGACY | 1, 10 | Optimistic update, rollback ve routing |
| Notification | `Notification_GetUnreadCount` | `GET /api/v1/notification/unread-count` | Ana ekran badge’i | `notificationService.getUnreadCount` | MOBİLDE VAR — LEGACY | 1, 10 | Badge/backend consistency testi |
| Notification | `Notification_ReadAll` | `POST /api/v1/notification/read-all` | Tümünü okundu işaretle | `notificationService.readAllNotifications` | MOBİLDE VAR — LEGACY | 1, 10 | Optimistic update ve rollback |
| Notification | `Notification_GetMyPreferences` | `GET /api/v1/notification/preferences` | Bildirim tercihleri | Ekran ve entegrasyon yok | PLANLANDI | 10 | Query, default ve error-state testi |
| Notification | `Notification_UpdateMyPreference` | `PUT /api/v1/notification/preferences` | Bildirim tercihi güncelle | Akış yok | PLANLANDI | 10 | Toggle mutation ve rollback |
| Notification | `Notification_RegisterPushDevice` | `POST /api/v1/notification/push-subscriptions` | Cihaz push kaydı | Push altyapısı yok | PLANLANDI | 10 | Android/iOS gerçek cihaz E2E |
| Notification | `Notification_DeactivatePushDevice` | `DELETE /api/v1/notification/push-subscriptions/{subscriptionId}` | Logout/hesap kapatmada cihazı kaldır | Akış yok | PLANLANDI | 10, 11 | Logout, reinstall ve user-change E2E |

## Upload — 1 operasyon

| Domain | OperationId | Method ve path | Mobil ekran/akış | Mevcut entegrasyon | Durum | Hedef faz | Gerekli doğrulama |
|---|---|---|---|---|---|---:|---|
| Upload | `Upload_UploadImage` | `POST /api/v1/upload` | Profil ve kamp görsel seçicileri | `uploadService.uploadImage` / legacy Axios | MOBİLDE VAR — LEGACY | 1, 6, 9, 11 | MIME, boyut, progress, retry ve cancellation |

## User and account — 11 operasyon

| Domain | OperationId | Method ve path | Mobil ekran/akış | Mevcut entegrasyon | Durum | Hedef faz | Gerekli doğrulama |
|---|---|---|---|---|---|---:|---|
| User | `User_GetMyProfile` | `GET /api/v1/user/me` | `ProfileScreen.jsx`, `EditProfileScreen.jsx` | `userService.getMyProfile` | MOBİLDE VAR — LEGACY | 1, 11 | Profile query ve nullable-field testi |
| User | `User_UpdateProfile` | `PUT /api/v1/user/me` | `EditProfileScreen.jsx` | `userService.updateProfile`; concurrency eksik | MOBİLDE VAR — LEGACY | 1, 11 | Validation ve 409 conflict testi |
| User | `User_DeactivateAccount` | `DELETE /api/v1/user/me` | Hesap deaktivasyonu | Akış yok | PLANLANDI | 11 | Password confirmation ve cleanup E2E |
| User | `User_ChangePassword` | `PUT /api/v1/user/me/password` | Şifre değiştir | Akış yok | PLANLANDI | 11 | Wrong-password, validation ve success |
| User | `User_RequestDataExport` | `POST /api/v1/user/me/data-export` | Veri dışa aktarımı talebi | Akış yok | PLANLANDI | 11 | Request ve tekrarlı talep testi |
| User | `User_GetLatestDataExport` | `GET /api/v1/user/me/data-export` | Export durum takibi | Akış yok | PLANLANDI | 11 | Pending, completed ve failed durumları |
| User | `User_DownloadDataExport` | `GET /api/v1/user/me/data-export/{requestId}/download` | Export indir/paylaş | Akış yok | PLANLANDI | 11 | Yetki, güvenli indirme ve paylaşım E2E |
| User | `User_RequestAccountDeletion` | `POST /api/v1/user/me/deletion-request` | Kalıcı hesap silme talebi | Akış yok | PLANLANDI | 11 | Confirmation, bekleme süresi ve cleanup |
| User | `User_GetUserProfile` | `GET /api/v1/user/{userId}` | `UserProfileScreen.jsx` | `userProfileService.getUserProfile` | MOBİLDE VAR — LEGACY | 1, 11 | Public profile ve nullable-field testi |
| User | `User_GetUserCreatedCamps` | `GET /api/v1/user/{userId}/created-camps` | `UserCreatedCampsScreen.jsx` | `userProfileService.getUserCreatedCamps`; pagination eksik | MOBİLDE VAR — LEGACY | 1, 11 | Pagination ve empty-state testi |
| User | `User_GetUserJoinedCamps` | `GET /api/v1/user/{userId}/joined-camps` | `UserJoinedCampsScreen.jsx` | `userProfileService.getUserJoinedCamps`; pagination eksik | MOBİLDE VAR — LEGACY | 1, 11 | Pagination ve visibility testi |

## User blocking — 3 operasyon

| Domain | OperationId | Method ve path | Mobil ekran/akış | Mevcut entegrasyon | Durum | Hedef faz | Gerekli doğrulama |
|---|---|---|---|---|---|---:|---|
| UserBlock | `UserBlock_Block` | `POST /api/v1/user/{userId}/block` | Kullanıcı engelle | Akış yok | PLANLANDI | 8 | Cache temizliği, içerik ve chat testi |
| UserBlock | `UserBlock_Unblock` | `DELETE /api/v1/user/{userId}/block` | Kullanıcı engelini kaldır | Akış yok | PLANLANDI | 8 | Mutation ve cache invalidation testi |
| UserBlock | `UserBlock_GetBlockedUsers` | `GET /api/v1/user/blocked` | Engellenen kullanıcılar | Ekran ve entegrasyon yok | PLANLANDI | 8 | Pagination ve async-state testleri |

## Admin — bilinçli kapsam dışı 9 operasyon

| Domain | OperationId | Method ve path | Mobil ekran/akış | Mevcut entegrasyon | Durum | Hedef faz | Gerekli doğrulama |
|---|---|---|---|---|---|---:|---|
| AdminAudit | `AdminAudit_GetLogs` | `GET /api/v1/admin/audit-logs` | Consumer mobilde olmayacak | Yok | BİLİNÇLİ KAPSAM DIŞI | — | Ayrı admin istemcisi |
| AdminAudit | `AdminAudit_GetArchives` | `GET /api/v1/admin/audit-logs/archives` | Consumer mobilde olmayacak | Yok | BİLİNÇLİ KAPSAM DIŞI | — | Ayrı admin istemcisi |
| AdminContentReport | `AdminContentReport_GetAll` | `GET /api/v1/admin/reports` | Consumer mobilde olmayacak | Yok | BİLİNÇLİ KAPSAM DIŞI | — | Ayrı admin istemcisi |
| AdminContentReport | `AdminContentReport_GetById` | `GET /api/v1/admin/reports/{reportId}` | Consumer mobilde olmayacak | Yok | BİLİNÇLİ KAPSAM DIŞI | — | Ayrı admin istemcisi |
| AdminContentReport | `AdminContentReport_GetActionHistory` | `GET /api/v1/admin/reports/{reportId}/actions` | Consumer mobilde olmayacak | Yok | BİLİNÇLİ KAPSAM DIŞI | — | Ayrı admin istemcisi |
| AdminContentReport | `AdminContentReport_ApplyAction` | `POST /api/v1/admin/reports/{reportId}/actions` | Consumer mobilde olmayacak | Yok | BİLİNÇLİ KAPSAM DIŞI | — | Ayrı admin istemcisi |
| AdminContentReport | `AdminContentReport_Review` | `PATCH /api/v1/admin/reports/{reportId}/status` | Consumer mobilde olmayacak | Yok | BİLİNÇLİ KAPSAM DIŞI | — | Ayrı admin istemcisi |
| AdminContentReport | `AdminContentReport_GetStatusHistory` | `GET /api/v1/admin/reports/{reportId}/status-history` | Consumer mobilde olmayacak | Yok | BİLİNÇLİ KAPSAM DIŞI | — | Ayrı admin istemcisi |
| AdminModerationAction | `AdminModerationAction_Reverse` | `POST /api/v1/admin/moderation-actions/{actionId}/reverse` | Consumer mobilde olmayacak | Yok | BİLİNÇLİ KAPSAM DIŞI | — | Ayrı admin istemcisi |

# Backend contract boşlukları

Aşağıdaki Faz 7 ürün akışları mevcut OpenAPI sözleşmesindeki 101 operasyon
arasında bulunmamaktadır:

1. Kullanıcının kendisine gönderilen davetleri listeleme.
2. Daveti kabul etme.
3. Daveti reddetme.
4. Organizer tarafından gönderilmiş daveti geri çekme/revoke etme.

Bu akışlar mobilde varsayımsal URL kullanılarak geliştirilmeyecektir. Faz 7
başlamadan önce backend davranışı ve OpenAPI operasyonları netleştirilmeli,
contract yeniden senkronize edilmeli ve bu matris güncellenmelidir.

# Faz bazlı sahiplik

| Faz | Operasyon kapsamı |
|---:|---|
| 1 | Generated API client, session, refresh, hata modeli ve bütün legacy çağrıların taşınması |
| 4 | Authentication, legal belgeler, doğrulama, şifre sıfırlama ve reaktivasyon |
| 5 | Camp discovery, detay, favorite ve camp metadata |
| 6 | Camp create, draft, publish, update, lifecycle ve görseller |
| 7 | Join request, invitation, participant, ownership ve attendance |
| 8 | Comment, rating, review, report ve user blocking |
| 9 | Cursor chat, SignalR, mesaj yaşam döngüsü, unread ve announcement |
| 10 | Notification listesi, preferences, push registration ve deep link |
| 11 | Profile, password, sessions, export, deactivation ve deletion |

# Sayısal kabul kriterleri

- [ ] Sözleşmedeki toplam operasyon sayısı `101`.
- [ ] Consumer mobil kapsamındaki operasyon sayısı `92`.
- [ ] Bilinçli kapsam dışı admin operasyonu sayısı `9`.
- [ ] `MOBİLDE VAR — LEGACY` operasyon sayısı `30`.
- [ ] `PLANLANDI` consumer operasyon sayısı `62`.
- [ ] Her backend operasyonu tabloda tam bir kez bulunuyor.
- [ ] Her consumer operasyonunun hedef fazı ve gerekli doğrulaması yazıyor.
- [ ] Admin operasyonlarının tamamı bilinçli kapsam dışı işaretli.
- [ ] Generated client varlığı, tamamlanmış mobil entegrasyon olarak sayılmıyor.