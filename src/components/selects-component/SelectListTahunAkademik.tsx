import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../Form'
import { cn } from '@/libs/helpers/utils'
import { useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import Select, { components } from 'react-select'
import { customStyles } from '@/libs/dummy/selectProps'
import { TahunAkademikType } from '@/libs/types/jadwal-type'

type inputProps = {
  placeholder: string
  isDisabled?: boolean
  name: string
  headerLabel?: string
  useFormReturn: UseFormReturn
  className?: string
  listTahunAkademik: TahunAkademikType[]
  isSuccess: boolean
  isLoading: boolean
  isFetching: boolean
}

export function SelectListTahunAkademik({
  name,
  headerLabel,
  placeholder,
  isDisabled,
  useFormReturn,
  className,
  listTahunAkademik,
  isLoading,
  isSuccess,
  isFetching,
}: inputProps) {
  const [query, setQuery] = useState<string>(null)

  let TahunAkademikOption = []
  if (isSuccess) {
    TahunAkademikOption = listTahunAkademik.map((item) => {
      return {
        value: item?.id,
        label: item?.tahun,
        semester: item?.semester,
        status: item?.status_aktif,
      }
    })
  }

  const search = (newValue: string) => {
    if (newValue != query) {
      setQuery(newValue)
    }
  }

  const aktifTahunAkademik = listTahunAkademik?.find(
    (item) => item?.status_aktif === 1,
  )

  const defaultValue = {
    value: aktifTahunAkademik?.id,
    label: aktifTahunAkademik?.tahun,
    semester: aktifTahunAkademik?.semester,
    status: aktifTahunAkademik?.status_aktif,
  }

  const Option = (props) => {
    return (
      <components.Option {...props}>
        <div ref={props.innerRef}>
          <div className="text-[2rem]">
            {props?.data?.semester} {props.label}
          </div>
        </div>
      </components.Option>
    )
  }

  return (
    <>
      {defaultValue?.value && (
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
                        }),
                        menuList: (provided) => ({
                          ...provided,
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
                      defaultValue={defaultValue}
                      options={TahunAkademikOption}
                      value={
                        TahunAkademikOption.filter(
                          (item) => item.value === field.value,
                        )[0]
                      }
                      placeholder={placeholder ?? 'Pilih'}
                      onInputChange={search}
                      onChange={(optionSelected) => {
                        field.onChange(optionSelected?.value)
                        useFormReturn.setValue('tingkat_kelas', '')
                        useFormReturn.setValue('id_kelas', '')
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
      )}
    </>
  )
}
