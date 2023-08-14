import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
//import styles from '@/styles/Home.module.css'

import Header from '@/components/layouts/Header'
import Neko from '@/components/Neko'

import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <div className="container">
        <div className="categories">
          <div className="category">
            <Link href="/persons">Persons</Link>
          </div>
          <div className="category cc-icon">
            <Link href="/credit-cards">Credit Cards</Link>
          </div>
          <div className="category users-icon">
            <Link href="/users">Users</Link>
          </div>
          <div className="category content-icon">
            <Link href="/texts">Texts</Link>
          </div>
        </div>

      </div>
    </>
  )
}
