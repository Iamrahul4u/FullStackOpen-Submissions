function Login({ handleLogin, username, password, setUsername, setPassword }) {
  return (
    <div>
      <form onSubmit={handleLogin}>
        <h2>Login to application</h2>
        <div>
          username
          <input
            type='text'
            id='username'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id='password'
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  );
}

export default Login;
