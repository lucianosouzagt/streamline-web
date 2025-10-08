'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';
import type { ChangePasswordData } from '@/types';

export function ChangePasswordForm() {
  const { changePassword, isLoading } = useProfile();
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [formData, setFormData] = useState<ChangePasswordData>({
    current_password: '',
    new_password: '',
    new_password_confirmation: '',
  });
  const [errors, setErrors] = useState<Partial<ChangePasswordData>>({});
  const [success, setSuccess] = useState(false);

  // Validação da senha
  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      minLength,
      hasUpper,
      hasLower,
      hasNumber,
      hasSpecial,
      isValid: minLength && hasUpper && hasLower && hasNumber && hasSpecial,
    };
  };

  const passwordValidation = validatePassword(formData.new_password);

  // Alternar visibilidade da senha
  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // Atualizar dados do formulário
  const handleInputChange = (field: keyof ChangePasswordData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined,
      }));
    }

    // Limpar mensagem de sucesso
    if (success) {
      setSuccess(false);
    }
  };

  // Validar formulário
  const validateForm = (): boolean => {
    const newErrors: Partial<ChangePasswordData> = {};

    if (!formData.current_password) {
      newErrors.current_password = 'Senha atual é obrigatória';
    }

    if (!formData.new_password) {
      newErrors.new_password = 'Nova senha é obrigatória';
    } else if (!passwordValidation.isValid) {
      newErrors.new_password = 'Nova senha não atende aos critérios de segurança';
    }

    if (!formData.new_password_confirmation) {
      newErrors.new_password_confirmation = 'Confirmação de senha é obrigatória';
    } else if (formData.new_password !== formData.new_password_confirmation) {
      newErrors.new_password_confirmation = 'Senhas não coincidem';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submeter formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await changePassword(formData);
      setSuccess(true);
      setFormData({
        current_password: '',
        new_password: '',
        new_password_confirmation: '',
      });
      console.log('✅ Senha alterada com sucesso');
    } catch (error) {
      console.error('❌ Erro ao alterar senha:', error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lock className="h-5 w-5 text-primary" />
          Alterar Senha
        </CardTitle>
      </CardHeader>
      <CardContent>
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-800">
            <CheckCircle className="h-5 w-5" />
            <span>Senha alterada com sucesso!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Senha Atual */}
          <div className="space-y-2">
            <Label htmlFor="current_password">Senha Atual</Label>
            <div className="relative">
              <Input
                id="current_password"
                type={showPasswords.current ? 'text' : 'password'}
                value={formData.current_password}
                onChange={(e) => handleInputChange('current_password', e.target.value)}
                className={errors.current_password ? 'border-red-500' : ''}
                disabled={isLoading}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => togglePasswordVisibility('current')}
                disabled={isLoading}
              >
                {showPasswords.current ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            {errors.current_password && (
              <p className="text-sm text-red-600">{errors.current_password}</p>
            )}
          </div>

          {/* Nova Senha */}
          <div className="space-y-2">
            <Label htmlFor="new_password">Nova Senha</Label>
            <div className="relative">
              <Input
                id="new_password"
                type={showPasswords.new ? 'text' : 'password'}
                value={formData.new_password}
                onChange={(e) => handleInputChange('new_password', e.target.value)}
                className={errors.new_password ? 'border-red-500' : ''}
                disabled={isLoading}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => togglePasswordVisibility('new')}
                disabled={isLoading}
              >
                {showPasswords.new ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            {errors.new_password && (
              <p className="text-sm text-red-600">{errors.new_password}</p>
            )}

            {/* Critérios de Senha */}
            {formData.new_password && (
              <div className="mt-3 p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-2">Critérios de Segurança:</p>
                <div className="space-y-1">
                  <div className={`flex items-center gap-2 text-xs ${passwordValidation.minLength ? 'text-green-600' : 'text-muted-foreground'}`}>
                    <CheckCircle className={`h-3 w-3 ${passwordValidation.minLength ? 'text-green-600' : 'text-muted-foreground'}`} />
                    Mínimo 8 caracteres
                  </div>
                  <div className={`flex items-center gap-2 text-xs ${passwordValidation.hasUpper ? 'text-green-600' : 'text-muted-foreground'}`}>
                    <CheckCircle className={`h-3 w-3 ${passwordValidation.hasUpper ? 'text-green-600' : 'text-muted-foreground'}`} />
                    Pelo menos uma letra maiúscula
                  </div>
                  <div className={`flex items-center gap-2 text-xs ${passwordValidation.hasLower ? 'text-green-600' : 'text-muted-foreground'}`}>
                    <CheckCircle className={`h-3 w-3 ${passwordValidation.hasLower ? 'text-green-600' : 'text-muted-foreground'}`} />
                    Pelo menos uma letra minúscula
                  </div>
                  <div className={`flex items-center gap-2 text-xs ${passwordValidation.hasNumber ? 'text-green-600' : 'text-muted-foreground'}`}>
                    <CheckCircle className={`h-3 w-3 ${passwordValidation.hasNumber ? 'text-green-600' : 'text-muted-foreground'}`} />
                    Pelo menos um número
                  </div>
                  <div className={`flex items-center gap-2 text-xs ${passwordValidation.hasSpecial ? 'text-green-600' : 'text-muted-foreground'}`}>
                    <CheckCircle className={`h-3 w-3 ${passwordValidation.hasSpecial ? 'text-green-600' : 'text-muted-foreground'}`} />
                    Pelo menos um caractere especial
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Confirmar Nova Senha */}
          <div className="space-y-2">
            <Label htmlFor="new_password_confirmation">Confirmar Nova Senha</Label>
            <div className="relative">
              <Input
                id="new_password_confirmation"
                type={showPasswords.confirm ? 'text' : 'password'}
                value={formData.new_password_confirmation}
                onChange={(e) => handleInputChange('new_password_confirmation', e.target.value)}
                className={errors.new_password_confirmation ? 'border-red-500' : ''}
                disabled={isLoading}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => togglePasswordVisibility('confirm')}
                disabled={isLoading}
              >
                {showPasswords.confirm ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            {errors.new_password_confirmation && (
              <p className="text-sm text-red-600">{errors.new_password_confirmation}</p>
            )}
          </div>

          {/* Botão de Submit */}
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || !passwordValidation.isValid}
          >
            {isLoading ? 'Alterando...' : 'Alterar Senha'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}