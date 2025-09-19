import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router'
import UseSignup from '../hooks/UseSignup'
import { BotMessageSquare, Eye, EyeClosed, Lock, Mail, User } from 'lucide-react'
 
const SignupPage = () => {
  const [showpassword, setshowpassword] = useState(false)
  const [signupData, setsignupData] = useState({
    username: "",
    email:"",
    password:""
  })

  const { signupMutaion , isPending , error } = UseSignup()
  

  const handleSignup = (e) => {
    e.preventDefault()
    signupMutaion(signupData)
  }
  return (
      <div className='h-screen p-2 items-center justify-center sm:p-4 md:p-6 bg-black'>
        <div className='w-full max-w-5xl flex flex-col lg:flex-row mx-auto border border-primary/25 rounded-xl shadow-lg '>

        {/* left-Panel */}
        <div className='w-full lg:w-1/2 py-2 px-4 sm:p-8 flex flex-col'>

          {/* logo */}
          <div className='flex items-center gap-2 mb-2 justify-start'>
            <BotMessageSquare className='size-7 text-primary'/>
            <span className='text-2xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary'>
              TaskWise-AI
            </span>
          </div>

            {error && (
              <span className='text-red-500'>{error.message?.data?.message || error.message}</span>
            )}  

            {/* form  */}
            <div className='w-full'>
              <form onSubmit={handleSignup}>

                <div className='space-y-3'>

                  <div className='text-xl font-semibold'>
                    <h2>Create an Account</h2>
                    <p className='text-sm opacity-70'>
                      Join TaskWise-AI and get precise response
                    </p>
                  </div>
                
                <div className='space-y-2'>
                  
                  {/* input-field  */}
                  {/* username  */}
                  <div className='form-control w-full'>
                    <label className='label'>
                      <span className='label-text'>Username</span>
                    </label>

                    <div className='relative'>
                      <div className='absolute inset-y-3.5 pl-3 left-0 items-center pointer-events-none'>
                        <User className='size-5 text-base-content/40'/>
                      </div>

                      <input 
                        type="text"
                        value={signupData.username}
                        placeholder='John Doe'
                        className='input input-bordered w-full pl-10'
                        onChange={(e) => setsignupData({
                          ...signupData,username:e.target.value
                        })}
                      />
                    </div>

                  </div>

                  {/* email input  */}
                  <div className='form-control w-full'>
                    <label className='label'>
                        <span className='label-text'>Email</span>
                    </label>
                  </div>
                  
                  <div className='relative'>
                    <div className='absolute inset-y-3.5 left-0 pl-3 pointer-events-none items-center' >
                        <Mail className='size-5 text-base-content/40'/>
                    </div>

                    <input 
                      type="email"
                      value={signupData.email}
                      placeholder='johndoe@gmail.com'
                      className='input input-bordered pl-10 w-full'
                      onChange={(e) => setsignupData({...signupData,email: e.target.value})}
                     />
                  </div>
                  
                  {/* password  */}
                  <div className='form-control w-full'>
                    <div className='label'>
                        <span className='label-text'>Password</span>
                    </div>

                    <div className='relative'>
                      <div className='absolute inset-y-3 left-0 pl-3 pointer-events-none'>
                        <Lock className='size-5 text-base-content/40'/>
                      </div>

                      <input
                     type={showpassword ? "text" : "password"}
                     value={signupData.password}
                     className='input input-bordered pl-10 w-full'
                     placeholder='********'
                     onChange={(e) => setsignupData({...signupData,password: e.target.value})}
                    />
                    
                    <button 
                      onClick={() => setshowpassword(!showpassword)} 
                      className='absolute inset-y-0 right-0 pr-3 flex items-center'
                    >
                      {
                        showpassword ? 
                        <EyeClosed className='size-5 text-base-content/40'/> :
                        <Eye className='size-5 text-base-content/40 '/>
                      }
                    </button>
                    </div>

                    
                  </div>
                  <div className='form-control '>
                    <label className='label cursor-pointer justify-start gap-2'>
                      <input
                       type="checkbox" 
                       className='checkbox checkbox-sm'
                       required
                      />

                      <span className='text-sm leading-tight'>
                        I agree to the {" "}
                        <span className='text-primary hover:underline'>
                          Terms of service
                        </span> and {" "}
                        <span className='text-primary hover:underline'>privacy policy</span>
                      </span>
                    </label>

                  </div>
                  
                </div>

                <button className='btn btn-primary  w-full' type='submit' disabled={isPending}>
                  {isPending ? (
                    <>
                    <span className='loading loading-spinner loading-xs'></span>
                    loading...
                    </>
                  ) : (
                    'Signup'
                  )}    
                </button>

                <div className='text-center '>
                  Already have an account{" "}
                  <Link to='/login' className='text-primary hover:underline'>
                    Sign in
                  </Link>
                </div>
                </div>


              </form>


            </div>
          
        </div>

        <div className='w-full lg:w-1/2 bg-primary/10 items-center justify-center'>
          <div className='max-w-md p-8 '>
            <div className='relative aspect-square max-w-sm mx-auto'>
              <img src="/storyset.png" alt="storypage" className='size-full'/>
            </div>      
          </div>

          <div className='text-center space-y-3 mt-2'>
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

export default SignupPage