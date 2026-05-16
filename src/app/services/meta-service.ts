import { Injectable } from '@angular/core';
// Quitamos collectionData y query, y agregamos onSnapshot
import { Firestore, collection, addDoc, doc, deleteDoc, onSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Meta } from '../models/meta.model';

@Injectable({
  providedIn: 'root'
})
export class MetaService {

  constructor(private firestore: Firestore) { }

  // 1. LECTURA: Usamos onSnapshot nativo para evitar el error de versiones
  getMetas(): Observable<Meta[]> {
    return new Observable((observer) => {
      const metasRef = collection(this.firestore, 'metas');
      
      const unsubscribe = onSnapshot(metasRef, (snapshot) => {
        // Mapeamos cada documento que llega de Firebase a nuestro modelo Meta
        const metas = snapshot.docs.map(doc => {
          const data = doc.data();
          return { id: doc.id, meta: data['meta'] } as Meta;
        });
        observer.next(metas);
      }, (error) => {
        observer.error(error);
      });
      
      // Cuando Angular ya no necesite los datos, cerramos la conexión
      return () => unsubscribe();
    });
  }

  // 2. CREACIÓN (Se queda igual, esta sí funciona bien)
  addMeta(textoMeta: string) {
    const metasRef = collection(this.firestore, 'metas');
    return addDoc(metasRef, { meta: textoMeta });
  }

  // 3. ELIMINACIÓN (Se queda igual)
  deleteMeta(id: string) {
    const metaDocRef = doc(this.firestore, `metas/${id}`);
    return deleteDoc(metaDocRef);
  }
}