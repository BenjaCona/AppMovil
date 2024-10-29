import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment'; 
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private apiKey: string = environment.spoonacularApiKey; // Asegúrate de tener la clave en tu archivo de entorno

  constructor(private http: HttpClient) {}

  async getRecipes(ingredients: string[]): Promise<any> {
    const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients.join(',')}&apiKey=${this.apiKey}`;
    
    try {
      const response = await lastValueFrom(this.http.get<any>(apiUrl));
      return response;
    } catch (error) {
      console.error('Error al obtener las recetas:', error);
      throw error;
    }
  }
}
