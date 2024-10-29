import { TestBed } from '@angular/core/testing';
import { FirebaseLoginService } from './firebase-login.service';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

class MockAuth {
  // Simulando el inicio de sesión
  signInWithEmailAndPassword(email: string, password: string) {
    if (email === 'test@example.com' && password === 'password123') {
      return Promise.resolve({ user: { email } }); // Simula el retorno de un usuario
    }
    return Promise.reject(new Error('Invalid credentials'));
  }

  // Simulando el cierre de sesión
  signOut() {
    return Promise.resolve(); // Simula la salida sin errores
  }
}

describe('FirebaseLoginService', () => {
  let service: FirebaseLoginService;
  let mockRouter: Router;

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']); // Crea un mock del Router

    TestBed.configureTestingModule({
      providers: [
        FirebaseLoginService,
        { provide: Auth, useClass: MockAuth }, // Proporciona el mock de Auth
        { provide: Router, useValue: mockRouter } // Proporciona el mock del Router
      ]
    });
    service = TestBed.inject(FirebaseLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy(); // Verifica que el servicio sea creado
  });

  it('should login the user with valid credentials', async () => {
    const email = 'test@example.com';
    const password = 'password123';

    const result = await service.login(email, password);
    expect(result.user.email).toBe(email); // Verifica que el usuario tenga el email esperado
  });

  it('should throw an error on invalid login', async () => {
    const email = 'wrong@example.com';
    const password = 'wrongpassword';

    await expectAsync(service.login(email, password)).toBeRejectedWithError('Invalid credentials'); // Verifica que se lance un error
  });

  it('should logout the user and navigate to /login', async () => {
    await service.logout();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']); // Verifica que se navegue a /login
  });
});
