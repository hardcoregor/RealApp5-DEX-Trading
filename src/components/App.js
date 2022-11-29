import '../App.css';
import Navbar from './Navbar';

function App() {
  return (
    <div className='h-full overflow-hidden'>
      <Navbar />
      <main className='flex h-full'>
        <section className='main-left-bg w-1/4 h-full'>1</section>
        <section className='main-right-bg w-3/4'>2</section>
      </main>
    </div>
  );
}

export default App;
