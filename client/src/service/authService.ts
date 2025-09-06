// src/services/authService.ts
export const authService = {
  async requestOtp(email: string): Promise<{ requires_completion?: boolean; email?: string }> {
    const response = await fetch('http://localhost:8000/api/auth/request-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email_client: email }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erreur réseau');
    }

    const data = await response.json();

    if (data.requires_completion) {
      return { requires_completion: true, email: data.email };
    } else {
      return { requires_completion: false };
    }
  },

  // ✅ Correction ici : 'data: any' au lieu de '( any)'
  async completeProfile(data: any): Promise<any> {
    const response = await fetch('http://localhost:8000/api/auth/complete-profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data), // ✅ 'data' est maintenant bien défini
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Échec de l’inscription');
    }

    return response.json();
  },

  async verifyOtp(email: string, otp: string): Promise<void> {
    const response = await fetch('http://localhost:8000/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email_client: email, otp }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'OTP invalide');
    }

    const userData = await response.json();
    localStorage.setItem('authToken', 'authenticated');
    localStorage.setItem('client', JSON.stringify(userData));
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  },

  getCurrentUser(): any {
    const client = localStorage.getItem('client');
    return client ? JSON.parse(client) : null;
  },

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('client');
    window.location.href = '/login';
  },
};