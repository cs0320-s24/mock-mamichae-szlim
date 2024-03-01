import { Dispatch, SetStateAction } from 'react';

/**
 * Props for the LoginButton component.
 */

interface loginProps {
  isLoggedIn: boolean
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>
}

/**
 * Component that represents a login button.
 * @param props props for the component.
 * @returns JSX element representing the login button
 */

export function LoginButton(props: loginProps) {

  /**
   * Toggles the login state between logged in/out.
   * @returns the login state value. 
   */

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