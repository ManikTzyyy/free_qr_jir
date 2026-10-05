import QRCode from "qrcode";

const input = document.querySelector("#text");
const btn = document.querySelector("#generate");
const canvas = document.querySelector("#canvas");
const quality = document.querySelector("#quality");
const fileSize = document.querySelector("#file-size");
const download = document.querySelector("#download");

const exportCanvas = document.createElement("canvas");
let currentText = "";
let currentBlob = null;

const formatFileSize = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(1)} KB`;
};

const prepareDownload = () => {
  if (!currentText) return;

  const scale = Number(quality.value);
  QRCode.toCanvas(exportCanvas, currentText, { scale: 10 * scale }, (err) => {
    if (err) {
      console.error(err);
      return;
    }

    exportCanvas.toBlob((blob) => {
      currentBlob = blob;
      fileSize.textContent = `Ukuran file: ${formatFileSize(blob.size)}`;
      download.disabled = false;
    }, "image/png");
  });
};

btn.addEventListener("click", () => {
  currentText = input.value || "kosong";
  QRCode.toCanvas(
    canvas,
    currentText,
    {
      scale: 10,
    },
    (err) => {
      if (err) console.error(err);
      console.log("QR dibuat:", currentText);
      prepareDownload();
    }
  );
});

quality.addEventListener("change", prepareDownload);

download.addEventListener("click", () => {
  if (!currentBlob) return;

  const link = document.createElement("a");
  link.download = "qr-code.png";
  link.href = URL.createObjectURL(currentBlob);
  link.click();
  URL.revokeObjectURL(link.href);
});
