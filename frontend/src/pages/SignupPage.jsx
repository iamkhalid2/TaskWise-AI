import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { useState } from 'react'
import { signup } from '../libs/api'
import UseSignup from '../hooks/UseSignup'
import { BotMessageSquare, House, User } from 'lucide-react'
 
const SignupPage = () => {
  const [showpassword, setshowpassword] = useState(false)
  const [signupData, setsignupData] = useState({
    username: "",
    email:"",
    pasword:""
  })

  const {signupMutaion , isPending , error } = UseSignup()
  

  const handleSignup = (e) => {
    e.preventDefault()
    signupMutaion(signupData)
  }
  return (
      <div className='h-screen p-4 items-center justify-center sm:p-6 md:p-8 bg-black'>
        <div className='w-full max-w-5xl flex flex-col lg:flex-row mx-auto border border-primary/25 rounded-xl shadow-lg '>
        {/* left-Panel */}
        <div className='w-full lg:w-1/2 p-4 sm:p-8 flex flex-col'>
          {/* logo */}
          <div className='flex items-center gap-2 mb-4 justify-start'>
            <BotMessageSquare className='size-7 text-primary'/>
            <span className='text-2xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary'>
              TaskWise-AI
            </span>

            {error && (
              <div className='alert alert-error mt-2'>
                {error.message?.data?.message || error.message}
              </div>
            )}

            {/* form  */}
            <div className='w-full'>
              <form onSubmit={handleSignup}>

                <div className='space-y-4'>

                  <div className='text-xl font-semibold'>
                    <h2>Create an Account</h2>
                    <p className='text-sm opacity-70'>
                      Join TaskWise-AI and get precise response
                    </p>
                  </div>
                
                <div className='space-y-3'>
                  
                  {/* input-field  */}
                  {/* username  */}
                  <div className='form-control w-full'>
                    <label className='label'>
                      <span className='label-text'>Username</span>
                    </label>

                    <div className='relative'>
                      <div className='absolute inset-y-0 left-0 items-center pointer-events-none'>
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

                  <div className='form-control w-full'>
                    <label className='label'>
                        <span className='label-text'>Email</span>
                    </label>
                  </div>
                  
                  <div className='relative'>
                    <div className='absolute inset-y-0 left-0 ' >

                    </div>
                  </div>
                  
                </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        </div>
      </div>
  )
}

export default SignupPage