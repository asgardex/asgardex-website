'use client'
import { Button, Dropdown, DropdownItem, DropdownTrigger, DropdownMenu } from '@nextui-org/react'

export interface ItemConfig {
  title: string
  description?: string
  url: string
}

export default function Selector ({ label, items }: { label: string, items: ItemConfig[] }) {
  return <Dropdown type='listbox'>
    <DropdownTrigger>
      <Button
        variant="bordered"
        className='text-white w-full'
      >
        {label}
      </Button>
    </DropdownTrigger>
    <DropdownMenu aria-label="Example with disabled actions" items={items}>
      {(item) => (
        <DropdownItem key={item.title} href={item.url} description={item.description}>{item.title}</DropdownItem>
      )}
    </DropdownMenu>
  </Dropdown>
}
