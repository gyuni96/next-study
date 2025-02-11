type ButtonProps = {
  children: React.ReactNode
  buttonClick?: () => void
}

const Button = ({ children, buttonClick }: ButtonProps) => {
  return (
    <button
      onClick={buttonClick}
      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
    >
      {children}
    </button>
  )
}

export default Button
