export const copyToClipboard = (text) => {
  // Buat elemen textarea yang tidak terlihat
  const textarea = document.createElement('textarea')
  textarea.value = text
  document.body.appendChild(textarea)

  // Pilih teks dalam textarea
  textarea.select()
  textarea.setSelectionRange(0, 99999) // Untuk kompatibilitas seluruh browser

  // Salin teks ke clipboard
  document.execCommand('copy')

  // Hapus elemen textarea yang tidak terlihat
  document.body.removeChild(textarea)

  // Tampilkan pesan atau tindakan lainnya
  alert('Teks berhasil disalin ke clipboard!')
}
