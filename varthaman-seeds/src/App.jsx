import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
// import Products from './components/Products';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        <Hero />

        <div className="container mx-auto px-6 py-16">
          <About />
          {/* <Products /> */}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;