import { Spinner } from '@nextui-org/react'

export default function Loading() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center space-y-4">
        <Spinner
          size="lg"
          color="primary"
          label="Loading release information..."
          labelColor="foreground"
        />
        <p className="text-foreground/60">Fetching the latest Asgardex releases</p>
      </div>
    </main>
  )
}
