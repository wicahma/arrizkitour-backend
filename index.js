const express = require("express");
const bodyParser = require("body-parser");
const mainRoute = "/api/v1/";
require("dotenv").config();
const MongoDB = require("./src/config/db");
const { errorHandler } = require("./src/middlewares/errorHandler");
const cors = require("cors");
const { sendEmail } = require("./src/services/mailService");

MongoDB();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.static("public"));

app.use("/images", express.static("images"));
app.use("/icons", express.static("icons"));
app.use(`${mainRoute}car`, require("./src/routes/v1/carRoute"));
app.use(`${mainRoute}wisata`, require("./src/routes/v1/wisataRoute"));
app.use(`${mainRoute}outbond`, require("./src/routes/v1/wisataOutbondRoute"));
app.use(`${mainRoute}res-car`, require("./src/routes/v1/reservCarRoute"));
app.use(`${mainRoute}res-wisata`, require("./src/routes/v1/reservWisataRoute"));
app.use(`${mainRoute}email-test`, async (req, res) => {
  const rupiah = (angka) => {
    intl = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    });
    return intl.format(angka);
  };
  const tanggal = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString("id-ID", options);
  };

  const mobil = {
    data: {
      _id: "6498167d600a7db8af605c81",
      namaReservant: "Anjas Maradita",
      phoneNumber: "085751080434",
      email: "teguh.dc.kusuma@gmail.com",
      tanggalReservasi: tanggal("2023-06-30T00:00:00.000Z"),
      waktuAntar: "22:32",
      lokasiAntar: "Tidak tahu laha",
      unitId: {
        _id: "6469e31976db567afc1d534e",
        unitName: "Innova Reborn",
        seat: 6,
        pricePerDay: rupiah(900000),
        fasilitas: "BBM, Driver, Air Mineral, AC, Charger",
        imageId: "1687954311344_REBORN.png",
        status: "aktif",
        createdAt: "2023-05-21T09:23:37.192Z",
        updatedAt: "2023-06-28T12:11:51.447Z",
        __v: 0,
      },
      pesananTambahan: "tidak ada",
      createdAt: tanggal("2023-06-25T10:27:09.999Z"),
      updatedAt: "2023-06-28T12:04:12.066Z",
    },
    identifier: "Mobil",
  };

  const private = {
    data: {
      _id: "649e8c8ed9aca62d7086ba65",
      jenisWisata: "wisata",
      paketWisataId: {
        _id: "6469e3eb76db567afc1d5363",
        namaPaket: "1 Hari Jogja + Makan",
        fasilitas: [
          "Private transport ber-AC",
          "Makan siang",
          "Soft drink",
          "Tiket masuk obyek wisata",
          "Driver as guide ramah & profesional",
          "BBM, Free parkir dan Retribusi",
          "P3K standard",
        ],
        jenisPaket: {
          _id: "6469e3eb76db567afc1d5364",
          rundown:
            "Penjemputan di Bandara Stasiun atau Hotel,Perjalanan Menuju Tempat Wisata Keraton Jogja,Wisata Keraton,Perjalanan Menuju Taman Sari,Wisata Taman Sari,Perjalanan Menuju Gumuk Pasir,Wisata Gumuk Pasir,Perjalanan Menuju Paralayang,Wisata Paralayang,Perjalanan Menuju Pusat Oleh-Oleh,Wisata Pusat Oleh-Oleh,Pengantaran Makan Malam (Exclude),Drop Out Hotel/Bandara/Stasiun dll – Acara Selesai",
          tempatWisata: "GUMUK PASIR,PARALAYANG,TAMAN SARI,KERATON JOGJAKARTA",
        },
      },
      namaReservant: "test",
      phoneNumber: "085751080454",
      email: "test@gmail.com",
      jumlahPeserta: 4,
      tanggalMulai: tanggal("2024-10-05T00:00:00.000Z"),
      waktuJemput: "19.45",
      lokasiJemput: "Bantul",
      pesananTambahan: "Tidak ada",
      harga: rupiah(1172000),
      createdAt: "2023-06-30T08:04:30.926Z",
      updatedAt: "2023-06-30T08:04:30.926Z",
      __v: 0,
    },
    identifier: "Private Wisata",
  };

  const outbond = {
    data: {
      _id: "649852720c2930c787f4b895",
      jenisWisata: "outbond",
      paketWisataId: {
        _id: "6469efc376db567afc1d53ea",
        namaTempat: "Desa Wisata Pulesari",
        jenisPaket: {
          fasilitas:
            "Welcome Drink dan Snack 1x,Ice Breaking,Fun Games,Bermain di Wahana Outbound,,Bumbong Bocor,Jembatan Goyang,Titihan Bambu,Makan & Minum 1 x",
          namaPaket: "PAKET TRADISI 1",
          minimumPerson: 30,
          harga: 55000,
          images: [
            "1687176022419_payment-qris-dana.png",
            "1687176022425_payment-qris.png",
            "1687176022426_payment-va.png",
            "1687176022429_payment-ewallet.png",
          ],
          _id: "6469efc376db567afc1d53eb",
        },
      },
      namaReservant: "test",
      phoneNumber: "085127317636",
      email: "email@gasda.asdads",
      jumlahPeserta: 60,
      tanggalMulai: "2023-06-30T00:00:00.000Z",
      waktuJemput: "15:48",
      lokasiJemput: "asdasd",
      pesananTambahan: "asdasd",
      harga: 3300000,
      createdAt: "2023-06-25T14:42:58.622Z",
      updatedAt: "2023-06-28T05:23:08.759Z",
      __v: 0,
    },
    identifier: "Outbond",
  };

  const custom_after = {
    data: {
      _id: "649bb2ac61e7d5deb2cb6db6",
      namaReservant: "test",
      phoneNumber: "085751080454",
      email: "test@gmail.com",
      jumlahPeserta: 200,
      tanggalReservasi: "2024-10-05T00:00:00.000Z",
      waktuJemput: "19.45",
      lokasiJemput: "Bantul",
      lokasiAntar: "Jakal",
      armada: "Tidak tahu",
      fasilitasPilihan: "Tidak ada",
      harga: "4000000",
      pesananTambahan: "Tidak ada",
      createdAt: "2023-06-28T04:10:20.423Z",
      updatedAt: "2023-06-29T08:25:04.382Z",
      __v: 0,
    },
    identifier: "Custom Wisata",
  };
  const custom_before = {
    data: {
      _id: "649bb2ac61e7d5deb2cb6db6",
      namaReservant: "test",
      phoneNumber: "085751080454",
      email: "test@gmail.com",
      jumlahPeserta: 200,
      tanggalReservasi: "2024-10-05T00:00:00.000Z",
      waktuJemput: "19.45",
      lokasiJemput: "Bantul",
      lokasiAntar: "Jakal",
      armada: "Tidak tahu",
      fasilitasPilihan: "Tidak ada",
      harga: "4000000",
      pesananTambahan: "Tidak ada",
      createdAt: "2023-06-28T04:10:20.423Z",
      updatedAt: "2023-06-29T08:25:04.382Z",
      __v: 0,
    },
    identifier: "Custom Wisata in Check",
  };
  const email = await sendEmail({
    email: "masterteguh3@gmail.com",
    ...custom_after,
  });
  res.status(200).json({ message: "Email Sent!", data: email });
});

app.use(
  `${mainRoute}res-outbond`,
  require("./src/routes/v1/reservWisataOutbondRoute")
);
app.use(
  `${mainRoute}res-custom`,
  require("./src/routes/v1/reservCustomWisata")
);
app.use(`${mainRoute}user`, require("./src/routes/v1/userRoute"));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
