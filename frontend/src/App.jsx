import React from 'react'
import { Navigate , Routes , Route } from 'react-router'
import UseAuthUser from './hooks/UseAuthUser'
import PageLoader from './components/PageLoader'
import HomePage from './pages/HomePage'
import LandingPage from './pages/LandingPage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import toast, { Toaster } from 'react-hot-toast'

const App = () => {

  const { isLoading , authUser } = UseAuthUser()
  const isAuthenticated = Boolean(authUser)
  
  if(isLoading) return <PageLoader/>
  
  return (
    <div className='min-h-screen'>
      <Routes>
        <Route path='/landing' element={!isAuthenticated ? <LandingPage/> : <Navigate to={'/'} />} />
        <Route path='/signup' element={!isAuthenticated ? <SignupPage/> : <Navigate to={'/'} /> } />
        <Route path='/' element={isAuthenticated ? <HomePage/> : <Navigate to={'/landing'}/> } />
        <Route path='/login' element={!isAuthenticated ? <LoginPage/> : <Navigate to={'/'}/>}/>
        <Route path='/profile' element={isAuthenticated ? <ProfilePage/> : <Navigate to={'/login'} />} />
      </Routes> 
      <Toaster/>
    </div>
  )
}

export default App