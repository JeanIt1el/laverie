// MaterialsModule.tsx - Textes en noir
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Package,
  Plus,
  Edit,
  Trash2,
  Search,
} from 'lucide-react';
import {
  getAllMateriels,
  createMateriel,
  updateMateriel,
  deleteMateriel,
} from '../../../Redux/AsyncThunk/MaterielThunk';
import { getMaterielState } from '../../../Redux/Slice/MaterielSlice';
import { AppDispatchType } from '../../../Redux/Store';
import { MaterielType } from '../../../types';
import MaterielForm from './MaterielForm';

export default function MaterialsModule() {
  const dispatch = useDispatch<AppDispatchType>();
  const { datas: materiels, action } = useSelector(getMaterielState);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterEtat, setFilterEtat] = useState<'all' | 'disponible' | 'maintenance' | 'rupture'>('all');
  const [filterType, setFilterType] = useState<'all' | string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editMateriel, setEditMateriel] = useState<MaterielType | null>(null);

  useEffect(() => {
    dispatch(getAllMateriels());
  }, [dispatch]);

  /* CRUD handlers */
  const handleCreate = async (data: {
    nom_materiel: string;
    type_materiel: string;
    etat_materiel: string;
    quantite: number;
    service_id?: number;
  }) => {
    await dispatch(createMateriel(data)).unwrap();
    setIsAddModalOpen(false);
  };

  const handleUpdate = async (data: {
    nom_materiel?: string;
    type_materiel?: string;
    etat_materiel?: string;
    quantite?: number;
    service_id?: number;
  }) => {
    if (!editMateriel) return;
    await dispatch(updateMateriel({ id: editMateriel.id, ...data })).unwrap();
    setEditMateriel(null);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Supprimer ce matériel ?')) {
      dispatch(deleteMateriel(id));
    }
  };

  /* Listes dynamiques pour les filtres */
  const etats = Array.from(new Set(materiels.map(m => m.etat_materiel)));
  const types = Array.from(new Set(materiels.map(m => m.type_materiel)));

  /* Filtrage des données */
  const filtered = materiels.filter((m) => {
    const matchesSearch =
      m.nom_materiel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.type_materiel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.service_nom?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEtat = filterEtat === 'all' || m.etat_materiel === filterEtat;
    const matchesType = filterType === 'all' || m.type_materiel === filterType;
    return matchesSearch && matchesEtat && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestion des Matériels</h2>
          <p className="text-gray-700">Suivez et gérez vos équipements et fournitures</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Nouveau Matériel</span>
        </button>
      </div>

      {/* Filtres */}
      <div className="rounded-xl shadow-sm border p-4 bg-white border-gray-200 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher matériel..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={filterEtat}
          onChange={(e) => setFilterEtat(e.target.value as any)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Tous états</option>
          {etats.map((e) => (
            <option key={e} value={e}>{e}</option>
          ))}
        </select>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Tous types</option>
          {types.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {action.isLoading && <p className="text-center text-gray-500">Chargement...</p>}
        {filtered.map((m) => (
          <div
            key={m.id}
            className="rounded-xl shadow-sm border p-6 bg-white border-gray-200 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{m.nom_materiel}</h3>
                  <p className="text-sm text-gray-700">{m.type_materiel}</p>
                  <p className="text-xs text-gray-600">Service : {m.service_nom ?? '—'}</p>
                </div>
              </div>
              <div className="flex space-x-1">
                <button 
                  onClick={() => setEditMateriel(m)} 
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDelete(m.id)} 
                  className="p-1 text-gray-400 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-800">État</span>
                <span className="text-sm font-medium text-gray-900">{m.etat_materiel}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-800">Quantité</span>
                <span className="font-semibold text-gray-900">{m.quantite}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-800">
                <span>Créé le</span>
                <span>{new Date(m.created_at).toLocaleDateString('fr-FR')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal d'ajout */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-8">
            <header className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Ajouter un matériel</h3>
              <button 
                onClick={() => setIsAddModalOpen(false)} 
                className="text-gray-600 hover:text-gray-900"
              >
                ✕
              </button>
            </header>
            <MaterielForm onSubmit={handleCreate} loading={action.isCreating} />
          </div>
        </div>
      )}

      {/* Modal de modification */}
      {editMateriel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-8">
            <header className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Modifier le matériel</h3>
              <button 
                onClick={() => setEditMateriel(null)} 
                className="text-gray-600 hover:text-gray-900"
              >
                ✕
              </button>
            </header>
            <MaterielForm materiel={editMateriel} onSubmit={handleUpdate} loading={action.isUpdating} />
          </div>
        </div>
      )}
    </div>
  );
}