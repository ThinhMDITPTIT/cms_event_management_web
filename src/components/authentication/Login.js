import React from 'react';

export default function Login(props) {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    // handleSignUp,
    // hasAccount,
    // setHasAccount,
    emailError,
    passwordError,
  } = props;

  return (
    <section className='login'>
      <div className='loginContainer'>
        <h1>Welcome to EvM CMS !!!</h1>
        <label>Username</label>
        <input
          type='text'
          autoFocus
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className='errorMsg'>{emailError}</p>

        <label>Password</label>
        <input
          type='password'
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className='errorMsg'>{passwordError}</p>

        <div className='btnContainer'>
          {/* {hasAccount ? ( */}
          <>
            <button className='buttonLogin_out' onClick={handleLogin}>
              Sign In
            </button>
            {/* <p>
              Don't have an account?
              <span onClick={setHasAccount(!hasAccount)}>Sign Up</span>
            </p> */}
          </>
          {/* ) : (
            <>
              <button onClick={handleSignUp}>Sign Up</button>
              <p>
                Have an account?
                <span onClick={setHasAccount(!hasAccount)}>Sign In</span>
              </p>
            </>
          )} */}
        </div>
      </div>
    </section>
  );
}
