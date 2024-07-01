import { JadwalType } from '@/libs/types/jadwal-type'

export function TableJadwal({ data }: { data: JadwalType[] }) {
  // Mendapatkan daftar nama kelas yang unik dari data jadwal
  const uniqueClasses = Array.from(new Set(data.map((item) => item.nama_kelas)))

  // Membuat objek untuk menyimpan jadwal berdasarkan kelas
  const jadwalByClass: Record<string, JadwalType[]> = {}
  uniqueClasses.forEach((className) => {
    jadwalByClass[className] = data.filter(
      (item) => item.nama_kelas === className,
    )
  })

  // Mendapatkan daftar nama hari
  const daysOfWeek = [
    'Senin',
    'Selasa',
    'Rabu',
    'Kamis',
    'Jumat',
    'Sabtu',
    'Minggu',
  ]

  return (
    <div className="flex flex-col gap-32">
      {uniqueClasses.map((kelas, index) => (
        <div key={index} className="flex flex-col gap-12">
          <p className="font-sans text-[2.4rem] font-bold">{kelas}</p>
          <table className="rounded-3x flex-1 border-collapse bg-[#fcfcfc] text-24">
            <thead className="align-top text-[2rem] leading-medium">
              <tr>
                {daysOfWeek.map((day) => (
                  <th
                    key={day}
                    className={`border-r bg-[#1835B3] px-24 py-16 text-center align-middle text-white`}
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="bg-[#CFDBFB] transition-all ease-in hover:cursor-pointer">
                {daysOfWeek.map((day, idx) => (
                  <td
                    key={idx}
                    className="px-24 py-12 align-middle font-sans text-[1.8rem] leading-medium"
                  >
                    <div className="flex flex-col items-center justify-center gap-0">
                      {jadwalByClass[kelas]
                        .filter((item) => item.nama_hari === day)
                        .map((item, id) => (
                          <div key={id} className="text-center">
                            <p className="font-bold">{item.nama_mapel}</p>
                            <p>
                              {item.jam_mulai} - {item.jam_akhir}
                            </p>
                            <p>{item.nama_guru}</p>
                          </div>
                        ))}
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  )
}
