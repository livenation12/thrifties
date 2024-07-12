import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
//pages
import Auth from './pages/auth/Auth'
import { Toaster } from './components/ui/toaster'
import { AuthProvider } from './hooks/useAuth'
import AdminAuth from './admin/pages/AdminAuth'
import RootLayout from './admin/RootLayout'
import Dashboard from './admin/features/dashboard/Dashboard'
import Products from './admin/features/products/Products'
import ManageProducts from './admin/features/products/ManageProducts'
import SoldProducts from './admin/features/products/SoldProducts'
import AvailableProducts from './admin/features/products/AvailableProducts'
import ProductDescriptions from './admin/features/products/ProductDescriptions'
import ProductDetails, { productDetailsLoader } from './admin/features/products/ProductDetails'
import { Provider } from 'react-redux'
import store from './store/main'
import ArchiveProducts from './admin/features/products/ArchiveProducts'
import { ProductProvider } from './contexts/ProductProvider'

const router = createBrowserRouter([
  {
    path: '/',
    element:
      <AuthProvider>
        <App />
      </AuthProvider>
    ,

  },
  {
    path: '/auth',
    element:
      <AuthProvider>
        <Auth />
      </AuthProvider>
  },
  {
    path: '/admin',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        path: 'dashboard'
      },
      {
        path: "products",
        element: <Products />,
        children: [
          {
            index: true,
            element: <ManageProducts />,
          },
          {
            path: "sold",
            element: <SoldProducts />
          },
          {
            path: "archive",
            element: <ArchiveProducts />
          },
          {
            path: "available",
            element: <AvailableProducts />,
          },
          {
            path: "description",
            element: <ProductDescriptions />
          },
        ]
      },
      {
        path: "products/:productId",
        loader: productDetailsLoader,
        element: <ProductDetails />
      },
      {
        path: "sales",
        element: <>sales</>
      },

    ]
  },
  {
    path: '/admin/auth',
    element: <AdminAuth />
  }
]
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Toaster />
    <Provider store={store}>
      <ProductProvider>
        <RouterProvider router={router}>
        </RouterProvider>
      </ProductProvider>
    </Provider>
  </React.StrictMode >,
)
