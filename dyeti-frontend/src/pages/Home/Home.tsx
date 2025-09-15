import { FormEvent, useState } from 'react';
import * as Ui from './Home.styles';
import { useLogIn } from '@/api/auth/hooks';

const Home = () => {
  const { mutate, isPending, isError, error, isSuccess, data } = useLogIn();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ username, password });
  };

  return (
    <Ui.Container>
      <h1>Home</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Username: </label>
          <input
            type="text"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" disabled={isPending}>
          {isPending ? 'Logging in...' : 'Login'}
        </button>

        {isError && <p style={{ color: 'red' }}>{error.message}</p>}
        {isSuccess && <p style={{ color: 'green' }}>{data?.message}</p>}
      </form>
    </Ui.Container>
  );
};

export default Home;
