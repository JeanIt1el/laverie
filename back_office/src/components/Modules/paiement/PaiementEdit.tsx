// src/pages/Paiement/PaiementEdit.tsx
import { useDispatch } from 'react-redux';
import { AppDispatchType } from '../../../Redux/Store';
import { updatePaiement } from '../../../Redux/AsyncThunk/PaiementThunk';
import { PaiementType } from '../../../types';
import PaiementForm from './PaiementForm';

type PaiementEditProps = {
  paiement: PaiementType;
  onClose: () => void;
};

const PaiementEdit: React.FC<PaiementEditProps> = ({ paiement, onClose }) => {
  const dispatch = useDispatch<AppDispatchType>();

  const handleUpdate = (data: {
    montant: number;
    status: string;
    reservation_id: number;
    mode_paiement_id?: number | null;
  }) => {
    dispatch(
      updatePaiement({
        id: paiement.id,
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
          <h3 className="text-xl font-semibold text-gray-900">Modifier le paiement</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-900">✕</button>
        </div>
        <PaiementForm paiement={paiement} onSubmit={handleUpdate} />
      </div>
    </div>
  );
};

export default PaiementEdit;