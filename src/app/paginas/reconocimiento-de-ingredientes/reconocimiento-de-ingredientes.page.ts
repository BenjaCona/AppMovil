import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { MlkitService } from '../../mlkit.service'; // Ajusta la ruta según tu estructura de carpetas
import { RecipeService } from '../../spoonacular.service'; // Asegúrate de importar tu RecipeService


@Component({
  selector: 'app-reconocimiento-de-ingredientes',
  templateUrl: './reconocimiento-de-ingredientes.page.html',
  styleUrls: ['./reconocimiento-de-ingredientes.page.scss'],
})
export class ReconocimientoDeIngredientesPage implements OnInit {
  imageUrl: string | undefined;
  labels: any[] = [];
  recipes: any[] = []; // Para almacenar las recetas

  constructor(private mlkitService: MlkitService, private recipeService: RecipeService) {}

  async takePhoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    });
  
    console.log('Imagen capturada:', image); // Agrega esta línea para ver qué se devuelve
  
    if (image && image.webPath) {
      const imageFile = await fetch(image.webPath!).then(res => res.blob());
      const fileName = `image_${new Date().getTime()}.jpg`;
  
      try {
        const imageUrl = await this.mlkitService.uploadImage(new File([imageFile], fileName));
        const result = await this.mlkitService.labelImage(imageUrl);
  
        // Filtrar solo las etiquetas relacionadas con alimentos
        if (result.responses && result.responses[0]?.labelAnnotations) {
          const foodLabels = result.responses[0].labelAnnotations.filter(label =>
            this.isFoodLabel(label.description)
          );
          
          if (foodLabels.length > 0) {
            this.labels = foodLabels; // Actualiza solo con etiquetas de alimentos
            
            
            // Extraer solo los nombres de los alimentos para la búsqueda
            const ingredients = foodLabels.map(label => label.description);
            const recipes = await this.recipeService.getRecipes(ingredients); // Obtiene las recetas
            this.recipes = recipes; // Almacena las recetas
          } else {
            console.error('No se encontraron etiquetas de alimentos en la respuesta:', result);
          }
        } else {
          console.error('No se encontraron etiquetas en la respuesta:', result);
        }
      } catch (error) {
        console.error('Error al obtener las etiquetas:', error);
      }
    } else {
      console.error('No se pudo obtener la ruta de la imagen.', image);
    }
  }

  // Método para verificar si una etiqueta está relacionada con alimentos
  isFoodLabel(label: string): boolean {
    const foodKeywords = [
      // Frutas
      'apple', 'banana', 'orange', 'grape', 'watermelon', 'pineapple', 'strawberry', 
      'blueberry', 'raspberry', 'kiwi', 'peach', 'pear', 'cherry', 'apricot', 'fig', 
      'date', 'plum', 'lime', 'lemon', 'coconut', 'avocado', 'pomegranate', 'mandarin',
      
      // Verduras
      'carrot', 'potato', 'tomato', 'onion', 'garlic', 'pepper', 'cucumber', 
      'lettuce', 'spinach', 'broccoli', 'cauliflower', 'cabbage', 'zucchini', 
      'eggplant', 'mushroom', 'beet', 'radish', 'turnip', 'celery', 
      'sweet potato', 'pumpkin', 'asparagus', 'green bean', 'pea', 
      'corn', 'bell pepper', 'chili', 'jalapeño', 'arugula', 'kale', 'bok choy',
    
      // Carnes y Pescados
      'chicken', 'beef', 'pork', 'lamb', 'turkey', 'duck', 'fish', 
      'salmon', 'tuna', 'sardine', 'shrimp', 'crab', 'lobster', 
      'clam', 'oyster', 'egg', 'bacon', 'ham', 'sausage', 
      'veal', 'chorizo', 'cod', 'trout',
    
      // Productos Lácteos
      'cheese', 'yogurt', 'milk', 'butter', 'cream', 'ice cream', 
      'sour cream', 'cottage cheese', 'kefir', 'mozzarella', 
      'cheddar', 'feta', 'parmesan', 'brie',
    
      // Granos y Cereales
      'bread', 'rice', 'pasta', 'noodle', 'quinoa', 'cereal', 
      'barley', 'oat', 'flour', 'bulgur', 'millet', 'cornmeal', 
      'sorghum', 'spelt',
    
      // Nueces y Semillas
      'nut', 'almond', 'walnut', 'peanut', 'cashew', 'pistachio', 
      'hazelnut', 'brazil nut', 'pecan', 'macadamia', 
      'sunflower seed', 'chia seed', 'flaxseed', 'pumpkin seed', 
      'sesame seed',
    
      // Otros Alimentos
      'popcorn', 'snack', 'cake', 'cookie', 'pie', 'brownie', 
      'muffin', 'donut', 'candy', 'chocolate', 'chip', 
      'fruit juice', 'smoothie', 'soda', 'tea', 'coffee', 
      'cocktail', 'beer', 'wine', 'whiskey', 'whiskey sour', 
      'salsa', 'hummus', 'guacamole', 'sriracha', 'peanut butter',
      
      // Especias y Condimentos
      'salt', 'pepper', 'spice', 'herb', 'honey', 'jam', 
      'syrup', 'sauce', 'vinaigrette', 'olive oil', 
      'cooking oil', 'vinegar', 'mustard', 'ketchup',
    
      // Postres y Dulces
      'pudding', 'custard', 'gelato', 'sorbet', 'tart', 
      'pancake', 'waffle', 'crepe', 'mousse', 'tiramisu',
      
      // Bebidas
      'milkshake', 'lemonade', 'fruit punch', 'iced tea', 
      'espresso', 'latte', 'mocha', 'smoothie bowl', 'chai', 'kombucha'
    ];
    
    return foodKeywords.some(keyword => label.toLowerCase().includes(keyword));
  }

  ngOnInit() {}
}
