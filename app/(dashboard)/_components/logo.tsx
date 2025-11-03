import Image from 'next/image'

const Logo = () => {
  return (
    <div className="transition-all duration-300 hover:scale-105">
      <Image 
        src="/logo.svg" 
        alt="logo" 
        width={130} 
        height={130}
        className="drop-shadow-[0_0_10px_rgba(0,188,212,0.3)] dark:drop-shadow-[0_0_15px_rgba(0,188,212,0.4)]"
      />
    </div>
  )
}

export default Logo
