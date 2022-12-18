import React, { useState } from 'react'
import { Session } from 'next-auth'
import { signIn, signOut } from 'next-auth/react'
import { Button, Center, Stack, Text, Image, Input } from '@chakra-ui/react'

interface IAuthProps {
  session: Session | null;
  reloadSession: () => void;
}

const Auth: React.FC<IAuthProps> = ({ session, reloadSession }) => {
  const [username, setUsername] = useState('')

  const onSubmit = async () => {
    try {
      //create username mutation to send username to graphql api
      console.log('save')
    } catch (err) {
      console.log('Error submitting username')
    }
  }

  return (
    <Center height='100vh'>
      <Stack align='center' spacing={9}>
        {session ? 
          <>
            <Text fontSize='3xl'>Create a Username</Text>
            <Input 
              placeholder='Enter a username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button color='black' width='100%' onClick={onSubmit}>Save</Button>
            <Button onClick={() => signOut()}>Sign Out</Button>
          </> :
          <>
            <Text fontSize='3xl'>Sign In</Text>
            <Button 
              onClick={() => signIn('google')}
              color='black'
              leftIcon={<Image alt='Google' height='20px' src='images/googleLogo.png'/>}
            >
              Continue with Google
            </Button>
          </>
        }
      </Stack>
    </Center>
  )
}

export default Auth