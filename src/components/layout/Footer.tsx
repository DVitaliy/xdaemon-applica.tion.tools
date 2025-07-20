export default function FooterLayout() {
  return (
    <footer className="container mx-auto text-center bg-amber-500 sm:bg-red-500  xl:bg-purple-500">
      <p>&copy; {new Date().getFullYear()} Blazar Labs</p>
    </footer>
  )
}
