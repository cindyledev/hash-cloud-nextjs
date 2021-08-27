import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <p>Copyright &copy; DJ Events 2021</p>
      <p>
        <Link href='/about'>About this project</Link>
      </p>
    </footer>
  )
}