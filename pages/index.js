import Head from 'next/head'
import Airdrop from '../components/Airdrop'
import Footer from '../components/Footer'
import Header from '../components/Header'

export default function Home() {
  return (
    <div className="h-full text-gray-200 bg-gradient-to-b from-black via-neutral-900 to-red-900">
      <div className="p-3 sm:px-5">
        <Head>
          <title>Uchiha Token</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
      </div>
      <Airdrop />
      <Footer />
    </div>
  )
}
