import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../Form'
import { cn } from '@/libs/helpers/utils'
import { useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import Select, { components } from 'react-select'
import { customStyles } from '@/libs/dummy/selectProps'
import { useGetNamaKelasQuery } from '@/store/slices/JadwalAPI'
import { NamaKelasType } from '@/libs/types/jadwal-type'

type inputProps = {
  placeholder: string
  isDisabled?: boolean
  name: string
  headerLabel?: string
  useFormReturn: UseFormReturn
  className?: string
}

export function SelectListNamaKelas({
  name,
  headerLabel,
  placeholder,
  isDisabled,
  useFormReturn,
  className,
}: inputProps) {
  const [query, setQuery] = useState<string>(null)
  const [listNamaKelas, setListNamaKelas] = useState<NamaKelasType[]>([])

  const { data, isSuccess, isLoading, isFetching } = useGetNamaKelasQuery()

  useEffect(() => {
    if (!isFetching) {
      if (data?.meta?.page > 1) {
        setListNamaKelas((prevData) => [...prevData, ...(data?.data ?? [])])
      } else {
        setListNamaKelas([...(data?.data ?? [])])
      }
    }
  }, [data])

  function groupByTingkatKelas(data) {
    // Create a map to store grouped data
    const groupedData = {}

    // Iterate over each item in the data array
    data.forEach((item) => {
      const { tingkat_kelas } = item

      // If the tingkat_kelas does not exist in the map, create an entry for it
      if (!groupedData[tingkat_kelas]) {
        groupedData[tingkat_kelas] = {
          value: tingkat_kelas, // You can generate an ID here if needed
          label: tingkat_kelas,
          tingkat: tingkat_kelas,
        }
      }
    })

    // Convert the map to an array
    return Object.values(groupedData)
  }

  let NamaKelasOption = []
  if (isSuccess) {
    NamaKelasOption = listNamaKelas.map((item) => {
      return {
        value: item?.id,
        label: item?.nama_kelas,
        tingkat: item?.tingkat_kelas,
      }
    })
    const groupedData = groupByTingkatKelas(listNamaKelas)
    NamaKelasOption = NamaKelasOption.concat(groupedData)
  }

  NamaKelasOption.sort((a, b) => {
    const nameA = a.label || a.nama_kelas
    const nameB = b.label || b.nama_kelas
    if (nameA < nameB) return -1
    if (nameA > nameB) return 1
    return 0
  })

  const search = (newValue: string) => {
    if (newValue != query) {
      setQuery(newValue)
    }
  }

  const Option = (props) => {
    return (
      <components.Option {...props}>
        <div ref={props.innerRef}>
          <div className="text-[2rem]">{props.label}</div>
        </div>
      </components.Option>
    )
  }

  return (
    <FormField
      name={name}
      control={useFormReturn.control}
      render={({ field }) => {
        return (
          <FormItem
            className={cn(
              'flex w-full items-center gap-32 text-[2rem] phones:flex-col phones:items-start phones:gap-12 phones:text-[2.4rem]',
              className,
            )}
          >
            {headerLabel && (
              <div className="w-2/6 phones:w-full phones:text-left">
                <FormLabel>{headerLabel}</FormLabel>
              </div>
            )}
            <div className="w-full phones:w-full">
              <FormControl>
                <Select
                  {...field}
                  styles={{
                    ...customStyles,
                    singleValue: (provided) => ({
                      ...provided,
                      color: 'grey',
                    }),
                    input: (provided) => ({
                      ...provided,
                      color: 'grey',
                      fontSize: '8px',
                      // backgroundColor: '',
                    }),
                    menuList: (provided) => ({
                      ...provided,
                      padding: 0,
                      maxHeight: '50vh',
                      overflowY: 'auto',
                      '&::-webkit-scrollbar': {
                        width: 0,
                        height: 0,
                      },
                      '&::-webkit-scrollbar-track': {
                        backgroundColor: 'transparent',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'transparent',
                        borderRadius: '6px',
                      },
                    }),
                    control: (provided) => ({
                      ...provided,
                      backgroundColor:
                        'rgb(255 255 255 / var(--tw-bg-opacity))',
                      border:
                        '1px solid rgb(203 213 225 / var(--tw-bg-opacity))',
                      borderRadius: '0.375rem',
                      fontSize: '2rem',
                    }),
                    option: (provided) => ({
                      ...provided,
                      backgroundColor:
                        'rgb(255 255 255 / var(--tw-bg-opacity))',
                      color: 'rgb(32 34 35 / var(--tw-bg-opacity))',
                      cursor: isDisabled ? 'not-allowed' : 'default',
                      ':hover': {
                        cursor: 'pointer',
                        backgroundColor:
                          'rgb(240 244 247 / var(--tw-bg-opacity))',
                      },
                    }),
                  }}
                  className={'text-[1rem]'}
                  options={NamaKelasOption}
                  value={
                    NamaKelasOption.filter(
                      (item) => item.value === field.value,
                    )[0]
                  }
                  placeholder={placeholder ?? 'Pilih'}
                  onInputChange={search}
                  onChange={(optionSelected) => {
                    if (!isNaN(Number(optionSelected?.value))) {
                      useFormReturn.setValue('id_kelas', '')
                    } else {
                      field.onChange(optionSelected?.value)
                    }
                    useFormReturn.setValue(
                      'nama_kelas',
                      optionSelected?.tingkat,
                    )
                  }}
                  isDisabled={isDisabled}
                  isLoading={isFetching || isLoading}
                  components={{ Option }}
                />
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
