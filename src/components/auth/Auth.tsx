import React, { useState } from 'react'
import { Session } from 'next-auth'
import { signIn, signOut } from 'next-auth/react'
import { Button, Center, Stack, Text, Image, Input } from '@chakra-ui/react'
import { useMutation } from '@apollo/client';
import UserOperations from '../../../graphql/operations/user';
import { CreateUsernameData, CreateUsernameVariables } from '../../util/types';
import { toast } from 'react-hot-toast';

interface AuthProps {
  session: Session | null;
  reloadSession: () => void;
}

const Auth: React.FC<AuthProps> = ({ session, reloadSession }) => {
  const [username, setUsername] = useState('')
  
  const [createUsername, { loading, error }] = useMutation<
    CreateUsernameData, 
    CreateUsernameVariables
  >(UserOperations.Mutations.createUsername)

  const onSubmit = async () => {
    if(!username) return

    try {
      const { data } = await createUsername({ variables: { username } })

      if(!data?.createUsername) {
        throw new Error()
      }

      if(data.createUsername.error) {
        const { createUsername: { error } } = data

        throw new Error(error)
      }

      toast.success('Username successfully created! 🚀')
      // Reload session to obtain the new username
      reloadSession()
    } catch (err: any) {
      toast.error(err?.message)
      console.log('Error submitting username', err)
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
            <Button 
              color='black' 
              width='100%' 
              onClick={onSubmit}
              isLoading={loading}
            >
              Save
            </Button>
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