import React from 'react'
import Link from 'next/link'
import { useRef, useState, useEffect } from 'react'
import Modal from './Modal'
import { useAuth0 } from '@auth0/auth0-react'

export default function Header() {
  const [isToggled, setIsToggled] = useState(false)
  const [showModal, setShowModal] = React.useState(false)

  const toggleMenu = (ref) => {
    isToggled
      ? menuRef.current.classList.remove('hidden')
      : menuRef.current.classList.add('hidden')
  }

  const closeModal = () => setShowModal(false)

  const menuRef = useRef()
  useEffect(() => {
    toggleMenu(menuRef)
  }, [isToggled])

  const imageLink = /* '/academic-cms' + */ '/icons/icon4.svg'

  const { loginWithRedirect, user, isAuthenticated, logout } = useAuth0()

  return (
    <>
      {showModal && <Modal closeModal={closed} />}
      <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900 mb-7">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <div id="searchDiv">
            <Link href={`/`}>
              <a href="" className="flex items-center">
                <img
                  id="main-icon"
                  src={imageLink}
                  className="mr-3 h-6 sm:h-9"
                />
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                  Academic CMS
                </span>
              </a>
            </Link>
          </div>
          <form>
            <label
              for="default-search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  class="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                class="block w-60 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Title, Topic"
                required
              />
              <button
                id="searchButton"
                type="submit"
                class="text-white absolute bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>

          <button
            onClick={() => setIsToggled(!isToggled)}
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <div
            ref={menuRef}
            className=" hidden p-1 w-full md:block md:w-auto ark:bg-gray-900"
            id="navbar-default"
          >
            <ul
              className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 items-center"
              id="navbar-list "
            >
              {isAuthenticated && (
                <li className="max-md:py-1 max-md:mb-3 max-md:px-0   bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  <a
                    href="../posts/create"
                    className=" block py-2 pr-4 pl-3 text-gray-700 rounded   md:border-0  md:p-0 dark:text-gray-100   "
                  >
                    Create Post
                  </a>
                </li>
              )}
              <li>
                {isAuthenticated ? (
                  <a
                    href=""
                    className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                    aria-current="page"
                    onClick={() => logout()}
                  >
                    Logout
                  </a>
                ) : (
                  <a
                    href=""
                    className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                    aria-current="page"
                    onClick={() => loginWithRedirect()}
                  >
                    Login/Signup
                  </a>
                )}
              </li>
              <li onClick={() => setIsToggled(!isToggled)}>
                <Link
                  href="about"
                  className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  onClick={() => setIsToggled(!isToggled)}
                >
                  About
                </Link>
              </li>

              <li onClick={() => setIsToggled(!isToggled)}>
                <Link
                  href="/contact"
                  className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
