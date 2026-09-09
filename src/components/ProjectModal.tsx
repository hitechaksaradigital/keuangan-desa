import { useEffect } from 'react';
import { ChartLineUp, CheckCircle, FileArrowDown, X } from '@phosphor-icons/react';
import type { Project } from '../data/portal';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) {
    return null;
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="project-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-heading">
            <ChartLineUp size={24} weight="fill" aria-hidden="true" />
            <div>
              <span>Lembar Detail Kegiatan Fisik</span>
              <h2 id="modal-title">{project.title}</h2>
            </div>
          </div>
          <button type="button" className="modal-close" onClick={onClose} aria-label="Tutup detail proyek">
            <X size={20} weight="bold" aria-hidden="true" />
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-facts-grid">
            <div>
              <span>Pagu Anggaran</span>
              <strong className="currency">{project.amount}</strong>
            </div>
            <div>
              <span>Status Fisik</span>
              <strong className={project.status === 'completed' ? 'status-complete-text' : 'status-progress-text'}>
                {project.modalStatus}
              </strong>
            </div>
            <div>
              <span>Sumber Dana</span>
              <strong>{project.source}</strong>
            </div>
            <div>
              <span>Tahun Anggaran</span>
              <strong>2024 Murni</strong>
            </div>
          </div>

          <div className="modal-description">
            <span>Uraian Pekerjaan & Manfaat Bagi Warga:</span>
            <p>{project.description}</p>
          </div>

          <div className="modal-info-grid">
            <div>
              <strong>Tim Pelaksana Kegiatan (TPK):</strong>
              <p>{project.tpk}</p>
            </div>
            <div>
              <strong>Lokasi & Volume Fisik:</strong>
              <p>{project.volume}</p>
            </div>
          </div>

          <div className="modal-verification">
            <CheckCircle size={20} weight="fill" aria-hidden="true" />
            <span>
              Kegiatan telah diverifikasi oleh Badan Permusyawaratan Desa (BPD) Desa Maju Jaya.
            </span>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="modal-secondary-button" onClick={onClose}>
            Tutup
          </button>
          <button
            type="button"
            className="modal-primary-button"
            onClick={() => window.alert('Mengunduh Berkas SPJ Lengkap & Dokumentasi Nol-Seratus Persen...')}
          >
            <FileArrowDown size={16} weight="fill" aria-hidden="true" />
            <span>Unduh Berkas SPJ & Kwitansi</span>
          </button>
        </div>
      </div>
    </div>
  );
}
