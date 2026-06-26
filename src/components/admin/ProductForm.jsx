import React, { useState, useRef, useEffect } from 'react';
import {
  Box, Typography, TextField, Button, Select, MenuItem,
  FormControl, InputLabel, Alert, Grid, IconButton
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import { useProducts } from '../../context/ProductContext';

const FABRIC_TYPES = [
  'Silk Blend', 'Pure Cotton', 'Georgette', 'Chanderi Silk',
  'Premium Velvet', 'Cotton Twill', 'Crepe Silk', 'Linen'
];

const COLLECTIONS = [
  'Festive Collection', 'Summer Essentials', 'Everyday Elegance',
  'Premium Collection', 'Evening Wear', 'Casual Luxury', 'Heritage Collection', 'Wedding Collection'
];

const INITIAL_FORM = {
  title: '', fabric_type: '', collection_name: '', stock_quantity: '',
  price: '', description: ''
};

export default function ProductForm({ editProduct, onCancel }) {
  const { createProduct, updateProduct, error, setError } = useProducts();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState(INITIAL_FORM);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [errors, setErrors] = useState({});

  // Sync form data when editProduct prop changes (fixes edit button not populating form)
  useEffect(() => {
    if (editProduct) {
      setFormData({
        title: editProduct.title || '',
        fabric_type: editProduct.fabric_type || '',
        collection_name: editProduct.collection_name || '',
        stock_quantity: editProduct.stock_quantity?.toString() || '',
        price: editProduct.price?.toString() || '',
        description: editProduct.description || ''
      });
      setImagePreview(editProduct.image_url || null);
      setImage(null);
      setSuccess('');
      setErrors({});
      setError(null);
    } else {
      setFormData(INITIAL_FORM);
      setImagePreview(null);
      setImage(null);
      setSuccess('');
      setErrors({});
    }
  }, [editProduct, setError]);

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.fabric_type) newErrors.fabric_type = 'Fabric type is required';
    if (!formData.price) newErrors.price = 'Price is required';
    else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) newErrors.price = 'Enter a valid price';
    if (formData.stock_quantity && (isNaN(formData.stock_quantity) || parseInt(formData.stock_quantity) < 0)) {
      newErrors.stock_quantity = 'Enter a valid quantity';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    if (error) setError(null);
    if (success) setSuccess('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setSuccess('');

    try {
      const formPayload = new FormData();
      formPayload.append('title', formData.title.trim());
      formPayload.append('fabric_type', formData.fabric_type);
      formPayload.append('collection_name', formData.collection_name);
      formPayload.append('stock_quantity', formData.stock_quantity || '0');
      formPayload.append('price', formData.price);
      formPayload.append('description', formData.description);
      formPayload.append('is_available', 'true');
      if (image) formPayload.append('image', image);

      if (editProduct) {
        await updateProduct(editProduct.id, formPayload);
        setSuccess('Product updated successfully!');
        // Auto-cancel edit after successful update so form resets to Add mode
        setTimeout(() => onCancel(), 1200);
      } else {
        await createProduct(formPayload);
        setSuccess('Product created successfully! The shop page will update instantly.');
        setFormData(INITIAL_FORM);
        removeImage();
      }
    } catch (err) {
      // Error handled in context
    } finally {
      setLoading(false);
    }
  };

  // Determine if we're editing based on editProduct prop
  const isEditing = !!editProduct;

  return (
    <Box component="form" onSubmit={handleSubmit} encType="multipart/form-data">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 1 }}>
        <Typography
          variant="h5"
          sx={{ fontFamily: '"Playfair Display", serif', color: '#1A1A1A', fontSize: '1.2rem' }}
        >
          {isEditing ? 'Edit Product' : 'Add New Product'}
        </Typography>
        {isEditing && (
          <Button size="small" onClick={onCancel} sx={{ fontSize: '0.65rem', color: '#6B6B6B' }}>
            Cancel Edit
          </Button>
        )}
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: '8px', fontSize: '0.8rem' }}>{error}</Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 3, borderRadius: '8px', fontSize: '0.8rem' }}>{success}</Alert>
      )}

      <Grid container spacing={2.5}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Suit Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            error={!!errors.title}
            helperText={errors.title}
            size="small"
            placeholder="e.g., Royal Burgundy Suit"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small" error={!!errors.fabric_type}>
            <InputLabel>Fabric Type</InputLabel>
            <Select name="fabric_type" value={formData.fabric_type} onChange={handleChange} label="Fabric Type">
              <MenuItem value=""><em>Select Fabric</em></MenuItem>
              {FABRIC_TYPES.map(f => <MenuItem key={f} value={f}>{f}</MenuItem>)}
            </Select>
            {errors.fabric_type && <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>{errors.fabric_type}</Typography>}
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormControl fullWidth size="small">
            <InputLabel>Collection</InputLabel>
            <Select name="collection_name" value={formData.collection_name} onChange={handleChange} label="Collection">
              <MenuItem value=""><em>None</em></MenuItem>
              {COLLECTIONS.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6} sm={4}>
          <TextField
            fullWidth
            label="Stock Quantity"
            name="stock_quantity"
            type="number"
            value={formData.stock_quantity}
            onChange={handleChange}
            error={!!errors.stock_quantity}
            helperText={errors.stock_quantity}
            size="small"
            InputProps={{ inputProps: { min: 0 } }}
          />
        </Grid>

        <Grid item xs={6} sm={4}>
          <TextField
            fullWidth
            label="Price (₹)"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            error={!!errors.price}
            helperText={errors.price}
            size="small"
            InputProps={{ inputProps: { min: 0, step: 0.01 } }}
            placeholder="e.g., 28999"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            size="small"
            multiline
            rows={3}
            placeholder="Describe the suit, its features, and what makes it special..."
          />
        </Grid>

        {/* Image Upload */}
        <Grid item xs={12}>
          <Typography variant="caption" sx={{ color: '#6B6B6B', fontSize: '0.65rem', letterSpacing: '0.08em', textTransform: 'uppercase', mb: 1, display: 'block' }}>
            Product Image
          </Typography>

          {imagePreview ? (
            <Box sx={{ position: 'relative', display: 'inline-block', width: '100%', maxWidth: 300 }}>
              <Box
                component="img"
                src={imagePreview}
                alt="Preview"
                sx={{
                  width: '100%',
                  height: 200,
                  objectFit: 'cover',
                  border: '1px solid #E8DDD0',
                  borderRadius: '8px'
                }}
              />
              <IconButton
                onClick={removeImage}
                size="small"
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  bgcolor: 'rgba(255,255,255,0.9)',
                  '&:hover': { bgcolor: '#FFF' }
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          ) : (
            <Box
              onClick={() => fileInputRef.current?.click()}
              sx={{
                border: '2px dashed #E8DDD0',
                p: 4,
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s',
                borderRadius: '8px',
                '&:hover': {
                  borderColor: '#D4A574',
                  bgcolor: 'rgba(212,165,116,0.04)'
                }
              }}
            >
              <CloudUploadIcon sx={{ fontSize: 36, color: '#C9A96E', mb: 1 }} />
              <Typography variant="body2" sx={{ color: '#6B6B6B', fontSize: '0.8rem' }}>
                Click to upload an image
              </Typography>
              <Typography variant="caption" sx={{ color: '#9E9E9E', fontSize: '0.65rem' }}>
                JPEG, PNG, WebP · Max 5MB
              </Typography>
            </Box>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 2, pt: 1 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                py: 1.5,
                px: 4,
                fontSize: '0.65rem',
                letterSpacing: '0.12em',
                bgcolor: '#0A3B24',
                '&:hover': { bgcolor: '#062617' },
                '&.Mui-disabled': { bgcolor: 'rgba(10,59,36,0.3)' }
              }}
            >
              {loading ? 'Saving...' : isEditing ? 'Update Product' : 'Add Product'}
            </Button>
            {isEditing && (
              <Button onClick={onCancel} sx={{ color: '#6B6B6B', fontSize: '0.65rem', letterSpacing: '0.08em' }}>
                Cancel
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
