/* ============================================================
   GENERATOR ARTIKEL DESA
   wilayah.js

   Provinsi → Kabupaten/Kota → Kecamatan → Desa/Kelurahan
   ============================================================ */


// ============================================================
// 1. API WILAYAH INDONESIA
// ============================================================

const API_WILAYAH =
  "https://www.emsifa.com/api-wilayah-indonesia/api";


// ============================================================
// 2. ELEMENT HTML
// ============================================================

const jenisKontenSelect =
  document.getElementById("jenisKonten");

const provinsiSelect =
  document.getElementById("provinsi");

const kabupatenSelect =
  document.getElementById("kabupaten");

const kecamatanSelect =
  document.getElementById("kecamatan");

const desaSelect =
  document.getElementById("desa");

const lanjutBtn =
  document.getElementById("lanjutBtn");


// ============================================================
// 3. FUNGSI KOSONGKAN SELECT
// ============================================================

function kosongkanSelect(select, placeholder) {

  select.innerHTML = "";

  const option =
    document.createElement("option");

  option.value = "";
  option.textContent = placeholder;

  select.appendChild(option);

  select.disabled = true;
}


// ============================================================
// 4. AMBIL DATA DARI API
// ============================================================

async function ambilData(url) {

  try {

    const response =
      await fetch(url);

    if (!response.ok) {

      throw new Error(
        "Gagal mengambil data wilayah"
      );

    }

    return await response.json();

  } catch (error) {

    console.error(
      "Error API wilayah:",
      error
    );

    alert(
      "Data wilayah gagal dimuat. Pastikan koneksi internet aktif."
    );

    return [];

  }

}


// ============================================================
// 5. LOAD PROVINSI
// ============================================================

async function loadProvinsi() {

  provinsiSelect.innerHTML =
    '<option value="">Memuat provinsi...</option>';

  provinsiSelect.disabled = true;

  const data =
    await ambilData(
      `${API_WILAYAH}/provinces.json`
    );

  provinsiSelect.innerHTML =
    '<option value="">Pilih Provinsi</option>';

  data.forEach(function (item) {

    const option =
      document.createElement("option");

    option.value =
      item.id;

    option.textContent =
      item.name;

    provinsiSelect.appendChild(
      option
    );

  });

  provinsiSelect.disabled = false;

}


// ============================================================
// 6. PROVINSI → KABUPATEN / KOTA
// ============================================================

provinsiSelect.addEventListener(
  "change",
  async function () {

    const provinceId =
      this.value;

    kosongkanSelect(
      kabupatenSelect,
      "Pilih Kabupaten / Kota"
    );

    kosongkanSelect(
      kecamatanSelect,
      "Pilih Kecamatan"
    );

    kosongkanSelect(
      desaSelect,
      "Pilih Desa / Kelurahan"
    );

    if (!provinceId) {

      cekLengkap();

      return;

    }

    kabupatenSelect.innerHTML =
      '<option value="">Memuat kabupaten/kota...</option>';

    const data =
      await ambilData(
        `${API_WILAYAH}/regencies/${provinceId}.json`
      );

    kabupatenSelect.innerHTML =
      '<option value="">Pilih Kabupaten / Kota</option>';

    data.forEach(function (item) {

      const option =
        document.createElement("option");

      option.value =
        item.id;

      option.textContent =
        item.name;

      kabupatenSelect.appendChild(
        option
      );

    });

    kabupatenSelect.disabled = false;

    cekLengkap();

  }
);


// ============================================================
// 7. KABUPATEN / KOTA → KECAMATAN
// ============================================================

kabupatenSelect.addEventListener(
  "change",
  async function () {

    const regencyId =
      this.value;

    kosongkanSelect(
      kecamatanSelect,
      "Pilih Kecamatan"
    );

    kosongkanSelect(
      desaSelect,
      "Pilih Desa / Kelurahan"
    );

    if (!regencyId) {

      cekLengkap();

      return;

    }

    kecamatanSelect.innerHTML =
      '<option value="">Memuat kecamatan...</option>';

    const data =
      await ambilData(
        `${API_WILAYAH}/districts/${regencyId}.json`
      );

    kecamatanSelect.innerHTML =
      '<option value="">Pilih Kecamatan</option>';

    data.forEach(function (item) {

      const option =
        document.createElement("option");

      option.value =
        item.id;

      option.textContent =
        item.name;

      kecamatanSelect.appendChild(
        option
      );

    });

    kecamatanSelect.disabled = false;

    cekLengkap();

  }
);


// ============================================================
// 8. KECAMATAN → DESA / KELURAHAN
// ============================================================

