import { AppProviders } from '@/app/_providers';
import { Home } from '@/app/pages/Home';
import { NotFoundPage } from '@/app/pages/NotFound';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export function App() {
    return (
        <AppProviders>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </BrowserRouter>
        </AppProviders>
    );
}
