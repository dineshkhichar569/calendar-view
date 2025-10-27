import React, { useState } from 'react';
import { Header } from './Header';
import './page.css';

type User = { name: string };

export const Page: React.FC = () => {
  const [user, setUser] = useState<User | undefined>(undefined);

  return (
    <article>
      <Header
        {...(user ? { user } : {})}  
        onLogin={() => setUser({ name: 'Jane Doe' })}
        onLogout={() => setUser(undefined)}
        onCreateAccount={() => setUser({ name: 'Jane Doe' })}
      />
      <section>
        <h2>Pages</h2>
        <p>
          This is a simple page used by Storybook to demonstrate composition.
        </p>
      </section>
    </article>
  );
};

export default Page;
