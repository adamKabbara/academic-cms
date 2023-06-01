import { useEffect, useRef } from 'react'
import saveFile from '../../utils/saveFile'

function Create() {
  const fileInput = useRef(null)
  const thumbnailInput = useRef(null)
  const firstNameInput = useRef('')
  const lastNameInput = useRef('')
  const titleInput = useRef('')
  const excerptInput = useRef('')
  const topicInput = useRef('')

  const uploadFile = async () => {
    const file = fileInput.current.files[0]
    const thumbnail = thumbnailInput.current.files[0]

    var data = new FormData()
    data.append(
      'author',
      `${firstNameInput.current.value} ${lastNameInput.current.value}`
    )
    data.append('file', file)
    data.append('thumbnail', thumbnail)
    data.append('excerpt', excerptInput.current.value)
    data.append('title', titleInput.current.value)
    data.append('topic', topicInput.current.value)

    const info = await fetch(
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/api/convert'
        : 'https://academic-cms.vercel.app/api/convert',
      {
        method: 'POST',
        body: data,
      }
    )

    await saveFile(info.file, info.author, info.title, info.excerpt, info.topic)

    const imageData = new FormData()
    imageData.append('image', thumbnail)
    imageData.append('title', titleInput.current.value)

    await fetch(
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/api/postImage'
        : 'https://academic-cms.vercel.app/api/postImage',
      {
        method: 'POST',
        body: data,
      }
    )
  }

  return (
    <div className="mt-8 w-full flex flex-col items-center justify-center">
      <h1 className="text-xl pb-10 font-semibold ">Create Post</h1>
      <form
        className="w-1/2 max-w-260 max-sm:w-full max-md:w-2/3"
        onSubmit={(e) => {
          e.preventDefault()
          uploadFile()
        }}
      >
        <div className="w-full px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2"
            htmlFor="grid-first-name"
          >
            First Name
          </label>
          <input
            className="appearance-none block w-full bg-gray-1000 text-gray-1100 border border-gray-600 rounded py-2 px-4 mb-3 leading-tight focus:outline-none  min-w-fit mt-3 focus:border-gray-500"
            id="grid-first-name "
            type="text"
            placeholder="Jane"
            ref={firstNameInput}
            required
          />
        </div>
        <div className="w-full  px-3 mb-6 md:mb-0 mt-6">
          <label
            className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2"
            htmlFor="grid-last-name"
          >
            Last Name
          </label>
          <input
            className="appearance-none block w-full bg-gray-1000 text-gray-1100 border border-gray-600 rounded py-2 px-4 leading-tight focus:outline-none  focus:border-gray-500 mb-3 mt-3 required "
            id="grid-last-name"
            type="text"
            placeholder="Doe"
            ref={lastNameInput}
            required
          />
        </div>

        <div className="w-full px-3 mb-6 md:mb-0 mt-6">
          <label
            className="block uppercase tracking-wide text-xs font-bold mb-2"
            htmlFor="grid-state"
          >
            Topic
          </label>
          <div className="relative ">
            <select
              className="block appearance-none w-full  border border-gray-600 bg-gray-1000 text-gray-1100 py-1 px-4 pr-8 rounded  focus:outline-none  focus:border-gray-500 mt-3 "
              id="grid-state"
              ref={topicInput}
              defaultValue="def"
            >
              <option value="def" disabled>
                Select your topic
              </option>
              <option>Information Technology</option>
              <option>Law</option>
              <option>Engineering</option>
              <option>Medicine</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-300">
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
            className="block uppercase tracking-wide text-gray-00 text-xs font-bold mb-2"
            htmlFor="grid-last-name"
          >
            Title
          </label>
          <input
            className="appearance-none block w-full bg-gray-1000 text-gray-1100 border border-gray-600 rounded py-2 px-4 leading-tight focus:outline-none focus:border-gray-500 mb-3 mt-3 focus:border-gray-500"
            type="text"
            placeholder="Use of AI in Robotics"
            ref={titleInput}
            required
          />
        </div>
        <div className="w-full  px-3 mb-6 md:mb-0 mt-6">
          <label
            className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2"
            htmlFor="grid-last-name"
          >
            Excerpt
          </label>
          <input
            className="appearance-none block w-full bg-gray-1000 text-gray-1100 border border-gray-600 rounded py-2 px-4 leading-tight focus:outline-none focus:border-gray-500 mb-3 mt-3 focus:border-gray-500"
            id="grid-last-name"
            type="text"
            placeholder="There wasn't a whole lot more that could be done. It had become a wait-and-see situation with the final results no longer in her control."
            ref={excerptInput}
            required
          />
        </div>
        <div className="w-full  px-3 mb-6 md:mb-0 mt-6">
          <label
            className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2"
            htmlFor="file_input"
          >
            Upload file (.docx)
          </label>
          <input
            className="block w-full text-sm bg-gray-1000 text-gray-1100 border border-gray-300 rounded  text-gray-300 border border-gray-600 rounded  leading-tight focus:outline-none focus:border-gray-500 mb-3 mt-3 focus:border-gray-500"
            id="uploadedFile"
            type="file"
            ref={fileInput}
            required
          />
        </div>
        <div className="w-full  px-3 mb-6 md:mb-0 mt-6">
          <label
            className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2"
            htmlFor="file_input"
          >
            Upload Thumbnail (.JPG, .PNG)
          </label>
          <input
            className="block w-full text-sm bg-gray-1000 text-gray-1100 border border-gray-300 rounded  text-gray-300 border border-gray-600 rounded  leading-tight focus:outline-none focus:border-gray-500 mb-3 mt-3 focus:border-gray-500"
            id="uploadedFile"
            type="file"
            ref={thumbnailInput}
            required
          />
        </div>
        <div className="w-full px-3 mb-6 md:mb-0 mt-6">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default Create
