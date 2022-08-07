function Footer() {
  return (
    <div className="flex flex-col justify-center items-center py-10">
      <h1 className=" font-semibold sm:text-2xl">
        © 2022 All rights reserved | Built by{' '}
        <a
          href="https://github.com/tanim0la?tab=repositories"
          className="text-black hover:text-red-600 cursor-pointer italic"
          target="_blank"
          rel="noreferrer"
        >
          tanim0la
        </a>
      </h1>
    </div>
  )
}

export default Footer
