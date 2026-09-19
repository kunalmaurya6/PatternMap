import Authentication from '../components/auth'
import {Routes,Route} from 'react-router-dom';
import Home from '../components/Home';

const Navigation = () => {
  
   return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/auth" element={<Authentication />} />
    </Routes>
  )
}

export default Navigation;