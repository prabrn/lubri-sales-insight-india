
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
  const { data, error } = await supabase
    .from('promotions')
    .select('*, products(name, category)')
    .order('start_date', { ascending: false });
  
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
