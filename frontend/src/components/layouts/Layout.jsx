import Header from '../layouts/Header/Header.jsx';
const Layout = ({children}) => {
    return (
      <>
      <Header/>
        {
            children
        }
      </>
    );
  }
  
export default Layout;