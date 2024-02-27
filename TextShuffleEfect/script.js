// Menunggu hingga seluruh dokumen HTML telah dimuat sebelum menjalankan skrip
document.addEventListener("DOMContentLoaded", function () {
  // Menetapkan kecepatan efek
  var kecepatan = 50;

  // Memilih semua elemen dengan kelas "shuffle"
  var elemenAcak = document.querySelectorAll(".shuffle");

  // Menambahkan atribut data-teks ke setiap elemen dengan nilai teks asli
  elemenAcak.forEach(function (elemen) {
    elemen.setAttribute("data-teks", elemen.textContent);
  });

  // Fungsi untuk mengacak urutan elemen dalam sebuah array
  function acak(urutan) {
    for (
      var j, x, i = urutan.length;
      i;
      j = parseInt(Math.random() * i),
        x = urutan[--i],
        urutan[i] = urutan[j],
        urutan[j] = x
    );
    return urutan;
  }

  // Fungsi untuk mengacak teks dalam sebuah elemen dengan efek berulang
  function acakTeks(elemen, teksAsli) {
    var urutanTeksElemen = Array.from(teksAsli);
    var teksAcak = [];

    // Fungsi rekursif untuk mengulangi pengacakan teks dengan interval waktu
    function ulangiAcak(jumlah, indeks) {
      // Jika sudah mencapai jumlah iterasi yang ditentukan, kembalikan teks asli
      if (indeks == jumlah) {
        elemen.textContent = teksAsli;
        return;
      }

      // Melakukan pengacakan teks dengan efek berulang menggunakan setTimeout
      setTimeout(function () {
        teksAcak = acak(urutanTeksElemen.slice());
        for (var i = 0; i < indeks; i++) {
          teksAcak[i] = teksAsli[i];
        }
        elemen.textContent = teksAcak.join("");
        indeks++;
        ulangiAcak(jumlah, indeks);
      }, kecepatan);
    }

    // Memulai pengacakan teks dengan jumlah iterasi sebanyak panjang teks asli
    ulangiAcak(teksAsli.length, 0);
  }

  // Menambahkan event listener untuk setiap elemen dengan kelas "shuffle"
  // agar mengaktifkan pengacakan teks saat mouse masuk ke dalamnya
  elemenAcak.forEach(function (elemen) {
    elemen.addEventListener("mouseenter", function () {
      // Memanggil fungsi untuk mengacak teks saat mouse masuk ke elemen
      acakTeks(elemen, elemen.getAttribute("data-teks"));
    });
  });
});
