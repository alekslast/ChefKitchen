import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import App from './App.tsx'

import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'




const queryClient = new QueryClient();





createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <Router>
                <Routes>
                    <Route path='/*' element={<App />} />
                </Routes>
            </Router>
        </QueryClientProvider>
    </StrictMode>,
)
