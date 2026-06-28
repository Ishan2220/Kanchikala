import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SmoothScrollProvider } from '@/components/SmoothScrollProvider';
import { MainLayout } from '@/layouts/MainLayout';
import { ScrollToTop } from '@/components/ScrollToTop';
import { CatalogProvider } from '@/context/CatalogContext';

// Pages
import Home from '@/pages/Home';
import Collections from '@/pages/Collections';
import CategoryPage from '@/pages/CategoryPage';
import ProductPage from '@/pages/ProductPage';
import AdminPage from '@/pages/AdminPage';

function App() {
  return (
    <CatalogProvider>
      <Router>
        <ScrollToTop />
        <SmoothScrollProvider>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/collections" element={<Collections />} />
              <Route path="/admin" element={<AdminPage />} />
              {/* Dynamic Category routes like /banarasi-sarees */}
              <Route path="/:categorySlug" element={<CategoryPage />} />
              {/* Product routes */}
              <Route path="/product/:productSlug" element={<ProductPage />} />
            </Routes>
          </MainLayout>
        </SmoothScrollProvider>
      </Router>
    </CatalogProvider>
  );
}

export default App;
