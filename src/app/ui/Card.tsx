export const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-default-100/50 backdrop-blur-md rounded-2xl p-6 m-auto w-1/2 lg:w-full text-left border border-default-200 shadow-lg shadow-black/5 dark:shadow-black/20 hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/30 hover:scale-[1.02] transition-all duration-300 ease-in-out hover:bg-default-100/70">
      {children}
    </div>
  )
}
