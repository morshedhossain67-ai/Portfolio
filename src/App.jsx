import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import Hero from './components/sections/Hero.jsx';
import About from './components/sections/About.jsx';
import Expertise from './components/sections/Expertise.jsx';
import Experience from './components/sections/Experience.jsx';
import Education from './components/sections/Education.jsx';
import Publications from './components/sections/Publications.jsx';
import Contact from './components/sections/Contact.jsx';
import { ContentProvider } from './content/ContentContext.jsx';
import { AuthProvider } from './auth/AuthContext.jsx';
import { AdminProvider } from './components/admin/AdminContext.jsx';
import Loader from './components/layout/Loader.jsx';

// `primary` links stay visible on phones; the rest go under "More".
export const NAV = [
  { id: 'about', label: 'About', primary: true },
  { id: 'expertise', label: 'Expertise' },
  { id: 'experience', label: 'Career', primary: true },
  { id: 'education', label: 'Education' },
  { id: 'publications', label: 'Research', primary: true },
  { id: 'contact', label: 'Contact' },
];

export default function App() {
  return (
    <ContentProvider>
      <AuthProvider>
        <AdminProvider>
          <Loader />
          <Site />
        </AdminProvider>
      </AuthProvider>
    </ContentProvider>
  );
}

function Site() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Navbar items={NAV} />
      <main id="main">
        <Hero />
        <About />
        <Expertise />
        <Experience />
        <Education />
        <Publications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
