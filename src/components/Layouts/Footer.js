import React from 'react'

export default function Footer() {
  const year = new Date().getFullYear() 
  return (
    <footer className="py-1">
    <p className="text-center text-dark mt-1">
      {`AMAZON - ${year} All Rights Reserved`}
    </p>
  </footer>
  )
}
