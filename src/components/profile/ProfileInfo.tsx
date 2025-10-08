'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Building,
  Edit3,
  Save,
  X,
  Camera
} from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';
import type { UserProfile, UpdateProfileData } from '@/types';

interface ProfileInfoProps {
  userInfo: UserProfile | null;
  isLoading: boolean;
}

export function ProfileInfo({ userInfo, isLoading }: ProfileInfoProps) {
  const { updateProfile, uploadAvatar, isLoading: isUpdating } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<UpdateProfileData>({});

  // Inicializar dados de edição quando entrar no modo de edição
  const handleStartEdit = () => {
    if (userInfo) {
      setEditData({
        name: userInfo.name || '',
        email: userInfo.email || '',
        phone: userInfo.phone || '',
        location: userInfo.location || '',
        bio: userInfo.bio || '',
        skills: userInfo.skills || [],
      });
    }
    setIsEditing(true);
  };

  // Cancelar edição
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData({});
  };

  // Salvar alterações
  const handleSaveEdit = async () => {
    try {
      await updateProfile(editData);
      setIsEditing(false);
      setEditData({});
      console.log('✅ Perfil atualizado com sucesso');
    } catch (error) {
      console.error('❌ Erro ao atualizar perfil:', error);
    }
  };

  // Atualizar campo de edição
  const handleEditChange = (field: keyof UpdateProfileData, value: string | string[]) => {
    setEditData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // Upload de avatar
  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      await uploadAvatar(file);
      console.log('✅ Avatar atualizado com sucesso');
    } catch (error) {
      console.error('❌ Erro ao fazer upload do avatar:', error);
    }
  };

  // Adicionar skill
  const handleAddSkill = (skill: string) => {
    if (!skill.trim()) return;
    
    const currentSkills = editData.skills || [];
    if (!currentSkills.includes(skill.trim())) {
      handleEditChange('skills', [...currentSkills, skill.trim()]);
    }
  };

  // Remover skill
  const handleRemoveSkill = (skillToRemove: string) => {
    const currentSkills = editData.skills || [];
    handleEditChange('skills', currentSkills.filter(skill => skill !== skillToRemove));
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="h-6 w-32 bg-muted animate-pulse rounded" />
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-6">
            <div className="h-24 w-24 bg-muted animate-pulse rounded-full" />
            <div className="flex-1 space-y-4">
              <div className="h-6 w-48 bg-muted animate-pulse rounded" />
              <div className="h-4 w-32 bg-muted animate-pulse rounded" />
              <div className="h-4 w-40 bg-muted animate-pulse rounded" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!userInfo) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground">Não foi possível carregar as informações do usuário</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          Informações Pessoais
        </CardTitle>
        
        {!isEditing ? (
          <Button
            variant="outline"
            size="sm"
            onClick={handleStartEdit}
            disabled={isUpdating}
          >
            <Edit3 className="h-4 w-4 mr-2" />
            Editar
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancelEdit}
              disabled={isUpdating}
            >
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
            <Button
              size="sm"
              onClick={handleSaveEdit}
              disabled={isUpdating}
            >
              <Save className="h-4 w-4 mr-2" />
              {isUpdating ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        )}
      </CardHeader>
      
      <CardContent>
        <div className="flex items-start gap-6">
          {/* Avatar */}
          <div className="relative">
            <Avatar className="h-24 w-24">
              <img
                src={userInfo.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(userInfo.name)}&background=2563eb&color=ffffff`}
                alt={userInfo.name}
                className="h-full w-full object-cover"
              />
            </Avatar>
            
            {isEditing && (
              <label className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground p-2 rounded-full cursor-pointer hover:bg-primary/90 transition-colors">
                <Camera className="h-4 w-4" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                  disabled={isUpdating}
                />
              </label>
            )}
          </div>

          {/* Informações */}
          <div className="flex-1 space-y-4">
            {/* Nome */}
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Nome</Label>
              {isEditing ? (
                <Input
                  value={editData.name || ''}
                  onChange={(e) => handleEditChange('name', e.target.value)}
                  className="mt-1"
                  disabled={isUpdating}
                />
              ) : (
                <p className="text-lg font-semibold">{userInfo.name}</p>
              )}
            </div>

            {/* Email */}
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              {isEditing ? (
                <Input
                  type="email"
                  value={editData.email || ''}
                  onChange={(e) => handleEditChange('email', e.target.value)}
                  className="flex-1"
                  disabled={isUpdating}
                />
              ) : (
                <span className="text-sm">{userInfo.email}</span>
              )}
            </div>

            {/* Telefone */}
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              {isEditing ? (
                <Input
                  value={editData.phone || ''}
                  onChange={(e) => handleEditChange('phone', e.target.value)}
                  placeholder="Telefone"
                  className="flex-1"
                  disabled={isUpdating}
                />
              ) : (
                <span className="text-sm">{userInfo.phone || 'Não informado'}</span>
              )}
            </div>

            {/* Localização */}
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              {isEditing ? (
                <Input
                  value={editData.location || ''}
                  onChange={(e) => handleEditChange('location', e.target.value)}
                  placeholder="Localização"
                  className="flex-1"
                  disabled={isUpdating}
                />
              ) : (
                <span className="text-sm">{userInfo.location || 'Não informado'}</span>
              )}
            </div>

            {/* Cargo e Departamento */}
            {(userInfo.role || userInfo.department) && (
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  {userInfo.role}
                  {userInfo.role && userInfo.department && ' • '}
                  {userInfo.department}
                </span>
              </div>
            )}

            {/* Data de Ingresso */}
            {userInfo.join_date && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  Membro desde {new Date(userInfo.join_date).toLocaleDateString('pt-BR')}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Bio */}
        <div className="mt-6">
          <Label className="text-sm font-medium text-muted-foreground">Biografia</Label>
          {isEditing ? (
            <textarea
              value={editData.bio || ''}
              onChange={(e) => handleEditChange('bio', e.target.value)}
              placeholder="Conte um pouco sobre você..."
              className="mt-1 w-full min-h-[80px] p-3 border border-input rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              disabled={isUpdating}
            />
          ) : (
            <p className="text-sm mt-1 text-muted-foreground">
              {userInfo.bio || 'Nenhuma biografia adicionada.'}
            </p>
          )}
        </div>

        {/* Skills */}
        <div className="mt-6">
          <Label className="text-sm font-medium text-muted-foreground">Habilidades</Label>
          
          {isEditing ? (
            <div className="mt-2 space-y-3">
              <div className="flex flex-wrap gap-2">
                {(editData.skills || []).map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-1 hover:text-destructive"
                      disabled={isUpdating}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              
              <div className="flex gap-2">
                <Input
                  placeholder="Adicionar habilidade"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddSkill(e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                  disabled={isUpdating}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 mt-2">
              {userInfo.skills && userInfo.skills.length > 0 ? (
                userInfo.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))
              ) : (
                <span className="text-sm text-muted-foreground">
                  Nenhuma habilidade adicionada.
                </span>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}