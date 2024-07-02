import { JadwalType } from '@/libs/types/jadwal-type'
import clsx from 'clsx'

type ConvertJadwal = {
  namaKelas: string
  data: DataJadwal[]
}

type DataJadwal = {
  senin: JadwalType
  selasa: JadwalType
  rabu: JadwalType
  kamis: JadwalType
  jumat: JadwalType
  sabtu: JadwalType
  minggu: JadwalType
}

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

  // Fungsi untuk menghitung data hari dengan jumlah terbanyak
  function getMostFrequentDayData(data) {
    const hariData = {
      Senin: data?.filter((item) => item?.nama_hari.includes('Senin')),
      Selasa: data?.filter((item) => item?.nama_hari.includes('Selasa')),
      Rabu: data?.filter((item) => item?.nama_hari.includes('Rabu')),
      Kamis: data?.filter((item) => item?.nama_hari.includes('Kamis')),
      Jumat: data?.filter((item) => item?.nama_hari.includes('Jumat')),
      Sabtu: data?.filter((item) => item?.nama_hari.includes('Sabtu')),
      Minggu: data?.filter((item) => item?.nama_hari.includes('Minggu')),
    }

    const mostFrequentDay = Object.keys(hariData).reduce((a, b) =>
      hariData[a].length > hariData[b].length ? a : b,
    )
    return { hariData, mostFrequentDay }
  }

  function groupByTingkatKelas(data): ConvertJadwal[] {
    // Ambil data hari dengan jumlah terbanyak
    const { hariData, mostFrequentDay } = getMostFrequentDayData(data)

    // Create a map to store grouped data
    const groupedData = {}

    // Iterate over each item in the data array
    data.forEach((item) => {
      const { nama_kelas } = item

      // If the nama_kelas does not exist in the map, create an entry for it
      if (!groupedData[nama_kelas]) {
        groupedData[nama_kelas] = {
          namaKelas: nama_kelas, // Menyimpan nama kelas
          data: [],
        }
      }

      // Create an array of day schedules
      const daySchedule = []
      for (let i = 0; i < hariData[mostFrequentDay].length; i++) {
        daySchedule.push({
          senin: hariData.Senin[i] || null,
          selasa: hariData.Selasa[i] || null,
          rabu: hariData.Rabu[i] || null,
          kamis: hariData.Kamis[i] || null,
          jumat: hariData.Jumat[i] || null,
          sabtu: hariData.Sabtu[i] || null,
          minggu: hariData.Minggu[i] || null,
        })
      }

      // Add the day schedule to the grouped data
      groupedData[nama_kelas].data = daySchedule
    })

    // Convert the map to an array
    return Object.values(groupedData)
  }

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
      {groupByTingkatKelas(data)?.map((item, idx) => (
        <div className="flex flex-col gap-12" key={idx}>
          <p className="font-sans text-[2.4rem] font-bold">{item?.namaKelas}</p>
          <table className="rounded-3x scrollbar h-full w-full flex-1 border-collapse overflow-auto bg-[#fcfcfc] text-[2rem]">
            <thead className="border border-black align-top text-[2rem] leading-medium">
              <tr>
                {daysOfWeek.map((day, idx) => (
                  <th
                    key={idx}
                    style={{ width: `calc(100% / ${daysOfWeek.length})` }}
                    className={`border-r ${idx === daysOfWeek?.length - 1 ? 'border-l border-black' : ''} bg-[#1835B3] px-24 py-16 text-center align-middle text-white`}
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="border border-black">
              {item?.data?.map((list, id) => (
                <tr
                  key={id}
                  className={clsx(
                    'transition-all ease-in hover:cursor-pointer',
                    {
                      'bg-[#CFDBFB]': id % 8 === 0,
                      'bg-[#DAF8CE]': id % 8 === 1,
                      'bg-[#FFF2CC]': id % 8 === 2,
                      'bg-[#CBF5FC]': id % 8 === 3,
                      'bg-[#FDE0D1]': id % 8 === 4,
                      'bg-[#FFFFB0]': id % 8 === 5,
                      'bg-[#FFD0FF]': id % 8 === 6,
                      'bg-[#D9FFFF]': id % 8 === 7,
                    },
                  )}
                >
                  <td
                    className={clsx(
                      'px-24 py-12 text-center align-middle font-sans text-[2rem] leading-medium',
                    )}
                  >
                    <div key={id} className="text-center">
                      <p className="font-bold">{list?.senin?.nama_mapel}</p>
                      <p>
                        {list?.senin?.jam_mulai?.substring(0, 5)} -{' '}
                        {list?.senin?.jam_akhir?.substring(0, 5)}
                      </p>
                      <p>{list?.senin?.nama_guru}</p>
                    </div>
                  </td>
                  <td className="px-24 py-12 text-center align-middle font-sans text-[2rem] leading-medium">
                    <div key={id} className="text-center">
                      <p className="font-bold">{list?.selasa?.nama_mapel}</p>
                      <p>
                        {list?.selasa?.jam_mulai?.substring(0, 5)} -{' '}
                        {list?.selasa?.jam_akhir?.substring(0, 5)}
                      </p>
                      <p>{list?.selasa?.nama_guru}</p>
                    </div>
                  </td>
                  <td className="px-24 py-12 text-center align-middle font-sans text-[2rem] leading-medium">
                    <div key={id} className="text-center">
                      <p className="font-bold">{list?.rabu?.nama_mapel}</p>
                      <p>
                        {list?.rabu?.jam_mulai?.substring(0, 5)} -{' '}
                        {list?.rabu?.jam_akhir?.substring(0, 5)}
                      </p>
                      <p>{list?.rabu?.nama_guru}</p>
                    </div>
                  </td>
                  <td className="px-24 py-12 text-center align-middle font-sans text-[2rem] leading-medium">
                    <div key={id} className="text-center">
                      <p className="font-bold">{list?.kamis?.nama_mapel}</p>
                      <p>
                        {list?.kamis?.jam_mulai?.substring(0, 5)} -{' '}
                        {list?.kamis?.jam_akhir?.substring(0, 5)}
                      </p>
                      <p>{list?.kamis?.nama_guru}</p>
                    </div>
                  </td>
                  <td className="px-24 py-12 text-center align-middle font-sans text-[2rem] leading-medium">
                    <div key={id} className="text-center">
                      <p className="font-bold">{list?.jumat?.nama_mapel}</p>
                      <p>
                        {list?.jumat?.jam_mulai?.substring(0, 5)} -{' '}
                        {list?.jumat?.jam_akhir?.substring(0, 5)}
                      </p>
                      <p>{list?.jumat?.nama_guru}</p>
                    </div>
                  </td>
                  <td className="px-24 py-12 text-center align-middle font-sans text-[2rem] leading-medium">
                    <div key={id} className="text-center">
                      <p className="font-bold">{list?.sabtu?.nama_mapel}</p>
                      <p>
                        {list?.sabtu?.jam_mulai?.substring(0, 5)} -{' '}
                        {list?.sabtu?.jam_akhir?.substring(0, 5)}
                      </p>
                      <p>{list?.sabtu?.nama_guru}</p>
                    </div>
                  </td>
                  <td className="px-24 py-12 text-center align-middle font-sans text-[2rem] leading-medium">
                    <div key={id} className="text-center">
                      <p className="font-bold">{list?.minggu?.nama_mapel}</p>
                      <p>
                        {list?.minggu?.jam_mulai?.substring(0, 5)} -{' '}
                        {list?.minggu?.jam_akhir?.substring(0, 5)}
                      </p>
                      <p>{list?.minggu?.nama_guru}</p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  )
}
