import { cva } from 'class-variance-authority'

export { default as NavigationMenu } from './NavigationMenu.vue'
export { default as NavigationMenuList } from './NavigationMenuList.vue'
export { default as NavigationMenuItem } from './NavigationMenuItem.vue'
export { default as NavigationMenuTrigger } from './NavigationMenuTrigger.vue'
export { default as NavigationMenuContent } from './NavigationMenuContent.vue'
export { default as NavigationMenuLink } from './NavigationMenuLink.vue'

export const navigationMenuTriggerStyle = cva(
  'group inline-flex h-10 w-[190px] items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-[#4A5759] hover:text-[#FFDCCD] focus:bg-[#4A5759] focus:text-[#FFDCCD] focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-[#4A5759] data-[state=open]:bg-[#4A5759]',
)
