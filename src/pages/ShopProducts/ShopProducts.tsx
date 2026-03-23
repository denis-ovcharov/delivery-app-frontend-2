import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { shopsAPI, productsAPI } from '../../services/api';
import { Shop, Product } from '../../types';
import { ProductCard } from '../../components';
import styles from './ShopProducts.module.css';

const ShopProducts = () => {
  const { shopId } = useParams();
  const navigate = useNavigate();
  const [shop, setShop] = useState<Shop | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('price');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    if (shopId) {
      fetchShop();
      fetchProducts();
    }
  }, [shopId, category, sortBy, sortOrder]);

  const fetchShop = async () => {
    try {
      const response = await shopsAPI.getAll() as any;
      const foundShop = response.shops.find((s: Shop) => s._id === shopId);
      setShop(foundShop || null);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params: any = { shopId, sortBy, sortOrder };
      if (category) params.category = category;
      
      const response = await productsAPI.getAll(params) as any;
      setProducts(response.products);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['Burgers', 'Pizza', 'Sushi', 'Drinks', 'Desserts', 'Mexican', 'Chicken', 'Sandwiches', 'Sides', 'Appetizers'];

  return (
    <div className={styles.container}>
      <button onClick={() => navigate('/shops')} className={styles.backBtn}>
        ← Back to Shops
      </button>

      {shop && (
        <div className={styles.shopHeader}>
          <h1 className={styles.shopTitle}>{shop.name}</h1>
          <div className={styles.shopRating}>
            <span>★</span>
            <span>{shop.rating.toFixed(1)}</span>
            <span>•</span>
            <span>{shop.category}</span>
          </div>
        </div>
      )}

      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Category</label>
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            className={styles.select}
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Sort By</label>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className={styles.select}
          >
            <option value="price">Price</option>
            <option value="name">Name</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Order</label>
          <select 
            value={sortOrder} 
            onChange={(e) => setSortOrder(e.target.value)}
            className={styles.select}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className={styles.loading}>Loading...</div>
      ) : error ? (
        <div className={styles.error}>{error}</div>
      ) : (
        <>
          <div className={styles.grid}>
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          {products.length === 0 && (
            <div className={styles.loading}>No products found</div>
          )}
        </>
      )}
    </div>
  );
};

export default ShopProducts;
