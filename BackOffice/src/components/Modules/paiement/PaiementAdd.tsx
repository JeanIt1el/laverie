// src/pages/Paiement/PaiementAdd.tsx
import { useDispatch } from 'react-redux';
import { AppDispatchType } from '../../../Redux/Store';
import { createPaiement } from '../../../Redux/AsyncThunk/PaiementThunk';
import PaiementForm from './PaiementForm';

type PaiementAddProps = {
  onClose: () => void;
};

const PaiementAdd: React.FC<PaiementAddProps> = ({ onClose }) => {
  const dispatch = useDispatch<AppDispatchType>();

  const handleCreate = (data: {
    montant: number;
    status: string;
    reservation_id: number;
    mode_paiement_id?: number | null;
  }) => {
    dispatch(
      createPaiement({
        montant: data.montant,
        status: data.status,
        reservation_id: data.reservation_id,
        mode_paiement_id: data.mode_paiement_id ?? undefined, // ✅ Convertit null → undefined
      })
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-900">Enregistrer un paiement</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-900">✕</button>
        </div>
        <PaiementForm onSubmit={handleCreate} />
      </div>
    </div>
  );
};

export default PaiementAdd;