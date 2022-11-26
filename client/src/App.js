import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';
import Homepage from './pages/Homepage';
import Addiction from './pages/Addiction';
import Chronic from './pages/Chronic';
import Grief from './pages/Grief';
import Mental from './pages/Mental';
import Physical from './pages/Physical';
import PTSD from './pages/PTSD';
import Userpage from './pages/Userpage';
import AppNavbar from './components/Navbar';

const Http = createHttpLink({
  uri: '/graphql',
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
    link: authLink.concat(Http),
    cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <>
        <AppNavbar />
        <Routes>
          <Route 
            path='/' 
            element={<Homepage />} 
          />
          {/* <Route 
            path='' 
            element={<Addiction />} 
          />
          <Route 
            path='' 
            element={<Chronic />} 
          />
          <Route 
            path=''
            element={<Grief />}
          />
          <Route 
            path=''
            element={<Mental />}
          />
          <Route 
            path=''
            element={<Physical />}
          />
          <Route 
            path=''
            element={<PTSD />}
          />
          <Route 
            path=''
            element={<Userpage />}
          /> */}
        </Routes>
      </>
    </Router>
    </ApolloProvider>
  );
}

export default App;