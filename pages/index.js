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
        <h1>Random Fake Data!</h1>

        <ul className="categories">
          <li><Link href="/persons">Persons</Link></li>
          <li><Link href="/credit-cards">Credit Cards</Link></li>
          <li><Link href="/users">Users</Link></li>
          <li><Link href="/images">Images</Link></li>
          <li><Link href="/places">Places</Link></li>
          <li><Link href="/books">Books</Link></li>
          <li><Link href="/products">Products</Link></li>
          <li><Link href="/companties">Companies</Link></li>
          <li><Link href="/texts">Texts</Link></li>
          <li><Link href="/custom">Custom</Link></li>
        </ul>
      </div>
    </>
  )
}
