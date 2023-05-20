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
          <Link href={`/`}>
            <a href="" className="flex items-center">
              <img id="main-icon" src={imageLink} className="mr-3 h-6 sm:h-9" />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                Academic CMS
              </span>
            </a>
          </Link>
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
                    onClick={() => console.log(isAuthenticated)}
                  >
                    Create Post
                  </a>
                </li>
              )}
              <li>
                {isAuthenticated ? (
                  <a
                    href="#"
                    className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                    aria-current="page"
                    onClick={() => logout()}
                  >
                    Logout
                  </a>
                ) : (
                  <a
                    className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                    aria-current="page"
                    onClick={() => loginWithRedirect()}
                  >
                    Login/Signup
                  </a>
                )}
              </li>
              <li>
                <Link
                  href="about"
                  className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  About
                </Link>
              </li>

              <li>
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
