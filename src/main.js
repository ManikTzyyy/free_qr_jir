import QRCode from "qrcode";

const input = document.querySelector("#text");
const btn = document.querySelector("#generate");
const canvas = document.querySelector("#canvas");

btn.addEventListener("click", () => {
  const text = input.value || "kosong";
  QRCode.toCanvas(
    canvas,
    text,
    {
      scale: 10,
    },
    (err) => {
      if (err) console.error(err);
      console.log("QR dibuat:", text);
    }
  );
});
