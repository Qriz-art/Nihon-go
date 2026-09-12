// Data kosakata bahasa Jepang
// Format tuple: [jepang, furigana, romaji, arti, kategori, level, contohJp, contohId]

const rows = [
  // ================= SALAM =================
  ["おはようございます", "", "ohayou gozaimasu", "selamat pagi", "Salam", 1, "おはようございます、先生。", "Selamat pagi, Guru."],
  ["こんにちは", "", "konnichiwa", "selamat siang", "Salam", 1, "こんにちは、田中さん。", "Selamat siang, Tanaka."],
  ["こんばんは", "", "konbanwa", "selamat malam", "Salam", 1, "こんばんは、いい夜ですね。", "Selamat malam, malam yang indah ya."],
  ["さようなら", "", "sayounara", "selamat tinggal", "Salam", 1, "さようなら、また明日。", "Selamat tinggal, sampai besok."],
  ["ありがとうございます", "", "arigatou gozaimasu", "terima kasih", "Salam", 1, "本当にありがとうございます。", "Terima kasih banyak."],
  ["すみません", "", "sumimasen", "permisi / maaf", "Salam", 1, "すみません、トイレはどこですか。", "Permisi, di mana toilet?"],
  ["おやすみなさい", "", "oyasuminasai", "selamat tidur", "Salam", 1, "おやすみなさい、また明日。", "Selamat tidur, sampai besok."],
  ["いってきます", "", "ittekimasu", "saya pergi dulu", "Salam", 1, "いってきます、お母さん。", "Aku pergi dulu, Ibu."],
  ["ただいま", "", "tadaima", "saya sudah pulang", "Salam", 1, "ただいま、お母さん。", "Aku pulang, Bu."],

  // ================= PERKENALAN =================
  ["私", "わたし", "watashi", "saya", "Perkenalan", 1, "私はインドネシア人です。", "Saya orang Indonesia."],
  ["名前", "なまえ", "namae", "nama", "Perkenalan", 1, "お名前は何ですか。", "Siapa nama Anda?"],
  ["初めまして", "はじめまして", "hajimemashite", "senang berkenalan", "Perkenalan", 1, "初めまして、アニタです。", "Senang berkenalan, saya Anita."],
  ["学生", "がくせい", "gakusei", "pelajar / mahasiswa", "Perkenalan", 1, "私は大学の学生です。", "Saya mahasiswa universitas."],
  ["先生", "せんせい", "sensei", "guru", "Perkenalan", 1, "あの人は日本語の先生です。", "Orang itu guru bahasa Jepang."],
  ["どうぞよろしく", "", "douzo yoroshiku", "mohon bantuannya", "Perkenalan", 1, "どうぞよろしくお願いします。", "Mohon bantuannya ke depannya."],

  // ================= ANGKA =================
  ["一", "いち", "ichi", "satu", "Angka", 1, "一から十まで数えます。", "Berhitung dari satu sampai sepuluh."],
  ["二", "に", "ni", "dua", "Angka", 1, "二時に会いましょう。", "Mari bertemu pukul dua."],
  ["三", "さん", "san", "tiga", "Angka", 1, "三人家族です。", "Keluarga kami tiga orang."],
  ["四", "よん", "yon", "empat", "Angka", 1, "教室に四人います。", "Ada empat orang di kelas."],
  ["五", "ご", "go", "lima", "Angka", 1, "五分待ってください。", "Tolong tunggu lima menit."],
  ["十", "じゅう", "juu", "sepuluh", "Angka", 1, "十時に始まります。", "Mulai pukul sepuluh."],
  ["百", "ひゃく", "hyaku", "seratus", "Angka", 1, "これは百円です。", "Ini seratus yen."],
  ["千", "せん", "sen", "seribu", "Angka", 1, "千円札をください。", "Tolong beri uang seribu yen."],
  ["万", "まん", "man", "sepuluh ribu", "Angka", 1, "一万円を払いました。", "Saya membayar sepuluh ribu yen."],

  // ================= WAKTU =================
  ["今", "いま", "ima", "sekarang", "Waktu", 1, "今、何時ですか。", "Sekarang jam berapa?"],
  ["時間", "じかん", "jikan", "waktu / jam", "Waktu", 1, "時間がありません。", "Tidak ada waktu."],
  ["分", "ふん", "fun", "menit", "Waktu", 1, "十分歩きます。", "Berjalan sepuluh menit."],
  ["今日", "きょう", "kyou", "hari ini", "Waktu", 1, "今日は暑いですね。", "Hari ini panas ya."],
  ["明日", "あした", "ashita", "besok", "Waktu", 1, "明日学校へ行きます。", "Besok saya pergi ke sekolah."],
  ["昨日", "きのう", "kinou", "kemarin", "Waktu", 1, "昨日映画を見ました。", "Kemarin saya menonton film."],
  ["朝", "あさ", "asa", "pagi", "Waktu", 1, "朝ごはんを食べます。", "Saya makan sarapan."],
  ["夜", "よる", "yoru", "malam", "Waktu", 1, "夜は静かです。", "Malam itu tenang."],

  // ================= HARI DAN BULAN =================
  ["月曜日", "げつようび", "getsuyoubi", "hari Senin", "Hari dan Bulan", 1, "月曜日に会議があります。", "Ada rapat pada hari Senin."],
  ["金曜日", "きんようび", "kinyoubi", "hari Jumat", "Hari dan Bulan", 1, "金曜日は好きです。", "Saya suka hari Jumat."],
  ["日曜日", "にちようび", "nichiyoubi", "hari Minggu", "Hari dan Bulan", 1, "日曜日は休みです。", "Hari Minggu libur."],
  ["一月", "いちがつ", "ichigatsu", "Januari", "Hari dan Bulan", 1, "一月は寒いです。", "Januari dingin."],
  ["四月", "しがつ", "shigatsu", "April", "Hari dan Bulan", 1, "四月に日本へ行きます。", "April saya pergi ke Jepang."],
  ["今週", "こんしゅう", "konshuu", "minggu ini", "Hari dan Bulan", 1, "今週は忙しいです。", "Minggu ini sibuk."],

  // ================= KELUARGA =================
  ["家族", "かぞく", "kazoku", "keluarga", "Keluarga", 1, "家族は五人です。", "Keluarga saya lima orang."],
  ["母", "はは", "haha", "ibu (sendiri)", "Keluarga", 1, "母は先生です。", "Ibu saya guru."],
  ["父", "ちち", "chichi", "ayah (sendiri)", "Keluarga", 1, "父は会社員です。", "Ayah saya pegawai kantor."],
  ["兄", "あに", "ani", "kakak laki-laki", "Keluarga", 1, "兄は大学生です。", "Kakak saya mahasiswa."],
  ["姉", "あね", "ane", "kakak perempuan", "Keluarga", 1, "姉は看護師です。", "Kakak saya perawat."],
  ["妹", "いもうと", "imouto", "adik perempuan", "Keluarga", 1, "妹は中学生です。", "Adik saya siswa SMP."],
  ["子供", "こども", "kodomo", "anak", "Keluarga", 1, "子供が二人います。", "Saya punya dua anak."],
  ["お母さん", "おかあさん", "okaasan", "ibu (orang lain)", "Keluarga", 2, "田中さんのお母さんは優しいです。", "Ibu Tanaka baik."],

  // ================= SEKOLAH =================
  ["学校", "がっこう", "gakkou", "sekolah", "Sekolah", 1, "学校は駅の近くです。", "Sekolah dekat stasiun."],
  ["教室", "きょうしつ", "kyoushitsu", "ruang kelas", "Sekolah", 1, "教室に誰もいません。", "Tidak ada orang di kelas."],
  ["図書館", "としょかん", "toshokan", "perpustakaan", "Sekolah", 1, "図書館で勉強します。", "Saya belajar di perpustakaan."],
  ["宿題", "しゅくだい", "shukudai", "pekerjaan rumah", "Sekolah", 1, "宿題がたくさんあります。", "PR-nya banyak."],
  ["勉強", "べんきょう", "benkyou", "belajar", "Sekolah", 1, "毎日日本語を勉強します。", "Setiap hari saya belajar bahasa Jepang."],
  ["試験", "しけん", "shiken", "ujian", "Sekolah", 2, "明日試験があります。", "Besok ada ujian."],
  ["鉛筆", "えんぴつ", "enpitsu", "pensil", "Sekolah", 1, "鉛筆で書いてください。", "Tolong tulis dengan pensil."],

  // ================= RUMAH =================
  ["家", "いえ", "ie", "rumah", "Rumah", 1, "家に帰ります。", "Saya pulang ke rumah."],
  ["部屋", "へや", "heya", "kamar", "Rumah", 1, "私の部屋は狭いです。", "Kamar saya sempit."],
  ["台所", "だいどころ", "daidokoro", "dapur", "Rumah", 1, "台所で料理します。", "Saya memasak di dapur."],
  ["風呂", "ふろ", "furo", "kamar mandi / mandi", "Rumah", 1, "毎晩風呂に入ります。", "Setiap malam saya mandi."],
  ["窓", "まど", "mado", "jendela", "Rumah", 1, "窓を開けてください。", "Tolong buka jendela."],
  ["机", "つくえ", "tsukue", "meja", "Rumah", 1, "机の上に本があります。", "Ada buku di atas meja."],
  ["冷蔵庫", "れいぞうこ", "reizouko", "kulkas", "Rumah", 2, "冷蔵庫に牛乳があります。", "Ada susu di kulkas."],

  // ================= MAKANAN =================
  ["ご飯", "ごはん", "gohan", "nasi / makan", "Makanan", 1, "ご飯を食べましょう。", "Mari makan."],
  ["パン", "", "pan", "roti", "Makanan", 1, "朝はパンを食べます。", "Pagi saya makan roti."],
  ["魚", "さかな", "sakana", "ikan", "Makanan", 1, "魚が好きです。", "Saya suka ikan."],
  ["肉", "にく", "niku", "daging", "Makanan", 1, "肉を買いに行きます。", "Saya pergi membeli daging."],
  ["卵", "たまご", "tamago", "telur", "Makanan", 1, "卵を二つください。", "Tolong dua butir telur."],
  ["野菜", "やさい", "yasai", "sayur", "Makanan", 1, "野菜をたくさん食べます。", "Saya banyak makan sayur."],
  ["果物", "くだもの", "kudamono", "buah", "Makanan", 2, "果物は体にいいです。", "Buah baik untuk tubuh."],
  ["寿司", "すし", "sushi", "sushi", "Makanan", 1, "寿司を食べたいです。", "Saya ingin makan sushi."],
  ["ラーメン", "", "raamen", "ramen", "Makanan", 1, "ラーメンはおいしいです。", "Ramen itu enak."],

  // ================= MINUMAN =================
  ["水", "みず", "mizu", "air", "Minuman", 1, "水を一杯ください。", "Tolong satu gelas air."],
  ["お茶", "おちゃ", "ocha", "teh", "Minuman", 1, "お茶を飲みますか。", "Apakah Anda minum teh?"],
  ["コーヒー", "", "koohii", "kopi", "Minuman", 1, "毎朝コーヒーを飲みます。", "Setiap pagi saya minum kopi."],
  ["牛乳", "ぎゅうにゅう", "gyuunyuu", "susu sapi", "Minuman", 1, "牛乳は冷たいです。", "Susunya dingin."],
  ["ジュース", "", "juusu", "jus", "Minuman", 1, "オレンジジュースが好きです。", "Saya suka jus jeruk."],
  ["ビール", "", "biiru", "bir", "Minuman", 2, "ビールはちょっと苦いです。", "Bir sedikit pahit."],

  // ================= BELANJA =================
  ["買い物", "かいもの", "kaimono", "belanja", "Belanja", 1, "デパートで買い物をします。", "Saya belanja di department store."],
  ["お金", "おかね", "okane", "uang", "Belanja", 1, "お金が足りません。", "Uangnya tidak cukup."],
  ["値段", "ねだん", "nedan", "harga", "Belanja", 2, "この値段は高いです。", "Harga ini mahal."],
  ["安い", "やすい", "yasui", "murah", "Belanja", 1, "この店は安いです。", "Toko ini murah."],
  ["高い", "たかい", "takai", "mahal / tinggi", "Belanja", 1, "そのかばんは高いです。", "Tas itu mahal."],
  ["レジ", "", "reji", "kasir", "Belanja", 1, "レジはあちらです。", "Kasirnya di sebelah sana."],

  // ================= TRANSPORTASI =================
  ["電車", "でんしゃ", "densha", "kereta", "Transportasi", 1, "電車で学校へ行きます。", "Saya pergi ke sekolah naik kereta."],
  ["バス", "", "basu", "bus", "Transportasi", 1, "バスを待っています。", "Saya sedang menunggu bus."],
  ["自転車", "じてんしゃ", "jitensha", "sepeda", "Transportasi", 1, "自転車で行きましょう。", "Mari pergi naik sepeda."],
  ["車", "くるま", "kuruma", "mobil", "Transportasi", 1, "父の車は白いです。", "Mobil ayah putih."],
  ["飛行機", "ひこうき", "hikouki", "pesawat", "Transportasi", 1, "飛行機で日本へ行きます。", "Saya pergi ke Jepang naik pesawat."],
  ["切符", "きっぷ", "kippu", "tiket", "Transportasi", 2, "切符を買いました。", "Saya sudah membeli tiket."],

  // ================= TEMPAT =================
  ["駅", "えき", "eki", "stasiun", "Tempat", 1, "駅まで歩きます。", "Saya berjalan sampai stasiun."],
  ["病院", "びょういん", "byouin", "rumah sakit", "Tempat", 1, "病院は静かです。", "Rumah sakit itu tenang."],
  ["店", "みせ", "mise", "toko", "Tempat", 1, "あの店は有名です。", "Toko itu terkenal."],
  ["公園", "こうえん", "kouen", "taman", "Tempat", 1, "公園で遊びます。", "Bermain di taman."],
  ["銀行", "ぎんこう", "ginkou", "bank", "Tempat", 1, "銀行は九時に開きます。", "Bank buka pukul sembilan."],
  ["空港", "くうこう", "kuukou", "bandara", "Tempat", 2, "空港まで迎えに行きます。", "Saya menjemput ke bandara."],

  // ================= CUACA =================
  ["天気", "てんき", "tenki", "cuaca", "Cuaca", 1, "今日はいい天気です。", "Hari ini cuacanya bagus."],
  ["雨", "あめ", "ame", "hujan", "Cuaca", 1, "雨が降っています。", "Sedang hujan."],
  ["雪", "ゆき", "yuki", "salju", "Cuaca", 1, "冬は雪が降ります。", "Musim dingin turun salju."],
  ["暑い", "あつい", "atsui", "panas", "Cuaca", 1, "夏はとても暑いです。", "Musim panas sangat panas."],
  ["寒い", "さむい", "samui", "dingin", "Cuaca", 1, "今日は寒いですね。", "Hari ini dingin ya."],
  ["晴れ", "はれ", "hare", "cerah", "Cuaca", 2, "明日は晴れでしょう。", "Besok kemungkinan cerah."],
  ["傘", "かさ", "kasa", "payung", "Cuaca", 1, "傘を持って行きます。", "Saya membawa payung."],

  // ================= PERASAAN =================
  ["嬉しい", "うれしい", "ureshii", "senang", "Perasaan", 2, "会えて嬉しいです。", "Saya senang bisa bertemu."],
  ["悲しい", "かなしい", "kanashii", "sedih", "Perasaan", 2, "その話は悲しいです。", "Cerita itu sedih."],
  ["楽しい", "たのしい", "tanoshii", "menyenangkan", "Perasaan", 1, "パーティーは楽しいです。", "Pestanya menyenangkan."],
  ["元気", "げんき", "genki", "sehat / bersemangat", "Perasaan", 1, "お元気ですか。", "Apa kabar?"],
  ["心配", "しんぱい", "shinpai", "khawatir", "Perasaan", 2, "心配しないでください。", "Jangan khawatir."],
  ["疲れた", "つかれた", "tsukareta", "lelah", "Perasaan", 1, "今日は疲れました。", "Hari ini saya lelah."],

  // ================= AKTIVITAS SEHARI-HARI =================
  ["起きる", "おきる", "okiru", "bangun", "Aktivitas Sehari-hari", 1, "毎朝六時に起きます。", "Setiap pagi saya bangun pukul enam."],
  ["寝る", "ねる", "neru", "tidur", "Aktivitas Sehari-hari", 1, "十一時に寝ます。", "Saya tidur pukul sebelas."],
  ["食べる", "たべる", "taberu", "makan", "Aktivitas Sehari-hari", 1, "昼ご飯を食べます。", "Saya makan siang."],
  ["飲む", "のむ", "nomu", "minum", "Aktivitas Sehari-hari", 1, "お茶を飲みます。", "Saya minum teh."],
  ["行く", "いく", "iku", "pergi", "Aktivitas Sehari-hari", 1, "学校へ行きます。", "Saya pergi ke sekolah."],
  ["働く", "はたらく", "hataraku", "bekerja", "Aktivitas Sehari-hari", 1, "平日は働きます。", "Hari kerja saya bekerja."],
  ["掃除", "そうじ", "souji", "membersihkan", "Aktivitas Sehari-hari", 2, "部屋を掃除しました。", "Saya sudah membersihkan kamar."],

  // ================= KATA KERJA =================
  ["見る", "みる", "miru", "melihat / menonton", "Kata Kerja", 1, "テレビを見ます。", "Saya menonton TV."],
  ["聞く", "きく", "kiku", "mendengar / bertanya", "Kata Kerja", 1, "音楽を聞きます。", "Saya mendengarkan musik."],
  ["話す", "はなす", "hanasu", "berbicara", "Kata Kerja", 1, "日本語を話します。", "Saya berbicara bahasa Jepang."],
  ["読む", "よむ", "yomu", "membaca", "Kata Kerja", 1, "本を読みます。", "Saya membaca buku."],
  ["書く", "かく", "kaku", "menulis", "Kata Kerja", 1, "手紙を書きます。", "Saya menulis surat."],
  ["買う", "かう", "kau", "membeli", "Kata Kerja", 1, "パンを買います。", "Saya membeli roti."],
  ["待つ", "まつ", "matsu", "menunggu", "Kata Kerja", 1, "ここで待ってください。", "Tolong tunggu di sini."],
  ["使う", "つかう", "tsukau", "menggunakan", "Kata Kerja", 2, "この言葉を使ってください。", "Tolong gunakan kata ini."],

  // ================= KATA SIFAT =================
  ["大きい", "おおきい", "ookii", "besar", "Kata Sifat", 1, "大きい建物ですね。", "Gedungnya besar ya."],
  ["小さい", "ちいさい", "chiisai", "kecil", "Kata Sifat", 1, "小さいかばんです。", "Tasnya kecil."],
  ["新しい", "あたらしい", "atarashii", "baru", "Kata Sifat", 1, "新しい車を買いました。", "Saya membeli mobil baru."],
  ["古い", "ふるい", "furui", "lama / tua", "Kata Sifat", 1, "この寺は古いです。", "Kuil ini tua."],
  ["難しい", "むずかしい", "muzukashii", "sulit", "Kata Sifat", 1, "漢字は難しいです。", "Kanji itu sulit."],
  ["簡単", "かんたん", "kantan", "mudah (na-adj)", "Kata Sifat", 2, "この問題は簡単です。", "Soal ini mudah."],
  ["静か", "しずか", "shizuka", "tenang (na-adj)", "Kata Sifat", 1, "この町は静かです。", "Kota ini tenang."],
  ["便利", "べんり", "benri", "praktis (na-adj)", "Kata Sifat", 2, "スマホは便利です。", "Ponsel itu praktis."],
  ["好き", "すき", "suki", "suka (na-adj)", "Kata Sifat", 1, "日本の音楽が好きです。", "Saya suka musik Jepang."],

  // ================= PEKERJAAN =================
  ["医者", "いしゃ", "isha", "dokter", "Pekerjaan", 1, "兄は医者になりました。", "Kakak saya menjadi dokter."],
  ["会社員", "かいしゃいん", "kaishain", "pegawai perusahaan", "Pekerjaan", 1, "父は会社員です。", "Ayah saya pegawai perusahaan."],
  ["看護師", "かんごし", "kangoshi", "perawat", "Pekerjaan", 2, "姉は看護師です。", "Kakak saya perawat."],
  ["料理人", "りょうりにん", "ryourinin", "koki", "Pekerjaan", 2, "彼は料理人です。", "Dia seorang koki."],
  ["警官", "けいかん", "keikan", "polisi", "Pekerjaan", 2, "警官に道を聞きました。", "Saya bertanya jalan kepada polisi."],
  ["エンジニア", "", "enjinia", "insinyur", "Pekerjaan", 2, "私はエンジニアです。", "Saya seorang insinyur."],

  // ================= HOBI =================
  ["趣味", "しゅみ", "shumi", "hobi", "Hobi", 2, "趣味は何ですか。", "Apa hobi Anda?"],
  ["音楽", "おんがく", "ongaku", "musik", "Hobi", 1, "音楽を聞くのが好きです。", "Saya suka mendengarkan musik."],
  ["映画", "えいが", "eiga", "film", "Hobi", 1, "週末に映画を見ます。", "Akhir pekan saya menonton film."],
  ["写真", "しゃしん", "shashin", "foto", "Hobi", 1, "写真を撮るのが趣味です。", "Hobi saya memotret."],
  ["旅行", "りょこう", "ryokou", "perjalanan", "Hobi", 2, "日本へ旅行したいです。", "Saya ingin berwisata ke Jepang."],
  ["読書", "どくしょ", "dokusho", "membaca buku", "Hobi", 2, "読書は楽しいです。", "Membaca buku itu menyenangkan."],

  // ================= TUBUH =================
  ["頭", "あたま", "atama", "kepala", "Tubuh", 1, "頭が痛いです。", "Kepala saya sakit."],
  ["目", "め", "me", "mata", "Tubuh", 1, "目が大きいですね。", "Matanya besar ya."],
  ["耳", "みみ", "mimi", "telinga", "Tubuh", 1, "耳が痛いです。", "Telinga saya sakit."],
  ["口", "くち", "kuchi", "mulut", "Tubuh", 1, "口を開けてください。", "Tolong buka mulut."],
  ["手", "て", "te", "tangan", "Tubuh", 1, "手を洗ってください。", "Tolong cuci tangan."],
  ["足", "あし", "ashi", "kaki", "Tubuh", 1, "足が長いです。", "Kakinya panjang."],

  // ================= ALAM =================
  ["山", "やま", "yama", "gunung", "Alam", 1, "富士山は高いです。", "Gunung Fuji tinggi."],
  ["海", "うみ", "umi", "laut", "Alam", 1, "海で泳ぎます。", "Berenang di laut."],
  ["川", "かわ", "kawa", "sungai", "Alam", 1, "川の水はきれいです。", "Air sungainya bersih."],
  ["空", "そら", "sora", "langit", "Alam", 1, "空が青いです。", "Langitnya biru."],
  ["木", "き", "ki", "pohon", "Alam", 1, "庭に木があります。", "Ada pohon di halaman."],
  ["花", "はな", "hana", "bunga", "Alam", 1, "桜の花がきれいです。", "Bunga sakura indah."],

  // ================= TAMBAHAN LEVEL DASAR =================
  ["出かける", "でかける", "dekakeru", "pergi keluar", "Aktivitas Sehari-hari", 2, "午後、買い物に出かけます。", "Sore ini saya pergi keluar untuk berbelanja."],
  ["掃除する", "そうじする", "souji suru", "membersihkan", "Aktivitas Sehari-hari", 2, "毎週部屋を掃除します。", "Saya membersihkan kamar setiap minggu."],
  ["洗濯する", "せんたくする", "sentaku suru", "mencuci pakaian", "Aktivitas Sehari-hari", 2, "今日は洗濯をします。", "Hari ini saya mencuci pakaian."],
  ["眠い", "ねむい", "nemui", "mengantuk", "Perasaan", 2, "昨日は寝不足で眠いです。", "Kemarin kurang tidur jadi mengantuk."],
  ["寂しい", "さびしい", "sabishii", "kesepian", "Perasaan", 2, "一人で寂しいです。", "Saya kesepian sendirian."],
  ["恥ずかしい", "はずかしい", "hazukashii", "malu", "Perasaan", 2, "みんなの前で話すのは恥ずかしいです。", "Berbicara di depan orang itu memalukan."],
  ["看護師", "かんごし", "kangoshi", "perawat", "Pekerjaan", 2, "姉は看護師です。", "Kakak saya seorang perawat."],
  ["料理人", "りょうりにん", "ryourinin", "koki", "Pekerjaan", 2, "彼は料理人になりたいです。", "Dia ingin menjadi koki."],
  ["楽器", "がっき", "gakki", "alat musik", "Hobi", 2, "ギターという楽器を習っています。", "Saya belajar alat musik bernama gitar."],
  ["怪我", "けが", "kega", "luka, cedera", "Tubuh", 2, "サッカーで怪我をしました。", "Saya cedera saat bermain sepak bola."],
  ["健康", "けんこう", "kenkou", "kesehatan", "Tubuh", 2, "健康のために毎日歩いています。", "Demi kesehatan saya berjalan setiap hari."],
  ["指輪", "ゆびわ", "yubiwa", "cincin", "Belanja", 2, "母に指輪を買いました。", "Saya membeli cincin untuk ibu."],

  // ================= KOSAKATA MENENGAH =================
  ["経験", "けいけん", "keiken", "pengalaman", "Kosakata Menengah", 3, "いい経験になりました。", "Menjadi pengalaman yang bagus."],
  ["約束", "やくそく", "yakusoku", "janji", "Kosakata Menengah", 3, "友達と約束があります。", "Saya ada janji dengan teman."],
  ["準備", "じゅんび", "junbi", "persiapan", "Kosakata Menengah", 3, "旅行の準備をしています。", "Saya sedang menyiapkan perjalanan."],
  ["生活", "せいかつ", "seikatsu", "kehidupan", "Kosakata Menengah", 3, "日本の生活に慣れました。", "Saya sudah terbiasa hidup di Jepang."],
  ["文化", "ぶんか", "bunka", "budaya", "Kosakata Menengah", 3, "日本の文化に興味があります。", "Saya tertarik pada budaya Jepang."],
  ["最近", "さいきん", "saikin", "akhir-akhir ini", "Kosakata Menengah", 3, "最近、運動しています。", "Akhir-akhir ini saya berolahraga."],
  ["将来", "しょうらい", "shourai", "masa depan", "Kosakata Menengah", 3, "将来、日本で働きたいです。", "Di masa depan saya ingin bekerja di Jepang."],
  ["理由", "りゆう", "riyuu", "alasan", "Kosakata Menengah", 3, "理由を教えてください。", "Tolong beri tahu alasannya."],

  // verb dan ungkapan menengah
  ["増える", "ふえる", "fueru", "bertambah", "Kosakata Menengah", 3, "この町の人口が増えています。", "Populasi kota ini bertambah."],
  ["減る", "へる", "heru", "berkurang", "Kosakata Menengah", 3, "今月はお金が減りました。", "Bulan ini uang saya berkurang."],
  ["続ける", "つづける", "tsuzukeru", "melanjutkan", "Kosakata Menengah", 3, "毎日練習を続けています。", "Saya terus berlatih setiap hari."],
  ["決める", "きめる", "kimeru", "memutuskan", "Kosakata Menengah", 3, "日本へ行くことを決めました。", "Saya memutuskan akan pergi ke Jepang."],
  ["変わる", "かわる", "kawaru", "berubah", "Kosakata Menengah", 3, "予定が変わりました。", "Rencananya berubah."],
  ["送る", "おくる", "okuru", "mengirim", "Kosakata Menengah", 3, "友達に写真を送りました。", "Saya mengirim foto kepada teman."],
  ["集める", "あつめる", "atsumeru", "mengumpulkan", "Kosakata Menengah", 3, "資料を集めています。", "Saya sedang mengumpulkan bahan."],
  ["説明", "せつめい", "setsumei", "penjelasan", "Kosakata Menengah", 3, "先生が文法を説明しました。", "Guru menjelaskan tata bahasa."],
  ["相談", "そうだん", "soudan", "konsultasi", "Kosakata Menengah", 3, "進路について先生に相談します。", "Saya berkonsultasi dengan guru soal masa depan."],
  ["招待", "しょうたい", "shoutai", "undangan", "Kosakata Menengah", 3, "結婚式に招待されました。", "Saya diundang ke pesta pernikahan."],
  ["予約", "よやく", "yoyaku", "reservasi", "Kosakata Menengah", 3, "レストランを予約しました。", "Saya memesan restoran."],
  ["案内", "あんない", "annai", "pemanduan", "Kosakata Menengah", 3, "町を案内してあげます。", "Saya akan memandumu keliling kota."],
  ["謝る", "あやまる", "ayamaru", "meminta maaf", "Kosakata Menengah", 3, "遅れてすみませんと謝りました。", "Saya minta maaf karena terlambat."],
  ["頼む", "たのむ", "tanomu", "meminta, memesan", "Kosakata Menengah", 3, "コーヒーを一つ頼みました。", "Saya memesan satu kopi."],
  ["間に合う", "まにあう", "maniau", "tepat waktu", "Kosakata Menengah", 3, "電車に間に合いました。", "Saya tepat waktu mengejar kereta."],
  ["慣れる", "なれる", "nareru", "terbiasa", "Kosakata Menengah", 3, "日本の生活に慣れました。", "Saya sudah terbiasa hidup di Jepang."],
  ["比べる", "くらべる", "kuraberu", "membandingkan", "Kosakata Menengah", 3, "値段を比べてから買います。", "Saya membandingkan harga dulu sebelum membeli."],
  ["選ぶ", "えらぶ", "erabu", "memilih", "Kosakata Menengah", 3, "好きな色を選んでください。", "Silakan pilih warna yang kamu suka."],
  ["通う", "かよう", "kayou", "bolak-balik secara rutin", "Kosakata Menengah", 3, "週に三回ジムに通っています。", "Saya ke gym tiga kali seminggu."],
  ["引っ越す", "ひっこす", "hikkosu", "pindah rumah", "Kosakata Menengah", 3, "来月新しいアパートに引っ越します。", "Bulan depan saya pindah ke apartemen baru."],
  ["意見", "いけん", "iken", "pendapat", "Kosakata Menengah", 3, "あなたの意見を聞かせてください。", "Tolong beri tahu pendapatmu."],
  ["情報", "じょうほう", "jouhou", "informasi", "Kosakata Menengah", 3, "新しい情報を集めています。", "Saya mengumpulkan informasi baru."],
  ["関係", "かんけい", "kankei", "hubungan", "Kosakata Menengah", 3, "この問題は私に関係があります。", "Masalah ini berhubungan dengan saya."],
  ["興味", "きょうみ", "kyoumi", "minat", "Kosakata Menengah", 3, "日本の文化に興味があります。", "Saya tertarik pada budaya Jepang."],
  ["感謝", "かんしゃ", "kansha", "rasa syukur", "Kosakata Menengah", 3, "皆さんに感謝しています。", "Saya bersyukur kepada semua orang."],
  ["努力", "どりょく", "doryoku", "usaha", "Kosakata Menengah", 3, "努力すれば必ず結果が出ます。", "Kalau berusaha, pasti ada hasilnya."],
  ["成功", "せいこう", "seikou", "keberhasilan", "Kosakata Menengah", 3, "試験に成功しました。", "Saya berhasil dalam ujian."],
  ["失敗", "しっぱい", "shippai", "kegagalan", "Kosakata Menengah", 3, "失敗しても諦めません。", "Walau gagal, saya tidak menyerah."],
  ["予定", "よてい", "yotei", "rencana", "Kosakata Menengah", 3, "週末の予定はありますか。", "Apakah ada rencana akhir pekan?"],
  ["会議", "かいぎ", "kaigi", "rapat", "Kosakata Menengah", 3, "会議は三時に始まります。", "Rapat dimulai pukul tiga."],
  ["空気", "くうき", "kuuki", "udara", "Kosakata Menengah", 3, "山の空気はきれいです。", "Udara di gunung bersih."],
  ["交通", "こうつう", "koutsuu", "lalu lintas", "Kosakata Menengah", 3, "この町は交通が便利です。", "Lalu lintas di kota ini nyaman."],
  ["十分", "じゅうぶん", "juubun", "cukup", "Kosakata Menengah", 3, "時間は十分あります。", "Waktunya cukup."],
  ["特に", "とくに", "toku ni", "terutama", "Kosakata Menengah", 3, "特に文法が難しいです。", "Terutama tata bahasanya sulit."],
  ["例えば", "たとえば", "tatoeba", "misalnya", "Kosakata Menengah", 3, "例えば、この言葉です。", "Misalnya, kata ini."],
  ["たぶん", "たぶん", "tabun", "mungkin", "Kosakata Menengah", 3, "たぶん明日は雨です。", "Mungkin besok hujan."],
  ["だんだん", "だんだん", "dandan", "perlahan-lahan", "Kosakata Menengah", 3, "だんだん上手になりました。", "Perlahan-lahan saya menjadi pandai."],
];

export const KOSAKATA = rows.map(
  ([jepang, furigana, romaji, arti, kategori, level, contohJp, contohId], i) => ({
    id: `k${i + 1}`,
    jepang,
    furigana,
    romaji,
    arti,
    kategori,
    level,
    contohJp,
    contohId,
  })
);

export const KATEGORI_KOSAKATA = [
  ...new Set(KOSAKATA.map((k) => k.kategori)),
];

export const LEVEL_LABEL = {
  1: "Pemula",
  2: "Dasar",
  3: "Menengah",
};
