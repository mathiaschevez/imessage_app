import { Button } from '@chakra-ui/react'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'

interface IChatProps {}

const Chat: React.FC<IChatProps> = (props) => {
  const { data: session } = useSession()

  return (
    <div>
      <div style={{display: 'flex', flexDirection: 'column', width: '200px', alignItems: 'center',borderRight: '1px solid white', height: '100vh', padding: '10px', justifyContent: 'space-between'}}>
        {session?.user.username && 
          <div style={{fontSize: '18px'}}>Hello, {session.user.username}!</div>
        }
        <Button style={{width: '100%'}} color='black' onClick={() => signOut()}>Sign Out</Button>
      </div>
    </div>
  )
}

export default Chat