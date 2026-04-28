export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute -top-[20%] -left-[15%] w-[55vw] h-[55vw] rounded-full blob-1 bg-primary/30 dark:bg-primary/25 blur-[120px] will-change-transform" />
      <div className="absolute -top-[15%] -right-[20%] w-[50vw] h-[50vw] rounded-full blob-2 bg-secondary/30 dark:bg-secondary/25 blur-[120px] will-change-transform" />
      <div className="absolute -bottom-[25%] left-[10%] w-[60vw] h-[60vw] rounded-full blob-3 bg-secondary/25 dark:bg-secondary/20 blur-[140px] will-change-transform" />
      <div className="absolute -bottom-[20%] -right-[10%] w-[45vw] h-[45vw] rounded-full blob-4 bg-primary/25 dark:bg-primary/20 blur-[120px] will-change-transform" />
    </div>
  )
}
