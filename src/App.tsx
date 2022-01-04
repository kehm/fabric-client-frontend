import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import materialTheme from './styles/material-ui';
import Header from './components/Header';
import Nav from './components/Nav';
import Chaincodes from './pages/Chaincodes';
import Identities from './pages/Identities';
import { getIdentities } from './utils/identity';

function App() {
  const [identities, setIdentities] = useState<Array<string> | undefined>(undefined);

  /**
   * Get identities from API
   */
  useEffect(() => {
    if (!identities) {
      const getIds = async () => {
        const ids = await getIdentities();
        setIdentities(ids);
      };
      getIds();
    }
  }, [identities]);

  /**
   * Render Identities component
   *
   * @returns JSX
   */
  const renderIdentities = () => (
    <Identities
      identities={identities || []}
      onChangeIdentity={() => setIdentities(undefined)}
    />
  );

  return (
    <BrowserRouter>
      <ThemeProvider theme={materialTheme}>
        <Header />
        <Nav />
        <Routes>
          <Route path="/" element={renderIdentities()} />
          <Route path="/identities" element={renderIdentities()} />
          <Route path="/chaincodes" element={<Chaincodes identities={identities || []} />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
