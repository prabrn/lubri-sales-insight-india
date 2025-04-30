export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      members: {
        Row: {
          created_at: string
          email: string
          id: string
          joined_date: string
          last_active: string | null
          name: string
          points: number
          tier: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          joined_date?: string
          last_active?: string | null
          name: string
          points?: number
          tier: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          joined_date?: string
          last_active?: string | null
          name?: string
          points?: number
          tier?: string
          updated_at?: string
        }
        Relationships: []
      }
      program_members: {
        Row: {
          created_at: string
          id: string
          joined_date: string
          member_id: string
          program_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          joined_date?: string
          member_id: string
          program_id: string
        }
        Update: {
          created_at?: string
          id?: string
          joined_date?: string
          member_id?: string
          program_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "program_members_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "program_members_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      programs: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          points_issued: number
          points_redeemed: number
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          points_issued?: number
          points_redeemed?: number
          status: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          points_issued?: number
          points_redeemed?: number
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      promotions: {
        Row: {
          budget: number
          created_at: string
          end_date: string | null
          enrolled_members: number
          id: string
          name: string
          percent_used: number
          points_awarded: number
          start_date: string | null
          status: string
          updated_at: string
        }
        Insert: {
          budget: number
          created_at?: string
          end_date?: string | null
          enrolled_members?: number
          id?: string
          name: string
          percent_used?: number
          points_awarded?: number
          start_date?: string | null
          status: string
          updated_at?: string
        }
        Update: {
          budget?: number
          created_at?: string
          end_date?: string | null
          enrolled_members?: number
          id?: string
          name?: string
          percent_used?: number
          points_awarded?: number
          start_date?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      redemptions: {
        Row: {
          created_at: string
          id: string
          member_id: string
          points_spent: number
          redemption_date: string
          reward_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          member_id: string
          points_spent: number
          redemption_date?: string
          reward_id: string
        }
        Update: {
          created_at?: string
          id?: string
          member_id?: string
          points_spent?: number
          redemption_date?: string
          reward_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "redemptions_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "redemptions_reward_id_fkey"
            columns: ["reward_id"]
            isOneToOne: false
            referencedRelation: "rewards"
            referencedColumns: ["id"]
          },
        ]
      }
      rewards: {
        Row: {
          available: boolean
          category: string
          created_at: string
          id: string
          name: string
          points_cost: number
          popularity: number
          redeemed: number
          updated_at: string
        }
        Insert: {
          available?: boolean
          category: string
          created_at?: string
          id?: string
          name: string
          points_cost: number
          popularity?: number
          redeemed?: number
          updated_at?: string
        }
        Update: {
          available?: boolean
          category?: string
          created_at?: string
          id?: string
          name?: string
          points_cost?: number
          popularity?: number
          redeemed?: number
          updated_at?: string
        }
        Relationships: []
      }
      tiers: {
        Row: {
          benefits: Json
          created_at: string
          id: string
          name: string
          threshold: number
          updated_at: string
        }
        Insert: {
          benefits?: Json
          created_at?: string
          id?: string
          name: string
          threshold: number
          updated_at?: string
        }
        Update: {
          benefits?: Json
          created_at?: string
          id?: string
          name?: string
          threshold?: number
          updated_at?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          created_at: string
          description: string | null
          id: string
          member_id: string
          points: number
          transaction_date: string
          type: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          member_id: string
          points: number
          transaction_date?: string
          type: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          member_id?: string
          points?: number
          transaction_date?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
