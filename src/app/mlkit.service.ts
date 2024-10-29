import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root',
})
export class MlkitService {
  private apiKey: string = environment.firebaseConfig.apiKey; // Coloca tu API Key aquí

  constructor(private http: HttpClient) {}

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
      const response = await this.http.post<VisionResponse>(apiUrl, body).toPromise();
      return response as VisionResponse; // Se asegura que el tipo de respuesta coincida con VisionResponse
    } catch (error) {
      console.error('Error al etiquetar la imagen:', error);
      throw error; // Propaga el error si es necesario
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
  
  

