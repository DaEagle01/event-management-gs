import { Loader } from 'lucide-react';
import { Button } from '../../../components/ui/button';

export function DeleteModal({ onClose, onConfirm, isDeleting }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl space-y-4">
                <div className=''>
                    <h3 className="text-lg font-semibold">Confirm Delete</h3>
                    <p>Are you sure you want to delete this event?</p>
                </div>
                <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={onConfirm} disabled={isDeleting}>
                        {isDeleting && <Loader className='animate-spin mr-2' />}
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    );
}
