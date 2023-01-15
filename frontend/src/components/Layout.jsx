import React from 'react'

const Layout = ({ children, title }) => {
  return (
    <div className='flex flex-col justify-between min-h-screen'>
        <div>
            <header className='border-b py-4'>
              <div className="container">
                <h1>{ title ?? `MERNchat`}</h1>
              </div>
            </header>
            <main>
                {children}
            </main>
        </div>
        <footer className='border-t py-4'></footer>
    </div>
  )
}

export default Layout