# Proje medya klasörü

Her projenin foto/videosu kendi klasörüne gider. Klasör adı = `project-data.js`
içindeki **anahtar** (GitHub repo adının küçük harfli hali).

## Yapı

```
assets/projects/
├── inventorysystem/
│   ├── demo.mp4      ← video (opsiyonel)
│   ├── 1.jpg         ← ekran görüntüleri
│   └── 2.jpg
├── locomationsystem/
│   └── ...
└── vanguardarena/
    └── ...
```

## Adımlar

1. Klasörü oluştur (yoksa): `assets/projects/<repo-adı-küçük>/`
2. Dosyaları içine koy: `demo.mp4`, `1.jpg`, `2.jpg` ...
3. `project-data.js`'te ilgili projede yolları yaz:
   ```js
   video:   "assets/projects/inventorysystem/demo.mp4",
   gallery: ["assets/projects/inventorysystem/1.jpg",
             "assets/projects/inventorysystem/2.jpg"],
   ```
4. Commit + push et — site otomatik güncellenir.

> Video/galeri boş bırakılırsa detay sayfasında hiçbir şey görünmez
> (kırık görsel olmaz). Dosya yolu yazılı ama dosya yoksa, o noktada
> nereye ne koyacağını gösteren bir placeholder belirir.

## Önerilen boyutlar
- **Video:** H.264 .mp4, 1280×720 veya 1920×1080, ~30 MB altı
- **Foto:** .jpg / .webp, genişlik ~1200 px
