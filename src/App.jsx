import { Outlet } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function App() {
  return (
    <div className="flex flex-col">
        <Header />

        <main className="flex-1">
          <Outlet />
        </main>
        
        <Footer />
    </div>
  )
}
