import { Dispatch, SetStateAction } from 'react'
import { Dialog, DialogContent, DialogTitle } from '../Dialog'
import { IconSuccess } from '@/assets'

/* eslint-disable @typescript-eslint/no-explicit-any */
export function ModalKode({
  isOpen,
  setIsOpen,
  kode,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  kode: string
}) {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(kode)
      alert('Kode ticket telah disalin ke clipboard!')
    } catch (err) {
      console.error('Gagal menyalin ke clipboard: ', err)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTitle className="hidden"></DialogTitle>
      <DialogContent
        className="text-dark scrollbar flex flex-col overflow-y-auto bg-white text-black"
        position="middle"
      >
        <div className="flex flex-col gap-16 bg-[#D9F9D1] p-32">
          <div className="flex flex-col items-center justify-center gap-32 text-[2.8rem] text-black">
            <IconSuccess />
            <p className="text-center text-[3rem] font-bold">
              Pesan anda telah terkirim
            </p>
            <p>
              Kode ticket:{' '}
              <span
                className="cursor-pointer font-mono text-[3rem] font-bold"
                onClick={copyToClipboard}
              >
                {kode}
              </span>
            </p>

            <p>
              Simpan kode ticket anda untuk membuka percakapan dan melihat
              balasan dari pesan Anda
            </p>

            <div className="flex w-full justify-end">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-xl bg-danger-700 px-24 py-16 text-white"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
