import { useEffect, useRef } from 'react'

function Create() {
  const fileInput = useRef(null)
  const firstNameInput = useRef('')
  const lastNameInput = useRef('')

  const uploadFile = () => {
    const file = fileInput.current.files[0]

    var data = new FormData()
    data.append(
      'author',
      `${firstNameInput.current.value} ${lastNameInput.current.value}`
    )
    data.append('file', file)

    fetch('/api/convert', {
      method: 'POST',
      body: data,
    })
    // .then((response) => response.json())
    // .then((data) => {
    //   console.log(data)
    // })
  }

  return (
    <div className="mt-20 w-full flex items-center justify-center">
      <form
        className="w-1/2 max-w-260 max-sm:w-full max-md:w-2/3"
        onSubmit={(e) => {
          e.preventDefault()
          uploadFile()
        }}
      >
        {/* <div class="flex flex-wrap -mx-3 mb-6"> */}
        <div className="w-full px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-first-name"
          >
            First Name
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white min-w-fit mt-3"
            id="grid-first-name"
            type="text"
            placeholder="Jane"
            ref={firstNameInput}
          />
        </div>
        <div className="w-full  px-3 mb-6 md:mb-0 mt-6">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-last-name"
          >
            Last Name
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-3 mt-3"
            id="grid-last-name"
            type="text"
            placeholder="Doe"
            ref={lastNameInput}
          />
        </div>

        <div className="w-full px-3 mb-6 md:mb-0 mt-6">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-state"
          >
            Category
          </label>
          <div className="relative ">
            <select
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded  focus:outline-none focus:bg-white focus:border-gray-500 mt-3"
              id="grid-state"
            >
              <option>Information Technology</option>
              <option>Law</option>
              <option>Engineering</option>
              <option>Medicine</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="w-full  px-3 mb-6 md:mb-0 mt-6">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="file_input"
          >
            Upload file
          </label>
          <input
            className="  block w-full text-sm text-gray-900 border border-gray-300 rounded bg-gray-200 text-gray-700 border border-gray-200 rounded  leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-3 mt-3"
            id="uploadedFile"
            type="file"
            ref={fileInput}
            required
          />
        </div>
        <div className="w-full px-3 mb-6 md:mb-0 mt-6">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  )
}

export default Create
