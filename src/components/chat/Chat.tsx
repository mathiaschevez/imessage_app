import { Button } from '@chakra-ui/react'
import { signOut } from 'next-auth/react'
import React from 'react'

interface IChatProps {}

const Chat: React.FC<IChatProps> = (props) => {
  return (
    <div>
      <div>CHAT</div>
      <Button color='black' onClick={() => signOut()}>Sign Out</Button>
    </div>
  )
}

export default Chat