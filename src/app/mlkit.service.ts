import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Importar las funciones necesarias de Firebase
import { environment } from '../environments/environment';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MlkitService {
  private apiKey: string = environment.firebaseConfig.apiKey;

  constructor(private http: HttpClient) {}

  // Método para subir la imagen a Firebase Storage
  async uploadImage(file: File): Promise<string> {
    const storage = getStorage(); // Obtener la instancia de storage
    const filePath = `images/${new Date().getTime()}_${file.name}`;
    const fileRef = ref(storage, filePath); // Crear una referencia al archivo

    // Subir el archivo
    await uploadBytes(fileRef, file);
    // Obtener la URL de descarga
    return await getDownloadURL(fileRef);
  }

  async labelImage(imageUrl: string): Promise<VisionResponse> {
    const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${this.apiKey}`;
    const body = {
      requests: [
        {
          image: {
            source: {
              imageUri: imageUrl,
            },
          },
          features: [
            {
              type: 'LABEL_DETECTION',
              maxResults: 10,
            },
          ],
        },
      ],
    };

    try {
      const response = await lastValueFrom(this.http.post<VisionResponse>(apiUrl, body));
      return response;
    } catch (error) {
      console.error('Error al etiquetar la imagen:', error);
      throw error;
    }
  }
}

export interface VisionResponse {
  responses: {
    labelAnnotations?: Array<{
      mid: string;
      description: string;
      score: number;
    }>;
  }[];
}