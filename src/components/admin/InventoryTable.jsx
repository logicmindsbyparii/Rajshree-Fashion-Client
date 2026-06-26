import React, { useState } from 'react';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, IconButton, Chip, Button, Dialog,
  DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useProducts } from '../../context/ProductContext';

const PLACEHOLDER_IMAGES = [
  'https://images.unsplash.com/photo-1594938291221-94f18cbb5660?w=100&q=80',
  'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=100&q=80',
  'https://images.unsplash.com/photo-1617127365659-c47c8646a14d?w=100&q=80',
  'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=100&q=80'
];

export default function InventoryTable({ onEdit }) {
  const { products, deleteProduct } = useProducts();
  const [deleteDialog, setDeleteDialog] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const handleDeleteConfirm = async () => {
    if (!deleteDialog) return;
    setDeleting(true);
    try {
      await deleteProduct(deleteDialog.id);
    } catch {
      // Error handled in context
    } finally {
      setDeleting(false);
      setDeleteDialog(null);
    }
  };

  const getImgSrc = (product) => {
    if (product.image_url?.startsWith('/uploads/')) return product.image_url;
    const idx = product.id ? product.id.charCodeAt(0) % PLACEHOLDER_IMAGES.length : 0;
    return PLACEHOLDER_IMAGES[idx];
  };

  const formatPrice = (price) => `₹${parseFloat(price).toLocaleString('en-IN')}`;

  if (products.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 6, border: '1px solid #E8DDD0', bgcolor: '#FDF8F3' }}>
        <Typography sx={{ color: '#6B6B6B', mb: 1, fontFamily: '"Playfair Display", serif', fontSize: '1rem' }}>
          No products in inventory yet
        </Typography>
        <Typography variant="body2" sx={{ color: '#6B6B6B', fontSize: '0.8rem' }}>
          Add your first product using the form above.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <TableContainer sx={{ border: '1px solid #E8DDD0', bgcolor: '#FDF8F3' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 60 }}></TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Fabric</TableCell>
              <TableCell>Collection</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Stock</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                sx={{
                  '&:hover': { bgcolor: 'rgba(10,59,36,0.02)' },
                  transition: 'background 0.2s'
                }}
              >
                <TableCell sx={{ p: 1 }}>
                  <Box
                    component="img"
                    src={getImgSrc(product)}
                    alt=""
                    sx={{
                      width: 48,
                      height: 48,
                      objectFit: 'cover',
                      border: '1px solid #E8DDD0'
                    }}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1594938291221-94f18cbb5660?w=100&q=80';
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      fontFamily: '"Playfair Display", serif',
                      fontSize: '0.85rem',
                      color: '#1A1A1A',
                      fontWeight: 500
                    }}
                  >
                    {product.title}
                  </Typography>
                </TableCell>
                <TableCell sx={{ fontSize: '0.75rem', color: '#6B6B6B' }}>{product.fabric_type}</TableCell>
                <TableCell sx={{ fontSize: '0.75rem', color: '#6B6B6B' }}>{product.collection_name || '—'}</TableCell>
                <TableCell align="right" sx={{ fontFamily: '"Inter", sans-serif', fontWeight: 500, fontSize: '0.85rem' }}>
                  {formatPrice(product.price)}
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={product.stock_quantity}
                    size="small"
                    sx={{
                      borderRadius: 0,
                      fontSize: '0.6rem',
                      bgcolor: product.stock_quantity > 0 ? 'rgba(46,125,50,0.08)' : 'rgba(198,40,40,0.08)',
                      color: product.stock_quantity > 0 ? '#2E7D32' : '#C62828',
                      fontWeight: 500,
                      minWidth: 32
                    }}
                  />
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={product.is_available && product.stock_quantity > 0 ? 'Available' : 'Unavailable'}
                    size="small"
                    sx={{
                      borderRadius: 0,
                      fontSize: '0.55rem',
                      letterSpacing: '0.05em',
                      bgcolor: product.is_available && product.stock_quantity > 0
                        ? 'rgba(46,125,50,0.08)' : 'rgba(198,40,40,0.08)',
                      color: product.is_available && product.stock_quantity > 0
                        ? '#2E7D32' : '#C62828'
                    }}
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    size="small"
                    onClick={() => onEdit(product)}
                    sx={{ color: '#6B6B6B', '&:hover': { color: '#0A3B24' } }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => setDeleteDialog(product)}
                    sx={{ color: '#6B6B6B', '&:hover': { color: '#C62828' } }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!deleteDialog}
        onClose={() => setDeleteDialog(null)}
        PaperProps={{ sx: { borderRadius: 0, border: '1px solid #E8DDD0', boxShadow: 'none', bgcolor: '#FFF8F0' } }}
      >
        <DialogTitle sx={{ fontFamily: '"Playfair Display", serif', fontSize: '1.1rem', pb: 1 }}>
          Delete Product
        </DialogTitle>
        <DialogContent sx={{ fontFamily: '"Inter", sans-serif', fontSize: '0.85rem', color: '#6B6B6B' }}>
          Are you sure you want to delete <strong>{deleteDialog?.title}</strong>? This action cannot be undone.
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button
            onClick={() => setDeleteDialog(null)}
            sx={{ color: '#6B6B6B', fontSize: '0.65rem', letterSpacing: '0.08em' }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            disabled={deleting}
            sx={{
              bgcolor: '#C62828',
              color: '#FFF',
              fontSize: '0.65rem',
              letterSpacing: '0.08em',
              py: 1,
              px: 3,
              borderRadius: 0,
              '&:hover': { bgcolor: '#B71C1C' }
            }}
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
