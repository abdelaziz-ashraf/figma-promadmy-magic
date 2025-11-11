import React, { useState, useEffect } from 'react';
import { Category, CategoryFormData } from '../../types';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Switch } from '../../components/ui/switch';

interface CategoryFormProps {
  category?: Category | null;
  onSubmit: (data: CategoryFormData) => void;
  onCancel: () => void;
  isEditMode?: boolean;
  isViewMode?: boolean;
  loading?: boolean;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  category,
  onSubmit,
  onCancel,
  isEditMode = false,
  isViewMode = false,
  loading = false,
}) => {
  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
    description: '',
    icon: '',
    is_active: true,
  });

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        description: category.description || '',
        icon: category.icon || '',
        is_active: category.is_active,
      });
    }
  }, [category]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof CategoryFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const isDisabled = isViewMode || loading;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Category Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Enter category name"
          required
          disabled={isDisabled}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Enter category description"
          rows={3}
          disabled={isDisabled}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="icon">Icon</Label>
        <Input
          id="icon"
          value={formData.icon}
          onChange={(e) => handleChange('icon', e.target.value)}
          placeholder="Enter icon name (e.g., code, palette, briefcase)"
          disabled={isDisabled}
        />
        <p className="text-sm text-muted-foreground">
          Use icon names from Lucide React or other icon libraries
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="is_active"
          checked={formData.is_active}
          onCheckedChange={(checked) => handleChange('is_active', checked)}
          disabled={isDisabled}
        />
        <Label htmlFor="is_active">Active Status</Label>
      </div>

      {!isViewMode && (
        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : isEditMode ? 'Update Category' : 'Create Category'}
          </Button>
        </div>
      )}

      {isViewMode && (
        <div className="flex justify-end pt-4">
          <Button type="button" onClick={onCancel}>
            Close
          </Button>
        </div>
      )}
    </form>
  );
};

export default CategoryForm;
