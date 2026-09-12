// Data tata bahasa (grammar) bahasa Jepang

export const GRAMMAR = [
  {
    id: "g1",
    nama: "Pola です (Kalimat Nomina)",
    pola: "Kata Benda + です",
    level: 1,
    rumus: "A は B です。 → A adalah B.",
    penjelasan:
      "です adalah kopula yang berfungsi seperti kata 'adalah' dalam bahasa Indonesia. Bentuk ini dipakai untuk menyatakan identitas, sifat, atau keadaan secara sopan. Dalam bahasa Jepang formal, subjek ditandai partikel は lalu diikuti predikat dan diakhiri です.",
    fungsi: [
      "Menyatakan identitas diri atau benda",
      "Menjelaskan profesi atau status",
      "Menyatakan sifat dengan kata sifat な",
    ],
    contoh: [
      { jp: "私は学生です。", furigana: "わたしは がくせいです。", romaji: "Watashi wa gakusei desu.", id: "Saya seorang pelajar." },
      { jp: "これは本です。", furigana: "これは ほんです。", romaji: "Kore wa hon desu.", id: "Ini adalah buku." },
      { jp: "田中さんは先生です。", furigana: "たなかさんは せんせいです。", romaji: "Tanaka-san wa sensei desu.", id: "Tanaka adalah guru." },
    ],
    catatan: [
      "Jangan menambahkan だ setelah です — bentuk ですだ salah.",
      "Partikel は dibaca 'wa', bukan 'ha'.",
      "Dalam percakapan santai, です sering dihilangkan.",
    ],
    tambahan: [
      { jp: "私はインドネシア人です。", id: "Saya orang Indonesia." },
      { jp: "ここは駅です。", id: "Di sini adalah stasiun." },
    ],
  },
  {
    id: "g2",
    nama: "Pola ます (Kata Kerja Sopan)",
    pola: "Kata Kerja (bentuk ます)",
    level: 1,
    rumus: "Subjek は [KK bentuk ます].",
    penjelasan:
      "Bentuk ます adalah bentuk sopan dari kata kerja. Dipakai dalam situasi formal maupun ketika berbicara dengan orang yang belum akrab. Bentuk ini menyatakan tindakan yang sedang atau akan dilakukan (non-lampau).",
    fungsi: [
      "Menyatakan kebiasaan sehari-hari",
      "Menyatakan tindakan yang akan dilakukan",
      "Dasar pembentukan bentuk negatif ません dan lampau ました",
    ],
    contoh: [
      { jp: "毎日日本語を勉強します。", furigana: "まいにち にほんごを べんきょうします。", romaji: "Mainichi nihongo o benkyou shimasu.", id: "Setiap hari saya belajar bahasa Jepang." },
      { jp: "朝ご飯を食べます。", furigana: "あさごはんを たべます。", romaji: "Asagohan o tabemasu.", id: "Saya makan sarapan." },
      { jp: "明日学校へ行きます。", furigana: "あした がっこうへ いきます。", romaji: "Ashita gakkou e ikimasu.", id: "Besok saya pergi ke sekolah." },
    ],
    catatan: [
      "ます bukan bentuk kamus. Bentuk kamus dijelaskan pada materi 普通形.",
      "Jangan mencampur bentuk ます dan bentuk kamus dalam satu kalimat formal.",
    ],
    tambahan: [
      { jp: "父は会社で働きます。", id: "Ayah bekerja di kantor." },
      { jp: "週末に映画を見ます。", id: "Akhir pekan saya menonton film." },
    ],
  },
  {
    id: "g3",
    nama: "Partikel は dan が",
    pola: "〜は / 〜が",
    level: 2,
    rumus: "Topik は [predikat] / [Subjek] が [predikat]",
    penjelasan:
      "は menandai topik pembicaraan (apa yang sedang dibicarakan), sedangkan が menandai subjek atau menekankan informasi baru. Kalau は memperkenalkan topik yang sudah diketahui, が menyorot siapa/apa yang melakukan sesuatu.",
    fungsi: [
      "は: membicarakan topik yang sudah diketahui",
      "が: menekankan subjek atau informasi baru",
      "が: dipakai pada pola 好き, 上手, 分かる, ある, いる",
    ],
    contoh: [
      { jp: "私は学生です。", furigana: "わたしは がくせいです。", romaji: "Watashi wa gakusei desu.", id: "Saya (topik) adalah pelajar." },
      { jp: "誰が先生ですか。", furigana: "だれが せんせいですか。", romaji: "Dare ga sensei desu ka.", id: "Siapa yang guru?" },
      { jp: "日本料理が好きです。", furigana: "にほんりょうりが すきです。", romaji: "Nihon ryouri ga suki desu.", id: "Saya suka masakan Jepang." },
    ],
    catatan: [
      "Kata tanya tidak boleh diikuti は ketika menjadi subjek — gunakan が.",
      "Dalam perkenalan diri, nama sendiri biasanya diikuti は.",
    ],
    tambahan: [
      { jp: "あそこに猫がいます。", id: "Di sana ada kucing." },
      { jp: "象は鼻が長いです。", id: "Gajah hidungnya panjang." },
    ],
  },
  {
    id: "g4",
    nama: "Partikel を (Objek)",
    pola: "Kata Benda + を + Kata Kerja",
    level: 2,
    rumus: "[Objek] を [KK]",
    penjelasan:
      "を menandai objek langsung dari kata kerja. Objek adalah sesuatu yang dikenai tindakan. Partikel ini hanya dipakai bersama kata kerja, tidak dengan kata sifat atau nomina.",
    fungsi: [
      "Menandai objek dari kata kerja transitif",
      "Menandai tempat yang dilalui (dengan 歩く, 散歩する)",
    ],
    contoh: [
      { jp: "本を読みます。", furigana: "ほんを よみます。", romaji: "Hon o yomimasu.", id: "Saya membaca buku." },
      { jp: "コーヒーを飲みます。", furigana: "", romaji: "Koohii o nomimasu.", id: "Saya minum kopi." },
      { jp: "公園を散歩します。", furigana: "こうえんを さんぽします。", romaji: "Kouen o sanpo shimasu.", id: "Saya berjalan-jalan di taman." },
    ],
    catatan: [
      "を tidak bisa dipakai bersama kata kerja intransitif seperti 行く dan 来る.",
      "Penulisan を dalam romaji ditulis 'o' dalam pengucapan.",
    ],
    tambahan: [
      { jp: "写真を撮ります。", id: "Saya mengambil foto." },
      { jp: "日本語を話します。", id: "Saya berbicara bahasa Jepang." },
    ],
  },
  {
    id: "g5",
    nama: "Partikel に dan で",
    pola: "〜に / 〜で",
    level: 2,
    rumus: "Tempat に (tujuan/waktu) vs Tempat で (sarana tempat aksi)",
    penjelasan:
      "に dipakai untuk menandai tujuan, waktu tertentu, dan penerima tindakan. で dipakai untuk menandai tempat sebuah tindakan dilakukan dan alat/sarana yang digunakan.",
    fungsi: [
      "に: tujuan, titik waktu, penerima",
      "で: tempat berlangsungnya aksi, alat, bahasa, bahan",
    ],
    contoh: [
      { jp: "七時に起きます。", furigana: "しちじに おきます。", romaji: "Shichi-ji ni okimasu.", id: "Saya bangun pukul tujuh." },
      { jp: "図書館で勉強します。", furigana: "としょかんで べんきょうします。", romaji: "Toshokan de benkyou shimasu.", id: "Saya belajar di perpustakaan." },
      { jp: "電車で行きます。", furigana: "でんしゃで いきます。", romaji: "Densha de ikimasu.", id: "Saya pergi naik kereta." },
    ],
    catatan: [
      "に行きます berarti menuju, sedangkan で行きます berarti naik/dengan.",
      "Untuk kategori waktu relatif seperti 今日 dan 明日, partikel に tidak dipakai.",
    ],
    tambahan: [
      { jp: "母に手紙を書きます。", id: "Saya menulis surat kepada ibu." },
      { jp: "日本語で話してください。", id: "Tolong bicara dengan bahasa Jepang." },
    ],
  },
  {
    id: "g6",
    nama: "Partikel の (Kepemilikan)",
    pola: "A の B",
    level: 1,
    rumus: "A の B → B milik A / B tentang A",
    penjelasan:
      "の menghubungkan dua kata benda. Fungsinya bisa menyatakan kepemilikan, asal, jenis, atau penjelas. Pola ini juga dipakai untuk membuat kata benda baru dari kata benda lain.",
    fungsi: [
      "Menyatakan kepemilikan",
      "Menjelaskan jenis atau kategori",
      "Menghubungkan dua nomina",
    ],
    contoh: [
      { jp: "これは私の本です。", furigana: "これは わたしの ほんです。", romaji: "Kore wa watashi no hon desu.", id: "Ini buku saya." },
      { jp: "日本語の先生です。", furigana: "にほんごの せんせいです。", romaji: "Nihongo no sensei desu.", id: "Guru bahasa Jepang." },
      { jp: "大学の学生です。", furigana: "だいがくの がくせいです。", romaji: "Daigaku no gakusei desu.", id: "Mahasiswa universitas." },
    ],
    catatan: [
      "の bisa menggantikan kata benda yang sudah disebut agar tidak berulang.",
      "Jangan memakai の untuk menghubungkan kata sifat い dengan kata benda.",
    ],
    tambahan: [
      { jp: "これは誰のかばんですか。", id: "Ini tas siapa?" },
      { jp: "日本の文化に興味があります。", id: "Saya tertarik pada budaya Jepang." },
    ],
  },
  {
    id: "g7",
    nama: "Partikel も ( juga )",
    pola: "〜も",
    level: 1,
    rumus: "A も B です → A juga B",
    penjelasan:
      "も menggantikan は atau が ketika informasi yang dibicarakan berlaku sama. Artinya 'juga'. Kalau dipakai dengan ない, artinya 'tidak juga' atau 'pun tidak'.",
    fungsi: ["Menyatakan 'juga'", "Menyatakan 'pun tidak' pada bentuk negatif", "Menambahkan informasi setara"],
    contoh: [
      { jp: "私も学生です。", furigana: "わたしも がくせいです。", romaji: "Watashi mo gakusei desu.", id: "Saya juga pelajar." },
      { jp: "これもください。", furigana: "", romaji: "Kore mo kudasai.", id: "Tolong yang ini juga." },
      { jp: "肉も魚も食べません。", furigana: "にくも さかなも たべません。", romaji: "Niku mo sakana mo tabemasen.", id: "Saya tidak makan daging maupun ikan." },
    ],
    catatan: ["も tidak dipakai bersamaan dengan は atau が dalam posisi yang sama."],
    tambahan: [
      { jp: "私の父も会社員です。", id: "Ayah saya juga pegawai kantor." },
      { jp: "昨日も雨でした。", id: "Kemarin juga hujan." },
    ],
  },
  {
    id: "g8",
    nama: "Bentuk Negatif ません",
    pola: "KK (ます) → ません",
    level: 1,
    rumus: "Kata Kerja bentuk ます + ません",
    penjelasan:
      "ません adalah bentuk negatif sopan. Kata kerja yang berakhiran ます diubah menjadi ません untuk menyatakan 'tidak melakukan'.",
    fungsi: ["Menyatakan tidak melakukan sesuatu", "Menolak secara sopan", "Membuat kalimat negatif formal"],
    contoh: [
      { jp: "お酒を飲みません。", furigana: "おさけを のみません。", romaji: "Osake o nomimasen.", id: "Saya tidak minum alkohol." },
      { jp: "今日は働きません。", furigana: "きょうは はたらきません。", romaji: "Kyou wa hatarakimasen.", id: "Hari ini saya tidak bekerja." },
      { jp: "肉を食べません。", furigana: "にくを たべません。", romaji: "Niku o tabemasen.", id: "Saya tidak makan daging." },
    ],
    catatan: [
      "Untuk kata benda dan kata sifat な, bentuk negatifnya adalah ではありません.",
      "Untuk kata sifat い, ubah akhiran い menjadi くありません.",
    ],
    tambahan: [
      { jp: "明日は来ません。", id: "Besok saya tidak datang." },
      { jp: "その店は安くありません。", id: "Toko itu tidak murah." },
    ],
  },
  {
    id: "g9",
    nama: "Bentuk Lampau ました",
    pola: "KK (ます) → ました",
    level: 1,
    rumus: "Kata Kerja bentuk ます + ました",
    penjelasan:
      "ました menyatakan tindakan yang sudah selesai dilakukan. Ini adalah bentuk lampau dari ます. Bentuk negatif lampaunya adalah ませんでした.",
    fungsi: ["Menyatakan tindakan yang sudah selesai", "Menceritakan pengalaman masa lalu", "Menyatakan kejadian lampau"],
    contoh: [
      { jp: "昨日映画を見ました。", furigana: "きのう えいがを みました。", romaji: "Kinou eiga o mimashita.", id: "Kemarin saya menonton film." },
      { jp: "朝ご飯を食べました。", furigana: "あさごはんを たべました。", romaji: "Asagohan o tabemashita.", id: "Saya sudah makan sarapan." },
      { jp: "日本へ行きませんでした。", furigana: "にほんへ いきませんでした。", romaji: "Nihon e ikimasen deshita.", id: "Saya tidak pergi ke Jepang." },
    ],
    catatan: ["Untuk kata sifat な, bentuk lampaunya adalah でした.", "Untuk kata sifat い, akhiran い berubah menjadi かったです."],
    tambahan: [
      { jp: "先週友達に会いました。", id: "Minggu lalu saya bertemu teman." },
      { jp: "試験は難しかったです。", id: "Ujiannya sulit." },
    ],
  },
  {
    id: "g10",
    nama: "Kata Sifat い dan な",
    pola: "い形容詞 / な形容詞",
    level: 2,
    rumus: "い-adj + KB / な-adj + な + KB",
    penjelasan:
      "Ada dua jenis kata sifat dalam bahasa Jepang. Kata sifat い berakhiran い dan langsung bisa memodifikasi kata benda. Kata sifat な memerlukan な sebelum kata benda yang diterangkan.",
    fungsi: ["Menerangkan kata benda", "Menyatakan keadaan atau perasaan", "Menjadi dasar perbandingan"],
    contoh: [
      { jp: "大きい家ですね。", furigana: "おおきい いえですね。", romaji: "Ookii ie desu ne.", id: "Rumahnya besar ya." },
      { jp: "静かな町です。", furigana: "しずかな まちです。", romaji: "Shizuka na machi desu.", id: "Kota yang tenang." },
      { jp: "この本は面白いです。", furigana: "このほんは おもしろいです。", romaji: "Kono hon wa omoshiroi desu.", id: "Buku ini menarik." },
    ],
    catatan: [
      "Ada kata sifat な yang di kamus berakhiran い seperti 綺麗 (きれい) dan 嫌い — keduanya bukan kata sifat い.",
      "Bentuk negatif kata sifat い: 大きくない / 大きくありません.",
    ],
    tambahan: [
      { jp: "元気な子供が多いです。", id: "Banyak anak yang sehat dan ceria." },
      { jp: "この料理はおいしくないです。", id: "Masakan ini tidak enak." },
    ],
  },
  {
    id: "g11",
    nama: "Bentuk て (Sambung Tindakan)",
    pola: "KK (て-form) + KK",
    level: 2,
    rumus: "KK bentuk て + KK",
    penjelasan:
      "Bentuk て menghubungkan beberapa kata kerja dalam satu kalimat. Bentuk ini juga menjadi dasar banyak pola penting seperti ています, てください, dan てもいいです.",
    fungsi: ["Menyambung beberapa tindakan berurutan", "Dasar pola permintaan てください", "Dasar pola sedang berlangsung ています"],
    contoh: [
      { jp: "朝起きて、ご飯を食べます。", furigana: "あさ おきて、ごはんを たべます。", romaji: "Asa okite, gohan o tabemasu.", id: "Pagi saya bangun lalu makan." },
      { jp: "今、勉強しています。", furigana: "いま、べんきょうしています。", romaji: "Ima, benkyou shite imasu.", id: "Sekarang saya sedang belajar." },
      { jp: "ちょっと待ってください。", furigana: "", romaji: "Chotto matte kudasai.", id: "Tolong tunggu sebentar." },
    ],
    catatan: [
      "Pembentukan bentuk て berbeda untuk setiap kelompok kata kerja.",
      "Kelompok 1 (五段): う/つ/る → って, む/ぶ/ぬ → んで, く → いて, ぐ → いで, す → して.",
      "Kelompok 2 (一段): akhiran る → て. Kelompok 3: する → して, 来る → 来て.",
    ],
    tambahan: [
      { jp: "窓を開けてください。", id: "Tolong buka jendela." },
      { jp: "テレビを見ています。", id: "Saya sedang menonton televisi." },
    ],
  },
  {
    id: "g12",
    nama: "Bentuk ない (Negatif Santai)",
    pola: "KK (ない-form)",
    level: 3,
    rumus: "KK bentuk kamus → KK bentuk ない",
    penjelasan:
      "Bentuk ない adalah bentuk negatif tidak sopan yang dipakai dalam percakapan santai dan menjadi dasar pola seperti なければなりません dan ないでください.",
    fungsi: ["Negatif dalam percakapan santai", "Dasar pola kewajiban dan larangan", "Dasar bentuk biasa (普通形)"],
    contoh: [
      { jp: "明日は行かない。", furigana: "あしたは いかない。", romaji: "Ashita wa ikanai.", id: "Besok saya tidak pergi. (santai)" },
      { jp: "あまり肉を食べない。", furigana: "あまり にくを たべない。", romaji: "Amari niku o tabenai.", id: "Saya jarang makan daging." },
      { jp: "ここで写真を撮らないでください。", furigana: "ここで しゃしんを とらないでください。", romaji: "Koko de shashin o toranaide kudasai.", id: "Tolong jangan memotret di sini." },
    ],
    catatan: ["Untuk kata kerja kelompok 2, る berubah jadi ない. Contoh: 食べる → 食べない.", "する menjadi しない dan 来る menjadi 来ない."],
    tambahan: [
      { jp: "今日は働かない。", id: "Hari ini saya tidak bekerja." },
      { jp: "心配しないでください。", id: "Jangan khawatir." },
    ],
  },
  {
    id: "g13",
    nama: "Pola たいです (Keinginan)",
    pola: "KK (ます) → たいです",
    level: 2,
    rumus: "KK bentuk ます (tanpa ます) + たいです",
    penjelasan:
      "たいです menyatakan keinginan pembicara untuk melakukan sesuatu. Subjeknya hampir selalu 'saya', karena kita tidak bisa mengklaim keinginan orang lain secara langsung.",
    fungsi: ["Menyatakan keinginan sendiri", "Menyatakan niat atau cita-cita"],
    contoh: [
      { jp: "日本へ行きたいです。", furigana: "にほんへ いきたいです。", romaji: "Nihon e ikitai desu.", id: "Saya ingin pergi ke Jepang." },
      { jp: "寿司を食べたいです。", furigana: "すしを たべたいです。", romaji: "Sushi o tabetai desu.", id: "Saya ingin makan sushi." },
      { jp: "日本語が話せたい。", furigana: "", romaji: "(Salah) → 日本語が話したい。", id: "Hati-hati: たい tidak dipakai untuk kemampuan." },
    ],
    catatan: [
      "Untuk keinginan orang lain gunakan たがっています.",
      "Objek pada pola たい bisa memakai を atau が.",
    ],
    tambahan: [
      { jp: "水が飲みたいです。", id: "Saya ingin minum air." },
      { jp: "もっと勉強したいです。", id: "Saya ingin belajar lebih banyak." },
    ],
  },
  {
    id: "g14",
    nama: "Pola ことができます (Kemampuan)",
    pola: "KK bentuk kamus + ことができます",
    level: 3,
    rumus: "KK (bentuk kamus) + ことができます",
    penjelasan:
      "Pola ini menyatakan kemampuan atau memungkinkan melakukan sesuatu. Padanan kasualnya adalah bentuk potensial seperti 話せる dan 読める.",
    fungsi: ["Menyatakan kemampuan", "Menyatakan hal yang memungkinkan", "Menjelaskan keahlian"],
    contoh: [
      { jp: "日本語を話すことができます。", furigana: "にほんごを はなすことができます。", romaji: "Nihongo o hanasu koto ga dekimasu.", id: "Saya bisa berbicara bahasa Jepang." },
      { jp: "ここで写真を撮ることができますか。", furigana: "ここで しゃしんを とることができますか。", romaji: "Koko de shashin o toru koto ga dekimasu ka.", id: "Bisakah mengambil foto di sini?" },
      { jp: "ひらがなを読むことができます。", furigana: "ひらがなを よむことができます。", romaji: "Hiragana o yomu koto ga dekimasu.", id: "Saya bisa membaca hiragana." },
    ],
    catatan: ["Kata benda diikuti ができます, bukan ことができます.", "Bentuk kasualnya lebih sering memakai potensial: 話せる."],
    tambahan: [
      { jp: "運転することができますか。", id: "Bisakah Anda mengemudi?" },
      { jp: "漢字を書くことができません。", id: "Saya tidak bisa menulis kanji." },
    ],
  },
  {
    id: "g15",
    nama: "Pola たことがあります (Pengalaman)",
    pola: "KK (bentuk た) + ことがあります",
    level: 3,
    rumus: "KK bentuk lampau (た) + ことがあります",
    penjelasan:
      "Pola ini menyatakan bahwa pembicara pernah melakukan sesuatu di masa lalu. Kalau ingin menyatakan 'belum pernah', gunakan bentuk negatifnya たことがありません.",
    fungsi: ["Menceritakan pengalaman", "Menanyakan pengalaman orang lain", "Menyatakan belum pernah"],
    contoh: [
      { jp: "日本へ行ったことがあります。", furigana: "にほんへ いったことがあります。", romaji: "Nihon e itta koto ga arimasu.", id: "Saya pernah pergi ke Jepang." },
      { jp: "納豆を食べたことがありません。", furigana: "なっとうを たべたことがありません。", romaji: "Nattou o tabeta koto ga arimasen.", id: "Saya belum pernah makan natto." },
      { jp: "京都へ行ったことがありますか。", furigana: "きょうとへ いったことがありますか。", romaji: "Kyouto e itta koto ga arimasu ka.", id: "Pernahkah Anda pergi ke Kyoto?" },
    ],
    catatan: ["Bentuknya harus lampau (た), bukan bentuk kamus.", "Pola ini tidak menyebut waktu spesifik seperti 昨日."],
    tambahan: [
      { jp: "富士山に登ったことがあります。", id: "Saya pernah mendaki Gunung Fuji." },
      { jp: "この映画を見たことがあります。", id: "Saya pernah menonton film ini." },
    ],
  },
  {
    id: "g16",
    nama: "Pola と思います (Pendapat)",
    pola: "Kalimat biasa + と思います",
    level: 3,
    rumus: "[Bentuk biasa] + と思います",
    penjelasan:
      "と思います dipakai untuk mengungkapkan pendapat, dugaan, atau kesan pembicara. Sebelum と harus dipakai bentuk biasa (普通形), bukan bentuk ます.",
    fungsi: ["Menyatakan pendapat", "Menyatakan dugaan", "Melunakkan pernyataan agar tidak terlalu tegas"],
    contoh: [
      { jp: "日本はきれいだと思います。", furigana: "にほんは きれいだと おもいます。", romaji: "Nihon wa kirei da to omoimasu.", id: "Menurut saya Jepang itu indah." },
      { jp: "明日は雨が降ると思います。", furigana: "あしたは あめが ふると おもいます。", romaji: "Ashita wa ame ga furu to omoimasu.", id: "Saya rasa besok akan hujan." },
      { jp: "この問題は難しいと思います。", furigana: "このもんだいは むずかしいと おもいます。", romaji: "Kono mondai wa muzukashii to omoimasu.", id: "Saya rasa soal ini sulit." },
    ],
    catatan: ["Kata sifat な dan kata benda perlu だ sebelum と.", "Untuk menyatakan dugaan orang lain gunakan と思っています."],
    tambahan: [
      { jp: "彼は来ないと思います。", id: "Saya rasa dia tidak datang." },
      { jp: "日本語は面白いと思います。", id: "Menurut saya bahasa Jepang menarik." },
    ],
  },
  {
    id: "g17",
    nama: "Pola ので (Karena)",
    pola: "Kalimat biasa + ので",
    level: 3,
    rumus: "[Sebab] ので、[akibat]",
    penjelasan:
      "ので menyatakan sebab dengan nuansa lebih halus dan objektif dibanding から. Karena itu ので sering dipakai dalam situasi sopan atau saat menyampaikan alasan kepada atasan.",
    fungsi: ["Menyatakan sebab secara halus", "Memberi alasan", "Dasar kalimat permintaan maaf"],
    contoh: [
      { jp: "雨が降っているので、家にいます。", furigana: "あめが ふっているので、いえに います。", romaji: "Ame ga futte iru node, ie ni imasu.", id: "Karena sedang hujan, saya di rumah." },
      { jp: "忙しいので、あとで電話します。", furigana: "いそがしいので、あとで でんわします。", romaji: "Isogashii node, ato de denwa shimasu.", id: "Karena sibuk, saya menelepon nanti." },
      { jp: "学生なので、お金がありません。", furigana: "がくせいなので、おかねが ありません。", romaji: "Gakusei na node, okane ga arimasen.", id: "Karena pelajar, saya tidak punya uang." },
    ],
    catatan: ["Kata benda dan kata sifat な memerlukan な sebelum ので.", "ので tidak sekuat から, jadi lebih cocok untuk alasan yang sopan."],
    tambahan: [
      { jp: "明日は早いので、もう寝ます。", id: "Karena besok harus pagi, saya tidur sekarang." },
      { jp: "日本語が分からないので、英語でお願いします。", id: "Karena tidak paham bahasa Jepang, tolong pakai bahasa Inggris." },
    ],
  },
  {
    id: "g18",
    nama: "Pola のに (Meskipun)",
    pola: "Kalimat biasa + のに",
    level: 3,
    rumus: "[Harapan/kenyataan A] のに、[kenyataan B]",
    penjelasan:
      "のに menyatakan pertentangan dengan nuansa kecewa, heran, atau menyayangkan. Berbeda dari が yang netral, のに membawa perasaan pembicara.",
    fungsi: ["Menyatakan 'meskipun seharusnya'", "Mengungkapkan kekecewaan", "Menyatakan hasil yang tidak sesuai harapan"],
    contoh: [
      { jp: "日本語を勉強したのに、話せません。", furigana: "にほんごを べんきょうしたのに、はなせません。", romaji: "Nihongo o benkyou shita noni, hanasemasen.", id: "Meskipun sudah belajar bahasa Jepang, saya tidak bisa berbicara." },
      { jp: "安いのに、とてもいいです。", furigana: "やすいのに、とても いいです。", romaji: "Yasui noni, totemo ii desu.", id: "Meskipun murah, barangnya sangat bagus." },
      { jp: "雨なのに、出かけました。", furigana: "あめなのに、でかけました。", romaji: "Ame na noni, dekakemashita.", id: "Meskipun hujan, dia pergi keluar." },
    ],
    catatan: ["のに tidak boleh diikuti kalimat harapan atau ajakan setelahnya.", "Kata benda dan kata sifat な perlu な sebelum のに."],
    tambahan: [
      { jp: "日曜日なのに、働いています。", id: "Meskipun hari Minggu, saya masih bekerja." },
      { jp: "彼は若いのに、よく知っています。", id: "Meskipun masih muda, dia tahu banyak." },
    ],
  },
  {
    id: "g19",
    nama: "Pola なら, ば, たら (Pengandaian)",
    pola: "〜なら / 〜ば / 〜たら",
    level: 3,
    rumus: "[Kondisi] なら / [KK bentuk ば] / [KK bentuk たら]",
    penjelasan:
      "Ketiganya menyatakan pengandaian dengan nuansa berbeda. なら mengangkat topik menjadi syarat, ば menekankan hubungan sebab-akibat yang logis, dan たら menyatakan syarat yang lebih umum dan sering dipakai dalam percakapan.",
    fungsi: ["Menyatakan syarat", "Menyatakan pengandaian", "Menyatakan akibat dari suatu kondisi"],
    contoh: [
      { jp: "日本へ行くなら、新幹線が便利です。", furigana: "にほんへ いくなら、しんかんせんが べんりです。", romaji: "Nihon e iku nara, shinkansen ga benri desu.", id: "Kalau pergi ke Jepang, shinkansen praktis." },
      { jp: "安ければ、買います。", furigana: "やすければ、かいます。", romaji: "Yasukereba, kaimasu.", id: "Kalau murah, saya beli." },
      { jp: "時間があったら、映画を見ます。", furigana: "じかんが あったら、えいがを みます。", romaji: "Jikan ga attara, eiga o mimasu.", id: "Kalau ada waktu, saya menonton film." },
    ],
    catatan: ["ば tidak dipakai jika kalimat belakangnya berupa ajakan atau perintah.", "たら bisa dipakai untuk peristiwa yang sudah berlalu: 家に帰ったら、誰もいなかった。"],
    tambahan: [
      { jp: "安かったら、買います。", id: "Kalau murah, saya beli." },
      { jp: "静かなら、よく眠れます。", id: "Kalau tenang, saya bisa tidur nyenyak." },
    ],
  },
  {
    id: "g20",
    nama: "Pola そうです / ようです / らしい (Dugaan)",
    pola: "〜そうです / 〜ようです / 〜らしいです",
    level: 3,
    rumus: "[Bentuk biasa] + そうです / ようです / らしいです",
    penjelasan:
      "Ketiganya menyatakan dugaan atau informasi yang tidak dilihat langsung. そうです dipakai untuk kesan dari penglihatan, ようです untuk dugaan berdasarkan bukti, dan らしい untuk informasi yang didengar.",
    fungsi: ["Menyampaikan dugaan", "Menyampaikan informasi dari orang lain", "Menyatakan kesan berdasarkan pengamatan"],
    contoh: [
      { jp: "このケーキはおいしそうです。", furigana: "このケーキは おいしそうです。", romaji: "Kono keeki wa oishisou desu.", id: "Kue ini kelihatannya enak." },
      { jp: "誰か来たようです。", furigana: "だれか きたようです。", romaji: "Dareka kita you desu.", id: "Sepertinya seseorang datang." },
      { jp: "明日は雨らしいです。", furigana: "あしたは あめらしいです。", romaji: "Ashita wa ame rashii desu.", id: "Katanya besok hujan." },
    ],
    catatan: [
      "そうです untuk kata sifat い melepas akhiran い, lalu untuk pengalaman langsung dipakai そうでした.",
      "らしい berasal dari informasi yang didengar atau dibaca, bukan dari pengamatan sendiri.",
    ],
    tambahan: [
      { jp: "雨が降りそうですね。", id: "Sepertinya akan hujan ya." },
      { jp: "彼は日本に住んでいたらしいです。", id: "Katanya dia pernah tinggal di Jepang." },
    ],
  },
  {
    id: "g21",
    nama: "Pola たり〜たりします",
    pola: "KK (た) + り、KK (た) + りします",
    level: 3,
    rumus: "KK bentuk た + り、KK bentuk た + り します",
    penjelasan:
      "Pola ini menyebutkan beberapa tindakan sebagai contoh, tidak lengkap sebagai urutan. Artinya 'melakukan A, B, dan lain-lain'.",
    fungsi: ["Menyebutkan contoh tindakan", "Menjelaskan kegiatan selang-seling", "Menyatakan bermacam-macam aktivitas"],
    contoh: [
      { jp: "週末は本を読んだり、映画を見たりします。", furigana: "しゅうまつは ほんを よんだり、えいがを みたりします。", romaji: "Shuumatsu wa hon o yondari, eiga o mitari shimasu.", id: "Akhir pekan saya membaca buku, menonton film, dan lain-lain." },
      { jp: "日本では神社を見たり、温泉に入ったりしました。", furigana: "にほんでは じんじゃを みたり、おんせんに はいったりしました。", romaji: "Nihon de wa jinja o mitari, onsen ni haittari shimashita.", id: "Di Jepang saya mengunjungi kuil, berendam di onsen, dan lain-lain." },
      { jp: "天気によって、暑かったり寒かったりします。", furigana: "てんきに よって、あつかったり さむかったりします。", romaji: "Tenki ni yotte, atsukattari samukattari shimasu.", id: "Tergantung cuaca, kadang panas kadang dingin." },
    ],
    catatan: ["Akhiran terakhir harus します atau しました.", "Bentuk lampau dari kata kerja bisa dipakai untuk kegiatan masa lalu."],
    tambahan: [
      { jp: "休みの日は散歩したり、写真を撮ったりします。", id: "Hari libur saya berjalan-jalan, memotret, dan lain-lain." },
      { jp: "歌を歌ったり、踊ったりしました。", id: "Saya bernyanyi, menari, dan lain-lain." },
    ],
  },
  {
    id: "g22",
    nama: "Keigo Dasar (Bentuk Sopan)",
    pola: "お〜になる / 〜られます / 〜ます",
    level: 3,
    rumus: "尊敬語 dan 丁寧語",
    penjelasan:
      "Keigo adalah bahasa sopan yang dipakai untuk menghormati lawan bicara. Ada tiga jenis utama: 尊敬語 (menghormati lawan), 謙譲語 (merendahkan diri), dan 丁寧語 (bahasa sopan umum seperti です/ます).",
    fungsi: ["Menghormati lawan bicara", "Berbicara dengan atasan atau pelanggan", "Situasi kerja dan layanan"],
    contoh: [
      { jp: "先生はもう帰られました。", furigana: "せんせいは もう かえられました。", romaji: "Sensei wa mou kaeraremashita.", id: "Guru sudah pulang. (sopan)" },
      { jp: "お名前は何とおっしゃいますか。", furigana: "おなまえは なんと おっしゃいますか。", romaji: "Onamae wa nan to osshaimasu ka.", id: "Siapa nama Anda? (sopan)" },
      { jp: "少々お待ちください。", furigana: "しょうしょう おまちください。", romaji: "Shoushou omachi kudasai.", id: "Mohon tunggu sebentar. (sopan)" },
    ],
    catatan: [
      "です/ます (bentuk sopan biasa) sudah cukup di situasi umum.",
      "Keigo dipelajari lebih dalam pada tingkat lanjutan seperti pekerjaan di Jepang.",
    ],
    tambahan: [
      { jp: "いらっしゃいませ。", id: "Selamat datang. (ucapan toko)" },
      { jp: "ありがとうございます。", id: "Terima kasih. (sopan)" },
    ],
  },
];

export const LEVEL_GRAMMAR_LABEL = { 1: "Pemula", 2: "Dasar", 3: "Menengah" };
