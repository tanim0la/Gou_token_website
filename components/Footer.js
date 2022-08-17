import { GoMarkGithub } from 'react-icons/go'

function Footer() {
  return (
    <div className="max-w-full">
      <div className="flex flex-row justify-center items-center py-14 font-semibold sm:text-2xl md:pt-36 ">
        <h1 className=" font-semibold sm:text-2xl">
          © 2022 All rights reserved | Built by{' '}
        </h1>
        <a
          href="https://github.com/tanim0la?tab=repositories"
          className=" text-black hover:text-red-600 cursor-pointer italic"
          target="_blank"
          rel="noreferrer"
        >
          <div className="flex flex-row text-lg sm:text-2xl">
            <span className="px-1">tanim0la</span>
            <GoMarkGithub className="mt-1" />
          </div>
        </a>
      </div>
    </div>
  )
}

export default Footer
