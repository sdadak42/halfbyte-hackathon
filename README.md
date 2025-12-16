# halfbyte-hackathon

# HalfByte Hackathon Backend

Bu proje; kullanıcıların çalışma alanları (workspaces) oluşturmasına, not tutmasına ve interaktif quizler çözmesine olanak tanıyan bir eğitim platformunun backend servisidir.

---

## Proje Yapısı

Projenin modüler ve okunabilir olması için **Katmanlı Mimari** kullanılmıştır. Dosya hiyerarşisi şu şekildedir:

```text
src/
├──  config/         # Veritabanı yapılandırması ve çevresel ayarlar
├──  controllers/    # HTTP isteklerini yöneten mantık (Request/Response)
├──  middlewares/    # Auth (JWT) ve Güvenlik katmanları
├──  models/         # Veritabanı şemaları (Mongoose/Sequelize)
├──  routes/         # API uç noktaları (Endpoints)
├──  services/       # İş mantığı (Business Logic) ve hesaplamalar
├──  utils/          # Helper fonksiyonlar ve sabitler
└──  app.js           # Uygulama ana giriş noktası