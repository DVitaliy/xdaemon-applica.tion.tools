export default function FooterLayout() {
  return (
    <footer className="container mx-auto mt-5 text-center text-gray-400 text-sm">
      <p>&copy; {new Date().getFullYear()}</p>
    </footer>
  )
}
