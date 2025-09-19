import React from 'react'
import UseAuthUser from '../hooks/UseAuthUser'
import { Link, useLocation } from 'react-router'
import { BotMessageSquare, Notebook, NotebookIcon, NotebookPen } from 'lucide-react'

const Sidebar = () => {
    const { authUser } = UseAuthUser()
    const location = useLocation()
    const currentPath = location.pathname


  return (
    <aside className='w-64 bg-base-200 border-r border-base-300 flex-col sticky top-0 h-screen'>
        <div className='p-4 border-b border-base-300'>
            <Link to={'/'} className='flex items-center justify-start gap-3'>
                <BotMessageSquare className='size-7 text-primary '/>
            </Link>

        </div>

        <nav className='flex-1 space-y-1'>
            <Link
              to={'/'}
              className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case `}
            >
            <Notebook className='size-6 text-base-content/40'/>
            <span className='text-lg'>New chat</span>
            </Link>

            
        </nav>
    </aside>
  )
}

export default Sidebar