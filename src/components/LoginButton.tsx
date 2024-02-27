import { Dispatch, SetStateAction } from 'react';


interface loginProps {
  isLoggedIn: boolean
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>
}

export function LoginButton(props: loginProps) {

  const authenticate = () => {
    const newValue = !props.isLoggedIn
    props.setIsLoggedIn(newValue)
    return newValue
  }

  if (props.isLoggedIn) {
    return (
      <div>
        <p>You are logged in</p>
        <button aria-label="Sign Out" onClick={authenticate}>
          Sign out
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <p>You are not logged in. Log in below.</p>
        <button aria-label='Login' onClick={authenticate}>Login</button>
      </div>
    )
  }
}