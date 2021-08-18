import React, { useEffect, useRef, useState } from 'react';

const UseRefHookExplained = (props) => {
  // Creating refs for username and password
  const userNameRef = useRef(null);
  const passwordRef = useRef(null);

  // We are also creating a reference to the Login button
  const submitBtnRef = useRef(null);
  const [value, setValues] = useState({
    username: '',
    password: '',
  });
  // useEffect to set the initial focus to the user name input
  useEffect(() => {
    userNameRef.current.focus();
  }, []);

  // This function is used to handle the key press.
  // Whenever user hits enter it moves to the next element
  const handleKeyPress = (e, inputType) => {
    if (e.key === 'Enter') {
      switch (inputType) {
        // Checks if Enter pressed from the username field?
        case 'username':
          // Moves the focus to the password input field
          passwordRef.current.focus();
          break;
        // Checks if Enter pressed from the password field?
        case 'password':
          // Moves the focus to the submit button
          submitBtnRef.current.focus();
          e.preventDefault();
          break;
        default:
          break;
      }
    }
  };

  // Function to handle the submit click from the button
  const handleSubmit = () => {
    // alert("submitted");
    console.log(value);
  };

  // getting the style as prop from the parent.
  // Basic style to center the element and apply a bg color
  const { style } = props;
  return (
    <div style={style}>
      <h2>Example for using useRef Hook</h2>
      <h3>Login</h3>
      <input
        type='text'
        name='username'
        ref={userNameRef}
        onKeyDown={(e) => handleKeyPress(e, 'username')}
        onChange={(e) => setValues({ ...value, username: e.target.value })}
      />
      <input
        type='password'
        name='password'
        ref={passwordRef}
        onKeyDown={(e) => handleKeyPress(e, 'password')}
        onChange={(e) => setValues({ ...value, password: e.target.value })}
      />
      <button ref={submitBtnRef} onClick={handleSubmit}>
        Login
      </button>
    </div>
  );
};

export default UseRefHookExplained;
