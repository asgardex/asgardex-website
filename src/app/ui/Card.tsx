export const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-default-100/50 backdrop-blur-md rounded-2xl p-4 m-auto w-1/2 lg:w-full text-left border border-default-200">
      {children}
    </div>
  )
}
