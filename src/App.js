
import './App.css';

import Title from './components/title'
import TArea from './components/textarea'

function App() {
  return (
    <>
      {/* Primary Container */}
      <div className="h-screen w-screen bg-white flex flex-col justify-center items-center" id='master-container'>
        <img src="/Users/siddharthasrivastava/Developer/ReactTuts/textutils/public/paper.png" className='absolute -z-10 object-fill' />
        <Title />
        <TArea />
      </div>
    </>

  );
}

export default App;
