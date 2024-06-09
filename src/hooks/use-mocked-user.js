import { _mock } from 'src/_mock';

// TO GET THE USER FROM THE AUTHCONTEXT, YOU CAN USE

// CHANGE:
// import { useMockedUser } from 'src/hooks/use-mocked-user';
// const { user } = useMockedUser();

// TO:
import { useAuthContext } from 'src/auth/hooks';
import { IMAGE_API } from 'src/config-global';

// ----------------------------------------------------------------------

export function useMockedUser() {
  const { user } = useAuthContext();
  const userData = {
    id: user?.id,
    displayName: `${user?.firstName} ${user?.lastName}`,
    email: user?.email,
    photoURL: `${IMAGE_API}/${user?.avatarUrl}` ?? _mock.image.avatar(24),
    phoneNumber: '+40 777666555',
    country: 'United States',
    address: '90210 Broadway Blvd',
    state: 'California',
    city: 'San Francisco',
    zipCode: '94116',
    about: 'Praesent turpis. Phasellus viverra nulla ut metus varius laoreet. Phasellus tempus.',
    role: 'admin',
    isPublic: true,
  };

  return { user: userData };
}
