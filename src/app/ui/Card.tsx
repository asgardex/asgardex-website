export const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-asgardex-gray-100 bg-opacity-10 backdrop-blur-md rounded-2xl p-4 m-auto w-1/2 lg:w-full text-left">
      <div className="invert">{children}</div>
    </div>
  )
}
