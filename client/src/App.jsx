import {Routes, Route} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import SignIn from './components/SignIn'
import Admin from './components/Admin'

function App() {

  return (
    <main className='flex flex-col'>
      <Header/>
      <Routes>
      <Route path='/' element={<SignIn/>}/>
      <Route path='/admin' element={<Admin/>}/>
      </Routes>
      
      <Footer/>
    </main>
  )
}

export default App
