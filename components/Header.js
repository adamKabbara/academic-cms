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

  const imageLink = '/icons/icon4.svg'

  const { loginWithRedirect, user, isAuthenticated, logout } = useAuth0()

  return (
    <>
      {showModal && <Modal closeModal={closed} />}
      <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900 mb-7">
        <div className=" flex flex-wrap justify-between items-center mx-auto">
          <div id="searchDiv">
            <Link href="/">
              <a className="flex items-center">
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
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                id="default-search"
                type="search"
                name="title"
                className="block w-60 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Title, Topic"
                required
              />
              <button
                formAction="/search"
                id="searchButton"
                type="submit"
                className="text-white absolute bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
          <div className="flex mdlg:hidden">
            <button id="translateButton" className="mdlg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-translate"
                viewBox="0 0 16 16"
              >
                <path d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286H4.545zm1.634-.736L5.5 3.956h-.049l-.679 2.022H6.18z" />
                <path d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2zm7.138 9.995c.193.301.402.583.63.846-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6.066 6.066 0 0 1-.415-.492 1.988 1.988 0 0 1-.94.31z" />
              </svg>
            </button>

            <button
              onClick={() => setIsToggled(!isToggled)}
              data-collapse-toggle="navbar-default"
              type="button"
              className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg mdlg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
          </div>
          <div
            ref={menuRef}
            className=" hidden p-1 w-full mdlg:block mdlg:w-auto ark:bg-gray-900"
            id="navbar-default"
          >
            <ul
              className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 mdlg:flex-row mdlg:space-x-8 mdlg:mt-0 mdlg:text-sm mdlg:font-medium mdlg:border-0 mdlg:bg-white dark:bg-gray-800 mdlg:dark:bg-gray-900 dark:border-gray-700 items-center"
              id="navbar-list "
            >
              <button id="translateButton" className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-translate"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286H4.545zm1.634-.736L5.5 3.956h-.049l-.679 2.022H6.18z" />
                  <path d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2zm7.138 9.995c.193.301.402.583.63.846-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6.066 6.066 0 0 1-.415-.492 1.988 1.988 0 0 1-.94.31z" />
                </svg>
              </button>
              {isAuthenticated && (
                <li className="max-mdlg:py-2 max-mdlg:mb-3 max-mdlg:px-0   bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  <a
                    href="../posts/create"
                    className=" block max-mdlg:px-2  text-gray-700 rounded   mdlg:border-0   dark:text-gray-100   "
                  >
                    Create Post
                  </a>
                </li>
              )}
              <li>
                {isAuthenticated ? (
                  <a
                    href=""
                    className="block py-2 pr-4 pl-3 text-blue-700 rounded hover:bg-gray-100 mdlg:hover:bg-transparent mdlg:border-0 mdlg:hover:text-blue-700 mdlg:p-0  "
                    aria-current="page"
                    onClick={() => logout()}
                  >
                    Logout
                  </a>
                ) : (
                  <a
                    href=""
                    className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded mdlg:bg-transparent mdlg:text-blue-700 mdlg:p-0 dark:text-white"
                    aria-current="page"
                    onClick={() => loginWithRedirect()}
                  >
                    Login/Signup
                  </a>
                )}
              </li>
              <li onClick={() => setIsToggled(!isToggled)}>
                <a
                  href="about"
                  className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 mdlg:hover:bg-transparent mdlg:border-0 mdlg:hover:text-blue-700 mdlg:p-0 dark:text-gray-400 mdlg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white mdlg:dark:hover:bg-transparent"
                  onClick={() => setIsToggled(!isToggled)}
                >
                  About
                </a>
              </li>

              <li onClick={() => setIsToggled(!isToggled)}>
                <Link
                  href="/contact"
                  className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 mdlg:hover:bg-transparent mdlg:border-0 mdlg:hover:text-blue-700 mdlg:p-0 dark:text-gray-400 mdlg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white mdlg:dark:hover:bg-transparent"
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
