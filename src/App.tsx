import { useCallback, useState } from 'react';
import { Aspirations } from './components/Aspirations';
import { BudgetInfographics } from './components/BudgetInfographics';
import { DocumentsAndAspiration } from './components/DocumentsAndAspiration';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProjectModal } from './components/ProjectModal';
import { ProjectsSection } from './components/ProjectsSection';
import { Sidebar } from './components/Sidebar';
import type { Project } from './data/portal';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const closeProjectModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="page-shell">
        <Header />
        <main className="main-content">
          <Hero />
          <BudgetInfographics />
          <ProjectsSection onOpenProject={setSelectedProject} />
          <DocumentsAndAspiration />
          <Aspirations />
        </main>
      </div>
      <ProjectModal project={selectedProject} onClose={closeProjectModal} />
    </div>
  );
}
