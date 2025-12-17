#  Quenote

> **Birlikte Çalış, Öğren ve Yarış!**
> Quenote, kullanıcıların ortak çalışma alanlarında notlarını paylaşabildiği, paylaşılan notlar üzerinden quizler oluşturup bilgi seviyelerini test edebildiği ve skorlarını görüntüleyebildiği interaktif bir öğrenme platformudur.

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
---

##  Özellikler

Proje temel olarak şu yetenekleri sunar:

* **Çalışma Alanları (Workspaces):** Kullanıcılar belirli bir konuya veya derse odaklanmış çalışma alanları oluşturabilir veya mevcut alanlara katılabilir.
* **Not Paylaşımı:** Hem kişisel notlarınızı tutabilir hem de çalışma alanındaki diğer kullanıcıların yüklediği notlara erişebilirsiniz.
* **Quiz Modülü:** Yüklenen notlar üzerinden otomatik veya manuel quizler oluşturarak kendinizi test edebilirsiniz.
* **Skor Görüntüleme:** Quiz sonuçlarını görüntüleyebilir kaç soru doğru kaç soru yanlış yaptığını öğrenebilir.

---

## Ekran Videosu



---

##  Kurulum

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin.

### Gereksinimler
* Node.js (v14 veya üzeri)
* npm
* MongoDB
* Git

### Adım Adım Kurulum

1.  **Projeyi Klonlayın:**
    ```bash
    git clone https://github.com/sdadak42/halfbyte-hackathon.git
    cd halfbyte-hackathon
    ```

2.  **Backend Bağımlılıklarını Yükleyin:**
    ```bash
    cd server
    npm install
    ```

3.  **Ortam Değişkenlerini Ayarlayın:**
    `server` klasöründe `.env` dosyası oluşturun ve aşağıdaki değişkenleri ekleyin:
    ```
    JWT_SECRET=your_secret_key_here
    MONGODB_URI=mongodb://localhost:27017/quenote
    ```

4.  **MongoDB'yi Başlatın:**
    MongoDB'nin sisteminizde çalıştığından emin olun. (Örneğin, `mongod` komutu ile başlatın.)

5.  **Backend Sunucusunu Başlatın:**
    ```bash
    npm start
    ```
    Sunucu `http://localhost:5000` adresinde çalışacaktır.

6.  **Frontend'i Açın:**
    Tarayıcınızda `hackathon_trial/HalfByte/` klasöründeki HTML dosyalarını açın (örneğin, `main.html` veya `workspace_page.html`). Uygulama backend API'sine bağlanacaktır.

---

##  Kullanım

1.  Uygulamayı açın ve kayıt olun.
2.  Ana sayfadan "Yeni Çalışma Alanı Oluştur" butonuna tıklayın veya bir davet kodu ile mevcut bir alana katılın.
3.  "Notlar" sekmesinden ilk ders notunuzu PDF veya metin olarak yükleyin.
4.  "Quiz Oluştur" diyerek sistemin notlarınızdan soru üretmesini sağlayın.

---

##  Katkıda Bulunmak (Contributing)

Katkılarınızı bekliyoruz! Lütfen önce bir `issue` açarak yapmak istediğiniz değişikliği tartışın.

1.  Bu repoyu Fork'layın.
2.  Yeni bir feature branch oluşturun (`git checkout -b feature/yeni-ozellik`).
3.  Değişikliklerinizi commit'leyin (`git commit -m 'Yeni özellik eklendi'`).
4.  Branch'inizi push'layın (`git push origin feature/yeni-ozellik`).
5.  Bir Pull Request (PR) oluşturun.

---

##  Yazarlar

* **Seyda Dadak** - *Leader & System Design* - [Github](https://github.com/sdadak42)
* **Merve Salman** - *Backend & System Design* - [Github](https://github.com/mesalmann)
* **Aleyna Say** - *Frontend* - [Github](https://github.com/lenas3)
* **Zeynep Sıla Durak** - *Backend & Database* - [Github](https://github.com/zeynepsiladurak)