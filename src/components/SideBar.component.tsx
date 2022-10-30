import { Fragment, useMemo, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  Bars3BottomLeftIcon,
  BellIcon,
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
  XMarkIcon,
  HandRaisedIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { useAccount, useConnectors } from '@starknet-react/core'
import { useRouter } from 'next/router'
import Link from 'next/link'

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon, current: true },
  { name: 'Inheritance', href: '/inheritance', icon: UsersIcon, current: false },
  { name: 'Vote', href: '/vote', icon: HandRaisedIcon, current: false },
  { name: 'Claims', href: '/claims', icon: CurrencyDollarIcon, current: false },
]
const userNavigation = [
  { name: 'Disconnect' }
]

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

type SideBarProps = {
  children: JSX.Element
}
export default function SideBar({ children }: SideBarProps) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { account, address, status } = useAccount()
  const { connect, connectors, disconnect } = useConnectors()

  const short = useMemo(() => {
    if (!address) return ''
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }, [address])
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-gray-800 pt-5 pb-4">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex flex-shrink-0 items-center px-4">
                    <div className="flex h-16 flex-shrink-0 items-center px-4 text-white font-bold">
                      StarkWill
                    </div>
                  </div>
                  <div className="mt-5 h-0 flex-1 overflow-y-auto">
                    <nav className="space-y-1 px-2">
                      {navigation.map((item, index) => {
                        const ariaCurrent =
                          router.asPath.includes(item.href) && item.href !== "/"
                            ? true
                            : router.pathname === item.href
                              ? true
                              : false;
                        console.log(item.href + ": " + ariaCurrent)
                        return (
                          <Link href={item.href} key={index}>
                            <a
                              key={item.name}
                              className={classNames(
                                ariaCurrent
                                  ? 'bg-gray-900 text-white'
                                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                              )}
                            >
                              <item.icon
                                className={classNames(
                                  ariaCurrent ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                                  'mr-4 flex-shrink-0 h-6 w-6'
                                )}
                                aria-hidden="true"
                              />
                              {item.name}
                            </a>
                          </Link>
                        )
                      })}
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex min-h-0 flex-1 flex-col bg-gray-800">
            <div className="flex h-16 flex-shrink-0 items-center bg-gray-900 px-4 text-white font-bold">
              StarkWill
            </div>
            <div className="flex flex-1 flex-col overflow-y-auto">
              <nav className="flex-1 space-y-1 px-2 py-4">
                {navigation.map((item, index) => {
                  const ariaCurrent =
                    router.asPath.includes(item.href) && item.href !== "/"
                      ? true
                      : router.pathname === item.href
                        ? true
                        : false;
                  return (

                    <Link href={item.href} key={index}>
                      <a
                        key={item.name}

                        className={classNames(
                          ariaCurrent ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                        )}
                      >
                        <item.icon
                          className={classNames(
                            ariaCurrent ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                            'mr-3 flex-shrink-0 h-6 w-6'
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    </Link>
                  )
                })}
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:pl-64">
          <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
            <button
              type="button"
              className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex flex-1 justify-between px-4">
              <div className="flex flex-1">

              </div>
              <div className="ml-4 flex items-center md:ml-6">
                {/* <button
                  type="button"
                  className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button> */}

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>

                    {
                      status === 'disconnected' ? (
                        <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none"><div className='font-medium flex hover:ring-2 focus:ring-2 items-center justify-center gap-2 rounded-xl cursor-pointer text-slate-50 bg-gray-800  px-3 h-[36px] text-sm font-semibold border-none shadow-md whitespace-nowrap'>
                          Connect
                        </div> <span className="sr-only">Open user menu</span></Menu.Button>) :
                        (<Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none"><div className='font-medium flex hover:ring-2 focus:ring-2 items-center justify-center gap-2 rounded-xl cursor-pointer text-slate-50 bg-gray-800  px-3 h-[36px] text-sm font-semibold border-none shadow-md whitespace-nowrap'>
                          {short}
                        </div> <span className="sr-only">Open user menu</span></Menu.Button>
                        )
                    }


                    {/* <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      /> */}

                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {
                        status === 'disconnected' && (
                          <>
                            <Menu.Item key="">
                              <div
                                onClick={() => connect(connectors[0])}
                                className={classNames(
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                {connectors[0].id()}
                              </div>

                            </Menu.Item>
                            <Menu.Item key="">
                              <div
                                onClick={() => connect(connectors[1])}
                                className={classNames(
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                {connectors[1].id()}
                              </div>

                            </Menu.Item>
                          </>
                        )
                      }
                      {status !== 'disconnected' && userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <div
                              onClick={disconnect}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              {item.name}
                            </div>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <main className="flex-1">
            <div className="py-6">

              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                {/* Replace with your content */}
                {children}
                {/* /End replace */}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}