/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn } from 'react-hook-form'
import { FormField, FormItem, FormLabel, FormMessage } from '@/components/Form'
import { Input } from '.'
import { ReactNode } from 'react'

export function FormLabelInput({
  form,
  label,
  placeholder = '',
  name,
  prefix,
  suffix,
  type,
  handlerClick,
  className,
  isDisabled,
  defaultValue,
  isNumber,
}: {
  form: UseFormReturn | undefined | any
  label?: string | ReactNode
  placeholder?: string
  name: string
  prefix?: JSX.Element
  suffix?: JSX.Element
  type?: 'text' | 'number' | 'password' | 'date' | 'file' | 'email'
  handlerClick?: () => void
  className?: string
  isDisabled?: boolean
  defaultValue?: string
  isNumber?: boolean
}) {
  return (
    <FormField
      control={form?.control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={`flex w-full flex-col gap-y-8 ${label ? 'gap-y-8' : 'gap-y-0'} rounded-full text-[2rem] text-black ${className}`}
        >
          {label && <FormLabel>{label}</FormLabel>}
          <Input
            {...field}
            className="rounded-xl bg-white"
            type={type}
            placeholder={placeholder}
            defaultValue={defaultValue}
            value={field.value}
            prefix={prefix}
            suffix={suffix}
            handlerClick={handlerClick}
            disabled={isDisabled}
            onInput={(e) => {
              if (isNumber && type === 'text') {
                const inputValue = (e.target as HTMLInputElement).value
                ;(e.target as HTMLInputElement).value = inputValue.replace(
                  /[^\d]/g,
                  '',
                )
                field.onChange((e.target as HTMLInputElement).value)
              }
            }}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
