export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      assignments: {
        Row: {
          course_id: string
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          status: string | null
          title: string
          updated_at: string
        }
        Insert: {
          course_id: string
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          status?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          course_id?: string
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          status?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "assignments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      bank_details: {
        Row: {
          account_number: string
          bank_name: string
          bank_photo_url: string | null
          branch_name: string
          created_at: string
          id: string
          ifsc_code: string
          micr_code: string
          updated_at: string
        }
        Insert: {
          account_number: string
          bank_name: string
          bank_photo_url?: string | null
          branch_name: string
          created_at?: string
          id?: string
          ifsc_code: string
          micr_code: string
          updated_at?: string
        }
        Update: {
          account_number?: string
          bank_name?: string
          bank_photo_url?: string | null
          branch_name?: string
          created_at?: string
          id?: string
          ifsc_code?: string
          micr_code?: string
          updated_at?: string
        }
        Relationships: []
      }
      certificates: {
        Row: {
          certificate_number: string
          course_id: string
          created_at: string
          id: string
          issued_date: string
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          certificate_number: string
          course_id: string
          created_at?: string
          id?: string
          issued_date?: string
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          certificate_number?: string
          course_id?: string
          created_at?: string
          id?: string
          issued_date?: string
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "certificates_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_us: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      course_categories: {
        Row: {
          category_id: number
          course_category: string
          created_at: string
          id: string
          updated_at: string
        }
        Insert: {
          category_id: number
          course_category: string
          created_at?: string
          id?: string
          updated_at?: string
        }
        Update: {
          category_id?: number
          course_category?: string
          created_at?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      courses: {
        Row: {
          created_at: string
          description: string | null
          duration_weeks: number | null
          id: string
          instructor: string | null
          status: string | null
          title: string
          total_lessons: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          duration_weeks?: number | null
          id?: string
          instructor?: string | null
          status?: string | null
          title: string
          total_lessons?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          duration_weeks?: number | null
          id?: string
          instructor?: string | null
          status?: string | null
          title?: string
          total_lessons?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      director_messages: {
        Row: {
          created_at: string
          id: string
          message: string
          photo: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          photo?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          photo?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      district_master: {
        Row: {
          city_id: number
          created_at: string
          created_date: string | null
          id: string
          site_id: number
          site_name: string
          updated_at: string
        }
        Insert: {
          city_id: number
          created_at?: string
          created_date?: string | null
          id?: string
          site_id: number
          site_name: string
          updated_at?: string
        }
        Update: {
          city_id?: number
          created_at?: string
          created_date?: string | null
          id?: string
          site_id?: number
          site_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      enquiries: {
        Row: {
          address: string | null
          city: string | null
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          organization: string | null
          phone: string
          state: string
          updated_at: string
        }
        Insert: {
          address?: string | null
          city?: string | null
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
          organization?: string | null
          phone: string
          state: string
          updated_at?: string
        }
        Update: {
          address?: string | null
          city?: string | null
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          organization?: string | null
          phone?: string
          state?: string
          updated_at?: string
        }
        Relationships: []
      }
      head_offices: {
        Row: {
          address: string
          city: string | null
          country: string | null
          created_at: string
          created_by: string | null
          email: string
          id: string
          is_primary: boolean | null
          name: string | null
          phone: string
          postal_code: string | null
          state: string | null
          status: string | null
          updated_at: string
          website: string | null
        }
        Insert: {
          address: string
          city?: string | null
          country?: string | null
          created_at?: string
          created_by?: string | null
          email: string
          id?: string
          is_primary?: boolean | null
          name?: string | null
          phone: string
          postal_code?: string | null
          state?: string | null
          status?: string | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          address?: string
          city?: string | null
          country?: string | null
          created_at?: string
          created_by?: string | null
          email?: string
          id?: string
          is_primary?: boolean | null
          name?: string | null
          phone?: string
          postal_code?: string | null
          state?: string | null
          status?: string | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      menu_content: {
        Row: {
          course: string
          course_file: string | null
          created_at: string
          date: string
          id: string
          notes: string | null
          updated_at: string
          upload_file_title: string
        }
        Insert: {
          course: string
          course_file?: string | null
          created_at?: string
          date: string
          id?: string
          notes?: string | null
          updated_at?: string
          upload_file_title: string
        }
        Update: {
          course?: string
          course_file?: string | null
          created_at?: string
          date?: string
          id?: string
          notes?: string | null
          updated_at?: string
          upload_file_title?: string
        }
        Relationships: []
      }
      missions: {
        Row: {
          content: string
          created_at: string
          id: string
          image: string | null
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          image?: string | null
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          image?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      news: {
        Row: {
          created_at: string
          id: string
          news_date: string
          news_description: string
          news_id: number
          news_title: string
          photo: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          news_date: string
          news_description: string
          news_id: number
          news_title: string
          photo?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          news_date?: string
          news_description?: string
          news_id?: number
          news_title?: string
          photo?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean | null
          message: string | null
          title: string
          type: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean | null
          message?: string | null
          title: string
          type?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean | null
          message?: string | null
          title?: string
          type?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      photo_gallery: {
        Row: {
          created_at: string
          id: string
          image_url: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      state_master: {
        Row: {
          city_id: number
          city_name: string
          created_at: string
          created_date: string | null
          id: string
          updated_at: string
        }
        Insert: {
          city_id: number
          city_name: string
          created_at?: string
          created_date?: string | null
          id?: string
          updated_at?: string
        }
        Update: {
          city_id?: number
          city_name?: string
          created_at?: string
          created_date?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      student_profiles: {
        Row: {
          city: string | null
          course_name: string | null
          created_at: string
          email: string
          enrollment_date: string | null
          full_name: string
          id: string
          phone: string | null
          state: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          city?: string | null
          course_name?: string | null
          created_at?: string
          email: string
          enrollment_date?: string | null
          full_name: string
          id?: string
          phone?: string | null
          state?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          city?: string | null
          course_name?: string | null
          created_at?: string
          email?: string
          enrollment_date?: string | null
          full_name?: string
          id?: string
          phone?: string | null
          state?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_assignments: {
        Row: {
          assignment_id: string
          created_at: string
          feedback: string | null
          grade: number | null
          id: string
          status: string | null
          submitted_at: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          assignment_id: string
          created_at?: string
          feedback?: string | null
          grade?: number | null
          id?: string
          status?: string | null
          submitted_at?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          assignment_id?: string
          created_at?: string
          feedback?: string | null
          grade?: number | null
          id?: string
          status?: string | null
          submitted_at?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_assignments_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "assignments"
            referencedColumns: ["id"]
          },
        ]
      }
      user_courses: {
        Row: {
          completed_lessons: number | null
          course_id: string
          created_at: string
          enrolled_at: string
          id: string
          progress: number | null
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          completed_lessons?: number | null
          course_id: string
          created_at?: string
          enrolled_at?: string
          id?: string
          progress?: number | null
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          completed_lessons?: number | null
          course_id?: string
          created_at?: string
          enrolled_at?: string
          id?: string
          progress?: number | null
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_courses_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_stats: {
        Row: {
          certificates_earned: number | null
          completed_courses: number | null
          created_at: string
          id: string
          last_activity: string | null
          study_streak_days: number | null
          total_courses: number | null
          total_study_hours: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          certificates_earned?: number | null
          completed_courses?: number | null
          created_at?: string
          id?: string
          last_activity?: string | null
          study_streak_days?: number | null
          total_courses?: number | null
          total_study_hours?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          certificates_earned?: number | null
          completed_courses?: number | null
          created_at?: string
          id?: string
          last_activity?: string | null
          study_streak_days?: number | null
          total_courses?: number | null
          total_study_hours?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      visions: {
        Row: {
          content: string
          created_at: string
          id: string
          image: string | null
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          image?: string | null
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          image?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
