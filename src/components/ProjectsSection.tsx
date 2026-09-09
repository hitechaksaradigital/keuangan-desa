import { useMemo, useState } from 'react';
import { ArrowRight, Drop, FirstAid, MapPin, RoadHorizon } from '@phosphor-icons/react';
import { mapImageUrl, projects, type Project, type ProjectStatus } from '../data/portal';

type ProjectFilter = 'all' | Extract<ProjectStatus, 'completed' | 'in-progress'>;

interface ProjectsSectionProps {
  onOpenProject: (project: Project) => void;
}

function ProjectIcon({ projectId }: { projectId: Project['id'] }) {
  if (projectId === 'sukamaju') {
      return <RoadHorizon size={20} weight="fill" aria-hidden="true" />;
  }

  if (projectId === 'saluran') {
    return <Drop size={20} weight="fill" aria-hidden="true" />;
  }

  return <FirstAid size={20} weight="fill" aria-hidden="true" />;
}

export function ProjectsSection({ onOpenProject }: ProjectsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('all');

  const filterOptions = useMemo(
    () => [
      { id: 'all' as const, label: `Semua Proyek (${projects.length})` },
      {
        id: 'in-progress' as const,
        label: `Sedang Jalan (${projects.filter((project) => project.status === 'in-progress').length})`,
      },
      {
        id: 'completed' as const,
        label: `Selesai (${projects.filter((project) => project.status === 'completed').length})`,
      },
    ],
    [],
  );

  const visibleProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((project) => project.status === activeFilter);

  return (
    <section className="content-section" aria-labelledby="projects-title">
      <div className="section-heading project-heading">
        <div>
          <span className="section-eyebrow">Geospasial Pembangunan</span>
          <h2 id="projects-title">Peta Pembangunan & Status Proyek Fisik</h2>
          <p>
            Pantau lokasi tepat, nilai anggaran, pelaksana, dan progres pengerjaan fisik di
            lingkungan tempat tinggal Anda.
          </p>
        </div>

        <div className="filter-tabs" aria-label="Filter status proyek">
          {filterOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              className={activeFilter === option.id ? 'active' : undefined}
              aria-pressed={activeFilter === option.id}
              onClick={() => setActiveFilter(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="projects-layout">
        <div className="map-card">
          <div className="map-canvas" aria-label="Peta lokasi proyek pembangunan Desa Maju Jaya">
            <img
              src={mapImageUrl}
              alt="Peta wilayah Desa Hegarmukti, Cikarang Pusat, Bekasi, Jawa Barat"
            />

            {projects.map((project) => (
              <button
                key={project.id}
                type="button"
                className={`map-pin pin-${project.id} pin-${project.status}`}
                onClick={() => onOpenProject(project)}
                aria-label={`Buka detail ${project.title}`}
              >
                <span className="pin-pulse" aria-hidden="true" />
                <span className="pin-icon">
                  <ProjectIcon projectId={project.id} />
                </span>
                <span className="pin-tooltip" role="status">
                  <strong>{project.statusLabel}</strong>
                  <span>{project.title}</span>
                  <small>{project.amount}</small>
                </span>
              </button>
            ))}

            <div className="map-legend" aria-label="Legenda status proyek">
              <div>
                <span className="legend-dot source-primary" />
                <span>Selesai</span>
              </div>
              <div>
                <span className="legend-dot source-secondary" />
                <span>Berjalan (65%)</span>
              </div>
              <div>
                <span className="legend-dot source-tertiary" />
                <span>Siap Mulai</span>
              </div>
            </div>
          </div>

          <div className="map-footer">
            <span>
              <MapPin size={16} weight="fill" aria-hidden="true" />
              Klik pin atau kartu proyek di sebelah kanan untuk melihat RAB dan nama TPK
              pelaksana.
            </span>
            <strong>GIS Siskeudes Aktif</strong>
          </div>
        </div>

        <div className="project-list" aria-live="polite">
          {visibleProjects.map((project) => (
            <article className="project-card" id={`card-${project.id}`} key={project.id}>
              <div>
                <div className="project-card-topline">
                  <div className="project-meta">
                    <span className={`project-status status-${project.status}`}>
                      <span aria-hidden="true" />
                      {project.statusLabel}
                    </span>
                    <span>{project.location}</span>
                  </div>
                  <strong className="currency">{project.amount}</strong>
                </div>

                <h3>{project.title}</h3>
                <p>{project.description}</p>

                {project.image ? (
                  <div className="project-details-row">
                    <div className="project-image-frame">
                      <img src={project.image} alt={project.imageAlt} />
                    </div>
                    <dl className="project-facts">
                      <div>
                        <dt>TPK:</dt>
                        <dd>{project.tpk}</dd>
                      </div>
                      <div>
                        <dt>Volume:</dt>
                        <dd>{project.volume}</dd>
                      </div>
                      <div>
                        <dt>Sumber:</dt>
                        <dd>{project.source}</dd>
                      </div>
                    </dl>
                  </div>
                ) : null}
              </div>

              <div className="project-card-footer">
                {project.progress !== undefined ? (
                  <div className="project-progress" aria-label={`Progres ${project.progress}%`}>
                    <div className="progress-track">
                      <div className="progress-fill source-secondary" style={{ width: `${project.progress}%` }} />
                    </div>
                    <strong>{project.progress}%</strong>
                  </div>
                ) : (
                  <span>{project.duration ?? project.targetStart}</span>
                )}

                <button
                  type="button"
                  className={project.status === 'completed' ? 'project-button primary' : 'project-button'}
                  onClick={() => onOpenProject(project)}
                >
                  <span>{project.ctaLabel}</span>
                  <ArrowRight size={14} weight="bold" aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
