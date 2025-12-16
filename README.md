# halfbyte-hackathon

/src
  ├── config/             # Veritabanı bağlantısı vb.
  ├── controllers/        # workspaceController.js, quizController.js
  ├── middlewares/        # authMiddleware.js (Giriş yapılmış mı kontrolü)
  ├── models/             # User.js, Workspace.js, Note.js, Quiz.js
  ├── routes/             # apiRoutes.js veya modül bazlı rotalar
  ├── services/           # quizService.js (Karmaşık mantıklar buraya)
  ├── utils/              # Ortak yardımcı fonksiyonlar
  └── app.js              # Uygulama giriş noktası
.env                      # Gizli anahtarlar (DB_URL, JWT_SECRET)
package.json