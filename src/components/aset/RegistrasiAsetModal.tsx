import React, { useState } from 'react';
import { KibAsset, KibCategory } from '../../data/aset';

interface RegistrasiAsetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAsset: (newAsset: KibAsset) => void;
}

export function RegistrasiAsetModal({
  isOpen,
  onClose,
  onAddAsset,
}: RegistrasiAsetModalProps) {
  const [category, setCategory] = useState<KibCategory>('A');
  const [registerCode, setRegisterCode] = useState('');
  const [name, setName] = useState('');
  const [specification, setSpecification] = useState('');
  const [year, setYear] = useState<number>(2024);
  const [fundingSource, setFundingSource] = useState('Dana Desa (DDS)');
  const [origin, setOrigin] = useState('Pengadaan Baru APBDes');
  const [condition, setCondition] = useState<KibAsset['condition']>('Baik');
  const [acquisitionValue, setAcquisitionValue] = useState<string>('');
  const [location, setLocation] = useState('');
  const [personInCharge, setPersonInCharge] = useState('Sekretaris Desa');
  const [documentType, setDocumentType] = useState('Sertifikat Hak Pakai');
  const [documentNumber, setDocumentNumber] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = Number(acquisitionValue.replace(/\D/g, '')) || 0;

    const newAsset: KibAsset = {
      id: `asset-${Date.now()}`,
      category,
      registerCode: registerCode || `01.0${category === 'A' ? '1' : '2'}.11.04.${Math.floor(10 + Math.random() * 89)}`,
      name: name.trim() || 'Aset Baru Belum Diberi Nama',
      specification: specification.trim() || 'Spesifikasi standar inventaris desa',
      year: Number(year) || 2024,
      fundingSource,
      origin,
      condition,
      acquisitionValue: val,
      accumulatedDepreciation: 0,
      bookValue: val,
      location: location.trim() || 'Wilayah Desa Maju Jaya',
      personInCharge,
      documentType,
      documentNumber: documentNumber.trim() || `REG-${Date.now().toString().slice(-6)}`,
      statusLegal: 'Tercatat dalam Buku Induk Inventaris Desa 2024',
    };

    onAddAsset(newAsset);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>
              add_circle
            </span>
            <h3>Registrasi Barang Milik Desa (SIPADES v3.1)</h3>
          </div>
          <button
            type="button"
            className="btn-modal-close"
            onClick={onClose}
            aria-label="Tutup modal"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Kategori Aset (KIB)</label>
                <select
                  className="form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as KibCategory)}
                >
                  <option value="A">Tanah (KIB A)</option>
                  <option value="B">Mesin & Peralatan (KIB B)</option>
                  <option value="C">Gedung & Bangunan (KIB C)</option>
                  <option value="D">Jalan, Irigasi & Jaringan (KIB D)</option>
                  <option value="E">Aset Tetap Lainnya (KIB E)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Kode Register Barang</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Contoh: 01.01.11.04.15"
                  value={registerCode}
                  onChange={(e) => setRegisterCode(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Nama Barang / Aset *</label>
              <input
                type="text"
                className="form-input"
                required
                placeholder="Contoh: Lahan Lapangan Futsal Dusun III"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Spesifikasi Teknis / Ukuran / Luas</label>
              <input
                type="text"
                className="form-input"
                placeholder="Contoh: Luas 1.200 m² (Persil No. 55b)"
                value={specification}
                onChange={(e) => setSpecification(e.target.value)}
              />
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Tahun Perolehan</label>
                <input
                  type="number"
                  className="form-input"
                  min="1950"
                  max="2030"
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Sumber Dana</label>
                <select
                  className="form-select"
                  value={fundingSource}
                  onChange={(e) => setFundingSource(e.target.value)}
                >
                  <option value="Dana Desa (DDS)">Dana Desa (DDS)</option>
                  <option value="Alokasi Dana Desa (ADD)">Alokasi Dana Desa (ADD)</option>
                  <option value="Aset Asli Desa">Aset Asli Desa</option>
                  <option value="Bantuan Provinsi">Bantuan Keuangan Provinsi</option>
                  <option value="Hibah Pemkab">Hibah Pemerintah Kabupaten</option>
                  <option value="Hibah Kementerian">Hibah Kementerian</option>
                </select>
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Asal Usul</label>
                <select
                  className="form-select"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                >
                  <option value="Pengadaan Baru APBDes">Pengadaan Baru APBDes</option>
                  <option value="Warisan Adat">Warisan Adat</option>
                  <option value="Tanah Bengkok">Tanah Bengkok</option>
                  <option value="Pembelian Bebas">Pembelian Bebas</option>
                  <option value="Aset Hibah">Aset Hibah</option>
                  <option value="Konversi Fasum">Konversi Fasum</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Kondisi Fisik</label>
                <select
                  className="form-select"
                  value={condition}
                  onChange={(e) => setCondition(e.target.value as KibAsset['condition'])}
                >
                  <option value="Baik">Baik</option>
                  <option value="Baik / Produktif">Baik / Produktif</option>
                  <option value="Baik / Dikelola BUMDes">Baik / Dikelola BUMDes</option>
                  <option value="Rusak Ringan">Rusak Ringan</option>
                  <option value="Rusak Berat">Rusak Berat</option>
                </select>
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Nilai Perolehan (Rp) *</label>
                <input
                  type="text"
                  className="form-input"
                  required
                  placeholder="Contoh: 150000000"
                  value={acquisitionValue}
                  onChange={(e) => setAcquisitionValue(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Lokasi / Dusun</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Contoh: Dusun III RT 02/01"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">Pejabat Penanggung Jawab</label>
                <select
                  className="form-select"
                  value={personInCharge}
                  onChange={(e) => setPersonInCharge(e.target.value)}
                >
                  <option value="Sekretaris Desa">Sekretaris Desa</option>
                  <option value="Kasie Pemerintahan">Kasie Pemerintahan</option>
                  <option value="Kasie Pelayanan">Kasie Pelayanan</option>
                  <option value="Kaur Kesra">Kaur Kesra</option>
                  <option value="Kaur Ekbang">Kaur Ekbang</option>
                  <option value="Kaur Umum">Kaur Umum</option>
                  <option value="Direktur BUMDes">Direktur BUMDes</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Nomor Dokumen Legalitas</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Contoh: SHP No. 18/MJ/2024"
                  value={documentNumber}
                  onChange={(e) => setDocumentNumber(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn-secondary-surface"
              onClick={onClose}
            >
              Batal
            </button>
            <button type="submit" className="btn-primary-action">
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                save
              </span>
              <span>Simpan ke SIPADES</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