kecamatanSelect.addEventListener(
  "change",
  async function () {

    const districtId =
      this.value;

    kosongkanSelect(
      desaSelect,
      "Pilih Desa / Kelurahan"
    );

    if (!districtId) {

      cekLengkap();

      return;

    }

    desaSelect.innerHTML =
      '<option value="">Memuat desa/kelurahan...</option>';

    const data =
      await ambilData(
        `${API_WILAYAH}/villages/${districtId}.json`
      );

    desaSelect.innerHTML =
      '<option value="">Pilih Desa / Kelurahan</option>';

    data.forEach(function (item) {

      const option =
        document.createElement("option");

      option.value =
        item.id;

      option.textContent =
        item.name;

      desaSelect.appendChild(
        option
      );

    });

    desaSelect.disabled = false;

    cekLengkap();

  }
);


// ============================================================
// 9. CEK KELENGKAPAN
// ============================================================

function cekLengkap() {

  lanjutBtn.disabled = !(
    jenisKontenSelect.value &&
    provinsiSelect.value &&
    kabupatenSelect.value &&
    kecamatanSelect.value &&
    desaSelect.value
  );

}


// ============================================================
// 10. EVENT JENIS KONTEN
// ============================================================

jenisKontenSelect.addEventListener(
  "change",
  cekLengkap
);

desaSelect.addEventListener(
  "change",
  cekLengkap
);


// ============================================================
// 11. GOOGLE FORM
// ============================================================

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSf-Kn-gFbMWp1DsViH3l_18NYcMbwazaKo5ZJnq0-Mi_seOzA/viewform";

// Entry ID field alamat di KETIGA section Form.
// Isi provinsi/kabupaten/kecamatan/desa dikirim ke ketiganya sekaligus,
// supaya section mana pun yang dipilih user, alamatnya sudah terisi.
const ENTRY_ALAMAT = {
  profil:   { provinsi: "1961004809", kabupaten: "1714322525", kecamatan: "986657420",  desa: "995407789"  },
  produk:   { provinsi: "482790474",  kabupaten: "692494276",  kecamatan: "1496770233", desa: "2034046162" },
  kegiatan: { provinsi: "2134607933", kabupaten: "1247072834", kecamatan: "185737435",  desa: "257820239"  }
};

function buatLinkForm(jenisKontenText, provinsiText, kabupatenText, kecamatanText, desaText) {

  const entries = {
    // Jenis Konten — teksnya harus SAMA PERSIS dengan pilihan di Form:
    // "Profil Kepala Desa" / "Produk Unggulan Desa" / "Kegiatan Desa"
    "entry.415112448": jenisKontenText
  };

  Object.keys(ENTRY_ALAMAT).forEach(function (bagian) {
    const e = ENTRY_ALAMAT[bagian];
    entries["entry." + e.provinsi]  = provinsiText  || "";
    entries["entry." + e.kabupaten] = kabupatenText || "";
    entries["entry." + e.kecamatan] = kecamatanText || "";
    entries["entry." + e.desa]      = desaText      || "";
  });

  const params = new URLSearchParams(entries);
  params.append("usp", "pp_url");

  return FORM_URL + "?" + params.toString();
}


// ============================================================
// 12. TOMBOL LANJUTKAN
// ============================================================

lanjutBtn.addEventListener(
  "click",
  function () {

    if (
      !jenisKontenSelect.value ||
      !provinsiSelect.value ||
      !kabupatenSelect.value ||
      !kecamatanSelect.value ||
      !desaSelect.value
    ) {

      alert(
        "Silakan lengkapi semua pilihan terlebih dahulu."
      );

      return;

    }


    // --------------------------------------------------------
    // AMBIL TEXT YANG TERLIHAT DI DROPDOWN
    // --------------------------------------------------------

    const jenisKontenText =
      jenisKontenSelect.options[
        jenisKontenSelect.selectedIndex
      ].text.trim();

    const provinsiText =
      provinsiSelect.options[
        provinsiSelect.selectedIndex
      ].text.trim();

    const kabupatenText =
      kabupatenSelect.options[
        kabupatenSelect.selectedIndex
      ].text.trim();

    const kecamatanText =
      kecamatanSelect.options[
        kecamatanSelect.selectedIndex
      ].text.trim();

    const desaText =
      desaSelect.options[
        desaSelect.selectedIndex
      ].text.trim();


    // --------------------------------------------------------
    // BUAT LINK PREFILLED
    // --------------------------------------------------------

    const link = buatLinkForm(
      jenisKontenText,
      provinsiText,
      kabupatenText,
      kecamatanText,
      desaText
    );

    console.log(
      "Google Form:",
      link
    );


    // --------------------------------------------------------
    // BUKA GOOGLE FORM
    // --------------------------------------------------------

    window.open(
      link,
      "_blank"
    );

  }
);


// ============================================================
// 13. INISIALISASI AWAL
// ============================================================

kosongkanSelect(
  kabupatenSelect,
  "Pilih Kabupaten / Kota"
);

kosongkanSelect(
  kecamatanSelect,
  "Pilih Kecamatan"
);

kosongkanSelect(
  desaSelect,
  "Pilih Desa / Kelurahan"
);

loadProvinsi();

cekLengkap();