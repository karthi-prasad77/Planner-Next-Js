import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function Home() {
  return (
      <div className='m-10'>
        <Button variant="outline" className='p-4 b-4 shadow-md hover:shadow-xl'>
          Hello
        </Button>
      </div>
  )
}
