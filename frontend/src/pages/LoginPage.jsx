import React from 'react'
import UseLoginUser from '../hooks/UseLoginUser'
import { useState } from 'react'
import { BotMessageSquare, Eye, EyeClosed, Lock, Mail } from 'lucide-react'
import { Link } from 'react-router'

const LoginPage = () => {
  const [showpassword, setshowpassword] = useState(false)
  const [loginData, setloginData] = useState({
    email:"",
    password:"",
  })

  const { loginMutation , error , isPending } = UseLoginUser()

  const handleLogin = (e) => {
    e.preventDefault()
    loginMutation(loginData)
  } 
  return (
    <div className='h-screen flex items-start justify-center p-4 sm:p-6 md:p-8 bg-black'>
      <div className='w-full max-w-5xl flex flex-col lg:flex-row mx-auto border border-primary/25 rounded-xl shadow-lg'>
        {/* left panel   */}
        <div className='w-full lg:w-1/2 py-2 px-4 sm:p-8'>
          {/* logo  */}
          <div className='flex justify-start gap-2 items-center mb-2'>
            <BotMessageSquare className='size-7 text-primary'/>
            <span className='text-2xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-tight'>TaskWise-AI</span>
          </div>

          <div className='w-full'>
            <form onSubmit={handleLogin}>
              <div className='space-y-3.5'>


                <div className='text-xl font-semibold'>
                  <h2>Welcome Back</h2>
                  <p className='text-sm opacity/70'>Sign in to your account to continue</p>
                </div>

                <div className='space-y-2.5'>
                  
                  {/* email input  */}
                  <div className='form-control w-full'>
                    <label className='label'>
                      <span className='label-text'>Email</span>
                    </label>
                    <div className='relative'>
                      <div className='absolute inset-y-3.5 left-0 pointer-events-none items-center pl-3'>
                        <Mail className='size-5 text-base-content/40'/>
                      </div>

                      <input
                       type="text"
                       value={loginData.email}
                       className='input input-bordered pl-10 w-full'
                       placeholder='johndoe@gmail.com'
                       onChange={(e) => setloginData({...loginData,email: e.target.value})}
                      />

                    </div>
                  </div>
                  
                  {/* password  */}
                  <div className='form-control w-full'>
                    <label className='label'>
                      <span className='label-text'>Password</span>
                    </label>
                    <div className='relative'>
                      <div className='absolute inset-y-3.5 left-0 pl-3 pointer-events-none items-center'>
                        <Lock className='size-5 text-base-content/40'/>
                      </div>

                      <input
                       type={showpassword ? "text" : "password"} 
                       value={loginData.password}
                       className='input input-bordered pl-10 w-full'
                       placeholder='********'
                       onChange={(e) => setloginData({...loginData,password: e.target.value})}
                      />

                      <button 
                       onClick={() => setshowpassword(!showpassword)}
                       className='absolute inset-y-3.5 right-0 pr-3 items-center'
                       type='button'
                      >
                        {showpassword ? (<EyeClosed className='size-5 text-base-content/40'/>) : (
                          <Eye className='size-5 text-base-content/40'/>
                        )}
                      </button>
                    </div>
                  </div>

                
                </div>

                <button
                  className=' btn btn-primary w-full'
                  type='submite'
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <span className='loading loading-spinner loading-xs'></span>...loading
                    </>
                  ) : "Sign in"}
                </button>

                <div className='text-center'>
                  Don't have an acccount?{" "}
                  <Link to={'/signup'} className='text-primary hover:underline'>
                    Create one
                  </Link>
                </div>

                
              </div>

            </form>
          </div>


        </div>
        
        {/* right-panel  */}
          <div className='w-full lg:w-1/2 bg-primary/10 items-center justify-center'>
            <div className='max-w-md p-8'>
              <div className='relative aspect-square max-w-sm mx-auto'>
                <img src="/log.png" alt="storypage" className='size-full'/>
              </div>   
            </div>
            <div className='text-center space-y-3 mb-4'>
              <h2 className='text-xl font-semibold'>Get response from specific AI-Model</h2>
              <p className='opacity/10'>
                Connect with specific model to get accurate response
              </p>
            </div>

            
          </div>
        
      </div>
    </div>
  )
}

export default LoginPage