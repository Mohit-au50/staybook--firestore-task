
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';



import { Hotel } from '../../../models/Hotel';

const readData = async (): Promise<Hotel[]> => {
    const snapshot = await getDocs(collection(db, 'hotels'));
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Hotel, 'id'>)
    }));
};

export default readData;


