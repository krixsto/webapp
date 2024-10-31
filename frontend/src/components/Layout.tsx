import type { PropsWithChildren } from 'react';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }: PropsWithChildren) {
    return (
        <>
        <Header tittel="Portfolio" />
        <main className="container">
            {children}
        </main>
        <Footer />
        </>
    );
}
