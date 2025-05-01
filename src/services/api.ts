
import { supabase } from "@/integrations/supabase/client";

// Members
export const fetchMembers = async () => {
  const { data, error } = await supabase
    .from('members')
    .select('*')
    .order('joined_date', { ascending: false });
  
  if (error) throw error;
  return data;
};

// Programs
export const fetchPrograms = async () => {
  const { data, error } = await supabase
    .from('programs')
    .select('*');
  
  if (error) throw error;
  return data;
};

// Rewards
export const fetchRewards = async () => {
  const { data, error } = await supabase
    .from('rewards')
    .select('*')
    .order('popularity', { ascending: false });
  
  if (error) throw error;
  return data;
};

// Promotions
export const fetchPromotions = async () => {
  // Fetch promotions data
  const { data: promotionsData, error: promotionsError } = await supabase
    .from('promotions')
    .select('*')
    .order('start_date', { ascending: false });
  
  if (promotionsError) throw promotionsError;
  
  // For each promotion, fetch the associated product if product_id exists
  const enrichedPromotions = await Promise.all(
    promotionsData.map(async (promotion) => {
      if (promotion.product_id) {
        const { data: productData, error: productError } = await supabase
          .from('products')
          .select('name, category')
          .eq('id', promotion.product_id)
          .single();
        
        return {
          ...promotion,
          products: productError ? null : productData
        };
      }
      return promotion;
    })
  );
  
  return enrichedPromotions;
};

// Create Promotion
export const createPromotion = async (promotionData) => {
  const { data, error } = await supabase
    .from('promotions')
    .insert([{
      name: promotionData.name,
      status: promotionData.status,
      start_date: promotionData.start_date || null,
      end_date: promotionData.end_date || null,
      product_id: promotionData.product_id === "none" ? null : promotionData.product_id || null,
      budget: promotionData.budget,
      region: promotionData.region || null,
      target_audience: promotionData.target_audience || null,
      // Initialize with defaults
      enrolled_members: 0,
      points_awarded: 0,
      percent_used: 0
    }])
    .select();

  if (error) throw error;
  return data;
};

// Products
export const fetchProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('name');
  
  if (error) throw error;
  return data;
};

// Promotion Analytics
export const fetchPromotionAnalytics = async () => {
  const { data, error } = await supabase
    .from('promotion_analytics')
    .select('*')
    .order('start_date', { ascending: false });
  
  if (error) throw error;
  return data;
};

// Transactions
export const fetchTransactions = async () => {
  const { data, error } = await supabase
    .from('transactions')
    .select('*, members(name)')
    .order('transaction_date', { ascending: false });
  
  if (error) throw error;
  return data;
};

// Redemptions
export const fetchRedemptions = async () => {
  const { data, error } = await supabase
    .from('redemptions')
    .select('*, members(name), rewards(name)')
    .order('redemption_date', { ascending: false });
  
  if (error) throw error;
  return data;
};

// Fetch tiers
export const fetchTiers = async () => {
  const { data, error } = await supabase
    .from('tiers')
    .select('*')
    .order('threshold', { ascending: true });
  
  if (error) throw error;
  return data;
};
