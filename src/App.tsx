import { useCallback, useEffect, useState } from 'react';
import { Aspirations } from './components/Aspirations';
import { BudgetInfographics } from './components/BudgetInfographics';
import { DocumentsAndAspiration } from './components/DocumentsAndAspiration';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProjectModal } from './components/ProjectModal';
import { ProjectsSection } from './components/ProjectsSection';
import { Sidebar } from './components/Sidebar';
import { AsetPage } from './pages/AsetPage';
import type { Project } from './data/portal';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (
        path === '/aset' ||
        window.location.hash === '#/aset' ||
        window.location.hash === '#aset'
      ) {
        return '/aset';
      }
      return path;
    }
    return '/';
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const navigate = useCallback((path: string) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (
        path === '/aset' ||
        window.location.hash === '#/aset' ||
        window.location.hash === '#aset'
      ) {
        setCurrentPath('/aset');
      } else {
        setCurrentPath(path || '/');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const closeProjectModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  const isAsetRoute = currentPath === '/aset';

  return (
    <div className="app-shell">
      <Sidebar currentPath={isAsetRoute ? '/aset' : '/'} onNavigate={navigate} />
      <div className="page-shell">
        <Header />
        <main className="main-content">
          {isAsetRoute ? (
            <AsetPage />
          ) : (
            <>
              <Hero />
              <BudgetInfographics />
              <ProjectsSection onOpenProject={setSelectedProject} />
              <DocumentsAndAspiration />
              <Aspirations />
            </>
          )}
        </main>
      </div>
      <ProjectModal project={selectedProject} onClose={closeProjectModal} />
    </div>
  );
}
